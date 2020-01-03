import React, { useState, useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useHistory } from "react-router-dom";
import http from "@/http/index";
import Logo from "assets/imgs/logo.svg";
import "./Login.scss";
import { HOST, PORT } from "@/consts";
import { useTranslation } from "react-i18next";

const FormItem = Form.Item;
const Login = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const loginTrans = t("login");
  const [loading, setLoading] = useState(false);
  const localPort = window.localStorage.getItem(PORT);
  const localHost = window.localStorage.getItem(HOST);
  const LoginForm = Form.create({ name: "login_form" })(function(props) {
    const { form } = props;
    const { getFieldDecorator } = form;
    const handleConnect = e => {
      setLoading(true);
      e.preventDefault();
      form.validateFields(async (err, values) => {
        if (err) {
          setLoading(false);
          return;
        }
        const { host, port } = values;
        const url = `${host}:${port}`;
        window.localStorage.setItem(HOST, host);
        window.localStorage.setItem(PORT, port);
        try {
          const res = await http.get("/state");
          if (res.data && res.data.code === 0) {
            history.push("/manage/table");
          }
        } catch (e) {
          message.warning(`Connect http://${url} Fail`);
        } finally {
          setLoading(false);
        }
      });
    };

    return (
      <Form layout="vertical" style={{ width: "400px" }}>
        <FormItem label={loginTrans.host}>
          {getFieldDecorator("host", {
            initialValue: localHost,
            rules: [{ required: true, message: "host is required" }]
          })(<Input placeholder="0.0.0.0" className="input"></Input>)}
        </FormItem>
        <FormItem label={loginTrans.port}>
          {getFieldDecorator("port", {
            initialValue: localPort,
            rules: [{ required: true, message: "port is required" }]
          })(<Input placeholder=""></Input>)}
        </FormItem>
        <div style={{ textAlign: "center" }}>
          <Button
            className="primary-btn"
            onClick={handleConnect}
            loading={loading}
          >
            {loginTrans.connect}
          </Button>
        </div>
      </Form>
    );
  });

  useEffect(() => {
    const login = async () => {
      const res = await http.get("/state");
      if (res.data && res.data.code === 0) {
        history.push("/manage/table");
      }
    };
    const host = window.localStorage.getItem(HOST);
    const port = window.localStorage.getItem(PORT);
    if (host && port) {
      login();
    }
  }, []);
  return (
    <div className="login-wrapper">
      <div className="content">
        <div>
          <img src={Logo} alt="Milvus Logo"></img>
        </div>
        <LoginForm></LoginForm>
      </div>
    </div>
  );
};

export default Login;
