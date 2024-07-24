import create from "zustand";
import { Character } from "../types/types";

interface CharacterState {
  characters: Character[];
  version: number;
  addCharacter: (character: Character) => void;
  updateCharacter: (character: Character) => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  characters: [],
  version: 0,
  addCharacter: (character: Character) =>
    set((state) => {
      const characterIndex = state.characters.findIndex(
        (char) => char.id === character.id
      );
      if (characterIndex === -1) {
        // Character does not exist, add new character
        return {
          characters: [...state.characters, character],
          version: state.version + 1,
        };
      } else {
        // Character already exists, update the character

        const updatedCharacters = [...state.characters];
        updatedCharacters[characterIndex] = character; // Update the character at the found index
        return {
          characters: updatedCharacters,
          version: state.version + 1,
        };
      }
    }),
  updateCharacter: (updatedCharacter: Character) =>
    set((state) => ({
      characters: state.characters.map((char) =>
        char.id === updatedCharacter.id ? updatedCharacter : char
      ),
      version: state.version + 1,
    })),
}));
