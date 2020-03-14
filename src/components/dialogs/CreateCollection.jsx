import React, { useState, useContext } from 'react';
import { materialContext } from '../../context/material'
import { useFormValidate } from '../../hooks/form'
import useStyles from './Style'
import { DialogActions, DialogContent, DialogTitle, Button, Typography, FormControl } from '@material-ui/core'
import { useTranslation } from "react-i18next";
import WithTip from '../with-tip'
import Form from '../form/Form'

const defaultForm = {
  collection_name: ' ',
  metric_type: 'L2',
  dimension: 4,
  index_file_size: 1024
}

const metricTypes = [{
  value: "L2",
  label: "L2"
}, {
  value: "IP",
  label: "IP"
}, {
  value: "HAMMING",
  label: "Hamming"
}, {
  value: "JACCARD",
  label: "Jaccard"
}, {
  value: "TANIMOTO",
  label: "Tanimoto"
}]

const CreateCollection = props => {
  const classes = useStyles()
  const [form, setForm] = useState({ ...defaultForm })
  const [error, setError] = useState({})
  const { validateForm, handleCheck, handleChange } = useFormValidate(form, setForm, setError)

  const { hideDialog, openSnackBar } = useContext(materialContext)
  const { t } = useTranslation();
  const tableTrans = t("table");
  const buttonTrans = t("button");
  const { createCollection, saveSuccess } = props

  const update = async () => {
    const isValid = validateForm()
    if (!isValid) {
      return
    }
    const types = ['HAMMING', 'JACCARD', 'TANIMOTO']
    if (types.includes(form.metric_type) && form.dimension % 8 !== 0) {
      openSnackBar(tableTrans.tips.dimension, 'warning')
      return
    }
    const res = await createCollection({
      ...form,
      collection_name: form.collection_name.trim(),
      dimension: Number(form.dimension),
      index_file_size: Number(form.index_file_size)
    })
    if (res && res.code === 0) {
      saveSuccess()
      openSnackBar(tableTrans.saveSuccess)
      hideDialog()
    }
  }

  const formConfigs = [{
    type: "textField",
    name: "collection_name",
    label: (
      <Typography className={classes.label}>{tableTrans.tName}
        <WithTip title={tableTrans.tips.name}></WithTip>
      </Typography>
    ),
    value: form.collection_name,
    fullWidth: true,
    sm: 12,
    onBlur: () => { handleCheck(form.collection_name, "collection_name") },
    onChange: handleChange,
    placeholder: tableTrans.tName,
    error: error.collection_name,
    helperText: `${tableTrans.tName}${t('required')}`
  }, {
    type: "select",
    name: "metric_type",
    label: tableTrans.tMetric,
    value: form.metric_type,
    sm: 12,
    onChange: handleChange,
    selectOptions: metricTypes
  }, {
    type: "textField",
    inputType: "number",
    name: "dimension",
    label: (
      <Typography className={classes.label}>{tableTrans.tDimension}
        <WithTip title={tableTrans.tips.dimension}></WithTip>
      </Typography>
    ),
    value: form.dimension,
    fullWidth: true,
    sm: 12,
    onBlur: () => { handleCheck(form.dimension, "dimension") },
    onChange: (e) => { handleChange(e, [1, 16384]) },
    placeholder: tableTrans.tDimension,
    error: error.dimension,
    helperText: `${tableTrans.tDimension}${t('required')}`
  }, {
    type: "textField",
    inputType: "number",
    name: "index_file_size",
    label: (
      <Typography className={classes.label}>{tableTrans.fileSize}
        <WithTip title={tableTrans.tips.fileSize}></WithTip>
      </Typography>
    ),
    value: form.index_file_size,
    fullWidth: true,
    sm: 12,
    onBlur: () => { handleCheck(form.index_file_size, "index_file_size") },
    onChange: (e) => { handleChange(e, [1, 4096]) },
    placeholder: tableTrans.fileSize,
    error: error.index_file_size,
    helperText: `${tableTrans.fileSize}${t('required')}`
  }]
  return (
    <>
      <DialogTitle >{tableTrans.create}</DialogTitle>
      <DialogContent classes={{ root: classes.dialogContent }}>
        <Form config={formConfigs}></Form>

      </DialogContent>
      <DialogActions classes={{ root: classes.action }}>
        <Button variant="outlined" onClick={update} color="primary">
          {buttonTrans.save}
        </Button>

        <Button variant="outlined" onClick={hideDialog} color="default">
          {buttonTrans.cancel}
        </Button>

      </DialogActions>
    </>)
}

export default CreateCollection