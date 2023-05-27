import Inverters from "./inverters";

export interface IUser {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  inversors: Inverters[];
}

export interface IUserDecoded {
  id: number;
  email: string;
  name: string;
}
