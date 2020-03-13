import React, { useEffect, useState, useContext } from "react";
import { materialContext } from '../../context/material'
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import { useFormStyles } from "../../hooks/form";
import Typography from '@material-ui/core/Typography'
import Form from '../../components/form/Form'

const PerformanceTunning = props => {
  const classes = useFormStyles()
  const { openSnackBar } = useContext(materialContext)
  const { systemInfos = {}, serverConfig, milvusConfigs = {} } = useContext(systemContext);
  const {
    currentAddress = "",
    setMilvusConfig,
  } = useContext(httpContext);
  const [performanceSetting, setPerformanceSetting] = useState({
    use_blas_threshold: "",
    gpu_search_threshold: ""
  })
  const { hardwareType = "CPU" } = systemInfos[currentAddress] || {}
  const isCPU = hardwareType === "CPU"
  const { t } = useTranslation();
  const p_t = t("advanced").performance_tunning;
  const [isFormChange, setIsformChange] = useState(false)

  const savePerformance = async () => {
    const currSettings = {
      engine_config: {
        use_blas_threshold: performanceSetting.use_blas_threshold || 1100,
        gpu_search_threshold: performanceSetting.gpu_search_threshold || 1000
      }
    }
    if (isCPU) {
      delete currSettings.engine_config.gpu_search_threshold
    }
    setMilvusConfig(currSettings).then(res => {
      if (res.code === 0) {
        openSnackBar(t('submitSuccess'))
        setIsformChange(false)
      }
    })
  }
  const resetPerformance = () => {
    const { engine_config = {} } = milvusConfigs
    setPerformanceSetting({ use_blas_threshold: engine_config.use_blas_threshold || "", gpu_search_threshold: engine_config.gpu_search_threshold || "" })
    setIsformChange(false)
  }
  useEffect(() => {
    resetPerformance()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAddress, serverConfig])

  const cpuConfigs = [{
    type: "textField",
    name: "use_blas_threshold",
    fullWidth: true,
    label: p_t.use_blas_threshold,
    value: performanceSetting.use_blas_threshold,
    placeholder: p_t.use_blas_threshold,
    onChange: e => { setIsformChange(true); setPerformanceSetting({ ...performanceSetting, use_blas_threshold: e.target.value }) }
  }, {
    type: "other",
    name: "use_blas_threshold_desc",
    sm: 12,
    component: () => (
      <>
        <Typography variant="caption" component="p" align="left" paragraph>
          {p_t.use_blas_threshold_desc_1}
        </Typography>
        <Typography variant="caption" component="p" align="left" paragraph>
          {p_t.use_blas_threshold_desc_2}
        </Typography>
        <Typography variant="caption" component="p" align="left" paragraph>
          {p_t.use_blas_threshold_desc_3}
        </Typography>
      </>
    )
  }]

  const gpuConfigs = isCPU ? [] : [{
    type: "textField",
    name: "gpu_search_threshold",
    fullWidth: true,
    label: p_t.gpu_search_threshold,
    value: performanceSetting.gpu_search_threshold,
    placeholder: p_t.gpu_search_threshold,
    onChange: e => { setIsformChange(true); setPerformanceSetting({ ...performanceSetting, gpu_search_threshold: e.target.value }) }
  }, {
    type: "other",
    name: "use_blas_threshold_desc",
    sm: 12,
    component: () => (
      <>
        <Typography variant="caption" component="p" align="left" paragraph>
          {p_t.gpu_search_threshold_desc1}
        </Typography>
        <Typography variant="caption" component="p" align="left" paragraph>
          {p_t.gpu_search_threshold_desc2}
        </Typography>
        <Typography variant="caption" component="p" align="left" paragraph>
          {p_t.gpu_search_threshold_desc3}
        </Typography>
      </>
    )
  }]

  return (
    <div className={classes.root}>
      <Form
        config={[...cpuConfigs, ...gpuConfigs]}
        handleSubmit={savePerformance}
        handleCancel={resetPerformance}
        isFormChange={isFormChange}
      ></Form>
    </div >
  )
}

export default PerformanceTunning