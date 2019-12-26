import React, { useEffect, useState } from "react";
import { Form, Input, Switch, InputNumber, Button, message } from "antd";
import {
  getHardwareConfig,
  updateHardwareConfig,
  getSystemConfig,
  getHardwareType
} from "@/http/configs";
import { useTranslation } from "react-i18next";
const AdvancedForm = Form.create({ name: "advanced-form" })(function(props) {
  const { form } = props;
  const { getFieldDecorator } = form;
  const [defalutValue, setDefaultValue] = useState({});
  const [searchHardware, setSearchHardware] = useState([]);
  const [buildHardware, setBuildHardware] = useState([]);
  const [systemConfig, setSystemConfig] = useState({});
  const [enable, setEnable] = useState(false);
  const [hardwareType, setHardwareType] = useState("CPU");

  const { t } = useTranslation();
  const hardwareTrans = t("hardware");
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
      const res = await updateHardwareConfig(data);
      if (res.code === 0) {
        message.success(hardwareTrans.saveSuccess);
      }
    });
  };
  const handleSwitch = val => {
    setEnable(val);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await Promise.all([
        getHardwareConfig(),
        getSystemConfig(),
        getHardwareType()
      ]);
      const {
        build_index_resources: buildVal,
        search_resources: searchVal,
        enable
      } = res[0] || {};

      setBuildHardware(buildVal || []);
      setSearchHardware(searchVal || []);
      setEnable(!!enable);
      setDefaultValue(res[0] || {});
      setSystemConfig(res[1] || {});
      setHardwareType(res[2]);
    };
    fetchData();
  }, []);

  return hardwareType === "CPU" ? (
    <div className="warning">
      Sorry, Your milvus version is only allowed CPU.
    </div>
  ) : (
    <Form {...formItemLayout} style={{ marginTop: "40px", maxWidth: "600px" }}>
      <Form.Item label="Enable GPU">
        {getFieldDecorator("enable", {
          valuePropName: "checked",
          initialValue: defalutValue.enable
        })(<Switch onChange={handleSwitch}></Switch>)}
      </Form.Item>
      {enable ? (
        <>
          <Form.Item label="GPU Cache Capacity (GB)">
            {getFieldDecorator("cache_capacity", {
              initialValue: defalutValue.cache_capacity || 1,
              rules: [
                { required: true, message: "GPU Cache Capacity is required" }
              ]
            })(<InputNumber min={1} max={systemConfig.gpuMemory} />)}
          </Form.Item>

          <Form.Item label="Enabled For Searching">
            <ol>
              {systemConfig.gpuList &&
                systemConfig.gpuList.map((v, index) => (
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
              {systemConfig.gpuList &&
                systemConfig.gpuList.map((v, index) => (
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
        </>
      ) : null}

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
