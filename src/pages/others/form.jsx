import React, { useContext, useState, useEffect } from "react";
// import { systemContext } from '../../context/system'
// import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import { FormTextField } from '../../components/common/FormTextComponents'
import FormActions from '../../components/common/FormActions'
import { systemContext } from '../../context/system'
import { httpContext } from '../../context/http'
import { materialContext } from '../../context/material'
// import { useFormValidate } from '../../hooks/form'
import { UPDATE } from '../../consts'
// import { UPDATE } from "../../consts";
const OthersForm = props => {
  const { setMilvusAddress, milvusAddress } = useContext(systemContext)
  const { currentAddress } = useContext(httpContext)
  const { openSnackBar } = useContext(materialContext)
  const [form, setForm] = useState({
    intergration: "",
    address: ""
  })
  const [isFormChange, setIsformChange] = useState(false)

  const { t } = useTranslation();
  // const others = t("others");

  const reset = () => {
    setIsformChange(false)
    const { elk = {} } = milvusAddress[currentAddress] || {}
    setForm({
      enable: elk.enable || false,
      address: elk.address || ''
    })
  }
  useEffect(() => {
    reset()
  }, [milvusAddress, currentAddress])

  const handleSubmit = () => {
    setMilvusAddress({
      type: UPDATE,
      payload: {
        id: currentAddress,
        values: {
          elk: {
            enable: form.enable,
            address: form.address
          }
        }
      }
    })
    openSnackBar(t('submitSuccess'))
  }
  //TODO: not sure relations between gui and address
  return (
    <>
      <FormTextField label={"ELK"} value={form.intergration || ""} onChange={e => { setForm({ ...form, intergration: e.target.value }); setIsformChange(true) }} />
      <FormTextField label={"Prometheus"} value={form.address || ""} onChange={e => { setForm({ ...form, address: e.target.value }); setIsformChange(true) }} />
      <FormActions save={handleSubmit} cancel={reset} disableCancel={!isFormChange} />
    </>
  )
};

export default OthersForm;
