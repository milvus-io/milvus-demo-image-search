import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from '../../hooks'
import SearchForm from "./search-form";
import { PARTITION_TAG, COLLECTION_NAME } from "../../consts";
import MilvusGrid from "../../components/grid";
import { useDataPageStyles } from "../../hooks/page";
import PageWrapper from '../../components/page-wrapper'
import { httpContext } from '../../context/http'
import { materialContext } from '../../context/material'

const VectorSearch = props => {
  const classes = useDataPageStyles()
  const query = useQuery()
  const { deleteVectors } = useContext(httpContext)
  const { openSnackBar } = useContext(materialContext)

  const { t } = useTranslation();
  const dataManageTrans = t("dataManage");
  const vectorTrans = t("vector");
  const [data, setData] = useState([])
  const [search, setSearch] = useState(false)

  const searchSuccess = data => {
    setData(v => data)
    setSearch(false)

  };

  const handleDelete = async (e, selected) => {
    const ids = selected.map(v => v.id)
    await deleteVectors(collectionName, { delete: { ids } })
    openSnackBar(t('deleteSuccess'))
    setSearch(true)
  };

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
  const toolbarConfig = [
    {
      label: "Delete",
      icon: "delete",
      onClick: handleDelete,
      disabled: selected => selected.length === 0,
      disabledTooltip: "You can not delete this"
    },
  ];
  const rows = data || [];

  const collectionName = query.get(COLLECTION_NAME) || ''
  const partitionTag = query.get(PARTITION_TAG) || ''

  return (
    <div className={classes.root}>
      <PageWrapper>
        <MilvusGrid
          toolbarConfig={toolbarConfig}
          colDefinitions={colDefinitions}
          rows={rows}
          rowsPerPage={rows.length}
          rowCount={rows.length}
          primaryKey="id"
          isLoading={false}
          title={[dataManageTrans.vector]}
          searchForm={<SearchForm
            collectionName={collectionName}
            search={search}
            partitionTag={partitionTag}
            searchSuccess={searchSuccess}
          ></SearchForm>}
        ></MilvusGrid>
      </PageWrapper>
    </div>
  );
};

export default VectorSearch;
