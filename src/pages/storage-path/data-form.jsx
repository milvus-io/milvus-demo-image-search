import React, { useState, useContext, useMemo } from "react";
import { Form, Input, Button, Switch, message } from "antd";
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";

const NetworkForm = Form.create({ name: "advanced-form" })(function (props) {
  const { form } = props;
  const { globalNotify, storageConfig } = useContext(systemContext)
  const {
    currentAddress,
    setMilvusConfig
  } = useContext(httpContext)
  const { getFieldDecorator, resetFields } = form;
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const dataTrans = t("storage").data;
  const buttonTrans = t("button");

  const { primary_path: primaryPath, secondary_path: secondaryPath } = useMemo(() => {
    return storageConfig[currentAddress] || {}
  }, [currentAddress, storageConfig])

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
    props.form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      setLoading(true);
      try {
        console.log(values)
        const res = await setMilvusConfig({
          storage_config: values
        })
        if (res.code === 0) {
          message.success(t("submitSuccess"));
          resetFields();
          globalNotify()
        }
      } finally {
        setLoading(false);
      }
    });
  };

  const handleCancel = async () => {
    resetFields();
  };


  return (
    <Form {...formItemLayout} style={{ marginTop: "40px", maxWidth: "600px" }}>

      <Form.Item label={dataTrans.primary}>
        {getFieldDecorator("primary_path", {
          initialValue: primaryPath
        })(
          <Input placeholder="Primary Path"></Input>
        )}
      </Form.Item>

      <Form.Item label={dataTrans.second}>
        {getFieldDecorator("secondary_path", {
          initialValue: secondaryPath
        })(
          <Input placeholder="Secondary Path"></Input>
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

export default NetworkForm;
