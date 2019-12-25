import React, { useState } from "react";
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
import { createTable } from "@/http/table";

const { Option } = Select;
const METRIC_TYPES = [
  { label: "L2", value: 1 },
  { label: "IP", value: 2 }
];

const TableForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  function(props) {
    const [dimension, setDimension] = useState(4096);
    const [size, setSize] = useState(1024);

    const handleSubmit = e => {
      e.preventDefault();
      props.form.validateFields(async (err, values) => {
        if (err) {
          return;
        }
        const data = {
          ...values,
          dimension,
          index_file_size: size
        };
        const res = await createTable(data);
        if (res.code === 0) {
          props.saveSuccess("Create Table Success");
        }
      });
    };

    const { form } = props;
    const { getFieldDecorator } = form;

    return (
      <Form layout="vertical">
        <Form.Item label="Table Name">
          {getFieldDecorator("table_name", {
            rules: [
              {
                required: true,
                message: "Please input the Table Name!"
              }
            ]
          })(<Input placeholder="new table name" />)}
        </Form.Item>
        <Form.Item label="Metric Type">
          {getFieldDecorator("metric_type", { initialValue: 1 })(
            <Select>
              {METRIC_TYPES.map(t => (
                <Option key={t.label} value={t.value}>
                  {t.label}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Dimension">
          <Row>
            <Col span={16}>
              <Slider
                min={1}
                max={4096}
                onChange={setDimension}
                step={1}
                value={typeof dimension === "number" ? dimension : 0}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                max={4096}
                style={{ marginLeft: 16 }}
                value={dimension}
                onChange={setDimension}
              />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="Index File Size">
          <Row>
            <Col span={16}>
              <Slider
                min={1}
                max={20000}
                onChange={setSize}
                value={typeof size === "number" ? size : 0}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                max={20000}
                style={{ marginLeft: 16 }}
                value={size}
                onChange={setSize}
              />
            </Col>
          </Row>
        </Form.Item>
        <div>
          <Button className="disable-btn mr-10" onClick={props.handleCancel}>
            CANCEL
          </Button>
          <Button className="primary-btn" onClick={handleSubmit}>
            CREATE
          </Button>
        </div>
      </Form>
    );
  }
);

export default TableForm;
