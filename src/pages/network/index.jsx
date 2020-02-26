import React from "react";
import { useTranslation } from "react-i18next";
import NetworkForm from './form';
import PaperWrapper from '../../components/page-wrapper'
import WithTip from "../../components/with-tip";
import { usePageStyles } from '../../hooks/page'

const Network = props => {
  const classes = usePageStyles()
  const { t } = useTranslation();
  const configTrans = t("config");

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h2 className={classes.h2}>{configTrans.network}</h2>
        <WithTip text={t("restartNotify")}></WithTip>
      </div>
      <PaperWrapper className={classes.paper}>
        <NetworkForm></NetworkForm>
      </PaperWrapper>
    </div>
  );
};

export default Network;
