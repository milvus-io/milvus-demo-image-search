import React from "react";
import Toolbar from "./Toolbar";
import Table from "./Table";
import TablePagination from "@material-ui/core/TablePagination";

import { withStyles } from "@material-ui/core/styles";

// const MilvusGrid = withStyles({
//   root: {
//     borderBottom: '1px solid #e8e8e8',
//   },
// })(Tabs);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const fake = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0)
];

const colDefinitions = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Dessert (100g serving)"
  },
  { id: "calories", numeric: true, disablePadding: false, label: "Calories" },
  { id: "fat", numeric: true, disablePadding: false, label: "Fat (g)" },
  { id: "carbs", numeric: true, disablePadding: false, label: "Carbs (g)" },
  { id: "protein", numeric: true, disablePadding: false, label: "Protein (g)" }
];

const rowCount = 10;
const rowsPerPage = 10;

const MilvusGrid = props => {
  const { toolbarConfig, tableConfig } = props;

  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState(fake);

  const onSelected = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const onSelectedAll = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const labelDisplayedRows = ({ from, to, count }) => {
    return `${count} items`;
  };

  const onChangePage = (e, nextPageNum) => {
    console.log("nextPageNum", nextPageNum);
  };

  return (
    <>
      {/* <Toolbar {...toolbarConfig} selected={selected}></Toolbar> */}
      <Table
        {...tableConfig}
        rows={rows}
        selected={selected}
        colDefinitions={colDefinitions}
        onSelectedAll={onSelectedAll}
        onSelected={onSelected}
        isSelected={isSelected}
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
  );
};

export default MilvusGrid;
