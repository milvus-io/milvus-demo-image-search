import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tab, Typography } from "@material-ui/core";
import PaperWrapper from "../../components/page-wrapper";
import TabPanel from "../../components/tab-panel";
import MyTabs from "../../components/tab";
import WithTip from "components/with-tip";
import { usePageStyles } from "../../hooks/page";
import CatcheForm from "./CatcheForm";
import PreloadTablesForm from "./PreloadTablesForm"
import PerformanceTunning from "./PerformanceTunning"
const Advanced = props => {
  const classes = usePageStyles();
  const { t } = useTranslation();
  const configTrans = t("config");
  const advancedTrans = t("advanced");
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <PaperWrapper className={classes.paper}>
        <div className={classes.titleContainer}>
          <Typography variant={"h5"}>{configTrans.advanced}</Typography>
          <WithTip title={t("restartNotify")} placement="right"></WithTip>
        </div>
        <MyTabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          <Tab label={advancedTrans.cacheSetting} />
          <Tab label={advancedTrans.performanceSetting} />
          <Tab label={advancedTrans.tableSetting} />
        </MyTabs>
        <TabPanel value={value} index={0}>
          <CatcheForm></CatcheForm>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PerformanceTunning />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <PreloadTablesForm />
        </TabPanel>
      </PaperWrapper>
    </div>
  );
};

export default Advanced;
