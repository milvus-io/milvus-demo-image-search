import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, IconButton, Icon, SearchField } from "gestalt";

function Nav() {
  const p = useParams();
  const [value, setValue] = useState(p.id);
  const history = useHistory();

  const onChange = ({ value }) => {
    if (value === "") {
      history.push(`/`);
    }
    setValue(value);
  };

  const onKeyDown = ({ event, value }) => {
    if (event.code === "Enter") {
      if (value === "") {
        history.push(`/`);
      } else {
        history.push(`/s/${value}`);
      }
    }
  };

  return (
    <Box
      color="white"
      rounding={2}
      padding={3}
      display="flex"
      alignItems="center"
    >
      <Box padding={3}>
        <Icon
          icon="download"
          color="darkGray"
          size={20}
          accessibilityLabel="logo"
        />
      </Box>
      <Box flex="grow" paddingX={2}>
        <SearchField
          accessibilityLabel="Demo Search Field"
          id="searchField"
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Search and explore"
          value={value}
        />
      </Box>
      <Box paddingX={2}>
        <IconButton
          accessibilityLabel="Notifications"
          icon="speech-ellipsis"
          size="md"
        />
      </Box>
      <Box paddingX={2}>
        <IconButton accessibilityLabel="Profile" icon="person" size="md" />
      </Box>
    </Box>
  );
}

export default Nav;
