import { IInverter } from "./inverter";

export interface IUser {
  _id: string;
  email: string;
  password: string;
  name: string;
  inverters: IInverter[];
}
