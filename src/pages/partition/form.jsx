import React, { useState, useContext } from "react";
import {
  Form,
  Input,
  Button,
} from "antd";
import { httpContext } from '../../context/http'
import { useTranslation } from "react-i18next";


const TableForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  function (props) {
    const { createPartition } = useContext(httpContext)
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const partitionTrans = t("partition");
    const buttonTrans = t("button");
    const { form, tableName } = props;
    const { getFieldDecorator, resetFields } = form;
    const handleSubmit = async e => {
      e.preventDefault();

      props.form.validateFields(async (err, values) => {
        if (err) {
          return;
        }
        console.log(values)
        setLoading(true);

        const data = {
          ...values
        };
        try {
          const res = await createPartition(tableName, data);
          if (res.code === 0) {
            props.saveSuccess(partitionTrans.saveSuccess, data.collection_name);
            resetFields();
          }
        } finally {
          setLoading(false);
        }
      });
    };

    const handleCancel = e => {
      resetFields();
      props.handleCancel();
    };

    return (
      <Form layout="vertical">
        {/* <Form.Item
          label={partitionTrans.tableName}
        >
          {getFieldDecorator("collection_name", {
            rules: [
              {
                required: true,
                message: `${partitionTrans.tableName}${t('required')}`
              }
            ]
          })(<Input placeholder={partitionTrans.tableName} />)}
        </Form.Item> */}
        <Form.Item
          label={partitionTrans.name}
        >
          {getFieldDecorator("partition_name", {
            rules: [
              {
                required: true,
                message: `${partitionTrans.name}${t('required')}`
              }
            ]
          })(<Input placeholder={partitionTrans.create} />)}
        </Form.Item>

        <Form.Item
          label={partitionTrans.tag}
        >
          {getFieldDecorator("partition_tag", {
            rules: [
              {
                required: true,
                message: `${partitionTrans.tag}${t('required')}`
              }
            ]
          })(<Input placeholder={partitionTrans.tag} />)}
        </Form.Item>

        <div>
          <Button className=" mr-10" onClick={handleCancel}>
            {buttonTrans.cancel}
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
          >
            {buttonTrans.save}
          </Button>
        </div>
      </Form>
    );
  }
);

export default TableForm;
