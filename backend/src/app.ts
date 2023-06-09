import 'reflect-metadata';
const CronJob = require('cron').CronJob;
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import moment from 'moment';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS, cronjobApi, ELGIN_USER, ELGIN_PASSWORD } from '@config';
import { Routes } from '@interfaces/routes.interface';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { dbConnection } from './database';
import { connect, set } from 'mongoose';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();

    let job = new CronJob(
      '0 */5 6-18 * * *',
      async function () {
        logger.info('Runing cronjob:' + moment().format('DD-MM-YYYY HH:mm:ss'));

        try {
          await cronjobApi.post(`/solar-data`);
        } catch (error) {
          logger.error('Cronjob Error to update data');
          logger.error(error);
        }
      },
      null,
      true,
      'America/Sao_Paulo',
    );

    job.start();
    logger.info(`is job running? ${job.running} `);
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    await connect(dbConnection.url);
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
