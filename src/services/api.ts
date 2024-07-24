export const fetchData = async (path = "", options = { page: 1 }) => {
  const { page } = options;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${path}?page=${page}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(
        `Error HTTP: ${response.status} al realizar la petición GET`
      );
      throw new Error(`Error al realizar la petición GET: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en fetchData:", error);
    throw error;
  }
};

export const fetchCharacters = async (page: number) => {
  const data = await fetchData("character", { page });
  return data;
};
