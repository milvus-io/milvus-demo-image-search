import React from "react";
import { useTranslation } from "react-i18next";
import OthersForm from './form';
import "./index.less";


const Others = props => {
  const { t } = useTranslation();
  const configTrans = t("config");

  return (
    <div className="others-wrapper">
      <div className="header">
        <h2>{configTrans.others}</h2>
      </div>
      <OthersForm></OthersForm>
    </div>
  );
};

export default Others;
