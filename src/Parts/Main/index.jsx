import React from "react";
import { Masonry } from "gestalt";
import Item from "../Item";


let offset = 0;
function loadItems() {
  console.log("load");
  let res =  new Array(20).fill(true).map((d, index) => {
    return { id: offset + index, name: Math.random() * 10000 };
  });
  offset += 20;
  return res;
}

let pins = loadItems();

function Main() {
  const scrollContainer = React.useRef();
  return (
    <div ref={scrollContainer}>
      <Masonry
        flexible={true}
        virtualize={true}
        comp={Item}
        items={pins}
        gutterWidth={0}
        loadItems={loadItems}
        scrollContainer={() => scrollContainer.current}
        minCols={1}
      ></Masonry>
    </div>
  );
}

export default Main;
