// Importaciones necesarias
"use client";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../services/api";
import { TableCharacter } from "@/components/table/TableCharacter";

interface Character {
  id: string;
  gender: number;
  status: string;
  species: string;
  name: string;
  data: object;
}

const ListPage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const data = await fetchData("character");
        setCharacters(data.results);
      } catch (error) {
        console.error("Error al obtener los personajes:", error);
      }
    };

    getCharacters();
  }, []);

  return (
    <div>
      {characters.length > 0 ? (
        <TableCharacter data={characters} />
      ) : (
        <p>Cargando personajes...</p>
      )}
    </div>
  );
};

export default ListPage;
