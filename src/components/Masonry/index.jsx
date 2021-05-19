import React, { useRef } from "react";
import { Masonry } from "gestalt";
import { CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { useMobileScreen } from '../../hooks';

import Item from "../Item";

const useStyles = makeStyles(theme => ({
  scrollContainer: {
    overflow: 'auto',
    height: '100%',
    position: 'relative',
    marginTop: '34px',

    [theme.breakpoints.down('sm')]: {
      marginTop: '16px'
    },

    '&.openCode': {
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
    marginTop: '32px'
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
        [theme.breakpoints.down('sm')]: {
          top: '34px',
        },
      },

      '& svg': {
        fontSize: '16px'
      }
    },

  }
}));

function Main({ pins, loadItems, loading, isSelected, isShowCode, handleSearch }) {
  const classes = useStyles();
  const { isMobile } = useMobileScreen();
  const scrollContainer = useRef(null);

  return (
    <div className={`${classes.scrollContainer} ${isShowCode ? 'openCode' : ''}`} ref={scrollContainer}>
      <div className={`${classes.toopTip} ${isSelected ? 'open' : ''}`}>
        <Typography variant='body1' component="p" className="text">Sorted by Similarity metric</Typography>
        <span className="icon-wrapper">
          <ErrorOutlineIcon />
        </span>
      </div>
      <div className={`${classes.imgContainer} ${isShowCode ? '' : ''}`}>
        {
          pins.length ? <Masonry
            columnWidth={isMobile ? 154 : 290}
            virtualize={true}
            comp={({ data }) => (
              <Item
                data={data}
                isSelected={isSelected}
                handleSearch={handleSearch}
              />
            )}
            items={pins}
            gutterWidth={16}
            loadItems={loadItems}
            scrollContainer={() => scrollContainer.current}
            minCols={2}
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
