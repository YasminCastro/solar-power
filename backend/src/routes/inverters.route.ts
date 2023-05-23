import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { InvertersController } from '@/controllers/inverters.controller';
import { CreateInnvertersDto } from '@/dtos/inversors.dto';

export class InvertersRoute implements Routes {
  public path = '/inverters';
  public router = Router();
  public inversor = new InvertersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateInnvertersDto), this.inversor.createInversor);
    this.router.get(`${this.path}`, AuthMiddleware, this.inversor.getByUser);
    this.router.get(`${this.path}/:id(\\d+)`, AuthMiddleware, this.inversor.getById);
    this.router.put(`${this.path}/:id(\\d+)`, AuthMiddleware, ValidationMiddleware(CreateInnvertersDto), this.inversor.updateInversor);
    this.router.delete(`${this.path}/:id(\\d+)`, AuthMiddleware, this.inversor.deleteInversor);
  }
}
