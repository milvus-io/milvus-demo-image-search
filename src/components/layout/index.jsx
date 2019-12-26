import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { URL } from "@/consts";
import { useTranslation } from "react-i18next";
import { Icon } from "antd";
import "./index.scss";
import Logo from "assets/imgs/logo.svg";

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
  const changeLang = () => {
    const lang = langTxt === "中" ? "cn" : "en";
    setLangTxt(langTxt === "中" ? "En" : "中");
    i18n.changeLanguage(lang);
    window.localStorage.setItem("lang", lang);
  };

  const handleLogout = () => {
    window.localStorage.removeItem(URL);
    history.push("/login");
  };

  const url = window.localStorage.getItem(URL);
  useEffect(() => {
    const lang = window.localStorage.getItem("lang") || "en";
    setLangTxt(lang === "cn" ? "En" : "中");
    i18n.changeLanguage(lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="layout-wrapper">
      <div className="left">
        <div className="logo-wrapper">
          <img src={Logo} alt="Milvus Logo"></img>
          <span onClick={changeLang} style={{ cursor: "pointer" }}>
            {langTxt}
          </span>
        </div>
        <div className="logout-wrapper">
          <div>
            {url}
            <Icon type="logout" className="logout" onClick={handleLogout} />
          </div>
        </div>

        <div className="menu">
          <h2 className="title">{configTrans.title}</h2>
          <ul className="list-wrapper">
            <MyLink to="/manage/advanced">{configTrans.advanced}</MyLink>
            <MyLink
              to="/manage/hardware"
              activeStyle={{
                fontWeight: "bold"
              }}
            >
              {configTrans.hardware}
            </MyLink>
          </ul>
          <h2 className="title">{dataTrans.title}</h2>
          <ul className="list-wrapper">
            <MyLink
              to="/manage/table"
              activeStyle={{
                fontWeight: "bold"
              }}
            >
              {dataTrans.table}
            </MyLink>
          </ul>
        </div>
      </div>
      <div className="right">{props.children}</div>
    </div>
  );
};

export default LayoutWrapper;
