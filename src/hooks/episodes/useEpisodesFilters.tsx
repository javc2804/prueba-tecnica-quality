import { useState } from "react";
import { Character, Episode } from "../../types/types";
import { useCharacterStore } from "../../stores/store";

const useEpisodesFilters = (apiCharacters: Character[]) => {
  const {
    characters: localCharacters,
    setEditingCharacter,
    updateEpisode,
  } = useCharacterStore((state) => ({
    characters: state.characters,
    setEditingCharacter: state.setEditingCharacter,
    updateEpisode: state.updateEpisode,
  }));

  const [filters, setFilters] = useState<Record<keyof Episode, string>>(
    {} as Record<keyof Episode, string>
  );
  const [editingCharacter, setEditingCharacterState] =
    useState<Character | null>(null);
  const [editedField, setEditedField] = useState<string>("");

  const combinedCharacters = [...localCharacters, ...apiCharacters];

  const filteredCharacters = combinedCharacters.filter((character) =>
    Object.entries(filters).every(([field, value]) => {
      const key = field as keyof Character;
      const fieldValue = character[key]?.toString().toLowerCase();
      return fieldValue?.includes(value.toLowerCase());
    })
  );

  const combinedAndSortedEpisode = filteredCharacters.sort((a, b) => {
    if (a.local && !b.local) return -1;
    if (!a.local && b.local) return 1;
    return a.id - b.id;
  });

  const handleFilterChange = (field: keyof Character, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const startEditing = (character: Character) => {
    setEditingCharacterState(character);
  };

  const handleFieldChange = (
    field: keyof Character | keyof Episode,
    value: string
  ) => {
    if (editingCharacter) {
      setEditingCharacterState({
        ...editingCharacter,
        [field]: value,
      });
      setEditedField(field);
    }
  };

  const saveChanges = () => {
    if (editingCharacter) {
      updateEpisode(editingCharacter);
      setEditingCharacterState(null);
    }
  };

  return {
    combinedAndSortedEpisode,
    filters,
    editingCharacter,
    handleFilterChange,
    startEditing,
    handleFieldChange,
    saveChanges,
  };
};

export default useEpisodesFilters;
