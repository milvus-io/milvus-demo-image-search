import React, { useState, useContext } from 'react';
import useStyles from './Style'
import Grid from '@material-ui/core/Grid';
import { DialogActions, DialogContent, DialogTitle, Button, Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import { useFormValidate } from '../../hooks/form'
import { useTranslation } from "react-i18next";
import { materialContext } from '../../context/material'
const CreatePartition = props => {
  const classes = useStyles()
  const [form, setForm] = useState({ partition_tag: "" })
  const [error, setError] = useState({})
  const { validateForm, handleCheck, handleChange } = useFormValidate(form, setForm, setError)
  const { hideDialog, openSnackBar } = useContext(materialContext)

  const { createPartition, collectionName, saveSuccess } = props;
  const { t } = useTranslation();
  const partitionTrans = t("partition");
  const buttonTrans = t("button");
  const update = async () => {
    const isValid = validateForm()
    if (!isValid) {
      return
    }
    const res = await createPartition(collectionName, { ...form })
    if (res && res.code === 0) {
      openSnackBar(partitionTrans.saveSuccess)
      saveSuccess()
      hideDialog()
    }
  }
  return (
    <>
      <DialogTitle >{partitionTrans.create}</DialogTitle>
      <DialogContent classes={{ root: classes.dialogContent }}>
        <Grid container spacing={3}>
          {/* <Grid item sm={4}>
            <div className={classes.wrapper}><span className={classes.column}>{partitionTrans.tag}</span> <FaQuestionCircle /></div>
          </Grid> */}
          <Grid item sm={12}>
            <Typography className={classes.label}>{partitionTrans.tag}</Typography>
          </Grid>
          <Grid item sm={12}>
            <TextField
              name="partition_tag"
              className={classes.textField}
              value={form.address}
              onBlur={() => { handleCheck(form.partition_tag, "partition_tag") }}
              onChange={handleChange}
              placeholder={partitionTrans.tag}
              error={error.partition_tag}
              variant="outlined"
              helperText={error.partition_tag && `${partitionTrans.tag}${t('required')}`}
            />
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

export default CreatePartition