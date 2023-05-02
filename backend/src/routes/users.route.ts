import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { UpdatePasswordDto, UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.user.getUsers);
    this.router.get(`${this.path}/:id(\\d+)`, AuthMiddleware, this.user.getUserById);
    this.router.put(`${this.path}`, AuthMiddleware, ValidationMiddleware(UpdateUserDto), this.user.updateUser);
    this.router.put(`${this.path}/password`, AuthMiddleware, ValidationMiddleware(UpdatePasswordDto), this.user.updateUserPassword);
    this.router.delete(`${this.path}/:id(\\d+)`, AuthMiddleware, this.user.deleteUser);
  }
}
