import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken } from '@interfaces/auth.interface';
import { UserModel } from '@/models/users.models';
import { User } from '@/interfaces/users.interface';

@Service()
export class AuthService {
  public async signup(userData: CreateUserDto): Promise<{ token: string; user: DataStoredInToken }> {
    const findUser: User = await UserModel.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserModel.create({ ...userData, password: hashedPassword });
    const user: DataStoredInToken = {
      _id: createUserData._id.toString(),
      name: createUserData.name,
      email: createUserData.email,
      inverters: [],
    };

    const token = this.createToken(user);

    return { token, user };
  }

  public async login(userData: LoginUserDto): Promise<{ token: string; user: DataStoredInToken }> {
    const findUser: User = await UserModel.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const user: DataStoredInToken = {
      _id: findUser._id.toString(),
      name: findUser.name,
      email: findUser.email,
      inverters: findUser.inverters,
    };

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const token = this.createToken(user);

    return { token, user };
  }

  public createToken(user: DataStoredInToken): string {
    const token = sign(user, SECRET_KEY);

    return token;
  }
}
