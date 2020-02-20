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
    <Form {...formItemLayout} style={{ marginTop: "40px", maxWidth: "600px" }}>

      <Form.Item label={networkTrans.address}>
        {getFieldDecorator("address", {
          initialValue: address
        })(
          <Input placeholder="Listening Address"></Input>
        )}
      </Form.Item>

      <Form.Item label={networkTrans.port}>
        {getFieldDecorator("port", {
          initialValue: port
        })(
          <Input placeholder="Listening Port"></Input>
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
