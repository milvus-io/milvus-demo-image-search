import React, { useEffect, useContext } from "react";
import Switch from '@material-ui/core/Switch';
import Typography from "@material-ui/core/Typography"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { FaMicrochip, FaBolt } from 'react-icons/fa'
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
    updateHardwareConfig
  } = useContext(httpContext);
  const { hardwareType = "CPU", gpuList = [] } = systemInfos[currentAddress] || {}

  const classes = makeStyles(theme => ({
    gridItem: {
      display: "flex",
      justifyContent: "start",
      alignItems: "center"
    },
    wrapper: {
      marginBottom: theme.spacing(2)
    },
  }))()
  const theme = useTheme()
  const marginRight = { marginRight: theme.spacing(1) }
  useEffect(() => {
    const _getHardwareConfig = async () => {
      const result = await getHardwareConfig();
      if (result) {

      }
    }
    _getHardwareConfig()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <div className={classes.wrapper}>
        <Typography variant='h6' component='p' paragraph>
          {hardware.search}
        </Typography>
        <Grid container spacing={3}>
          <Grid classes={{ item: classes.gridItem }} item xs={4} alignItems='center' justify='center'>
            <FaMicrochip style={{ ...marginRight }} />CPU
          </Grid>
          <Grid item xs={4}>
            <Switch color='primary' checked={true} onChange={() => { }} value="gilad" />
          </Grid>
        </Grid>
        {hardwareType === "GPU" && (<>{
          gpuList.map(gpu_name => {
            return (
              <Grid container spacing={3} key={gpu_name}>
                <Grid classes={{ item: classes.gridItem }} item xs={4} alignItems='center' justify='center'>
                  <FaBolt style={{ ...marginRight }} />{`GPU_${gpu_name}`}
                </Grid>
                <Grid item xs={4}>
                  <Switch color='primary' checked={true} onChange={() => { }} value="gilad" />
                </Grid>
              </Grid>
            )
          })
        }</>)}
      </div>
      <div className={classes.wrapper}>
        <Typography variant='h6' component='p' paragraph>
          {hardware.index}
        </Typography>
        <Grid container spacing={3}>
          <Grid classes={{ item: classes.gridItem }} item xs={4} alignItems='center' justify='center'>
            <FaMicrochip style={{ ...marginRight }} />CPU
        </Grid>
          <Grid item xs={4}>
            <Switch color='primary' checked={true} onChange={() => { }} value="gilad" />
          </Grid>
        </Grid>
        {hardwareType === "GPU" && (<>
          {gpuList.map(gpu_name => {
            return (
              <Grid container spacing={3} key={gpu_name}>
                <Grid classes={{ item: classes.gridItem }} item xs={4} alignItems='center' justify='center'>
                  <FaBolt style={{ ...marginRight }} />{`GPU_${gpu_name}`}
                </Grid>
                <Grid item xs={4}>
                  <Switch color='primary' checked={true} onChange={() => { }} value="gilad" />
                </Grid>
              </Grid>
            )
          })}
        </>)
        }
      </div>
      <FormActions />
    </div>
  );
};

export default HardWareForm;
