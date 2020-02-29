import React, { useMemo, useState, useContext } from "react";
import { systemContext } from '../../context/system'
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import Button from '@material-ui/core/Button'
const MetricForm = props => {
  const classes = makeStyles(theme => ({
    gridItem: {
      marginBottom: theme.spacing(2)
    },
    formControlLabel: {
      marginBottom: theme.spacing(2),
      marginLeft: `0 !important`
    },
  }))()
  const { form } = props;
  const { metricConfig } = useContext(systemContext)
  const {
    currentAddress,
    setMilvusConfig,
    restartNotify
  } = useContext(httpContext)
  const { t } = useTranslation();
  const metrics = t("metrics");

  return (
    <>
      <FormControlLabel
        classes={{ root: classes.formControlLabel }}
        value="start"
        control={<Switch color="primary" />}
        label={metrics.enable}
        labelPlacement="start"
      />
      <Grid item classes={{ item: classes.gridItem }} xs={6}>
        <TextField fullWidth label={metrics.address} variant="outlined" />
      </Grid>
      <Grid item classes={{ item: classes.gridItem }} xs={6}>
        <TextField fullWidth label={metrics.port} variant="outlined" />
      </Grid>
      <Grid item classes={{ item: classes.gridItem }} xs={6}>
        <TextField fullWidth label={metrics.gui} variant="outlined" />
      </Grid>
      <Button variant="outlined">save</Button>
      <Button variant="outlined">cancel</Button>

    </>
  )
};

export default MetricForm;
