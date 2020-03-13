import React, { useState, useContext, useEffect, useMemo } from 'react';
import useStyles from './Style'
import Grid from '@material-ui/core/Grid';
import { DialogActions, DialogContent, DialogTitle, Select, MenuItem, Button, FormControl, Slider, Typography } from '@material-ui/core'
import { useFormValidate } from '../../hooks/form'
import { useTranslation } from "react-i18next";
import { materialContext } from '../../context/material'
import { INDEX_CONFIG, m_OPTIONS } from '../../consts'
import WithTip from '../../components/with-tip'

const INDEX_TYPES = Object.keys(INDEX_CONFIG).filter(v => v !== "FLAT")

const CreateIndex = props => {
  const classes = useStyles()
  const [form, setForm] = useState({ index_type: "", nlist: 1024 })
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
      nlist: indexParams.nlist || 1,
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
    return INDEX_CONFIG[form.index_type].create
  }, [form.index_type])

  const update = async () => {
    // const isValid = validateForm()
    // if (!isValid) {
    //   return
    // }
    const params = indexCreateParams.reduce((pre, cur) => {
      pre[cur] = form[cur]
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
  return (
    <>
      <DialogTitle >{tableTrans.index} {collectionInfo.collection_name}</DialogTitle>
      <DialogContent classes={{ root: classes.dialogContent }}>
        <Grid container spacing={3}>
          {/* <Grid item sm={4}>
            <div className={classes.wrapper}><span className={classes.column}>{tableTrans.indexType}</span></div>
          </Grid> */}
          <Grid item sm={12}>
            <Typography className={classes.label}>{tableTrans.indexType}</Typography>
          </Grid>
          <Grid item sm={12}>
            <FormControl variant="outlined" className={classes.formControl} style={{ width: "100%" }}>

              <Select
                name="index_type"
                labelId="index-type"
                id="index-type-select"
                value={form.index_type}
                onChange={handleChange}
              >
                {
                  INDEX_TYPES.map(v => (
                    <MenuItem key={v} value={v}>{v}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          {/* <Grid item sm={4}>
            <div className={classes.wrapper}><span className={classes.column}>{tableTrans.nlist}</span> </div>
          </Grid> */}
          {
            indexCreateParams.includes('nlist') && (
              <>
                <Grid item sm={12}>
                  <Typography className={classes.label}>{tableTrans.nlist}
                    <WithTip title={tipTrans.nlist} placement="bottom"></WithTip>
                  </Typography>

                </Grid>
                <Grid item sm={12}>
                  <Slider
                    name="nlist"
                    value={form.nlist}
                    min={1}
                    max={20000}
                    valueLabelDisplay="auto"
                    onChange={(e, val) => setForm({ ...form, nlist: val })} />
                </Grid>
              </>

            )
          }
          {
            indexCreateParams.includes('m') && (
              <>
                <Grid item sm={12}>
                  <Typography className={classes.label}>m
                  <WithTip title={tipTrans.m} placement="bottom"></WithTip>
                  </Typography>

                </Grid>
                <Grid item sm={12}>
                  <FormControl variant="outlined" className={classes.formControl} style={{ width: "100%" }}>

                    <Select
                      name="m"
                      value={form.m}
                      onChange={handleChange}
                    >
                      {
                        m_OPTIONS.map(v => (
                          <MenuItem key={v} value={v}>{v}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
              </>

            )
          }
          {
            indexCreateParams.includes('M') && (
              <>
                <Grid item sm={12}>
                  <Typography className={classes.label}>M
                  <WithTip title={tipTrans.M} placement="bottom"></WithTip>
                  </Typography>

                </Grid>
                <Grid item sm={12}>
                  <Slider
                    name="M"
                    value={form.M}
                    min={5}
                    max={48}
                    valueLabelDisplay="auto"
                    onChange={(e, val) => setForm({ ...form, M: val })} />
                </Grid>
              </>
            )
          }
          {
            indexCreateParams.includes('efConstruction') && (
              <>
                <Grid item sm={12}>
                  <Typography className={classes.label}>Ef Construction
                  <WithTip title={tipTrans.efConstruction} placement="bottom"></WithTip>
                  </Typography>

                </Grid>
                <Grid item sm={12}>
                  <Slider
                    name="efConstruction"
                    value={form.efConstruction}
                    min={100}
                    max={500}
                    valueLabelDisplay="auto"
                    onChange={(e, val) => setForm({ ...form, efConstruction: val })} />
                </Grid>
              </>
            )
          }


        </Grid>
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