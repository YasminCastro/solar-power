export interface IUser {
  _id: string;
  email: string;
  password: string;
  name: string;
}

export interface IUpdateUser {
  email: string;
  password: string;
  name: string;
}
