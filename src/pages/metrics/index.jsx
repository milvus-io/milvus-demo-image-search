import React from "react";
import { useTranslation } from "react-i18next";
import { usePageStyles } from "../../hooks/page";
import Typography from '@material-ui/core/Typography';
import WithTip from "components/with-tip";
import MetricsForm from "./form";
import PaperWrapper from "../../components/page-wrapper";

const Mertrics = props => {
  const { t } = useTranslation();
  const classes = usePageStyles();
  const metrics = t("metrics");

  return (
    <div className={classes.root}>
      <PaperWrapper className={classes.paper}>
        <div className={classes.titleContainer}>
          <Typography variant={"h5"}>{metrics.title}</Typography>
          <WithTip title={metrics.tip}></WithTip>
        </div>
        <MetricsForm></MetricsForm>
      </PaperWrapper>
    </div>
  );
};

export default Mertrics;
