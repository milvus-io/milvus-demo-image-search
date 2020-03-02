import React, { useEffect, useState, useContext } from "react";
import { useTheme } from "@material-ui/core/styles";
import { systemContext } from "../../context/system";
import { httpContext } from "../../context/http";
import { useTranslation } from "react-i18next";
import { useFormStyles, useFormValidate } from "../../hooks/form";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import FormActions from "../../components/common/FormActions";

const Range_CPU_Capacity = { min: 1, max: 16 }
const Range_CPU_Threshold = { min: 0, max: 1 }
const Range_GPU_Capacity = { min: 1, max: 16 }
const Range_GPU_Threshold = { min: 0, max: 1 }
const Insert_Buffer_Size = { min: 0, max: 1 }

const AdvancedForm = props => {
  const { systemInfos } = useContext(systemContext);
  const theme = useTheme();
  const classes = useFormStyles();
  const {
    getAdvancedConfig,
    updateAdvancedConfig,
    getHardwareType,
    currentAddress
  } = useContext(httpContext);

  const [settings, setSettings] = useState({})
  const {
    cpu_capacity = Range_CPU_Capacity.min,
    cpu_threshold = 0.5,
    gpu_capacity = Range_GPU_Capacity.min,
    gpu_threshold = 0.5,
    catch_insert_data = true,
    insert_buffer_size = .5
  } = settings

  const { t } = useTranslation();
  const advancedTrans = t("advanced");
  const buttonTrans = t("button");

  return (
    <div className={classes.root}>
      <Grid container className={classes.part}>
        <Grid item sm={3}>
          <Typography>{advancedTrans.cpu_capacity}</Typography>
        </Grid>
        <Grid item sm={4}>
          <Slider value={cpu_capacity} min={Range_CPU_Capacity.min} max={Range_CPU_Capacity.max} onChange={(e, val) => setSettings({ ...settings, cpu_capacity: val })} />
        </Grid>
        <Grid item sm={1}>
          <Typography varient="p" component="p" align="center">
            {`${cpu_capacity}G`}
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography paragraph variant="caption" component="p">
            {advancedTrans.cpu_capacity_desc}
          </Typography>
        </Grid>
        <Grid item sm={3}>
          <Typography>{advancedTrans.cpu_threshold}</Typography>
        </Grid>
        <Grid item sm={4}>
          <Slider value={cpu_threshold} min={Range_CPU_Threshold.min} max={Range_CPU_Threshold.max} step={0.01} onChange={(e, val) => setSettings({ ...settings, cpu_threshold: val.toFixed(2) })} />
        </Grid>
        <Grid item sm={1}>
          <Typography varient="p" component="p" align="center">
            {`${Number(cpu_threshold).toFixed(2) * 100}%`}
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography paragraph variant="caption" component="p">
            {advancedTrans.cpu_threshold_desc}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.part}>
        <Grid item sm={3}>
          <Typography>{advancedTrans.gpu_capacity}</Typography>
        </Grid>
        <Grid item sm={4}>
          <Slider value={gpu_capacity} min={Range_GPU_Capacity.min} max={Range_GPU_Capacity.max} onChange={(e, val) => setSettings({ ...settings, gpu_capacity: val })} />
        </Grid>
        <Grid item sm={1}>
          <Typography varient="p" component="p" align="center">
            {`${gpu_capacity}G`}
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography paragraph variant="caption" component="p">
            {advancedTrans.gpu_capacity_desc}
          </Typography>
        </Grid>
        <Grid item sm={3}>
          <Typography>{advancedTrans.gpu_threshold}</Typography>
        </Grid>
        <Grid item sm={4}>
          <Slider value={gpu_threshold} step={0.01} min={Range_GPU_Threshold.min} max={Range_GPU_Threshold.max} onChange={(e, val) => setSettings({ ...settings, gpu_threshold: val })} />
        </Grid>
        <Grid item sm={1}>
          <Typography varient="p" component="p" align="center">
            {`${Number(gpu_threshold).toFixed(2) * 100}%`}
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography paragraph variant="caption" component="p">
            {advancedTrans.gpu_threshold_desc}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.part}>
        <Grid item sm={3}>
          {advancedTrans.catch_insert_data}
        </Grid>
        <Grid item sm={3}>
          <Switch
            checked={catch_insert_data}
            onChange={e => setSettings({ ...settings, catch_insert_data: e.target.checked })}
            color="primary"
          />
        </Grid>
        <Grid item sm={12}>
          <Typography paragraph variant="caption" component="p">
            {advancedTrans.catch_insert_data_desc}
          </Typography>
        </Grid>

        <Grid item sm={3}>
          <Typography>{advancedTrans.insert_buffer_size}</Typography>
        </Grid>
        <Grid item sm={6}>
          <Slider value={insert_buffer_size} step={0.01} min={Insert_Buffer_Size.min} max={Insert_Buffer_Size.max} onChange={(e, val) => setSettings({ ...settings, insert_buffer_size: val })} />
        </Grid>
        <Grid item sm={1}>
          <Typography varient="p" component="p" align="center">
            {`${Number(insert_buffer_size).toFixed(2) * 100}%`}
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography paragraph variant="caption" component="p">
            {advancedTrans.insert_buffer_size_desc}
          </Typography>
        </Grid>
      </Grid>
      <FormActions />
    </div>
  );
};

export default AdvancedForm;
