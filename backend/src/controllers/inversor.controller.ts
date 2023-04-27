import { NextFunction, Response } from 'express';
import { Container } from 'typedi';
import { InversorService } from '@/services/inversor.service';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { ElginDataDto } from '@/dtos/inversor.dto';

export class InversorController {
  public inversor = Container.get(InversorService);

  public getHauweiData = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const url: string = req.body.url;
      const { page, browser } = await this.inversor.goToPage(url);

      const hauweiData = await this.inversor.hauwei(page, browser);

      const saveInversorData = await this.inversor.saveInversorData(req.user.id, hauweiData);

      res.status(201).json(saveInversorData);
    } catch (error) {
      next(error);
    }
  };

  public getElginData = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const elginLoginInfo: ElginDataDto = req.body;
      const url = 'https://elgin.shinemonitor.com';
      const { page, browser } = await this.inversor.goToPage(url);

      const elginData = await this.inversor.elgin(page, browser, elginLoginInfo);

      const saveInversorData = await this.inversor.saveInversorData(req.user.id, elginData);

      res.status(201).json(saveInversorData);
    } catch (error) {
      next(error);
    }
  };
}
