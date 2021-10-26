import React from "react";

import { Box, Text } from "ink";

interface IUsernameContext {
  username: string;
}

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
  usernameEmpty() {
    return (
      <Box>
        <Text>The username must not be empty.</Text>
      </Box>
    );
  },
  usernameTooShort(context: IUsernameContext) {
    return (
      <Box>
        <Text>The username &apos;</Text>
        <Text color="cyan" bold>
          {context.username}
        </Text>
        <Text>&apos; is too short. It must be at least </Text>
        <Text color="yellow" bold>
          4
        </Text>
        <Text> characters.</Text>
      </Box>
    );
  },
  usernameTooLong(context: IUsernameContext) {
    return (
      <Box>
        <Text>The username &apos;</Text>
        <Text color="cyan" bold>
          {context.username}
        </Text>
        <Text>&apos; is too long. It must be at most </Text>
        <Text color="yellow" bold>
          10
        </Text>
        <Text> characters.</Text>
      </Box>
    );
  },
  usernameInvalidFormat(context: IUsernameContext) {
    return (
      <Box width={100}>
        <Text>
          The username &apos;
          <Text color="cyan" bold>
            {context.username}
          </Text>
          <Text>&apos; is invalid. It must </Text>
          <Text color="yellow" bold>
            begin and end with an alpha-numeric character
          </Text>
          <Text> and may only include underscores (</Text>
          <Text color="yellow" bold>
            _
          </Text>
          <Text>), dashes (</Text>
          <Text color="yellow" bold>
            -
          </Text>
          ), and periods (
          <Text color="yellow" bold>
            .
          </Text>
          ).
        </Text>
      </Box>
    );
  },
  usernameTaken(context: IUsernameContext) {
    return (
      <Box>
        <Text>
          <Text>The username &apos;</Text>
          <Text color="cyan" bold>
            {context.username}
          </Text>
          <Text>&apos; has already been taken</Text>
        </Text>
      </Box>
    );
  },
};
