import React from './node_modules/react';
import { useTranslation } from "./node_modules/react-i18next";
import { makeStyles } from './node_modules/@material-ui/styles';
import Button from './node_modules/@material-ui/core/Button';
import Grid from './node_modules/@material-ui/core/Grid';

const FormActions = props => {
  const { t } = useTranslation();
  const button = t("button");
  const {
    save = () => { },
    cancel = () => { },
    confirmLabel = button.save,
    cancelLabel = button.cancel,
    disableCancel = false
  } = props;
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
      <Button classes={{ root: `${classes.root} ${classes.save}` }} variant="outlined" onClick={(e) => save(e)}>{confirmLabel}</Button>
      <Button classes={{ root: classes.root }} variant="outlined" onClick={() => cancel()} disabled={disableCancel}>{cancelLabel}</Button>
    </Grid >
  )
}

export default FormActions