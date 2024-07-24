"use client";
import React, { useEffect, useState } from "react";
import { Character } from "../../../types/types";
import AddCharacterForm from "@/components/AddCharacterForm/AddCharacterForm";
import CharactersTable from "@/components/CharactersTable/CharactersTable";
import Pagination from "@/components/Pagination/Pagination";
import { useCharacterStore } from "@/stores/store";

const Home: React.FC = () => {
  const [apiCharacters, setApiCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchCharacters = async (page: number) => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      );
      const data = await response.json();
      data.results.forEach((character: any) => {
        useCharacterStore.getState().addCharacter(character);
      });
      setTotalPages(data.info.pages);
    };

    fetchCharacters(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <AddCharacterForm />
      <CharactersTable apiCharacters={apiCharacters} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
