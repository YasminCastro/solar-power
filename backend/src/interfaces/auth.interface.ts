import { Request } from 'express';

export interface DataStoredInToken {
  _id: number;
  name: string;
  email: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: DataStoredInToken;
}
