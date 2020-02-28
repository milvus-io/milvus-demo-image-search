import React, { useState, useContext } from 'react';
import { httpContext } from '../../context/http'
import useStyles from './Style'
import Grid from '@material-ui/core/Grid';
import { FaQuestionCircle } from 'react-icons/fa';
import { Slider, Select, MenuItem, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
const CreateCollection = props => {
  const classes = useStyles()
  const { createTable } = useContext(httpContext)
  const { hideDialog = () => { } } = props;
  const [params, setParams] = useState({
    table_name: '',
    metric_type: '',
    dimension: 0,
    index_file_size: 0
  })
  const update = async () => {
    createTable(params).then(res => {
      console.log(res)
      if (res && res.status === 200) {
        hideDialog()
      }
    })
  }
  return (
    <>
      <DialogTitle >{`Create Collection`}</DialogTitle>
      <DialogContent classes={{ root: classes.DialogContent }}>
        <Grid container spacing={3}>
          <Grid item sm={4}>
            <div className={classes.wrapper}><span className={classes.column}>Collection Name</span> <FaQuestionCircle /></div>
          </Grid>
          <Grid item sm={8}>
            <TextField value={params.table_name} onChange={e => setParams({ ...params, table_name: e.target.value })} />
          </Grid>
          <Grid item sm={4}>
            <div className={classes.wrapper}><span className={classes.column}>Metric Type</span> <FaQuestionCircle /></div>
          </Grid>
          <Grid item sm={8}>
            <Select
              value={params.metric_type}
              onChange={e => setParams({ ...params, metric_type: e.target.value })}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>L2</MenuItem>
              <MenuItem value={20}>L3</MenuItem>
              <MenuItem value={30}>L4</MenuItem>
            </Select>
          </Grid>
          <Grid item sm={4}>
            <div className={classes.wrapper}><span className={classes.column}>Dimension</span> <FaQuestionCircle /></div>
          </Grid>
          <Grid item sm={7}>
            <Slider value={params.dimension} min={0} max={50000} onChange={(e, val) => setParams({ ...params, dimension: val })} />
          </Grid>
          <Grid item sm={1}>{params.dimension}</Grid>
          <Grid item sm={4}>
            <div className={classes.wrapper}><span className={classes.column}>Index File Size</span> <FaQuestionCircle /></div>
          </Grid>
          <Grid item sm={7}>
            <Slider value={params.index_file_size} min={0} max={50000} onChange={(e, val) => setParams({ ...params, index_file_size: val })} />
          </Grid>
          <Grid item sm={1}>{params.index_file_size}</Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => update()} color="primary">
          {`update`}
        </Button>
        <Button variant="outlined" onClick={() => hideDialog()} color="primary">
          {`cancel`}
        </Button>
      </DialogActions>
    </>)
}

export default CreateCollection