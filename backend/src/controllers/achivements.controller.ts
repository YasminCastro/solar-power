import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
import { UpdateUserDto } from '@/dtos/users.dto';
import { AchivementsService } from '@/services/achivements.service';
import { CreateAchivementsDto } from '@/dtos/achivements.dto';
import { Achivement } from '@/interfaces/achivements.interface';

export class AchivementsController {
  public achivements = Container.get(AchivementsService);

  public createAchivement = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const achivementData: CreateAchivementsDto = req.body;

      const achivement = await this.achivements.createAchivement(achivementData);

      res.status(200).json(achivement);
    } catch (error) {
      next(error);
    }
  };

  public getAchivements = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllAchivementsData: Achivement[] = await this.achivements.findAllAchivement();

      res.status(200).json(findAllAchivementsData);
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = String(req.params.id);
      const findOneUserData: User = await this.achivements.findUserById(userId);

      res.status(200).json(findOneUserData);
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = String(req.user._id);
      const userData: UpdateUserDto = req.body;
      const user = await this.achivements.updateUser(userId, userData);

      res.status(200).json({ user, message: 'User successfully updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = String(req.params.id);
      await this.achivements.deleteUser(userId);

      res.status(200).json({ message: 'User successfully deleted' });
    } catch (error) {
      next(error);
    }
  };
}
