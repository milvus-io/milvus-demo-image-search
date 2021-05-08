import React, { useState, useContext } from "react";
import { Box, Text, Mask, Button, Image } from "gestalt";
import { makeStyles } from '@material-ui/styles';
import { rootContext } from '../../context/Root';

const useStyles = makeStyles(theme => ({
  imgWrapper: {
    position: 'relative',
    height: '100%',
    width: '100%',

    '& .image': {
      position: 'absolute',
      borderRadius: '16px'
    },

    '& .icon-wrapper': {
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
    }
  },
  image: {
    position: 'absolute',
    borderRadius: '16px',
    cursor: 'zoom-in'
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
  }
}));

const Item = ({ data }) => {
  console.log(data);
  const { setDialog } = useContext(rootContext);
  const classes = useStyles();

  const [hover, setHover] = useState(false);

  const mouseEnter = () => {
    setHover(true);
  };
  const mouseLeave = () => {
    setHover(false);
  };

  const previewImage = (src) => {
    setDialog({
      open: true,
      params: {
        title: "preview",
        component: <img src={src} alt="image" />,
        confirm: () => { },
        cancel: () => { },
        confirmLabel: "Confirm",
        cancelLabel: "Concel",
      },
    });
  };

  const searchThisPic = () => {

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
      {/* <img
        alt="subliming.tumblr.com"
        src={data.src}
        fit="contain"
        style={{ maxWidth: "100%", display: "block" }}
        className={classes.image}
        onClick={() => previewImage(data.src)}
      /> */}
      <Image
        alt="Test"
        color='#fff'
        naturalHeight='100%'
        naturalWidth='100%'
        src={data.src}
      />
      <span className={classes.iconWrapper} onClick={searchThisPic}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.25 15.75C13.7353 15.75 15.75 13.7353 15.75 11.25C15.75 8.76472 13.7353 6.75 11.25 6.75C8.76472 6.75 6.75 8.76472 6.75 11.25C6.75 13.7353 8.76472 15.75 11.25 15.75Z" stroke="#010E29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17.25 17.25L15 15" stroke="#010E29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="1" y="1" width="22" height="22" rx="7" stroke="black" strokeWidth="2" />
        </svg>
      </span>
      <Text align="center">Similarity:{data.distance}</Text>
      {/* {hover && (
        <Box size="sm" position="absolute" bottom right>
          <Button iconEnd="download" text="Download Resource file" inline />
        </Box>
      )} */}
    </Box>
  );
};

export default Item;
