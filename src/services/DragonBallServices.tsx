import axios from "axios";

const URL = "https://dragonball-api.com/api";

export class DragonBallService {
  async getPersonajes(page = 1) {
    const response = await axios.get(URL + `/characters?page=${page}&limit=1`);
    return response.data.items;
  }

  async getPersonajesTodos(page = 1) {
    const response = await axios.get(`${URL}/characters?page=${page}`);
    return response.data.items || [];
  }

  async getPersonajeFull(id = 1) {
    const { data } = await axios.get(`${URL}/characters/${id}`);
    return data;
  }

  async getPlanetas(page = 1) {
    const response = await axios.get(URL + `/planets?page=${page}&limit=20`);
    return response.data.items;
  }
}
