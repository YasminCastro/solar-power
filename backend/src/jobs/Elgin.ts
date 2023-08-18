import { SolarDataService } from '@/services/solarData.service';
import { Container } from 'typedi';

export default {
  key: 'Elgin',
  options: {},
  async handle({ data }) {
    const solarData = Container.get(SolarDataService);

    try {
      const elginData = await solarData.saveElginData(data.inverter, data.userId.toString());

      console.log(elginData);
      return Promise.resolve('Ok');
    } catch (error) {
      return Promise.reject(new Error());
    }
  },
};
