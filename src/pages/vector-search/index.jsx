import React, { useState, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from '../../hooks'
import SearchForm from "./search-form";
import { dataManagementContext } from "../../context/data-management";
import { httpContext } from "../../context/http";
import { KEYS } from "../../reducers/data-management";
import { PARTITION_TAG, COLLECTION_NAME } from "../../consts";
import MilvusGrid from "../../components/grid";
import { useDataPageStyles } from "../../hooks/page";
import PageWrapper from '../../components/page-wrapper'

const VectorSearch = props => {
  const classes = useDataPageStyles()
  const query = useQuery()
  const { t } = useTranslation();
  const dataManageTrans = t("dataManage");
  const vectorTrans = t("vector");

  const [data, setData] = useState([])
  const [count, setCount] = useState(0); // total count for pagination
  const [current, setCurrent] = useState(0); // current page for pagination
  const [offset, setOffset] = useState(0);
  const { currentAddress } = useContext(httpContext);


  const searchSuccess = data => {
    setData(data)
  };
  const handleCancel = () => {
    console.log('cancel')
  };

  // const handlePageChange = (e, page) => {
  //   setOffset(page * PAGE_SIZE);
  //   setCurrent(page);
  // };

  const colDefinitions = [
    {
      id: "id",
      numeric: false,
      disablePadding: true,
      label: 'ID'
    },

    {
      id: "distance",
      numeric: false,
      disablePadding: true,
      label: vectorTrans.distance
    },

  ];
  const rows = data || [];

  const collectionName = query.get(COLLECTION_NAME) || ''
  const partitionTag = query.get(PARTITION_TAG) || ''

  return (
    <div className={classes.root}>
      <PageWrapper>
        <MilvusGrid
          colDefinitions={colDefinitions}
          rows={rows}
          rowsPerPage={rows.length}
          rowCount={rows.length}
          primaryKey="id"
          isLoading={false}
          title={[collectionName, partitionTag, dataManageTrans.vector]}
          searchForm={<SearchForm collectionName={collectionName} partitionTag={partitionTag} searchSuccess={searchSuccess}></SearchForm>}
        ></MilvusGrid>
      </PageWrapper>
    </div>
  );
};

export default VectorSearch;
