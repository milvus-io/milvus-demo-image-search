import React, { useEffect, useState } from "react";
import { Form, Input, Switch, InputNumber, Button, message } from "antd";
import { getConfigs, updateConfigs } from "@/http/advanced";

const AdvancedForm = Form.create({ name: "advanced-form" })(function(props) {
  const { form } = props;
  const { getFieldDecorator } = form;
  const [defalutValue, setDefaultValue] = useState({});
  const [searchHardware, setSearchHardware] = useState([]);
  const [buildHardware, setBuildHardware] = useState([]);

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
  const HARDWARES = ["GPU", "CPU"];
  const handleSearchSwitch = (checked, e) => {
    const { value } = e.target.dataset;
    checked
      ? setSearchHardware([...searchHardware, value])
      : setSearchHardware(searchHardware.filter(v => v !== value));
  };

  const handleBuildSwitch = (checked, e) => {
    const { value } = e.target.dataset;
    checked
      ? setBuildHardware([...buildHardware, value])
      : setBuildHardware([...buildHardware.filter(v => v !== value)]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      const data = {
        ...values,
        search_resources: [...searchHardware],
        build_index_resources: [...buildHardware]
      };
      console.log(data);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getConfigs();
      setDefaultValue(res || {});
    };
    fetchData();
  }, []);

  return (
    <Form {...formItemLayout} style={{ marginTop: "40px", maxWidth: "600px" }}>
      <Form.Item label="Enable GPU">
        {getFieldDecorator("enable", {
          valuePropName: "checked",
          initialValue: false
        })(<Switch></Switch>)}
      </Form.Item>

      <Form.Item label="GPU Cache Capacity (GB)">
        {getFieldDecorator("gpu_cache_capacity", {
          initialValue: defalutValue.cpu_cache_capacity,
          rules: [{ required: true, message: "CPU Cache Capacity is required" }]
        })(<InputNumber min={1} max={4096} />)}
      </Form.Item>

      <Form.Item label="Enabled For Searching">
        <ol>
          {HARDWARES.map((v, index) => (
            <li key={index}>
              <Switch
                checked={searchHardware.includes(v)}
                data-value={v}
                onChange={handleSearchSwitch}
              />
              <span className="txt">{v}</span>
            </li>
          ))}
        </ol>
      </Form.Item>

      <Form.Item label="Enabled For Building Index">
        <ol>
          {HARDWARES.map((v, index) => (
            <li key={index}>
              <Switch
                checked={buildHardware.includes(v)}
                data-value={v}
                onChange={handleBuildSwitch}
              />
              <span className="txt">{v}</span>
            </li>
          ))}
        </ol>
      </Form.Item>

      <Form.Item label=" " colon={false}>
        <Button className="disable-btn mr-10" onClick={props.handleCancel}>
          Cancel
        </Button>
        <Button className="primary-btn" onClick={handleSubmit}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
});

export default AdvancedForm;
