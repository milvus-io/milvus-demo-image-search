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

const { Option } = Select;
const METRIC_TYPES = ["L2", "L3", "L4"];

const TableForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  function(props) {
    const [dimension, setDimension] = useState(16384);
    const [size, setSize] = useState(4096);

    const handleSubmit = e => {
      e.preventDefault();
      props.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
        const data = {
          ...values,
          dimension,
          size
        };
        console.log(data);
      });
    };

    const { form } = props;
    const { getFieldDecorator } = form;

    return (
      <Form layout="vertical">
        <Form.Item label="Table Name">
          {getFieldDecorator("tableName", {
            rules: [
              {
                required: true,
                message: "Please input the Table Name!"
              }
            ]
          })(<Input placeholder="new table name" />)}
        </Form.Item>
        <Form.Item label="Metric Type">
          {getFieldDecorator("type", { initialValue: "L2" })(
            <Select>
              {METRIC_TYPES.map(t => (
                <Option key={t} value={t}>
                  {t}
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
                max={20000}
                onChange={setDimension}
                value={typeof dimension === "number" ? dimension : 0}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                max={20000}
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
