import { weatherApi } from '@/config';
import { HttpException } from '@/exceptions/httpException';
import { WeatherInterface } from '@/interfaces/powerGenerated.interface';
import { logger } from '@/utils/logger';
import { Service } from 'typedi';

@Service()
export class UtilsService {
  public async getWeatherData(lat: string, long: string): Promise<WeatherInterface> {
    try {
      const { data: weather } = await weatherApi.get(``, { params: { q: `${lat},${long}` } });

      return {
        cloud: weather.current.cloud,
        humidity: weather.current.humidity,
        tempC: weather.current.temp_c,
        localtime: weather.location.localtime,
        pressureIn: weather.current.pressure_in,
        uv: weather.current.uv,
        windKph: weather.current.wind_kph,
        precipMM: weather.current.precip_mm,
      };
    } catch (error: any) {
      logger.error(`WEATHER API ERROR: ${error.message}`);
      throw new HttpException(400, error.message);
    }
  }
}
