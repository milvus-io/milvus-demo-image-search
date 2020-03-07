import React, { useState, useContext, useEffect } from 'react';
import useStyles from './Style'
import Grid from '@material-ui/core/Grid';
import { DialogActions, DialogContent, DialogTitle, Select, MenuItem, Button, FormControl, Slider, Typography } from '@material-ui/core'
import { useFormValidate } from '../../hooks/form'
import { useTranslation } from "react-i18next";
import { materialContext } from '../../context/material'

const INDEX_TYPES = ["IVFFLAT", "IVFSQ8", "IVFSQ8H", "IVFPQ"];

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
    const res = await createIndex(collectionInfo.collection_name, { ...form })

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
                defaultValue={INDEX_TYPES[0]}
                value={form.index_type === 'FLAT' ? INDEX_TYPES[0] : form.index_type}
                onChange={handleChange}
              >
                {
                  INDEX_TYPES.map(v => (
                    <MenuItem value={v}>{v}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          {/* <Grid item sm={4}>
            <div className={classes.wrapper}><span className={classes.column}>{tableTrans.nlist}</span> </div>
          </Grid> */}
          <Grid item sm={12}>
            <Typography className={classes.label}>{tableTrans.nlist}</Typography>
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