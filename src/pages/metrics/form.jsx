import React, { useEffect, useState, useContext } from "react";
import { systemContext } from '../../context/system'
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { httpContext } from "../../context/http"
import { materialContext } from "../../context/material"

import { useTranslation } from "react-i18next";
import FormActions from '../../components/common/FormActions'
import Form from '../../components/form/Form'
import { useFormValidate } from '../../hooks/form'


const MetricForm = props => {
  const { milvusConfigs } = useContext(systemContext)
  const { currentAddress, setMilvusConfig, restartNotify } = useContext(httpContext)
  const { openSnackBar } = useContext(materialContext)
  const [isFormChange, setIsformChange] = useState(false)
  const [metricSetting, setMetricSetting] = useState({})
  const [error, setError] = useState({})
  const { validateForm, handleCheck, handleChange } = useFormValidate(metricSetting, setMetricSetting, setError)

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

  const handleSwitch = e => {
    setIsformChange(true)
    setMetricSetting({ ...metricSetting, enable_monitor: e.target.checked });
  }

  const handleSubmit = async () => {
    if (metricSetting.enable_monitor) {
      const isValid = validateForm()
      if (!isValid) {
        return
      }
    }
    const res = await setMilvusConfig({
      metric_config: {
        ...metricSetting
      }
    })
    if (res.code === 0) {
      openSnackBar(t('submitSuccess'))
      restartNotify()
    }
  }
  const reset = () => {
    const { metric_config = {} } = milvusConfigs || {}
    setMetricSetting({
      address: metric_config.address || "",
      port: metric_config.port || "",
      enable_monitor: metric_config.enable_monitor === "true" || false,
    })
    setIsformChange(false)
  }
  useEffect(() => {
    reset()
    //eslint-disable-next-line
  }, [currentAddress, milvusConfigs.metric_config])
  const formConfigs = [{
    type: "textField",
    name: "address",
    fullWidth: true,
    value: metricSetting.address,
    placeholder: metrics.address,
    label: metrics.address,
    error: error.address,
    helperText: `${metrics.address}${t('required')}`,
    onBlur: () => { handleCheck(metricSetting.address, "address") },
    onChange: e => { handleChange(e); setIsformChange(true) },
  },
  {
    type: "textField",
    name: "port",
    fullWidth: true,
    value: metricSetting.port,
    placeholder: metrics.port,
    label: metrics.port,
    error: error.port,
    helperText: `${metrics.port}${t('required')}`,
    onBlur: () => { handleCheck(metricSetting.port, "port") },
    onChange: e => { handleChange(e); setIsformChange(true) },
  }]
  return (
    <>
      <FormControlLabel
        classes={{ root: classes.formControlLabel }}
        value="start"
        control={<Switch name="enable" checked={metricSetting.enable_monitor || false} onChange={handleSwitch} color="primary" />}
        label={metrics.enable}
        labelPlacement="start"
      />
      {metricSetting.enable_monitor && <Form config={formConfigs}></Form>}
      <FormActions save={handleSubmit} cancel={reset} disableCancel={!isFormChange} />
    </>
  )
};

export default MetricForm;
