import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { AchivementsController } from '@/controllers/achivements.controller';
import { UpdateAchivementsDto } from '@/dtos/achievements.dto';

export class AchivementsRoute implements Routes {
  public path = '/achievements';
  public router = Router();
  public user = new AchivementsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, this.user.createAchivement);
    this.router.get(`${this.path}`, AuthMiddleware, this.user.getAchivements);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.user.getAchievementById);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(UpdateAchivementsDto), this.user.updateAchievement);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.user.deleteAchievement);
  }
}
