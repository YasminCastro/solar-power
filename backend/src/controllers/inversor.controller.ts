import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { InversorService } from '@/services/inversor.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class InversorController {
  public inversor = Container.get(InversorService);

  public getHauweiData = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const url: string = req.body.url;
      const { page, browser } = await this.inversor.goToPage(url);

      const hauweiData = await this.inversor.hauwei(page, browser);

      const saveInversorData = await this.inversor.saveInversorData(req.user.id, hauweiData);

      console.log(saveInversorData);

      res.status(201).json(saveInversorData);
    } catch (error) {
      next(error);
    }
  };
}
