"use client";

import React from "react";
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
import useCharacterFilter from "../../hooks/characters/useCharacterFilter";

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

  const charactersPerPage = 20;

  const { currentCharacters, handleFilterChange } = useCharacterFilter(
    apiCharacters,
    localCharacters,
    charactersPerPage,
    currentPage
  );

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
