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
  const { setRefresh, currentPartitions } = useContext(dataManagementContext)

  const { collectionName } = useParams()
  const { t } = useTranslation();
  const partitionTrans = t("partition");
  const tableTrans = t("table");

  const [data, setData] = useState([])
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0); // total count for pagination
  const [current, setCurrent] = useState(0); // current page for pagination


  useEffect(() => {
    setData(currentPartitions.slice(offset, PAGE_SIZE + offset))
    setCount(currentPartitions.length)
  }, [currentPartitions, offset])

  const saveSuccess = () => {
    setRefresh(true)
    setCurrent(0);
    setOffset(0)
  };

  const handlePageChange = (e, page) => {
    setOffset(page * PAGE_SIZE);
    setCurrent(page);
  };


  const handleDelete = async (e, selected) => {
    const res = await Promise.all(selected.map(async (v, i) => {
      try {
        return await deletePartition(collectionName, { partition_tag: v.partition_tag });
      } catch (error) {
        return error.response
      }
    }));
    const errorMsg = res.filter(v => v)

    if (errorMsg.length) {
      openSnackBar(errorMsg[0].data.message || 'Some Patitions Fail', 'error')
    } else {
      openSnackBar(partitionTrans.delete)
    }
    saveSuccess()
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
      disabled: selected => selected.length === 0 || selected.some(s => s.partition_tag === '_default'),
      disabledTooltip: "default partition cant be deleted"
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
          title={[collectionName, 'Partitions']}
        ></MilvusGrid>
      </PageWrapper>
    </div>
  );
};

export default Partitions;
