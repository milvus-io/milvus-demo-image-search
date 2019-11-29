import React from "react";
import Logo from "assets/imgs/logo.svg";
import "./Install.scss";

const Install = () => {
  return (
    <div className="install-wrapper">
      <div className="step-wrapper">
        <div className="logo-wrapper">
          <img src={Logo} alt="Milvus Logo"></img>
          <span>Installation Wilzard</span>
        </div>
        <ul className="steps">
          <li>Set up network access</li>
          <li>Set up data storage path</li>
          <li>Set up meta data storage</li>
          <li>Choose hardware resource</li>
          <li>Confirm</li>
        </ul>
      </div>
      <div></div>
    </div>
  );
};

export default Install;
