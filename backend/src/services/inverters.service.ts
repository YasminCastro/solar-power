import Container, { Service } from 'typedi';
import { CreateInvertersDto, UpdateInvertersDto } from '@/dtos/inverters.dto';
import * as Crypto from 'crypto-js';
import { CRYPTO_KEY } from '@/config';
import { UtilsService } from './utils.service';
import { logger } from '@utils/logger';
import { Inverter } from '@/interfaces/inverter.interface';
import { InverterModel } from '@/models/inverters.models';
import { HttpException } from '@/exceptions/httpException';

@Service()
export class InvertersService {
  public utils = Container.get(UtilsService);

  public async createInverter(inverterData: CreateInvertersDto, userId: string): Promise<any> {
    let password = null;
    if (inverterData.password) {
      password = Crypto.AES.encrypt(inverterData.password, CRYPTO_KEY).toString();
      inverterData.password = password;
    }

    const createInverterData: Inverter = await InverterModel.create({ ...inverterData, users: [userId] });

    return createInverterData;
  }

  public async getInverter(inverterId: string): Promise<Inverter> {
    const inverterFound = await InverterModel.findById(inverterId);

    if (!inverterFound) throw new HttpException(404, `Inverter: ${inverterId} not found.`);

    return inverterFound;
  }

  public async getInverters(): Promise<Inverter[]> {
    const invertersFound = await InverterModel.find();

    return invertersFound;
  }

  public async updateInverter(inverterData: UpdateInvertersDto): Promise<any> {
    let password = null;
    if (inverterData.password) {
      password = Crypto.AES.encrypt(inverterData.password, CRYPTO_KEY).toString();
      inverterData.password = password;
    }

    const updateInverterData = await InverterModel.findOneAndUpdate({ _id: inverterData.inverterId }, { $set: inverterData }, { new: true });

    return updateInverterData;
  }

  public async deleteInverter(inverterId: string, userId: string, deleteForAll: boolean): Promise<any> {
    if (deleteForAll) {
      const deleteInverterData = await InverterModel.findByIdAndDelete(inverterId);
      return deleteInverterData;
    }

    const updatedInverter = await InverterModel.findByIdAndUpdate(inverterId, { $pull: { users: userId } }, { new: true });

    // Se depois da atualização, o array de users estiver vazio, deleta o inversor inteiro
    if (updatedInverter.users.length === 0) {
      await InverterModel.findByIdAndDelete(inverterId);
    }

    return updatedInverter;
  }
}
