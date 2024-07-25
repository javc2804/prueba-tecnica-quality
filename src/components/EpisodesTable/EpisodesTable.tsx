import React from "react";
import { Character } from "../../types/types";
import Pagination from "@/components/Pagination/Pagination";
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
import useCharacterFilters from "../../hooks/episodes/useEpisodesFilters";

interface Props {
  apiCharacters: Character[];
  totalPagess: number;
  onPageChange: any;
  currentPage: any;
}

const EpisodesTable: React.FC<Props> = ({
  apiCharacters,
  totalPagess,
  onPageChange,
  currentPage,
}) => {
  const {
    combinedAndSortedEpisode,
    filters,
    editingCharacter,
    handleFilterChange,
    startEditing,
    handleFieldChange,
    saveChanges,
  } = useCharacterFilters(apiCharacters);

  const episodesPerPage = 20;
  const indexOfLastCharacter = currentPage * episodesPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - episodesPerPage;
  const currentEpisode = combinedAndSortedEpisode.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

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
                placeholder="Filtrar por Episodio"
                onChange={(e) => handleFilterChange("episode", e.target.value)}
              />
            </TableHead>
            <TableHead>Air Date</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentEpisode.map((episode) => (
            <TableRow key={episode.id}>
              <TableCell>{episode.id}</TableCell>
              <TableCell>
                {editingCharacter?.id === episode.id ? (
                  <Input
                    value={editingCharacter.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                  />
                ) : (
                  episode.name
                )}
              </TableCell>
              <TableCell>
                {editingCharacter?.id === episode.id ? (
                  <Input
                    value={editingCharacter.episode}
                    onChange={(e) =>
                      handleFieldChange("episode", e.target.value)
                    }
                  />
                ) : (
                  episode.episode
                )}
              </TableCell>
              <TableCell>{episode.air_date}</TableCell>
              <TableCell>
                {editingCharacter?.id === episode.id ? (
                  <Button onClick={saveChanges}>Guardar</Button>
                ) : (
                  <Button onClick={() => startEditing(episode)}>Editar</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <Pagination
          totalPages={totalPagess}
          onPageChange={onPageChange}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default EpisodesTable;
