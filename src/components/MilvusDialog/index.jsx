import React, { useContext } from "react";
import { Typography, makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { rootContext } from "../../context/Root";
import github from "../../assets/images/github.svg";
import slack from "../../assets/images/slack.svg";
import bird from "../../assets/images/bird.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "500px",
    background: "#fff",
    maxWidth: "600px",
    borderRadius: "15px 0",
    padding: theme.spacing(3, 3, 6),
    margin: "0 auto",
    position: 'relative',

    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      padding: theme.spacing(2, 2, 3),
      width: "100%",
      boxSizing: "border-box",
    },
    boxShadow: "10px 20px 50px rgba(0, 0, 0, 0.15)",

    "& .MuiPaper-root": {
      backgroundColor: "transparent",
    },
  },
  iconWrapper: {
    width: "24px",
    height: "24px",
    cursor: "pointer",
    display: 'inline-block',
    position: 'absolute',
    right: theme.spacing(5),
    top: theme.spacing(5),

    [theme.breakpoints.down('sm')]: {
      right: theme.spacing(3),
      top: theme.spacing(3),
    },

    "& svg": {
      fontSize: "24px",
      color: "#06aff2",
      pointerEvents: "none",
    },
  },
  contentWrapper: {
    textAlign: 'center',

    '& .img-wrapper': {

    },

    '& .text-wrapper': {
      marginTop: theme.spacing(1),

      '& .title': {
        fontWeight: 700,
        color: '#1BA954',
        marginBottom: theme.spacing(2)
      }
    }
  },
  btnsWrapper: {
    display: 'flex',
    marginTop: theme.spacing(3),

    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    },

    '& img': {
      width: theme.spacing(4),
      height: theme.spacing(4),
      marginBottom: theme.spacing(2),

      [theme.breakpoints.down('sm')]: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        marginBottom: theme.spacing(1),
      },
    },

    '& a': {
      textDecoration: 'none',
      color: '#fff',
      padding: '10px 20px',
      fontSize: '24px',
      lineHeight: '28px',
      background: '#06aff2',
      borderRadius: '4px',
      display: 'inline-block',

      [theme.breakpoints.down('sm')]: {
        fontSize: '16px',
        lineHeight: '20px',
        padding: '5px 10px',
      }
    },

    '& .icon-button': {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }
}));

const RegisterForm = () => {
  const classes = useStyles();
  const { hideDialog } = useContext(rootContext);

  const handleHideDialog = () => {
    hideDialog();
  };

  return (
    <div className={classes.root}>

      <span className={classes.iconWrapper} onClick={handleHideDialog}>
        <CloseIcon />
      </span>


      <div className={classes.contentWrapper}>
        <div className="img-wrapper">
          <img src={bird} alt="milvus-logo" />
        </div>
        <div className="text-wrapper">
          <Typography variant='h4' className='title'>Let’s try milvus out!</Typography>
          <Typography variant="h3">Get started with Milvus source code</Typography>
          <Typography variant="h3">or</Typography>
          <Typography variant="h3">Join our community:</Typography>
        </div>
      </div>
      <div className={classes.btnsWrapper}>
        <div className='icon-button'>
          <img src={github} alt="github-logo" />
          <a href="https://github.com/milvus-io/bootcamp">Milvus Github</a>
        </div>
        <div className='icon-button'>
          <img src={slack} alt="slack-logo" />
          <a href="https://milvusio.slack.com/archives/C01U7SWQD0C">Join Channel</a>
        </div>

      </div>



    </div>
  );
};

export default RegisterForm;
