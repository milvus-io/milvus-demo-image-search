import React from 'react';
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2)
  },
  fullWidth: {
    width: '100%'
  },
}))
export const FormTextField = props => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid sm={4} item>
        <TextField fullWidth classes={{ root: classes.root }} {...props} variant="outlined" />
      </Grid>
    </Grid>
  )
}

export const FormSelect = props => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid sm={4} item>
        <Select classes={{ root: `${classes.root} ${classes.fullWidth}` }} {...props} />
      </Grid>
    </Grid>
  )
}