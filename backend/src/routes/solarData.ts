import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { SolarDataController } from '@/controllers/solarData.controller';

export class SolarDataRoute implements Routes {
  public path = '/solar-data';
  public router = Router();
  public solarData = new SolarDataController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/hauwei/:id`, this.solarData.saveHauweiData);
    this.router.post(`${this.path}/elgin/:id`, this.solarData.saveElginData);
  }
}
