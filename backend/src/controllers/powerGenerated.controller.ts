import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { ElginDataDto, HauweiDataDto } from '@/dtos/powerGenerated.dto';
import { PowerGeneratedService } from '@/services/powerGenerated.service';
import { InversorsService } from '@/services/inversors.service';

export class PowerGeneratedController {
  public powerGenerated = Container.get(PowerGeneratedService);
  public inversors = Container.get(InversorsService);

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
      };

      const saveInversorData = await this.powerGenerated.saveInversorData(inversorId, hauweiData, weather, userInfo);

      res.status(201).json(saveInversorData);
    } catch (error) {
      next(error);
    }
  };

  public getElginData = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const elginLoginInfo: ElginDataDto = req.body;
      const { id: userId } = req.user;
      const url = 'https://elgin.shinemonitor.com';
      const { page, browser } = await this.powerGenerated.goToPage(url);

      const elginData = await this.powerGenerated.elgin(page, browser, elginLoginInfo);

      // const saveInversorData = await this.powerGenerated.saveInversorData(req.user.id, elginData);

      res.status(201).json();
    } catch (error) {
      next(error);
    }
  };

  public updateAll = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const elginLoginInfo: ElginDataDto = req.body;
      const { id: userId } = req.user;
      const url = 'https://elgin.shinemonitor.com';
      const { page, browser } = await this.powerGenerated.goToPage(url);

      const elginData = await this.powerGenerated.elgin(page, browser, elginLoginInfo);

      // const saveInversorData = await this.powerGenerated.saveInversorData(req.user.id, elginData);

      res.status(201).json();
    } catch (error) {
      next(error);
    }
  };
}
