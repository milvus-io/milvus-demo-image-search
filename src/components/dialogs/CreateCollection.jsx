import React, { useState } from 'react';
import useStyles from './Style'
import { } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { FaQuestionCircle } from 'react-icons/fa';
import { Slider, Select, MenuItem, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
const CreateCollection = props => {
  const classes = useStyles()
  const { hideDialog = () => { } } = props;
  const [params, setParams] = useState({
    name: '',
    type: '',
    dimension: 0,
    size: 0
  })
  const update = async () => {
    hideDialog()
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
            <TextField value={params.name} onChange={e => setParams({ ...params, name: e.target.value })} />
          </Grid>
          <Grid item sm={4}>
            <div className={classes.wrapper}><span className={classes.column}>Metric Type</span> <FaQuestionCircle /></div>
          </Grid>
          <Grid item sm={8}>
            <Select
              value={params.type}
              onChange={e => setParams({ ...params, type: e.target.value })}
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
            <Slider value={params.size} min={0} max={50000} onChange={(e, val) => setParams({ ...params, size: val })} />
          </Grid>
          <Grid item sm={1}>{params.size}</Grid>
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