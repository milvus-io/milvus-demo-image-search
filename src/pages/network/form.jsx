import React, { useContext, useState, useEffect } from 'react'
import { TextField, Button } from '@material-ui/core'
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { materialContext } from '../../context/material'
import { useTranslation } from "react-i18next";
import { useFormStyles, useFormValidate } from '../../hooks/form'

const defaultForm = { address: "", port: "" }

const NetworkFrom = (props) => {
  const [form, setForm] = useState({ ...defaultForm })
  const [error, setError] = useState({})

  const classes = useFormStyles();
  const { validateForm, handleCheck, handleChange } = useFormValidate(form, setForm, setError)

  const { serverConfig } = useContext(systemContext)
  const { openSnackBar } = useContext(materialContext)
  const {
    currentAddress,
    setMilvusConfig,
    restartNotify
  } = useContext(httpContext)

  const { t } = useTranslation();
  const networkTrans = t("network");
  const buttonTrans = t("button");

  useEffect(() => {
    const currentConfig = serverConfig[currentAddress] || {}
    setForm({
      address: currentConfig.address || "",
      port: currentConfig.port || ""
    })
  }, [currentAddress, serverConfig])


  const handleSubmit = async e => {
    e.preventDefault();
    const isValid = validateForm()

    if (!isValid) {
      return
    }
    const res = await setMilvusConfig({ server_config: { ...form } })
    if (res.code === 0) {
      openSnackBar(t('submitSuccess'))
      restartNotify()
    }
  };

  const handleCancel = async () => {
    setForm({ ...defaultForm })
    setError({})
  };

  return (
    <form className={classes.root}>
      <div>
        <TextField
          name="address"
          label={networkTrans.address}
          value={form.address}
          onBlur={() => { handleCheck(form.address, "address") }}
          onChange={handleChange}
          className={classes.textField}
          placeholder={networkTrans.address}
          error={error.address}
          helperText={error.address && `${networkTrans.address}${t('required')}`}
        />
      </div>
      <div className={classes['mt-4']}>
        <TextField
          name="port"
          label={networkTrans.port}
          value={form.port}
          onBlur={() => { handleCheck(form.port, "port") }}
          onChange={handleChange}
          className={classes.textField}
          placeholder={networkTrans.port}
          error={error.port}
          helperText={error.port && `${networkTrans.port}${t('required')}`}
        />
      </div>
      <div className={classes['mt-4']}>
        <Button variant="outlined" color="primary"  onClick={handleSubmit}>
          {buttonTrans.save}
        </Button>
        <Button variant="outlined" onClick={handleCancel}>{buttonTrans.cancel}</Button>
      </div>

    </form>

  );
}
export default NetworkFrom