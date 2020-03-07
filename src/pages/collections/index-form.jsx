import React, { useState, useEffect, useContext } from "react";
import { Form, Select, Button, Row, Col, Slider, InputNumber } from "antd";
import { useTranslation } from "react-i18next";
import { httpContext } from '../../context/http'

const { Option } = Select;
const INDEX_TYPES = ["FLAT", "IVFFLAT", "IVFSQ8", "IVFSQ8H", "IVFPQ"];

const TableForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  function (props) {
    const { createIndex } = useContext(httpContext)
    const { t } = useTranslation();
    const indexTrans = t("index");
    const buttonTrans = t("button");
    const [nlist, setNlist] = useState(16384);
    const [loading, setLoading] = useState(false);

    const { collection_name: tableName, index: type, nlist: defaultNlist } =
      props.record || {};
    const { getFieldDecorator, resetFields } = props.form;
    const handleSubmit = e => {
      e.preventDefault();
      props.form.validateFields(async (err, values) => {
        if (err) {
          return;
        }
        setLoading(true);

        const params = {
          ...values,
          nlist
        };
        try {
          const res = await createIndex(tableName, params);
          if (res.code === 0) {
            props.saveSuccess(indexTrans.saveSuccess);
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

    useEffect(() => {
      setNlist(defaultNlist);
    }, [defaultNlist]);

    return (
      <Form layout="vertical">
        <Form.Item label="Index Type">
          {getFieldDecorator("index_type", { initialValue: type })(
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
          <Button className=" mr-10" onClick={handleCancel}>
            {buttonTrans.cancel}
          </Button>
          <Button
            onClick={handleSubmit}
            loading={loading}
            type="primary"
          >
            {buttonTrans.update}
          </Button>
        </div>
      </Form>
    );
  }
);

export default TableForm;
