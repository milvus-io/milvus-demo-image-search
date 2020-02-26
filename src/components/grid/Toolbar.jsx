import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import Tooltip from "@material-ui/core/Tooltip";

// let data = [{
//   label: 'One',
//   icon: 'fa',
//   onClick: () => console.log('one'),
//   disabled: false,
// }, {
//   label: 'two',
//   icon: 'fa',
//   onClick: () => console.log('one'),
//   disabled: true,
// }];

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

const Toolbar2 = props => {
  const { color = "primary" } = props;

  let data = [
    {
      label: "One",
      icon: "fa",
      onClick: () => console.log("one"),
      disabled: false
    },
    {
      label: "two",
      icon: "fa",
      onClick: () => console.log("one"),
      disabled: true
    },
    {
      label: "three",
      icon: "fa",
      onClick: () => console.log("one"),
      disabled: true,
      hidden: true
    }
  ];

  // remove hidden button
  data = data.filter(d => !d.hidden);

  return (
    <>
      <ButtonGroup color={color} aria-label="outlined primary button group">
        {data.map(d => (
          <Button disabled={d.disabled} onClick={d.onClick}>
            {d.label}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
};

export default Toolbar2;

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};
