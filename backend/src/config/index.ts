import axios from 'axios';
import { config } from 'dotenv';
config({ path: `.env` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  CRYPTO_KEY,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  CEP_ABERTO_TOKEN,
  REDIS_HOST,
  REDIS_PORT,
} = process.env;

export const EXPIRES_IN = 604800; //7 days in seconds

export const redisConfig = { host: REDIS_HOST, posrt: REDIS_PORT };

let projectURL = NODE_ENV === 'production' ? 'http://5.189.152.65:4000' : `http://localhost:4000`;

export const cronjobApi = axios.create({ baseURL: projectURL });
