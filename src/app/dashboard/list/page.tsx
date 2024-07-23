"use client";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../services/api";

interface Character {
  id: number;
  name: string;
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
      <h1>Personajes de Rick and Morty</h1>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListPage;
