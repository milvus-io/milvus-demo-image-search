import React, { useEffect, useState, useRef, useCallback } from "react";
import { Masonry, Spinner } from "gestalt";
import { useParams } from "react-router-dom";

import Item from "../Item";
import "./index.scss";

function Main(props) {
  const scrollContainer = useRef();

  let p = useParams();
  // first time
  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadItems = useCallback(() => {

  }, []);

  return (
    <div className="scroll-container" ref={scrollContainer}>
      {
        props.pins.length && <Masonry
          flexible={true}
          // columnWidth={295}
          virtualize={true}
          comp={Item}
          items={props.pins}
        // gutterWidth={0}
        // loadItems={loadItems}
        // scrollContainer={() => scrollContainer.current}
        // minCols={1}
        ></Masonry>
      }

    </div>
  );
}

export default Main;
