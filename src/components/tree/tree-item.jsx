
import React, { useRef } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { TreeItem } from '@material-ui/lab';
const useTreeItemStyles = makeStyles(theme => ({
  root: {
    color: '#fff',
    '&:focus > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content .MuiSvgIcon-root': {
      fill: 'var(--tree-view-color)',
    },
  },
  disabled: {
    color: "#fff",
    '&:focus > $content': {
      backgroundColor: 'transparent',
    },
    '& > $content': {
      cursor: "auto"
    }

  },
  active: {
    '& > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    '& > $content .MuiSvgIcon-root': {
      fill: 'var(--tree-view-color)',
    },

  },
  content: {
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));
function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon: LabelIcon, url, labelInfo, propsClick, propsRefresh, disabled, activeId, nodeId, labelRefresh: LabelRefresh, ...other } = props;
  const itemRef = useRef(null)
  const handleClick = e => {
    const { id, url, name } = itemRef.current.dataset
    propsClick(id, url, name)
  }
  const handleRefresh = () => {
    propsRefresh()
  }
  return (
    <TreeItem
      ref={itemRef}
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
          {
            LabelRefresh && <LabelRefresh onClick={handleRefresh}></LabelRefresh>
          }
        </div>
      }
      style={{
        '--tree-view-color': '#1a73e8',
        '--tree-view-bg-color': '#e8f0fe',
      }}
      data-id={nodeId}
      data-url={url}
      data-name={labelText}
      nodeId={nodeId}
      classes={{
        root: `${disabled ? classes.disabled : classes.root} ${activeId === nodeId && classes.active}`,
        content: classes.content,
        expanded: classes.expanded,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
      onClick={disabled ? () => { } : handleClick}
    />
  );
}

export default StyledTreeItem