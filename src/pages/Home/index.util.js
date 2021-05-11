import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "1440px",
    padding: theme.spacing(3, 12.5, 0),
    margin: "0 auto",
    boxSizing: "border-box",
  },

  container: {
    display: "flex",
  },

  contentContainer: {
    flex: 1,
    marginRight: "20px",
    overflow: "auto",

    // "&.shrink": {
    //   width: "50%",
    // },
  },

  codeContainer: {
    flex: 1,
    background: "#303030",
    borderRadius: "16px",
  },

  button: {
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "18px",
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
    "& .scroll-container": {
      overflow: "auto",
    },
  },
  loadingWrapper: {
    position: "absolute",
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
