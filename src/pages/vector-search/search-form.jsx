import React, { useState } from "react";
import { Form, Input, Button, InputNumber } from "antd";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
};
const TableForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  function(props) {
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const vectorTrans = t("vector");
    const buttonTrans = t("button");
    const { form } = props;
    const { getFieldDecorator, resetFields } = form;

    const handleSubmit = async e => {
      e.preventDefault();
      props.searchSuccess();
      props.form.validateFields(async (err, values) => {
        if (err) {
          return;
        }
        setLoading(true);
      });
    };

    const handleCancel = e => {
      resetFields();
    };

    return (
      <Form
        className={`search-wrapper ${props.showSearch ? "" : "hide"}`}
        {...formItemLayout}
        style={{ marginTop: "40px", maxWidth: "600px" }}
      >
        <Form.Item label={vectorTrans.tName}>
          {getFieldDecorator("table_name", {
            rules: [
              {
                required: true,
                message: `${vectorTrans.tName} ${t("required")}`
              }
            ]
          })(<Input placeholder={vectorTrans.tName} />)}
        </Form.Item>
        <Form.Item label={vectorTrans.tTop}>
          {getFieldDecorator("top_k", {
            rules: [
              {
                required: true,
                message: `${vectorTrans.tTop} ${t("required")}`
              }
            ]
          })(<InputNumber placeholder={`(0, 2048]`} min={1} max={2048} />)}
        </Form.Item>
        <Form.Item label={vectorTrans.tNprobe}>
          {getFieldDecorator("nprobe", {
            rules: [
              {
                required: true,
                message: `${vectorTrans.tNprobe} ${t("required")}`
              }
            ]
          })(<InputNumber min={1} placeholder={`[1, nlist]`} />)}
        </Form.Item>
        <Form.Item label={vectorTrans.tQuery}>
          {getFieldDecorator("query_records", {
            rules: [
              {
                required: true,
                message: `${vectorTrans.tQuery} ${t("required")}`
              }
            ]
          })(
            <TextArea
              placeholder={vectorTrans.queryPlace}
              autoSize={{ minRows: 4 }}
            ></TextArea>
          )}
        </Form.Item>

        <Form.Item label=" " colon={false}>
          <Button className="disable-btn mr-10" onClick={handleCancel}>
            {buttonTrans.cancel}
          </Button>
          <Button
            className="primary-btn"
            onClick={handleSubmit}
            loading={loading}
          >
            {buttonTrans.search}
          </Button>
        </Form.Item>
      </Form>
    );
  }
);

export default TableForm;
