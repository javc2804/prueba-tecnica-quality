import React, { useState } from "react";
import { useCharacterStore } from "../../stores/store";
import { Character, Episode } from "../../types/types";

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
  const [filters, setFilters] = useState<Record<keyof Episode, string>>(
    {} as Record<keyof Episode, string>
  );
  const [editingCharacter, setEditingCharacterState] = useState<Episode | null>(
    null
  );
  const [editedField, setEditedField] = useState<string>("");
  const episodesPerPage = 10;

  const combinedCharacters = [...localCharacters, ...apiCharacters];

  const filteredCharacters = combinedCharacters.filter((character) =>
    Object.entries(filters).every(([field, value]) => {
      const key = field as keyof Character;
      const fieldValue = character[key]?.toString().toLowerCase();
      return fieldValue?.includes(value.toLowerCase());
    })
  );

  const combinedAndSortedEpisode = filteredCharacters.sort((a, b) => {
    if (a.local && !b.local) return -1;
    if (!a.local && b.local) return 1;
    return a.id - b.id;
  });

  const indexOfLastCharacter = currentPage * episodesPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - episodesPerPage;
  const currentEpisode = combinedAndSortedEpisode.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const startEditing = (character: Episode) => {
    setEditingCharacterState(character);
  };

  const handleFilterChange = (field: keyof Character, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const handleFieldChange = (
    field: keyof Character | keyof Episode,
    value: string
  ) => {
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
                placeholder="Filtrar por Episode"
                onChange={(e) => handleFilterChange("gender", e.target.value)}
              />
            </TableHead>

            <TableHead>Air Date</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentEpisode.map((character) => (
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
              <TableCell>
                {editingCharacter?.id === character.id ? (
                  <Input
                    value={editingCharacter.episode}
                    onChange={(e) =>
                      handleFieldChange("episode", e.target.value)
                    }
                  />
                ) : (
                  character.episode
                )}
              </TableCell>
              <TableCell>
                {editingCharacter?.id === character.id ? (
                  <Input
                    value={editingCharacter.air_date}
                    onChange={(e) =>
                      handleFieldChange("air_date", e.target.value)
                    }
                  />
                ) : (
                  character.air_date
                )}
              </TableCell>
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
