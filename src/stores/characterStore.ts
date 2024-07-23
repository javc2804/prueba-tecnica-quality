import create from "zustand";

interface Character {
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
}

interface CharacterState {
  character: Character;
  listCharacter: Character[];
  setCharacter: (character: Character) => void;
  addCharacterToList: (character: Character) => void;
  addCharactersToList: (characters: Character[]) => void;
  setListCharacter: (characters: Character[]) => void;
  removeCharacterFromList: (characterName: string) => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  character: {
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
  },
  listCharacter: [],

  setCharacter: (character) => set({ character }),
  addCharacterToList: (character) =>
    set((state) => ({ listCharacter: [...state.listCharacter, character] })),
  addCharactersToList: (characters) =>
    set((state) => ({
      listCharacter: [...state.listCharacter, ...characters],
    })),
  setListCharacter: (characters) => set({ listCharacter: characters }),
  removeCharacterFromList: (characterName) =>
    set((state) => ({
      listCharacter: state.listCharacter.filter(
        (character) => character.name !== characterName
      ),
    })),
}));
