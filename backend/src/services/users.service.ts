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

  public async getUsersRanking(): Promise<User[]> {
    const users: User[] = await UserModel.find({}, '_id name level').sort({ level: -1 }).limit(30);

    return users;
  }

  public async getUserRanking(userId: string): Promise<User[]> {
    // Primeiro, busque todos os usuários ordenados por nível.
    const rankedUsers: User[] = await UserModel.find({}, '_id name level').sort({ level: -1 });

    // Encontre a posição do usuário especificado.
    const userRank = rankedUsers.findIndex(user => user._id.toString() === userId);

    // Defina os índices para os usuários a serem retornados baseado na posição do usuário.
    let startIndex, endIndex;
    if (userRank === 0) {
      // Se o usuário for o primeiro, pegue ele + os próximos 4.
      startIndex = userRank;
      endIndex = userRank + 4;
    } else if (userRank >= rankedUsers.length - 1) {
      // Se o usuário for o último, pegue ele + os 4 anteriores.
      startIndex = rankedUsers.length - 5;
      endIndex = rankedUsers.length - 1;
    } else {
      // Se estiver no meio, pegue 2 usuários acima, o usuário, e 2 abaixo, se possível.
      startIndex = Math.max(userRank - 2, 0);
      endIndex = Math.min(userRank + 2, rankedUsers.length - 1);
    }

    // Faça um slice do array para obter apenas o intervalo desejado.
    const usersSlice = rankedUsers.slice(startIndex, endIndex + 1);

    return usersSlice;
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
