import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { FaQuestionCircle } from 'react-icons/fa';
import { DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
const CreateCollection = props => {
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
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item sm={4}>
            <div>Collection Name <FaQuestionCircle /></div>
          </Grid>
          <Grid item sm={8}>
            <TextField value={params.name} onChange={e => setParams(params => ({ ...params, name: e.target.value }))} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => update()} color="primary">
          {`update`}
        </Button>
        <Button onClick={() => hideDialog()} color="primary">
          {`cancel`}
        </Button>
      </DialogActions>
    </>)
}

export default CreateCollection