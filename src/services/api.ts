export const fetchData = async (
  path = "",
  options = { page: 1, pageSize: 10 }
) => {
  const { page, pageSize } = options;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${path}?page=${page}&pageSize=${pageSize}`;

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
