import React from 'react';
import useStyles from './Style'
import Grid from '@material-ui/core/Grid';
import { FaUpload } from 'react-icons/fa';
import { DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core'
const ImportVectorToCollection = props => {
  const classes = useStyles()
  const { hideDialog = () => { } } = props;

  const update = async () => {
    hideDialog()
  }
  return (
    <>
      <DialogTitle >{`Import Vector to Collection1`}</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <div className={classes.wrapper}>
              <FaUpload size={100} />
              <p className={classes.column}>Please make sure the csv you upload contains 4096 dimensions vectors</p>
            </div>
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
    </>)
}

export default ImportVectorToCollection