import React from "react";
import { useTranslation } from "react-i18next";
import NetworkForm from './form';
import PaperWrapper from '../../components/page-wrapper'
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
          <h2 className={classes.h2}>{configTrans.network}</h2>
          <WithTip title={t("restartNotify")} placement="right"></WithTip>
        </div>
        <NetworkForm></NetworkForm>
      </PaperWrapper>
    </div>
  );
};

export default Network;
