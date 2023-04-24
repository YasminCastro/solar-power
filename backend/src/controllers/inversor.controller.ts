import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { InversorService } from '@/services/inversor.service';

export class InversorController {
  public inversor = Container.get(InversorService);

  public getHauweiData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const url: string = req.body.url;
      const { page, browser } = await this.inversor.goToPage(url);

      const hauweiData = await this.inversor.hauwei(page, browser);

      res.status(201).json(hauweiData);
    } catch (error) {
      next(error);
    }
  };
}
