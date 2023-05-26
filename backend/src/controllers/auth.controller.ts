import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { AuthService } from '@services/auth.service';
import { CreateUserDto, LoginUserDto } from '@/dtos/users.dto';
import { PrismaClient } from '@prisma/client';

export class AuthController {
  public auth = Container.get(AuthService);
  public power = new PrismaClient().powerGenerated;

  public hello = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const powerGeneratedRecords = await this.power.findMany();
      console.log('UPDATING', powerGeneratedRecords.length);

      let total = powerGeneratedRecords.length;

      for (let record of powerGeneratedRecords) {
        if (record.allPowerString) {
          total = total - 1;
        }

        if (!record.allPowerString) {
          console.log(`UPDATING ID: ${record.id}, FALTAM ${total}`);
          await this.power.update({
            where: { id: record.id },
            data: {
              powerInRealTimeString: record.powerInRealTime?.toString(),
              powerTodayString: record.powerToday?.toString(),
              powerMonthString: record.powerMonth?.toString(),
              powerYearString: record.powerYear?.toString(),
              allPowerString: record.allPower?.toString(),
              co2String: record.co2?.toString(),
              coalString: record.coal?.toString(),
              treeString: record.tree?.toString(),
            },
          });
          total = total - 1;
        }
      }

      res.status(201).json({ message: 'Project running ☀️! ' });
    } catch (error) {
      next(error);
    }
  };

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      await this.auth.signup(userData);

      res.status(201).json({ message: 'User successfully created' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: LoginUserDto = req.body;
      const tokenData = await this.auth.login(userData);

      res.status(200).json(tokenData);
    } catch (error) {
      next(error);
    }
  };
}
