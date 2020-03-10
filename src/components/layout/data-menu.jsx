import React, { useEffect, useContext, useState, useMemo } from "react";
import TreeView from "../tree/tree-view";
import { makeStyles } from "@material-ui/core/styles";
import { httpContext } from "../../context/http";
import { dataManagementContext } from "../../context/data-management";
import {
  IoIosSettings,
  IoMdFlash,
  IoLogoBuffer,
  IoIosCube
} from "react-icons/io";
import { FiGrid, FiHardDrive, FiDatabase, FiPlus } from "react-icons/fi";
import { MdCallMade } from "react-icons/md";
import { AiOutlineNumber } from "react-icons/ai";
import {
  parseObjectToAssignKey,
  generateId,
} from "../../utils/helpers";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { useQuery } from "../../hooks";
import { PARTITION_TAG, COLLECTION_NAME } from "../../consts";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    padding: theme.spacing(2)
  }
}));

const PAGE_SIZE = 10;

const DataMenu = props => {
  const classes = useStyles();
  const history = useHistory();
  const query = useQuery();
  const {
    getCollections,
    currentAddress,
    getPartitions,
    searchCollection
  } = useContext(httpContext);
  const { setRefresh, refresh } = useContext(dataManagementContext);

  const [collections, setCollections] = useState([]);
  const [total, setToltal] = useState(0);
  const [treeExpanded, setTreeExpanded] = useState(["1"]);
  const [treeActiveId, setTreeActiveId] = useState("");
  const [collectionOffset, setCollectionOffset] = useState(0);
  const [collectionCurrentPage, setCollectionCurrentPage] = useState(0);
  const [partitionCurrentPage, setPartitionCurrentPage] = useState(0);
  const [searchedCollection, setSearchedCollection] = useState(0); // when refresh page ,collection may not in first page, search it,and filter in the furture page
  const { currentRoute } = props;
  const { page, collectionName, partitionTag } = currentRoute;

  const propertiesIconMap = {
    dimension: IoIosCube,
    metric_type: MdCallMade,
    count: AiOutlineNumber,
    index: IoMdFlash,
    nlist: IoLogoBuffer,
    index_file_size: FiHardDrive
  };

  const fetchCollections = async isRefresh => {
    // const res = await getCollections({ all_required: true });
    const res = await getCollections({
      page_size: PAGE_SIZE,
      offset: collectionOffset
    });

    const { collections = [], count = 0 } = res || {};

    const data = collections
      .map(col => formatCollection(col))
      .filter(v => v.label !== searchedCollection);

    setToltal(count);
    setCollections(v => (isRefresh ? data : [...v, ...data]));
    setRefresh(false);
  };

  const getSingleCollection = async name => {
    const res = (await searchCollection(name)) || {};
    const data = formatCollection(res);
    setCollections(v => [...v, data]);
    setSearchedCollection(name);
  };

  const formatCollection = collection => {
    const { collection_name, ...others } = collection;
    const attributeCount = Object.keys(others).length
    const children = parseObjectToAssignKey(others, "label", "value").map(
      v => ({
        ...v,
        id: generateId(),
        icon: propertiesIconMap[v.label] || IoIosSettings,
        disabled: true
      })
    );
    return {
      label: collection_name,
      value: "",
      children,
      isCollection: true,
      id: generateId(),
      icon: FiDatabase,
      dimension: collection.dimension || 0,
      iconBtn: SearchIcon,
      needHover: true,
      url: `/data/collections/${collection_name}`,
      searchUrl: `/data/search?collectionName=${collection_name}`,
      attributeCount // collection count of attributes for compute the total partitions
    };
  };

  const reset = () => {
    setCollectionOffset(0);
    setCollectionCurrentPage(0);
  };

  useEffect(() => {
    if (!currentAddress) return;
    reset();
    fetchCollections(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAddress]);

  // when right content crud collection/index/partion will refresh the menu
  useEffect(() => {
    if (!refresh) return;
    reset();
    fetchCollections(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  // when offset change get more collections
  useEffect(() => {
    if (!currentAddress || !collectionOffset) return;
    fetchCollections(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionOffset]);

  // when in collection / partition page . if we dont havt partition data , fetch it
  useEffect(() => {
    const target = collections.find(col => col.label === collectionName);
    if (collectionName && !target) {
      getSingleCollection(collectionName);
      return;
    }
    const hasPartition = target && target.loaded;
    const needFetchPartition =
      !hasPartition &&
      (page === "collection" || page === "partition" || page === "search");

    needFetchPartition &&
      fetchPartitions(
        page === "search" ? query.get(COLLECTION_NAME) : collectionName
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(collections)]);

  // set menu active and expand status by url
  useEffect(() => {
    const target = collections.find(col => col.label === collectionName);
    switch (page) {
      case "search":
        const searchCollectionName = query.get(COLLECTION_NAME);
        const searchPartitionTag = query.get(PARTITION_TAG);
        const searchTarget = collections.find(
          col => col.label === searchCollectionName
        );
        const searchPartitionTarget =
          searchTarget &&
          searchTarget.children &&
          searchTarget.children.find(
            child => child.label === searchPartitionTag
          );
        if (searchPartitionTarget) {
          setTreeExpanded(["1", searchTarget.id]);
          setTreeActiveId(searchPartitionTarget.id);
        } else {
          setTreeActiveId(searchTarget ? searchTarget.id : "1");
        }
        break;
      case "collections":
        // collections id is 1 , hard code
        setTreeExpanded(["1"]);
        setTreeActiveId("1");
        break;
      case "collection":
        if (target) {
          setTreeExpanded(["1", target.id]);
          setTreeActiveId(target.id);
        }
        break;
      case "partition":
        const partitionTarget =
          target &&
          target.children &&
          target.children.find(child => child.label === partitionTag);
        if (partitionTarget) {
          setTreeExpanded(["1", target.id]);
          setTreeActiveId(partitionTarget.id);
        }
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoute, collections]);

  const loadedAllCollection = useMemo(() => collections.length === total, [
    collections,
    total
  ]);

  const fetchPartitions = async (collectionName, offset) => {
    const target = collections.find(col => col.label === collectionName);

    if (!target) {
      return;
    }
    // const res = await getPartitions(collectionName, { all_required: true });
    const res = await getPartitions(collectionName, {
      page_size: PAGE_SIZE,
      offset,
      from: "data-menu"
    });

    let { partitions, count } = res;
    partitions = partitions.filter(
      v => !target.children.find(child => child.label === v.partition_tag)
    );
    // when refresh page push the route tag to data
    if (partitionTag && !partitions.find(child => child.partition_tag === partitionTag) && !target.children.find(child => child.label === partitionTag)) {
      partitions.push({ partition_tag: partitionTag })
    }

    const data = partitions.map(v => {
      const label = v.partition_tag;
      return {
        label,
        value: "",
        id: generateId(),
        icon: FiGrid,
        // iconBtn: SearchIcon,
        // needHover: true,
        url: `/data/collections/${collectionName}/partitions/${label}?dimension=${target.dimension}`
        // searchUrl: `/data/search?collectionName=${collectionName}&partitionTag=${label}`
      };
    });

    const moreChild = {
      label: "More Partitions",
      value: "",
      id: generateId(),
      icon: FiPlus,
      moreType: "partitions"
    };

    setCollections(collections => {
      return collections.map(col => {
        if (col.label === collectionName) {
          col.children = col.children.filter(
            col => col.label !== "More Partitions"
          );
          const loadedAll =
            data.length +
            col.children.length -
            col.attributeCount ===
            count;

          col.children = [...col.children, ...data];
          !loadedAll && col.children.push(moreChild);
          col.loaded = true;
          col.partitonPage = partitionCurrentPage;
          col.partitionOffset = offset;
        }
        return col;
      });
    });
  };
  const handleMenuClick = (url, collectionName, id, more) => {
    if (more === "partitions") {
      handleMorePatition();
      return;
    }
    if (more === "collections") {
      handleMoreCollection();
      return;
    }
    if (id !== "1" && id !== treeActiveId) {
      const target =
        collections.find(col => col.label === collectionName) || {};

      setPartitionCurrentPage(target.partitonPage || 0);

      fetchPartitions(collectionName, target.partitionOffset || 0);
    }

    url && history.push(url);
  };
  const handleRefresh = () => {
    setRefresh(true);
    fetchCollections();
  };
  const handleSearchVectors = (url, id) => {
    url && history.push(url);
    setTreeActiveId(id);
  };

  const handleMoreCollection = () => {
    const nextPage = collectionCurrentPage + 1;
    setCollectionCurrentPage(nextPage);
    setCollectionOffset(nextPage * PAGE_SIZE);
  };

  const handleMorePatition = () => {
    const nextPage = partitionCurrentPage + 1;
    setPartitionCurrentPage(nextPage);
    fetchPartitions(collectionName, nextPage * PAGE_SIZE);
  };
  return (
    <div className={classes.root}>
      <TreeView
        data={collections}
        total={total}
        handleMenuClick={handleMenuClick}
        handleRefresh={handleRefresh}
        handleSearchVectors={handleSearchVectors}
        expanded={treeExpanded}
        setExpanded={setTreeExpanded}
        activeId={treeActiveId}
        setActiveId={setTreeActiveId}
        loadedAllCollection={loadedAllCollection}
      ></TreeView>
    </div>
  );
};

export default DataMenu;
