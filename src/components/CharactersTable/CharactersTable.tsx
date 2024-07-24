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
}

const CharactersTable: React.FC<Props> = ({ apiCharacters }) => {
  const { characters: localCharacters, setEditingCharacter } =
    useCharacterStore((state) => ({
      characters: state.characters,
      updateCharacter: state.updateCharacter,
      editingCharacter: state.editingCharacter,
      setEditingCharacter: state.setEditingCharacter,
    }));

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [filterField, setFilterField] = useState<keyof Character>("name");
  const charactersPerPage = 10;

  const combinedCharacters = [...localCharacters, ...apiCharacters];

  const filteredCharacters = combinedCharacters.filter((character) => {
    if (!filter || !filterField) return true;
    const fieldValue = character[filterField]?.toString().toLowerCase();
    return fieldValue?.includes(filter.toLowerCase());
  });

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

  const totalPages = Math.ceil(filteredCharacters.length / charactersPerPage);

  const startEditing = (character: Character) => {
    setEditingCharacter(character);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <Input
                placeholder="Filtrar por ID"
                onChange={(e) => {
                  setFilterField("id");
                  setFilter(e.target.value);
                }}
              />
            </TableHead>
            <TableHead>
              <Input
                placeholder="Filtrar por Nombre"
                onChange={(e) => {
                  setFilterField("name");
                  setFilter(e.target.value);
                }}
              />
            </TableHead>
            <TableHead>
              <Input
                placeholder="Filtrar por Estado"
                onChange={(e) => {
                  setFilterField("status");
                  setFilter(e.target.value);
                }}
              />
            </TableHead>
            <TableHead>
              <Input
                placeholder="Filtrar por Especie"
                onChange={(e) => {
                  setFilterField("species");
                  setFilter(e.target.value);
                }}
              />
            </TableHead>
            <TableHead>
              <Input
                placeholder="Filtrar por Tipo"
                onChange={(e) => {
                  setFilterField("type");
                  setFilter(e.target.value);
                }}
              />
            </TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentCharacters.map((character) => (
            <TableRow key={character.id}>
              <TableCell>{character.id}</TableCell>
              <TableCell>{character.name}</TableCell>
              <TableCell>{character.status}</TableCell>
              <TableCell>{character.species}</TableCell>
              <TableCell>{character.type}</TableCell>
              <TableCell>
                <Button onClick={() => startEditing(character)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default CharactersTable;
