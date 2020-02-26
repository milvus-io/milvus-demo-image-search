import React, { useState, } from "react";
import { Button, Form, Input, message } from "antd";
import http from "@/http/index";
// import Logo from "assets/imgs/logo.svg";
import { ADD } from '../reducers/milvus-servers'
// import "./Login.less";
import { HOST, PORT } from "@/consts";
import { useTranslation } from "react-i18next";

const FormItem = Form.Item;
const Login = props => {
  // const history = useHistory();
  const { t } = useTranslation();
  const loginTrans = t("login");
  const [loading, setLoading] = useState(false);
  const { milvusAddress, setMilvusAddress, setCurrentAddress, handleCancel } = props

  const localPort = window.localStorage.getItem(PORT) || '19121';
  const localHost = window.localStorage.getItem(HOST);
  const LoginForm = Form.create({ name: "login_form" })(function (props) {
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
        if (milvusAddress[url]) {
          message.warning(`Already connected: http://${url}`)
          setLoading(false);
          return
        }
        window.localStorage.setItem(HOST, host)
        window.localStorage.setItem(PORT, port)

        try {
          const res = await http.get("/state");
          if (res.data && res.data.code === 0) {
            // history.push("/manage/table");
            setMilvusAddress({
              type: ADD, payload: {
                ...values,
                url,
                connected: true
              }
            })
            setCurrentAddress(url)
          }
        } catch (e) {
          window.localStorage.setItem(HOST, localHost)
          window.localStorage.setItem(PORT, localPort)
          message.warning(`Connect http://${url} Fail`);
        } finally {
          setLoading(false);
          handleCancel()
        }
      });
    };

    return (
      <Form layout="vertical" >
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
          })(<Input placeholder="19121"></Input>)}
        </FormItem>
        <div style={{ textAlign: "center" }}>
          <Button
            type="primary"
            onClick={handleConnect}
            loading={loading}
            style={{ width: "150px" }}
          >
            {loginTrans.connect}
          </Button>
        </div>
      </Form>
    );
  });


  return (
    <div className="login-wrapper">
      <div className="content">
        {/* <div>
          <img src={Logo} alt="Milvus Logo"></img>
        </div> */}
        <LoginForm></LoginForm>
      </div>
    </div>
  );
};

export default Login;
