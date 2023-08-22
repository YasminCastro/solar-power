import { Service } from 'typedi';
import { PowerGenerated } from '@/interfaces/powerGenerated.interface';
import moment from 'moment';
import { PowerGeneratedModel } from '@/models/powerGenerated.models';

@Service()
export class PowerGeneratedService {
  public async lastRegister(inverterId: string): Promise<PowerGenerated> {
    try {
      const realTime = await PowerGeneratedModel.findOne({
        inverterId,
      }).sort({ createdAt: -1 });

      return realTime;
    } catch (error) {
      console.log(error);
    }
  }

  public async allDay(inverterId: string, selectDate: string): Promise<PowerGenerated[]> {
    try {
      const startOfDay = moment(selectDate, 'DD-MM-YYYY').startOf('day').toDate();
      const endOfDay = moment(selectDate, 'DD-MM-YYYY').endOf('day').toDate();

      const day = await PowerGeneratedModel.find({
        inverterId,
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      }).sort({ createdAt: -1 });

      return day;
    } catch (error) {
      console.log(error);
    }
  }

  public async allMonth(inverterId: string, selectDate: string): Promise<PowerGenerated[]> {
    try {
      const startOfMonth = moment(selectDate, 'MM-YYYY').startOf('month').toDate();
      const endOfMonth = moment(selectDate, 'MM-YYYY').endOf('month').toDate();

      const month = await PowerGeneratedModel.find({
        inverterId,
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      }).sort({ createdAt: -1 });

      return month;
    } catch (error) {
      console.log(error);
    }
  }

  public async lastRecordOfEachMonth(inverterId: string, selectDate: string): Promise<PowerGenerated[]> {
    try {
      const year = moment(selectDate, 'YYYY').format('YYYY');

      const pipeline: any[] = [
        {
          $match: {
            inverterId: inverterId,
            createdAt: {
              $gte: moment(`${year}-01-01`).toDate(),
              $lte: moment(`${year}-12-31`).toDate(),
            },
          },
        },
        {
          $group: {
            _id: {
              month: { $month: '$createdAt' },
              inverter: '$inverterId',
            },
            lastDocument: { $last: '$$ROOT' },
          },
        },
        {
          $replaceRoot: { newRoot: '$lastDocument' },
        },
        {
          $sort: { createdAt: 1 }, // Classificar em ordem ascendente pelo mês
        },
      ];

      const records = await PowerGeneratedModel.aggregate(pipeline);
      return records;
    } catch (error) {
      console.log(error);
    }
  }
}
