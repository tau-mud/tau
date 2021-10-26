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
  confirmUsername(context: IUsernameContext) {
    return (
      <Box>
        <Text>
          <Text>You chose &apos;</Text>
          <Text color="green" bold>
            {context.username}
          </Text>
          <Text>&apos; is this correct? (</Text>
          <Text color="cyan" bold>
            Y
          </Text>
          <Text>/</Text>
          <Text color="cyan" bold>
            N
          </Text>
          <Text>)</Text>
        </Text>
      </Box>
    );
  },
  promptPassword() {
    return (
      <Box>
        <Text>Enter your password:</Text>
      </Box>
    );
  },
  passwordTooShort() {
    return (
      <Box>
        <Text>
          <Text>The password must be at least </Text>
          <Text color="yellow" bold>
            6
          </Text>
          <Text> characters long.</Text>
        </Text>
      </Box>
    );
  },
  passwordMustContainSymbol() {
    return (
      <Box>
        <Text>
          <Text>The password </Text>
          <Text color="yellow" bold>
            must contain at least one symbol
          </Text>
          <Text>.</Text>
        </Text>
      </Box>
    );
  },
  passwordMustContainLowercase() {
    return (
      <Box>
        <Text>
          <Text>The password </Text>
          <Text color="yellow" bold>
            must contain at least one lowercase character
          </Text>
          <Text>.</Text>
        </Text>
      </Box>
    );
  },
  passwordMustContainUppercase() {
    return (
      <Box>
        <Text>
          <Text>The password </Text>
          <Text color="yellow" bold>
            must contain at least one uppercase character
          </Text>
          <Text>.</Text>
        </Text>
      </Box>
    );
  },
  passwordMustContainDigit() {
    return (
      <Box>
        <Text>
          <Text>The password </Text>
          <Text color="yellow" bold>
            must contain at least one digit
          </Text>
          <Text>.</Text>
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
        <Text color="green" bold>
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
        <Text color="green" bold>
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
          <Text color="green" bold>
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
