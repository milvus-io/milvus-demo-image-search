import React, { useMemo, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from '@material-ui/core/Switch'
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField'
import { UPDATE } from "../../consts";
const NetworkForm = props => {
  const classes = makeStyles(theme => ({
    gridItem: {
      marginBottom: theme.spacing(2)
    },
    formControlLabel: {
      marginBottom: theme.spacing(2),
      marginLeft: `0 !important`
    },
  }))()
  const { metricConfig } = useContext(systemContext)
  const {
    currentAddress,
    setMilvusConfig,
    restartNotify
  } = useContext(httpContext)
  const { t } = useTranslation();
  const others = t("others");

  return (
    <>
      <FormControlLabel
        classes={{ root: classes.formControlLabel }}
        value="start"
        control={<Switch color="primary" />}
        label={others.enable}
        labelPlacement="start"
      />
      <Grid item classes={{ item: classes.gridItem }} xs={6}>
        <TextField fullWidth label={others.address} variant="outlined" />
      </Grid>
      <Button variant="outlined">save</Button>
      <Button variant="outlined">cancel</Button>

    </>
  )
};

export default NetworkForm;
