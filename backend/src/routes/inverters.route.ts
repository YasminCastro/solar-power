import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { InvertersController } from '@/controllers/inverters.controller';
import { CreateInvertersDto, UpdateInvertersDto } from '@/dtos/inverters.dto';

export class InvertersRoute implements Routes {
  public path = '/inverters';
  public router = Router();
  public inverter = new InvertersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.inverter.getInverters);
    this.router.get(`${this.path}/inverter/:id`, AuthMiddleware, this.inverter.getInverterById);
    this.router.get(`${this.path}/user/:userId`, AuthMiddleware, this.inverter.getInverterById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateInvertersDto), this.inverter.createInverter);
    this.router.put(`${this.path}`, AuthMiddleware, ValidationMiddleware(UpdateInvertersDto), this.inverter.updateInverter);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.inverter.deleteInverter);
  }
}
