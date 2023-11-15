import { NextFunction, Response } from 'express';
import { Container } from 'typedi';
import { PowerGeneratedService } from '@/services/powerGenerated.service';
import { InvertersService } from '@/services/inverters.service';
import { HttpException } from '@/exceptions/httpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import moment from 'moment';
import { isValidDateDay, isValidDateMonth, isValidDateYear } from '@/utils/isValidDate';
import { AchievementsService } from '@/services/achievements.service';

export class PowerGeneratedController {
  public powerGenerated = Container.get(PowerGeneratedService);
  public inverters = Container.get(InvertersService);
  public achievements = Container.get(AchievementsService);

  public getRealTimeData = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inverterId = req.params.id as string;

      if (!inverterId) {
        throw new HttpException(400, 'inverterId is required');
      }

      await this.inverters.getInverterById(inverterId);

      const powerGenerated = await this.powerGenerated.lastRegister(inverterId);

      res.status(200).json(powerGenerated);
    } catch (error) {
      next(error);
    }
  };

  public getDayData = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inverterId = req.params.id as string;
      const selectDate = (req.query.date as string) || moment().format('DD-MM-YYYY');
      const userId = req.user._id;

      if (!inverterId) {
        throw new HttpException(400, 'inverterId is required');
      }

      if (selectDate && !isValidDateDay(selectDate)) {
        throw new HttpException(400, 'date must follow the format DD-MM-YYYY');
      }

      await this.inverters.getInverterById(inverterId);

      const powerGenerated = await this.powerGenerated.allDay(inverterId, selectDate);

      //Conquista: Gerou mais de 10kwh por no dia
      const achievementName = 'Energizador Diário';
      const userAchievements = await this.achievements.findAchievementByUser(userId);

      if (
        powerGenerated[0].powerToday &&
        !userAchievements.find(achievement => {
          achievement.name === achievementName;
        })
      ) {
        await this.achievements.createAchivement({
          userId,
          achivementImage: '',
          description: 'Impressionante! Você gerou mais de 10kWh em um único dia, acendendo o caminho para um futuro mais sustentável.',
          name: achievementName,
          points: 50,
        });
      }

      res.status(200).json(powerGenerated);
    } catch (error) {
      next(error);
    }
  };

  public getMonthData = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inverterId = req.params.id as string;
      const selectDate = (req.query.date as string) || moment().format('MM-YYYY');
      const userId = req.user._id;

      if (!inverterId) {
        throw new HttpException(400, 'inverterId is required');
      }

      if (selectDate && !isValidDateMonth(selectDate)) {
        throw new HttpException(400, 'date must follow the format MM-YYYY');
      }

      await this.inverters.getInverterById(inverterId);

      const powerGenerated = await this.powerGenerated.allMonth(inverterId, selectDate);

      //Conquista: Gerou mais de 100kwh no mês
      const achievementName = 'Produtor Mensal de Alta Voltagem';
      const userAchievements = await this.achievements.findAchievementByUser(userId);

      if (
        powerGenerated[0].powerToday &&
        !userAchievements.find(achievement => {
          achievement.name === achievementName;
        })
      ) {
        await this.achievements.createAchivement({
          userId,
          achivementImage: '',
          description: 'Excelente trabalho! Você ultrapassou 100kWh de energia produzida neste mês. Isso é dedicação à sustentabilidade!',
          name: achievementName,
          points: 100,
        });
      }

      res.status(200).json(powerGenerated);
    } catch (error) {
      next(error);
    }
  };

  public getYearData = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inverterId = req.params.id as string;
      const selectDate = (req.query.date as string) || moment().format('YYYY');
      const userId = req.user._id;

      if (!inverterId) {
        throw new HttpException(400, 'inverterId is required');
      }

      if (selectDate && !isValidDateYear(selectDate)) {
        throw new HttpException(400, 'date must follow the format YYYY');
      }

      await this.inverters.getInverterById(inverterId);

      const powerGenerated = await this.powerGenerated.lastRecordOfEachMonth(inverterId, selectDate);

      //Conquista: Gerou mais de 100kwh no mês
      const achievementName = 'Campeão Anual de Energia';
      const userAchievements = await this.achievements.findAchievementByUser(userId);

      if (
        powerGenerated[0].powerToday &&
        !userAchievements.find(achievement => {
          achievement.name === achievementName;
        })
      ) {
        await this.achievements.createAchivement({
          userId,
          achivementImage: '',
          description: 'Incrível! Sua produção de energia ultrapassou 1200kWh em um ano. Você está fazendo a diferença no mundo!',
          name: achievementName,
          points: 200,
        });
      }

      res.status(200).json(powerGenerated);
    } catch (error) {
      next(error);
    }
  };
}
