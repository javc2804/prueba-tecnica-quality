"use client";
import React, { useEffect, useState } from "react";
import { useCharacterStore } from "../../stores/store";
import { Character } from "../../types/types";

interface Props {
  apiCharacters: Character[];
}

const CharactersTable: React.FC<Props> = ({ apiCharacters }) => {
  const localCharacters = useCharacterStore((state) => state.characters);
  console.log(localCharacters);
  const updateCharacter = useCharacterStore((state) => state.updateCharacter);
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 10;
  const [editingCharacter, setEditingCharacter] = useState<number | null>(null);
  const [characterEdits, setCharacterEdits] = useState<Character | null>(null);

  const combinedCharacters = [...localCharacters, ...apiCharacters];

  const combinedAndSortedCharacters = combinedCharacters.sort((a, b) => {
    if (a.local && !b.local) return -1;
    if (!a.local && b.local) return 1;
    return a.id - b.id;
  });
  useEffect(() => {}, [localCharacters]);

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = combinedAndSortedCharacters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const totalPages = Math.ceil(
    combinedAndSortedCharacters.length / charactersPerPage
  );

  const startEditing = (id: number) => {
    const character = combinedAndSortedCharacters.find(
      (character) => character.id === id
    );
    if (character) {
      setEditingCharacter(id);
      setCharacterEdits({ ...character });
    }
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Character
  ) => {
    if (characterEdits) {
      setCharacterEdits({ ...characterEdits, [field]: e.target.value });
    }
  };

  const saveEdits = () => {
    if (editingCharacter && characterEdits) {
      updateCharacter(characterEdits);
      setEditingCharacter(null);
      setCharacterEdits(null);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCharacters.map((character) => (
            <tr key={character.id}>
              <td>{character.id}</td>
              <td>
                {editingCharacter === character.id ? (
                  <input
                    type="text"
                    value={characterEdits?.name || ""}
                    onChange={(e) => handleEditChange(e, "name")}
                  />
                ) : (
                  character.name
                )}
              </td>
              <td>
                {editingCharacter === character.id ? (
                  <button onClick={saveEdits}>Save</button>
                ) : (
                  <button onClick={() => startEditing(character.id)}>
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CharactersTable;
