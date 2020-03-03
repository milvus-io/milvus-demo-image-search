import React, { useMemo, useState, useContext } from "react";
import { systemContext } from '../../context/system'
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import { FormTextField } from '../../components/common/FormTextComponents'
import FormActions from '../../components/common/FormActions'

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
  // const { form } = props;
  // const { metricConfig } = useContext(systemContext)
  // const {
  //   currentAddress,
  //   setMilvusConfig,
  //   restartNotify
  // } = useContext(httpContext)
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
      <FormTextField label={metrics.address} />
      <FormTextField label={metrics.port} />
      <FormTextField label={metrics.gui} />
      <FormActions />
    </>
  )
};

export default MetricForm;
