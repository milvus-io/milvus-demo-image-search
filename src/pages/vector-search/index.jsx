import React, { useState, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from '../../hooks'
import SearchForm from "./search-form";
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
  const searchSuccess = data => {
    setData(data)
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
          title={[dataManageTrans.vector]}
          searchForm={<SearchForm collectionName={collectionName} partitionTag={partitionTag} searchSuccess={searchSuccess}></SearchForm>}
        ></MilvusGrid>
      </PageWrapper>
    </div>
  );
};

export default VectorSearch;
