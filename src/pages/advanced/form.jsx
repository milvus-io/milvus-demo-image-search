import React, { useEffect, useState } from "react";
import { Form, Switch, InputNumber, Button, message } from "antd";
import {
  getAdvancedConfig,
  updateAdvancedConfig,
  getSystemConfig
} from "@/http/configs";
import { useTranslation } from "react-i18next";
const AdvancedForm = Form.create({ name: "advanced-form" })(function(props) {
  const { form } = props;
  const { getFieldDecorator, resetFields, getFieldsValue } = form;
  const [defalutValue, setDefaultValue] = useState({});
  const [systemConfig, setSystemConfig] = useState({});

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const { t } = useTranslation();
  const advancedTrans = t("advanced");
  const buttonTrans = t("button");

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
      setLoading(true);
      try {
        const res = await updateAdvancedConfig(values);
        if (res.code === 0) {
          message.success(advancedTrans.saveSuccess);
          setDefaultValue(values);
          handleFormChange();
        }
      } finally {
        setLoading(false);
      }
    });
  };

  const handleCancel = async () => {
    resetFields();
    setDisabled(true);
  };

  const handleFormChange = async (changedVal, key) => {
    const regx = /^[0-9]*$/;
    requestAnimationFrame(() => {
      let values = getFieldsValue();
      const isSame = Object.keys(values).every(
        k => values[k] === defalutValue[k]
      );
      switch (key) {
        case "cpu_cache_capacity":
        case "use_blas_threshold":
        case "gpu_search_threshold":
          const isValid = regx.test(changedVal);
          setDisabled(!isValid || isSame);
          break;
        case "cache_insert_data":
          setDisabled(isSame);
          break;

        default:
          setDisabled(true);
          return;
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
        })(
          <InputNumber
            min={1}
            max={systemConfig.cpuMemory}
            onChange={val => {
              handleFormChange(val, "cpu_cache_capacity");
            }}
          />
        )}
        <span className="ml-10">{`(1~${systemConfig.cpuMemory || 1}GB)`}</span>
      </Form.Item>
      <p className="desc">{advancedTrans.capacityDesc1}</p>
      <p className="desc">{advancedTrans.capacityDesc2}</p>

      <Form.Item label={advancedTrans.insert}>
        {getFieldDecorator("cache_insert_data", {
          valuePropName: "checked",
          initialValue: defalutValue.cache_insert_data
        })(
          <Switch
            onChange={val => {
              handleFormChange(val, "cache_insert_data");
            }}
          />
        )}
      </Form.Item>
      <p className="desc">{advancedTrans.insertDesc1}</p>
      <p className="desc">{advancedTrans.insertDesc2}</p>

      <h1 className="title">{advancedTrans.enginSetting}</h1>

      <Form.Item label="Use Blas Threshold">
        {getFieldDecorator("use_blas_threshold", {
          initialValue: defalutValue.use_blas_threshold,
          rules: [{ required: true, message: "Use Blas Threshold is required" }]
        })(
          <InputNumber
            min={1}
            onChange={val => {
              handleFormChange(val, "use_blas_threshold");
            }}
          />
        )}
      </Form.Item>

      <Form.Item label="Gpu Search Threshold">
        {getFieldDecorator("gpu_search_threshold", {
          initialValue: defalutValue.gpu_search_threshold,
          rules: [
            { required: true, message: "Gpu Search Threshold is required" }
          ]
        })(
          <InputNumber
            min={1}
            onChange={val => {
              handleFormChange(val, "gpu_search_threshold");
            }}
          />
        )}
      </Form.Item>

      <Form.Item label=" " colon={false}>
        <Button className="disable-btn mr-10" onClick={handleCancel}>
          {buttonTrans.cancel}
        </Button>
        <Button
          className={disabled ? "disable-btn" : "primary-btn"}
          onClick={handleSubmit}
          loading={loading}
          disabled={disabled}
        >
          {buttonTrans.save}
        </Button>
      </Form.Item>
    </Form>
  );
});

export default AdvancedForm;
