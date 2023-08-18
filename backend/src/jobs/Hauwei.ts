import { Inverter } from '@/interfaces/inverter.interface';
import { SolarDataService } from '@/services/solarData.service';
import { Container } from 'typedi';

export default {
  key: 'Hauwei',
  options: {},
  async handle({ data }) {
    const solarData = Container.get(SolarDataService);
    const { url, _id, userId, lat, long }: Inverter = data.inverter;

    try {
      if (!url) {
        throw new Error(`Inverter ${_id} URL not found!`);
      }

      const { page, browser } = await solarData.goToPage(url);
      const hauweiData = await solarData.hauweiInterface(page, browser);

      // const weather = await this.utils.getWeatherData(lat, long);

      const userInfo = {
        lat,
        long,
        userId,
        inverterId: _id.toString(),
      };

      const result = await solarData.saveInverterData(hauweiData, userInfo);

      console.log(result);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(new Error());
    }
  },
};
