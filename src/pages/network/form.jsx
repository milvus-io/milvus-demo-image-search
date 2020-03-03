import React, { useContext, useState, useEffect } from 'react'
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { materialContext } from '../../context/material'
import { useTranslation } from "react-i18next";
import { useFormValidate } from '../../hooks/form'
import { FormTextField } from '../../components/common/FormTextComponents'
import FormActions from '../../components/common/FormActions'
const defaultForm = { address: "", port: "" }

const NetworkFrom = (props) => {
  const [form, setForm] = useState({ ...defaultForm })
  const [error, setError] = useState({})

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
    if (res && res.code === 0) {
      openSnackBar(t('submitSuccess'))
      restartNotify()
    }
  };

  const handleCancel = async () => {
    setForm({ ...defaultForm })
    setError({})
  };

  return (
    <>
      <FormTextField
        name="address"
        label={networkTrans.address}
        value={form.address}
        onBlur={() => { handleCheck(form.address, "address") }}
        onChange={handleChange}
        placeholder={networkTrans.address}
        error={error.address}
        helperText={error.address && `${networkTrans.address}${t('required')}`}
      />
      <FormTextField
        name="port"
        label={networkTrans.port}
        value={form.port}
        onBlur={() => { handleCheck(form.port, "port") }}
        onChange={handleChange}
        placeholder={networkTrans.port}
        error={error.port}
        helperText={error.port && `${networkTrans.port}${t('required')}`}
      />
      <FormActions save={handleSubmit} cancel={handleCancel} />
    </>

  );
}
export default NetworkFrom