import React, { useEffect, useState } from "react";
import { Form, Input, Switch, InputNumber, message } from "antd";
const AdvancedForm = Form.create({ name: "advanced-form" })(function(props) {
  const { form } = props;
  const { getFieldDecorator } = form;
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

  return (
    <Form {...formItemLayout} style={{ marginTop: "40px", maxWidth: "600px" }}>
      <h1 className="title">Caches Setting</h1>
      <Form.Item label="CPU Cache Capacity">
        {getFieldDecorator("cpu_cache_capacity", {
          initialValue: 1000,
          rules: [{ required: true }]
        })(<Input min={1} max={4096} />)}
      </Form.Item>
      <p className="desc">
        The size of the CPU memory for caching data for faster query. The sum of
        cpu_cache_capacity and insert_buffer_size (in "Section db_config) must
        be less than total CPU memory size.
      </p>
      <Form.Item label="Cache Insert Data">
        {getFieldDecorator("cache_insert_data", {
          initialValue: false
        })(<Switch></Switch>)}
      </Form.Item>
      <p className="desc">
        If set to true , the inserted data will be loaded into the cache
        immediately for hot query.<br></br> If you want simultaneous inserting
        and searching of vector, it is recommended to enable this function.
      </p>
      <h1 className="title">Engine Setting</h1>
      <Form.Item label="Use Blas Threshold">
        {getFieldDecorator("use_blas_threshold", {
          initialValue: 20,
          rules: [{ required: true, message: "Use Blas Threshold is required" }]
        })(<InputNumber min={1} max={4096} />)}
      </Form.Item>
      <Form.Item label="Gpu Search Threshold">
        {getFieldDecorator("gpu_search_threshold", {
          initialValue: 1000,
          rules: [
            { required: true, message: "Gpu Search Threshold is required" }
          ]
        })(<InputNumber min={0} max={10000} />)}
      </Form.Item>
    </Form>
  );
});

export default AdvancedForm;
