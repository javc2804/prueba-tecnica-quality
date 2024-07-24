"use client";

import React, { useState } from "react";
import { useCharacterStore } from "../../stores/store";
import { Character } from "../../types/types";

const AddCharacterForm: React.FC = () => {
  const [name, setName] = useState("");
  const addCharacter = useCharacterStore((state) => state.addCharacter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCharacter: Character = {
      id: Date.now(), // Simplicidad: usar timestamp como ID
      name,
    };
    addCharacter(newCharacter);
    setName(""); // Resetear el campo después de agregar
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Character Name"
      />
      <button type="submit">Add Character</button>
    </form>
  );
};

export default AddCharacterForm;
