import { IAchievement } from "../interfaces/achievement";
import api from "./api";

export async function getAchievements(): Promise<IAchievement[]> {
  const { data } = await api.get(`/achievements`);

  return data;
}
