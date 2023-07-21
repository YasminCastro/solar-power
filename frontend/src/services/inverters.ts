import api from "./api";

export async function editInverterStatus(inverterId: string, active: boolean) {
  const { data } = await api.put(`/inverters/${inverterId}`, { active });

  return data;
}

export async function getAllInverters(userId: string) {
  const { data } = await api.get(`/users/${userId}`);

  return data.inverters;
}
