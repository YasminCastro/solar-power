import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { AuthService } from '@services/auth.service';
import { CreateUserDto, LoginUserDto } from '@/dtos/users.dto';

export class AuthController {
  public auth = Container.get(AuthService);

  public hello = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(201).json({ message: 'Project running ☀️! ' });
    } catch (error) {
      next(error);
    }
  };

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const response = await this.auth.signup(userData);

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: LoginUserDto = req.body;
      const response = await this.auth.login(userData);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
