import React, { useContext, useState, useEffect } from 'react'
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { materialContext } from '../../context/material'
import { useTranslation } from "react-i18next";
import { useFormValidate } from '../../hooks/form'
import Form from '../../components/form/Form'
const defaultForm = { address: "", port: "" }

const NetworkFrom = (props) => {
  const [form, setForm] = useState({ ...defaultForm })
  const [error, setError] = useState({})
  const [isFormChange, setIsformChange] = useState(false)
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

  const handleSubmit = async e => {
    e.preventDefault();
    const isValid = validateForm()

    if (!isValid) {
      return
    }
    const res = await setMilvusConfig({ server_config: { ...form } })
    if (res && res.code === 0) {
      openSnackBar(t('submitSuccess'))
      setIsformChange(false);
      restartNotify()
    }
  };

  const handleCancel = () => {
    const currentConfig = serverConfig[currentAddress] || {}
    setForm({
      address: currentConfig.address || "",
      port: currentConfig.port || ""
    })
    setIsformChange(false)
  };

  useEffect(() => {
    handleCancel()
    // eslint-disable-next-line
  }, [currentAddress, serverConfig])

  const formConfig = [
    {
      type: "textField",
      name: "address",
      fullWidth: true,
      value: form.address,
      placeholder: networkTrans.address,
      label: networkTrans.address,
      error: error.address,
      helperText: `${networkTrans.address}${t('required')}`,
      onBlur: () => { handleCheck(form.address, "address") },
      onChange: e => { handleChange(e); setIsformChange(true) },
    },
    {
      type: "textField",
      name: "port",
      fullWidth: true,
      label: networkTrans.port,
      value: form.port,
      placeholder: networkTrans.port,
      error: error.port,
      helperText: `${networkTrans.port}${t('required')}`,
      onBlur: () => { handleCheck(form.port, "port") },
      onChange: e => { handleChange(e); setIsformChange(true) },
    }
  ]

  return (
    <>
      <Form
        config={formConfig}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        isFormChange={isFormChange}
      ></Form>
    </>

  );
}
export default NetworkFrom