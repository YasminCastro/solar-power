import Container, { Service } from 'typedi';
import { CreateInvertersDto, UpdateInvertersDto } from '@/dtos/inverters.dto';
import { HttpException } from '@/exceptions/httpException';
import * as Crypto from 'crypto-js';
import { CRYPTO_KEY } from '@/config';
import { InverterModel } from '@/models/inverters.models';
import { Inverter } from '@/interfaces/inverter.interface';
import { UtilsService } from './utils.service';

@Service()
export class InvertersService {
  public utils = Container.get(UtilsService);

  public async createInversor(inverterData: CreateInvertersDto, userId: string): Promise<any> {
    let password = null;
    if (inverterData.password) {
      password = Crypto.AES.encrypt(inverterData.password, CRYPTO_KEY).toString();
    }

    const { lat, long } = await this.utils.getCepData(inverterData.cep);

    const createInversorData: Inverter = await InverterModel.create({ userId, ...inverterData, password, lat, long });
    return createInversorData;
  }

  public async getAllInverters(): Promise<Inverter[]> {
    const findUserInversors: Inverter[] = await InverterModel.find();

    return findUserInversors;
  }

  public async getInvertersByUser(userId: string): Promise<Inverter[]> {
    const findUserInverters: Inverter[] = await InverterModel.find({ userId: userId });

    return findUserInverters;
  }

  public async getInverterById(inverterId: string, userId: string): Promise<Inverter> {
    const findUserInversor: Inverter = await InverterModel.findOne({ _id: inverterId });
    if (!findUserInversor) throw new HttpException(409, "Inverter doesn't exist");

    if (findUserInversor.userId !== userId) throw new HttpException(401, "Inverter doesn't belong to this user");

    return findUserInversor;
  }

  public async updateInverter(inversorData: UpdateInvertersDto, inverterId: string): Promise<Inverter> {
    let password = null;
    if (inversorData.password) {
      password = Crypto.AES.encrypt(inversorData.password, CRYPTO_KEY).toString();
    }

    const updateInverterData: Inverter = await InverterModel.findByIdAndUpdate({ _id: inverterId }, { ...inversorData, password });

    return updateInverterData;
  }

  public async deleteInverter(inverterId: string): Promise<Inverter> {
    const deleteInversorData: Inverter = await InverterModel.findByIdAndRemove({ _id: inverterId });

    return deleteInversorData;
  }
}
