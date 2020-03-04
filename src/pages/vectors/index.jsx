import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { httpContext } from '../../context/http'
import { materialContext } from '../../context/material'
import { dataManagementContext } from '../../context/data-management'

import PageWrapper from '../../components/page-wrapper'
import MilvusGrid from "../../components/grid";
import ImportVectors from '../../components/dialogs/ImportVectorToCollection'
import { useDataPageStyles } from "../../hooks/page";
import { useQuery } from '../../hooks'
import { sliceWord } from '../../utils/helpers'

const PAGE_SIZE = 10;
const Vectors = props => {
  const classes = useDataPageStyles()
  const query = useQuery()
  const { currentAddress, getSegments, addVectors, getVectors, deleteVectors } = useContext(httpContext)
  const { openSnackBar, setDialog } = useContext(materialContext)
  const { setRefresh } = useContext(dataManagementContext)

  const { collectionName, partitionTag } = useParams()
  const { t } = useTranslation();
  const vectorTrans = t("vector");
  const tableTrans = t("table");

  const [data, setData] = useState([])
  const [vectorOffset, setVectorOffset] = useState(0); // only for one segment
  const [segments, setSegments] = useState([])
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0)
  const [count, setCount] = useState(0); // total count for pagination
  const [current, setCurrent] = useState(0); // current page for pagination
  const [direction, setDirection] = useState("next")
  const [segementStartPage, setSegementStartPage] = useState([0])

  const fetchSegments = async () => {
    if (!currentAddress) return
    try {
      const res = await getSegments(collectionName, { offset: 0, partition_tag: partitionTag, page_size: PAGE_SIZE })
      const firstSegment = res.segments[0]
      console.log(res)
      setSegments(res.segments || [])
      setCount(res.segments.reduce((pre, cur) => pre + cur.count, 0)) // get all vectors count
      setCurrentSegmentIndex(0)
      setVectorOffset(firstSegment.count || 0 - PAGE_SIZE > 0 ? firstSegment.count - PAGE_SIZE : 0)
    } catch (e) {
      console.log(e)
    } finally {
      setRefresh(false)
    }
  }

  // const saveSuccess = () => {
  //   setRefresh(true)
  //   getFirstPage();
  //   setCurrent(0);
  // };

  const getFirstPage = () => {
    setCurrent(0)
    setCurrentSegmentIndex(0)
  };

  useEffect(() => {
    fetchSegments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAddress]);

  const { count: currentTotal, segment_name: segmentName } = useMemo(() => {
    return segments[currentSegmentIndex] || {}
  }, [segments, currentSegmentIndex])

  const fetchVectors = async () => {
    const offset = vectorOffset < 0 ? 0 : vectorOffset
    const pageSize = vectorOffset < 0 ? PAGE_SIZE + vectorOffset : PAGE_SIZE
    const res = await getVectors(collectionName, segmentName, { offset, page_size: pageSize })
    const vectors = res.vectors || []
    setData(v => {
      const newVectors = vectors.map(v => ({
        ...v,
        vector: sliceWord(JSON.stringify(v.vector))
      }))
      return v.length < PAGE_SIZE ? [...v, ...newVectors] : newVectors
    })
    const nextIndex = direction === 'next' ? currentSegmentIndex + 1 : currentSegmentIndex - 1
    const nextSegment = segments[nextIndex]

    if (vectorOffset < 0 && nextSegment) {
      setCurrentSegmentIndex(nextIndex)
      setVectorOffset(v => nextSegment.count + vectorOffset)
      setSegementStartPage(v => {
        const copy = [...v]
        copy[nextIndex] = current
        return copy
      })
    }
  }


  useEffect(() => {
    if (!segmentName) return
    fetchVectors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vectorOffset])

  const handlePageChange = (e, page) => {
    const offset = currentTotal - (page + 1 - segementStartPage[currentSegmentIndex]) * PAGE_SIZE
    setVectorOffset(offset);
    setDirection(page > current ? 'next' : "prev")
    setCurrent(page);
  };

  const handleDelete = async (e, selected) => {
    const ids = selected.map(v => v.id)
    await deleteVectors(collectionName, { delete: { ids } })
    fetchSegments()
    setCurrent(0);
    openSnackBar(t('deleteSuccess'))

  };

  const handleAddVectors = async (vectors) => {
    await addVectors(collectionName, {
      partition_tag: partitionTag,
      vectors
    })
    setTimeout(() => {
      openSnackBar(vectorTrans.importSuccess)
      fetchSegments()
      setCurrent(0)
    }, 1000)

  }

  const colDefinitions = [
    {
      id: "id",
      numeric: false,
      disablePadding: true,
      label: 'ID'
    },
    {
      id: "vector",
      numeric: false,
      disablePadding: true,
      label: vectorTrans.vector
    },
  ];
  const dimension = query.get('dimension')
  const toolbarConfig = [
    {
      label: "Import vectors",
      icon: "create",
      // onClick: handleAddVectors,
      onClick: () => setDialog({
        open: true,
        type: 'custom',
        params: {
          component: <ImportVectors dimension={dimension} importVectors={handleAddVectors} partitionTag={partitionTag}></ImportVectors>
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
          primaryKey="id"
          isLoading={false}
          title={[collectionName, partitionTag, 'Vectors']}
        ></MilvusGrid>
      </PageWrapper>
    </div>
  );
};

export default Vectors;
