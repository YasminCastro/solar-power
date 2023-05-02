import { Request } from 'express';

export interface DataStoredInToken {
  id: number;
  name: string;
  lat: string;
  long: string;
  email: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: DataStoredInToken;
}
