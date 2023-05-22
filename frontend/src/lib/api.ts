import axios from "axios";
import { API_URL } from "@env";

const api = axios.create({ baseURL: API_URL });

export const setAuthHeaders = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default api;
