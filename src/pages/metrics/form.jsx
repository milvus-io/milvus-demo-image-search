import React, { useEffect, useState, useContext } from "react";
import { Form, Switch, Button } from "antd";
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
const NetworkForm = Form.create({ name: "advanced-form" })(function (props) {
  const { form } = props;
  const { globalNotify } = useContext(systemContext)
  const {
    currentAddress
  } = useContext(httpContext)
  const { getFieldDecorator, resetFields } = form;
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const metricsTrans = t("metrics");
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


  return (
    <Form {...formItemLayout} style={{ marginTop: "40px", maxWidth: "600px" }}>

      <Form.Item label={metricsTrans.enable}>
        {getFieldDecorator("ip")(
          <Switch />
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
