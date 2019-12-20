import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import Logo from "assets/imgs/logo.svg";

const LayoutWrapper = props => {
  return (
    <div className="layout-wrapper">
      <div className="left">
        <div className="logo-wrapper">
          <img src={Logo} alt="Milvus Logo"></img>
        </div>
        <div className="menu">
          <h2 className="title">Configuration</h2>
          <h2 className="title">Data Management</h2>
          <ul>
            <Link to="/manage/table">Table and Index</Link>
          </ul>
        </div>
      </div>
      <div className="right">{props.children}</div>
    </div>
  );
};

export default LayoutWrapper;
