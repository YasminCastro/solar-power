export interface User {
  _id: string;
  email: string;
  name: string;
  password: string;
  level: number;
  createdAt: Date;
  lastLoginDate: Date;
  loginStreak: number;
}
