import React, { useState, useEffect, useContext, useMemo } from "react";
import { useHistory, useParams } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { httpContext } from '../../context/http'
import { materialContext } from '../../context/material'
import PageWrapper from '../../components/page-wrapper'
import MilvusGrid from "../../components/grid";
import { useDataPageStyles } from "../../hooks/page";

import PatitionForm from './form'
import "./index.less";

// const { Search } = Input;
const PAGE_SIZE = 2;
const Partitions = props => {
  const classes = useDataPageStyles()
  const { getPartitions, getCollectionByName, deletePartition, currentAddress } = useContext(httpContext)
  const { openSnackBar } = useContext(materialContext)
  const history = useHistory()
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
    try {
      const res = await Promise.all([getPartitions(collectionName, { offset, page_size: PAGE_SIZE }), getCollectionByName(collectionName)]);
      const partitions = res[0] && res[0].partitions
      const collections = res[1] || {}
      if (partitions) {
        setData(partitions.map(v => ({
          ...v,
          ...collections
        })))
        setCount(res.count || 10);
      }

    } catch (e) {
      console.log(e)
      // when toggle currentaddress . table name may not exist in diff milvus.
      // handleBack()
    }
  }

  const saveSuccess = (txt, tableName) => {
    getFirstPage(tableName);
    setCurrent(0);
    openSnackBar(txt)
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
  ];


  const handleSearch = async name => {
    if (!name) {
      return;
    }
    setCurrent(0);
    getFirstPage(name)
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

  const handleBack = () => {
    history.goBack()
  }

  useEffect(() => {
    console.log('in')
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, currentAddress]);

  const handleDelete = async (e, selected) => {
    await deletePartition(collectionName, selected[0].partition_tag);
    getFirstPage();
    setCurrent(0);
    openSnackBar(partitionTrans.delete)
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
      onClick: () => console.log("one"),
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
      label: "",
      icon: "search",
      searchText: "",
      onSearch: text => console.log("search value is", text),
      onClear: () => {
        console.log("clear clear");
      }
    }
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
        ></MilvusGrid>
      </PageWrapper>


      {/* <Modal
        title={partitionTrans.create}
        visible={visible}
        footer={null}
        onCancel={handleCancel}
        wrapClassName="my-modal"
        centered={true}
      >
        <PatitionForm
          tableName={collectionName}
          handleCancel={handleCancel}
          saveSuccess={saveSuccess}
        ></PatitionForm>

      </Modal> */}
    </div>
  );
};

export default Partitions;
