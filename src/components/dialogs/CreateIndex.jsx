import React, { useState, useContext, useEffect } from 'react';
import useStyles from './Style'
import Grid from '@material-ui/core/Grid';
import { DialogActions, DialogContent, DialogTitle, Select, MenuItem, Button, Slider } from '@material-ui/core'
import { useFormValidate } from '../../hooks/form'
import { useTranslation } from "react-i18next";
import { materialContext } from '../../context/material'

const INDEX_TYPES = ["FLAT", "IVFFLAT", "IVFSQ8", "IVFSQ8H", "IVFPQ"];

const CreateIndex = props => {
  const classes = useStyles()
  const [form, setForm] = useState({ index_type: "", nlist: 1024 })
  const { validateForm, handleChange } = useFormValidate(form, setForm)
  const { hideDialog, openSnackBar } = useContext(materialContext)
  const { createIndex, collectionInfo, saveSuccess } = props;
  const { t } = useTranslation();
  const tableTrans = t("table");
  const buttonTrans = t("button");

  useEffect(() => {
    setForm({
      index_type: collectionInfo.index,
      nlist: collectionInfo.nlist
    })
  }, [collectionInfo])

  const update = async () => {
    const isValid = validateForm()
    if (!isValid) {
      return
    }
    const res = await createIndex(collectionInfo.table_name, { ...form })

    if (res && res.code === 0) {
      openSnackBar(t('index').saveSuccess)
      saveSuccess()
      hideDialog()
    }
  }
  return (
    <>
      <DialogTitle >{tableTrans.index} {collectionInfo.table_name}</DialogTitle>
      <DialogContent classes={{ root: classes.dialogContent }}>
        <Grid container spacing={3}>
          <Grid item sm={4}>
            <div className={classes.wrapper}><span className={classes.column}>{tableTrans.indexType}</span></div>
          </Grid>
          <Grid item sm={8}>
            <Select
              name="index_type"
              labelId="index-type"
              id="index-type-select"
              defaultValue="FLAT"
              value={form.index_type}
              onChange={handleChange}
              className={classes.select}
            >
              {
                INDEX_TYPES.map(v => (
                  <MenuItem value={v}>{v}</MenuItem>
                ))
              }
            </Select>
          </Grid>
          <Grid item sm={4}>
            <div className={classes.wrapper}><span className={classes.column}>{tableTrans.nlist}</span> </div>
          </Grid>
          <Grid item sm={6}>
            <Slider name="nlist" value={form.nlist} min={1} max={20000} onChange={(e, val) => setForm({ ...form, nlist: val })} />
          </Grid>
          <Grid item sm={2}>{form.nlist}</Grid>
        </Grid>
      </DialogContent>
      <DialogActions>

        <Button variant="outlined" onClick={() => hideDialog()} color="primary">
          {buttonTrans.cancel}
        </Button>
        <Button variant="outlined" onClick={() => update()} color="primary">
          {buttonTrans.save}
        </Button>
      </DialogActions>
    </>)
}

export default CreateIndex