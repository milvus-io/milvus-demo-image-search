import React, { useState, useEffect, useContext, useMemo } from "react";
import {
  Button,
  Table,
  Modal,
  Input,
  Popconfirm,
  message
} from "antd";
import { useTranslation } from "react-i18next";
import { httpContext } from '../../context/http'
import { dataManagementContext } from '../../context/data-management'
import { KEYS, UPDATE } from '../../reducers/data-management'
import PatitionForm from './form'
import "./index.less";

const { Search } = Input;
const PAGE_SIZE = 2;
const TableManage = props => {
  const { getPartitions, deletePartition, currentAddress } = useContext(httpContext)
  const { dataManagement, setDataManagement } = useContext(dataManagementContext)
  const { t } = useTranslation();
  const partitionTrans = t("partition");
  const dataManageTrans = t("dataManage");

  const [visible, setVisible] = useState(false);

  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0); // total count for pagination
  const [current, setCurrent] = useState(1); // current page for pagination

  const { data, tableName } = useMemo(() => {
    const { data = null, tableName = "" } = dataManagement[KEYS.partition][currentAddress] || {}
    return { data, tableName }
  }, [dataManagement, currentAddress])


  const updateTableName = (tableName) => {
    setDataManagement(
      {
        type: UPDATE,
        payload: {
          id: currentAddress,
          key: KEYS.partition,
          value: {
            tableName
          }
        }
      }
    );
  }

  const createTable = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = async record => {
    await deletePartition(tableName, record.partition_tag);
    getFirstPage(tableName);
    setCurrent(1);
    message.success(partitionTrans.delete);
  };
  const fetchData = async (name) => {
    const res = await getPartitions(name, { offset, page_size: PAGE_SIZE });
    if (res && res.partitions) {
      setDataManagement(
        {
          type: UPDATE,
          payload: {
            id: currentAddress,
            key: KEYS.partition,
            value: {
              data: res.partitions.map(v => ({
                ...v,
                tableName: name,
                key: v.partition_name
              }))
            }
          }
        }
      );
      setCount(res.count || 10);
    }
  };

  const saveSuccess = (txt, tableName) => {
    setVisible(false);
    updateTableName(tableName)
    getFirstPage(tableName);
    setCurrent(1);
    message.success(txt);
  };

  const columns = [
    {
      title: partitionTrans.name,
      dataIndex: "partition_name",
      key: "partition_name"
    },
    {
      title: partitionTrans.tag,
      dataIndex: "partition_tag",
      key: "partition_tag"
    },
    {
      title: partitionTrans.tableName,
      dataIndex: "tableName",
      key: "tableName"
    },
    {
      title: partitionTrans.action,
      key: "action",
      render: (text, record) => {
        return (
          <span>
            <Popconfirm
              placement="top"
              title={`${partitionTrans.confirmDel} ${record.partition_name} ?`}
              onConfirm={() => {
                handleDelete(record);
              }}
              okText="Delete"
              cancelText="Cancel"
            >
              {/* <Icon type="delete" style={{ color: "#FAFAFA" }}></Icon> */}
              <span
                style={{
                  fontSize: "12px",
                  color: "#FAFAFA",
                  cursor: "pointer"
                }}
              >
                {partitionTrans.deletePartition}
              </span>
            </Popconfirm>
          </span>
        );
      }
    }
  ];


  const handleSearch = async name => {
    if (!name) {
      message.warning("Need table name to search partitions")
      return;
    }
    updateTableName(name)
    setCurrent(1);
    getFirstPage(name)
  };

  const getFirstPage = (tableName) => {
    if (offset === 0) {
      fetchData(tableName);
    } else {
      setOffset(0);
    }
  };

  const handlePageChange = async page => {
    setOffset((page - 1) * PAGE_SIZE);
    setCurrent(page);
  };

  useEffect(() => {
    if (!tableName) return
    fetchData(tableName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);
  return (
    <div className="table-wrapper">
      <div className="header">
        <h2>{dataManageTrans.partition}</h2>
      </div>
      <div className="control">
        <div onClick={createTable} style={{ cursor: "pointer" }}>
          <Button
            className="mr-10 circle-btn"
            type="primary"
            shape="circle"
            icon="plus"
          />
          <span>{partitionTrans.create}</span>
        </div>
        <Search
          placeholder={partitionTrans.searchTxt}
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
      </div>
      {tableName ? <Table
        columns={columns}
        className="table-wrapper"
        pagination={{
          current,
          total: count,
          onChange: handlePageChange,
          pageSize: PAGE_SIZE
        }}
        dataSource={data}
      /> : <div className="tip">{partitionTrans.tip}</div>}

      <Modal
        title={partitionTrans.create}
        visible={visible}
        footer={null}
        onCancel={handleCancel}
        wrapClassName="my-modal"
      >
        <PatitionForm
          handleCancel={handleCancel}
          saveSuccess={saveSuccess}
        ></PatitionForm>

      </Modal>
    </div>
  );
};

export default TableManage;
