"use client";

import React, { useState } from "react";
import { useCharacterStore } from "../../stores/store";
import { Character } from "../../types/types";

const AddCharacterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const addCharacter = useCharacterStore((state) => state.addCharacter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCharacter: Character = {
      id: Date.now(),
      name,
      status,
      local: true,
    };
    addCharacter(newCharacter);
    setName("");
    setStatus("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Character Name"
      />
      <input
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        placeholder="Estado"
      />
      <button type="submit">Add Character</button>
    </form>
  );
};

export default AddCharacterForm;
