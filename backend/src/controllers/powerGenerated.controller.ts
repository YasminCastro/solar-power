import { NextFunction, Response } from 'express';
import { Container } from 'typedi';
import { PowerGeneratedService } from '@/services/powerGenerated.service';
import { InvertersService } from '@/services/inverters.service';
import { HttpException } from '@/exceptions/httpException';
import { UtilsService } from '@/services/utils.service';
import { RequestWithUser } from '@/interfaces/auth.interface';
import moment from 'moment';
import { PowerGenerated } from '@/interfaces/powerGenerated.interface';
import isValidDateFormat from '@/utils/isValidDateFormat';

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
        const powerGenerated = await this.powerGenerated.byInverterId(userId, inverterId);
        if (powerGenerated) data.push(powerGenerated);
      }

      if (data.length === 1) {
        res.status(201).json(data[0]);
        return;
      }

      const powerGenerated = await this.powerGenerated.joinData(data);

      res.status(201).json(powerGenerated);
    } catch (error) {
      next(error);
    }
  };

  public getPowerGeneratedData = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user._id;
      const invertersIdString = req.query.invertersId as string;
      let limit = Number(req.query.limit) || 1;
      let startDate = (req.query.startDate as string) || moment().format('DD-MM-YYYY');
      let endDate = (req.query.endDate as string) || moment().format('DD-MM-YYYY');

      if (!invertersIdString) {
        throw new HttpException(409, 'invertersId is required');
      }

      if (!isValidDateFormat(startDate) && !isValidDateFormat(startDate)) {
        throw new HttpException(409, 'Date must be in the format DD-MM-YYYY');
      }

      let invertersId: string[] = invertersIdString.split(',');
      let powerGeneratedRaw: PowerGenerated[] = [];

      for (let inverterId of invertersId) {
        const powerGeneratedById = await this.powerGenerated.getByInverterId(userId, inverterId, limit, startDate, endDate);
        console.log(powerGeneratedById);
      }

      // if (inverterId) {
      //   const powerGeneratedById = await this.powerGenerated.getByInverterId(userId, inverterId, limit);
      //   res.status(201).json(powerGeneratedById);
      // } else if (invertersId) {
      //   const powerGeneratedJoined = await this.powerGenerated.joinPowerGenerated(userId, invertersId, limit);
      //   res.status(201).json([powerGeneratedJoined]);
      // }

      // if (invertersId) {
      //   // const powerGeneratedJoined = await this.powerGenerated.joinPowerGenerated(userId, invertersIdString);
      //   // res.status(201).json([powerGeneratedJoined]);
      //   console.log("AQUI 1")
      //   return
      // } else if (todayData) {
      //   const powerGeneratedToday = await this.powerGenerated.getTodayData(userId, inverterId);
      //   res.status(201).json(powerGeneratedToday);
      // } else if (inverterId) {
      //   const powerGeneratedById = await this.powerGenerated.getByInverterId(userId, inverterId, limit);
      //   res.status(201).json(powerGeneratedById);
      // } else {
      //   const powerGeneratedByUserId = await this.powerGenerated.getByUserId(userId, limit);
      //   res.status(201).json(powerGeneratedByUserId);
      // }
    } catch (error) {
      next(error);
    }
  };
}
