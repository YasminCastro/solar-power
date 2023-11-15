import { Service } from 'typedi';
import { CreateInvertersDto, UpdateInvertersDto } from '@/dtos/inverters.dto';
import * as Crypto from 'crypto-js';
import { CRYPTO_KEY } from '@/config';
import { Inverter } from '@/interfaces/inverter.interface';
import { InverterModel } from '@/models/inverters.models';
import { HttpException } from '@/exceptions/httpException';

@Service()
export class InvertersService {
  public async createInverter(inverterData: CreateInvertersDto, userId: string): Promise<any> {
    let password = null;
    if (inverterData.password) {
      password = Crypto.AES.encrypt(inverterData.password, CRYPTO_KEY).toString();
      inverterData.password = password;
    }

    const createInverterData: Inverter = await InverterModel.create({ ...inverterData, users: [userId] });

    return createInverterData;
  }

  public async getInverterById(inverterId: string): Promise<Inverter> {
    const inverterFound = await InverterModel.findById(inverterId);

    if (!inverterFound) throw new HttpException(404, `Inverter: ${inverterId} not found.`);

    return inverterFound;
  }

  public async getInverterByUser(userId: string): Promise<Inverter[]> {
    const inverters = await InverterModel.find({ users: userId });

    if (!inverters || inverters.length === 0) throw new HttpException(404, `No inverters found for user: ${userId}.`);

    return inverters;
  }

  public async getInverters(): Promise<Inverter[]> {
    const invertersFound = await InverterModel.find();

    return invertersFound;
  }

  public async updateInverter(inverterData: UpdateInvertersDto, inverterId: string): Promise<any> {
    let password = null;
    if (inverterData.password) {
      password = Crypto.AES.encrypt(inverterData.password, CRYPTO_KEY).toString();
      inverterData.password = password;
    }

    const updateInverterData = await InverterModel.findOneAndUpdate({ _id: inverterId }, { $set: inverterData }, { new: true });

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
