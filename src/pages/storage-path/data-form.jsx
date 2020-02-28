import React, { useState, useContext, useEffect, useRef } from "react";
import { TextField, Button } from "@material-ui/core";
import { systemContext } from "../../context/system";
import { httpContext } from "../../context/http";
import { useTranslation } from "react-i18next";
import { clipboard } from "../../utils/helpers";
import { useFormStyles, useFormValidate } from "../../hooks/form";
import {
  FileCopyOutlined,
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined
} from "@material-ui/icons";
import { materialContext } from "../../context/material";

const defaultForm = {
  primary: "",
  secondary: []
};

const NetworkForm = function(props) {
  const { storageConfig } = useContext(systemContext);
  const { currentAddress, setMilvusConfig, restartNotify } = useContext(
    httpContext
  );
  const { openSnackBar } = useContext(materialContext);

  const [form, setForm] = useState({ ...defaultForm });
  const [error, setError] = useState({});

  const classes = useFormStyles();
  const { validateForm, handleCheck, handleChange } = useFormValidate(
    form,
    setForm,
    setError
  );

  const [editIndex, setEditIndex] = useState(null); // change secondaryValues array will cause input lose focus status. this will help to focus
  const primaryRef = useRef(null);
  const { t } = useTranslation();
  const dataTrans = t("storage").data;
  const buttonTrans = t("button");

  useEffect(() => {
    const currentConfig = storageConfig[currentAddress] || {};
    const secondaryPath = currentConfig.secondary_path;
    setForm({
      primary: currentConfig.primary_path || "",
      secondary: secondaryPath ? secondaryPath.split(",") : [""]
    });
  }, [storageConfig, currentAddress]);

  const handleSubmit = async e => {
    e.preventDefault();
    const isValid = validateForm();
    if (form.secondary.includes("")) {
      openSnackBar(t("storage").error.second, "warning");
      return;
    }
    if (!isValid) {
      return;
    }
    const res = await setMilvusConfig({
      storage_config: {
        primary_path: form.primary,
        secondary_path: form.secondary.join(",")
      }
    });
    if (res.code === 0) {
      openSnackBar(t("submitSuccess"));
      restartNotify();
    }
  };

  const handleCancel = () => {
    setForm({ ...defaultForm });
    setError({});
  };

  const handleAddPath = () => {
    setForm(v => ({
      ...v,
      secondary: [...v.secondary, ""]
    }));
  };
  const handleDeletePath = index => {
    setForm(v => {
      const copy = [...v.secondary];
      copy.splice(index, 1);
      return {
        ...v,
        secondary: copy
      };
    });
  };

  const handleSecondaryChange = (e, index) => {
    console.log(e.currentTarget.value, index);
    const value = e.currentTarget.value;
    setForm(v => {
      const copy = [...v.secondary];
      copy.splice(index, 1, value);
      return {
        ...v,
        secondary: copy
      };
    });
    setEditIndex(index);
  };
  const handleCopy = value => {
    clipboard(value, t("copySuccess"));
  };

  return (
    <form className={classes.formContainer}>
      <div className={classes.formItem}>
        <TextField
          name="primary"
          ref={primaryRef}
          label={dataTrans.primary}
          value={form.primary}
          onBlur={() => {
            handleCheck(form.primary, "primary");
          }}
          onChange={handleChange}
          className={classes.textField}
          placeholder={dataTrans.primary}
          error={error.primary}
          helperText={error.primary && `${dataTrans.primary}${t("required")}`}
        />
        <FileCopyOutlined
          type="copy"
          className={classes.icon}
          onClick={() => {
            handleCopy(primaryRef.current.state.value);
          }}
        />
      </div>
      <p className={classes.desc}>{dataTrans.primaryTip}</p>
      <div className={`${classes.formItem} ${classes["mt-4"]}`}>
        <ul className="secondary-path" style={{ marginBottom: 0 }}>
          {form.secondary.map((v, i) => (
            <li key={`${v}${i}`} className={`${classes.formItem}`}>
              <TextField
                name="secondary"
                autoFocus={editIndex === i}
                label={dataTrans.second}
                value={v || ""}
                onChange={val => {
                  handleSecondaryChange(val, i);
                }}
                className={classes.textField}
                placeholder={dataTrans.second}
                error={error.secondary}
                helperText={
                  error.secondary && `${dataTrans.second}${t("required")}`
                }
              />
              {i === 0 ? (
                <>
                  <FileCopyOutlined
                    className={classes.icon}
                    onClick={() => {
                      handleCopy(v);
                    }}
                  />
                  <AddCircleOutlineOutlined
                    className={classes.icon}
                    onClick={handleAddPath}
                  ></AddCircleOutlineOutlined>
                </>
              ) : (
                <>
                  <FileCopyOutlined
                    className={classes.icon}
                    onClick={() => {
                      handleCopy(v);
                    }}
                  />
                  <RemoveCircleOutlineOutlined
                    className={classes.icon}
                    onClick={() => {
                      handleDeletePath(i);
                    }}
                  ></RemoveCircleOutlineOutlined>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <p className={classes.desc}>{dataTrans.secondTip}</p>
      <div className={classes["mt-4"]} style={{ marginBottom: "30px" }}>
        <Button variant="outlined" onClick={handleCancel}>
          {buttonTrans.cancel}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes["ml-2"]}
          onClick={handleSubmit}
        >
          {buttonTrans.save}
        </Button>
      </div>
    </form>
  );
};

export default NetworkForm;
