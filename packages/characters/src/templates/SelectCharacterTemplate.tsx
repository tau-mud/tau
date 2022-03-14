import React from "react";

import { Box, Text } from "ink";

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
      <Box>
        <Box>
          <Text>Select a character:</Text>
        </Box>
        <Box>{characters}</Box>
      </Box>
    );
  },
};
