import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tab } from '@material-ui/core'
import PaperWrapper from '../../components/page-wrapper'
import TabPanel from '../../components/tab-panel'
import MyTabs from '../../components/tab'

import DataForm from './data-form';
import MetaDataForm from './meta-data-form';
import { usePageStyles } from '../../hooks/page'
import WithTip from "components/with-tip";



const Network = props => {
  const classes = usePageStyles()
  const [value, setValue] = useState(1)
  const { t } = useTranslation();
  const configTrans = t("config");
  const storageTrans = t("storage")

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h2 className={classes.h2}>{configTrans.storage}</h2>
        <WithTip text={t("restartNotify")}></WithTip>
      </div>
      <PaperWrapper className={classes.paper}>
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
