import { Character } from "@/types/types";

export const fetchCharacters = async (
  page: number,
  path: any
): Promise<{ results: Character[]; info: { pages: number; path: any } }> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${path}?page=${page}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error al realizar la petición GET: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
