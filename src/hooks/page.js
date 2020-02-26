import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    padding: theme.spacing(2),
    backgroundColor: 'rgb(247, 249, 252)'
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  h2: {
    fontSize: "26px",
    fontWeight: "bold",
    margin: "0 10px 0 0",
  },
  paper: {
    marginTop: "80px"
  }
}));

const dataPageStyles = makeStyles(theme => ({
  root: {
    height: "calc(100vh - 50px)",
    padding: theme.spacing(2),
    backgroundColor: 'rgb(247, 249, 252)',
    marginTop: "49px"
  },
  paper: {
    marginTop: theme.spacing(2)
  }
}));

export function useDataPageStyles() {
  return dataPageStyles()
}



export function usePageStyles() {
  return useStyles()
}

