import React, { useState, useEffect, useContext } from "react";
import MilvusGrid from "../../components/grid";
import { Box } from "@material-ui/core";
import PaperWrapper from "../../components/page-wrapper";
import CollectionIcon from "@material-ui/icons/GridOnSharp";
import { useDataPageStyles } from "../../hooks/page";
import { useTranslation } from "react-i18next";
import { httpContext } from "../../context/http";
import { dataManagementContext } from "../../context/data-management";

import { materialContext } from "../../context/material";
import CreateCollection from "../../components/dialogs/CreateCollection";
import CreateIndex from "../../components/dialogs/CreateIndex";

const PAGE_SIZE = 10;
const Collections = props => {
  const { deleteCollection, searchCollection, createCollection, createIndex, getCollections, currentAddress } = useContext(
    httpContext
  );

  const { setDialog, openSnackBar } = useContext(materialContext);
  const { setRefresh, refresh } = useContext(dataManagementContext);
  const classes = useDataPageStyles();
  const { t } = useTranslation();
  const tableTrans = t("table");
  const dataManageTrans = t("dataManage");

  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);
  const [isSearch, setIsSearch] = useState(false);

  const fetchCollection = async () => {
    const res = await getCollections({
      page_size: PAGE_SIZE,
      offset
    })
    const { collections = [], count = 0 } = res || {};
    setCount(count)
    setData(collections)
  }

  const handleDelete = async (e, selected) => {
    const res = await Promise.all(
      selected.map(async (v, i) => {
        try {
          return await deleteCollection(v.collection_name);
        } catch (error) {
          return error.response;
        }
      })
    );
    const errorMsg = res.filter(v => v);

    if (errorMsg.length) {
      openSnackBar(errorMsg[0].data.message || "Some Table Fail", "error");
    } else {
      openSnackBar(tableTrans.delete);
    }
    saveSuccess();
  };

  const saveSuccess = txt => {
    setRefresh(true);
    setOffset(0);
    setCurrent(0);
  };

  useEffect(() => {
    if (isSearch || !currentAddress) {
      return;
    }
    fetchCollection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAddress, offset, isSearch]);

  useEffect(() => {
    if (isSearch || !currentAddress || !refresh) {
      return;
    }
    fetchCollection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const handleSearch = async name => {
    setCurrent(0);
    if (!name) {
      setOffset(0);
      setIsSearch(false);
      return;
    }
    const res = (await searchCollection(name)) || {};
    setData([{ ...res, key: res.collection_name }]);
    setCount(1);
    setIsSearch(true);
  };

  const handlePageChange = async (e, page) => {
    setOffset(page * PAGE_SIZE);
    setCurrent(page);
  };

  const deleteIndex = async collectionName => {
    const res = await createIndex(collectionName, {
      index_type: "FLAT",
      nlist: 16384
    });
    console.log(res);
    if (res && res.code === 0) {
      saveSuccess();
      openSnackBar(t("index").deleteSuccess);
    }
  };

  const colDefinitions = [
    {
      id: "collection_name",
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
      label: "Create Collection",
      icon: "create",
      onClick: () =>
        setDialog({
          open: true,
          type: "custom",
          params: {
            component: (
              <CreateCollection
                createCollection={createCollection}
                saveSuccess={saveSuccess}
              ></CreateCollection>
            )
          }
        }),
      disabled: selected => selected.length > 2
    },
    {
      label: "Delete",
      icon: "delete",
      onClick: (e, selected) => {
        return new Promise(resolve => {
          setDialog({
            open: true,
            type: "notice",
            params: {
              title: `Do you want to delete ${
                selected.length === 1 ? `this item` : `these items`
                }?`,
              confirm: async () => {
                await handleDelete(e, selected);
                resolve(true);
              }
            }
          });
        });
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
          type: "custom",
          params: {
            component: (
              <CreateIndex
                createIndex={createIndex}
                collectionInfo={selected[0]}
                saveSuccess={saveSuccess}
              ></CreateIndex>
            )
          }
        });
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
          type: "notice",
          params: {
            title: `Do you want to delete index in ${selected[0].collection_name}?`,
            confirm: () => {
              deleteIndex(selected[0].collection_name);
            }
          }
        });
      },
      disabled: selected =>
        selected.length !== 1 || selected[0].index === "FLAT"
    },
    {
      label: "",
      icon: "search",
      searchText: "",
      onSearch: handleSearch,
      onClear: () => {
        handleSearch("");
      }
    }
  ];

  const rows = data || [];
  console.log(rows);
  return (
    <div className={`${classes.root}`}>
      <PaperWrapper className={classes.paper}>
        <Box p={2}>
          <MilvusGrid
            title={[dataManageTrans.collections]}
            titleIcon={<CollectionIcon />}
            toolbarConfig={toolbarConfig}
            colDefinitions={colDefinitions}
            rows={rows}
            rowsPerPage={PAGE_SIZE}
            rowCount={count}
            page={current}
            onChangePage={handlePageChange}
            primaryKey="collection_name"
            isLoading={false}
          ></MilvusGrid>
        </Box>
      </PaperWrapper>
    </div>
  );
};

export default Collections;
