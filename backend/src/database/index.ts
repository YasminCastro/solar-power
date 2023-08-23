import { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } from '@config';

const prodUrl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?authSource=admin`;
const devUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

export const dbConnection = {
  url: prodUrl,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
