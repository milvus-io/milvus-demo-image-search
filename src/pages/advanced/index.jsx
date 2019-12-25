import React, { useState, useEffect } from "react";
import { Button } from "antd";
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
        <Button className="primary-btn">Save</Button>
        <Button className="disable-btn">Cancel</Button>
      </div>
      <AdvancedForm></AdvancedForm>
    </div>
  );
};

export default Advanced;
