import React, { useState, useContext, useEffect } from "react";
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { materialContext } from '../../context/material'
import { useTranslation } from "react-i18next";
import { useFormStyles, useFormValidate } from '../../hooks/form'
import { safetyGet } from '../../utils/helpers'
import Form from '../../components/form/Form'

const defaultForm = {
  type: "mysql",
  host: "",
  port: "",
  username: "",
  password: ""
}
const MetaDataForm = function (props) {
  const { dbConfig } = useContext(systemContext)
  const {
    currentAddress,
    setMilvusConfig,
    restartNotify
  } = useContext(httpContext)
  const { openSnackBar } = useContext(materialContext)

  const { t } = useTranslation();
  const metaDataTrans = t("storage").metadata;
  const [form, setForm] = useState({ ...defaultForm })
  const [error, setError] = useState({})

  const classes = useFormStyles();
  const { validateForm, handleCheck, handleChange } = useFormValidate(form, setForm, setError)

  useEffect(() => {
    const currentConfig = dbConfig[currentAddress] || {}
    setForm({
      type: safetyGet(currentConfig, 'type', 'mysql'),
      host: safetyGet(currentConfig, 'host'),
      port: safetyGet(currentConfig, 'port'),
      username: safetyGet(currentConfig, 'username'),
      password: safetyGet(currentConfig, 'password')
    })
  }, [currentAddress, dbConfig])

  const handleSubmit = async e => {
    e.preventDefault();
    const isValid = validateForm()
    if (!isValid) {
      return
    }
    const { host, port, username, password, type } = form
    const url = `${type}://${username}:${password}@${host}:${port}/`
    const res = await setMilvusConfig({
      db_config: {
        backend_url: url
      }
    })
    if (res.code === 0) {
      openSnackBar(t("submitSuccess"));
      restartNotify()
    }

  };

  const handleCancel = () => {
    setForm({ ...defaultForm })
    setError({})
  };

  const formConfigs = [
    {
      type: "select",
      name: "type",
      value: form.type,
      onChange: handleChange,
      selectOptions: [{ value: "mysql", label: "Mysql" }, { value: "sqlite", label: "Sqlite" }]
    },
    {
      type: "textField",
      name: "host",
      label: metaDataTrans.host,
      value: form.host,
      fullWidth: true,
      onBlur: () => { handleCheck(form.host, "host") },
      onChange: handleChange,
      placeholder: "0.0.0.0",
      error: error.host,
      helperText: `${metaDataTrans.host}${t('required')}`
    },
    {
      type: "textField",
      name: "port",
      label: metaDataTrans.port,
      value: form.port,
      fullWidth: true,
      onBlur: () => { handleCheck(form.port, "port") },
      onChange: handleChange,
      placeholder: "19121",
      error: error.port,
      helperText: `${metaDataTrans.port}${t('required')}`
    },
    {
      type: "textField",
      name: "username",
      label: metaDataTrans.username,
      value: form.username,
      fullWidth: true,
      onBlur: () => { handleCheck(form.username, "username") },
      onChange: handleChange,
      placeholder: metaDataTrans.username,
      error: error.username,
      helperText: `${metaDataTrans.username}${t('required')}`
    },
    {
      type: "textField",
      name: "password",
      label: metaDataTrans.password,
      value: form.password,
      fullWidth: true,
      onBlur: () => { handleCheck(form.password, "password") },
      onChange: handleChange,
      placeholder: metaDataTrans.password,
      error: error.password,
      helperText: `${metaDataTrans.password}${t('required')}`
    }
  ]
  return (
    <Form
      config={formConfigs}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
    ></Form>

  );
}

export default MetaDataForm;
