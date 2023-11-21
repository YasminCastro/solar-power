export interface IAchievement {
  _id: string;
  createdAt: string;
  userId: string;
  name: string;
  description: string;
  achivementImage?: string;
  points: number;
}
