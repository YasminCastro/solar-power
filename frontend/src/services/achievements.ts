import { IAchievement, IRanking } from "../interfaces/achievement";
import api from "./api";

export async function getAchievements(): Promise<IAchievement[]> {
  const { data } = await api.get(`/achievements`);

  return data;
}

export async function getRanking(userId: string): Promise<IRanking[]> {
  const { data } = await api.get(`/users/ranking/${userId}`);

  return data;
}
