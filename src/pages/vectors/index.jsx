import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { httpContext } from "../../context/http";
import { materialContext } from "../../context/material";
import { dataManagementContext } from "../../context/data-management";

import PageWrapper from "../../components/page-wrapper";
import MilvusGrid from "../../components/grid";
import ImportVectors from "../../components/dialogs/ImportVectorToCollection";
import { useDataPageStyles } from "../../hooks/page";
import { useQuery } from "../../hooks";

const PAGE_SIZE = 10;

const Vectors = props => {
  const classes = useDataPageStyles();
  const query = useQuery();
  const {
    currentAddress,
    getSegments,
    addVectors,
    getVectors,
    deleteVectors,
    getVectorById
  } = useContext(httpContext);
  const { openSnackBar, setDialog } = useContext(materialContext);
  const { setRefresh } = useContext(dataManagementContext);

  const { collectionName, partitionTag } = useParams();
  const { t } = useTranslation();
  const vectorTrans = t("vector");

  const [data, setData] = useState([]);
  const [vectorOffset, setVectorOffset] = useState(0); // only for one segment
  const [segments, setSegments] = useState([]);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [count, setCount] = useState(0); // total count for pagination
  const [current, setCurrent] = useState(0); // current page for pagination
  const [direction, setDirection] = useState("next");
  const [segementStartPage, setSegementStartPage] = useState([0]); // store the start page, will minus when page change
  const fetchSegments = async () => {
    if (!currentAddress) return;
    try {
      const res = await getSegments(collectionName, {
        partition_tag: partitionTag,
        all_required: true
      });
      const firstSegment = res.segments[0];
      setSegments(res.segments || []);
      setCount(res.segments.reduce((pre, cur) => pre + cur.count, 0)); // get all vectors count
      setCurrentSegmentIndex(0);
      setVectorOffset(
        firstSegment.count || 0 - PAGE_SIZE > 0
          ? firstSegment.count - PAGE_SIZE
          : 0
      );
    } catch (e) {
      console.log(e);
    } finally {
      setRefresh(false);
    }
  };

  useEffect(() => {
    fetchSegments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAddress]);

  const { count: currentTotal, segment_name: segmentName } = useMemo(() => {
    return segments[currentSegmentIndex] || {};
  }, [segments, currentSegmentIndex]);

  const fetchVectors = async () => {
    const offset = vectorOffset < 0 ? 0 : vectorOffset;
    const pageSize = vectorOffset < 0 ? PAGE_SIZE + vectorOffset : PAGE_SIZE;
    const res = await getVectors(collectionName, segmentName, {
      offset,
      page_size: pageSize
    });
    const vectors = res.vectors || [];
    setData(v => {
      const newVectors = vectors.map(v => ({
        ...v,
        vector: JSON.stringify(v.vector)
      }));
      // if v.length < PAGE_SIZE means ,this time we fetch PAGESIZE - v.length count.
      // so we need to concat results
      return v.length < PAGE_SIZE ? [...v, ...newVectors] : newVectors;
    });

    const nextIndex =
      direction === "next" ? currentSegmentIndex + 1 : currentSegmentIndex - 1;
    const nextSegment = segments[nextIndex];

    // if vectorOffset < 0 and nextSegment exist means we need more data.
    if (vectorOffset < 0 && nextSegment) {
      setCurrentSegmentIndex(nextIndex);
      setVectorOffset(v => nextSegment.count + vectorOffset);
      setSegementStartPage(v => {
        const copy = [...v];
        copy[nextIndex] = current;
        return copy;
      });
    }
  };

  // fecth vectot by vectorOffset
  useEffect(() => {
    if (!segmentName || !vectorOffset) return;
    fetchVectors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vectorOffset]);

  const handlePageChange = (e, page) => {
    let offset = 0;
    // direction -> prev,current segment has no data ,so we need use prev segment
    if (page + 1 === segementStartPage[currentSegmentIndex]) {
      const curSegment = segments[currentSegmentIndex - 1];
      offset =
        curSegment.count -
        (page + 1 - segementStartPage[currentSegmentIndex - 1]) * PAGE_SIZE;
      setCurrentSegmentIndex(v => v - 1);
    } else {
      // current page start from 0 because we need store segementStartPage
      // that also make us need to page + 1
      offset =
        currentTotal -
        (page + 1 - segementStartPage[currentSegmentIndex]) * PAGE_SIZE;
    }

    console.log(page, offset);
    setVectorOffset(offset);
    setDirection(page > current ? "next" : "prev");
    setCurrent(page);
  };

  const handleDelete = async (e, selected) => {
    const ids = selected.map(v => v.id);
    await deleteVectors(collectionName, { delete: { ids } });
    fetchSegments();
    setCurrent(0);
    openSnackBar(t("deleteSuccess"));
  };

  const handleAddVectors = async vectors => {
    await addVectors(collectionName, {
      partition_tag: partitionTag,
      vectors
    });
    setTimeout(() => {
      openSnackBar(vectorTrans.importSuccess);
      fetchSegments();
      setCurrent(0);
    }, 1000);
  };
  const handleSearch = async id => {
    setCurrent(0);
    if (!id) {
      setData([]);
      fetchSegments();
      setCurrent(0);
      return;
    }
    const res = (await getVectorById(collectionName, { id })) || {};
    setData(res.vectors || []);
    setCount(1);
    setCurrent(0);
    setVectorOffset(null);
  };
  // const goToDivide = () => {
  //   setCurrent(1998)
  //   setVectorOffset(currentTotal - 1998 * PAGE_SIZE)
  // }
  const colDefinitions = [
    {
      id: "id",
      numeric: false,
      disablePadding: true,
      label: "ID"
    },
    {
      id: "vector",
      numeric: false,
      disablePadding: true,
      label: vectorTrans.vector
    }
  ];
  const dimension = query.get("dimension");
  const toolbarConfig = [
    {
      label: "Import vectors",
      icon: "create",
      // onClick: handleAddVectors,
      onClick: () =>
        setDialog({
          open: true,
          type: "custom",
          params: {
            component: (
              <ImportVectors
                dimension={dimension}
                importVectors={handleAddVectors}
                partitionTag={partitionTag}
              ></ImportVectors>
            )
          }
        }),
      disabled: false
    },
    {
      label: "Delete",
      icon: "delete",
      onClick: handleDelete,
      disabled: selected => selected.length === 0,
      disabledTooltip: "You can not delete this"
    },
    // {
    //   label: "Test",
    //   icon: "refresh",
    //   onClick: goToDivide,
    //   disabled: false,
    // },
    {
      label: "",
      icon: "search",
      searchText: "",
      onSearch: handleSearch,
      onClear: handleSearch
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
          title={[collectionName, partitionTag, "Vectors"]}
        ></MilvusGrid>
      </PageWrapper>
    </div>
  );
};

export default Vectors;
