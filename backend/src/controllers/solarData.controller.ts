import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { ElginDataDto, HauweiDataDto } from '@/dtos/solarData';
import { InvertersService } from '@/services/inverters.service';
import * as Crypto from 'crypto-js';
import { CRYPTO_KEY } from '@/config';
import { UtilsService } from '@/services/utils.service';
import { SolarDataService } from '@/services/solarData.service';

export class SolarDataController {
  public solarData = Container.get(SolarDataService);
  public inverters = Container.get(InvertersService);
  public utils = Container.get(UtilsService);

  public saveHauweiData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { inverterId, lat, long, url, userId }: HauweiDataDto = req.body;

      const { page, browser } = await this.solarData.goToPage(url);

      const hauweiData = await this.solarData.hauwei(page, browser);

      const weather = await this.utils.getWeatherData(lat, long);

      const userInfo = {
        lat,
        long,
        userId,
        inverterId,
      };

      const saveInversorData = await this.solarData.saveInversorData(hauweiData, weather, userInfo);

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
      const { page, browser } = await this.solarData.goToPage(url);

      const elginData = await this.solarData.elgin(page, browser, username, password);

      const userInfo = {
        lat,
        long,
        userId,
        inverterId,
      };

      const weather = await this.utils.getWeatherData(lat, long);
      const powerInRealTime = await this.solarData.calculateRealTimePower(parseFloat(inverterId), parseFloat(elginData.powerToday));

      elginData.powerInRealTime = `${powerInRealTime}kW`;

      if (!powerInRealTime) elginData.powerInRealTime = `0kW`;

      const saveInversorData = await this.solarData.saveInversorData(elginData, weather, userInfo);

      res.status(201).json(saveInversorData);
    } catch (error) {
      next(error);
    }
  };
}
