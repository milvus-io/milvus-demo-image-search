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
import { UPDATE } from '../../consts'

const MetricForm = props => {
  const { setMilvusAddress, milvusAddress, milvusConfigs } = useContext(systemContext)
  const { currentAddress } = useContext(httpContext)
  const { openSnackBar } = useContext(materialContext)
  const [isFormChange, setIsformChange] = useState(false)
  const [metricSetting, setMetricSetting] = useState({})

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

  const changePort = e => {
    setIsformChange(true)
    setMetricSetting({ ...metricSetting, port: e.target.value })
  }
  const changeAddress = e => {
    setIsformChange(true)
    setMetricSetting({ ...metricSetting, address: e.target.value })
  }
  const handleSubmit = () => {
    setMilvusAddress({
      type: UPDATE,
      payload: {
        id: currentAddress,
        values: {
          metrics: {
            enable: metricSetting.enable_monitor,
            address: metricSetting.address,
            port: metricSetting.port
          }
        }
      }
    })
    openSnackBar(t('submitSuccess'))
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
  }, [milvusAddress, currentAddress])

  return (
    <>
      <FormControlLabel
        classes={{ root: classes.formControlLabel }}
        value="start"
        control={<Switch name="enable" checked={metricSetting.enable_monitor || false} onChange={handleSwitch} color="primary" />}
        label={metrics.enable}
        labelPlacement="start"
      />
      {metricSetting.enable_monitor && (<>
        <FormTextField label={metrics.address} value={metricSetting.address || ""} onChange={changeAddress} />
        <FormTextField label={metrics.port} value={metricSetting.port || ""} onChange={changePort} />
      </>)}
      <FormActions save={handleSubmit} cancel={reset} disableCancel={!isFormChange} />
    </>
  )
};

export default MetricForm;
