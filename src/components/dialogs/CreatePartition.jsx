import React, { useState, useContext } from 'react';
import useStyles from './Style'
import { DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core'
import { useFormValidate } from '../../hooks/form'
import { useTranslation } from "react-i18next";
import { materialContext } from '../../context/material'
import Form from '../form/Form'

const CreatePartition = props => {
  const classes = useStyles()
  const [form, setForm] = useState({ partition_tag: " " })
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
    const res = await createPartition(collectionName, { partition_tag: form.partition_tag.trim() })
    if (res && res.code === 0) {
      openSnackBar(partitionTrans.saveSuccess)
      saveSuccess()
      hideDialog()
    }
  }
  const formConfigs = [{
    type: "textField",
    name: "partition_tag",
    label: partitionTrans.tag,
    value: form.partition_tag,
    fullWidth: true,
    sm: 12,
    onBlur: () => { handleCheck(form.partition_tag, "partition_tag") },
    onChange: handleChange,
    placeholder: partitionTrans.tag,
    error: error.partition_tag,
    helperText: `${partitionTrans.tag}${t('required')}`
  }]
  return (
    <>
      <DialogTitle >{partitionTrans.create}</DialogTitle>
      <DialogContent classes={{ root: classes.dialogContent }}>
        <Form config={formConfigs}></Form>

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