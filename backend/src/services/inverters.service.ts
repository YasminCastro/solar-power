import Container, { Service } from 'typedi';
import { CreateInvertersDto, UpdateInvertersDto } from '@/dtos/inverters.dto';
import { HttpException } from '@/exceptions/httpException';
import * as Crypto from 'crypto-js';
import { CRYPTO_KEY } from '@/config';
import { UtilsService } from './utils.service';
import { UserModel } from '@/models/users.models';
import { logger } from '@utils/logger';
import { Inverter } from '@/interfaces/inverter.interface';
import { InverterModel } from '@/models/inverters.models';

@Service()
export class InvertersService {
  public utils = Container.get(UtilsService);

  public async createInverter(inverterData: CreateInvertersDto, userId: string): Promise<any> {
    //CHECK IF INVERTER ALREADY EXISTS

    const createInverterData: Inverter = await InverterModel.create({ ...inverterData, users: [userId] });

    return createInverterData;
  }

  public async getInverter(inverterId: string): Promise<{ inverter: Inverter; userId: string }> {
    const findUserInverters = await UserModel.findOne({ 'inverters._id': inverterId });

    if (!findUserInverters) {
      logger.info(`Nenhum usuário encontrado com o inverter ID: ${inverterId}}`);
      return;
    }

    const inverter = findUserInverters.inverters.find(inverter => inverter._id == inverterId);
    return { inverter, userId: findUserInverters._id };
  }

  public async updateInverter(inverterData: UpdateInvertersDto, inverterId: string, userId: string): Promise<any> {
    let password = null;
    if (inverterData.password) {
      password = Crypto.AES.encrypt(inverterData.password, CRYPTO_KEY).toString();
    }

    let itemsToUpdate = {};

    if (inverterData.active !== undefined || inverterData.active !== null) itemsToUpdate['inverters.$.active'] = inverterData.active;
    if (inverterData.maxRealTimePower) itemsToUpdate['inverters.$.maxRealTimePower'] = inverterData.maxRealTimePower;
    if (inverterData.username) itemsToUpdate['inverters.$.username'] = inverterData.username;
    if (inverterData.name) itemsToUpdate['inverters.$.name'] = inverterData.name;
    if (inverterData.cep) itemsToUpdate['inverters.$.cep'] = inverterData.cep;
    if (inverterData.lat) itemsToUpdate['inverters.$.lat'] = inverterData.lat;
    if (inverterData.long) itemsToUpdate['inverters.$.long'] = inverterData.long;
    if (password) itemsToUpdate['inverters.$.password'] = password;

    const updateInverterData = await UserModel.findOneAndUpdate({ _id: userId, 'inverters._id': inverterId }, { $set: itemsToUpdate }, { new: true });

    return updateInverterData;
  }

  public async deleteInverter(inverterName: string, userId: string): Promise<any> {
    const deleteInverterData = await UserModel.findByIdAndUpdate(userId, { $pull: { inverters: { name: inverterName } } });

    return deleteInverterData;
  }
}
