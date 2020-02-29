import React, { useEffect, useState, useContext, useMemo } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import { useFormStyles, useFormValidate } from "../../hooks/form";
import Grid from '@material-ui/core/Grid'
import Slider from '@material-ui/core/Slider'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
const AdvancedForm = props => {
  const { systemInfos } = useContext(systemContext)
  const theme = useTheme()
  const classes = useFormStyles();
  const {
    getAdvancedConfig,
    updateAdvancedConfig,
    getHardwareType,
    currentAddress
  } = useContext(httpContext)
  const [oldValue, setOldValue] = useState({});
  const [hardwareType, setHardwareType] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const { t } = useTranslation();
  const advancedTrans = t("advanced");
  const buttonTrans = t("button");

  return (
    <form>
      <div style={{ marginTop: theme.spacing(1), padding: theme.spacing(2) }}>
        <Grid container spacing={3}>
          <Grid item sm={3} classes={{ root: classes.gridItem }}>
            <span>{advancedTrans.cpu_capacity}</span>
          </Grid>
          <Grid item sm={4} classes={{ root: classes.gridItem }}>
            <Slider value={6} min={1} max={16} />
          </Grid>
          <Grid item sm={3} classes={{ root: classes.gridItem }}>
            <span style={{ padding: theme.spacing(1) }}>6GB</span>
          </Grid>
          <Grid item sm={12} classes={{ root: classes.gridItem }}>
            <span style={{ marginBottom: theme.spacing(1) }}>{advancedTrans.cpu_capacity_desc}</span>
          </Grid>
          <Grid item sm={3} classes={{ root: classes.gridItem }}>
            <span >{advancedTrans.cpu_threshold}</span>
          </Grid>
          <Grid item sm={4} classes={{ root: classes.gridItem }}>
            <Slider value={6} min={1} max={16} />
          </Grid>
          <Grid item sm={3} classes={{ root: classes.gridItem }}>
            <span style={{ padding: theme.spacing(1) }}>6%</span>
          </Grid>
          <Grid item sm={12} classes={{ root: classes.gridItem }}>
            {advancedTrans.cpu_threshold_desc}
          </Grid>
          <Grid item sm={12}>
            <Divider />
          </Grid>
          <Grid item sm={3} classes={{ root: classes.gridItem }}>
            <span>{advancedTrans.gpu_capacity}</span>
          </Grid>
          <Grid item sm={4} classes={{ root: classes.gridItem }}>
            <Slider value={6} min={1} max={16} />
          </Grid>
          <Grid item sm={3} classes={{ root: classes.gridItem }}>
            <span style={{ padding: theme.spacing(1) }}>6%</span>
          </Grid>
          <Grid item sm={12} classes={{ root: classes.gridItem }}>
            {advancedTrans.gpu_capacity_desc}
          </Grid>
          <Grid item sm={3} classes={{ root: classes.gridItem }}>
            <span >{advancedTrans.gpu_threshold}</span>
          </Grid>
          <Grid item sm={4} classes={{ root: classes.gridItem }}>
            <Slider value={6} min={1} max={16} />
          </Grid>
          <Grid item sm={3} classes={{ root: classes.gridItem }}>
            <span style={{ padding: theme.spacing(1) }}>6%</span>
          </Grid>
          <Grid item sm={12} classes={{ root: classes.gridItem }}>
            {advancedTrans.gpu_threshold_desc}
          </Grid>
          <Grid item sm={12}>
            <Divider />
          </Grid>

          <Grid item sm={3} classes={{ root: classes.gridItem }}>
            {advancedTrans.catch_insert_data}
          </Grid>
          <Grid item sm={3} classes={{ root: classes.gridItem }}>
            <Switch />
          </Grid>
          <Grid item sm={12} classes={{ root: classes.gridItem }}>
            {advancedTrans.catch_insert_data_desc}
          </Grid>

          <Grid item sm={3} classes={{ root: classes.gridItem }}>
            <span>{advancedTrans.insert_buffer_size}</span>
          </Grid>
          <Grid item sm={6} classes={{ root: classes.gridItem }}>
            <Slider value={6} min={1} max={16} />
          </Grid>
          <Grid item sm={3} classes={{ root: classes.gridItem }}>
            <span style={{ padding: theme.spacing(1) }}>6%</span>
          </Grid>
          <Grid item sm={12} classes={{ root: classes.gridItem }}>
            {advancedTrans.insert_buffer_size_desc}
          </Grid>
        </Grid>
        <div>
          <Button
            loading={loading}
            type="primary"
          >
            {buttonTrans.update}
          </Button>
          <Button className=" mr-10" >
            {buttonTrans.cancel}
          </Button>
        </div>
      </div>
    </form>

  );
};

export default AdvancedForm;
