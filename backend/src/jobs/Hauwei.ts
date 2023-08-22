import { Inverter } from '@/interfaces/inverter.interface';
import { SolarDataService } from '@/services/solarData.service';
import { Container } from 'typedi';

export default {
  key: 'Hauwei',
  options: {
    limiter: {
      max: 10,
    },
  },
  async handle({ data }) {
    const solarData = Container.get(SolarDataService);
    const { url, _id }: Inverter = data.inverter;

    try {
      if (!url) {
        throw new Error(`Inverter ${_id} URL not found!`);
      }

      const { page, browser } = await solarData.goToPage(url);
      const hauweiData = await solarData.hauweiInterface(page, browser);

      // const weather = await this.utils.getWeatherData(lat, long);

      const result = await solarData.saveInverterData(hauweiData, _id);

      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(new Error());
    }
  },
};
