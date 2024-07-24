import React, { useEffect, useState } from "react";
import { useCharacterStore } from "../../stores/store";
import { Character } from "../../types/types";

const AddCharacterForm: React.FC = () => {
  const editingCharacter = useCharacterStore((state) => state.editingCharacter);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const addCharacter = useCharacterStore((state) => state.addCharacter);
  const updateCharacter = useCharacterStore((state) => state.updateCharacter);
  const setEditingCharacter = useCharacterStore(
    (state) => state.setEditingCharacter
  );

  useEffect(() => {
    if (editingCharacter) {
      setName(editingCharacter.name);
      setStatus(editingCharacter.status);
    }
  }, [editingCharacter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCharacter) {
      updateCharacter({ ...editingCharacter, name, status });
    } else {
      addCharacter({ id: Date.now(), name, status, local: true });
    }
    setName("");
    setStatus("");
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
      <button type="submit">Save Character</button>
    </form>
  );
};

export default AddCharacterForm;
