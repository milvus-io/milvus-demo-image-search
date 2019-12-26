import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Divider,
  Icon,
  Modal,
  Input,
  Popconfirm,
  message
} from "antd";
import { useTranslation } from "react-i18next";
import TableForm from "./table-form";
import IndexForm from "./index-form";
import { getTables, deleteTable, searchTable } from "@/http/table";
import "./index.scss";

const { Search } = Input;
const PAGE_SIZE = 10;
const TableManage = props => {
  const { t } = useTranslation();
  const tableTrans = t("table");
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [record, setRecord] = useState("");
  const [type, setType] = useState("table");

  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(1);
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
    setRecord(record);
  };
  const handleDelete = async record => {
    await deleteTable(record.table_name);
    setOffset(0);
    setCurrent(1);
    message.success(tableTrans.delete);
  };
  const fetchData = async () => {
    const res = await getTables({ offset, page_size: PAGE_SIZE });
    if (res) {
      setData(
        res.tables.map(v => ({
          ...v,
          key: v.table_name
        }))
      );
      setCount(res.count);
    }
  };

  const saveSuccess = txt => {
    setVisible(false);
    setOffset(0);
    setCurrent(1);
    message.success(txt);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const columns = [
    {
      title: "Name",
      dataIndex: "table_name",
      key: "table_name"
    },
    {
      title: "Dimension",
      dataIndex: "dimension",
      key: "dimension"
    },

    {
      title: "Metric Type",
      dataIndex: "metric_type",
      key: "metric_type"
    },
    {
      title: "Index",
      dataIndex: "index",
      key: "index"
    },
    {
      title: "nlist",
      dataIndex: "nlist",
      key: "nlist"
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
              title={`${tableTrans.confirmDel} ${record.table_name} ?`}
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

  const handleSearch = async name => {
    setCurrent(1);
    if (!name) {
      if (offset === 0) {
        fetchData();
      } else {
        setOffset(0);
      }
      return;
    }
    const res = (await searchTable(name)) || {};

    setData([{ ...res, key: res.table_name }]);
    setCount(1);
  };

  const handlePageChange = async page => {
    setOffset((page - 1) * PAGE_SIZE);
    setCurrent(page);
  };
  return (
    <div className="table-wrapper">
      <div className="header">
        <h2>Table and Index </h2>
        {/* <Button className="primary-btn">Save</Button>
        <Button className="disable-btn">Cancel</Button> */}
      </div>
      <div className="control">
        <div onClick={createTable} style={{ cursor: "pointer" }}>
          <Button
            className="mr-10 circle-btn"
            type="primary"
            shape="circle"
            icon="plus"
          />
          <span>Add Table</span>
        </div>
        <Search
          placeholder={tableTrans.searchTxt}
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
      </div>
      <Table
        columns={columns}
        className="table-wrapper"
        pagination={{
          current,
          total: count,
          onChange: handlePageChange,
          pageSize: PAGE_SIZE
        }}
        dataSource={data}
      />
      <Modal
        title={
          type === "table"
            ? `${tableTrans.create}`
            : `${tableTrans.index} ${record.table_name}`
        }
        visible={visible}
        footer={null}
        onCancel={handleCancel}
        wrapClassName="my-modal"
      >
        {type === "table" ? (
          <TableForm
            handleCancel={handleCancel}
            saveSuccess={saveSuccess}
          ></TableForm>
        ) : (
          <IndexForm
            handleCancel={handleCancel}
            record={record}
            saveSuccess={saveSuccess}
          ></IndexForm>
        )}
      </Modal>
    </div>
  );
};

export default TableManage;
