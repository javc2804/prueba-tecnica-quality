import React, { useState } from "react";
import { useCharacterStore } from "../../stores/store";
import { Character } from "../../types/types";

interface Props {
  apiCharacters: Character[];
}

const CharactersTable: React.FC<Props> = ({ apiCharacters }) => {
  const {
    characters: localCharacters,
    updateCharacter,
    editingCharacter,
    setEditingCharacter,
  } = useCharacterStore((state) => ({
    characters: state.characters,
    updateCharacter: state.updateCharacter,
    editingCharacter: state.editingCharacter,
    setEditingCharacter: state.setEditingCharacter,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 10;

  const combinedCharacters = [...localCharacters, ...apiCharacters];

  const combinedAndSortedCharacters = combinedCharacters.sort((a, b) => {
    if (a.local && !b.local) return -1;
    if (!a.local && b.local) return 1;
    return a.id - b.id;
  });

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = combinedAndSortedCharacters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const totalPages = Math.ceil(
    combinedAndSortedCharacters.length / charactersPerPage
  );

  const startEditing = (character: Character) => {
    setEditingCharacter(character);
  };

  const saveEdits = () => {
    if (editingCharacter) {
      updateCharacter(editingCharacter);
      setEditingCharacter(null);
    }
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Character
  ) => {
    if (editingCharacter) {
      setEditingCharacter({ ...editingCharacter, [field]: e.target.value });
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Estado</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCharacters.map((character) => (
            <tr key={character.id}>
              <td>{character.id}</td>
              <td>
                {editingCharacter?.id === character.id ? (
                  <input
                    type="text"
                    value={editingCharacter.name}
                    onChange={(e) => handleEditChange(e, "name")}
                  />
                ) : (
                  character.name
                )}
              </td>
              <td>
                {editingCharacter?.id === character.id
                  ? editingCharacter.status
                  : character.status}
              </td>
              <td>
                {editingCharacter?.id === character.id ? (
                  <button onClick={saveEdits}>Save</button>
                ) : (
                  <button onClick={() => startEditing(character)}>Edit</button>
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
