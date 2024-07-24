import { useState, useEffect } from "react";
import { Character } from "@/types/types";
import { useCharacterStore } from "@/stores/store";
import { fetchCharacters } from "../services/api";

const useCharacters = () => {
  const [apiCharacters, setApiCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getCharacters = async (page: number) => {
      try {
        const data = await fetchCharacters(page, "character");
        data.results.forEach((character: Character) => {
          useCharacterStore.getState().addCharacter(character);
        });
        setTotalPages(data.info.pages);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    getCharacters(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    apiCharacters,
    currentPage,
    totalPages,
    handlePageChange,
  };
};

export default useCharacters;
