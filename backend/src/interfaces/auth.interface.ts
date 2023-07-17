import { Request } from 'express';

export interface DataStoredInToken {
  _id: string;
  name: string;
  email: string;
  inverters: any[];
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: DataStoredInToken;
}
