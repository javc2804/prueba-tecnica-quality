import create from "zustand";
import { Character } from "../types/types";

interface CharacterState {
  characters: Character[];
  addCharacter: (character: Character) => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  characters: [],
  addCharacter: (character: Character) =>
    set((state) => ({ characters: [...state.characters, character] })),
}));
