import api from "./api";

export async function getPowerGeneratedRealTime(invertersId: string) {
  const { data } = await api.get(`/power-generated/real-time`, {
    params: { invertersId },
  });

  return data;
}

export async function getToday(inverterId: string) {
  const { data } = await api.get(`/power-generated/day`, {
    params: { inverterId },
  });

  return data;
}
