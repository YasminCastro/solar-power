import api from "./api";

export async function getPowerGeneratedRealTime(inverterId: string) {
  const { data } = await api.get(`/power-generated/real-time/${inverterId}`);

  return data;
}

export async function getToday(inverterId: string) {
  const { data } = await api.get(`/power-generated/day/${inverterId}`);

  return data;
}
export async function getMonth(inverterId: string) {
  const { data } = await api.get(`/power-generated/month/${inverterId}`);

  return data;
}

export async function getYear(inverterId: string) {
  const { data } = await api.get(`/power-generated/year/${inverterId}`);

  return data;
}
