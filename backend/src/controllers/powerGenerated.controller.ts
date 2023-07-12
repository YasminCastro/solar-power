import { NextFunction, Response } from 'express';
import { Container } from 'typedi';
import { PowerGeneratedService } from '@/services/powerGenerated.service';
import { InvertersService } from '@/services/inverters.service';
import { HttpException } from '@/exceptions/httpException';
import { UtilsService } from '@/services/utils.service';
import { RequestWithUser } from '@/interfaces/auth.interface';
import moment from 'moment';
import { PowerGenerated } from '@/interfaces/powerGenerated.interface';
import { isValidDateDay, isValidDateMonth, isValidDateYear } from '@/utils/isValidDate';

export class PowerGeneratedController {
  public powerGenerated = Container.get(PowerGeneratedService);
  public inverters = Container.get(InvertersService);
  public utils = Container.get(UtilsService);

  public getRealTimeData = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user._id;
      const invertersIdString = req.query.invertersId as string;

      if (!invertersIdString) {
        throw new HttpException(409, 'invertersId is required');
      }

      let invertersId: string[] = invertersIdString.split(',');
      let data: PowerGenerated[] = [];

      for (let inverterId of invertersId) {
        const powerGenerated = await this.powerGenerated.lastRegister(userId, inverterId);
        if (powerGenerated) data.push(powerGenerated);
      }

      if (data.length === 1 || data.length === 0) {
        res.status(200).json(data[0]);
        return;
      }

      const powerGenerated = await this.powerGenerated.joinData(data);

      res.status(200).json(powerGenerated);
    } catch (error) {
      next(error);
    }
  };

  public getDayData = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user._id;
      const inverterId = req.query.inverterId as string;
      const selectDate = (req.query.date as string) || moment().format('DD-MM-YYYY');

      if (!inverterId) {
        throw new HttpException(409, 'inverterId is required');
      }

      if (selectDate && !isValidDateDay(selectDate)) {
        throw new HttpException(409, 'date must follow the format DD-MM-YYYY');
      }

      const powerGenerated = await this.powerGenerated.allDay(userId, inverterId, selectDate);

      res.status(201).json(powerGenerated);
    } catch (error) {
      next(error);
    }
  };

  public getMonthData = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user._id;
      const inverterId = req.query.inverterId as string;
      const selectDate = (req.query.date as string) || moment().format('MM-YYYY');

      if (!inverterId) {
        throw new HttpException(409, 'inverterId is required');
      }

      if (selectDate && !isValidDateMonth(selectDate)) {
        throw new HttpException(409, 'date must follow the format MM-YYYY');
      }

      const powerGenerated = await this.powerGenerated.allMonth(userId, inverterId, selectDate);

      res.status(201).json(powerGenerated);
    } catch (error) {
      next(error);
    }
  };

  public getYearData = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user._id;
      const inverterId = req.query.inverterId as string;
      const selectDate = (req.query.date as string) || moment().format('YYYY');

      if (!inverterId) {
        throw new HttpException(409, 'inverterId is required');
      }

      if (selectDate && !isValidDateYear(selectDate)) {
        throw new HttpException(409, 'date must follow the format YYYY');
      }

      const powerGenerated = await this.powerGenerated.allYear(userId, inverterId, selectDate);

      res.status(201).json(powerGenerated);
    } catch (error) {
      next(error);
    }
  };
}
