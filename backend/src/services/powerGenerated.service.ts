import { Service } from 'typedi';
import { PowerGenerated, PowerGeneratedJoined } from '@/interfaces/powerGenerated.interface';
import { autoKWhConvert, convertToKWh } from '@/utils/convertPower';
import moment from 'moment';
import { PowerGeneratedModel } from '@/models/powerGenerated.models';

@Service()
export class PowerGeneratedService {
  public async lastRegister(userId: string, inverterId: string): Promise<PowerGenerated> {
    try {
      const startOfDay = moment().startOf('day').toDate();

      const realTime = await PowerGeneratedModel.findOne({
        userId,
        inverterId,
        createdAt: { $gte: startOfDay },
      }).sort({ createdAt: 1 });

      return realTime;
    } catch (error) {
      console.log(error);
    }
  }

  public async allDay(userId: string, inverterId: string, selectDate: string): Promise<PowerGenerated[]> {
    try {
      const startOfDay = moment(selectDate, 'DD-MM-YYYY').startOf('day').toDate();

      const day = await PowerGeneratedModel.find({
        userId,
        inverterId,
        createdAt: { $gte: startOfDay },
      }).sort({ createdAt: 1 });

      return day;
    } catch (error) {
      console.log(error);
    }
  }

  public async allMonth(userId: string, inverterId: string, selectDate: string): Promise<PowerGenerated[]> {
    try {
      const startOfMonth = moment(selectDate, 'MM-YYYY').startOf('month').toDate();
      const endOfMonth = moment(selectDate, 'MM-YYYY').endOf('month').toDate();

      const month = await PowerGeneratedModel.find({
        userId,
        inverterId,
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      }).sort({ createdAt: 1 });

      return month;
    } catch (error) {
      console.log(error);
    }
  }

  public async allYear(userId: string, inverterId: string, selectDate: string): Promise<PowerGenerated[]> {
    try {
      const startOfYear = moment(selectDate, 'YYYY').startOf('year').toDate();
      const endOfYear = moment(selectDate, 'YYYY').endOf('year').toDate();

      const year = await PowerGeneratedModel.find({
        userId,
        inverterId,
        createdAt: { $gte: startOfYear, $lte: endOfYear },
      }).sort({ createdAt: 1 });

      return year;
    } catch (error) {
      console.log(error);
    }
  }

  public async joinData(data: PowerGenerated[]): Promise<any> {
    try {
      let powerInRealTime = 0;
      let powerToday = 0;
      let powerMonth = 0;
      let allPower = 0;
      let powerYear = 0;
      let co2 = 0;
      let coal = 0;
      let tree = 0;
      let ids = [];
      for (let actualData of data) {
        if (actualData.powerInRealTime) powerInRealTime += parseFloat(actualData.powerInRealTime);
        if (actualData.powerToday) powerToday += parseFloat(actualData.powerToday);
        if (actualData.powerMonth) powerMonth += convertToKWh(actualData.powerMonth);
        if (actualData.powerYear) powerYear += convertToKWh(actualData.powerYear);
        if (actualData.allPower) allPower += convertToKWh(actualData.allPower);
        if (actualData.co2) co2 += parseFloat(actualData.co2);
        if (actualData.coal) coal += parseFloat(actualData.coal);
        if (actualData.tree) tree += parseInt(actualData.tree);
        ids.push(actualData._id);
      }

      const realTime: PowerGeneratedJoined = {
        _id: ids.join(','),
        powerInRealTime: powerInRealTime ? `${powerInRealTime.toFixed(1)}kW` : null,
        powerToday: powerToday ? `${powerToday.toFixed(1)}kW` : null,
        powerMonth: powerMonth ? autoKWhConvert(powerMonth) : null,
        powerYear: powerYear ? autoKWhConvert(powerYear) : null,
        allPower: allPower ? autoKWhConvert(allPower) : null,
        co2: co2 ? `${co2.toFixed(1)}t` : null,
        coal: coal ? `${coal.toFixed(1)}t` : null,
        tree: tree ? tree.toString() : null,
      };

      return realTime;
    } catch (error) {
      console.log(error);
    }
  }

