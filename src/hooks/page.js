import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "40px"
  },
  h2: {
    fontSize: "26px",
    fontWeight: "bold",
    margin: "0 10px 0 0",
  },
  paper: {
    maxWidth: "700px"
  }
}));

export function usePageStyles() {
  const classes = useStyles()
  return classes
}

