"use client";
import React from "react";
import AddCharacterForm from "@/components/AddCharacterForm/AddCharacterForm";
import CharactersTable from "@/components/CharactersTable/CharactersTable";
import useCharacters from "@/hooks/characters/useCharacters";
import Loading from "@/components/Loading/Loading";

const Home: React.FC = () => {
  const { apiCharacters, currentPage, totalPages, handlePageChange, loading } =
    useCharacters();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {loading ? (
        <div className="flex flex-1 items-center justify-center min-h-screen">
          <Loading />
        </div>
      ) : (
        <>
          <div className="md:w-2/5 w-full">
            <AddCharacterForm />
          </div>
          <div className="md:w-3/5 w-full">
            <CharactersTable
              apiCharacters={apiCharacters}
              totalPagess={totalPages}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
