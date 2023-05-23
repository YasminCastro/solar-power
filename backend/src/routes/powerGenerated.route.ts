import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { PowerGeneratedController } from '@/controllers/powerGenerated.controller';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { ElginDataDto, HauweiDataDto } from '@/dtos/powerGenerated.dto';

export class PowerGeneratedRoute implements Routes {
  public path = '/power-generated';
  public router = Router();
  public powerGenerated = new PowerGeneratedController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //WEB SCRAPPING
    this.router.post(`${this.path}`, this.powerGenerated.updateAll);
    this.router.post(`${this.path}/hauwei`, ValidationMiddleware(HauweiDataDto), this.powerGenerated.saveHauweiData);
    this.router.post(`${this.path}/elgin`, ValidationMiddleware(ElginDataDto), this.powerGenerated.saveElginData);

    this.router.get(`${this.path}`, AuthMiddleware, this.powerGenerated.getPowerGeneratedData);
  }
}
