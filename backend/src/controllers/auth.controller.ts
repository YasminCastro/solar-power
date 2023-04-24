import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';

export class AuthController {
  public auth = Container.get(AuthService);

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      const signUpUserData: User = await this.auth.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'User successfully created' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      const { tokenData, findUser } = await this.auth.login(userData);

      const user = {
        id: findUser.id,
        email: findUser.email,
        createdAt: findUser.createdAt,
      };

      res.status(200).json({ user, token: tokenData.token, expiresIn: tokenData.expiresIn });
    } catch (error) {
      next(error);
    }
  };
}
