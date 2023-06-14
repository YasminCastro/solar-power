import IInverter from "./inverter";

export interface IUser {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  inversors: IInverter[];
}

export interface IUserDecoded {
  id: number;
  email: string;
  name: string;
  exp: number;
  iat: number;
}
