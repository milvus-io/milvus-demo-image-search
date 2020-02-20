import React, { useEffect, useState, useContext, useMemo } from "react";
import { Form, Switch, InputNumber, Button, message } from "antd";
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";

const AdvancedForm = Form.create({ name: "advanced-form" })(function (props) {
  const { form } = props;
  const { systemInfos } = useContext(systemContext)
  const {
    getAdvancedConfig,
    updateAdvancedConfig,
    getHardwareType,
    currentAddress
  } = useContext(httpContext)
  const { getFieldDecorator, resetFields, getFieldsValue } = form;
  const [oldValue, setOldValue] = useState({});
  const [hardwareType, setHardwareType] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const { t } = useTranslation();
  const advancedTrans = t("advanced");
  const buttonTrans = t("button");

  const currentSystemInfo = useMemo(() => {
    return systemInfos[currentAddress]
  }, [systemInfos, currentAddress])

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
          setOldValue(values);
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
        k => values[k] === oldValue[k]
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
      const res = await Promise.all([
        getAdvancedConfig(),
        getHardwareType()
      ]);
      console.log(props.form)
      props.form.setFieldsValue(res[0] ? { ...res[0] } : {})
      setOldValue(res[0] || {});
      setHardwareType(res[1]);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAdvancedConfig, getHardwareType, currentAddress]);

  return (
    <Form {...formItemLayout} style={{ marginTop: "40px", maxWidth: "600px" }}>
      <h1 className="title">{advancedTrans.cacheSetting}</h1>
      <Form.Item label={`${advancedTrans.capacity} (GB)`}>
        {getFieldDecorator("cpu_cache_capacity", {
          rules: [
            {
              required: true,
              message: `${advancedTrans.capacity}${t("required")}`
            }
          ]
        })(
          <InputNumber
            min={1}
            max={currentSystemInfo.cpuMemory > 2 ? currentSystemInfo.cpuMemory - 1 : 1}
            onChange={val => {
              handleFormChange(val, "cpu_cache_capacity");
            }}
          />
        )}
        <span className="ml-10">{`[1, ${currentSystemInfo.cpuMemory ||
          1}) GB`}</span>
      </Form.Item>
      <p className="desc">{advancedTrans.capacityDesc1}</p>
      {/* <p className="desc">{advancedTrans.capacityDesc2}</p> */}

      <Form.Item label={advancedTrans.insert}>
        {getFieldDecorator("cache_insert_data", {
          valuePropName: "checked",
        })(
          <Switch
            onChange={val => {
              handleFormChange(val, "cache_insert_data");
            }}
          />
        )}
      </Form.Item>
      <p className="desc">{advancedTrans.insertDesc1}</p>
      {/* <p className="desc">{advancedTrans.insertDesc2}</p> */}

      <h1 className="title">{advancedTrans.enginSetting}</h1>

      <Form.Item label={advancedTrans.blasThreshold}>
        {getFieldDecorator("use_blas_threshold", {
          rules: [
            {
              required: true,
              message: `${advancedTrans.blasThreshold}${t("required")}`
            }
          ]
        })(
          <InputNumber
            min={1}
            onChange={val => {
              handleFormChange(val, "use_blas_threshold");
            }}
          />
        )}
      </Form.Item>
      <p className="desc">{advancedTrans.blasDesc}</p>

      {hardwareType === "GPU" && (
        <Form.Item label={advancedTrans.gpuThreshold}>
          {getFieldDecorator("gpu_search_threshold", {
            rules: [
              {
                required: true,
                message: `${advancedTrans.gpuThreshold}${t("required")}`
              }
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
      )}

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
