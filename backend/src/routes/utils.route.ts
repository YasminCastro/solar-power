import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { UtilsController } from '@/controllers/utils.controller';

export class UtilsRoute implements Routes {
  public path = '/utils/';
  public router = Router();
  public utils = new UtilsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}weather`, AuthMiddleware, this.utils.getWeather);
  }
}
