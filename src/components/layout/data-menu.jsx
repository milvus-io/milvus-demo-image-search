import React, { useEffect, useContext, useState } from "react";
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
import { FiGrid, FiHardDrive, FiDatabase } from "react-icons/fi";
import { MdCallMade } from "react-icons/md";
import { AiOutlineNumber } from "react-icons/ai";
import {
  parseObjectToAssignKey,
  generateId,
  sliceWord
} from "../../utils/helpers";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { useQuery } from '../../hooks'
import { PARTITION_TAG, COLLECTION_NAME } from '../../consts'

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    padding: theme.spacing(2)
  }
}));

const DataMenu = props => {
  const classes = useStyles();
  const history = useHistory();
  const query = useQuery()
  const { getCollections, currentAddress, getPartitions } = useContext(
    httpContext
  );
  const {
    setRefresh,
    refresh,
    setAllCollections,
    allCollections,
    setCurrentPartitions
  } = useContext(dataManagementContext);

  const [collections, setCollections] = useState([]);
  const [total, setToltal] = useState(0);
  const [treeExpanded, setTreeExpanded] = useState(["1"]);
  const [treeActiveId, setTreeActiveId] = useState("");

  const { currentRoute } = props;

  const propertiesIconMap = {
    dimension: IoIosCube,
    metric_type: MdCallMade,
    count: AiOutlineNumber,
    index: IoMdFlash,
    nlist: IoLogoBuffer,
    index_file_size: FiHardDrive
  };

  const fetchCollections = async () => {

    const res = await getCollections({ all_required: true });
    const { collections = [], count = 0 } = res || {};
    const data = collections.map((col, i) => {
      const { collection_name, ...others } = col;
      const children = parseObjectToAssignKey(others, "label", "value").map(
        v => ({
          ...v,
          id: generateId(),
          icon: propertiesIconMap[v.label] || IoIosSettings,
          disabled: true
        })
      );
      return {
        label: sliceWord(collection_name),
        value: "",
        children,
        id: generateId(),
        icon: FiDatabase,
        dimension: col.dimension || 0,
        iconBtn: SearchIcon,
        needHover: true,
        url: `/data/collections/${collection_name}`,
        searchUrl: `/data/search?collectionName=${collection_name}`
      };
    });
    setAllCollections(collections);
    setToltal(count);
    setCollections(data);
    setRefresh(false);
  };

  useEffect(() => {
    if (!currentAddress) return;
    fetchCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAddress]);

  // when right content crud collection/index/partion will refresh the menu
  useEffect(() => {
    if (!refresh) return;
    fetchCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  // when in collection / partition page . if we dont havt partition data , fetch it
  useEffect(() => {
    const { page, collectionName } = currentRoute;
    const target = collections.find(col => col.label === collectionName);
    const hasPartition = target && target.loaded;
    const needFetchPartition =
      !hasPartition && (page === "collection" || page === "partition" || (page === 'search'));

    needFetchPartition && fetchPartitions(page === 'search' ? query.get(COLLECTION_NAME) : collectionName);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(collections)]);


  // set menu active and expand status by url
  useEffect(() => {
    const { page, collectionName, partitionTag } = currentRoute;
    const target = collections.find(col => col.label === collectionName);
    console.log(page);
    switch (page) {
      case 'search':
        const searchCollectionName = query.get(COLLECTION_NAME)
        const searchPartitionTag = query.get(PARTITION_TAG)
        const searchTarget = collections.find(col => col.label === searchCollectionName);
        console.log(searchCollectionName)
        const searchPartitionTarget =
          searchTarget &&
          searchTarget.children &&
          searchTarget.children.find(child => child.label === searchPartitionTag);
        if (searchPartitionTarget) {
          setTreeExpanded(["1", searchTarget.id]);
          setTreeActiveId(searchPartitionTarget.id);
        } else {
          setTreeActiveId(searchTarget ? searchTarget.id : '1');
        }
        break
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

  const fetchPartitions = async collectionName => {
    console.log("fetch----partition");
    const target = collections.find(col => col.label === collectionName);

    // already fetch partitions
    if (!target || target.loaded) {
      return;
    }
    const res = await getPartitions(collectionName, { all_required: true });
    const { partitions } = res;
    const data = partitions.map(v => {
      const label = sliceWord(v.partition_tag);
      return {
        label,
        value: "",
        id: generateId(),
        icon: FiGrid,
        // iconBtn: SearchIcon,
        // needHover: true,
        url: `/data/collections/${collectionName}/partitions/${label}?dimension=${target.dimension}`,
        // searchUrl: `/data/search?collectionName=${collectionName}&partitionTag=${label}`
      };
    });
    setCollections(collections => {
      return collections.map(col => {
        if (col.label === collectionName) {
          col.children = [...col.children, ...data];
          col.loaded = true;
        }
        return col;
      });
    });
    const parent =
      allCollections.find(v => v.collection_name === collectionName) || [];
    console.log(allCollections)
    // partitions page will use it.
    setCurrentPartitions(
      partitions.map(v => ({
        ...v,
        ...parent
      }))
    );
  };
  const handleMenuClick = (url, collectionName, id) => {
    id !== "1" && fetchPartitions(collectionName);
    url && history.push(url);
  };
  const handleRefresh = () => {
    setRefresh(true);
    fetchCollections();
  };
  const handleSearchVectors = (url, id) => {
    url && history.push(url)
    setTreeActiveId(id);
  }

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
      ></TreeView>
    </div>
  );
};

export default DataMenu;
