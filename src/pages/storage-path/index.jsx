import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, Tab } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import TabPanel from '../../components/tab-panel'
import DataForm from './data-form';
import MetaDataForm from './meta-data-form';
import { usePageStyles } from '../../hooks/page'
import WithTip from "components/with-tip";



const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
    maxWidth: "700px"
  },
})(Tabs);

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
    <div className="storage-wrapper">
      <div className={classes.header}>
        <h2 className={classes.h2}>{configTrans.storage}</h2>
        <WithTip text={t("restartNotify")}></WithTip>
      </div>
      <AntTabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label={storageTrans.data.title} />
        <Tab label={storageTrans.metadata.title} />

      </AntTabs>

      <TabPanel value={value} index={0}>
        <DataForm></DataForm>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MetaDataForm></MetaDataForm>
      </TabPanel>
    </div>
  );
};

export default Network;
