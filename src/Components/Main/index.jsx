import React, { useEffect, useState, useRef, useCallback } from "react";
import { Masonry, Spinner } from "gestalt";
import { CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import Item from "../Item";

const useStyles = makeStyles(theme => ({
  scrollContainer: {
    overflow: 'auto',
    height: 'calc(100vh - 435px)',
    marginTop: '32px',
    position: 'relative',

    '&.open': {
      width: '100%'
    },

    '& .loading-wrapper': {
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  },

  imgContainer: {
    marginTop: '34px',
    '&.open': {
      width: '50%'
    }
  },

  toopTip: {
    display: 'flex',
    alignItems: 'center',
    visibility: 'hidden',
    position: 'absolute',
    zIndex: -1,

    '&.open': {
      visibility: 'visible',
      zIndex: 1
    },

    '& .icon-wrapper': {
      display: 'inline-block',
      height: '26px',
      width: '26px',
      lineHeight: '30px',
      fontSize: '16px',
      marginLeft: '8px',
      textAlign: 'center',
      cursor: 'pointer',
      borderRadius: '50%',
      position: 'relative',

      '&:hover': {
        background: '#E9E9ED',
        '&::after': {
          visibility: 'visible',
          opacity: 1,
        }
      },

      '&::after': {
        content: '"how picture sorted by"',
        background: '#232F34',
        borderRadius: '4px',
        padding: '5px 10px',
        fontSize: '12px',
        lineHeight: '14px',
        color: '#fff',
        position: 'absolute',
        visibility: 'hidden',
        opacity: 0,
        left: 0,
        top: '42px',
        whiteSpace: 'nowrap',
      },

      '& svg': {
        fontSize: '16px'
      }
    },

  }
}));

function Main({ pins, loadItems, loading, isSelected, minCols, isShowCode, handleSearch }) {
  const classes = useStyles();

  const scrollContainer = useRef(null);



  return (
    <div className={`${classes.scrollContainer} ${isShowCode ? 'open' : ''}`} ref={scrollContainer}>

      <div className={`${classes.toopTip} ${isSelected ? 'open' : ''}`}>
        <Typography variant='body2' className="text">Sorted by Similarity metric</Typography>
        <span className="icon-wrapper">
          <ErrorOutlineIcon />
        </span>

      </div>

      <div className={`${classes.imgContainer} ${isShowCode ? '' : ''}`}>
        {
          pins.length ? <Masonry
            columnWidth={295}
            virtualize={true}
            comp={({ data }) => (
              <Item
                data={data}
                isSelected={isSelected}
                handleSearch={handleSearch}
              />
            )}
            items={pins}
            gutterWidth={0}
            loadItems={loadItems}
            scrollContainer={() => scrollContainer.current}
            minCols={minCols}
          ></Masonry> : null
        }
      </div>
      {
        loading ? (
          <div className="loading-wrapper">
            <CircularProgress />
          </div>
        ) : null
      }

    </div>
  );
}

export default Main;
