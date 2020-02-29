import React, { useEffect, useState, useContext, useMemo } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import { useFormStyles, useFormValidate } from "../../hooks/form";
import Grid from '@material-ui/core/Grid'
import Slider from '@material-ui/core/Slider'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import FormActions from '../../components/common/FormActions'
import { FormDivider } from '../../components/common/FormTextComponents'

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
    <div className={classes.root}>
      <Grid container>
        <Grid item sm={3} >
          <Typography >{advancedTrans.cpu_capacity}</Typography>
        </Grid>
        <Grid item sm={4} >
          <Slider value={6} min={1} max={16} />
        </Grid>
        <Grid item sm={1} >
          <Typography varient="p" component="p" align="center">6GB</Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography paragraph variant="caption" component="p" >{advancedTrans.cpu_capacity_desc}</Typography>
        </Grid>
        <Grid item sm={3} >
          <Typography >{advancedTrans.cpu_threshold}</Typography>
        </Grid>
        <Grid item sm={4} >
          <Slider value={6} min={1} max={16} />
        </Grid>
        <Grid item sm={1} >
          <Typography varient="p" component="p" align="center">6%</Typography>
        </Grid>
        <Grid item sm={12} >
          <Typography paragraph variant="caption" component="p" >{advancedTrans.cpu_threshold_desc}</Typography>
        </Grid>
        <Grid item sm={12}>
          <FormDivider />
        </Grid>
        <Grid item sm={3} >
          <Typography>{advancedTrans.gpu_capacity}</Typography>
        </Grid>
        <Grid item sm={4} >
          <Slider value={6} min={1} max={16} />
        </Grid>
        <Grid item sm={1} >
          <Typography varient="p" component="p" align="center">6%</Typography>
        </Grid>
        <Grid item sm={12} >
          <Typography paragraph variant="caption" component="p" >{advancedTrans.gpu_capacity_desc}</Typography>
        </Grid>
        <Grid item sm={3} >
          <Typography >{advancedTrans.gpu_threshold}</Typography>
        </Grid>
        <Grid item sm={4} >
          <Slider value={6} min={1} max={16} />
        </Grid>
        <Grid item sm={1} >
          <Typography varient="p" component="p" align="center">6%</Typography>
        </Grid>
        <Grid item sm={12} >
          <Typography paragraph variant="caption" component="p" >{advancedTrans.gpu_threshold_desc}</Typography>
        </Grid>
        <Grid item sm={12}>
          <FormDivider />
        </Grid>

        <Grid item sm={3} >
          {advancedTrans.catch_insert_data}
        </Grid>
        <Grid item sm={3} >
          <Switch />
        </Grid>
        <Grid item sm={12} >
          <Typography paragraph variant="caption" component="p" >{advancedTrans.catch_insert_data_desc}</Typography>
        </Grid>

        <Grid item sm={3} >
          <Typography>{advancedTrans.insert_buffer_size}</Typography>
        </Grid>
        <Grid item sm={6} >
          <Slider value={6} min={1} max={16} />
        </Grid>
        <Grid item sm={1} >
          <Typography varient="p" component="p" align="center">6%</Typography>
        </Grid>
        <Grid item sm={12} >
          <Typography paragraph variant="caption" component="p" >{advancedTrans.insert_buffer_size_desc}</Typography>
        </Grid>
      </Grid>
      <FormActions />
    </div>
  );
};

export default AdvancedForm;
