import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  Fragment
} from "react";
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
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { materialContext } from "../../context/material";
import { FormTextField } from "../../components/common/FormTextComponents";
import FormActions from "../../components/common/FormActions";

const defaultForm = {
  primary: "",
  secondary: []
};

const DataForm = function (props) {
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
    <div className={classes.root}>
      <Grid container alignItems="flex-end" className={classes.part}>
        <FormTextField
          name="primary"
          marginBottom={false}
          ref={primaryRef}
          label={dataTrans.primary}
          value={form.primary}
          onBlur={() => {
            handleCheck(form.primary, "primary");
          }}
          onChange={handleChange}
          placeholder={dataTrans.primary}
          error={error.primary}
          helperText={error.primary && `${dataTrans.primary}${t("required")}`}
        />
        <Grid item sm={3}>
          <FileCopyOutlined
            type="copy"
            className={classes.icon}
            onClick={() => {
              handleCopy(primaryRef.current.state.value);
            }}
          />
        </Grid>
        <Grid item sm={12}>
          <Typography variant="caption" component="p">
            {dataTrans.primaryTip}
          </Typography>
        </Grid>
      </Grid>

      {form.secondary.map((v, i) => (
        <Grid container alignItems="flex-end" key={i}>
          <FormTextField
            marginBottom={false}
            name="secondary"
            autoFocus={editIndex === i}
            label={dataTrans.second}
            value={v || ""}
            onChange={val => {
              handleSecondaryChange(val, i);
            }}
            placeholder={dataTrans.second}
            error={error.secondary}
            helperText={
              error.secondary && `${dataTrans.second}${t("required")}`
            }
          />
          {i === 0 ? (
            <Grid item sm={3}>
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
            </Grid>
          ) : (
              <Grid item sm={3}>
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
              </Grid>
            )}
          <Grid item sm={12}>
            <Typography variant="caption" component="p">
              {dataTrans.secondTip}
            </Typography>
          </Grid>
        </Grid>
      ))}

      <FormActions save={handleSubmit} cancel={handleCancel} />
    </div>
  );
};

export default DataForm;
