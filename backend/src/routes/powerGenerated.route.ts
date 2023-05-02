import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { InversorController } from '@/controllers/inversor.controller';
import { CreateInversorsDto } from '@/dtos/inversors.dto';

export class PowerGeneratedRoute implements Routes {
  public path = '/inversors';
  public router = Router();
  public inversor = new InversorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateInversorsDto), this.inversor.getHauweiData);

    // this.router.post(`${this.path}/hauwei`, AuthMiddleware, ValidationMiddleware(HauweiDataDto), this.inversor.getHauweiData);
    // this.router.post(`${this.path}/elgin`, AuthMiddleware, ValidationMiddleware(ElginDataDto), this.inversor.getElginData);
  }
}
