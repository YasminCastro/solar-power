import { NextFunction, Response } from 'express';
import { Container } from 'typedi';
import { InvertersService } from '@/services/inverters.service';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { CreateInvertersDto, UpdateInvertersDto } from '@/dtos/inverters.dto';
export class InvertersController {
  public inverter = Container.get(InvertersService);

  public createInverter = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inverterData: CreateInvertersDto = req.body;
      const userId = req.user._id;

      const inverter = await this.inverter.createInverter(inverterData, userId);

      res.status(201).json({ message: 'Inverter successfully created', inverter });
    } catch (error) {
      next(error);
    }
  };

  public getInverters = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inverters = await this.inverter.getInverters();

      res.status(201).json(inverters);
    } catch (error) {
      next(error);
    }
  };

  public getInverterById = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inverterId = String(req.params.id);

      const inverter = await this.inverter.getInverterById(inverterId);

      res.status(201).json(inverter);
    } catch (error) {
      next(error);
    }
  };

  public getInverterByUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = String(req.params.id);

      const inverter = await this.inverter.getInverterByUser(userId);

      res.status(201).json(inverter);
    } catch (error) {
      next(error);
    }
  };

  public updateInverter = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inverterData: UpdateInvertersDto = req.body;

      const inverter = await this.inverter.updateInverter(inverterData);

      if (!inverter) {
        throw new Error('Error to update inverter.');
      }

      res.status(201).json({ inverter, message: 'Inverter successfully updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteInverter = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inverterId = String(req.params.id);
      const deleteForAll = Boolean(req.query.deleteForAll);
      const userId = String(req.user._id);

      await this.inverter.deleteInverter(inverterId, userId, deleteForAll);

      res.status(201).json({ message: 'Inverter successfully deleted' });
    } catch (error) {
      next(error);
    }
  };
}
