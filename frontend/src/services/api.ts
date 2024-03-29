import axios from "axios";

const api = axios.create({ baseURL: "http://5.189.152.65:4000" });
// const api = axios.create({ baseURL: "http://192.168.100.15:4000" });

export const setAuthHeaders = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default api;
