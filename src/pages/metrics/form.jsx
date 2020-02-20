import React, { useMemo, useState, useContext } from "react";
import { Form, Switch, Button, message, Input } from "antd";
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
const NetworkForm = Form.create({ name: "advanced-form" })(function (props) {
  const { form } = props;
  const { metricConfig } = useContext(systemContext)
  const {
    currentAddress,
    setMilvusConfig,
    restartNotify
  } = useContext(httpContext)
  const { getFieldDecorator, resetFields } = form;
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const metricsTrans = t("metrics");
  const buttonTrans = t("button");

  const { enable_monitor, address, port } = useMemo(() => {
    return metricConfig[currentAddress] || {}
  }, [currentAddress, metricConfig])

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
        const res = await setMilvusConfig({ metric_config: values })
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

      <Form.Item label={metricsTrans.enable}>
        {getFieldDecorator("enable_monitor", {
          valuePropName: "checked",
          initialValue: String(enable_monitor) === "true"
        })(
          <Switch />
        )}
      </Form.Item>

      <Form.Item label={metricsTrans.address}>
        {getFieldDecorator("address", {
          initialValue: address,
          rules: [
            {
              required: true,
              message: `${metricsTrans.address}${t('required')}`
            }
          ]
        })(<Input placeholder="0.0.0.0" />)}
      </Form.Item>

      <Form.Item label={metricsTrans.port}>
        {getFieldDecorator("port", {
          initialValue: port,
          rules: [
            {
              required: true,
              message: `${metricsTrans.port}${t('required')}`
            }
          ]
        })(<Input placeholder={metricsTrans.port} />)}
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
