import React, { useState, useEffect, useContext, useMemo } from "react";
import MilvusGrid from "../../components/grid";
import { Paper, Box } from "@material-ui/core";
import PaperWrapper from "../../components/page-wrapper";
import CollectionIcon from "@material-ui/icons/GridOnSharp";
import { useDataPageStyles } from "../../hooks/page";
import { useTranslation } from "react-i18next";
import { httpContext } from "../../context/http";
import { dataManagementContext } from "../../context/data-management";

import { materialContext } from '../../context/material'
import CreateCollection from '../../components/dialogs/CreateCollection'
import CreateIndex from '../../components/dialogs/CreateIndex'

const PAGE_SIZE = 10;
const Collections = props => {
  const {
    getCollections,
    deleteTable,
    searchTable,
    createTable,
    currentAddress,
    createIndex
  } = useContext(httpContext);

  const { setDialog, openSnackBar } = useContext(materialContext)
  const { setRefresh } = useContext(dataManagementContext)
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
    const res = await Promise.all(selected.map(async (v, i) => {
      try {
        return await deleteTable(v.table_name)

      } catch (error) {
        return error.response
      }
    }));
    const errorMsg = res.filter(v => v)
    console.log(res)
    getFirstPage();
    setCurrent(0);
    if (errorMsg.length) {
      openSnackBar(errorMsg[0].data.message || 'Some Table Fail', 'error')
    } else {
      openSnackBar(tableTrans.delete)
    }
    setRefresh(true)
  };
  const fetchData = async () => {
    const res = await getCollections({ offset, page_size: PAGE_SIZE });
    if (res && res.tables) {
      setData(res.tables.map(v => ({
        ...v,
        key: v.table_name
      })))

      setCount(res.count);
      setRefresh(false)
    }
  };

  const saveSuccess = txt => {
    setRefresh(true)
    getFirstPage();
    setCurrent(0);
  };

  useEffect(() => {
    if (!currentAddress) return
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

  const deleteIndex = async (collectionName) => {
    const res = await createIndex(collectionName, { index_type: "FLAT", nlist: 16384 })
    console.log(res)
    if (res && res.code === 0) {
      saveSuccess()
      openSnackBar(t('index').deleteSuccess)
    }
  }


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
    // {
    //   label: "",
    //   icon: "refresh",
    //   onClick: () => {
    //     console.log();
    //   },
    //   disabled: false
    // },
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
      onClick: (e, selected) => {
        setDialog({
          open: true,
          type: 'notice',
          params: {
            title: `Do you want to delete collections ?`,
            confirm: () => {
              handleDelete(e, selected)
            }
          }
        })
      },
      disabled: selected => selected.length === 0,
      disabledTooltip: "You can not delete this item"
    },
    {
      label: "Create Index",
      icon: "createIndex",
      onClick: (e, selected) => {
        setDialog({
          open: true,
          type: 'custom',
          params: {
            component: <CreateIndex createIndex={createIndex} collectionInfo={selected[0]} saveSuccess={saveSuccess}></CreateIndex>,
          }
        })
      },
      disabled: selected => selected.length !== 1,
      disabledTooltip: "You can not create index on multiple collections"
    },
    {
      label: "Drop Index",
      icon: "dropIndex",
      onClick: (e, selected) => {
        setDialog({
          open: true,
          type: 'notice',
          params: {
            title: `Do you want to delete index in ${selected[0].table_name}?`,
            confirm: () => {
              deleteIndex(selected[0].table_name)
            }
          }
        })
      },
      disabled: selected => selected.length !== 1,
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
    <div className={`${classes.root}`}>
      <PaperWrapper className={classes.paper} >
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
      </PaperWrapper>
    </div>
  );
};

export default Collections;
