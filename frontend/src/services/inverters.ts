import { IInverterCreateUpdate } from "../interfaces/inverter";
import api from "./api";

export async function editInverterStatus(inverterId: string, active: boolean) {
  const { data } = await api.put(`/inverters/${inverterId}`, { active });

  return data;
}

export async function getUserInverters(userId: string) {
  const { data } = await api.get(`/inverters/user/${userId}`);

  return data;
}

export async function createInverter(inverterData: IInverterCreateUpdate) {
  const { data } = await api.post(`/inverters`, {
    ...inverterData,
    maxRealTimePower: parseInt(inverterData.maxRealTimePower),
  });

  return data;
}
