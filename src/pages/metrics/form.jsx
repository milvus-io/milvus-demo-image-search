import React, { useEffect, useState, useContext } from "react";
import { systemContext } from '../../context/system'
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { httpContext } from "../../context/http"
import { materialContext } from "../../context/material"

import { useTranslation } from "react-i18next";
import { FormTextField } from '../../components/common/FormTextComponents'
import FormActions from '../../components/common/FormActions'
import { useFormValidate } from '../../hooks/form'
import { UPDATE } from '../../consts'

const MetricForm = props => {
  const { setMilvusAddress, milvusAddress } = useContext(systemContext)
  const { currentAddress } = useContext(httpContext)
  const { openSnackBar } = useContext(materialContext)

  const [form, setForm] = useState({
    enable: false,
    gui: ""
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
  const metrics = t("metrics");

  useEffect(() => {
    const { metrics = {} } = milvusAddress[currentAddress] || {}
    setForm({
      enable: metrics.enable || false,
      gui: metrics.address || ''
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
          metrics: {
            enable: form.enable,
            address: form.gui
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
        label={metrics.enable}
        labelPlacement="start"
      />
      <FormTextField label={metrics.address} />
      <FormTextField label={metrics.port} />
      <FormTextField label={metrics.gui} name="gui" value={form.gui} onChange={handleChange} />
      <FormActions save={handleSubmit} />
    </>
  )
};

export default MetricForm;
