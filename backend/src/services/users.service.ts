import { PrismaClient, User as UserPrisma } from '@prisma/client';
import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { UpdateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { User } from '@/interfaces/users.interface';

const selectQuery = {
  id: true,
  email: true,
  name: true,
  createdAt: true,
  inversors: true,
  powerGenerated: false,
};

@Service()
export class UserService {
  public user = new PrismaClient().user;

  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await this.user.findMany({
      select: selectQuery,
    });
    return allUser;
  }

  public async findUserById(userId: number): Promise<User> {
    const findUser: User = await this.user.findUnique({
      where: { id: userId },
      select: selectQuery,
    });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async updateUser(userId: number, userData: UpdateUserDto): Promise<User> {
    const findUser: UserPrisma = await this.user.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    let data = findUser;

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      data.password = hashedPassword;
    }

    if (userData.name) {
      data.name = userData.name;
    }

    const updateUserData = await this.user.update({ where: { id: userId }, data });
    return updateUserData;
  }

  public async deleteUser(userId: number): Promise<User> {
    const findUser: User = await this.user.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const deleteUserData = await this.user.delete({ where: { id: userId } });
    return deleteUserData;
  }
}
