import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { UserService } from '@services/users.service';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
import { UpdatePasswordDto, UpdateUserDto } from '@/dtos/users.dto';

export class UserController {
  public user = Container.get(UserService);

  public getUsers = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUsersData: User[] = await this.user.findAllUser();

      res.status(200).json(findAllUsersData);
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData: User = await this.user.findUserById(userId);

      res.status(200).json(findOneUserData);
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id;
      const userData: UpdateUserDto = req.body;
      await this.user.updateUser(userId, userData);

      res.status(200).json({ message: 'User successfully updated' });
    } catch (error) {
      next(error);
    }
  };

  public updateUserPassword = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id;
      const { password }: UpdatePasswordDto = req.body;
      await this.user.updateUserPassword(userId, password);

      res.status(200).json({ message: 'User password successfully updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      await this.user.deleteUser(userId);

      res.status(200).json({ message: 'User  successfully deleted' });
    } catch (error) {
      next(error);
    }
  };
}
