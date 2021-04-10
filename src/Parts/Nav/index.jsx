import React from "react";
import { Box, IconButton, Icon, SearchField } from "gestalt";

function Nav() {
  const [value, setValue] = React.useState("");

  return (
    <Box
      color="white"
      rounding={2}
      padding={3}
      display="flex"
      alignItems="center"
    >
      <Box padding={3}>
        <Icon icon="download" color="red" size={20} accessibilityLabel="logo" />
      </Box>
      <Box flex="grow" paddingX={2}>
        <SearchField
          accessibilityLabel="Demo Search Field"
          id="searchField"
          onChange={({ value }) => setValue(value)}
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
