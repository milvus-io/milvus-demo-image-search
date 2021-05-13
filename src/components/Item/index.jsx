import React, { useContext } from "react";
import { Box, Image } from "gestalt";
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { rootContext } from '../../context/Root';
import PreviewItem from './PreviewItem';


const useStyles = makeStyles(theme => ({
  imgWrapper: {
    position: 'relative',
    height: '100%',
    width: '100%',

    '&:hover': {
      '& .icon-mask': {
        transform: 'translateY(0)',
        visibility: 'visible'
      }
    },

    '& img': {
      position: 'absolute',
      borderRadius: '16px',
      cursor: 'zoom-in',
    },

    '& .icon-mask': {
      width: '100%',
      textAlign: 'right',
      padding: theme.spacing(0, 2),
      position: 'absolute',
      bottom: '0px',
      right: '0px',
      visibility: 'hidden',
      background: 'rgba(0, 0, 0, 0.3)',
      transition: 'all .1s ease-in-out',
      boxSizing: 'border-box',
      height: '40px',
      transform: 'translateY(-40px)',
      borderRadius: '0 0 16px 16px',
    }
  },

  iconWrapper: {
    cursor: 'pointer',
    display: 'inline-block',
    height: '24px',
    width: '24px',
    fontSize: '18px',
    textAlign: 'center',
    lineHeight: '24px',
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    // transform: 'translateY(-50%)',
    // '& > svg > path,& > svg > rect': {
    //   stroke: "#fff"
    // }
  },

  textWrapper: {
    fontSize: '16px',
    lineHeight: '18px',
    fontWeight: 500,
    color: '#010E29',
    textAlign: 'center',
    marginTop: theme.spacing(1),
    display: 'flex',

    [theme.breakpoints.down('sm')]: {
      display: 'block',
      marginTop: theme.spacing(1),
      textAlign: 'left',
    },

    '& .title': {
      color: '#82838E',
      wordBreak: 'keep-all'
    },

    '& .distance': {

    }
  }
}));

const Item = (props) => {
  const { setCustomDialog, closeCustomDialog } = useContext(rootContext);
  const classes = useStyles();

  const handlePreview = (src, distance) => {
    setCustomDialog({
      open: true,
      component: <PreviewItem src={src} distance={distance} closeCustomDialog={closeCustomDialog} handleSearch={props.handleSearch} />,
      onClose: closeCustomDialog
    });
  };

  const searchThisPic = (e, src) => {
    e.stopPropagation();
    props.handleSearch(src);
  };

  return (
    <Box
      position="relative"
      className="ui-item"
      alignItems="center"
      // key={data.id}
      fit={true}
      padding={0}
    >
      <div className={classes.imgWrapper} onClick={() => handlePreview(props.data.src, props.data.distance)} draggable="true">
        <Image
          alt="Test"
          color='#fff'
          naturalHeight={props.data.height}
          naturalWidth={props.data.width}
          src={props.data.src}

        />

        {/* <div className="icon-mask"> */}
        <span className={classes.iconWrapper} onClick={(e) => searchThisPic(e, props.data.src)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.25 15.75C13.7353 15.75 15.75 13.7353 15.75 11.25C15.75 8.76472 13.7353 6.75 11.25 6.75C8.76472 6.75 6.75 8.76472 6.75 11.25C6.75 13.7353 8.76472 15.75 11.25 15.75Z" stroke="#010E29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17.25 17.25L15 15" stroke="#010E29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="1" y="1" width="22" height="22" rx="7" stroke="black" strokeWidth="2" />
          </svg>
        </span>
        {/* </div> */}

      </div>
      {
        props.isSelected ?
          (
            <div className={classes.textWrapper}>
              <Typography variant="body1" className='title'>Similarity Metirc:&nbsp;&nbsp;</Typography>
              <Typography variant="h5" className='title'>{props.data.distance}</Typography>
            </div>
          ) : null
      }
    </Box>
  );
};

export default Item;
