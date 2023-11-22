import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { UpdateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { User } from '@/interfaces/users.interface';
import { UserModel } from '@/models/users.models';

@Service()
export class UserService {
  public async findAllUser(): Promise<User[]> {
    const users: User[] = await UserModel.find();
    return users;
  }

  public async getUserRanking(): Promise<User[]> {
    const users: User[] = await UserModel.find({}, '_id name level').sort({ level: -1 }).limit(30);

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

    if (userData.email) {
      data.email = userData.email;
    }

    if (userData.level) {
      data.level = userData.level;
    }

    if (userData.level) {
      data.level = userData.level;
    }

    if (userData.lastLoginDate) {
      data.lastLoginDate = userData.lastLoginDate;
    }

    if (userData.loginStreak) {
      data.loginStreak = userData.loginStreak;
    }

    const updateUserById: User = await UserModel.findByIdAndUpdate(userId, userData, { new: true });
    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await UserModel.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(404, "User doesn't exist");

    return deleteUserById;
  }
}
