import React, { useState, useContext } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Slider,
  InputNumber
} from "antd";
import { httpContext } from '../../context/http'
import { useTranslation } from "react-i18next";
import WithTip from "components/with-tip";

const { Option } = Select;
const METRIC_TYPES = [
  { label: "L2", value: "L2" },
  { label: "IP", value: "IP" }
];

const TableForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  function (props) {
    const { createTable } = useContext(httpContext)
    const [dimension, setDimension] = useState(4096);
    const [size, setSize] = useState(1024);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const tableTrans = t("table");
    const tipsTrans = tableTrans.tips;
    const buttonTrans = t("button");
    const { form } = props;
    const { getFieldDecorator, resetFields } = form;

    const handleSubmit = async e => {
      e.preventDefault();

      props.form.validateFields(async (err, values) => {
        if (err) {
          return;
        }
        setLoading(true);

        const data = {
          ...values,
          dimension,
          index_file_size: size
        };
        try {
          const res = await createTable(data);
          if (res.code === 0) {
            props.saveSuccess(tableTrans.saveSuccess);
            resetFields();
          }
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
      <Form layout="vertical">
        <Form.Item
          label={
            <WithTip text={tipsTrans.name} label={tableTrans.tName}></WithTip>
          }
        >
          {getFieldDecorator("table_name", {
            rules: [
              {
                required: true,
                message: tableTrans.error.name
              }
            ]
          })(<Input placeholder={tableTrans.create} />)}
        </Form.Item>
        <Form.Item label={tableTrans.tMetric}>
          {getFieldDecorator("metric_type", { initialValue: "L2" })(
            <Select>
              {METRIC_TYPES.map(t => (
                <Option key={t.label} value={t.value}>
                  {t.label}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label={tableTrans.tDimension}>
          <Row>
            <Col span={19}>
              <Slider
                min={1}
                max={16384}
                onChange={setDimension}
                step={1}
                value={typeof dimension === "number" ? dimension : 0}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                max={16384}
                style={{ marginLeft: 16 }}
                value={dimension}
                onChange={setDimension}
              />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          label={
            <WithTip
              text={tipsTrans.fileSize}
              label={tableTrans.fileSize}
            ></WithTip>
          }
        >
          <Row>
            <Col span={19}>
              <Slider
                min={1}
                max={4096}
                onChange={setSize}
                value={typeof size === "number" ? size : 0}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                max={4096}
                style={{ marginLeft: 16 }}
                value={size}
                onChange={setSize}
              />
            </Col>
          </Row>
        </Form.Item>
        <div>
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
        </div>
      </Form>
    );
  }
);

export default TableForm;
