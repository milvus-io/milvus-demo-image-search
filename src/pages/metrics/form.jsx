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
  const { setMilvusAddress, milvusAddress, milvusConfigs } = useContext(systemContext)
  const { currentAddress } = useContext(httpContext)
  const { openSnackBar } = useContext(materialContext)
  const [isFormChange, setIsformChange] = useState(false)
  const [metricsSetting, setMetricsSetting] = useState({})
  const { handleChange } = useFormValidate(metricsSetting, setMetricsSetting)

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
    setMetricsSetting({ ...metricsSetting, enable_monitor: e.target.checked });
  }

  const changePort = e => {
    setIsformChange(true)
    setMetricsSetting({ ...metricsSetting, port: e.target.value })
  }
  const changeAddress = e => {
    setIsformChange(true)
    setMetricsSetting({ ...metricsSetting, address: e.target.value })
  }
  const handleSubmit = () => {
    setMilvusAddress({
      type: UPDATE,
      payload: {
        id: currentAddress,
        values: {
          metrics: {
            enable: metricsSetting.enable_monitor,
            address: metricsSetting.address
          }
        }
      }
    })
    openSnackBar(t('submitSuccess'))
  }
  const reset = () => {
    const { metric_config = {} } = milvusConfigs || {}
    setMetricsSetting({
      address: metric_config.address || "",
      port: metric_config.port || "",
      enable_monitor: metric_config.enable_monitor || false,
    })
  }
  useEffect(() => {
    reset()
    //eslint-disable-next-line
  }, [milvusAddress, currentAddress])

  return (
    <>
      <FormControlLabel
        classes={{ root: classes.formControlLabel }}
        value="start"
        control={<Switch name="enable" checked={metricsSetting.enable_monitor} onChange={handleSwitch} color="primary" />}
        label={metrics.enable}
        labelPlacement="start"
      />
      <FormTextField label={metrics.address} value={metricsSetting.address} onChange={changeAddress} />
      <FormTextField label={metrics.port} value={metricsSetting.port} onChange={changePort} />
      <FormTextField label={metrics.gui} name="gui" value={metricsSetting.gui} onChange={handleChange} />
      <FormActions save={handleSubmit} cancel={reset} disableCancel={!isFormChange} />
    </>
  )
};

export default MetricForm;
