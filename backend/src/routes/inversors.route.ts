import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { InversorController } from '@/controllers/inversor.controller';
import { CreateInversorsDto } from '@/dtos/inversors.dto';

export class InversorsRoute implements Routes {
  public path = '/inversors';
  public router = Router();
  public inversor = new InversorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateInversorsDto), this.inversor.createInversor);
    this.router.get(`${this.path}`, AuthMiddleware, this.inversor.getByUser);
    this.router.get(`${this.path}/:id(\\d+)`, AuthMiddleware, this.inversor.getById);
    this.router.put(`${this.path}/:id(\\d+)`, AuthMiddleware, ValidationMiddleware(CreateInversorsDto), this.inversor.updateInversor);
    this.router.delete(`${this.path}/:id(\\d+)`, AuthMiddleware, this.inversor.deleteInversor);
  }
}
