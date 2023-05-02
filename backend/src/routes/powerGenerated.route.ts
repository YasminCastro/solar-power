import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { PowerGeneratedController } from '@/controllers/powerGenerated.controller';

export class PowerGeneratedRoute implements Routes {
  public path = '/power-generated';
  public router = Router();
  public powerGenerated = new PowerGeneratedController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/:id(\\d+)`, AuthMiddleware, this.powerGenerated.getHauweiData);
    // this.router.post(`${this.path}/hauwei`, AuthMiddleware, ValidationMiddleware(HauweiDataDto), this.inversor.getHauweiData);
    // this.router.post(`${this.path}/elgin`, AuthMiddleware, ValidationMiddleware(ElginDataDto), this.inversor.getElginData);
  }
}
