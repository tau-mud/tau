import React from "react";

import { Box, Text } from "ink";

export const RegistrationTemplate = {
  promptUsername() {
    return (
      <Box>
        <Text>
          Enter your desired username (this can be different from your Character
          name):
        </Text>
      </Box>
    );
  },
  confirmUsername(context: any) {
    return (
      <Box>
        <Text>You chose</Text>
      </Box>
    );
  },
};
