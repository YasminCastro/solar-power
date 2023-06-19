import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { ElginDataDto, HauweiDataDto } from '@/dtos/powerGenerated.dto';
import { PowerGeneratedService } from '@/services/powerGenerated.service';
import { InvertersService } from '@/services/inverters.service';
import * as Crypto from 'crypto-js';
import { CRYPTO_KEY } from '@/config';
import { Inversor } from '@prisma/client';
import { logger } from '@/utils/logger';
import { HttpException } from '@/exceptions/httpException';
import { UtilsService } from '@/services/utils.service';
import { RequestWithUser } from '@/interfaces/auth.interface';
import moment from 'moment';
import { PowerGenerated } from '@/interfaces/powerGenerated.interface';
import isValidDateFormat from '@/utils/isValidDateFormat';

export class PowerGeneratedController {
  public powerGenerated = Container.get(PowerGeneratedService);
  public inverters = Container.get(InvertersService);
  public utils = Container.get(UtilsService);

  // public updateAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   const getHauweiData = async (inverter: Inversor) => {
  //     const { page, browser } = await this.powerGenerated.goToPage(inverter.url);
  //     const hauweiData = await this.powerGenerated.hauwei(page, browser);
  //     const weather = await this.utils.getWeatherData(inverter.lat, inverter.long);
  //     const userInfo = {
  //       lat: inverter.lat,
  //       long: inverter.long,
  //       userId: inverter.userId,
  //       inverterId: inverter.id,
  //     };

  //     // await this.powerGenerated.saveInversorData(hauweiData, weather, userInfo);
  //   };

  //   const getElginData = async (inversor: Inversor) => {
  //     const password = Crypto.AES.decrypt(inversor.password, CRYPTO_KEY);
  //     const username = inversor.username;

  //     const url = 'https://elgin.shinemonitor.com';
  //     const { page, browser } = await this.powerGenerated.goToPage(url);

  //     const elginData = await this.powerGenerated.elgin(page, browser, username, password);

  //     const userInfo = {
  //       lat: inversor.lat,
  //       long: inversor.long,
  //       userId: inversor.userId,
  //       inversorId: inversor.id,
  //     };

  //     const weather = await this.utils.getWeatherData(inversor.lat, inversor.long);

  //     await this.powerGenerated.saveInversorData(elginData, weather, userInfo);
  //   };

  //   try {
  //     const allInversors = await this.inverters.getAllInversors();

  //     for (const inversor of allInversors) {
  //       switch (inversor.model) {
  //         case 'hauwei':
  //           logger.info('Updating hauwei model ' + inversor.id);
  //           await getHauweiData(inversor);
  //           logger.info('Finish updating hauwei model');

  //           break;
  //         case 'elgin':
  //           logger.info('Updating elgin model  ' + inversor.id);
  //           await getElginData(inversor);
  //           logger.info('Finish updating elgin model');

  //           break;
  //       }
  //     }

  //     res.status(201).json();
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  public saveHauweiData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { inverterId, lat, long, url, userId }: HauweiDataDto = req.body;

      const { page, browser } = await this.powerGenerated.goToPage(url);

      const hauweiData = await this.powerGenerated.hauwei(page, browser);

      const weather = await this.utils.getWeatherData(lat, long);

      const userInfo = {
        lat,
        long,
        userId,
        inverterId,
      };

      const saveInversorData = await this.powerGenerated.saveInversorData(hauweiData, weather, userInfo);

      res.status(201).json(saveInversorData);
    } catch (error) {
      next(error);
    }
  };

  public saveElginData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const elginLoginInfo: ElginDataDto = req.body;
      const { inverterId, lat, long, userId, passwordIsEncrypted, password: rawPassword, username } = elginLoginInfo;

      let password = rawPassword;

      if (passwordIsEncrypted) {
        password = Crypto.AES.decrypt(rawPassword, CRYPTO_KEY);
      }

      const url = 'https://elgin.shinemonitor.com';
      const { page, browser } = await this.powerGenerated.goToPage(url);

      const elginData = await this.powerGenerated.elgin(page, browser, username, password);

      const userInfo = {
        lat,
        long,
        userId,
        inverterId,
      };

      const weather = await this.utils.getWeatherData(lat, long);
      const powerInRealTime = await this.powerGenerated.calculateRealTimePower(parseFloat(inverterId), parseFloat(elginData.powerToday));

      elginData.powerInRealTime = `${powerInRealTime}kW`;

      if (!powerInRealTime) elginData.powerInRealTime = `0kW`;

      const saveInversorData = await this.powerGenerated.saveInversorData(elginData, weather, userInfo);

      res.status(201).json(saveInversorData);
    } catch (error) {
      next(error);
    }
  };

  public getPowerGeneratedData = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user._id;
      const invertersIdString = req.query.invertersId as string;
      let limit = Number(req.query.limit) || 1;
      let startDate = (req.query.startDate as string) || moment().format('DD-MM-YYYY');
      let endDate = (req.query.endDate as string) || moment().format('DD-MM-YYYY');

      if (!invertersIdString) {
        throw new HttpException(409, 'invertersId is required');
      }

      if (!isValidDateFormat(startDate) && !isValidDateFormat(startDate)) {
        throw new HttpException(409, 'Date must be in the format DD-MM-YYYY');
      }

      let invertersId: string[] = invertersIdString.split(',');
      let powerGeneratedRaw: PowerGenerated[] = [];

      for (let inverterId of invertersId) {
        const powerGeneratedById = await this.powerGenerated.getByInverterId(userId, inverterId, limit, startDate, endDate);
        console.log(powerGeneratedById);
      }

      // if (inverterId) {
      //   const powerGeneratedById = await this.powerGenerated.getByInverterId(userId, inverterId, limit);
      //   res.status(201).json(powerGeneratedById);
      // } else if (invertersId) {
      //   const powerGeneratedJoined = await this.powerGenerated.joinPowerGenerated(userId, invertersId, limit);
      //   res.status(201).json([powerGeneratedJoined]);
      // }

      // if (invertersId) {
      //   // const powerGeneratedJoined = await this.powerGenerated.joinPowerGenerated(userId, invertersIdString);
      //   // res.status(201).json([powerGeneratedJoined]);
      //   console.log("AQUI 1")
      //   return
      // } else if (todayData) {
      //   const powerGeneratedToday = await this.powerGenerated.getTodayData(userId, inverterId);
      //   res.status(201).json(powerGeneratedToday);
      // } else if (inverterId) {
      //   const powerGeneratedById = await this.powerGenerated.getByInverterId(userId, inverterId, limit);
      //   res.status(201).json(powerGeneratedById);
      // } else {
      //   const powerGeneratedByUserId = await this.powerGenerated.getByUserId(userId, limit);
      //   res.status(201).json(powerGeneratedByUserId);
      // }
    } catch (error) {
      next(error);
    }
  };
}
