import React from "react";

import { Box, Text, Newline } from "ink";

import { ICharacter } from "../services";

type TCharacterList = Array<ICharacter>;

export const SelectCharacterTemplate = {
  selectFromCharacters(context: TCharacterList) {
    const characters = context.map((character, index) => (
      <Box>
        <Text>
          {index + 1}. {character.name}
        </Text>
      </Box>
    ));

    return (
      <Box flexDirection="column">
        <Text>Select a character:</Text>
        <Box marginLeft={3} marginTop={1}>
          {characters}
        </Box>
      </Box>
    );
  },

  selectionInvalid() {
    return (
      <Box>
        <Text>That is not a valid selection.</Text>
      </Box>
    );
  },
};
