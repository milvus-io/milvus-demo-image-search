import React, { useEffect, useState } from "react";
import { Form, Switch, InputNumber, Button, message } from "antd";
import {
  getHardwareConfig,
  updateHardwareConfig,
  getSystemConfig,
  getHardwareType
} from "@/http/configs";
import { useTranslation } from "react-i18next";
const AdvancedForm = Form.create({ name: "advanced-form" })(function(props) {
  const { form } = props;
  const { getFieldDecorator, resetFields, getFieldsValue } = form;
  const [defalutValue, setDefaultValue] = useState({});
  const [searchHardware, setSearchHardware] = useState([]);
  const [defaultSearch, setDefaultSearch] = useState([]);
  const [buildHardware, setBuildHardware] = useState([]);
  const [defaultBuild, setDefaultBuild] = useState([]);

  const [systemConfig, setSystemConfig] = useState({});
  const [enable, setEnable] = useState(false);
  const [hardwareType, setHardwareType] = useState("");

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const { t } = useTranslation();
  const hardwareTrans = t("hardware");
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
  const handleSearchSwitch = (checked, e) => {
    const { value } = e.target.dataset;
    const newSearch = checked
      ? [...searchHardware, value]
      : searchHardware.filter(v => v !== value);
    setSearchHardware(newSearch);
    setDisabled(checkSame());
  };

  const handleBuildSwitch = (checked, e) => {
    const { value } = e.target.dataset;
    const newBuild = checked
      ? [...buildHardware, value]
      : [...buildHardware.filter(v => v !== value)];
    setBuildHardware(newBuild);
  };
  const checkSame = () => {
    const values = getFieldsValue();
    const isSame = Object.keys(values).every(
      k => values[k] === defalutValue[k]
    );
    const isSearchSame =
      searchHardware.length === defaultSearch.length &&
      searchHardware.every(v => defaultSearch.includes(v));
    const isBuildSame =
      buildHardware.length === defaultBuild.length &&
      buildHardware.every(v => defaultBuild.includes(v));

    return isSame && isSearchSame && isBuildSame;
  };
  useEffect(() => {
    setDisabled(checkSame());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildHardware, searchHardware, defaultSearch, defaultBuild, defalutValue]);

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      if (!searchHardware.length) {
        message.error(hardwareTrans.searchAtLeastOne);
        return;
      }
      if (!buildHardware.length) {
        message.error(hardwareTrans.buildAtLeastOne);
        return;
      }
      setLoading(true);
      const data = {
        ...values,
        search_resources: [...searchHardware],
        build_index_resources: [...buildHardware]
      };
      try {
        const res = await updateHardwareConfig(data);
        if (res.code === 0) {
          message.success(hardwareTrans.saveSuccess);
          setDefaultValue(values);
          setDefaultBuild(buildHardware);
          setDefaultSearch(searchHardware);
        }
      } finally {
        setLoading(false);
      }
    });
  };

  const handleSwitch = val => {
    resetFields();

    if (val) {
      !searchHardware.length
        ? setSearchHardware([
            systemConfig.gpuList ? systemConfig.gpuList[0] : ""
          ])
        : setSearchHardware(defaultSearch);
      !buildHardware.length
        ? setBuildHardware([
            systemConfig.gpuList ? systemConfig.gpuList[0] : ""
          ])
        : setBuildHardware(defaultBuild);
    }

    setEnable(val);
    requestAnimationFrame(() => {
      setDisabled(checkSame());
    });
  };

  const handleNumberChange = val => {
    const regx = /^[0-9]*$/;
    if (!regx.test(val)) {
      setDisabled(true);
      return;
    }
    requestAnimationFrame(() => {
      setDisabled(checkSame());
    });
  };

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
    setDefaultBuild(buildVal || []);

    setSearchHardware(searchVal || []);
    setDefaultSearch(searchVal || []);

    setEnable(!!enable);
    setDefaultValue(res[0] || {});
    setSystemConfig(res[1] || {});
    setHardwareType(res[2]);
  };
  const handleCancel = () => {
    fetchData();
    resetFields();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return hardwareType === "CPU" ? (
    <div className="warning">{hardwareTrans.cpuVersion}</div>
  ) : (
    <Form {...formItemLayout} style={{ marginTop: "40px", maxWidth: "600px" }}>
      <Form.Item label={hardwareTrans.enable}>
        {getFieldDecorator("enable", {
          valuePropName: "checked",
          initialValue: defalutValue.enable
        })(<Switch onChange={handleSwitch}></Switch>)}
      </Form.Item>
      {enable ? (
        <>
          <Form.Item label={hardwareTrans.capacity}>
            {getFieldDecorator("cache_capacity", {
              initialValue: defalutValue.cache_capacity || 1,
              rules: [
                {
                  required: true,
                  message: `${hardwareTrans.capacity} ${t("required")}`
                }
              ]
            })(
              <InputNumber
                min={1}
                max={systemConfig.gpuMemory}
                onChange={handleNumberChange}
              />
            )}
            <span className="ml-10">{`[1 , ${systemConfig.gpuMemory} ] GB`}</span>
          </Form.Item>

          <Form.Item label={hardwareTrans.search}>
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

          <Form.Item label={hardwareTrans.index}>
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
