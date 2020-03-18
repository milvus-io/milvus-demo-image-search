import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { FaNetworkWired, FaRegFolder } from "react-icons/fa";
import { GiChart } from "react-icons/gi";
import { GoSettings } from "react-icons/go";
import { FaCubes } from "react-icons/fa";


const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    paddingLeft: theme.spacing(2)
  },
  icon: {
    minWidth: theme.spacing(5),
    "& svg": {
      width: 24,
      height: 24,
      fill: "#FFF"
    }
  },
  item: {
    paddingLeft: 0
  },
  selected: {
    color: theme.palette.primary.main,
    "& svg": {
      fill: theme.palette.primary.main
    }
  }
}));

const Configs = [
  { path: 'apps', label: 'Applications', icon: <FaNetworkWired /> },
  { path: 'storage', label: "Storage Path", icon: <FaRegFolder /> },
  { path: 'advanced', label: 'Advanced Settings', icon: <GoSettings /> },
  // { path: 'hardware', label: "Hardware Acceleration", icon: <FiCpu /> },
  { path: 'metrics', label: "Metrics", icon: <GiChart /> },
  { path: 'others', label: "Intergration", icon: <FaCubes /> }
]
const ConfigMenu = props => {
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (history.location.pathname === '/configs') {
      history.push("/configs/storage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {Configs.map(config => {
          const { path, label, icon } = config
          const route = `/${path}`
          const isSelected = history.location.pathname === route;
          return (
            <ListItem key={path} button className={classes.item} classes={{ root: isSelected ? classes.selected : "" }} onClick={() => history.push(route)}>
              <ListItemIcon className={classes.icon}>
                {icon}
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          )
        })}
      </List>
    </div>
  );
};

export default ConfigMenu;
