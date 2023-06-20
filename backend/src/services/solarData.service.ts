import { Service } from 'typedi';
import puppeteer, { Browser, Page } from 'puppeteer';
import { HttpException } from '@/exceptions/httpException';
import { logger } from '@/utils/logger';
import { ElginDataInterface, HauweiDataInterface, WeatherInterface, PowerGenerated } from '@/interfaces/powerGenerated.interface';
import moment from 'moment';
import { PowerGeneratedModel } from '@/models/powerGenerated.models';
import { InverterModel } from '@/models/inverters.models';
import { Inverter } from '@/interfaces/inverter.interface';
import { ElginDataDto, HauweiDataDto } from '@/dtos/solarData';
import * as Crypto from 'crypto-js';
import { CRYPTO_KEY } from '@/config';
import { Container } from 'typedi';
import { UtilsService } from './utils.service';

@Service()
export class SolarDataService {
  private utils = Container.get(UtilsService);

  public async saveElginData({
    inverterId,
    lat,
    long,
    userId,
    passwordIsEncrypted,
    password: rawPassword,
    username,
  }: ElginDataDto): Promise<PowerGenerated | { message: string }> {
    try {
      let password = rawPassword;

      if (passwordIsEncrypted) {
        password = Crypto.AES.decrypt(rawPassword, CRYPTO_KEY);
      }

      const url = 'https://elgin.shinemonitor.com';
      const { page, browser } = await this.goToPage(url);

      const elginData = await this.elginInterface(page, browser, username, password);

      const userInfo = {
        lat,
        long,
        userId,
        inverterId,
      };

      const weather = await this.utils.getWeatherData(lat, long);
      const powerInRealTime = await this.calculateRealTimePower(parseFloat(inverterId), parseFloat(elginData.powerToday));

      elginData.powerInRealTime = `${powerInRealTime}kW`;

      if (!powerInRealTime) elginData.powerInRealTime = `0kW`;

      return await this.saveInversorData(elginData, weather, userInfo);
    } catch (error: any) {
      logger.error(`Not able to save elgin data: ${error.message}`);
      throw new HttpException(400, error.message);
    }
  }

  public async saveHauweiData({ inverterId, lat, long, url, userId }: HauweiDataDto): Promise<PowerGenerated | { message: string }> {
    try {
      const { page, browser } = await this.goToPage(url);

      const hauweiData = await this.hauweiInterface(page, browser);

      const weather = await this.utils.getWeatherData(lat, long);

      const userInfo = {
        lat,
        long,
        userId,
        inverterId,
      };

      return await this.saveInversorData(hauweiData, weather, userInfo);
    } catch (error: any) {
      logger.error(`Not able to save elgin data: ${error.message}`);
      throw new HttpException(400, error.message);
    }
  }

  public async getAllInveters(): Promise<Inverter[]> {
    try {
      return await InverterModel.find();
    } catch (error: any) {
      throw new HttpException(400, error.message);
    }
  }

  //COMUM

