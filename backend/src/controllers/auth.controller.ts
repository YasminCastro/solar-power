import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { AuthService } from '@services/auth.service';
import { CreateUserDto } from '@/dtos/users.dto';
import { User } from '@prisma/client';

export class AuthController {
  public auth = Container.get(AuthService);

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      await this.auth.signup(userData);

      res.status(201).json({ message: 'User successfully created' });
    } catch (error) {
      next(error);
    }
  };

  // public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const userData: User = req.body;
  //     const { tokenData, findUser } = await this.auth.login(userData);

  //     const user = {
  //       id: findUser.id,
  //       email: findUser.email,
  //       createdAt: findUser.createdAt,
  //     };

  //     res.status(200).json({ user, token: tokenData.token, expiresIn: tokenData.expiresIn });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}
