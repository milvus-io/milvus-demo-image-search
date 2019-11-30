import React, { useState, useMemo } from "react";
import Logo from "assets/imgs/logo.svg";
import { Button, Form, Input, Select, Switch } from "antd";
import TimeZone from "../timezone";
import "./Install.scss";

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const DATA_TYPES = ["MySQL", "SQLite"];
const HARDWARES = ["GPU", "CPU"];
const Install = () => {
  const [current, setCurrent] = useState(1);
  const [form, setForm] = useState({
    address: "",
    port: "",
    timezone: "China Standard Time",
    path: "",
    dbType: "MySql",
    dbHost: "",
    dbUsername: "",
    dbPassword: "",
    dbPort: "",
    hardware: [],
    indexHardware: []
  });
  const timezones = TimeZone.filter(v => !v.isdst);
  const Label = labelProps => {
    return <div style={{ color: "#fff" }}>{labelProps.name}</div>;
  };

  const calculateUrl = form => {
    const { dbType, dbHost, dbUsername, dbPassword, dbPort } = form;
    return `${dbType}://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/database.`;
  };
  const backendUrl = useMemo(() => calculateUrl(form), [form]);
  const handleBack = () => {
    setCurrent(current - 1);
  };
  const handleNext = () => {
    setCurrent(current + 1);
  };
  const handleInputChange = (e, key) => {
    setForm({
      ...form,
      [key]: e.target.value
    });
  };
  const handleSelectChange = (value, key) => {
    setForm({
      ...form,
      [key]: value
    });
  };
  const handleSwitch = (checked, e) => {
    const { key, value } = e.target.dataset;
    let formValue = [...form[key]];

    if (checked) {
      setForm({
        ...form,
        [key]: [...formValue, value]
      });
    } else {
      formValue = formValue.filter(v => v !== value);
      setForm({
        ...form,
        [key]: [...formValue]
      });
    }
  };
  const handleConfirm = () => {
    console.log("confirm");
  };
  const generageClass = index =>
    current === index ? "active" : current > index ? "dark" : "";

  return (
    <div className="install-wrapper">
      <div className="step-wrapper">
        <div className="logo-wrapper">
          <img src={Logo} alt="Milvus Logo"></img>
          <span>Installation Wilzard</span>
        </div>
        <ul className="steps">
          <li className={generageClass(1)}>Set up network access</li>
          <li className={generageClass(2)}>Set up data storage path</li>
          <li className={generageClass(3)}>Set up meta data storage</li>
          <li className={generageClass(4)}>Choose hardware resource</li>
          <li className={generageClass(5)}>Confirm</li>
        </ul>
      </div>
      <div className="form-wrapper">
        {current === 1 && (
          <section className="network">
            <Form layout="vertical" style={{ width: "400px" }}>
              <FormItem label={<Label name="Listening Address"></Label>}>
                <Input
                  placeholder="0.0.0.0"
                  className="input"
                  value={form.address}
                  onChange={e => handleInputChange(e, "address")}
                ></Input>
              </FormItem>
              <FormItem label={<Label name="Listening Port"></Label>}>
                <Input
                  placeholder=""
                  value={form.port}
                  onChange={e => handleInputChange(e, "port")}
                ></Input>
              </FormItem>
              <FormItem label={<Label name="Time Zone"></Label>}>
                <Select
                  showSearch
                  placeholder="Select a "
                  optionFilterProp="children"
                  onChange={value => handleSelectChange(value, "timezone")}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  defaultValue={form.timezone}
                >
                  {timezones.map(t => (
                    <Option key={t.text} value={t.value}>
                      {t.text}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Form>
          </section>
        )}
        {current === 2 && (
          <section className="primary-path">
            <h2>Primary Path</h2>
            <p>
              Primary directory used for both the vector data files you want to
              import, and the metadata.
            </p>
            <p>Make sure the space left is enough.</p>
            <TextArea
              rows={10}
              value={form.path}
              onChange={e => handleInputChange(e, "path")}
            />
          </section>
        )}
        {current === 3 && (
          <section className="data-storage">
            <h2>Meta Data Storage</h2>
            <p>
              URL for metadata storage. Use SQLite (for single server Milvus) or
              MySQL (for distributed cluster) to store the metadata.
            </p>
            <p>
              The format of db_backend_url is:
              dialect://username:password@host:port/database. (dialect can be
              either mysql or sqlite, depending on which database you use.)
            </p>
            <Form layout="vertical" style={{ width: "400px" }}>
              <FormItem label={<Label name="Type"></Label>}>
                <Select
                  defaultValue={form.dbType}
                  onChange={value => handleSelectChange(value, "dbType")}
                >
                  {DATA_TYPES.map(t => (
                    <Option key={t} value={t}>
                      {t}
                    </Option>
                  ))}
                </Select>
              </FormItem>
              <FormItem label={<Label name="Host"></Label>}>
                <Input
                  placeholder=""
                  value={form.dbHost}
                  onChange={e => handleInputChange(e, "dbHost")}
                ></Input>
              </FormItem>
              <FormItem label={<Label name="Username"></Label>}>
                <Input
                  placeholder=""
                  value={form.dbUsername}
                  onChange={e => handleInputChange(e, "dbUsername")}
                ></Input>
              </FormItem>
              <FormItem label={<Label name="Password"></Label>}>
                <Input
                  placeholder=""
                  value={form.dbPassword}
                  onChange={e => handleInputChange(e, "dbPassword")}
                ></Input>
              </FormItem>
              <FormItem label={<Label name="Port"></Label>}>
                <Input
                  placeholder=""
                  value={form.dbPort}
                  onChange={e => handleInputChange(e, "dbPort")}
                ></Input>
              </FormItem>
            </Form>
          </section>
        )}
        {current === 4 && (
          <section className="hardware">
            <div className="search">
              <h2>Enabled for Searching</h2>
              <ol>
                {HARDWARES.map((v, index) => (
                  <li key={index}>
                    <Switch
                      checked={form.hardware.includes(v)}
                      data-value={v}
                      data-key="hardware"
                      onChange={handleSwitch}
                    />
                    <span>{v}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2>Enabled For Building Index</h2>
              <ol>
                {HARDWARES.map((v, index) => (
                  <li key={index}>
                    <Switch
                      checked={form.indexHardware.includes(v)}
                      data-value={v}
                      data-key="indexHardware"
                      onChange={handleSwitch}
                    />
                    <span>{v}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}
        {current === 5 && (
          <section className="confirm">
            <h3>Listening</h3>
            <p>{`${form.address}/${form.port}`}</p>
            <h3>Time Zone</h3>
            <p>{form.timezone}</p>
            <h3>Data Storage Path</h3>
            <p>{form.path}</p>
            <h3>Meta Data Storage</h3>
            <p>{backendUrl}</p>
            <h3>Hardware Resource</h3>
            <p>{form.hardware.join(", ")}</p>
            <h3>Build Index Hardware</h3>
            <p>{form.indexHardware.join(", ")}</p>
          </section>
        )}
        <section className="btn-wrapper">
          <Button
            className="primary-btn"
            style={{ background: "black" }}
            onClick={handleBack}
          >
            BACK
          </Button>
          <Button
            className="primary-btn"
            onClick={current === 5 ? handleConfirm : handleNext}
          >
            {current === 5 ? "CONFIRM" : "NEXT"}
          </Button>
        </section>
      </div>
    </div>
  );
};

export default Install;
