import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { UtilsService } from '@/services/utils.service';

export class UtilsController {
  public utils = Container.get(UtilsService);

  public getWeather = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const lat = String(req.query.lat);
      const long = String(req.query.long);
      const weather = await this.utils.getWeatherData(lat, long);
      res.status(201).json(weather);
    } catch (error) {
      next(error);
    }
  };
}
