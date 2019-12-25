import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useHistory } from "react-router-dom";
import http from "@/http/index";
import Logo from "assets/imgs/logo.svg";
import "./Login.scss";

const FormItem = Form.Item;
const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

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
        window.localStorage.setItem("milvus-url", url);
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
        <FormItem label={"Host"}>
          {getFieldDecorator("host", {
            rules: [{ required: true, message: "host is required" }]
          })(<Input placeholder="0.0.0.0" className="input"></Input>)}
        </FormItem>
        <FormItem label="Port">
          {getFieldDecorator("port", {
            rules: [{ required: true, message: "port is required" }]
          })(<Input placeholder=""></Input>)}
        </FormItem>
        <div style={{ textAlign: "center" }}>
          <Button
            className="primary-btn"
            onClick={handleConnect}
            loading={loading}
          >
            Connect
          </Button>
        </div>
      </Form>
    );
  });
  return (
    <div className="login-wrapper">
      <div className="content">
        <div>
          <img src={Logo} alt="Milvus Logo"></img>
          <p className="desc">Installation Wilzard</p>
        </div>
        <LoginForm></LoginForm>
      </div>
    </div>
  );
};

export default Login;
