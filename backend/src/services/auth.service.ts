import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import Container, { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken } from '@interfaces/auth.interface';
import { UserModel } from '@/models/users.models';
import { User } from '@/interfaces/users.interface';
import { AchievementsService } from './achievements.service';
import { UserService } from './users.service';
import moment from 'moment';

@Service()
export class AuthService {
  public achievements = Container.get(AchievementsService);
  public user = Container.get(UserService);

  public async signup(userData: CreateUserDto): Promise<{ token: string; user: DataStoredInToken }> {
    const findUser: User = await UserModel.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserModel.create({ ...userData, password: hashedPassword });
    const user: DataStoredInToken = {
      _id: createUserData._id.toString(),
      name: createUserData.name,
      email: createUserData.email,
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
    };

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(401, 'Password is not matching');

    const token = this.createToken(user);

    await this.checkUserAchievements(user._id);

    return { token, user };
  }

  public createToken(user: DataStoredInToken): string {
    const token = sign(user, SECRET_KEY);

    return token;
  }

  private async checkUserAchievements(userId: string): Promise<void> {
    const user = await this.user.findUserById(userId);

    await this.loginStreak(user);

    return;
  }

  private async loginStreak(user: User): Promise<void> {
    const today = moment().startOf('day');
    const lastLoginDate = moment(user.lastLoginDate).startOf('day');
    const daysSinceLastLogin = today.diff(lastLoginDate, 'days');

    let loginStreak = user.loginStreak;

    // Verifique se o último login foi exatamente 1 dia atrás
    if (daysSinceLastLogin === 1) {
      loginStreak++;
    } else if (daysSinceLastLogin > 1) {
      // Se o login não foi no dia anterior, reinicie o contador de dias consecutivos
      loginStreak = 1;
    }

    await this.user.updateUser(user._id.toString(), { lastLoginDate: new Date(), loginStreak });

    // Verifique se o usuário ganhou a conquista
    if (user.loginStreak === 7) {
      this.achievements.createAchivement({
        userId: user._id,
        achivementImage: '',
        name: 'Semana Vitoriosa',
        description:
          'Você está numa sequência! 7 dias seguidos e contando. Continue acessando diariamente para manter a sequência viva e desbloquear mais recompensas!',
        points: 50,
      });
    }

    if (user.loginStreak === 30) {
      this.achievements.createAchivement({
        userId: user._id,
        achivementImage: '',
        name: 'Mês Monumental',
        description: `30 dias de pura perseverança! Seu compromisso diário ganhou você um lugar no nosso 'Hall da Fama' dos logins. Continue assim!`,
        points: 200,
      });
    }

    return;
  }
}
