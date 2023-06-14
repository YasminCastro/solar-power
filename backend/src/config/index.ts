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
  WEATHER_API_KEY,
  CRYPTO_KEY,
  ELGIN_PASSWORD,
  ELGIN_USER,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
} = process.env;

export const EXPIRES_IN = 604800; //7 days in seconds

export const weatherApi = axios.create({ baseURL: `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&aqi=no` });

let projectURL = NODE_ENV === 'production' ? 'http://5.189.152.65:4000' : `http://localhost:4000`;

export const cronjobApi = axios.create({ baseURL: projectURL });
