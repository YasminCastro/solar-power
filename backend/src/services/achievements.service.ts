import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { UpdateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { User } from '@/interfaces/users.interface';
import { Achievement } from '@/interfaces/achievement.interface';
import { AchivementsModel } from '@/models/achievements.models';
import { CreateAchivementsDto, UpdateAchivementsDto } from '@/dtos/achievements.dto';
import { logger } from '@/utils/logger';

@Service()
export class AchievementsService {
  public async createAchivement(achivementData: CreateAchivementsDto): Promise<Achievement> {
    const findAchivements: Achievement = await AchivementsModel.findOne({ name: achivementData.name, userId: achivementData.userId });
    if (findAchivements) {
      logger.info(`UserId: ${achivementData.userId} already have this achivement ${achivementData.name}`);
      return findAchivements;
    }

    const createAchivementData: Achievement = await AchivementsModel.create(achivementData);

    //update user points
    return createAchivementData;
  }
  public async findAllAchivement(): Promise<Achievement[]> {
    const users: Achievement[] = await AchivementsModel.find();
    return users;
  }

  public async findAchievementById(achievementId: string): Promise<Achievement> {
    const findAchievement: Achievement = await AchivementsModel.findOne({ _id: achievementId });

    if (!findAchievement) throw new HttpException(404, "Achievement doesn't exist");

    return findAchievement;
  }
  public async findAchievementByUser(userId: string): Promise<Achievement[]> {
    const findUserAchievements: Achievement[] = await AchivementsModel.find({ userId: userId });

    return findUserAchievements || [];
  }

  public async updateAchievement(achievementId: string, achivementsData: UpdateAchivementsDto): Promise<Achievement> {
    const findAchivement: Achievement = await AchivementsModel.findOne({ _id: achievementId });
    if (!findAchivement) throw new HttpException(404, "Achivements doesn't exist");

    let data = findAchivement;

    if (achivementsData.name) {
      data.name = achivementsData.name;
    }

    if (achivementsData.description) {
      data.description = achivementsData.description;
    }

    if (achivementsData.points) {
      data.points = achivementsData.points;
    }

    if (achivementsData.achivementImage) {
      data.achivementImage = achivementsData.achivementImage;
    }

    const updateAchievementById: Achievement = await AchivementsModel.findByIdAndUpdate(achievementId, achivementsData, { new: true });
    return updateAchievementById;
  }

  public async deleteAchievement(achievementId: string): Promise<User> {
    const achievementUserById: User = await AchivementsModel.findByIdAndDelete(achievementId);
    if (!achievementUserById) throw new HttpException(404, "Achievement doesn't exist");

    return achievementUserById;
  }
}
