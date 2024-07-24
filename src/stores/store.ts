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
        const sortedCharacters = [...state.characters].sort(
          (a, b) => a.id - b.id
        );
        return {
          characters: [character, ...sortedCharacters],
          version: state.version + 1,
        };
      } else {
        const updatedCharacters = [...state.characters];
        updatedCharacters[characterIndex] = character;
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
