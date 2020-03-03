import React, { useState, useContext } from 'react';
import { materialContext } from '../../context/material'
import { useFormValidate } from '../../hooks/form'
import useStyles from './Style'
import Grid from '@material-ui/core/Grid';
import { Slider, Select, MenuItem, DialogActions, DialogContent, DialogTitle, Button, Typography, FormControl } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import { useTranslation } from "react-i18next";

const defaultForm = {
  table_name: '',
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
  const { createTable, saveSuccess } = props

  const update = async () => {
    const isValid = validateForm()
    if (!isValid) {
      return
    }
    const res = await createTable({ ...form })
    console.log(res)
    if (res && res.code === 0) {
      saveSuccess()
      openSnackBar(tableTrans.saveSuccess)
      hideDialog()
    }
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
              name="table_name"
              className={classes.textField}
              value={form.table_name}
              onBlur={() => { handleCheck(form.table_name, "table_name") }}
              onChange={handleChange}
              placeholder={'Collection Name'}
              error={error.table_name}
              variant="outlined"
              helperText={error.table_name && `${tableTrans.tName}${t('required')}`}
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
            <Slider
              name="dimension"
              value={form.dimension}
              min={1}
              valueLabelDisplay="auto"
              max={16384}
              onChange={(e, val) => setForm({ ...form, dimension: val })} />
          </Grid>
          {/* <Grid item sm={4}>
            <div className={classes.wrapper}><span className={classes.column}>{tableTrans.fileSize}</span> <FaQuestionCircle /></div>
          </Grid> */}
          <Grid item sm={12}>
            <Typography className={classes.label}>{tableTrans.fileSize}</Typography>
          </Grid>
          <Grid item sm={12}>

            <Slider
              value={form.index_file_size}
              valueLabelDisplay="auto"
              min={1}
              max={4096}
              onChange={(e, val) => setForm({ ...form, index_file_size: val })} />
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