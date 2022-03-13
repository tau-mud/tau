import React from "react";

import { Box, Text } from "ink";

export const LoginTemplate = {
  usernameOrCreate() {
    return (
      <Box>
        <Text>Enter your account's username or </Text>
        <Text color="cyan" bold>
          'create'
        </Text>
        <Text> to create a new account:</Text>
      </Box>
    );
  },
  password() {
    return (
      <Box>
        <Text>Enter your account's password:</Text>
      </Box>
    );
  },
  invalidCredentials() {
    return (
      <Box>
        <Text>Invalid credentials. Please try again.</Text>
      </Box>
    );
  },
};
