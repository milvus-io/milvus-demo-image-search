import {
  makeStyles
} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  dialogContent: {
    overflow: 'initial',
    minWidth: '400px',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: `100%`,
    whiteSpace: 'no-wrap',
  },
  column: {
    marginRight: theme.spacing(1),
    whiteSpace: 'no-wrap',
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