import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { UpdateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { User } from '@/interfaces/users.interface';
import { UserModel } from '@/models/users.models';
import { Achievement } from '@/interfaces/achievement.interface';
import { AchivementsModel } from '@/models/achievements.models';
import { CreateAchivementsDto } from '@/dtos/achievements.dto';

@Service()
export class AchievementsService {
  public async createAchivement(achivementData: CreateAchivementsDto): Promise<Achievement> {
    const findAchivements: Achievement = await AchivementsModel.findOne({ name: achivementData.name });
    if (findAchivements) throw new HttpException(409, `This achivement '${achivementData.name}' already register`);

    const createAchivementData: Achievement = await AchivementsModel.create(achivementData);
    return createAchivementData;
  }
  public async findAllAchivement(): Promise<Achievement[]> {
    const users: Achievement[] = await AchivementsModel.find();
    return users;
  }

  public async findAchievementById(userId: string): Promise<Achievement> {
    const findUser: Achievement = await AchivementsModel.findOne({ _id: userId });

    if (!findUser) throw new HttpException(404, "Achievement doesn't exist");

    return findUser;
  }

  public async updateUser(userId: string, userData: UpdateUserDto): Promise<User> {
    const findUser: User = await UserModel.findOne({ _id: userId });
    if (!findUser) throw new HttpException(404, "User doesn't exist");

    let data = findUser;

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      data.password = hashedPassword;
    }

    if (userData.name) {
      data.name = userData.name;
    }

    const updateUserById: User = await UserModel.findByIdAndUpdate(userId, { userData });
    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await UserModel.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(404, "User doesn't exist");

    return deleteUserById;
  }
}
