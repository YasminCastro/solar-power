export interface IInverter {
  _id: string;
  userId: string;
  name: string;
  model: string;
  url?: string;
  password?: string;
  username?: string;
  active: boolean;
  cep: string;
  lat: string;
  long: string;
  maxRealTimePower: number;
  createdAt: Date;
}

export interface ICreateInverter {
  name: string;
  model: string;
  url?: string;
  password?: string;
  username?: string;
  active: boolean;
  cep: string;
  lat: string;
  long: string;
  maxRealTimePower: string;
}

export interface IUpdateInverter {
  name: string;
  model: string;
  url?: string;
  password?: string;
  username?: string;
  active: boolean;
  cep: string;
  lat: string;
  long: string;
  maxRealTimePower: string;
}
