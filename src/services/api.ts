export const fetchData = async (path = "") => {
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/${path}`);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`);
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
