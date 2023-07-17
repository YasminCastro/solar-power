import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { InvertersController } from '@/controllers/inverters.controller';
import { CreateInvertersDto, UpdateInvertersDto } from '@/dtos/inverters.dto';

export class InvertersRoute implements Routes {
  public path = '/inverters';
  public router = Router();
  public inversor = new InvertersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateInvertersDto), this.inversor.createInverter);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(UpdateInvertersDto), this.inversor.updateInverter);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.inversor.deleteInverter);
  }
}
