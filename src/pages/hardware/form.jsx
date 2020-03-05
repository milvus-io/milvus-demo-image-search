import React, { useState, useEffect, useContext } from "react";
import Switch from '@material-ui/core/Switch';
import Typography from "@material-ui/core/Typography"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { FaBolt } from 'react-icons/fa'
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import { systemContext } from '../../context/system'
import { httpContext } from '../../context/http'
import { useTranslation } from "react-i18next";
import FormActions from '../../components/common/FormActions'

const HardWareForm = props => {
  const { t } = useTranslation();
  const hardware = t("hardware");
  const { systemInfos = {} } = useContext(systemContext);
  const {
    currentAddress = "",
    getHardwareConfig,
  } = useContext(httpContext);
  const { hardwareType = "CPU", gpuList = [] } = systemInfos[currentAddress] || {}
  const [isFormChange, setIsformChange] = useState(false)
  const [search_resources, setSearchResources] = useState([]);
  const [build_index_resources, setBuildIndexResources] = useState([])
  const classes = makeStyles(theme => ({
    gridItem: {
      display: "flex",
      justifyContent: "start",
      alignItems: "center"
    },
    wrapper: {
      marginBottom: theme.spacing(2)
    },
    alert: {
      maxWidth: '600px'
    }
  }))()
  const theme = useTheme()
  const marginRight = { marginRight: theme.spacing(1) }
  const isCPU = hardwareType === 'CPU'

  const changeGPUSearch = (e, gpu_name) => {
    setIsformChange(true);
    setSearchResources(e.target.checked ? [...search_resources, gpu_name] : search_resources.filter(b => b !== gpu_name))
  }
  const changeGPUIndex = (e, gpu_name) => {
    setIsformChange(true);
    setBuildIndexResources(e.target.checked ? [...build_index_resources, gpu_name] : build_index_resources.filter(b => b !== gpu_name))
  }

  const save = async () => { }
  const reset = () => {

  }
  useEffect(() => {
    const _getHardwareConfig = async () => {
      // {"enable":true,"cache_capacity":1,"search_resources":["GPU0"],"build_index_resources":["GPU0"]}
      const result = await getHardwareConfig();
      setSearchResources(result.search_resources)
      setBuildIndexResources(result.build_index_resources);
    }
    if (!isCPU) {
      _getHardwareConfig()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      {isCPU ? <MuiAlert severity="info" classes={{ root: classes.alert }}>No GPU Detected!</MuiAlert>
        : (<>
          <div className={classes.wrapper}>
            <Typography variant='h6' component='p' paragraph>
              {hardware.search}
            </Typography>
            {gpuList.map(gpu_name => {
              return (
                <Grid container spacing={3} key={gpu_name}>
                  <Grid classes={{ item: classes.gridItem }} item xs={4}>
                    <FaBolt style={{ ...marginRight }} />{gpu_name}
                  </Grid>
                  <Grid item xs={4}>
                    <Switch color='primary' checked={!!search_resources.find(s => s === gpu_name) || false} onChange={e => changeGPUSearch(e, gpu_name)} />
                  </Grid>
                </Grid>
              )
            })}
          </div>
          <div className={classes.wrapper}>
            <Typography variant='h6' component='p' paragraph>
              {hardware.index}
            </Typography>
            {gpuList.map(gpu_name => {
              return (
                <Grid container spacing={3} key={gpu_name}>
                  <Grid classes={{ item: classes.gridItem }} item xs={4} >
                    <FaBolt style={{ ...marginRight }} />{gpu_name}
                  </Grid>
                  <Grid item xs={4}>
                    <Switch color='primary' checked={!!search_resources.find(s => s === gpu_name) || false} onChange={e => changeGPUIndex(e, gpu_name)} />
                  </Grid>
                </Grid>
              )
            })}
          </div>
          <FormActions save={save} cancel={reset} disableCancel={!isFormChange} />
        </>)}
    </div>
  );
};

export default HardWareForm;
