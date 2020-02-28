import {
  makeStyles
} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: `100%`
  },
  column: {
    marginRight: theme.spacing(1)
  }
}))

export default useStyles