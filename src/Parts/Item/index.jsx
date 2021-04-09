import React from "react";
import "./index.scss";

function Item(props) {
  return (
    <div className="ui-item" key={props.id}>
      <img src="https://via.placeholder.com/150" alt="placeholder" />
    </div>
  );
}

export default Item;
