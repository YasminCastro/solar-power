import { Achievement } from './achievement.interface';
import { Inverter } from './inverter.interface';

export interface User {
  _id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  inverters?: Inverter[];
  achievements: Array<Achievement>;
}
