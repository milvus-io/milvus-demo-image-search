import React, { useEffect, useState, useContext, useMemo } from "react";
import { systemContext } from "../../context/system";
import { httpContext } from "../../context/http";
import { materialContext } from '../../context/material'
import { useTranslation } from "react-i18next";
import { useFormStyles } from "../../hooks/form";
import Typography from "@material-ui/core/Typography";
import Form from '../../components/form/Form'

const CacheForm = props => {
  const { systemInfos = {}, serverConfig, milvusConfigs = {} } = useContext(systemContext);
  const { openSnackBar } = useContext(materialContext)
  const classes = useFormStyles();
  const {
    currentAddress = "",
    setMilvusConfig,
  } = useContext(httpContext);
  const { hardwareType = "CPU", cpuMemory = 5, gpuMemory = 2 } = systemInfos[currentAddress] || {}
  const [settings, setSettings] = useState(hardwareType === "CPU" ? {
    cpu_cache_capacity: 1,
    cache_insert_data: false,
    insert_buffer_size: .5
  } : {
      cpu_cache_capacity: 1,
      gpu_capacity: 1,
      gpu_threshold: 0.5,
      cache_insert_data: false,
      insert_buffer_size: .5
    })
  const [isFormChange, setIsformChange] = useState(false)

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
    console.log(_cache_config)

    setSettings(settings => ({ ...settings, ..._cache_config }))
    setIsformChange(false)
  }

  const _setSettings = params => {
    setIsformChange(true);
    console.log(params)
    setSettings(params)
  }

  useEffect(() => {
    resetSettings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAddress, serverConfig])

  const cpuCapacityConfig = [{
    type: "slider",
    name: "cpu capacity",
    sliderLabelSm: 3,
    sm: 4,
    label: advancedTrans.cpu_capacity,
    range: [1, cpuMemory],
    unit: "G",
    onChange: (e, val) => _setSettings({ ...settings, cpu_cache_capacity: Math.min(val, cpuMemory - settings.insert_buffer_size) }),
    value: settings.cpu_cache_capacity
  }, {
    type: "other",
    name: "cpu capacity desc",
    sm: 12,
    component: () => (
      <Typography paragraph variant="caption" component="p">
        {advancedTrans.cpu_capacity_desc}
      </Typography>
    )
  }, {
    type: "switch",
    name: "insert_data_switch",
    label: advancedTrans.catch_insert_data,
    value: settings.cache_insert_data,
    sm: 3,
    onChange: e => _setSettings({ ...settings, cache_insert_data: e.target.checked })
  }, {
    type: "other",
    name: "insert_data_desc",
    sm: 12,
    component: () => (
      <Typography paragraph variant="caption" component="p">
        {advancedTrans.catch_insert_data_desc}
      </Typography>
    )
  }, {
    type: "slider",
    name: "index_file_size",
    sliderLabelSm: 3,
    sm: 4,
    label: advancedTrans.insert_buffer_size,
    range: [1, Number(cpuMemory) - settings.cpu_cache_capacity],
    unit: "G",
    onChange: (e, val) => _setSettings({ ...settings, insert_buffer_size: Math.min(val, Number(cpuMemory) - settings.cpu_cache_capacity) }),
    value: settings.insert_buffer_size
  }, {
    type: "other",
    name: "index_file_size_desc",
    sm: 12,
    component: () => (
      <Typography paragraph variant="caption" component="p">
        {advancedTrans.insert_buffer_size_desc}
      </Typography>
    )
  }]

  const gpuConfigs = useMemo(() => {
    if (hardwareType !== "GPU") {
      return []
    }
    return [{
      type: "slider",
      name: "gpu_capacity",
      sliderLabelSm: 3,
      sm: 4,
      label: advancedTrans.gpu_capacity,
      range: [1, gpuMemory],
      unit: "G",
      onChange: (e, val) => _setSettings({ ...settings, gpu_capacity: val }),
      value: settings.gpu_capacity
    }, {
      type: "other",
      name: "gpu_capacity_desc",
      sm: 12,
      component: () => (
        <Typography paragraph variant="caption" component="p">
          {advancedTrans.gpu_capacity_desc}
        </Typography>
      )
    }, {
      type: "slider",
      name: "gpu_threshold",
      sliderLabelSm: 3,
      sm: 4,
      marks: false,
      label: advancedTrans.gpu_threshold,
      range: [1, 100],
      unit: "%",
      onChange: (e, val) => _setSettings({ ...settings, gpu_threshold: val }),
      value: settings.gpu_threshold
    }, {
      type: "other",
      name: "gpu_threshold_desc",
      sm: 12,
      component: () => (
        <Typography paragraph variant="caption" component="p">
          {advancedTrans.gpu_threshold_desc}
        </Typography>
      )
    }]
  }, [hardwareType, gpuMemory, settings, advancedTrans])
  return (
    <div className={classes.root}>
      <Form
        config={[...cpuCapacityConfig, ...gpuConfigs]}
        handleSubmit={saveSettings}
        handleCancel={resetSettings}
        isFormChange={isFormChange}
      ></Form>

    </div>
  );
};

export default CacheForm;
