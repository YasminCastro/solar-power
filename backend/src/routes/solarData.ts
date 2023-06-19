import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { ElginDataDto, HauweiDataDto } from '@/dtos/solarData';
import { SolarDataController } from '@/controllers/solarData.controller';

export class SolarDataRoute implements Routes {
  public path = '/solar-data';
  public router = Router();
  public solarData = new SolarDataController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //WEB SCRAPPING
    // this.router.post(`${this.path}`, this.powerGenerated.updateAll);
    this.router.post(`${this.path}/hauwei`, ValidationMiddleware(HauweiDataDto), this.solarData.saveHauweiData);
    this.router.post(`${this.path}/elgin`, ValidationMiddleware(ElginDataDto), this.solarData.saveElginData);
  }
}
