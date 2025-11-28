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
}
