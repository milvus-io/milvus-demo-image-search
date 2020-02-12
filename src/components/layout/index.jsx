import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Icon } from "antd";
import "./index.less";
import { HOST, PORT } from "@/consts";
import Logo from "assets/imgs/logo.svg";
import CONFIG_ICON from "assets/imgs/config.png";
import DATA_ICON from "assets/imgs/dataManage.png";
import { getHardwareType } from "@/http/configs";
const MyLink = props => {
  return (
    <li>
      <NavLink
        to={props.to}
        activeStyle={{
          fontWeight: "bold"
        }}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

const LayoutWrapper = props => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const configTrans = t("config");
  const dataTrans = t("dataManage");
  const [langTxt, setLangTxt] = useState("中");
  const [hardwareType, setHardwareType] = useState("GPU");

  const host = window.localStorage.getItem(HOST);
  const port = window.localStorage.getItem(PORT);

  useEffect(() => {
    const lang = window.localStorage.getItem("lang") || "en";
    setLangTxt(lang === "cn" ? "En" : "中");
    i18n.changeLanguage(lang);

    getHardwareType().then(res => {
      setHardwareType(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeLang = () => {
    const lang = langTxt === "中" ? "cn" : "en";
    setLangTxt(langTxt === "中" ? "En" : "中");
    i18n.changeLanguage(lang);
    window.localStorage.setItem("lang", lang);
  };

  const handleLogout = () => {
    window.localStorage.removeItem(HOST);
    window.localStorage.removeItem(PORT);
    history.push("/login");
  };

  return (
    <div className="layout-wrapper">
      <div className="left">
        <div className="logo-wrapper">
          <div className="img-wrapper">
            <img src={Logo} alt="Milvus Logo"></img>
          </div>
          <span onClick={changeLang} style={{ cursor: "pointer" }}>
            {langTxt}
          </span>
        </div>
        <div className="logout-wrapper">
          <div>
            {`${host}:${port}`}
            <Icon type="logout" className="logout" onClick={handleLogout} />
          </div>
        </div>

        <div className="menu">
          <h2 className="title">
            <img src={CONFIG_ICON} alt="config"></img>
            {configTrans.title}
          </h2>
          <ul className="list-wrapper">
            <MyLink to="/manage/advanced">{configTrans.advanced}</MyLink>
            {hardwareType === "GPU" && (
              <MyLink to="/manage/hardware">{configTrans.hardware}</MyLink>
            )}
          </ul>
          <h2 className="title">
            <img src={DATA_ICON} alt="data-manage"></img>
            {dataTrans.title}
          </h2>
          <ul className="list-wrapper">
            <MyLink to="/manage/table">{dataTrans.table}</MyLink>
            <MyLink to="/manage/vector">{dataTrans.vector}</MyLink>
          </ul>
        </div>
      </div>
      <div className="right">{props.children}</div>
    </div>
  );
};

export default LayoutWrapper;
