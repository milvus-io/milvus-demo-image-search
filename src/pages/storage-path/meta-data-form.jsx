import React, { useState, useContext } from "react";
import { Form, Input, Button, Select } from "antd";
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";

const { Option } = Select

const MetaDataForm = Form.create({ name: "advanced-form" })(function (props) {
  const { form } = props;
  const { globalNotify } = useContext(systemContext)
  const {
    currentAddress
  } = useContext(httpContext)
  const { getFieldDecorator, resetFields } = form;
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const metaDataTrans = t("storage").metadata;
  const buttonTrans = t("button");

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    globalNotify()
    props.form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      setLoading(true);
      try {
        console.log(values)
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
    <Form {...formItemLayout} style={{ marginTop: "40px", maxWidth: "600px" }}>
      <Form.Item label={metaDataTrans.type}>
        {getFieldDecorator("type", {
          initialValue: "mysql"
        })(
          <Select onChange={handleChange}>
            <Option value="mysql">Mysql</Option>
            <Option value="sqlite">SQlite</Option>
          </Select>
        )}
      </Form.Item>

      <Form.Item label={metaDataTrans.host}>
        {getFieldDecorator("host")(
          <Input placeholder="0.0.0.0"></Input>
        )}
      </Form.Item>
      <Form.Item label={metaDataTrans.port}>
        {getFieldDecorator("port")(
          <Input placeholder="8000"></Input>
        )}
      </Form.Item>
      <Form.Item label={metaDataTrans.username}>
        {getFieldDecorator("username")(
          <Input placeholder={metaDataTrans.username}></Input>
        )}
      </Form.Item>
      <Form.Item label={metaDataTrans.password}>
        {getFieldDecorator("password")(
          <Input placeholder={metaDataTrans.password}></Input>
        )}
      </Form.Item>

      <Form.Item label=" " colon={false}>
        <Button className="disable-btn mr-10" onClick={handleCancel}>
          {buttonTrans.cancel}
        </Button>
        <Button
          className={"primary-btn"}
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
