import React from "react";

import { Box, Text } from "ink";

export const LoginTemplate = {
  emailOrCreate() {
    return (
      <Box>
        <Text>Enter your account's email address or </Text>
        <Text color="cyan" bold>
          'create'
        </Text>
        <Text> to create a new account:</Text>
      </Box>
    );
  },
};
