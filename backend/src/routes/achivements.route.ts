import { Router } from 'express';
import { UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { AchivementsController } from '@/controllers/achivements.controller';

export class AchivementsRoute implements Routes {
  public path = '/achivements';
  public router = Router();
  public user = new AchivementsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.user.createAchivement);
    this.router.get(`${this.path}`, this.user.getAchivements);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.user.getUserById);
    this.router.put(`${this.path}`, AuthMiddleware, ValidationMiddleware(UpdateUserDto), this.user.updateUser);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.user.deleteUser);
  }
}
