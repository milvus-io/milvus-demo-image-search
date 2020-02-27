import React, { useState, useEffect, useContext, useMemo } from "react";
import MilvusGrid from "../../components/grid";

import { useHistory } from "react-router-dom";
import { Tab, Paper, Box } from "@material-ui/core";

import {
  Button,
  Table,
  Divider,
  // Icon,
  Modal,
  Input,
  Popconfirm,
  message
} from "antd";
import { useDataPageStyles } from "../../hooks/page";
import { useTranslation } from "react-i18next";
import TableForm from "./table-form";
import IndexForm from "./index-form";
import { httpContext } from "../../context/http";
import { dataManagementContext } from "../../context/data-management";
import { KEYS } from "../../reducers/data-management";
import { UPDATE } from "../../consts";
import "./index.less";

const { Search } = Input;
const PAGE_SIZE = 10;
const TableManage = props => {
  const {
    getCollections,
    deleteTable,
    searchTable,
    currentAddress
  } = useContext(httpContext);
  const { dataManagement, setDataManagement } = useContext(
    dataManagementContext
  );
  const history = useHistory();
  const classes = useDataPageStyles();
  const { t } = useTranslation();
  const tableTrans = t("table");
  const dataManageTrans = t("dataManage");

  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState("");
  const [type, setType] = useState("table");

  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(1);

  const { data } = useMemo(() => {
    const { data = [] } = dataManagement[KEYS.table][currentAddress] || {};
    console.log("in", dataManagement);
    return { data };
  }, [dataManagement, currentAddress]);
  // console.log(data);
  // const createTable = () => {
  //   setType("table");
  //   setVisible(true);
  // };

  // const handleCancel = () => {
  //   setVisible(false);
  // };

  // const handleGoPartitions = record => {
  //   history.push(`/data/table/${record.table_name}/partitions`);
  // };

  // const handleAddIndex = record => {
  //   setType("index");
  //   setVisible(true);
  //   setRecord(record);
  // };
  // const handleDelete = async record => {
  //   await deleteTable(record.table_name);
  //   getFirstPage();
  //   setCurrent(1);
  //   message.success(tableTrans.delete);
  // };
  const fetchData = async () => {
    const res = await getCollections({ offset, page_size: PAGE_SIZE });
    if (res && res.tables) {
      setDataManagement({
        type: UPDATE,
        payload: {
          id: currentAddress,
          key: KEYS.table,
          value: {
            data: res.tables.map(v => ({
              ...v,
              key: v.table_name
            }))
          }
        }
      });
      setCount(res.count);
    }
  };

  // const saveSuccess = txt => {
  //   setVisible(false);
  //   getFirstPage();
  //   setCurrent(1);
  //   message.success(txt);
  // };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, currentAddress]);

  // const handleSearch = async name => {
  //   setCurrent(1);
  //   if (!name) {
  //     getFirstPage();
  //     return;
  //   }
  //   const res = (await searchTable(name)) || {};

  //   setDataManagement({
  //     type: UPDATE,
  //     payload: {
  //       id: currentAddress,
  //       key: KEYS.table,
  //       value: {
  //         data: [{ ...res, key: res.table_name }]
  //       }
  //     }
  //   });
  //   setCount(1);
  // };

  // const getFirstPage = () => {
  //   if (offset === 0) {
  //     fetchData();
  //   } else {
  //     setOffset(0);
  //   }
  // };

  // const handlePageChange = async page => {
  //   setOffset((page - 1) * PAGE_SIZE);
  //   setCurrent(page);
  // };

  console.log("data", data);

  const colDefinitions = [
    {
      id: "table_name",
      numeric: false,
      disablePadding: true,
      label: tableTrans.tName
    },
    {
      id: "dimension",
      numeric: true,
      disablePadding: false,
      label: tableTrans.tDimension
    },
    {
      id: "metric_type",
      numeric: true,
      disablePadding: false,
      label: tableTrans.tMetric
    },
    {
      id: "index_file_size",
      numeric: true,
      disablePadding: false,
      label: tableTrans.fileSize
    },
    {
      id: "index",
      numeric: true,
      disablePadding: false,
      label: tableTrans.tIndex
    }
  ];

  const toolbarConfig = [
    {
      label: "",
      icon: "refresh",
      onClick: () => {
        console.log();
      },
      disabled: false
    },
    {
      label: "Create",
      icon: "create",
      onClick: () => console.log("one"),
      disabled: selected => selected.length > 2
    },

    {
      label: "Delete",
      icon: "delete",
      onClick: (e, selected) => console.log("one", selected),
      disabled: selected => selected.length === 0,
      disabledTooltip: "You can not delete this"
    },
    {
      label: "Create Index",
      icon: "createIndex",
      onClick: selected => console.log("one", selected),
      disabled: selected => selected.length > 2,
      disabledTooltip: "You can not create index on multiple collections"
    },
    {
      label: "Drop Index",
      icon: "dropIndex",
      onClick: selected => console.log("one", selected),
      disabled: false
    },
    {
      label: "",
      icon: "search",
      searchText: "abc",
      onSearch: text => console.log("search value is", text),
      onClear: () => {
        console.log("clear clear");
      }
    }
  ];

  const rows = data || [];

  return (
    <div className={`${classes.root} table-wrapper`}>
      <Paper className={classes.paper}>
        <Box p={2}>
          <MilvusGrid
            toolbarConfig={toolbarConfig}
            colDefinitions={colDefinitions}
            rows={rows}
            rowsPerPage={5}
            rowCount={rows.length}
            primaryKey="table_name"
          ></MilvusGrid>
        </Box>
      </Paper>
    </div>
  );
};

export default TableManage;
