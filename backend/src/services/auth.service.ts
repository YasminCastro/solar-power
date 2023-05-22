import { PrismaClient, User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { EXPIRES_IN, SECRET_KEY } from '@config';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';

@Service()
export class AuthService {
  public users = new PrismaClient().user;

  public async signup(userData: CreateUserDto): Promise<User> {
    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: Promise<User> = this.users.create({ data: { ...userData, password: hashedPassword } });

    return createUserData;
  }

  public async login(userData: LoginUserDto): Promise<{tokenData: TokenData, user: DataStoredInToken}> {
    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const tokenData = this.createToken(findUser);

    const user:DataStoredInToken = { id: findUser.id,
      name: findUser.name,
      email: findUser.email,}

    return { tokenData , user };
  }

  public createToken(user: User): TokenData {
    const payload: DataStoredInToken = {
      id: user.id,
      name: user.name,

      email: user.email,
    };

    const token = sign(payload, SECRET_KEY, {
      expiresIn: EXPIRES_IN,
    });

    return { expiresIn: EXPIRES_IN, token };
  }
}
