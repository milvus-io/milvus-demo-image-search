import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { httpContext } from '../../context/http'
import { materialContext } from '../../context/material'
import { dataManagementContext } from '../../context/data-management'

import PageWrapper from '../../components/page-wrapper'
import MilvusGrid from "../../components/grid";
import CreatePartition from '../../components/dialogs/CreatePartition'
import { useDataPageStyles } from "../../hooks/page";


const PAGE_SIZE = 10;
const Partitions = props => {
  const classes = useDataPageStyles()
  const { getPartitions, getCollectionByName, deletePartition, currentAddress, createPartition } = useContext(httpContext)
  const { openSnackBar, setDialog } = useContext(materialContext)
  const { setRefresh } = useContext(dataManagementContext)

  const { collectionName } = useParams()
  const { t } = useTranslation();
  const partitionTrans = t("partition");
  const tableTrans = t("table");

  const [data, setData] = useState([])
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0); // total count for pagination
  const [current, setCurrent] = useState(0); // current page for pagination

  /**
   *  for now we just take the table from params
   *  so the fecthData(xxx) will igonre
   */
  const fetchData = async () => {
    if (!currentAddress) return
    try {
      const res = await Promise.all([getPartitions(collectionName, { offset, page_size: PAGE_SIZE }), getCollectionByName(collectionName)]);
      const partitions = res[0] && res[0].partitions
      const collections = res[1] || {}
      if (partitions) {
        setData(partitions.map(v => ({
          ...v,
          ...collections
        })))
        setCount(res.count || 100);
      }

    } catch (e) {
      console.log(e)
    } finally {
      setRefresh(false)
    }
  }

  const saveSuccess = () => {
    setRefresh(true)
    getFirstPage();
    setCurrent(0);
  };

  const getFirstPage = () => {
    if (offset === 0) {
      fetchData();
    } else {
      setOffset(0);
    }
  };

  const handlePageChange = (e, page) => {
    setOffset(page * PAGE_SIZE);
    setCurrent(page);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, currentAddress]);

  const handleDelete = async (e, selected) => {
    const res = await Promise.all(selected.map(async (v, i) => {
      try {
        return await deletePartition(collectionName, v.partition_tag);
      } catch (error) {
        return error.response
      }
    }));
    setRefresh(true)
    const errorMsg = res.filter(v => v)
    getFirstPage();
    setCurrent(0);
    if (errorMsg.length) {
      openSnackBar(errorMsg[0].data.message || 'Some Patitions Fail', 'error')
    } else {
      openSnackBar(partitionTrans.delete)
    }

  };

  const colDefinitions = [
    {
      id: "partition_tag",
      numeric: false,
      disablePadding: true,
      label: partitionTrans.tag
    },

    {
      id: "index_file_size",
      numeric: true,
      disablePadding: true,
      label: tableTrans.fileSize
    },
    {
      id: "dimension",
      numeric: true,
      disablePadding: false,
      label: tableTrans.tDimension
    },
    {
      id: "metric_type",
      numeric: false,
      disablePadding: true,
      label: tableTrans.tMetric
    },
    {
      id: "index",
      numeric: false,
      disablePadding: true,
      label: tableTrans.tIndex
    },

  ];

  const toolbarConfig = [
    {
      label: "Create",
      icon: "create",
      onClick: () => setDialog({
        open: true,
        type: 'custom',
        params: {
          component: <CreatePartition createPartition={createPartition} saveSuccess={saveSuccess} collectionName={collectionName}></CreatePartition>,
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
    // {
    //   label: "",
    //   icon: "search",
    //   searchText: "",
    //   onSearch: text => console.log("search value is", text),
    //   onClear: () => {
    //     console.log("clear clear");
    //   }
    // }
  ];

  const rows = data || [];


  return (
    <div className={classes.root}>
      <PageWrapper>
        <MilvusGrid
          toolbarConfig={toolbarConfig}
          colDefinitions={colDefinitions}
          rows={rows}
          rowsPerPage={PAGE_SIZE}
          rowCount={count}
          page={current}
          onChangePage={handlePageChange}
          primaryKey="partition_tag"
          isLoading={false}
          title={collectionName}
        ></MilvusGrid>
      </PageWrapper>
    </div>
  );
};

export default Partitions;
