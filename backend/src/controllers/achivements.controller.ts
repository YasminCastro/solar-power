import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { CreateAchivementsDto, UpdateAchivementsDto } from '@/dtos/achievements.dto';
import { Achievement } from '@/interfaces/achievement.interface';
import { AchievementsService } from '@/services/achievements.service';
import { UserService } from '@/services/users.service';

export class AchivementsController {
  public achievements = Container.get(AchievementsService);
  public users = Container.get(UserService);

  public createAchivement = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const achivementData: CreateAchivementsDto = req.body;

      const achivement = await this.achievements.createAchivement(achivementData);

      //update user points
      const user = await this.users.findUserById(achivementData.userId);

      const newLevel = user.level + achivementData.points;

      await this.users.updateUser(achivementData.userId, { level: newLevel });

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

  public updateAchievement = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const achievementId = String(req.params.id);
      const achievementData: UpdateAchivementsDto = req.body;
      const achievement = await this.achievements.updateAchievement(achievementId, achievementData);

      res.status(200).json({ achievement, message: 'Achievement successfully updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAchievement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const achievementId = String(req.params.id);
      await this.achievements.deleteAchievement(achievementId);

      res.status(200).json({ message: 'Achievement successfully deleted' });
    } catch (error) {
      next(error);
    }
  };
}
