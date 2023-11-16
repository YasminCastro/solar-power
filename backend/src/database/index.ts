import { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD, NODE_ENV } from '@config';

let url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?authSource=admin`;

if (NODE_ENV !== 'production') {
  url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
}

console.log(url);

export const dbConnection = {
  url,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
