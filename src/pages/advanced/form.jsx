import React, { useEffect, useState } from "react";
import { Form, Input, Switch, InputNumber, Button, message } from "antd";
import {
  getAdvancedConfig,
  updateAdvancedConfig,
  getSystemConfig
} from "@/http/configs";
import { useTranslation } from "react-i18next";
const AdvancedForm = Form.create({ name: "advanced-form" })(function(props) {
  const { form } = props;
  const { getFieldDecorator } = form;
  const [defalutValue, setDefaultValue] = useState({});
  const [systemConfig, setSystemConfig] = useState({});
  const { t } = useTranslation();
  const advancedTrans = t("advanced");
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
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      const res = await updateAdvancedConfig(values);
      if (res.code === 0) {
        message.success(advancedTrans.saveSuccess);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await Promise.all([getAdvancedConfig(), getSystemConfig()]);
      setDefaultValue(res[0] || {});
      setSystemConfig(res[1] || {});
    };
    fetchData();
  }, []);

  return (
    <Form {...formItemLayout} style={{ marginTop: "40px", maxWidth: "600px" }}>
      <h1 className="title">{advancedTrans.cacheSetting}</h1>
      <Form.Item label={`${advancedTrans.capacity} (GB)`}>
        {getFieldDecorator("cpu_cache_capacity", {
          initialValue: defalutValue.cpu_cache_capacity,
          rules: [{ required: true, message: "CPU Cache Capacity is required" }]
        })(<InputNumber min={1} max={systemConfig.cpuMemory} />)}
      </Form.Item>
      <p className="desc">
        The size of the CPU memory for caching data for faster query. The sum of
        cpu_cache_capacity and insert_buffer_size (in "Section db_config) must
        be less than total CPU memory size.
      </p>

      <Form.Item label="Cache Insert Data">
        {getFieldDecorator("cache_insert_data", {
          valuePropName: "checked",
          initialValue: defalutValue.cache_insert_data
        })(<Switch />)}
      </Form.Item>
      <p className="desc">
        If set to true , the inserted data will be loaded into the cache
        immediately for hot query.<br></br> If you want simultaneous inserting
        and searching of vector, it is recommended to enable this function.
      </p>
      <h1 className="title">Engine Setting</h1>

      <Form.Item label="Use Blas Threshold">
        {getFieldDecorator("use_blas_threshold", {
          initialValue: defalutValue.use_blas_threshold,
          rules: [{ required: true, message: "Use Blas Threshold is required" }]
        })(<InputNumber min={1} max={4096} />)}
      </Form.Item>

      <Form.Item label="Gpu Search Threshold">
        {getFieldDecorator("gpu_search_threshold", {
          initialValue: defalutValue.gpu_search_threshold,
          rules: [
            { required: true, message: "Gpu Search Threshold is required" }
          ]
        })(<InputNumber min={0} max={10000} />)}
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
