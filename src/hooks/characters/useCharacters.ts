import { useState, useEffect } from "react";
import { Character } from "@/types/types";
import { useCharacterStore } from "@/stores/store";
import { fetchCharacters } from "../../services/api";
import { useToast } from "@/components/ui/use-toast";

const useCharacters = () => {
  const { toast } = useToast();

  const [apiCharacters, setApiCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCharacters = async (page: number) => {
      setLoading(true);

      try {
        const data = await fetchCharacters(page, "character");
        // setApiCharacters(data.results);

        data.results.forEach((character: Character) => {
          useCharacterStore.getState().addCharacter(character);
        });
        setTotalPages(data.info.pages);
      } catch (error) {
        toast({
          title: "Error",
          description: "Error al obtener los personajes",
        });
      }
      setLoading(false);
    };

    getCharacters(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    console.log(page);
    setCurrentPage(page);
  };

  return {
    apiCharacters,
    currentPage,
    totalPages,
    handlePageChange,
    loading,
  };
};

export default useCharacters;
