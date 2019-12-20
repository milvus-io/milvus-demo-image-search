import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Divider,
  Icon,
  Modal,
  Form,
  Input,
  Popconfirm
} from "antd";
import TableForm from "./table-form";
import IndexForm from "./index-form";
import { getTables } from "@/http/table";
import "./index.scss";

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
const { Search } = Input;

const TableManage = props => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [selectedTable, setSelectedTable] = useState("");
  const [type, setType] = useState("table");
  //   const { getFieldDecorator } = form;
  const createTable = () => {
    setType("table");
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const handleAddIndex = record => {
    setType("index");
    setVisible(true);
    setSelectedTable(record.name);
  };
  const handleDelete = record => {
    console.log(record);
  };

  useEffect(() => {
    getTables("/tables", { offset, page_size: 10 });
  }, [offset]);

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
      render: (text, record) => {
        return (
          <span>
            <Icon
              type="plus"
              onClick={() => {
                handleAddIndex(record);
              }}
            ></Icon>
            <Divider type="vertical" />
            <Popconfirm
              placement="top"
              title={`Are you sure to delete ${record.name} table?`}
              onConfirm={() => {
                handleDelete(record);
              }}
              okText="Delete"
              cancelText="Cancel"
            >
              <Icon type="delete"></Icon>
            </Popconfirm>
          </span>
        );
      }
    }
  ];

  const handleSearch = val => {
    console.log(val);
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
        <Search
          placeholder="Search Table Name"
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
      </div>
      <Table columns={columns} className="table-wrapper" dataSource={data} />
      <Modal
        title={
          type === "table" ? "New Table" : `New Index for ${selectedTable}`
        }
        visible={visible}
        footer={null}
        onCancel={handleCancel}
        wrapClassName="my-modal"
      >
        {type === "table" ? (
          <TableForm handleCancel={handleCancel}></TableForm>
        ) : (
          <IndexForm handleCancel={handleCancel}></IndexForm>
        )}
      </Modal>
    </div>
  );
};

export default TableManage;
