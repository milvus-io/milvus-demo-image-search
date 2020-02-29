import React, { useState, useContext } from 'react';
import { materialContext } from '../../context/material'
import { useFormValidate, useFormStyles } from '../../hooks/form'
import useStyles from './Style'
import Grid from '@material-ui/core/Grid';
import { FaQuestionCircle } from 'react-icons/fa';
import { Slider, Select, MenuItem, DialogActions, DialogContent, DialogTitle, Button, FormControl, InputLabel } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import { useTranslation } from "react-i18next";

const defaultForm = {
  table_name: '',
  metric_type: 'L2',
  dimension: 10,
  index_file_size: 1024
}

const CreateCollection = props => {
  const classes = useStyles()
  const formClass = useFormStyles()
  const [form, setForm] = useState({ ...defaultForm })
  const [error, setError] = useState({})
  const { validateForm, handleCheck, handleChange } = useFormValidate(form, setForm, setError)

  const { hideDialog, openSnackBar } = useContext(materialContext)
  const { t } = useTranslation();
  const tableTrans = t("table");
  const tipsTrans = tableTrans.tips;
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
      <DialogContent classes={{ root: classes.DialogContent }}>
        <Grid container spacing={3}>
          <Grid item sm={4}>
            <div className={classes.wrapper}><span className={classes.column}>{tableTrans.tName}</span> <FaQuestionCircle /></div>
          </Grid>
          <Grid item sm={8}>
            <TextField
              name="table_name"
              label={tableTrans.tName}
              className={formClass.textField}
              value={form.table_name}
              onBlur={() => { handleCheck(form.table_name, "table_name") }}
              onChange={handleChange}
              placeholder={tableTrans.tName}
              error={error.table_name}
              helperText={error.table_name && `${tableTrans.tName}${t('required')}`}
            />
          </Grid>

          <Grid item sm={4}>
            <div className={classes.wrapper}><span className={classes.column}>{tableTrans.tMetric}</span> <FaQuestionCircle /></div>
          </Grid>
          <Grid item sm={8}>
            <Select
              name="metric_type"
              labelId="metric-type"
              id="metric-type-select"
              defaultValue="L2"
              value={form.type}
              onChange={handleChange}
              className={formClass.select}
            >
              <MenuItem value="L2">L2</MenuItem>
              <MenuItem value="IP">IP</MenuItem>
            </Select>
          </Grid>
          <Grid item sm={4}>
            <div className={classes.wrapper}><span className={classes.column}>{tableTrans.tDimension}</span> <FaQuestionCircle /></div>
          </Grid>
          <Grid item sm={7}>
            <Slider name="dimension" value={form.dimension} min={1} max={16384} onChange={(e, val) => setForm({ ...form, dimension: val })} />
          </Grid>
          <Grid item sm={1}>{form.dimension}</Grid>
          <Grid item sm={4}>
            <div className={classes.wrapper}><span className={classes.column}>{tableTrans.fileSize}</span> <FaQuestionCircle /></div>
          </Grid>
          <Grid item sm={7}>
            <Slider value={form.index_file_size} min={1} max={4096} onChange={(e, val) => setForm({ ...form, index_file_size: val })} />
          </Grid>
          <Grid item sm={1}>{form.index_file_size}</Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={update} color="primary">
          {buttonTrans.save}
        </Button>

        <Button variant="outlined" onClick={hideDialog} color="primary">
          {buttonTrans.cancel}
        </Button>

      </DialogActions>
    </>)
}

export default CreateCollection