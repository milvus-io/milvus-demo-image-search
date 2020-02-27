import React from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RefreshedIcon from "@material-ui/icons/Cached";
import FlashOn from "@material-ui/icons/FlashOn";
import FlashOff from "@material-ui/icons/FlashOff";
import PostAdd from "@material-ui/icons/PostAdd";
import Grid from "@material-ui/core/Grid";

import Tooltip from "@material-ui/core/Tooltip";

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: "1 1 100%"
  }
}));

const iconGetter = icon => {
  const iconConfig = {
    create: <AddCircleIcon />,
    delete: <DeleteIcon />,
    refresh: <RefreshedIcon />,
    createIndex: <FlashOn />,
    dropIndex: <FlashOff />,
    import: <PostAdd />
  };

  return iconConfig[icon] || <Button></Button>;
};

const Toolbar = props => {
  const { color = "primary", config = [], selected, total } = props;
  const classes = useToolbarStyles();

  // remove hidden button
  const newConfig = config.filter(c => !c.hidden);
  newConfig.forEach(c => {
    c._disabled =
      typeof c.disabled === "function" ? c.disabled(selected) : c.disabled;
  });

  const numSelected = selected.length;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <ButtonGroup color={color} aria-label="outlined primary button group">
            {newConfig.map(c => {
              const btn = (
                <Button
                  key={c.icon}
                  variant="contained"
                  color="secondary"
                  size="small"
                  className={classes.button}
                  disabled={c._disabled}
                  onClick={e => c.onClick(e, selected)}
                  startIcon={iconGetter(c.icon)}
                >
                  {c.label}
                </Button>
              );

              const showTooltip =
                c.tooltip || (c.disabledTooltip && c._disabled);

              return showTooltip ? (
                <Tooltip
                  title={c._disabled ? c.disabledTooltip : c.tooltip}
                  key={c.icon + "tooltip"}
                >
                  <span>{btn}</span>
                </Tooltip>
              ) : (
                btn
              );
            })}
          </ButtonGroup>
        </Grid>
        <Grid item xs={4}>
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            align="right"
          >
            {numSelected} selected of {total} items
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Toolbar;

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired
// };
