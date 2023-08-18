import { SolarDataService } from '@/services/solarData.service';
import { Container } from 'typedi';

export default {
  key: 'Hauwei',
  options: {},
  async handle({ data }) {
    const solarData = Container.get(SolarDataService);

    try {
      const hauweiData = await solarData.saveHauweiData(data.inverter, data.userId.toString());
      console.log(hauweiData);
      return Promise.resolve('Ok');
    } catch (error) {
      return Promise.reject(new Error());
    }
  },
};
