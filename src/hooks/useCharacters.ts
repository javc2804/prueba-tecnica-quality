import { useState, useEffect } from "react";
import { Character } from "@/types/types";
import { fetchCharacters } from "@/services/api";

const useCharacters = (initialPage: number = 1) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getCharacters = async (page: number) => {
      try {
        const data = await fetchCharacters(page);
        setCharacters(data.results);
        if (data.info && data.info.pages) {
          setTotalPages(data.info.pages);
        } else {
          setTotalPages(0);
        }
      } catch (error: any) {
        setError(error);
        console.error("Error fetching characters:", error);
      }
    };

    getCharacters(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return { characters, currentPage, totalPages, error, handlePageChange };
};

export default useCharacters;
