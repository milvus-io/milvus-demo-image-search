import React, { useState } from "react";
import { Button, Table, Divider, Icon, Modal } from "antd";
import "./index.scss";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: text => <div>{text}</div>
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  },

  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <Icon type="plus"></Icon>
        <Divider type="vertical" />
        <Icon type="delete"></Icon>
      </span>
    )
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];

const TableManage = props => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("table");
  const createTable = () => {
    setVisible(true);
    setType("table");
  };

  return (
    <div className="table-wrapper">
      <div className="header">
        <h2>Table and Index</h2>
        <Button className="primary-btn">Save</Button>
        <Button className="disable-btn">Cancel</Button>
      </div>
      <div className="control">
        <div onClick={createTable} style={{ cursor: "pointer" }}>
          <Button className="mr-10" type="primary" shape="circle" icon="plus" />
          <span>Add Table</span>
        </div>
      </div>
      <Table columns={columns} className="table-wrapper" dataSource={data} />
      <Modal
        title={type === "table" ? "New Table" : "New Index"}
        visible={visible}
        footer={null}
        wrapClassName="my-modal"
      >
        <p>text</p>
        <div>
          <Button className="disable-btn">Cancel</Button>
          <Button className="primary-btn">Save</Button>
        </div>
      </Modal>
    </div>
  );
};

export default TableManage;
