import React from "react";
import { Masonry } from "gestalt";
import Item from "../Item";

const pins = [
  { id: 1, name: "text" },
  { id: 2, name: "te2" },
  { id: 3, name: "te3" },
  { id: 4, name: "te4" },
  { id: 5, name: "te5" },
  { id: 1, name: "text" },
  { id: 2, name: "te2" },
  { id: 3, name: "te3" },
  { id: 4, name: "te4" },
  { id: 5, name: "te5" },
  { id: 1, name: "text" },
  { id: 2, name: "te2" },
  { id: 3, name: "te3" },
  { id: 4, name: "te4" },
  { id: 5, name: "te5" },
  { id: 1, name: "text" },
  { id: 2, name: "te2" },
  { id: 3, name: "te3" },
  { id: 4, name: "te4" },
  { id: 5, name: "te5" },
  { id: 1, name: "text" },
  { id: 2, name: "te2" },
  { id: 3, name: "te3" },
  { id: 4, name: "te4" },
  { id: 5, name: "te5" },
];

function loadItems() {
  return pins;
}

function Main() {
  return (
    <Masonry
      flexible
      virtualize
      comp={Item}
      items={pins}
      loadItems={loadItems}
      minCols={1}
    ></Masonry>
  );
}

export default Main;
