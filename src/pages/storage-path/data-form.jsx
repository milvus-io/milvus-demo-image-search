import React, { useState, useContext, useMemo, useEffect } from "react";
import { Form, Input, Button, Switch, message, Icon } from "antd";
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import { clipboard } from '../../utils/helpers'

const NetworkForm = Form.create({ name: "advanced-form" })(function (props) {
  const { form } = props;
  const { storageConfig } = useContext(systemContext)
  const {
    currentAddress,
    setMilvusConfig,
    restartNotify
  } = useContext(httpContext)
  const { getFieldDecorator, resetFields } = form;
  const [loading, setLoading] = useState(false);
  const [secondaryValues, setSecondaryValues] = useState([])
  const [editIndex, setEditIndex] = useState(null) // change secondaryValues array will cause input lose focus status. this will help to focus
  const { t } = useTranslation();
  const dataTrans = t("storage").data;
  const buttonTrans = t("button");

  const { primary_path: primaryPath, secondary_path: secondaryPath = "" } = useMemo(() => {
    return storageConfig[currentAddress] || {}
  }, [currentAddress, storageConfig])

  useEffect(() => {
    setSecondaryValues(secondaryPath ? secondaryPath.split(',') : [""])
  }, [secondaryPath])

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
      if (secondaryValues.includes("")) {
        message.warning(t("storage").error.second)
        return
      }
      setLoading(true);
      try {
        const res = await setMilvusConfig({
          storage_config: {
            ...values,
            secondary_path: secondaryValues.join(',')
          }
        })
        if (res.code === 0) {
          message.success(t("submitSuccess"));
          restartNotify()
        }
      } finally {
        setLoading(false);
      }
    });
  };

  const handleCancel = () => {
    resetFields();
  };

  const handleAddPath = () => {
    setSecondaryValues(v => [...v, ''])
  }
  const handleDeletePath = (index) => {
    setSecondaryValues(v => {
      const copy = [...v]
      copy.splice(index, 1)
      return copy
    })
  }



  const handleSecondaryChange = (e, index) => {
    console.log(e.currentTarget.value, index)
    const value = e.currentTarget.value
    setSecondaryValues(v => {
      const copy = [...v]
      copy.splice(index, 1, value)
      return copy
    })
    setEditIndex(index)
  }
  const handleCopy = value => {
    clipboard(value, t("copySuccess"))
  }


  return (
    <Form {...formItemLayout} style={{ marginTop: "40px", maxWidth: "600px" }}>

      <Form.Item label={dataTrans.primary}>
        {getFieldDecorator("primary_path", {
          initialValue: primaryPath
        })(
          <Input placeholder={dataTrans.primary}></Input>
        )}
      </Form.Item>
      <p className="desc">{dataTrans.primaryTip}</p>

      <Form.Item label={dataTrans.second}>
        <ul className="secondary-path">
          {
            secondaryValues.map((v, i) => (
              <li key={`${v}${i}`}>
                <Input placeholder={dataTrans.second} autoFocus={editIndex === i} value={v} onChange={(val) => { handleSecondaryChange(val, i) }}></Input>
                {i === 0
                  ? (<>
                    <Icon type="copy" className="copy" onClick={() => { handleCopy(v) }} />
                    <Icon type="plus-circle" className="add" onClick={handleAddPath}></Icon>
                  </>)
                  : (
                    <>
                      <Icon type="copy" className="copy" onClick={() => { handleCopy(v) }} />
                      <Icon type="minus-circle" className="add" onClick={() => { handleDeletePath(i) }}></Icon>
                    </>
                  )}
              </li>
            ))
          }
        </ul>
      </Form.Item>
      <p className="desc">{dataTrans.secondTip}</p>

      <Form.Item label=" " colon={false}>
        <Button className="disable-btn mr-10" onClick={handleCancel}>
          {buttonTrans.cancel}
        </Button>
        <Button
          className={"primary-btn"}
          onClick={handleSubmit}
          loading={loading}
        >
          {buttonTrans.save}
        </Button>
      </Form.Item>
    </Form>
  );
});

export default NetworkForm;
