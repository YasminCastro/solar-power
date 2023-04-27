import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { InversorController } from '@/controllers/inversor.controller';
import { ElginDataDto, HauweiDataDto } from '@/dtos/inversor.dto';

export class InversorRoute implements Routes {
  public path = '/inversor';
  public router = Router();
  public inversor = new InversorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/hauwei`, AuthMiddleware, ValidationMiddleware(HauweiDataDto), this.inversor.getHauweiData);
    this.router.post(`${this.path}/elgin`, AuthMiddleware, ValidationMiddleware(ElginDataDto), this.inversor.getElginData);
  }
}
