import React, { useMemo, useState, useContext } from "react";
import { Form, Input, Button, message } from "antd";
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
const NetworkForm = Form.create({ name: "advanced-form" })(function (props) {
  const { form } = props;
  const { serverConfig } = useContext(systemContext)
  const {
    currentAddress,
    setMilvusConfig,
    restartNotify
  } = useContext(httpContext)
  const { getFieldDecorator, resetFields } = form;
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const networkTrans = t("network");
  const buttonTrans = t("button");

  const { address, port } = useMemo(() => {
    return serverConfig[currentAddress] || {}
  }, [currentAddress, serverConfig])

  const formItemLayout = {
    layout: "vertical"
  };
  const handleSubmit = e => {
    e.preventDefault();
    restartNotify()

    props.form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      setLoading(true);
      try {
        const res = await setMilvusConfig({ server_config: values })
        if (res.code === 0) {
          message.success(t("submitSuccess"));
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


  return (
    <Form {...formItemLayout} style={{ maxWidth: "400px" }}>

      <Form.Item label={networkTrans.address}>
        {getFieldDecorator("address", {
          initialValue: address
        })(
          <Input placeholder={networkTrans.address}></Input>
        )}
      </Form.Item>

      <Form.Item label={networkTrans.port}>
        {getFieldDecorator("port", {
          initialValue: port
        })(
          <Input placeholder={networkTrans.port}></Input>
        )}
      </Form.Item>

      <Form.Item label=" " colon={false}>
        <Button className="mr-10" onClick={handleCancel}>
          {buttonTrans.cancel}
        </Button>
        <Button
          onClick={handleSubmit}
          loading={loading}
          type="primary"
        >
          {buttonTrans.save}
        </Button>
      </Form.Item>
    </Form>
  );
});

export default NetworkForm;
