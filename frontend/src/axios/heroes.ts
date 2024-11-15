import axios from "axios";
import { heroData } from "../types/data";

axios.defaults.baseURL = "http://localhost:3000/";

export async function fetchHeroes(page: number) {
  try {
    const response = await axios.get("/heroes", {
      params: {
        page: page,
        sortOrder: "desc",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchHeroData(id: string | undefined) {
  try {
    const response = await axios.get(`/heroes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function deleteHero(id: string) {
  try {
    axios.delete(`/heroes/${id}`);
  } catch (error) {
    console.error("Such hero doesnt exist! More details: ", error);
  }
}

export async function patchHero(heroData: heroData) {
  try {
    const { _id, updatedAt, createdAt, ...payload } = heroData;
    await axios.patch(`/heroes/${_id}`, payload);
  } catch (error) {
    console.error("Error patching data:", error);
  }
}

export async function postHero(heroData: string) {
  const nickname = {
    nickname: heroData,
  };
  try {
    await axios.post("/heroes", nickname);
  } catch (error) {
    console.error("Error posting data:", error);
  }
}
