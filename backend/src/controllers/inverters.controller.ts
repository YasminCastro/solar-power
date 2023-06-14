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

      await this.inversor.createInversor(inversorData, userId);

      res.status(201).json({ message: 'Inversor successfully created' });
    } catch (error) {
      next(error);
    }
  };

  public getInverters = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = String(req.query.userId);
      const inverterId = String(req.query.inverterId);

      if (!userId) {
        throw new HttpException(409, 'userId is required');
      }

      if (inverterId) {
        const inversor = await this.inversor.getInverterById(inverterId, userId);
        res.status(201).json([inversor]);
      } else {
        const inversor = await this.inversor.getInvertersByUser(userId);
        res.status(201).json(inversor);
      }
    } catch (error) {
      next(error);
    }
  };

  public updateInverter = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inversorData: UpdateInvertersDto = req.body;
      const inversorId = String(req.params.id);

      const inversor = await this.inversor.updateInverter(inversorData, inversorId);

      res.status(201).json({ inversor, message: 'Inversor successfully updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteInverter = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inversorId = String(req.params.id);

      await this.inversor.deleteInverter(inversorId);

      res.status(201).json({ message: 'Inversor successfully deleted' });
    } catch (error) {
      next(error);
    }
  };
}
