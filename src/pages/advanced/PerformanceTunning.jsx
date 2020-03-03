import React, { useEffect, useState, useContext, useMemo } from "react";
// import { systemContext } from '../../context/system'
// import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import { useFormStyles, useFormValidate } from "../../hooks/form";
import Typography from '@material-ui/core/Typography'
import { FormTextField } from '../../components/common/FormTextComponents'
import FormActions from '../../components/common/FormActions'
import Grid from '@material-ui/core/Grid'
const PerformanceTunning = props => {
  const classes = useFormStyles()
  const [performanceSetting, setPerformanceSetting] = useState({
    use_blas_threshold: "",
    gpu_search_threshold: ""
  })
  const { t } = useTranslation();
  const p_t = t("advanced").performance_tunning;
  return (
    <div className={classes.root}>
      <Grid container>
        <FormTextField fullWidth={true} label={p_t.use_blas_threshold} value={performanceSetting.use_blas_threshold} onChange={e => setPerformanceSetting({ ...performanceSetting, use_blas_threshold: e.target.value })} />
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

      <FormTextField label={p_t.gpu_search_threshold} value={performanceSetting.gpu_search_threshold} onChange={e => setPerformanceSetting({ ...performanceSetting, gpu_search_threshold: e.target.value })} />
      <Typography variant="caption" component="p" align="left" paragraph>
        {p_t.gpu_search_threshold_desc1}
      </Typography>
      <Typography variant="caption" component="p" align="left" paragraph>
        {p_t.gpu_search_threshold_desc2}
      </Typography>
      <Typography variant="caption" component="p" align="left" paragraph>
        {p_t.gpu_search_threshold_desc3}
      </Typography>
      <FormActions />
    </div >
  )
}

export default PerformanceTunning