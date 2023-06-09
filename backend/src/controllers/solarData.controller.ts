import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { ElginDataDto, HauweiDataDto } from '@/dtos/solarData';
import { InvertersService } from '@/services/inverters.service';
import { UtilsService } from '@/services/utils.service';
import { SolarDataService } from '@/services/solarData.service';
import { logger } from '@/utils/logger';

export class SolarDataController {
  public solarData = Container.get(SolarDataService);
  public inverters = Container.get(InvertersService);
  public utils = Container.get(UtilsService);

  public saveAllData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inveters = await this.solarData.getAllInveters();

      for (let inverter of inveters) {
        switch (inverter.model) {
          case 'hauwei':
            try {
              logger.info(`Searching Hauwei data...`);
              await this.solarData.saveHauweiData({
                inverterId: inverter._id,
                userId: inverter.userId,
                lat: inverter.lat,
                long: inverter.long,
                url: inverter.url,
              });
              logger.info(`Hauwei data saved: ${inverter._id}`);
            } catch (error) {
              logger.error(error);
            }

            break;

          case 'elgin':
            try {
              logger.info(`Searching Elgin data...`);
              await this.solarData.saveElginData({
                inverterId: inverter._id,
                userId: inverter.userId,
                lat: inverter.lat,
                long: inverter.long,
                password: inverter.password,
                username: inverter.username,
                passwordIsEncrypted: true,
              });
              logger.info(`Elgin data saved: ${inverter._id}`);
            } catch (error) {
              logger.error(error);
            }

            break;
        }
      }

      res.status(201).json({ message: 'ok' });
    } catch (error) {
      next(error);
    }
  };

  public saveHauweiData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const hauweiLoginInfo: HauweiDataDto = req.body;

      const hauweiData = await this.solarData.saveHauweiData(hauweiLoginInfo);

      res.status(201).json(hauweiData);
    } catch (error) {
      next(error);
    }
  };

  public saveElginData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const elginLoginInfo: ElginDataDto = req.body;

      const elginData = await this.solarData.saveElginData(elginLoginInfo);

      res.status(201).json(elginData);
    } catch (error) {
      next(error);
    }
  };
}
