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
    prometheus: "",
    elk: ""
  })
  const [isFormChange, setIsformChange] = useState(false)

  const { t } = useTranslation();
  // const others = t("others");

  const reset = () => {
    setIsformChange(false)
    const { elk = "", prometheus = "" } = milvusAddress[currentAddress] || {}
    setForm({
      prometheus,
      elk
    })
  }
  useEffect(() => {
    reset()
    //eslint-disable-next-line
  }, [milvusAddress, currentAddress])

  const handleSubmit = () => {
    setMilvusAddress({
      type: UPDATE,
      payload: {
        id: currentAddress,
        values: {
          elk: form.elk,
          prometheus: form.prometheus
        }
      }
    })
    openSnackBar(t('submitSuccess'))
  }
  return (
    <>
      <FormTextField label={"ELK"} value={form.elk || ""} onChange={e => { setForm({ ...form, elk: e.target.value }); setIsformChange(true) }} />
      <FormTextField label={"Prometheus"} value={form.prometheus || ""} onChange={e => { setForm({ ...form, prometheus: e.target.value }); setIsformChange(true) }} />
      <FormActions save={handleSubmit} cancel={reset} disableCancel={!isFormChange} />
    </>
  )
};

export default OthersForm;
