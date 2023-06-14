import { Inversor, PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { CreateInvertersDto, UpdateInvertersDto } from '@/dtos/inverters.dto';
import { HttpException } from '@/exceptions/httpException';
import * as Crypto from 'crypto-js';
import { CRYPTO_KEY } from '@/config';
import { InverterModel } from '@/models/inverters.models';
import { Inverter } from '@/interfaces/inverter.interface';

@Service()
export class InvertersService {
  public inversors = new PrismaClient().inversor;

  public async createInversor(inversorData: CreateInvertersDto, userId: number): Promise<Inverter> {
    let password = null;
    if (inversorData.password) {
      password = Crypto.AES.encrypt(inversorData.password, CRYPTO_KEY).toString();
    }
    const createInversorData: Inverter = await InverterModel.create({ userId, ...inversorData, password });
    return createInversorData;
  }

  public async getAllInversors(): Promise<Inversor[]> {
    const findUserInversors: Inversor[] = await this.inversors.findMany();

    return findUserInversors;
  }

  public async getInversorsByUser(userId: number): Promise<Inversor[]> {
    const findUserInversors: Inversor[] = await this.inversors.findMany({
      where: { userId: userId },
    });

    return findUserInversors;
  }

  public async getInversorById(inversorId: number, userId: number): Promise<Inversor> {
    const findUserInversor: Inversor = await this.inversors.findUnique({
      where: { id: inversorId },
    });
    if (!findUserInversor) throw new HttpException(409, "Inversor doesn't exist");

    if (findUserInversor.userId !== userId) throw new HttpException(401, "Inversor doesn't belong to this user");

    return findUserInversor;
  }

  public async updateInversor(inversorData: UpdateInvertersDto, inversorId: number): Promise<Inversor> {
    const findUserInversor: Inversor = await this.inversors.findUnique({ where: { id: inversorId } });
    if (!findUserInversor) throw new HttpException(409, "Inversor doesn't exist");

    let password = null;
    if (inversorData.password) {
      password = Crypto.AES.encrypt(inversorData.password, CRYPTO_KEY).toString();
    }

    const updateInversorData = await this.inversors.update({ where: { id: inversorId }, data: { ...inversorData, password } });

    return updateInversorData;
  }

  public async deleteInversor(inversorId: number): Promise<Inversor> {
    const findInversor: Inversor = await this.inversors.findUnique({ where: { id: inversorId } });
    if (!findInversor) throw new HttpException(409, "Inversor doesn't exist");

    const deleteInversorData = await this.inversors.delete({ where: { id: inversorId } });
    return deleteInversorData;
  }
}
