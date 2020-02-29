import React, { useState } from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';
import { TreeView } from '@material-ui/lab';
import { ArrowDropDown, ArrowRight } from '@material-ui/icons';
import { AiOutlineTable } from 'react-icons/ai'
import { IoMdRefresh } from 'react-icons/io'

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
  const { data, total, handleMenuClick, handleRefresh, expanded, setExpanded, activeId, setAcitveId } = props
  const handleClick = (nodeId, url, name) => {
    // setAcitveId(nodeId || '')
    handleMenuClick(url, name, nodeId)
  }
  console.log(data)
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
        propsClick={handleClick}
        activeId={activeId}
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
        labelRefresh={IoMdRefresh}
        labelIcon={AiOutlineTable}
        activeId={activeId}
        propsClick={handleClick}
        propsRefresh={handleRefresh}
        url="/data/collections?tabName=collections"
      >
        {
          data.length
            ? generateTreeItem(data)
            : (<div className={classes.loadingWrapper}><CircularProgress size={30}></CircularProgress></div>)
        }
      </StyledTreeItem>
    </TreeView>
  );
}

export default StyledTreeView