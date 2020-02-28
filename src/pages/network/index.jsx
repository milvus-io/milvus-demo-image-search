import React from "react";
import Grid from '@material-ui/core/Grid'
import { useTranslation } from "react-i18next";
import NetworkForm from './form';
import PaperWrapper from '../../components/page-wrapper'
import { usePageStyles } from '../../hooks/page'

const Network = props => {
  const classes = usePageStyles()
  const { t } = useTranslation();
  const configTrans = t("config");

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h2 className={classes.h2}>{configTrans.network}</h2>
        </Grid>
        <Grid item xs={6}>
          <PaperWrapper className={classes.paper}>
            <NetworkForm></NetworkForm>
          </PaperWrapper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Network;
