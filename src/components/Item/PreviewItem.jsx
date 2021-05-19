import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { rootContext } from '../../context/Root';
import { useMobileScreen } from '../../hooks';
import blackSearch from '../../assets/images/search-black';

const useStyles = makeStyles(theme => ({
  previewContainer: {
    textAlign: 'right',
    overflow: 'hidden',
    background: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {

    },

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
    borderRadius: '16px',
    overflow: 'hidden',
    maxHeight: 'calc(100% - 54px)',
    fontSize: 0,
    position: 'relative',

    '& .img': {
      height: '100%',
      width: '100%'
    },

    '& .search-icon': {
      position: 'absolute',
      right: '16px',
      bottom: '16px'
    }
  },

  desc: {
    display: 'flex',
    justifyContent: 'space-between',
    color: "#fff",
    height: '34px',
    width: '100%',
    marginTop: '30px',
    boxSizing: 'border-box',

    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1),
    },

    '& .text': {
      fontWeight: 700,
      color: "#fff",
      textAlign: 'left'
    },

    '& .searc-btn': {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',


      '& .searc-btn, & .text': {
        pointerEvents: 'none'
      }
    },

    '& .distance': {
      display: 'flex',
      alignItems: 'center',

      [theme.breakpoints.down('sm')]: {
        display: 'block',
      }
    }
  }

}));


const PreviewItem = ({ src, distance, handleSearch }) => {
  const { closeCustomDialog } = useContext(rootContext);
  const { isMobile } = useMobileScreen();
  const classes = useStyles();
  const handleClickSearch = () => {
    handleSearch(src);
    closeCustomDialog();
  };

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
          <Typography variant='body1' >Similarity Metric:</Typography>
          <Typography variant='body1' className='text'>{distance}</Typography>
        </div>


        <div className="searc-btn" onClick={handleClickSearch}>
          <span className="icon-wrapper">
            <img src={blackSearch} alt="search-icon" />
          </span>
          {
            !isMobile ? (
              <Typography variant='h5' className='text' >&nbsp;&nbsp;Search</Typography>
            ) : null
          }

        </div>

      </div>
    </div>
  );
};

export default PreviewItem;