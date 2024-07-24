"use client";
import React, { useEffect, useState } from "react";
import { Character } from "../../../types/types";
import AddCharacterForm from "@/components/AddCharacterForm/AddCharacterForm";
import CharactersTable from "@/components/CharactersTable/CharactersTable";

const Home: React.FC = () => {
  const [apiCharacters, setApiCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch(
        "https://rickandmortyapi.com/api/character/?page=1"
      );
      const data = await response.json();
      setApiCharacters(data.results);
    };

    fetchCharacters();
  }, []);

  return (
    <div>
      <AddCharacterForm />
      <CharactersTable apiCharacters={apiCharacters} />
    </div>
  );
};

export default Home;
