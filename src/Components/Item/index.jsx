import React, { useState, useCallback } from "react";
import { Box, Text, Mask, Button } from "gestalt";
import "./index.scss";

function Item(props) {
  const [hover, setHover] = useState(false);
  // console.log(props);
  const link = `https://via.placeholder.com/168x${props.data.height}`;

  const mouseEnter = useCallback(() => {
    setHover(true);
  }, [setHover]);
  const mouseLeave = useCallback(() => {
    setHover(false);
  }, [setHover]);

  return (
    <Box
      position="relative"
      padding={2}
      className="ui-item"
      alignItems="center"
      key={props.data.id}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <Mask rounding={3} wash>
        <img
          alt="subliming.tumblr.com"
          src={link}
          fit="contain"
          style={{ maxWidth: "100%", display: "block" }}
        />
      </Mask>
      <Text align="center">{props.data.title}</Text>
      {hover && (
        <Box size="sm" position="absolute" bottom right>
          <Button iconEnd="download" text="Download Resource file" inline />
        </Box>
      )}
    </Box>
  );
}

export default Item;
