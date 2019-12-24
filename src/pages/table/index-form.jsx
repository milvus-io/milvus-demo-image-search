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
import { createIndex } from "@/http/table";

const { Option } = Select;
const INDEX_TYPES = ["FLAT","IVFFLAT","IVFSQ8","IVFSQ8H"];

const TableForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  function(props) {
    const [nlist, setNlist] = useState(16384);
    const { tableName } = props;
    const handleSubmit = e => {
      e.preventDefault();
      props.form.validateFields(async (err, values) => {
        if (err) {
          return;
        }
        const params = {
          ...values,
          nlist
        };
        const res = await createIndex(tableName, params);
        console.log(params, res);
      });
    };

    const { form } = props;
    const { getFieldDecorator } = form;

    return (
      <Form layout="vertical">
        <Form.Item label="Index Type">
          {getFieldDecorator("type", { initialValue: "FLAT" })(
            <Select>
              {INDEX_TYPES.map(t => (
                <Option key={t} value={t}>
                  {t}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="nlist">
          <Row>
            <Col span={16}>
              <Slider
                min={1}
                max={20000}
                onChange={setNlist}
                value={typeof nlist === "number" ? nlist : 0}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                max={20000}
                style={{ marginLeft: 16 }}
                value={nlist}
                onChange={setNlist}
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
