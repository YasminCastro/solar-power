import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
import { UpdateUserDto } from '@/dtos/users.dto';
import { CreateAchivementsDto } from '@/dtos/achievements.dto';
import { Achievement } from '@/interfaces/achievement.interface';
import { AchievementsService } from '@/services/achievements.service';

export class AchivementsController {
  public achievements = Container.get(AchievementsService);

  public createAchivement = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const achivementData: CreateAchivementsDto = req.body;

      const achivement = await this.achievements.createAchivement(achivementData);

      res.status(201).json(achivement);
    } catch (error) {
      next(error);
    }
  };

  public getAchivements = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllAchivementsData: Achievement[] = await this.achievements.findAllAchivement();

      res.status(200).json(findAllAchivementsData);
    } catch (error) {
      next(error);
    }
  };

  public getAchievementById = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const achievementId = String(req.params.id);
      const findOneAchievementData: Achievement = await this.achievements.findAchievementById(achievementId);

      res.status(200).json(findOneAchievementData);
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = String(req.user._id);
      const userData: UpdateUserDto = req.body;
      const user = await this.achievements.updateUser(userId, userData);

      res.status(200).json({ user, message: 'User successfully updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = String(req.params.id);
      await this.achievements.deleteUser(userId);

      res.status(200).json({ message: 'User successfully deleted' });
    } catch (error) {
      next(error);
    }
  };
}
