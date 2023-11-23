export interface IAchievement {
  _id: string;
  createdAt: string;
  userId: string;
  name: string;
  description: string;
  achivementImage?: string;
  points: number;
}

export interface IRanking {
  _id: string;
  userId: string;
  name: string;
  level: number;
}
