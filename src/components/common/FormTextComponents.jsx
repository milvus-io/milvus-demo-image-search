import React from 'react';
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
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
  const { marginBottom = true } = props
  return (
    <Grid sm={4} item>
      <TextField fullWidth classes={{ root: marginBottom ? classes.root : "" }} {...props} />
    </Grid>
  )
}

export const FormSelect = props => {
  const classes = useStyles()
  return (
    <Grid sm={4} item>
      <Select classes={{ root: `${classes.root} ${classes.fullWidth}` }} {...props} />
    </Grid>
  )
}

export const FormDivider = props => {
  const classes = useStyles()
  return (
    <Divider classes={{ root: classes.root }} {...props} />
  )
}