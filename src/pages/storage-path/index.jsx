import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tab, Typography } from "@material-ui/core";
import PaperWrapper from "../../components/page-wrapper";
import TabPanel from "../../components/tab-panel";
import MyTabs from "../../components/tab";

import DataForm from "./data-form";
import MetaDataForm from "./meta-data-form";
import { usePageStyles } from "../../hooks/page";
import WithTip from "components/with-tip";

const Network = props => {
  const classes = usePageStyles();
  const [value, setValue] = useState(1);
  const { t } = useTranslation();
  const configTrans = t("config");
  const storageTrans = t("storage");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <PaperWrapper className={classes.paper}>
        <div className={classes.titleContainer}>
          <Typography variant={"h5"}>{configTrans.storage}</Typography>
          <WithTip text={t("restartNotify")}></WithTip>
        </div>
        <MyTabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          <Tab label={storageTrans.data.title} />
          <Tab label={storageTrans.metadata.title} />
        </MyTabs>

        <TabPanel value={value} index={0}>
          <DataForm></DataForm>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MetaDataForm></MetaDataForm>
        </TabPanel>
      </PaperWrapper>
    </div>
  );
};

export default Network;
