import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { systemContext } from '../../context/system'
import { httpContext } from '../../context/http'
import { materialContext } from '../../context/material'
import { UPDATE } from '../../consts'
import Form from '../../components/form/Form'
import { useFormValidate } from '../../hooks/form'

const OthersForm = props => {
  const { setMilvusAddress, milvusAddress } = useContext(systemContext)
  const { currentAddress } = useContext(httpContext)
  const { openSnackBar } = useContext(materialContext)
  const [form, setForm] = useState({
    prometheus: "",
    elk: ""
  })
  const { handleChange } = useFormValidate(form, setForm)

  const { t } = useTranslation();
  // const others = t("others");

  const reset = () => {
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
  const formConfigs = [{
    type: "textField",
    name: "elk",
    label: "ELK",
    value: form.elk,
    fullWidth: true,
    onChange: handleChange,
    hasMarginBottom: true,
    placeholder: "http://",
    helperText: "nothing but margin"

  }, {
    type: "textField",
    name: "prometheus",
    label: "Prometheus",
    value: form.prometheus,
    fullWidth: true,
    onChange: handleChange,
    hasMarginBottom: true,
    placeholder: "http://",
    helperText: "nothing but margin"
  }]
  return (
    <>
      <Form
        config={formConfigs}
        handleCancel={reset}
        handleSubmit={handleSubmit}
      ></Form>
    </>
  )
};

export default OthersForm;
