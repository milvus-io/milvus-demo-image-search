import React from "react";
import { useTranslation } from "react-i18next";
import { usePageStyles } from "../../hooks/page";
import Typography from '@material-ui/core/Typography';
import WithTip from "components/with-tip";
import OthersForm from "./form";
import PaperWrapper from "../../components/page-wrapper";

const Others = props => {
  const { t } = useTranslation();
  const classes = usePageStyles();
  const others = t("others");
  const configTrans = t('config')
  return (
    <div className={classes.root}>
      <PaperWrapper className={classes.paper}>
        <div className={classes.titleContainer}>
          <Typography variant={"h5"}>{configTrans.others}</Typography>
          <WithTip title={others.tip}></WithTip>
        </div>
        <OthersForm></OthersForm>
      </PaperWrapper>
    </div >
  );
};

export default Others;