  // public async getByUserId(userId: string, limit: number): Promise<any> {
  //   try {
  //     const powerGenerated: PowerGenerated[] = await this.powerGenerated.findMany({
  //       where: { userId },
  //       take: limit,
  //       orderBy: { createdAt: 'desc' },
  //     });

  //     return powerGenerated;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  public async getByInverterId(userId: string, inverterId: string, limit: number, startDateRaw: string, endDateRaw: string): Promise<any> {
    try {
      const today = moment().format();
      const startDate = moment(startDateRaw, 'DD-MM-YYYY').format();

      const powerGenerated: PowerGenerated[] = await PowerGeneratedModel.find({ userId, inverterId }).limit(limit).sort({ createdAt: -1 });

      return powerGenerated;
    } catch (error) {
      console.log(error);
    }
  }

  public async getTodayData(userId: string, inverterId: string): Promise<any> {
    try {
      const startOfDay = moment().startOf('day').toDate();

      const recordsFromToday: PowerGenerated[] = await PowerGeneratedModel.find({
        userId,
        inverterId,
        powerInRealTime: { $ne: '0kW' },
        createdAt: { gte: startOfDay },
      }).sort({ createdAt: -1 });

      return recordsFromToday;
    } catch (error) {
      console.log(error);
    }
  }

  // public async joinPowerGenerated(userId: string, invertersIdString: string, limit: number): Promise<any> {
  //   try {
  //     const invertersId = invertersIdString.split(',');
  //     let powerGeneratedRaw: PowerGenerated[] = [];

  //     for (let inverter of invertersId) {
  //       const inverterFound = await this.getByInverterId(userId, inverter, 1);
  //       if (inverterFound.length > 0) {
  //         powerGeneratedRaw.push(inverterFound[0]);
  //       }
  //     }

  //     let result: any = {
  //       id: Math.floor(Math.random() * 10000) + 1,
  //       createdAt: powerGeneratedRaw[0].createdAt,
  //       inversorId: [],
  //       userId: powerGeneratedRaw[0].userId,
  //       powerInRealTime: 0,
  //       powerToday: 0,
  //       powerMonth: 0,
  //       powerYear: 0,
  //       allPower: 0,
  //       co2: 0,
  //       coal: 0,
  //       tree: 0,
  //       lat: powerGeneratedRaw[0].lat,
  //       long: powerGeneratedRaw[0].long,
  //       localtime: powerGeneratedRaw[0].localtime,
  //       tempC: powerGeneratedRaw[0].tempC,
  //       windKph: powerGeneratedRaw[0].windKph,
  //       pressureIn: powerGeneratedRaw[0].pressureIn,
  //       humidity: powerGeneratedRaw[0].humidity,
  //       cloud: powerGeneratedRaw[0].cloud,
  //       uv: powerGeneratedRaw[0].uv,
  //       precipMM: powerGeneratedRaw[0].precipMM,
  //     };

  //     for (let item of powerGeneratedRaw) {
  //       result.inversorId.push(item.inverterId);
  //       result.powerInRealTime += parseFloat(item.powerInRealTime);
  //       result.powerToday += convertToKWh(item.powerToday);
  //       result.powerMonth += convertToKWh(item.powerMonth);
  //       result.powerYear += convertToKWh(item.powerYear);
  //       result.allPower += convertToKWh(item.allPower);
  //       result.co2 += parseFloat(item.co2);
  //       result.coal += parseFloat(item.coal || '0');
  //       result.tree += parseFloat(item.tree || '0');
  //     }

  //     result.co2 += `${result.co2}t`;
  //     result.coal += `${result.coal}t`;
  //     result.powerInRealTime = `${result.powerInRealTime}kW`;
  //     result.powerToday = `${result.powerToday}kWh`;
  //     result.powerMonth = result.powerMonth > 10000 ? `${convertToMWh(result.powerMonth)}MWh` : `${result.powerMonth}kWh`;
  //     result.powerYear = result.powerYear > 10000 ? `${convertToMWh(result.powerYear)}MWh` : `${result.powerYear}kWh`;
  //     result.allPower = result.allPower > 10000 ? `${convertToMWh(result.allPower)}MWh` : `${result.allPower}kWh`;

  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
