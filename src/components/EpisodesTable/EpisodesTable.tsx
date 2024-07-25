import React from "react";
import { Episode } from "../../types/types";
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
import useEpisodesFilters from "../../hooks/episodes/useEpisodesFilters";

interface Props {
  apiEpisodes: any;
  totalPagess: number;
  onPageChange: any;
  currentPage: any;
}

const EpisodesTable: React.FC<Props> = ({
  apiEpisodes,
  totalPagess,
  onPageChange,
  currentPage,
}) => {
  const {
    combinedAndSortedEpisode,
    editingEpisode,
    handleFilterChange,
    startEditing,
    handleFieldChange,
    saveChanges,
  } = useEpisodesFilters(apiEpisodes);

  const episodesPerPage = 20;
  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
  const currentEpisode = combinedAndSortedEpisode.slice(
    indexOfFirstEpisode,
    indexOfLastEpisode
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
            <TableHead>Fecha de emisión</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentEpisode.map((episode) => (
            <TableRow key={episode.id}>
              <TableCell>{episode.id}</TableCell>
              <TableCell>
                {editingEpisode?.id === episode.id ? (
                  <Input
                    value={editingEpisode.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                  />
                ) : (
                  episode.name
                )}
              </TableCell>
              <TableCell>
                {editingEpisode?.id === episode.id ? (
                  <Input
                    value={editingEpisode.episode}
                    onChange={(e) =>
                      handleFieldChange("episode", e.target.value)
                    }
                  />
                ) : (
                  episode.episode
                )}
              </TableCell>
              <TableCell>
                {new Date(episode.air_date).toLocaleDateString("es-ES")}
              </TableCell>
              <TableCell>
                {editingEpisode?.id === episode.id ? (
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
