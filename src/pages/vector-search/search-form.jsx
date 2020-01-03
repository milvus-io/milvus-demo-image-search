import React, { useState } from "react";
import { Form, Input, Button, InputNumber } from "antd";
import { useTranslation } from "react-i18next";
import { searchVectors } from "@/http/vector";

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
    const { getFieldDecorator, resetFields, setFieldsValue } = form;

    const handleSubmit = async e => {
      e.preventDefault();
      props.form.validateFields(async (err, values) => {
        if (err) {
          return;
        }
        setLoading(true);

        try {
          const regx = /[^(0-9|,|.)]/g;
          const records = values.records
            .replace(regx, "")
            .split(",")
            .filter(v => v || v === 0)
            .map(v => Number(v));

          setFieldsValue({
            records: `[${records}]`
          });
          const res = await searchVectors({
            ...values,
            records: [records]
          });

          props.searchSuccess(res.results[0] || []);
        } catch (e) {
          throw e;
        } finally {
          setLoading(false);
        }
      });
    };

    const handleCancel = e => {
      resetFields();
      props.handleCancel();
    };

    return (
      <Form
        className={`search-wrapper ${props.showSearch ? "" : "hide"}`}
        {...formItemLayout}
        style={{ marginTop: "40px", maxWidth: "600px" }}
      >
        <Form.Item label={vectorTrans.tName}>
          {getFieldDecorator("tableName", {
            rules: [
              {
                required: true,
                message: `${vectorTrans.tName} ${t("required")}`
              }
            ]
          })(<Input placeholder={vectorTrans.tName} />)}
        </Form.Item>
        <Form.Item label={vectorTrans.tTop}>
          {getFieldDecorator("topk", {
            initialValue: 2,
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
            initialValue: 16,
            rules: [
              {
                required: true,
                message: `${vectorTrans.tNprobe} ${t("required")}`
              }
            ]
          })(<InputNumber min={1} placeholder={`[1, nlist]`} />)}
        </Form.Item>
        <Form.Item label={vectorTrans.tQuery}>
          {getFieldDecorator("records", {
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
