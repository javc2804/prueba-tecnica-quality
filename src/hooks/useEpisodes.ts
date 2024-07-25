import { useState, useEffect } from "react";
import { Character, Episode } from "@/types/types";
import { useCharacterStore } from "@/stores/store";
import { fetchCharacters } from "../services/api";
import { useToast } from "@/components/ui/use-toast";

const useEpisodes = () => {
  const { toast } = useToast();

  const [apiEpisodes, setApiEpisodes] = useState<Episode[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCharacters = async (page: number) => {
      setLoading(true);
      try {
        const data = await fetchCharacters(page, "episode");
        data.results.forEach((character: Character) => {
          useCharacterStore.getState().addCharacter(character);
        });
        setTotalPages(data.info.pages);
      } catch (error) {
        // console.error("Error fetching episodios:", error);
        toast({
          title: "Error",
          description: "Error al obtener los episodios",
        });
      } finally {
        setLoading(false);
      }
    };

    getCharacters(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    apiEpisodes,
    currentPage,
    totalPages,
    handlePageChange,
    loading,
  };
};

export default useEpisodes;
