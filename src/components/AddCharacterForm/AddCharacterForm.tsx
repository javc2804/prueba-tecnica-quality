import React, { useEffect, useState } from "react";
import { useCharacterStore } from "../../stores/store";
import { Character } from "../../types/types";

const AddCharacterForm: React.FC = () => {
  const editingCharacter = useCharacterStore((state) => state.editingCharacter);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState(""); // Nuevo estado para especie
  const [type, setType] = useState(""); // Nuevo estado para tipo
  const addCharacter = useCharacterStore((state) => state.addCharacter);
  const updateCharacter = useCharacterStore((state) => state.updateCharacter);
  const setEditingCharacter = useCharacterStore(
    (state) => state.setEditingCharacter
  );

  useEffect(() => {
    if (editingCharacter) {
      setName(editingCharacter.name);
      setStatus(editingCharacter.status);
      setSpecies(editingCharacter.species || ""); // Ajuste para especie
      setType(editingCharacter.type || ""); // Ajuste para tipo
    }
  }, [editingCharacter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCharacter) {
      updateCharacter({ ...editingCharacter, name, status, species, type });
    } else {
      addCharacter({
        id: Date.now(),
        name,
        status,
        species,
        type,
        local: true,
      });
    }
    setName("");
    setStatus("");
    setSpecies(""); // Limpiar estado de especie
    setType(""); // Limpiar estado de tipo
    setEditingCharacter(null);
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
      <input
        type="text"
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
        placeholder="Especie"
      />
      <input
        type="text"
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Tipo"
      />
      <button type="submit">Save Character</button>
    </form>
  );
};

export default AddCharacterForm;
