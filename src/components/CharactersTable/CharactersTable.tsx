"use client";

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
import Pagination from "@/components/Pagination/Pagination";

interface Props {
  apiCharacters: Character[];
  totalPagess: number;
  onPageChange: any;
  currentPage: any;
}

const CharactersTable: React.FC<Props> = ({
  apiCharacters,
  totalPagess,
  onPageChange,
  currentPage,
}) => {
  const { characters: localCharacters, setEditingCharacter } =
    useCharacterStore((state) => ({
      characters: state.characters,
      setEditingCharacter: state.setEditingCharacter,
    }));

  const [filters, setFilters] = useState<Record<keyof Character, string>>(
    {} as Record<keyof Character, string>
  );
  const charactersPerPage = 20;

  console.log(apiCharacters);
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
    setEditingCharacter(character);
  };

  const handleFilterChange = (field: keyof Character, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
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
                placeholder="Filtrar por Género"
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
            <TableRow key={character.id + Math.random()}>
              <TableCell>{character.id}</TableCell>
              <TableCell>{character.name}</TableCell>
              <TableCell>{character.gender}</TableCell>
              <TableCell>{character.status}</TableCell>
              <TableCell>{character.species}</TableCell>
              <TableCell>{character.type}</TableCell>
              <TableCell>
                <Button onClick={() => startEditing(character)}>Editar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        totalPages={totalPagess}
        onPageChange={onPageChange}
        currentPage={currentPage}
      />
    </>
  );
};

export default CharactersTable;
