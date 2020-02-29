import React from "react";
import { useTranslation } from "react-i18next";
import NetworkForm from './form';
import PaperWrapper from '../../components/page-wrapper'
import Typography from '@material-ui/core/Typography';
import { usePageStyles } from '../../hooks/page'
import WithTip from "components/with-tip";

const Network = props => {
  const classes = usePageStyles()
  const { t } = useTranslation();
  const configTrans = t("config");

  return (
    <div className={classes.root}>
      <PaperWrapper className={classes.paper}>
        <div className={classes.titleContainer}>
          <Typography variant={"h5"}>{configTrans.network}</Typography>
          <WithTip title={t("restartNotify")} placement="right"></WithTip>
        </div>
        <NetworkForm></NetworkForm>
      </PaperWrapper>
    </div>
  );
};

export default Network;
