import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TablePagination from "@material-ui/core/TablePagination";
import CircularProgress from "@material-ui/core/CircularProgress";
import Toolbar from "./Toolbar";
import Table from "./Table";

const userStyle = makeStyles(theme => ({
  loading: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(20),
    width: "100%"
  }
}));

const MilvusGrid = props => {
  const classes = userStyle();
  const {
    rowCount = 10,
    rowsPerPage = 5,
    primaryKey = "id",
    toolbarConfig = [],
    onSelectChanged = () => {},
    onChangePage = (e, nextPageNum) => {
      console.log("nextPageNum", nextPageNum);
    },
    labelDisplayedRows = ({ from, to, count }) => {
      return `${count} items`;
    },
    page = 0,
    rows = [],
    colDefinitions = [],
    isLoading = true
  } = props;

  const [selected, setSelected] = React.useState([]);
  const _isSelected = row => {
    console.log("row selected test", row[primaryKey]);
    return selected.some(s => s[primaryKey] === row[primaryKey]);
  };

  const _onSelected = (event, row) => {
    console.log(row);
    let newSelected = [].concat(selected);
    if (_isSelected(row)) {
      newSelected = newSelected.filter(s => s[primaryKey] !== row[primaryKey]);
    } else {
      newSelected.push(row);
    }
    setSelected(newSelected);
    console.log(newSelected);
    onSelectChanged(newSelected);
  };

  const _onSelectedAll = event => {
    if (event.target.checked) {
      const newSelecteds = rows;
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Toolbar
          config={toolbarConfig}
          total={rowCount}
          selected={selected}
        ></Toolbar>
      </Grid>
      <Grid item xs={12}>
        {!isLoading && (
          <>
            <Table
              rows={rows}
              selected={selected}
              colDefinitions={colDefinitions}
              onSelectedAll={_onSelectedAll}
              onSelected={_onSelected}
              isSelected={_isSelected}
            ></Table>
            <TablePagination
              component="div"
              count={rowCount}
              page={page}
              labelDisplayedRows={labelDisplayedRows}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[]}
              onChangePage={onChangePage}
            />
          </>
        )}
      </Grid>

      {isLoading && (
        <div className={classes.loading}>
          <CircularProgress></CircularProgress>
        </div>
      )}
    </Grid>
  );
};

export default MilvusGrid;
