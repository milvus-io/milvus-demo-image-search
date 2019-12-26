import React from "react";
import { useTranslation } from "react-i18next";
import HardwareForm from "./form";
import "./index.scss";
const Hardware = props => {
  const { t } = useTranslation();
  const configTrans = t("config");

  return (
    <div className="hardware-wrapper">
      <div className="header">
        <h2>{configTrans.hardware}</h2>
      </div>

      <HardwareForm></HardwareForm>
    </div>
  );
};

export default Hardware;
