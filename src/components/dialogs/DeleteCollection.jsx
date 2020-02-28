import React, { useState } from 'react';
import useStyles from './Style'
import Grid from '@material-ui/core/Grid';
import { FaQuestionCircle } from 'react-icons/fa';
import { Slider, Select, MenuItem, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core'
const DeleteCollection = props => {
  const classes = useStyles()
  const { hideDialog = () => { } } = props;
  const [params, setParams] = useState({
    type: '',
    nlist: 0,
  })
  const update = async () => {
    hideDialog()
  }
  return (
    <>
      <DialogTitle >{`Create Collection`}</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item sm={4}>
            <div className={classes.wrapper}><span className={classes.column}>Index Type</span> <FaQuestionCircle /></div>
          </Grid>
          <Grid item sm={8}>
            <Select
              value={params.type}
              onChange={e => setParams(params => ({ ...params, type: e.target.value }))}
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
            <div className={classes.wrapper}><span className={classes.column}>nlist</span> <FaQuestionCircle /></div>
          </Grid>
          <Grid item sm={8}>
            <Slider value={params.nlist} min={0} max={50000} onChange={(e, val) => setParams({ ...params, nlist: val })} />
          </Grid>
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

export default DeleteCollection