import React, { useEffect, useState, useContext } from "react";
import { materialContext } from '../../context/material'
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import { useFormStyles } from "../../hooks/form";
import Typography from '@material-ui/core/Typography'
import { FormTextField } from '../../components/common/FormTextComponents'
import FormActions from '../../components/common/FormActions'
import Grid from '@material-ui/core/Grid'
const PerformanceTunning = props => {
  const classes = useFormStyles()
  const { openSnackBar } = useContext(materialContext)
  const { systemInfos = {}, serverConfig, milvusConfigs = {} } = useContext(systemContext);
  const {
    currentAddress = "",
    setMilvusConfig,
    restartNotify
  } = useContext(httpContext);
  const [performanceSetting, setPerformanceSetting] = useState({
    use_blas_threshold: "",
    gpu_search_threshold: ""
  })
  const { hardwareType = "CPU" } = systemInfos[currentAddress] || {}
  const { t } = useTranslation();
  const p_t = t("advanced").performance_tunning;
  const [isFormChange, setIsformChange] = useState(false)

  const savePerformance = async () => {
    const currSettings = {
      ...milvusConfigs,
      engine_config: {
        ...milvusConfigs.engine_config,
        use_blas_threshold: performanceSetting.use_blas_threshold,
        gpu_search_threshold: performanceSetting.gpu_search_threshold
      }
    }
    setMilvusConfig(currSettings).then(res => {
      if (res.code === 0) {
        openSnackBar(t('submitSuccess'))
        restartNotify()
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


  return (
    <div className={classes.root}>
      <Grid container>
        <FormTextField fullWidth={true} label={p_t.use_blas_threshold} value={performanceSetting.use_blas_threshold} onChange={e => { setIsformChange(true); setPerformanceSetting({ ...performanceSetting, use_blas_threshold: e.target.value }) }} />
      </Grid>
      <Typography variant="caption" component="p" align="left" paragraph>
        {p_t.use_blas_threshold_desc_1}
      </Typography>
      <Typography variant="caption" component="p" align="left" paragraph>
        {p_t.use_blas_threshold_desc_2}
      </Typography>
      <Typography variant="caption" component="p" align="left" paragraph>
        {p_t.use_blas_threshold_desc_3}
      </Typography>
      {hardwareType === "GPU" && (<>
        <FormTextField label={p_t.gpu_search_threshold} value={performanceSetting.gpu_search_threshold} onChange={e => { setIsformChange(true); setPerformanceSetting({ ...performanceSetting, gpu_search_threshold: e.target.value }) }} />
        <Typography variant="caption" component="p" align="left" paragraph>
          {p_t.gpu_search_threshold_desc1}
        </Typography>
        <Typography variant="caption" component="p" align="left" paragraph>
          {p_t.gpu_search_threshold_desc2}
        </Typography>
        <Typography variant="caption" component="p" align="left" paragraph>
          {p_t.gpu_search_threshold_desc3}
        </Typography>
      </>)}

      <FormActions save={savePerformance} cancel={resetPerformance} disableCancel={!isFormChange} />
    </div >
  )
}

export default PerformanceTunning