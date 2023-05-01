import { User } from './users.interface';

export interface InversorInterface {
  id?: number;
  createdAt?: Date;
  user: User;
  userId: number;
  model: string;
  hauwei?: any;
  elgin?: any;
  powerGenerated?: any;
}
