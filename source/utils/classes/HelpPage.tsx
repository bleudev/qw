import React, { FunctionComponent } from "react"
import { Box, Newline, Text } from "ink"

const HelpPage: FunctionComponent = () => {
  return (
    <Box flexDirection="column" paddingTop={1} paddingLeft={2}>
      <Text>Usage:</Text>
      <Box>
        <Text color="yellow">qw</Text>
        <Text> - Show main page</Text>
      </Box>
      <Box>
        <Text color="yellow">qw </Text>
        <Text color="cyan">[file]</Text>
        <Text> - Open </Text>
        <Text backgroundColor="#222222"> file </Text>
      </Box>
      <Text> </Text>
      <Box>
        <Text color="cyan">[file]</Text>
        <Text> - file to open</Text>
      </Box>
    </Box>
  );
}

export default HelpPage;