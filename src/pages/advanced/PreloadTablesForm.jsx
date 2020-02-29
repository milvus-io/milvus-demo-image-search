import React, { useEffect, useState, useContext, useMemo } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import { useFormStyles, useFormValidate } from "../../hooks/form";
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'


const PreloadTablesForm = props => {
  const classes = makeStyles(theme => ({
    root: {
      paddingTop: theme.spacing(2)
    },
    wrapper: {
      marginBottom: theme.spacing(2)
    },
  }))()
  const { t } = useTranslation();
  const preload_table = t("advanced").preload_table;
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Typography variant="h5" component="h2" align="left">
          {preload_table.title}
        </Typography>
      </div>
      <div className={classes.wrapper}>
        <Typography variant="p" component="h2" align="left">
          {preload_table.desc}
        </Typography>
      </div>
      <div className={classes.wrapper}>
        <Grid item sm={4}>
          <TextField fullWidth={true} />
        </Grid>
      </div>
      <div className={classes.wrapper}>
        <Button variant="outlined" color="primary">Save</Button>
        <Button>Cancle</Button>
      </div>
    </div>
  )
}

export default PreloadTablesForm