export interface Inverter {
  _id: string;
  users: string[];
  name: string;
  model: string;
  url?: string;
  password?: string;
  username?: string;
  active: boolean;
  cep: string;
  maxRealTimePower: number;
  createdAt: Date;
}
