import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    padding: theme.spacing(2),
    backgroundColor: "#F4F4F4"
  },
  titleContainer: {
    display: "flex",
    padding: theme.spacing(1, 0, 2),
  },
  h2: {
    fontSize: "26px",
    fontWeight: "bold",
    margin: "0 10px 0 0"
  }
}));

const dataPageStyles = makeStyles(theme => ({
  root: {
    height: "calc(100vh - 50px)",
    padding: theme.spacing(2),
    backgroundColor: "#F4F4F4"
  }
}));

export function useDataPageStyles() {
  return dataPageStyles();
}

export function usePageStyles() {
  return useStyles();
}
