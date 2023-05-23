import { NextFunction, Response } from 'express';
import { Container } from 'typedi';
import { InversorsService } from '@/services/inversors.service';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { CreateInnvertersDto } from '@/dtos/inversors.dto';

export class InvertersController {
  public inversor = Container.get(InversorsService);

  public createInversor = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inversorData: CreateInnvertersDto = req.body;
      const userId = req.user.id;

      await this.inversor.createInversor(inversorData, userId);

      res.status(201).json({ message: 'Inversor successfully created' });
    } catch (error) {
      next(error);
    }
  };

  public getByUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id;

      const inversor = await this.inversor.getInversorsByUser(userId);

      res.status(201).json(inversor);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inversorId = parseInt(req.params.id);
      const userId = req.user.id;

      const inversor = await this.inversor.getInversorById(inversorId, userId);

      res.status(201).json(inversor);
    } catch (error) {
      next(error);
    }
  };

  public updateInversor = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inversorData: CreateInnvertersDto = req.body;
      const inversorId = parseInt(req.params.id);

      const inversor = await this.inversor.updateInversor(inversorData, inversorId);

      res.status(201).json({ inversor, message: 'Inversor successfully updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteInversor = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inversorId = parseInt(req.params.id);

      await this.inversor.deleteInversor(inversorId);

      res.status(201).json({ message: 'Inversor successfully deleted' });
    } catch (error) {
      next(error);
    }
  };
}
