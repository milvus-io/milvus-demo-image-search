import React, { useState, useEffect, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Icon, Modal, Select } from "antd";
import "./index.less";
import { HOST, PORT } from "@/consts";
import Logo from "assets/imgs/logo.svg";
import CONFIG_ICON from "assets/imgs/config.png";
import DATA_ICON from "assets/imgs/dataManage.png";
import LoginForm from '../../pages/Login'
import { ADD } from '../../reducers/milvus-servers'
import { systemContext } from "../../context/system"
import { httpContext } from "../../context/http"

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
const { Option } = Select

const LayoutWrapper = props => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const configTrans = t("config");
  const dataTrans = t("dataManage");
  const [langTxt, setLangTxt] = useState("中");
  const [hardwareType, setHardwareType] = useState("GPU");
  const { currentAddress, setCurrentAddress, getHardwareType } = useContext(httpContext)
  const { milvusAddress, setMilvusAddress } = useContext(systemContext)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const lang = window.localStorage.getItem("lang") || "en";
    setLangTxt(lang === "cn" ? "En" : "中");
    i18n.changeLanguage(lang);

    getHardwareType().then(res => {
      setHardwareType(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const host = window.localStorage.getItem(HOST);
    const port = window.localStorage.getItem(PORT);
    const url = `${host}:${port}`
    if (host && port && !milvusAddress[url]) {
      setMilvusAddress({ type: ADD, payload: { host, port, url } })
      setCurrentAddress(url)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const handleAddressChange = val => {
    setCurrentAddress(val)
  }

  const handleCancel = () => {
    setVisible(false)
  }
  const handleAdd = () => {
    setVisible(true)
  }

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
            <Select value={currentAddress} style={{ width: 190 }} onChange={handleAddressChange}>
              {
                Object.keys(milvusAddress).map(v =>
                  <Option value={v} key={v}>{v}</Option>
                )
              }
            </Select>
            {/* {`${host}:${port}`} */}
          </div>
          <Icon type="logout" className="logout" onClick={handleLogout} />
          <Icon type="plus" className="ml-10" onClick={handleAdd}></Icon>
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
      <div className="right"> {props.children} </div>
      <Modal
        title="Connect to Milvus"
        visible={visible}
        footer={null}
        onCancel={handleCancel}
      >
        <LoginForm
          milvusAddress={milvusAddress}
          setMilvusAddress={setMilvusAddress}
          setCurrentAddress={setCurrentAddress}
          handleCancel={handleCancel}
        ></LoginForm>
      </Modal>
    </div>
  );
};

export default LayoutWrapper;
