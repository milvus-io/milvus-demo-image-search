import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useHistory } from "react-router-dom";
import Logo from "assets/imgs/logo.svg";
import "./Login.scss";

const FormItem = Form.Item;
const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const Label = labelProps => {
    return <div style={{ color: "#fff" }}>{labelProps.name}</div>;
  };
  const handleConnect = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      history.push("/manage/table");
    }, 1000);
  };
  return (
    <div className="login-wrapper">
      <div className="content">
        <div>
          <img src={Logo} alt="Milvus Logo"></img>
          <p className="desc">Installation Wilzard</p>
        </div>
        <Form layout="vertical" style={{ width: "400px" }}>
          <FormItem label={<Label name="Host Name"></Label>}>
            <Input placeholder="0.0.0.0" className="input"></Input>
          </FormItem>
          <FormItem label={<Label name="Port"></Label>}>
            <Input placeholder=""></Input>
          </FormItem>
        </Form>
        <Button
          className="primary-btn"
          onClick={handleConnect}
          loading={loading}
        >
          Connect
        </Button>
      </div>
    </div>
  );
};

export default Login;
