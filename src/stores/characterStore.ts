import { fetchData } from "@/services/api";
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
  setListCharacter: (characters: Character[]) => void;
  // fetchAndSetCharacters: any;
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

  setListCharacter: (characters) => set({ listCharacter: characters }),

  // fetchAndSetCharacters: async (page: any, pageSize: any) => {
  //   try {
  //     const data = await fetchData("character", { page });
  //     set({ listCharacter: data.results });
  //   } catch (error) {
  //     console.error("Error al obtener los personajes:", error);
  //   }
  // },
}));
