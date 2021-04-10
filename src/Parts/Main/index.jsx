import React, { useEffect, useState, useRef, useCallback } from "react";
import { Masonry } from "gestalt";
import Item from "../Item";
import "./index.scss";

let offset = 0;
let count = 30;

function Main() {
  const [pins, setPins] = useState([]);
  const scrollContainer = useRef();

  // first time
  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadItems = useCallback(() => {
    console.log("xxx");
    let res = new Array(count).fill(true).map((d, index) => {
      let height = Math.random() * 10 > 0.3 ? 110 : 280;
      height = Math.random() * 10 > 0.3 ? 130 : 340;
      return {
        id: offset + index,
        title: `Title` + Math.floor(Math.random() * 1000),
        height,
      };
    });
    offset += count;
    setPins([...pins, ...res]);
  }, [pins]);

  return (
    <div className="scroll-container" ref={scrollContainer}>
      <Masonry
        flexible={true}
        virtualize={true}
        comp={Item}
        items={pins}
        gutterWidth={16}
        loadItems={loadItems}
        scrollContainer={() => scrollContainer.current}
        minCols={1}
      ></Masonry>
    </div>
  );
}

export default Main;
