import React, { useContext, useState, useEffect } from 'react'
import { TextField, Button } from '@material-ui/core'
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom'
import { useFormStyles, useFormValidate } from '../../hooks/form'
import { ADD } from '../../consts'
import { useConnectMilvus } from '../../hooks'
import axios from 'axios'

axios.defaults.timeout = 2000

const defaultForm = { host: "", port: "19121" }

const LoginForm = (props) => {
  const history = useHistory()
  const connectMilvus = useConnectMilvus()
  const [form, setForm] = useState({ ...defaultForm })
  const [error, setError] = useState({})

  const classes = useFormStyles();
  const { validateForm, handleCheck, handleChange } = useFormValidate(form, setForm, setError)

  const { milvusAddress } = useContext(systemContext)
  const {
    currentAddress,
  } = useContext(httpContext)

  useEffect(() => {
    const currentConfig = milvusAddress[currentAddress] || {}
    setForm({
      host: currentConfig.host || '',
      port: currentConfig.port || ""
    })
  }, [milvusAddress, currentAddress])

  const { t } = useTranslation();
  const loginTrans = t("login");
  const buttonTrans = t("button");

  const handleSubmit = async e => {
    e.preventDefault();
    const isValid = validateForm()

    if (!isValid) {
      return
    }
    const url = `${form.host}:${form.port}`
    await connectMilvus(url, ADD, {
      ...form,
      url,
      connected: true
    })
  };

  return (
    <form className={classes.root}>
      <div>
        <TextField
          name="host"
          label={loginTrans.host}
          value={form.host}
          onBlur={() => { handleCheck(form.host, "host") }}
          onChange={handleChange}
          className={classes.textField}
          placeholder='0.0.0.0'
          error={error.host}
          helperText={error.host && `${loginTrans.host}${t('required')}`}
        />
      </div>
      <div className={classes['mt-4']}>
        <TextField
          name="port"
          label={loginTrans.port}
          value={form.port}
          onBlur={() => { handleCheck(form.port, "port") }}
          onChange={handleChange}
          className={classes.textField}
          placeholder='19121'
          error={error.port}
          helperText={error.port && `${loginTrans.port}${t('required')}`}
        />
      </div>

      <div className={classes['mt-4']}>
        <Button variant="outlined" color="primary" onClick={handleSubmit}>
          {buttonTrans.save}
        </Button>
      </div>

    </form>

  );
}
export default LoginForm