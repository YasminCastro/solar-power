export interface Achievement {
  _id: number;
  userId: string;
  name: string;
  description?: string;
  points: number;
  createdAt: Date;
  achivementImage?: string;
}
