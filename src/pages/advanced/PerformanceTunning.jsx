import React, { useEffect, useState, useContext, useMemo } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import { systemContext } from '../../context/system'
// import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import { useFormStyles, useFormValidate } from "../../hooks/form";
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormActions from '../../components/common/FormActions'

const PerformanceTunning = props => {
  const classes = useFormStyles()
  const { t } = useTranslation();
  const p_t = t("advanced").performance_tunning;
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item sm={3}>
          <Typography variant="h6" component="p" align="left">
            {p_t.use_blas_threshold}
          </Typography>
        </Grid>
        <Grid item sm={1}>
          <TextField fullWidth={true} variant="outlined" size="small" />
        </Grid>
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

      <Grid container>
        <Grid item sm={3}>
          <Typography variant="h6" component="p" align="left">
            {p_t.gpu_search_threshold}
          </Typography>
        </Grid>
        <Grid item sm={1}>
          <TextField fullWidth={true} variant="outlined" size="small" />
        </Grid>
      </Grid>
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