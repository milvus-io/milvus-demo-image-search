import React, { useState, useContext, useMemo } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";

const { Option } = Select

const MetaDataForm = Form.create({ name: "advanced-form" })(function (props) {
  const { form } = props;
  const { dbConfig } = useContext(systemContext)
  const {
    currentAddress,
    setMilvusConfig,
    restartNotify
  } = useContext(httpContext)
  const { getFieldDecorator, resetFields } = form;
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const metaDataTrans = t("storage").metadata;
  const buttonTrans = t("button");

  const { type, username, password, host, port } = useMemo(() => {
    return dbConfig[currentAddress] || {}
  }, [currentAddress, dbConfig])

  const formItemLayout = {
    layout: "vertical"
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      setLoading(true);
      const { host, port, username, password, type } = values
      const url = `${type}://${username}:${password}@${host}:${port}/`
      try {
        const res = await setMilvusConfig({
          db_config: {
            backend_url: url
          }
        })
        if (res.code === 0) {
          message.success(t("submitSuccess"));
          resetFields();
          restartNotify()
        }
      } finally {
        setLoading(false);
      }
    });
  };

  const handleCancel = async () => {
    resetFields();
  };
  const handleChange = val => {
    console.log(val)
  }


  return (
    <Form {...formItemLayout} style={{ maxWidth: "400px" }}>
      <Form.Item label={metaDataTrans.type}>
        {getFieldDecorator("type", {
          initialValue: type || "sqlite"
        })(
          <Select onChange={handleChange}>
            <Option value="mysql">Mysql</Option>
            <Option value="sqlite">SQlite</Option>
          </Select>
        )}
      </Form.Item>

      <Form.Item label={metaDataTrans.host}>
        {getFieldDecorator("host", {
          initialValue: host
        })(
          <Input placeholder="0.0.0.0"></Input>
        )}
      </Form.Item>
      <Form.Item label={metaDataTrans.port}>
        {getFieldDecorator("port", {
          initialValue: port
        })(
          <Input placeholder="8000"></Input>
        )}
      </Form.Item>
      <Form.Item label={metaDataTrans.username}>
        {getFieldDecorator("username", {
          initialValue: username
        })(
          <Input placeholder={metaDataTrans.username}></Input>
        )}
      </Form.Item>
      <Form.Item label={metaDataTrans.password}>
        {getFieldDecorator("password", {
          initialValue: password
        })(
          <Input placeholder={metaDataTrans.password}></Input>
        )}
      </Form.Item>

      <Form.Item label=" " colon={false}>
        <Button className=" mr-10" onClick={handleCancel}>
          {buttonTrans.cancel}
        </Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={loading}
        >
          {buttonTrans.save}
        </Button>
      </Form.Item>
    </Form>
  );
});

export default MetaDataForm;
