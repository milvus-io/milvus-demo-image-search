import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const FormActions = props => {
  const { save = () => { }, cancel = () => { } } = props;
  const classes = makeStyles(theme => ({
    gridContainer: {
      paddingTop: theme.spacing(2)
    },
    root: {
      minWidth: '90px'
    },
    save: {
      marginRight: theme.spacing(2),
      color: theme.palette.primary.main
    }
  }))()
  return (
    <Grid container classes={{ container: classes.gridContainer }}>
      <Button classes={{ root: `${classes.root} ${classes.save}` }} variant="outlined" onClick={() => save()}>Save</Button>
      <Button classes={{ root: classes.root }} variant="outlined" onClick={() => cancel()}>Cancel</Button>
    </Grid>
  )
}

export default FormActions