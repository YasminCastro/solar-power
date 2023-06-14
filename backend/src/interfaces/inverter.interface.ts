import { User } from './users.interface';

export interface Inverter {
  id?: number;
  createdAt?: Date;
  user: User;
  userId: number;
  model: string;
  hauwei?: any;
  elgin?: any;
  powerGenerated?: number;
}
