import React, { useContext, useState, useEffect } from 'react'
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import { useFormValidate } from '../../hooks/form'
import { ADD } from '../../consts'
import { useConnectMilvus } from '../../hooks'
import axios from 'axios'
import { FormTextField } from '../../components/common/FormTextComponents'
import FormActions from '../../components/common/FormActions'

axios.defaults.timeout = 2000

const defaultForm = { host: "", port: "19121" }

const LoginForm = (props) => {
  const connectMilvus = useConnectMilvus()
  const [form, setForm] = useState({ ...defaultForm })
  const [isFormChange, setIsformChange] = useState(false)
  const [error, setError] = useState({})

  const { validateForm, handleCheck, handleChange } = useFormValidate(form, setForm, setError)

  const { milvusAddress } = useContext(systemContext)
  const {
    currentAddress,
  } = useContext(httpContext)

  const reset = () => {
    const currentConfig = milvusAddress[currentAddress] || {}
    setForm({
      host: currentConfig.host || '',
      port: currentConfig.port || ""
    })
    setIsformChange(false)
  }

  useEffect(() => {
    reset()
    // eslint-disable-next-line
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
    <>
      <FormTextField
        name="host"
        label={loginTrans.host}
        value={form.host}
        onBlur={() => { handleCheck(form.host, "host") }}
        onChange={e => { handleChange(e); setIsformChange(true) }}
        placeholder='0.0.0.0'
        error={error.host}
        helperText={error.host && `${loginTrans.host}${t('required')}`}
      />
      <FormTextField
        name="port"
        label={loginTrans.port}
        value={form.port}
        onBlur={() => { handleCheck(form.port, "port") }}
        onChange={e => { handleChange(e); setIsformChange(true) }}
        placeholder='19121'
        error={error.port}
        helperText={error.port && `${loginTrans.port}${t('required')}`}
      />
      <FormActions save={handleSubmit} cancel={reset} confirmLabel={buttonTrans.connect} disableCancel={!isFormChange} />
    </>
  );
}
export default LoginForm