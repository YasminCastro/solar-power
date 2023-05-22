import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { ElginDataDto, HauweiDataDto } from '@/dtos/powerGenerated.dto';
import { PowerGeneratedService } from '@/services/powerGenerated.service';
import { InversorsService } from '@/services/inversors.service';
import * as Crypto from 'crypto-js';
import { CRYPTO_KEY } from '@/config';
import { Inversor } from '@prisma/client';
import { logger } from '@/utils/logger';

export class PowerGeneratedController {
  public powerGenerated = Container.get(PowerGeneratedService);
  public inversors = Container.get(InversorsService);

  public updateAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const getHauweiData = async (inversor: Inversor) => {
      const { page, browser } = await this.powerGenerated.goToPage(inversor.url);
      const hauweiData = await this.powerGenerated.hauwei(page, browser);
      const weather = await this.powerGenerated.getWeatherData(inversor.lat, inversor.long);
      const userInfo = {
        lat: inversor.lat,
        long: inversor.long,
        userId: inversor.userId,
        inversorId: inversor.id,
      };

      await this.powerGenerated.saveInversorData(hauweiData, weather, userInfo);
    };

    const getElginData = async (inversor: Inversor) => {
      const password = Crypto.AES.decrypt(inversor.password, CRYPTO_KEY);
      const username = inversor.username;

      const url = 'https://elgin.shinemonitor.com';
      const { page, browser } = await this.powerGenerated.goToPage(url);

      const elginData = await this.powerGenerated.elgin(page, browser, username, password);

      const userInfo = {
        lat: inversor.lat,
        long: inversor.long,
        userId: inversor.userId,
        inversorId: inversor.id,
      };

      const weather = await this.powerGenerated.getWeatherData(inversor.lat, inversor.long);

      await this.powerGenerated.saveInversorData(elginData, weather, userInfo);
    };

    try {
      const allInversors = await this.inversors.getAllInversors();

      for (const inversor of allInversors) {
        switch (inversor.model) {
          case 'hauwei':
            logger.info('Updating hauwei model ' + inversor.id);
            await getHauweiData(inversor);
            logger.info('Finish updating hauwei model');

            break;
          case 'elgin':
            logger.info('Updating elgin model  ' + inversor.id);
            await getElginData(inversor);
            logger.info('Finish updating elgin model');

            break;
        }
      }

      res.status(201).json();
    } catch (error) {
      next(error);
    }
  };

  public getHauweiData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { inversorId, lat, long, url, userId }: HauweiDataDto = req.body;

      const { page, browser } = await this.powerGenerated.goToPage(url);

      const hauweiData = await this.powerGenerated.hauwei(page, browser);

      const weather = await this.powerGenerated.getWeatherData(lat, long);

      const userInfo = {
        lat,
        long,
        userId,
        inversorId,
      };

      const saveInversorData = await this.powerGenerated.saveInversorData(hauweiData, weather, userInfo);

      res.status(201).json(saveInversorData);
    } catch (error) {
      next(error);
    }
  };

  public getElginData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const elginLoginInfo: ElginDataDto = req.body;
      const { inversorId, lat, long, userId, passwordIsEncrypted, password: rawPassword, username } = elginLoginInfo;

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
        inversorId,
      };

      const weather = await this.powerGenerated.getWeatherData(lat, long);

      const saveInversorData = await this.powerGenerated.saveInversorData(elginData, weather, userInfo);

      res.status(201).json(saveInversorData);
    } catch (error) {
      next(error);
    }
  };
}