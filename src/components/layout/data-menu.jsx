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

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    padding: theme.spacing(2)
  }
}));

const DataMenu = props => {
  const classes = useStyles();
  const history = useHistory();
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
    console.log("---fetch ---- collections");

    const res = await getCollections({ all_required: true });
    const { tables: collections = [], count = 0 } = res || {};
    const data = collections.map((col, i) => {
      const { table_name, ...others } = col;
      const children = parseObjectToAssignKey(others, "label", "value").map(
        v => ({
          ...v,
          id: generateId(),
          icon: propertiesIconMap[v.label] || IoIosSettings,
          disabled: true
        })
      );
      return {
        label: sliceWord(table_name),
        value: "",
        children,
        id: generateId(),
        icon: FiDatabase,
        dimension: col.dimension || 0,
        url: `/data/collections/${table_name}`
      };
    });
    setToltal(count);
    setCollections(v => data);
    setAllCollections(collections);
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
      !hasPartition && (page === "collection" || page === "partition");
    needFetchPartition && fetchPartitions(collectionName);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(collections)]);

  // set menu active and expand status by url
  useEffect(() => {
    const { page, collectionName, partitionTag } = currentRoute;
    const target = collections.find(col => col.label === collectionName);
    console.log(page);
    switch (page) {
      case "collections":
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
        url: `/data/collections/${collectionName}/partitions/${label}?dimension=${target.dimension}`
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
      allCollections.find(v => v.table_name === collectionName) || [];
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

  return (
    <div className={classes.root}>
      <TreeView
        data={collections}
        total={total}
        handleMenuClick={handleMenuClick}
        handleRefresh={handleRefresh}
        expanded={treeExpanded}
        setExpanded={setTreeExpanded}
        activeId={treeActiveId}
        setActiveId={setTreeActiveId}
      ></TreeView>
    </div>
  );
};

export default DataMenu;
