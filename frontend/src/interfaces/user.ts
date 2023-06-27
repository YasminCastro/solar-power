import IInverter from "./inverter";

export interface IUser {
  _id: string;
  email: string;
  name: string;
  createdAt: string;
  inversors: IInverter[];
}

export interface IUserDecoded {
  _id: string;
  email: string;
  name: string;
}
