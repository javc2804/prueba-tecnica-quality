import create from "zustand";

interface CharacterState {
  character: {
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
  };
  setCharacter: (character: CharacterState["character"]) => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  character: {
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
  },
  setCharacter: (character) => set({ character }),
}));
