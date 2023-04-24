import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { InversorController } from '@/controllers/inversor.controller';
import { GetInversorDto } from '@/dtos/inversor.dto';

export class InversorRoute implements Routes {
  public path = '/inversor';
  public router = Router();
  public inversor = new InversorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/hauwei`, AuthMiddleware, ValidationMiddleware(GetInversorDto), this.inversor.getHauweiData);
  }
}
