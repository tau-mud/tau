import React from "react";

import { Box, Text } from "ink";

interface INameContext {
  name: string;
}

export const CreateCharacterTemplate = {
  promptCharacterName() {
    return (
      <Box>
        <Text>What is your character's name?</Text>
      </Box>
    );
  },
  nameTooShort() {
    return (
      <Box>
        <Text>The name must be at least</Text>
        <Text color="yellow" bold>
          4
        </Text>
        <Text>characters long.</Text>
      </Box>
    );
  },
  nameTooLong() {
    return (
      <Box>
        <Text>The name must be at most</Text>
        <Text color="yellow" bold>
          10
        </Text>
        <Text>characters long.</Text>
      </Box>
    );
  },
  nameNotAlphabetic() {
    return (
      <Box>
        <Text>The name must be only alphabetic characters.</Text>
      </Box>
    );
  },
  nameAlreadyInUse(context: INameContext) {
    return (
      <Box>
        <Text>The name </Text>
        <Text color="green" bold>
          {context.name}
        </Text>
        <Text>already in use.</Text>
      </Box>
    );
  },
  confirmName(context: INameContext) {
    return (
      <Box>
        <Text>
          <Text>You chose &apos;</Text>
          <Text color="green" bold>
            {context.name}
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
};
