import React, { useEffect, useState, useContext, useMemo } from "react";
import Button from "@material-ui/core/Button";
import Switch from '@material-ui/core/Switch';
import Typography from "@material-ui/core/Typography"
import { makeStyles } from '@material-ui/core/styles';
import { FaMicrochip, FaBolt } from 'react-icons/fa'
import Grid from '@material-ui/core/Grid';
import { systemContext } from '../../context/system'
import { httpContext } from '../../context/http'
import { useTranslation } from "react-i18next";
import FormActions from '../../components/common/FormActions'

const HardWareForm = props => {
  const { t } = useTranslation();
  const hardware = t("hardware");
  const classes = makeStyles(theme => ({
    gridItem: {
      display: "flex",
      justifyContent: "start",
      alignItems: "center"
    },
    wrapper: {
      marginBottom: theme.spacing(2)
    }
  }))()
  return (
    <div>
      <div className={classes.wrapper}>
        <Typography variant='h6' component='p' paragraph>
          {hardware.search}
        </Typography>
        <Grid container spacing={3}>
          <Grid classes={{ item: classes.gridItem }} item xs={4} alignItems='center' justify='center'>
            <FaMicrochip />CPU
        </Grid>
          <Grid item xs={4}>
            <Switch checked={true} onChange={() => { }} value="gilad" />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid classes={{ item: classes.gridItem }} item xs={4} alignItems='center' justify='center'>
            <FaBolt />GPU0
        </Grid>
          <Grid item xs={4}>
            <Switch checked={true} onChange={() => { }} value="gilad" />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid classes={{ item: classes.gridItem }} item xs={4} alignItems='center' justify='center'>
            <FaBolt />GPU1
        </Grid>
          <Grid item xs={4}>
            <Switch checked={true} onChange={() => { }} value="gilad" />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid classes={{ item: classes.gridItem }} item xs={4} alignItems='center' justify='center'>
            <FaBolt />GPU2
        </Grid>
          <Grid item xs={4}>
            <Switch checked={true} onChange={() => { }} value="gilad" />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid classes={{ item: classes.gridItem }} item xs={4} alignItems='center' justify='center'>
            <FaBolt />GPU3
        </Grid>
          <Grid item xs={4}>
            <Switch checked={true} onChange={() => { }} value="gilad" />
          </Grid>
        </Grid>
      </div>
      <div className={classes.wrapper}>
        <Typography variant='h6' component='p' paragraph>
          {hardware.index}
        </Typography>
        <Grid container spacing={3}>
          <Grid classes={{ item: classes.gridItem }} item xs={4} alignItems='center' justify='center'>
            <FaMicrochip />CPU
        </Grid>
          <Grid item xs={4}>
            <Switch checked={true} onChange={() => { }} value="gilad" />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid classes={{ item: classes.gridItem }} item xs={4} alignItems='center' justify='center'>
            <FaBolt />GPU0
        </Grid>
          <Grid item xs={4}>
            <Switch checked={true} onChange={() => { }} value="gilad" />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid classes={{ item: classes.gridItem }} item xs={4} alignItems='center' justify='center'>
            <FaBolt />GPU1
        </Grid>
          <Grid item xs={4}>
            <Switch checked={true} onChange={() => { }} value="gilad" />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid classes={{ item: classes.gridItem }} item xs={4} alignItems='center' justify='center'>
            <FaBolt />GPU2
        </Grid>
          <Grid item xs={4}>
            <Switch checked={true} onChange={() => { }} value="gilad" />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid classes={{ item: classes.gridItem }} item xs={4} alignItems='center' justify='center'>
            <FaBolt />GPU3
        </Grid>
          <Grid item xs={4}>
            <Switch checked={true} onChange={() => { }} value="gilad" />
          </Grid>
        </Grid>
      </div>
      <FormActions />
    </div>
  );
};

export default HardWareForm;
