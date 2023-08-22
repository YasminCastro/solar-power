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
    this.router.get(`${this.path}/real-time/:id`, AuthMiddleware, this.powerGenerated.getRealTimeData);
    this.router.get(`${this.path}/day/:id`, AuthMiddleware, this.powerGenerated.getDayData);
    this.router.get(`${this.path}/month`, AuthMiddleware, this.powerGenerated.getMonthData);
    this.router.get(`${this.path}/year`, AuthMiddleware, this.powerGenerated.getYearData);
  }
}
