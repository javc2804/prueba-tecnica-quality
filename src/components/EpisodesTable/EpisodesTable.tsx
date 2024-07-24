import React, { useState } from "react";
import { useCharacterStore } from "../../stores/store";
import { Character } from "../../types/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Props {
  apiCharacters: Character[];
  totalPagess: number;
}

const EpisodesTable: React.FC<Props> = ({ apiCharacters, totalPagess }) => {
  const {
    characters: localCharacters,
    setEditingCharacter,
    updateEpisode,
  } = useCharacterStore((state) => ({
    characters: state.characters,
    setEditingCharacter: state.setEditingCharacter,
    updateEpisode: state.updateEpisode,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<keyof Character, string>>(
    {} as Record<keyof Character, string>
  );
  const [editingCharacter, setEditingCharacterState] =
    useState<Character | null>(null);
  const [editedField, setEditedField] = useState<string>("");
  const charactersPerPage = 10;

  const combinedCharacters = [...localCharacters, ...apiCharacters];

  const filteredCharacters = combinedCharacters.filter((character) =>
    Object.entries(filters).every(([field, value]) => {
      const key = field as keyof Character;
      const fieldValue = character[key]?.toString().toLowerCase();
      return fieldValue?.includes(value.toLowerCase());
    })
  );

  const combinedAndSortedCharacters = filteredCharacters.sort((a, b) => {
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

  const startEditing = (character: Character) => {
    setEditingCharacterState(character);
  };

  const handleFilterChange = (field: keyof Character, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const handleFieldChange = (field: keyof Character, value: string) => {
    if (editingCharacter) {
      setEditingCharacterState({
        ...editingCharacter,
        [field]: value,
      });
      setEditedField(field);
    }
  };

  const saveChanges = () => {
    if (editingCharacter) {
      updateEpisode(editingCharacter);
      setEditingCharacterState(null);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <Input
                placeholder="Filtrar por ID"
                onChange={(e) => handleFilterChange("id", e.target.value)}
              />
            </TableHead>
            <TableHead>
              <Input
                placeholder="Filtrar por Nombre"
                onChange={(e) => handleFilterChange("name", e.target.value)}
              />
            </TableHead>
            <TableHead>
              <Input
                placeholder="Filtrar por Genero"
                onChange={(e) => handleFilterChange("gender", e.target.value)}
              />
            </TableHead>
            <TableHead>
              <Input
                placeholder="Filtrar por Estado"
                onChange={(e) => handleFilterChange("status", e.target.value)}
              />
            </TableHead>
            <TableHead>
              <Input
                placeholder="Filtrar por Especie"
                onChange={(e) => handleFilterChange("species", e.target.value)}
              />
            </TableHead>
            <TableHead>
              <Input
                placeholder="Filtrar por Tipo"
                onChange={(e) => handleFilterChange("type", e.target.value)}
              />
            </TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentCharacters.map((character) => (
            <TableRow key={character.id}>
              <TableCell>{character.id}</TableCell>
              <TableCell>
                {editingCharacter?.id === character.id ? (
                  <Input
                    value={editingCharacter.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                  />
                ) : (
                  character.name
                )}
              </TableCell>
              <TableCell>{character.gender}</TableCell>
              <TableCell>{character.status}</TableCell>
              <TableCell>{character.species}</TableCell>
              <TableCell>{character.type}</TableCell>
              <TableCell>
                {editingCharacter?.id === character.id ? (
                  <Button onClick={saveChanges}>Guardar</Button>
                ) : (
                  <Button onClick={() => startEditing(character)}>
                    Editar
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        {Array.from({ length: totalPagess }, (_, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default EpisodesTable;
