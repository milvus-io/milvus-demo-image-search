import React, { useRef } from 'react';
import useStyles from './Style'
import Grid from '@material-ui/core/Grid';
import { FaUpload } from 'react-icons/fa';
import { DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core'
const ImportVectorToCollection = props => {
  const classes = useStyles()
  const { hideDialog = () => { } } = props;
  const Input = useRef(null)

  const update = async () => {
    hideDialog()
  }
  const uploadFile = e => {
    const form = Input.current;
    form.onchange = e => {
      const file = e.target.files[0];
      console.log(file)
      //TODO: do something with file
    }
    form.click()
  }
  return (
    <>
      <DialogTitle >{`Import Vector to Collection1`}</DialogTitle>
      <DialogContent classes={{ root: classes.dialogContent }}>
        <Grid classes={{ root: classes.gridRoot }} container spacing={3}>
          <Grid item sm={12} onClick={uploadFile}>
            <div className={classes.upload}>
              <FaUpload size={100} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <p className={classes.upload}>Please make sure the csv you upload contains 4096 dimensions vectors</p>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => update()} color="primary">
          {`import`}
        </Button>
        <Button variant="outlined" onClick={() => hideDialog()} color="primary">
          {`cancel`}
        </Button>
      </DialogActions>
      <input ref={Input} id='fileid' type='file' style={{ display: 'none' }} />
    </>)
}

export default ImportVectorToCollection