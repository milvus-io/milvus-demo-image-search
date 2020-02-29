import React from "react";
import { useTranslation } from "react-i18next";
import { usePageStyles } from "../../hooks/page";
import Typography from '@material-ui/core/Typography';
import WithTip from "components/with-tip";
import HardwareForm from "./form";
import PaperWrapper from "../../components/page-wrapper";
const Hardware = props => {
  const classes = usePageStyles();
  const { t } = useTranslation();
  const hardware = t("hardware");

  return (
    <div className={classes.root}>
      <PaperWrapper className={classes.paper}>
        <div className={classes.titleContainer}>
          <Typography variant={"h5"}>{hardware.title}</Typography>
          <WithTip title={t("restartNotify")} placement="right"></WithTip>
        </div>
        <HardwareForm></HardwareForm>
      </PaperWrapper>
    </div>
  )
};

export default Hardware;
