import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { systemContext } from '../../context/system'
// import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from '@material-ui/core/Switch'
import { FormTextField } from '../../components/common/FormTextComponents'
import FormActions from '../../components/common/FormActions'
import { systemContext } from '../../context/system'
import { httpContext } from '../../context/http'

import { materialContext } from '../../context/material'

import { useFormValidate } from '../../hooks/form'
import { UPDATE } from '../../consts'
// import { UPDATE } from "../../consts";
const OthersForm = props => {
  const { setMilvusAddress, milvusAddress } = useContext(systemContext)
  const { currentAddress } = useContext(httpContext)

  const { openSnackBar } = useContext(materialContext)

  const [form, setForm] = useState({
    enable: false,
    address: ""
  })
  const { handleChange } = useFormValidate(form, setForm)

  const classes = makeStyles(theme => ({
    gridItem: {
      marginBottom: theme.spacing(2)
    },
    formControlLabel: {
      marginBottom: theme.spacing(2),
      marginLeft: `0 !important`
    },
  }))()

  const { t } = useTranslation();
  const others = t("others");

  useEffect(() => {
    const { elk = {} } = milvusAddress[currentAddress] || {}
    setForm({
      enable: elk.enable || false,
      address: elk.address || ''
    })
  }, [milvusAddress, currentAddress])

  const handleSwitch = () => {
    setForm(v => ({
      ...v,
      enable: !v.enable
    }))
  }
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
  return (
    <>
      <FormControlLabel
        classes={{ root: classes.formControlLabel }}
        value="start"
        control={<Switch name="enable" checked={form.enable} onChange={handleSwitch} color="primary" />}
        label={others.enable}
        labelPlacement="start"
      />
      <FormTextField name="address" label={others.address} value={form.address} onChange={handleChange} />
      <FormActions save={handleSubmit} />
    </>
  )
};

export default OthersForm;
