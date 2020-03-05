import {
  makeStyles
} from "@material-ui/core";

const scrollStyle = {
  '&::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },

  /*滑块*/
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px'
  },

  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  },

  /*滑道*/
  '&::-webkit-scrollbar-track': {
    borderRadius: '10px'
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  left: {
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing(8)}px ${theme.spacing(1)}px`,
    height: "100vh",
    backgroundColor: "rgb(27, 36, 48)"
  },
  icon: {
    marginBottom: theme.spacing(4),
    fontSize: "30px",
    fill: "rgb(238, 238, 238)",
    cursor: "pointer",
    '&:hover': {
      fill: theme.palette.primary.main
    }
  },
  active: {
    fill: theme.palette.primary.main
  },
  menuWrapper: {
    flex: " 0 0 270px",
    backgroundColor: "rgb(35, 47, 62)",
    color: "rgb(238, 238, 238)",
    "& .logo-wrapper": {
      padding: `${theme.spacing(2)}px 0 0 ${theme.spacing(2)}px`,
      width: "120px"
    }
  },
  logoutWrapper: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    "& .circle": {
      display: "inline-block",
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      background: theme.palette.success.main
    },
    "& > span": {
      marginRight: theme.spacing(2),
      fontWeight: "bold"
    },
    "& .icon": {
      cursor: "pointer"
    }
  },
  menuContent: {
    height: "calc(100% - 140px)",
    overflow: "auto",
    ...scrollStyle
  },
  content: {
    position: "relative",
    flex: 1,
    height: "100vh",
    overflowY: "scroll",
  }
}));

export default useStyles