import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { InvertersService } from '@/services/inverters.service';
import { SolarDataService } from '@/services/solarData.service';
import Queue from '../libs/queue';

export class SolarDataController {
  public solarData = Container.get(SolarDataService);
  public inverters = Container.get(InvertersService);

  public saveHauweiData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inverterId = String(req.params.id);

      const inverter = await this.inverters.getInverterById(inverterId);
      if (!inverter) throw new Error('Inverter not found');

      await Queue.add('Hauwei', { inverter });
      res.status(204).json({
        message: 'Adicionado na fila!',
      });
    } catch (error) {
      next(error);
    }
  };

  public saveElginData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inverterId = String(req.params.id);

      const inverter = await this.inverters.getInverterById(inverterId);
      if (!inverter) throw new Error('Inverter not found');

      await Queue.add('Elgin', { inverter });
      res.status(204).json({
        message: 'Adicionado na fila!',
      });
    } catch (error) {
      next(error);
    }
  };
}
