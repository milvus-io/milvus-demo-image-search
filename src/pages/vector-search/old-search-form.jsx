import React, { useState, useContext } from "react";
// import { Form, Input, Button, InputNumber } from "antd";
// import { useTranslation } from "react-i18next";
// import WithTip from "components/with-tip";
// import { httpContext } from '../../context/http'

// const { TextArea } = Input;

// const TableForm = Form.create({ name: "form_in_modal" })(
//   // eslint-disable-next-line
//   function (props) {
//     const [loading, setLoading] = useState(false);
//     const { searchVectors } = useContext(httpContext)
//     const { formInit = {}, setFormInit } = props
//     const { t } = useTranslation();
//     const vectorTrans = t("vector");
//     const buttonTrans = t("button");
//     const tipsTrans = vectorTrans.tips;
//     const { form } = props;
//     const { getFieldDecorator, resetFields, setFieldsValue } = form;
//     const handleSubmit = async e => {
//       e.preventDefault();
//       props.form.validateFields(async (err, values) => {
//         if (err) {
//           return;
//         }
//         setLoading(true);

//         try {
//           const regx = /[^(0-9|,|.)]/g;
//           const newRecords = values.records
//             .replace(regx, "")
//             .split(",")
//             .filter(v => v || v === 0)
//             .map(v => Number(v));

//           setFieldsValue({
//             records: JSON.stringify(newRecords)
//           });
//           const res = await searchVectors({
//             ...values,
//             records: [newRecords]
//           });
//           setFormInit({
//             ...values,
//             records: JSON.stringify(newRecords)
//           })
//           props.searchSuccess(res.results[0] || []);
//         } catch (e) {
//           throw e;
//         } finally {
//           setLoading(false);
//         }
//       });
//     };

//     const handleCancel = e => {
//       resetFields();
//       props.handleCancel();
//     };


//     return (
//       <Form
//         colon={false}
//         className={`search-wrapper ${props.showSearch ? "" : "hide"}`}
//         layout="vertical"
//         style={{ maxWidth: "400px" }}
//       >
//         <Form.Item label={vectorTrans.tName}>
//           {getFieldDecorator("tableName", {
//             initialValue: formInit.tableName || "",
//             rules: [
//               {
//                 required: true,
//                 message: `${vectorTrans.tName} ${t("required")}`
//               }
//             ]
//           })(<Input placeholder={vectorTrans.tName} />)}
//         </Form.Item>
//         <Form.Item
//           colon={false}
//           label={
//             <WithTip text={tipsTrans.tTop} label={vectorTrans.tTop}></WithTip>
//           }
//         >
//           {getFieldDecorator("topk", {
//             initialValue: formInit.topk || 2,
//             rules: [
//               {
//                 required: true,
//                 message: `${vectorTrans.tTop} ${t("required")}`
//               }
//             ]
//           })(<InputNumber placeholder={tipsTrans.tTop} min={1} max={2048} />)}
//         </Form.Item>
//         <Form.Item
//           colon={false}
//           label={
//             <WithTip
//               text={tipsTrans.tNprobe}
//               label={vectorTrans.tNprobe}
//             ></WithTip>
//           }
//         >
//           {getFieldDecorator("nprobe", {
//             initialValue: formInit.nprobe || 16,
//             rules: [
//               {
//                 required: true,
//                 message: `${vectorTrans.tNprobe} ${t("required")}`
//               }
//             ]
//           })(<InputNumber min={1} placeholder={tipsTrans.tNprobe} />)}
//         </Form.Item>
//         <Form.Item
//           colon={false}
//           label={
//             <WithTip
//               text={tipsTrans.tQuery}
//               label={vectorTrans.tQuery}
//             ></WithTip>
//           }
//         >
//           {getFieldDecorator("records", {
//             initialValue: formInit.records || "",
//             rules: [
//               {
//                 required: true,
//                 message: `${vectorTrans.tQuery} ${t("required")}`
//               }
//             ]
//           })(
//             <TextArea
//               placeholder={tipsTrans.tQuery}
//               autoSize={{ minRows: 4 }}
//             ></TextArea>
//           )}
//         </Form.Item>

//         <Form.Item label=" " colon={false}>
//           <Button className=" mr-10" onClick={handleCancel}>
//             {buttonTrans.cancel}
//           </Button>
//           <Button
//             type="primary"
//             onClick={handleSubmit}
//             loading={loading}
//           >
//             {buttonTrans.search}
//           </Button>
//         </Form.Item>
//       </Form>
//     );
//   }
// );

const TableForm = ()=><div></div>

export default TableForm;
