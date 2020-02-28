import React, { useState, useContext } from 'react';
import useStyles from './Style'
import Grid from '@material-ui/core/Grid';
import { FaQuestionCircle } from 'react-icons/fa';
import { DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import { useFormValidate } from '../../hooks/form'
import { useTranslation } from "react-i18next";
import { materialContext } from '../../context/material'
import { generateId } from '../../utils/helpers'
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
    const res = await createPartition(collectionName, { ...form, partition_name: generateId() })
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
          <Grid item sm={4}>
            <div className={classes.wrapper}><span className={classes.column}>{partitionTrans.tag}</span> <FaQuestionCircle /></div>
          </Grid>
          <Grid item sm={8}>
            <TextField
              name="partition_tag"
              value={form.address}
              onBlur={() => { handleCheck(form.partition_tag, "partition_tag") }}
              onChange={handleChange}
              placeholder={partitionTrans.tag}
              error={error.partition_tag}
              helperText={error.partition_tag && `${partitionTrans.tag}${t('required')}`}
            />
          </Grid>
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

export default CreatePartition