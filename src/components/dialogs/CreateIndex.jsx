import React, { useState, useContext, useEffect, useMemo } from 'react';
import useStyles from './Style'
import Grid from '@material-ui/core/Grid';
import { DialogActions, DialogContent, DialogTitle, Select, MenuItem, Button, FormControl, Slider, Typography } from '@material-ui/core'
import { useFormValidate } from '../../hooks/form'
import { useTranslation } from "react-i18next";
import { materialContext } from '../../context/material'
import { INDEX_CONFIG, m_OPTIONS } from '../../consts'
import Form from '../form/Form'
import WithTip from '../with-tip'

const INDEX_TYPES = Object.keys(INDEX_CONFIG).filter(v => v !== "FLAT")

const CreateIndex = props => {
  const classes = useStyles()
  const [form, setForm] = useState({ index_type: "" })
  const { handleChange } = useFormValidate(form, setForm)
  const { hideDialog, openSnackBar } = useContext(materialContext)
  const { createIndex, collectionInfo, saveSuccess } = props;
  const { t } = useTranslation();
  const tableTrans = t("table");
  const buttonTrans = t("button");
  const tipTrans = t("vector").tips
  const indexParams = JSON.parse(collectionInfo.index_params)
  useEffect(() => {
    setForm({
      index_type: collectionInfo.index === 'FLAT' ? INDEX_TYPES[0] : collectionInfo.index,
      nlist: indexParams.nlist || 1024,
      m: indexParams.m || 12,
      M: indexParams.M || 10,
      efConstruction: indexParams.efConstruction || 200
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionInfo])

  const indexCreateParams = useMemo(() => {
    if (!INDEX_CONFIG[form.index_type]) {
      return []
    }
    console.log('parasm')
    return INDEX_CONFIG[form.index_type].create
  }, [form.index_type])

  const indexOptions = useMemo(() => {
    const types = ['HAMMING', 'JACCARD', 'TANIMOTO']
    if (types.includes(collectionInfo.metric_type)) {
      return ['IVFFLAT']
    }
    return INDEX_TYPES
  }, [collectionInfo.metric_type])

  const update = async () => {
    const params = indexCreateParams.reduce((pre, cur) => {
      pre[cur] = Number(form[cur])
      return pre
    }, {})
    const data = {
      index_type: form.index_type,
      params
    }
    const res = await createIndex(collectionInfo.collection_name, { ...data })

    if (res && res.code === 0) {
      openSnackBar(t('index').saveSuccess)
      saveSuccess()
      hideDialog()
    }
  }

  const indexTypeConfig = [{
    type: "select",
    name: "index_type",
    label: tableTrans.indexType,
    value: form.index_type,
    onChange: handleChange,
    // variant: "outlined",
    sm: 12,
    selectOptions: indexOptions.map(v => ({ value: v, label: v }))
  }]

  const paramsConfig = useMemo(() => {
    console.log('in')
    const result = []
    if (indexCreateParams.includes("m")) {
      result.push({
        type: "select",
        name: "m",
        label: 'm',
        value: form.m,
        onChange: handleChange,
        // variant: "outlined",
        sm: 12,
        selectOptions: m_OPTIONS.map(v => ({ value: v, label: v }))
      })
    }
    if (indexCreateParams.includes("nlist")) {
      result.push({
        type: "textField",
        name: "nlist",
        label: tableTrans.nlist,
        sm: 12,
        fullWidth: true,
        inputType: "number",
        // variant: "outlined",
        onChange: (e) => handleChange(e, [1, 20000]),
        value: form.nlist
      })
    }
    if (indexCreateParams.includes("M")) {
      result.push({
        type: "other",
        name: "M-label",
        sm: 12,
        component: () => (
          <Typography className={classes.label}>M
            <WithTip title={tipTrans.M} placement="bottom"></WithTip>
          </Typography>
        )
      }, {
        type: "slider",
        name: "M",
        marks: false,
        sm: 12,
        range: [5, 48],
        needRangeLabel: false,
        onChange: (e, val) => setForm({ ...form, M: val }),
        value: form.M
      })
    }
    if (indexCreateParams.includes("efConstruction")) {
      result.push({
        type: "other",
        name: "efConstruction-label",
        sm: 12,
        component: () => (
          <Typography className={classes.label}>Ef Construction
            <WithTip title={tipTrans.efConstruction} placement="bottom"></WithTip>
          </Typography>
        )
      }, {
        type: "slider",
        name: "efConstruction",
        sm: 12,
        marks: false,
        range: [100, 500],
        needRangeLabel: false,
        onChange: (e, val) => setForm({ ...form, efConstruction: val }),
        value: form.efConstruction
      })
    }
    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(indexCreateParams), JSON.stringify(form)])

  return (
    <>
      <DialogTitle >{tableTrans.index} {collectionInfo.collection_name}</DialogTitle>
      <DialogContent classes={{ root: classes.dialogContent }}>
        <Form config={[...indexTypeConfig, ...paramsConfig]}></Form>
      </DialogContent>
      <DialogActions classes={{ root: classes.action }}>
        <Button variant="outlined" onClick={() => update()} color="primary">
          {buttonTrans.save}
        </Button>

        <Button variant="outlined" onClick={() => hideDialog()} color="default">
          {buttonTrans.cancel}
        </Button>

      </DialogActions>
    </>)
}

export default CreateIndex