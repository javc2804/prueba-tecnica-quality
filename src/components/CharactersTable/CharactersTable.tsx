"use client";
import React, { useEffect, useState } from "react";
import { useCharacterStore } from "../../stores/store";
import { Character } from "../../types/types";

interface Props {
  apiCharacters: Character[];
}

const CharactersTable: React.FC<Props> = ({ apiCharacters }) => {
  const localCharacters = useCharacterStore((state) => state.characters);
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 10;

  const combinedAndSortedCharacters = [
    ...localCharacters,
    ...apiCharacters,
  ].sort((a, b) => a.id - b.id);

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = combinedAndSortedCharacters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const totalPages = Math.ceil(
    combinedAndSortedCharacters.length / charactersPerPage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {currentCharacters.map((character) => (
            <tr key={character.id}>
              <td>{character.id}</td>
              <td>{character.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CharactersTable;
