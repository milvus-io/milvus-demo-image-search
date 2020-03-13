import React, { useState, useContext } from 'react';
import { materialContext } from '../../context/material'
import { useFormValidate } from '../../hooks/form'
import useStyles from './Style'
import Grid from '@material-ui/core/Grid';
import { Select, MenuItem, DialogActions, DialogContent, DialogTitle, Button, Typography, FormControl } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import { useTranslation } from "react-i18next";

const defaultForm = {
  collection_name: '',
  metric_type: 'L2',
  dimension: 4,
  index_file_size: 1024
}

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
    const res = await createCollection({ ...form })
    if (res && res.code === 0) {
      saveSuccess()
      openSnackBar(tableTrans.saveSuccess)
      hideDialog()
    }
  }

  const handleDimensionChange = (e) => {
    const val = Number(e.target.value)
    setForm({ ...form, dimension: val < 1 ? 1 : val > 16384 ? 16384 : val })
  }

  const handleFileSizeChange = (e) => {
    const val = Number(e.target.value)
    setForm({ ...form, index_file_size: val < 1 ? 1 : val > 4096 ? 4096 : val })
  }

  return (
    <>
      <DialogTitle >{tableTrans.create}</DialogTitle>
      <DialogContent classes={{ root: classes.dialogContent }}>
        <Grid container spacing={1}>
          {/* <Grid item sm={4}>
            <div className={classes.wrapper}><span className={classes.column}>{tableTrans.tName}</span> <FaQuestionCircle /></div>
          </Grid> */}
          <Grid item sm={12}>
            <Typography className={classes.label}>{tableTrans.tName}</Typography>
          </Grid>
          <Grid item sm={12} >
            <TextField
              name="collection_name"
              className={classes.textField}
              value={form.collection_name}
              onBlur={() => { handleCheck(form.collection_name, "collection_name") }}
              onChange={handleChange}
              placeholder={'Collection Name'}
              error={error.collection_name}
              variant="outlined"
              helperText={`${tableTrans.tName}${t('required')}`}
            />
          </Grid>

          {/* <Grid item sm={4}>
            <div className={classes.wrapper}><span className={classes.column}>{tableTrans.tMetric}</span> <FaQuestionCircle /></div>
          </Grid> */}
          <Grid item sm={12}>
            <Typography className={classes.label}>{tableTrans.tMetric}</Typography>
          </Grid>
          <Grid item sm={12}>
            <FormControl variant="outlined" className={classes.formControl} style={{ width: "100%" }}>
              <Select
                name="metric_type"
                labelId="metric-type"
                id="metric-type-select"
                defaultValue="L2"
                value={form.type}
                onChange={handleChange}
              >
                <MenuItem value="L2">L2</MenuItem>
                <MenuItem value="IP">IP</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* <Grid item sm={4}>
            <div className={classes.wrapper}><span className={classes.column}>{tableTrans.tDimension}</span> <FaQuestionCircle /></div>
          </Grid> */}
          <Grid item sm={12}>
            <Typography className={classes.label}>{tableTrans.tDimension}</Typography>
          </Grid>
          <Grid item sm={12}>
            <TextField
              name="dimension"
              type="number"
              className={classes.textField}
              value={form.dimension}
              onBlur={() => { handleCheck(form.dimension, "dimension") }}
              onChange={handleDimensionChange}
              placeholder={tableTrans.tDimension}
              error={error.dimension}
              variant="outlined"
              helperText={`${tableTrans.tDimension}${t('required')}`}
            />
          </Grid>
          {/* <Grid item sm={4}>
            <div className={classes.wrapper}><span className={classes.column}>{tableTrans.fileSize}</span> <FaQuestionCircle /></div>
          </Grid> */}
          <Grid item sm={12}>
            <Typography className={classes.label}>{tableTrans.fileSize}</Typography>
          </Grid>
          <Grid item sm={12}>
            <TextField
              name="index_file_size"
              type="number"
              className={classes.textField}
              value={form.index_file_size}
              onBlur={() => { handleCheck(form.index_file_size, "index_file_size") }}
              onChange={handleFileSizeChange}
              placeholder={tableTrans.fileSize}
              error={error.index_file_size}
              variant="outlined"
              helperText={`${tableTrans.fileSize}${t('required')}`}
            />

          </Grid>
        </Grid>
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