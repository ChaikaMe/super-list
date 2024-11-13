import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/";

export async function fetchHeroes(page: number) {
  try {
    const response = await axios.get("/heroes", {
      params: { page: page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
