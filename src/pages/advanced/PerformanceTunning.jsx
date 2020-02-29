import React, { useEffect, useState, useContext, useMemo } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import { systemContext } from '../../context/system'
// import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import { useFormStyles, useFormValidate } from "../../hooks/form";
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'


const PerformanceTunning = props => {
  const classes = makeStyles(theme => ({
    root: {
      paddingTop: theme.spacing(2)
    },
    wrapper: {
      marginBottom: theme.spacing(2)
    },
  }))()
  const { t } = useTranslation();
  const p_t = t("advanced").performance_tunning;
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item sm={5}>
          <Typography variant="h5" component="h2" align="left">
            {p_t.use_blas_threshold}
          </Typography>
        </Grid>
        <Grid item sm={2}>
          <TextField fullWidth={true} variant="outlined" size="small"/>
        </Grid>
      </Grid>
      <Typography variant="p" component="h2" align="left" paragraph>
        {p_t.use_blas_threshold_desc_1}
      </Typography>
      <Typography variant="p" component="h2" align="left" paragraph>
        {p_t.use_blas_threshold_desc_2}
      </Typography>
      <Typography variant="p" component="h2" align="left" paragraph>
        {p_t.use_blas_threshold_desc_3}
      </Typography>

      <Grid container>
        <Grid item sm={5}>
          <Typography variant="h5" component="h2" align="left">
            {p_t.gpu_search_threshold}
          </Typography>
        </Grid>
        <Grid item sm={2}>
          <TextField fullWidth={true} variant="outlined" size="small"/>
        </Grid>
      </Grid>
      <Typography variant="p" component="h2" align="left" paragraph>
        {p_t.gpu_search_threshold_desc1}
      </Typography>
      <Typography variant="p" component="h2" align="left" paragraph>
        {p_t.gpu_search_threshold_desc2}
      </Typography>
      <Typography variant="p" component="h2" align="left" paragraph>
        {p_t.gpu_search_threshold_desc3}
      </Typography>

      <Button variant="outlined" color="primary">Save</Button>
      <Button>Cancle</Button>
    </div >
  )
}

export default PerformanceTunning