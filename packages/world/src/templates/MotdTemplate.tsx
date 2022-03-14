import React from "react";

import { Box, Text } from "ink";

export const MotdTemplate = {
  banner() {
    return (
      <Box
        width={100}
        height={20}
        alignItems="center"
        justifyContent="center"
        borderStyle="classic"
        flexDirection="column"
      >
        <Box>
          <Text color="green">TAU MUD ENGINE</Text>
        </Box>
      </Box>
    );
  },
};
