import api from "./api";

export async function editInverterStatus(inverterId: string, active: boolean) {
  const { data } = await api.put(`/inverters/${inverterId}`, { active });

  return data;
}

export async function getUserInverters(userId: string) {
  const { data } = await api.get(`/inverters/user/${userId}`);

  return data;
}