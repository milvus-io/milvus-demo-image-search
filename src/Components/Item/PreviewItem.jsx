import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  previewContainer: {
    textAlign: 'right',
    overflow: 'hidden',
    background: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '& .icon-wrapper': {
      width: '24px',
      height: '24px',
      fontSize: '20px',
      textAlign: 'center',
      lineHeight: '24px',

      '& > svg > path,& > svg > rect': {
        stroke: "#fff"
      }
    },

  },


  imgContent: {
    maxWidth: '100%',
    // maxHeight: 'calc(100% - 34px)'
    maxHeight: 'calc(100% - 54px)',
    fontSize: 0,

    '& .img': {
      height: '100%',
      width: '100%'
    }
  },

  desc: {
    display: 'flex',
    justifyContent: 'space-between',
    color: "#fff",
    height: '34px',
    width: '100%',
    marginTop: '30px',
    padding: '0 30px',
    boxSizing: 'border-box',

    '& .text': {
      fontWeight: 700,
      color: "#fff",
    },

    '& .searc-btn': {
      display: 'flex',
    },

    '& .distance': {
      display: 'flex'
    }
  }

}));


const PreviewItem = ({ src, distance }) => {

  const classes = useStyles();

  return (
    <div className={classes.previewContainer}>
      {/* <div className={classes.closeBtn}>
        <p className="icon-wrapper">
          <CloseIcon />
        </p>
      </div> */}
      <div className={classes.imgContent}>
        <img src={src} alt="" className='img' />
      </div>

      <div className={classes.desc}>
        <div className="distance">
          <Typography variant='h5' >Similarity Metric:</Typography>
          <Typography variant='h5' className='text'>{distance}</Typography>
        </div>

        <div className="searc-btn">
          <span className="icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.25 15.75C13.7353 15.75 15.75 13.7353 15.75 11.25C15.75 8.76472 13.7353 6.75 11.25 6.75C8.76472 6.75 6.75 8.76472 6.75 11.25C6.75 13.7353 8.76472 15.75 11.25 15.75Z" stroke="#010E29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17.25 17.25L15 15" stroke="#010E29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="1" y="1" width="22" height="22" rx="7" stroke="black" strokeWidth="2" />
            </svg>
          </span>
          <Typography variant='h5' className='text' >Search</Typography>
        </div>

      </div>
    </div>
  );
};

export default PreviewItem;