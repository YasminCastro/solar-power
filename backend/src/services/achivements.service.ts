import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { UpdateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { User } from '@/interfaces/users.interface';
import { UserModel } from '@/models/users.models';
import { Achivement } from '@/interfaces/achivements.interface';
import { AchivementsModel } from '@/models/achivements.models';
import { CreateAchivementsDto } from '@/dtos/achivements.dto';

@Service()
export class AchivementsService {
  public async createAchivement(achivementData: CreateAchivementsDto): Promise<Achivement> {
    const findAchivements: Achivement = await AchivementsModel.findOne({ name: achivementData.name });
    if (findAchivements) throw new HttpException(409, `This achivement ${achivementData.name} already register`);

    const createAchivementData: Achivement = await AchivementsModel.create(achivementData);
    return createAchivementData;
  }
  public async findAllAchivement(): Promise<Achivement[]> {
    const users: Achivement[] = await AchivementsModel.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    const findUser: User = await UserModel.findOne({ _id: userId });

    if (!findUser) throw new HttpException(404, "User doesn't exist");

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
