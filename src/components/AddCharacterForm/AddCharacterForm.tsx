import React, { useEffect, useState } from "react";
import { useCharacterStore } from "../../stores/store";
import { characterSchema } from "../../models/characterSchema";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "../ui/input";

const AddCharacterForm: React.FC = () => {
  const { toast } = useToast();

  const editingCharacter = useCharacterStore((state) => state.editingCharacter);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const [type, setType] = useState("");
  const addCharacter = useCharacterStore((state) => state.addCharacter);
  const updateCharacter = useCharacterStore((state) => state.updateCharacter);
  const setEditingCharacter = useCharacterStore(
    (state) => state.setEditingCharacter
  );

  useEffect(() => {
    if (editingCharacter) {
      setName(editingCharacter.name);
      setStatus(editingCharacter.status);
      setSpecies(editingCharacter.species || "");
      setType(editingCharacter.type || "");
    }
  }, [editingCharacter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const characterData = {
      name,
      status,
      species,
      type,
    };

    const result = characterSchema.safeParse(characterData);

    const notify = (title: string, description: string) => {
      toast({
        title,
        description,
      });
    };

    if (!result.success) {
      notify("Error", "Verifica los campos hay un error");
      return;
    }

    if (editingCharacter) {
      updateCharacter({ ...editingCharacter, ...result.data });
      notify("Correcto", "Personaje actualizado correctamente");
    } else {
      addCharacter({
        id: Date.now(),
        ...result.data,
        local: true,
      });
      notify("Correcto", "Personaje creado correctamente");
    }

    setName("");
    setStatus("");
    setSpecies("");
    setType("");
    setEditingCharacter(null);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <h1 className="text-center text-2xl font-bold my-4">
        {editingCharacter ? "Editar Personaje" : "Crear Personaje"}
      </h1>{" "}
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre"
        className="border border-green-300 p-2 rounded-md"
      />
      <Input
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        placeholder="Estado"
        className="border border-green-300 p-2 rounded-md"
      />
      <Input
        type="text"
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
        placeholder="Especie"
        className="border border-green-300 p-2 rounded-md"
      />
      <Input
        type="text"
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Tipo"
        className="border border-green-300 p-2 rounded-md"
      />
      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
      >
        Guardar
      </button>
    </form>
  );
};

export default AddCharacterForm;
