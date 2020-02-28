import {
  makeStyles
} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  dialogContent: {
    overflow: 'initial'
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: `100%`,
    whiteSpace: 'no-wrap',
  },
  column: {
    marginRight: theme.spacing(1)
  },
  gridRoot: {
    border: 'dashed 1px',
    borderRadius: theme.spacing(2),
    cursor: 'pointer'
  },
  upload: {
    textAlign: 'center',
  },
}))

export default useStyles