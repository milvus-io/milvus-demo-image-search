import React, {
  useState,
  useContext,
  useEffect,
  useMemo
} from "react";
import { materialContext } from '../../context/material'
import { systemContext } from "../../context/system";
import { httpContext } from "../../context/http";
import { useTranslation } from "react-i18next";
import { useFormStyles, useFormValidate } from "../../hooks/form";
import {
  FileCopyOutlined,
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined
} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import Form from '../../components/form/Form'

const defaultForm = {
  primary: "",
  secondary: []
};

const DataForm = function (props) {
  const { storageConfig } = useContext(systemContext);
  const { currentAddress, setMilvusConfig } = useContext(
    httpContext
  );
  const { openSnackBar } = useContext(materialContext);
  const [isFormChange, setIsformChange] = useState(false)
  const [form, setForm] = useState({ ...defaultForm });

  const classes = useFormStyles();
  const { handleChange } = useFormValidate(
    form,
    setForm
  );

  const [editIndex, setEditIndex] = useState(null); // change secondaryValues array will cause input lose focus status. this will help to focus
  const { t } = useTranslation();
  const dataTrans = t("storage").data;


  const handleSubmit = async e => {
    e.preventDefault();
    if (form.secondary.includes("")) {
      openSnackBar(t("storage").error.second, "warning");
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
      setIsformChange(false);
      // restartNotify();
    }
  };

  const handleCancel = () => {
    const currentConfig = storageConfig[currentAddress] || {};
    const secondaryPath = currentConfig.secondary_path;
    setForm({
      primary: currentConfig.primary_path || "",
      secondary: secondaryPath ? secondaryPath.split(",") : [""]
    });
    setIsformChange(false)
  };

  const handleAddPath = () => {
    setIsformChange(true)
    setForm(v => ({
      ...v,
      secondary: [...v.secondary, ""]
    }));
  };
  const handleDeletePath = index => {
    setIsformChange(true)
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
    const value = e.currentTarget.value;
    setIsformChange(true)
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
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', value);
    input.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
      openSnackBar('copySuccess')
    }
    document.body.removeChild(input);
  }

  useEffect(() => {
    handleCancel()
    //eslint-disable-next-line
  }, [storageConfig, currentAddress]);
  const primaryConfig = [
    {
      type: "textField",
      name: "primary",
      label: dataTrans.primary,
      value: form.primary || "",
      className: classes.part,
      sm: 12,
      inline: true,
      inlineWidth: "30%",
      fullWidth: true,
      onChange: handleChange,
      placeholder: dataTrans.primary,
    },
    {
      type: "other",
      name: "primary-copy",
      inlineWidth: "50%",
      inline: true,
      component: () => (
        <FileCopyOutlined
          type="copy"
          className={classes.icon}
          onClick={(e) => handleCopy(form.primary)}
        />
      )
    },
    {
      type: "other",
      name: "primary-desc",
      sm: 12,
      component: () => (
        <Typography variant="caption" component="p" style={{ marginBottom: "32px" }}>
          {dataTrans.primaryTip}
        </Typography>
      )
    }

  ]
  const secondaryConfig = useMemo(() => {
    let config = []
    form.secondary.forEach((v, i) => {
      const inputConfig = {
        type: "textField",
        sm: 12,
        inline: true,
        inlineWidth: "30%",
        fullWidth: true,
        className: classes.part,
        name: "secondary",
        autoFocus: editIndex === i,
        label: dataTrans.second,
        value: v || "",
        onChange: val => {
          handleSecondaryChange(val, i);
        },
        placeholder: dataTrans.second
      }
      config.push(inputConfig)
      config.push({
        type: "other",
        inlineWidth: "50%",
        inline: true,
        name: `secondary-copy-${i}`,
        component: () => (
          <>
            <FileCopyOutlined
              className={classes.icon}
              onClick={() => {
                handleCopy(v);
              }}
            />
            {
              i === 0
                ? <AddCircleOutlineOutlined
                  className={classes.icon}
                  onClick={handleAddPath}
                ></AddCircleOutlineOutlined>
                : <RemoveCircleOutlineOutlined
                  className={classes.icon}
                  onClick={() => {
                    handleDeletePath(i);
                  }}
                ></RemoveCircleOutlineOutlined>
            }
          </>
        )
      })
    })
    return config

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.secondary, editIndex])
  const secondaryDesc = {
    type: 'other',
    name: "secondary-desc",
    sm: 12,
    component: () => (
      <Typography variant="caption" component="p" style={{ marginBottom: "32px" }}>
        {dataTrans.secondTip}
      </Typography>
    )
  }

  return (
    <div className={classes.root}>
      <Form
        config={[...primaryConfig, ...secondaryConfig, secondaryDesc]}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        isFormChange={isFormChange}
      ></Form>

    </div>
  );
};

export default DataForm;
