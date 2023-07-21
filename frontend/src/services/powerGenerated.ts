import api from "./api";

export async function getPowerGeneratedRealTime(invertersId: string) {
  const { data } = await api.get(`/power-generated/real-time`, {
    params: { invertersId },
  });

  return data;
}

export async function getAllInverters(userId: string) {
  const { data } = await api.get(`/users/${userId}`);

  return data.inverters;
}
