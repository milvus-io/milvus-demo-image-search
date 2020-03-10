import React, { useEffect, useState, useContext } from "react";
import { systemContext } from "../../context/system";
import { httpContext } from "../../context/http";
import { materialContext } from '../../context/material'
import { useTranslation } from "react-i18next";
import { useFormStyles } from "../../hooks/form";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import FormActions from "../../components/common/FormActions";

const Range_Threshold = { min: 0.01, max: 1 }

const CacheForm = props => {
  const { systemInfos = {}, serverConfig, milvusConfigs = {} } = useContext(systemContext);
  const { openSnackBar } = useContext(materialContext)
  const classes = useFormStyles();
  const {
    currentAddress = "",
    setMilvusConfig,
  } = useContext(httpContext);
  const { hardwareType = "CPU", cpuMemory = 5 } = systemInfos[currentAddress] || {}
  const [settings, setSettings] = useState({})
  const [isFormChange, setIsformChange] = useState(false)
  const {
    cpu_cache_capacity = 1,
    gpu_capacity = 1,
    gpu_threshold = 0.5,
    cache_insert_data = false,
    insert_buffer_size = .5
  } = settings;

  const { t } = useTranslation();
  const advancedTrans = t("advanced");

  const saveSettings = async () => {
    delete settings.cpu_cache_threshold
    setMilvusConfig({ cache_config: settings }).then(res => {
      if (res.code === 0) {
        openSnackBar(t('submitSuccess'))
        setIsformChange(false)
      }
    })
  }
  const resetSettings = () => {
    const { cache_config = {} } = milvusConfigs;
    const _cache_config = {
      ...cache_config,
      cpu_cache_capacity: Number(cache_config.cpu_cache_capacity) || 5,
      insert_buffer_size: Number(cache_config.insert_buffer_size) || 0.5,
      cache_insert_data: cache_config.cache_insert_data === 'true' || false
    }
    setSettings(settings => ({ ...settings, ..._cache_config }))
    setIsformChange(false)
  }

  const _setSettings = params => {
    setIsformChange(true);
    setSettings(params)
  }

  useEffect(() => {
    resetSettings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAddress, serverConfig])

  return (
    <div className={classes.root}>
      <Grid container className={classes.part}>
        <Grid item sm={3}>
          <Typography>{advancedTrans.cpu_capacity}</Typography>
        </Grid>
        <Grid item sm={1}>
          <Typography varient="p" component="p" align="center">
            {`1G`}
          </Typography>
        </Grid>
        <Grid item sm={4}>
          <Slider marks valueLabelDisplay="auto" value={cpu_cache_capacity} min={1} max={Number(cpuMemory)} onChange={(e, val) => _setSettings({ ...settings, cpu_cache_capacity: Math.min(val, cpuMemory - insert_buffer_size) })} />
        </Grid>
        <Grid item sm={1}>
          <Typography varient="p" component="p" align="center">
            {`${cpuMemory}G`}
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography paragraph variant="caption" component="p">
            {advancedTrans.cpu_capacity_desc}
          </Typography>
        </Grid>
      </Grid>
      {hardwareType === "GPU" && (
        <Grid container className={classes.part}>
          <Grid item sm={3}>
            <Typography>{advancedTrans.gpu_capacity}</Typography>
          </Grid>
          <Grid item sm={4}>
            <Slider value={gpu_capacity} min={0} max={systemInfos.gpuMemory} onChange={(e, val) => _setSettings({ ...settings, gpu_capacity: val })} />
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
            <Slider value={gpu_threshold} step={0.01} min={Range_Threshold.min} max={Range_Threshold.max} onChange={(e, val) => _setSettings({ ...settings, gpu_threshold: val })} />
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
      )}
      <Grid container className={classes.part}>
        <Grid item sm={3}>
          {advancedTrans.catch_insert_data}
        </Grid>
        <Grid item sm={3}>
          <Switch
            checked={cache_insert_data}
            onChange={e => _setSettings({ ...settings, cache_insert_data: e.target.checked })}
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
        <Grid item sm={1}>
          <Typography varient="p" component="p" align="center">
            {`1G`}
          </Typography>
        </Grid>
        <Grid item sm={4}>
          <Slider marks valueLabelDisplay="auto" value={insert_buffer_size} step={1} min={1} max={Number(cpuMemory) - cpu_cache_capacity} onChange={(e, val) => _setSettings({ ...settings, insert_buffer_size: Math.min(val, cpuMemory - cpu_cache_capacity) })} />
        </Grid>
        <Grid item sm={1}>
          <Typography varient="p" component="p" align="center">
            {`${Number(cpuMemory) - cpu_cache_capacity}G`}
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography paragraph variant="caption" component="p">
            {advancedTrans.insert_buffer_size_desc}
          </Typography>
        </Grid>
      </Grid>
      <FormActions save={saveSettings} cancel={resetSettings} disableCancel={!isFormChange} />
    </div>
  );
};

export default CacheForm;
