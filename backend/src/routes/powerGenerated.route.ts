import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { PowerGeneratedController } from '@/controllers/powerGenerated.controller';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { ElginDataDto, HauweiDataDto } from '@/dtos/solarData';

export class PowerGeneratedRoute implements Routes {
  public path = '/power-generated';
  public router = Router();
  public powerGenerated = new PowerGeneratedController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //WEB SCRAPPING
    // this.router.post(`${this.path}`, this.powerGenerated.updateAll);

    this.router.get(`${this.path}/real-time`, AuthMiddleware, this.powerGenerated.getPowerGeneratedData);
    this.router.get(`${this.path}/day`, AuthMiddleware, this.powerGenerated.getPowerGeneratedData);
    this.router.get(`${this.path}/month`, AuthMiddleware, this.powerGenerated.getPowerGeneratedData);
    this.router.get(`${this.path}/year`, AuthMiddleware, this.powerGenerated.getPowerGeneratedData);
  }
}
