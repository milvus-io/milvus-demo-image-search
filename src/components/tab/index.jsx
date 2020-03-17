import { Tabs } from './node_modules/@material-ui/core'
import { withStyles } from './node_modules/@material-ui/core/styles';

const MyTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
})(Tabs);

export default MyTabs