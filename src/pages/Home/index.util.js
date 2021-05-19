import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    height: "100vh",
  },

  container: {
    display: "flex",
    maxWidth: "1440px",
    padding: theme.spacing(3, 12.5, 0),
    margin: "0 auto",
    boxSizing: "border-box",

    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 3, 0),
    },
  },

  contentContainer: {
    flex: 1,
    overflow: "auto",

    // "&.shrink": {
    //   width: "50%",
    // },
  },

  codeContainer: {
    flex: 1,
    background: "#303030",
    borderRadius: "16px",
    marginLeft: "20px",
  },

  button: {
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "18px",
    marginBottom: "27px",

    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1),
    },
  },
  uploadSection: {
    width: "100%",
    border: "1px dashed #000",
    padding: theme.spacing(9, 9),
    borderRadius: "4px",
    boxSizing: "border-box",

    "& .desc": {
      fontWeight: 400,
      fontSize: "24px",
      lineHeight: "28px",
      color: "#82838E",
      textAlign: "center",
      marginBottom: theme.spacing(5),
    },
  },
  uploadWrapper: {
    textAlign: "center",
    "& .input": {
      display: "none",
    },
  },
  layoutSection: {
    width: "100%",
    height: "calc(100vh - 427px)",
    marginTop: theme.spacing(4),

    [theme.breakpoints.down("sm")]: {
      height: "calc(100vh - 230px)",
      marginTop: theme.spacing(0),
    },
  },
  loadingWrapper: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default useStyles;
