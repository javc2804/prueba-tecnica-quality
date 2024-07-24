"use client";
import React from "react";
import AddCharacterForm from "@/components/AddCharacterForm/AddCharacterForm";
import CharactersTable from "@/components/CharactersTable/CharactersTable";
import Pagination from "@/components/Pagination/Pagination";
import useCharacters from "@/hooks/useCharacters";

const Home: React.FC = () => {
  const { characters, currentPage, totalPages, error, handlePageChange } =
    useCharacters();

  if (error) {
    return <div>Error Consultando personajes: {error.message}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-2/5 w-full">
        <AddCharacterForm />
      </div>
      <div className="md:w-3/5 w-full">
        <CharactersTable apiCharacters={characters} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home;
