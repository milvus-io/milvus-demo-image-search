import React, { useEffect, useState, useRef, useCallback } from "react";
import { Masonry, Spinner } from "gestalt";
import { useParams } from "react-router-dom";

import Item from "../../components/Item";
import "./index.scss";

let offset = 0;
let count = 30;

function Main() {
  const [showSpinner, setShowSpinner] = useState(true);
  const [pins, setPins] = useState([]);
  const scrollContainer = useRef();

  let p = useParams();
  // first time
  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // reset
  useEffect(() => {
    console.log("changed");
    offset = 0;
    setShowSpinner(true);
    setPins([]);
    document.title = `${p.id || ""} resource download `;
  }, [p.id]);

  const loadItems = useCallback(() => {
    let res = new Array(count).fill(true).map((d, index) => {
      let height = Math.random() * 10 > 0.3 ? 110 : 280;
      height = Math.random() * 10 > 0.3 ? 130 : 340;
      return {
        id: offset + index,
        title: `Title_${p.id || "index"}_${offset + index}`,
        height,
      };
    });
    offset += count;
    setTimeout(() => {
      setPins([...pins, ...res]);
      setShowSpinner(false);
    }, Math.random() * 1500);
  }, [pins, p.id]);

  return (
    <div className="scroll-container" ref={scrollContainer}>
      <Spinner show={showSpinner} accessibilityLabel="spinner" />
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
