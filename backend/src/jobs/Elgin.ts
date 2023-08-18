import { CRYPTO_KEY } from '@/config';
import { Inverter } from '@/interfaces/inverter.interface';
import { SolarDataService } from '@/services/solarData.service';
import { Container } from 'typedi';
import * as Crypto from 'crypto-js';

export default {
  key: 'Elgin',
  options: {},
  async handle({ data }) {
    const solarData = Container.get(SolarDataService);
    const { username, password: rawPassword, _id }: Inverter = data.inverter;

    try {
      if (!username || !rawPassword) {
        throw new Error(`Inverter ${_id} ursername or password not found!`);
      }
      const bytes = Crypto.AES.decrypt(rawPassword, CRYPTO_KEY);
      const password = bytes.toString(Crypto.enc.Utf8);

      const url = 'https://elgin.shinemonitor.com';

      const { page, browser } = await solarData.goToPage(url);

      const elginData = await solarData.elginInterface(page, browser, username, password);

      // const weather = await solarData.utils.getWeatherData(lat, long);

      const powerInRealTime = await solarData.calculateRealTimePower(_id, parseFloat(elginData.powerToday));

      elginData.powerInRealTime = `${powerInRealTime}kW`;

      if (!powerInRealTime) elginData.powerInRealTime = `0kW`;

      const result = await solarData.saveInverterData(elginData, _id);

      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(new Error());
    }
  },
};
