import { NextFunction, Response } from 'express';
import { Container } from 'typedi';
import { InvertersService } from '@/services/inverters.service';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { CreateInvertersDto, UpdateInvertersDto } from '@/dtos/inverters.dto';
import { HttpException } from '@/exceptions/httpException';

export class InvertersController {
  public inversor = Container.get(InvertersService);

  public createInverter = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inversorData: CreateInvertersDto = req.body;
      const userId = req.user._id;

      const inverter = await this.inversor.createInverter(inversorData, userId);

      res.status(201).json({ message: 'Inverter successfully created', inverter });
    } catch (error) {
      next(error);
    }
  };

  public updateInverter = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inverterData: UpdateInvertersDto = req.body;
      const inverterName = String(req.params.name);
      const userId = String(req.user._id);

      const inverter = await this.inversor.updateInverter(inverterData, inverterName, userId);

      res.status(201).json({ inverter, message: 'Inverter successfully updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteInverter = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inverterName = String(req.params.name);
      const userId = String(req.user._id);

      const deleted = await this.inversor.deleteInverter(inverterName, userId);

      res.status(201).json({ message: 'Inverter successfully deleted' });
    } catch (error) {
      next(error);
    }
  };
}
