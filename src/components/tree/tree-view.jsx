import React from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';
import { TreeView } from '@material-ui/lab';
import { ArrowDropDown, ArrowRight } from '@material-ui/icons';
import { IoMdRefresh } from 'react-icons/io'
import { MdStorage } from 'react-icons/md';

import StyledTreeItem from './tree-item'

const useStyles = makeStyles(theme => ({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
    '& .MuiTreeItem-iconContainer': {
      color: "#fff"
    }
  },
  loadingWrapper: {
    textAlign: "center",
    marginTop: theme.spacing(2)
  }

}));

/**
 * 
 * @param {*} props data:[{label:'',value:"",id:"",icon:"",children:[{label:"",value}]}]
 */
const StyledTreeView = props => {
  const classes = useStyles();
  const { data, total, handleMenuClick, handleRefresh = () => { }, handleSearchVectors = () => { }, expanded, setExpanded, activeId, loading = false } = props
  const handleClick = (nodeId, url, name) => {
    // setAcitveId(nodeId || '')
    handleMenuClick(url, name, nodeId)
  }
  const generateTreeItem = (data) => {
    return data.map(v => {
      const comp = <StyledTreeItem
        key={`${v.id}`}
        nodeId={`${v.id}`}
        labelText={v.label}
        labelIcon={v.icon}
        labelInfo={v.value}
        disabled={v.disabled}
        url={v.url}
        searchUrl={v.searchUrl}
        propsClick={handleClick}
        activeId={activeId}
        iconBtn={v.iconBtn || false}
        needHover={v.needHover || false}
        propsIconBtnClick={handleSearchVectors}
      >
        {
          v.children && v.children.length && generateTreeItem(v.children)
        }
      </StyledTreeItem>
      return comp
    })
  }

  const handleNodeToggle = (e, nodeIds) => {
    console.log(nodeIds)
    const copy = nodeIds.filter((v, i) => {
      // the newer
      if (i === 0) {
        return true
      }
      // collections 
      if (v === '1') {
        return true
      }
      // the older
      return false
    })
    setExpanded(copy.length ? copy : ['1'])
  }

  return (
    <TreeView
      className={classes.root}
      expanded={expanded}
      defaultCollapseIcon={<ArrowDropDown />}
      defaultExpandIcon={<ArrowRight />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      onNodeToggle={handleNodeToggle}
    >
      <StyledTreeItem
        nodeId="1"
        labelText={`Collections(${total})`}
        iconBtn={IoMdRefresh}
        labelIcon={MdStorage}
        activeId={activeId}
        propsClick={handleClick}
        propsIconBtnClick={handleRefresh}
        needHover={true}
        url="/data/collections"
      >
        {
          loading
            ? (<div className={classes.loadingWrapper}><CircularProgress size={30}></CircularProgress></div>)
            : generateTreeItem(data)
        }
      </StyledTreeItem>
    </TreeView>
  );
}

export default StyledTreeView