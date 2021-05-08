import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  linkWrapper: {
    textDecoration: 'none',
    display: 'inline-block',
    height: '24px',
    width: '24px',
    textAlign: 'center',
    lineHeight: '24px',
    boxSizing: 'border-box',
    padding: '3px',
    '&:not(:last-child)': {
      marginRight: '18px'
    },

    '& img': {
      width: '18px',
      height: '18px'
    }
  },
  btnWrapper: {
    display: 'inline-block',
    height: '24px',
    width: '24px'
  }
}));

const IconButton = props => {
  const classes = useStyles();

  const {
    type = "link",
    href = "",
    onClick = () => { },
    classname = "",
  } = props;

  return (
    <>
      {type === "link" ? (
        <a href={href} className={`${classes.linkWrapper} ${classname}`}>
          {props.children}
        </a>
      ) : (
        <button className={`${classes.btnWrapper} ${classname}`} onClick={onClick}>
          {props.children}
        </button>
      )}
    </>
  );
};

export default IconButton;