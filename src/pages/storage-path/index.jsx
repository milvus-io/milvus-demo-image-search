import React from "react";
import { useTranslation } from "react-i18next";
import { Tabs } from 'antd'
import DataForm from './data-form';
import MetaDataForm from './meta-data-form';

import WithTip from "components/with-tip";
import "./index.less";

const { TabPane } = Tabs

const Network = props => {
  const { t } = useTranslation();
  const configTrans = t("config");
  const storageTrans = t("storage")

  return (
    <div className="storage-wrapper">
      <div className="header">
        <h2>{configTrans.storage}</h2>
        <WithTip text={t("restartNotify")}></WithTip>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab={storageTrans.data.title} key="data">
          <DataForm></DataForm>
        </TabPane>
        <TabPane tab={storageTrans.metadata.title} key="metadata">
          <MetaDataForm></MetaDataForm>
        </TabPane>

      </Tabs>
    </div>
  );
};

export default Network;
