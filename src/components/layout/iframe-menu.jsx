import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { GiChart } from "react-icons/gi";
import { GoNote } from "react-icons/go";

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

const ConfigMenu = props => {
  const history = useHistory();
  const classes = useStyles();
  const { elk = {}, prometheus = {} } = props
  const [configs, setConfigs] = useState([])
  useEffect(() => {
    const effectConfigs = []
    if (elk) {
      effectConfigs.push({ path: '/intergration/elk', label: "ELK GUI", icon: <GoNote /> })
    }

    if (prometheus) {
      effectConfigs.push({ path: '/intergration/prometheus', label: "Prometheus GUI", icon: <GiChart /> })
    }
    setConfigs(effectConfigs)
  }, [elk, prometheus])

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {configs.map(config => {
          const { path, label, icon } = config
          const route = path
          const isSelected = history.location.pathname === route;
          return (
            <ListItem key={path} button className={classes.item} classes={{ root: isSelected ? classes.selected : "" }} onClick={() => history.push(route)}>
              <ListItemIcon className={classes.icon} >
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
