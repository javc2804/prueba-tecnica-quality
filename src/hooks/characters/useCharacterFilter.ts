import { useState, useMemo } from "react";
import { Character } from "../../types/types";

const useCharacterFilter = (
  apiCharacters: Character[],
  localCharacters: Character[],
  charactersPerPage: number,
  currentPage: number
) => {
  const [filters, setFilters] = useState<Record<keyof Character, string>>(
    {} as Record<keyof Character, string>
  );

  const combinedCharacters = useMemo(
    () => [...localCharacters, ...apiCharacters],
    [localCharacters, apiCharacters]
  );

  const filteredCharacters = useMemo(
    () =>
      combinedCharacters.filter((character) =>
        Object.entries(filters).every(([field, value]) => {
          const key = field as keyof Character;
          const fieldValue = character[key]?.toString().toLowerCase();
          return fieldValue?.includes(value.toLowerCase());
        })
      ),
    [combinedCharacters, filters]
  );

  const combinedAndSortedCharacters = useMemo(
    () =>
      filteredCharacters.sort((a, b) => {
        if (a.local && !b.local) return -1;
        if (!a.local && b.local) return 1;
        return a.id - b.id;
      }),
    [filteredCharacters]
  );

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = useMemo(
    () =>
      combinedAndSortedCharacters.slice(
        indexOfFirstCharacter,
        indexOfLastCharacter
      ),
    [combinedAndSortedCharacters, indexOfFirstCharacter, indexOfLastCharacter]
  );

  const handleFilterChange = (field: keyof Character, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  return {
    currentCharacters,
    handleFilterChange,
  };
};

export default useCharacterFilter;
