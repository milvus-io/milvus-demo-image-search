import React, { useState, useContext } from "react";
import { Box, Text, Mask, Button, Image } from "gestalt";
import { makeStyles } from '@material-ui/styles';
import { rootContext } from '../../context/Root';
import PreviewItem from './PreviewItem';


const useStyles = makeStyles(theme => ({
  imgWrapper: {
    position: 'relative',
    height: '100%',
    width: '100%',

    '& img': {
      position: 'absolute',
      borderRadius: '16px',
      cursor: 'zoom-in'
    },
  },

  iconWrapper: {
    cursor: 'pointer',
    display: 'inline-block',
    height: '24px',
    width: '24px',
    position: 'absolute',
    bottom: '16px',
    right: '16px',
    fontSize: '18px',
    textAlign: 'center',
    lineHeight: '24px'
  },

  textWrapper: {
    fontSize: '16px',
    lineHeight: '18px',
    fontWeight: 500,
    color: '#010E29',
    textAlign: 'center',
    marginTop: '16px',

    '& .title': {
      color: '#82838E',
      fontWeight: 400,
      wordBreak: 'no-break'
    },

    '& .distance': {

    }
  }
}));

const Item = (props) => {
  const { setCustomDialog, closeCustomDialog } = useContext(rootContext);
  const classes = useStyles();

  const [hover, setHover] = useState(false);

  const mouseEnter = () => {
    setHover(true);
  };
  const mouseLeave = () => {
    setHover(false);
  };


  const handlePreview = (src, distance) => {
    setCustomDialog({
      open: true,
      component: <PreviewItem src={src} distance={distance} closeCustomDialog={closeCustomDialog} />,
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
      padding={2}
      className="ui-item"
      alignItems="center"
      // key={data.id}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <div className={classes.imgWrapper} onClick={() => handlePreview(props.data.src, props.data.distance)}>
        <Image
          alt="Test"
          color='#fff'
          naturalHeight={props.data.height}
          naturalWidth={props.data.width}
          src={props.data.src}
        />
        <span className={classes.iconWrapper} onClick={(e) => searchThisPic(e, props.data.src)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.25 15.75C13.7353 15.75 15.75 13.7353 15.75 11.25C15.75 8.76472 13.7353 6.75 11.25 6.75C8.76472 6.75 6.75 8.76472 6.75 11.25C6.75 13.7353 8.76472 15.75 11.25 15.75Z" stroke="#010E29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17.25 17.25L15 15" stroke="#010E29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="1" y="1" width="22" height="22" rx="7" stroke="black" strokeWidth="2" />
          </svg>
        </span>
      </div>
      {
        props.isSelected ?
          (
            <p className={classes.textWrapper}>
              <span className='title'>Similarity:</span>
              {props.data.distance}
            </p>
          ) : null
      }

      {/* {hover && (
        <Box size="sm" position="absolute" bottom right>
          <Button iconEnd="download" text="Download Resource file" inline />
        </Box>
      )} */}
    </Box>
  );
};

export default Item;
