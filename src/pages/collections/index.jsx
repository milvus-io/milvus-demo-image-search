import React, { useState, useEffect, useContext, useMemo } from "react";
import MilvusGrid from "../../components/grid";
import { Paper, Box } from "@material-ui/core";
import CollectionIcon from "@material-ui/icons/GridOnSharp";
import { useDataPageStyles } from "../../hooks/page";
import { useTranslation } from "react-i18next";
import { httpContext } from "../../context/http";
import { materialContext } from '../../context/material'
import CreateCollection from '../../components/dialogs/CreateCollection'

import "./index.less";

const PAGE_SIZE = 10;
const Collections = props => {
  const {
    getCollections,
    deleteTable,
    searchTable,
    createTable,
    currentAddress
  } = useContext(httpContext);

  const { setDialog, openSnackBar } = useContext(materialContext)
  const classes = useDataPageStyles();
  const { t } = useTranslation();
  const tableTrans = t("table");
  const dataManageTrans = t("dataManage");

  const [data, setData] = useState([])
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);

  // const handleAddIndex = record => {
  //   setType("index");
  //   setVisible(true);
  //   setRecord(record);
  // };
  const handleDelete = async (e, selected) => {
    await deleteTable(selected[0].table_name);
    getFirstPage();
    setCurrent(0);
    openSnackBar(tableTrans.delete)
  };
  const fetchData = async () => {
    const res = await getCollections({ offset, page_size: PAGE_SIZE });
    if (res && res.tables) {
      setData(res.tables.map(v => ({
        ...v,
        key: v.table_name
      })))

      setCount(res.count);
    }
  };

  const saveSuccess = txt => {
    getFirstPage();
    setCurrent(0);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, currentAddress]);

  const handleSearch = async name => {
    console.log(name)
    setCurrent(0);
    if (!name) {
      getFirstPage();
      return;
    }
    const res = (await searchTable(name)) || {};

    setData([{ ...res, key: res.table_name }])

    setCount(1);
  };

  const getFirstPage = () => {
    if (offset === 0) {
      fetchData();
    } else {
      setOffset(0);
    }
  };

  const handlePageChange = async (e, page) => {
    setOffset(page * PAGE_SIZE);
    setCurrent(page);
  };


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
      onClick: () => setDialog({
        open: true,
        type: 'custom',
        params: {
          component: <CreateCollection createTable={createTable} saveSuccess={saveSuccess}></CreateCollection>,
        }
      }),
      disabled: selected => selected.length > 2
    },
    {
      label: "Delete",
      icon: "delete",
      onClick: handleDelete,
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
      searchText: "",
      onSearch: handleSearch,
      onClear: () => {
        handleSearch('')
      }
    }
  ];

  const rows = data || [];

  return (
    <div className={`${classes.root} table-wrapper`}>
      <Paper className={classes.paper} elevation={3} >
        <Box p={2}>
          <MilvusGrid
            title={dataManageTrans.collections}
            titleIcon={<CollectionIcon />}
            toolbarConfig={toolbarConfig}
            colDefinitions={colDefinitions}
            rows={rows}
            rowsPerPage={PAGE_SIZE}
            rowCount={count}
            page={current}
            onChangePage={handlePageChange}
            primaryKey="table_name"
            isLoading={false}
          ></MilvusGrid>
        </Box>
      </Paper>
    </div>
  );
};

export default Collections;
