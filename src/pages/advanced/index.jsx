import React from "react";
import { useTranslation } from "react-i18next";
import AdvancedForm from "./form";
import "./index.scss";

const Advanced = props => {
  const { t } = useTranslation();
  const configTrans = t("config");

  return (
    <div className="advanced-wrapper">
      <div className="header">
        <h2>{configTrans.advanced}</h2>
      </div>
      <AdvancedForm></AdvancedForm>
    </div>
  );
};

export default Advanced;
