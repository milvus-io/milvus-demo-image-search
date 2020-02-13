import React from "react";
import { Icon, Tooltip } from "antd";
import "./index.less";
const WithTip = props => {
  const { text, label } = props;

  return (
    <div className="tip-wrapper">
      <span className="label">{label}</span>
      <Tooltip placement="right" title={text} trigger="click">
        <Icon type="question-circle" theme="filled" />
      </Tooltip>
    </div>
  );
};

export default WithTip;
