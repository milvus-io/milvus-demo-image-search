import React, { useState } from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';
import { TreeView } from '@material-ui/lab';
import { ArrowDropDown, ArrowRight } from '@material-ui/icons';
import { AiOutlineTable } from 'react-icons/ai'

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
  const { data, total, handleMenuClick } = props
  const [activeId, setAcitveId] = useState('')
  const [expanded, setExpanded] = useState(['1'])
  const handleClick = (nodeId, url, name) => {
    setAcitveId(nodeId || '')
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
    const copy = [...nodeIds]
    // only allow one child open
    copy.length > 2 && copy.splice(1, 1)
    setExpanded(copy)
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
        labelText="Collections"
        labelInfo={total}
        labelIcon={AiOutlineTable}
        activeId={activeId}
        propsClick={handleClick}
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