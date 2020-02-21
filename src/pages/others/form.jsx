import React, { useMemo, useState, useContext } from "react";
import { Form, Input, Button, message } from "antd";
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import { UPDATE } from "../../reducers/milvus-servers";
const NetworkForm = Form.create({ name: "advanced-form" })(function (props) {
  const { form } = props;
  const { milvusAddress, setMilvusAddress } = useContext(systemContext)
  const {
    currentAddress,

  } = useContext(httpContext)
  const { getFieldDecorator, resetFields } = form;

  const { t } = useTranslation();
  const othersTrans = t("others");
  const buttonTrans = t("button");

  const { logServer, pmServer } = useMemo(() => {
    return milvusAddress[currentAddress] || {}
  }, [currentAddress, milvusAddress])

  const formItemLayout = {
    layout: "vertical"
  };
  const handleSubmit = e => {
    e.preventDefault();

    props.form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      console.log(values)
      setMilvusAddress({
        type: UPDATE,
        payload: {
          id: currentAddress,
          values
        }
      })
    });
  };

  const handleCancel = async () => {
    resetFields();
  };


  return (
    <Form {...formItemLayout} style={{ maxWidth: "400px" }}>

      <Form.Item label={othersTrans.logServer}>
        {getFieldDecorator("logServer", {
          initialValue: logServer
        })(
          <Input placeholder={othersTrans.logServer}></Input>
        )}
      </Form.Item>

      <Form.Item label={othersTrans.pmServer}>
        {getFieldDecorator("pmServer", {
          initialValue: pmServer
        })(
          <Input placeholder={othersTrans.pmServer}></Input>
        )}
      </Form.Item>

      <Form.Item label=" " colon={false}>
        <Button className="mr-10" onClick={handleCancel}>
          {buttonTrans.cancel}
        </Button>
        <Button
          onClick={handleSubmit}
          type="primary"
        >
          {buttonTrans.save}
        </Button>
      </Form.Item>
    </Form>
  );
});

export default NetworkForm;
