import React from 'react';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'

const FormTextField = props => {
  const classes = makeStyles(theme => ({
    root: {
      marginBottom: theme.spacing(2)
    }
  }))()
  return (
    <Grid container>
      <Grid sm={6} item>
        <TextField fullWidth classes={{ root: classes.root }} {...props} />
      </Grid>
    </Grid>
  )
}

export default FormTextField