  private async goToPage(url: string): Promise<{ browser: Browser; page: Page }> {
    logger.debug(`Lauching puppeteer browser...`);

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--window-size=1400,1080', '--disable-setuid-sandbox', '--no-sandbox'],
      ignoreHTTPSErrors: true,
    });

    let page = (await browser.pages())[0];

    await page.setRequestInterception(true);

    page.on('request', request =>
      /image/.test(request.resourceType()) && !request.isInterceptResolutionHandled()
        ? request.respond({ status: 200, body: 'aborted' })
        : request.continue(),
    );

    logger.debug(`Going to page ${url}...`);

    await page.goto(url, {
      waitUntil: 'networkidle0',
    });

    return { browser, page };
  }

  private async saveInversorData(
    inversorData: HauweiDataInterface | ElginDataInterface,
    weather: WeatherInterface,
    userInfo: { lat: string; long: string; userId: string; inverterId: string },
  ): Promise<PowerGenerated | { message: string }> {
    try {
      if (inversorData.powerInRealTime === '0kW') {
        const startOfDay = moment().startOf('day').toDate();
        //se ja tiver um registro com 0kw não precisa salvar dnv
        const findData: PowerGenerated = await PowerGeneratedModel.findOne({
          userId: userInfo.userId,
          inverterId: userInfo.inverterId,
          powerInRealTime: '0kW',
          createdAt: {
            $gte: startOfDay,
          },
        }).sort({ createdAt: -1 });

        if (findData) return { message: 'Data already saved' };
      }

      const createPowerGenerated: PowerGenerated = await PowerGeneratedModel.create({
        ...userInfo,
        ...inversorData,
        ...weather,
      });

      return createPowerGenerated;
    } catch (error) {
      throw new HttpException(400, error.message);
    }
  }

  private async calculateRealTimePower(inverterId: number, nowEnergy: number): Promise<string> {
    try {
      const previousEnergyFound: PowerGenerated = await PowerGeneratedModel.findOne({
        inverterId: inverterId,
      }).sort({ _id: -1 });

      console.log(previousEnergyFound);

      if (!previousEnergyFound) return `${nowEnergy}`;

      const previousEnergy = parseFloat(previousEnergyFound.powerToday);

      const rawPower = (nowEnergy - previousEnergy) / (1 / 12);

      const power = rawPower.toFixed(1);
      return power;
    } catch (error: any) {
      logger.error(`Not able to calculate power: ${error.message}`);
      throw new HttpException(400, error.message);
    }
  }

  //HAUWEI

  private async hauweiInterface(page: Page, browser: Browser): Promise<HauweiDataInterface> {
    const POWER_REAL_DATA_SELECTOR = '.nco-kiosk-overview-data';
    const C02_SELECTOR = '.social-co2-item';
    const COAL_SELECTOR = '.social-coal-item';
    const TREE_SELECTOR = '.social-trees-item';

    try {
      logger.debug(`POWER GENERATION DATA...`);

      // POWER GENERATION DATA
      await page.waitForSelector(POWER_REAL_DATA_SELECTOR, { timeout: 5000 });
      let powerGenerationDataEval = await page.$$(POWER_REAL_DATA_SELECTOR);

      logger.debug(`Creating powerGenerationDataPromise...`);

      const powerGenerationDataPromise = new Promise<string[]>(async resolve => {
        let data = [];
        for (let textData of powerGenerationDataEval) {
          const text = await (await textData.getProperty('innerText')).jsonValue();

          data.push(text);
        }

        resolve(data);
      });

      const powerGenerationData = await powerGenerationDataPromise;

      if (!powerGenerationData || powerGenerationData.length !== 5) {
        throw new HttpException(404, 'Power generation data not found');
      }

      logger.debug(`Power generation data OK...`);

      //ENVIRONMENTAL BENEFITS

      logger.debug(`ENVIRONMENT BENEFITS...`);
      const separeteValueFromText = /\d+(\.\d+)?\(t\)/;
      const removeParanthesis = /(\d+(\.\d+)?)(\(t\))/;
      const getNumbers = /\d+/;

      await page.waitForSelector(C02_SELECTOR, { timeout: 5000 });
      const co2Element = await page.$(C02_SELECTOR);
      const co2Value = await page.evaluate(el => el.textContent, co2Element);
      let co2 = co2Value.match(separeteValueFromText)[0];
      co2 = co2.replace(removeParanthesis, '$1t');

      await page.waitForSelector(COAL_SELECTOR, { timeout: 5000 });
      const coalElement = await page.$(COAL_SELECTOR);
      const coalValue = await page.evaluate(el => el.textContent, coalElement);
      let coal = coalValue.match(separeteValueFromText)[0];
      coal = coal.replace(removeParanthesis, '$1t');

      await page.waitForSelector(TREE_SELECTOR, { timeout: 5000 });
      const treeElement = await page.$(TREE_SELECTOR);
      const treeValue = await page.evaluate(el => el.textContent, treeElement);
      const tree = treeValue.match(getNumbers)[0];

      logger.debug(`Environmental benefits data OK...`);

      return {
        powerInRealTime: powerGenerationData[0].startsWith('0') ? '0kW' : powerGenerationData[0],
        powerToday: powerGenerationData[1],
        powerMonth: powerGenerationData[2],
        powerYear: powerGenerationData[3],
        allPower: powerGenerationData[4],
        co2,
        coal,
        tree,
      };
    } catch (error) {
      console.log(error);
    } finally {
      browser.close();
    }
  }

  //ELGIN

  private async elginInterface(page: Page, browser: Browser, username: string, password: string): Promise<ElginDataInterface> {
    const USERNAME_INPUT = '#loginusr > input';
    const PASSWORD_INPUT = '#loginpow > input';
    const LOGIN_BUTTON = '#loginbtn';
    const TODAY_ENERGY = '#stats00';
    const MONTH_ENERGY = '#stats01';
    const YEAR_ENERGY = '#stats02';
    const TOTAL_ENERGY = '#stats03';
    const GAINS = '#stats04';
    const COAL_SELECTOR = '#stats05';
    const TEMP_SELECTOR = '#stats06';
    const SOLAR_IRRADIANCE = '#stats07';

    try {
      logger.debug(`LOGIN ELGIN MONITOR...`);

      // LOGIN
      await page.waitForSelector(USERNAME_INPUT, { timeout: 10000 });
      await page.type(USERNAME_INPUT, username);

      await page.waitForSelector(PASSWORD_INPUT, { timeout: 10000 });
      await page.type(PASSWORD_INPUT, password);

      await page.waitForSelector(LOGIN_BUTTON, { timeout: 10000 });
      await page.click(LOGIN_BUTTON);

      await page.waitForNavigation({ waitUntil: 'networkidle0' });

      // POWER GENERATION DATA
      logger.debug(`GETTING TOTAL_ENERGY...`);

      await page.waitForSelector(TODAY_ENERGY, { timeout: 10000 });
      let todayPerformanceElement = await page.$(TODAY_ENERGY);
      let todayPerformance = await page.evaluate(el => el.textContent, todayPerformanceElement);

      await page.waitForSelector(MONTH_ENERGY);
      let monthPerformaceElement = await page.$(MONTH_ENERGY);
      let monthPerformace = await page.evaluate(el => el.textContent, monthPerformaceElement);

      await page.waitForSelector(YEAR_ENERGY);
      let yearPerformaceElement = await page.$(YEAR_ENERGY);
      let yearPerformace = await page.evaluate(el => el.textContent, yearPerformaceElement);

      await page.waitForSelector(TOTAL_ENERGY);
      let allPerformaceElement = await page.$(TOTAL_ENERGY);
      let allPerformace = await page.evaluate(el => el.textContent, allPerformaceElement);

      await page.waitForSelector(COAL_SELECTOR);
      let coalValueElement = await page.$(COAL_SELECTOR);
      let coalValue = await page.evaluate(el => el.textContent, coalValueElement);

      return {
        powerToday: todayPerformance,
        powerMonth: monthPerformace,
        powerYear: yearPerformace,
        allPower: allPerformace,
        co2: coalValue,
      };
    } catch (error) {
      console.log(error);
    } finally {
      browser.close();
    }
  }
}
