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
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { Routes } from '@interfaces/routes.interface';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { dbConnection } from './database';
import { connect, set, disconnect } from 'mongoose';
import Queue from './libs/queue';

import { BullAdapter } from '@bull-board/api/bullAdapter';
import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';
import { InverterModel } from './models/inverters.models';

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
    this.initializeQueues();
    // this.initializeCronJob();
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

  private initializeQueues() {
    const queues = Queue.queues.map(queue => {
      return new BullAdapter(queue.bull);
    });

    const serverAdapter = new ExpressAdapter();

    createBullBoard({
      queues,
      serverAdapter: serverAdapter,
    });

    serverAdapter.setBasePath('/admin/queues');
    this.app.use('/admin/queues', serverAdapter.getRouter());
    logger.info(`Bull dashboard running at http://localhost:${this.port}/admin/queues`);

    Queue.process();
  }

  private initializeCronJob() {
    let job = new CronJob(
      '0 */5 6-18 * * *',
      async function () {
        logger.info('Runing cronjob:' + moment().format('DD-MM-YYYY HH:mm:ss'));

        try {
          const allInverters = await InverterModel.find({});
          logger.info(`${allInverters.length} inverters found.`);

          for (const inverter of allInverters) {
            switch (inverter.model) {
              case 'hauwei':
                await Queue.add('Hauwei', { inverter });
                break;

              case 'elgin':
                await Queue.add('Elgin', { inverter });
                break;
            }
          }

          logger.info('All inverters added to the queue for processing.');
        } catch (error) {
          logger.error('Error adding inverters to the queue:', error);
        }
      },
      null,
      true,
      'America/Sao_Paulo',
    );

    job.start();
    logger.info(`is cronjob running? ${job.running} `);
  }

  public async closeDatabaseConnection() {
    await disconnect();
  }

  public async closeQueueConnections() {
    await Promise.all(Queue.queues.map(queue => queue.bull.close()));
  }
}
