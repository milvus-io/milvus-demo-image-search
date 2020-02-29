import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { FaNetworkWired, FaRegFolder } from "react-icons/fa";
import { FiCpu } from "react-icons/fi";
import { GiChart } from "react-icons/gi";
import { GoNote, GoSettings } from "react-icons/go";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360
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
  }
}));

const ConfigMenu = props => {
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    history.push("/configs/storage");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button className={classes.item}>
          <ListItemIcon className={classes.icon}>
            <FaNetworkWired />
          </ListItemIcon>
          <ListItemText primary="Network Access" />
        </ListItem>
        <ListItem button className={classes.item}>
          <ListItemIcon className={classes.icon}>
            <FaRegFolder />
          </ListItemIcon>
          <ListItemText primary="Storage Path" />
        </ListItem>

        <ListItem button className={classes.item}>
          <ListItemIcon className={classes.icon}>
            <GoSettings />
          </ListItemIcon>
          <ListItemText primary="Advanced Settings" />
        </ListItem>

        <ListItem button className={classes.item}>
          <ListItemIcon className={classes.icon}>
            <FiCpu />
          </ListItemIcon>
          <ListItemText primary="Hardware Resources" />
        </ListItem>

        <ListItem button className={classes.item}>
          <ListItemIcon className={classes.icon}>
            <GiChart />
          </ListItemIcon>
          <ListItemText primary="Metrics" />
        </ListItem>

        <ListItem button className={classes.item}>
          <ListItemIcon className={classes.icon}>
            <GoNote />
          </ListItemIcon>
          <ListItemText primary="ELK" />
        </ListItem>
      </List>
    </div>
  );
};

export default ConfigMenu;
