import React from "react";
import { useTranslation } from "react-i18next";
import StoragePathForm from './form';
import WithTip from "components/with-tip";
import "./index.less";


const Network = props => {
  const { t } = useTranslation();
  const configTrans = t("config");

  return (
    <div className="network-wrapper">
      <div className="header">
        <h2>{configTrans.storage}</h2>
        <WithTip text={t("restartNotify")}></WithTip>
      </div>
      <StoragePathForm></StoragePathForm>
    </div>
  );
};

export default Network;
