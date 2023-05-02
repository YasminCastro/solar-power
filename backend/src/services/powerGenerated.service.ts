import { PowerGenerated, PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import puppeteer, { Browser, Page } from 'puppeteer';
import { HttpException } from '@/exceptions/httpException';
import { logger } from '@/utils/logger';
import { ElginDataInterface, HauweiDataInterface, WeatherInterface } from '@/interfaces/powerGenerated.interface';
import { weatherApi } from '@/config';

@Service()
export class PowerGeneratedService {
  public powerGenerated = new PrismaClient().powerGenerated;

  public async hauwei(page: Page, browser: Browser): Promise<HauweiDataInterface> {
    const POWER_REAL_DATA_SELECTOR = '.nco-kiosk-overview-data';
    const C02_SELECTOR = '.social-co2-item';
    const COAL_SELECTOR = '.social-coal-item';
    const TREE_SELECTOR = '.social-trees-item';

    try {
      logger.info(`POWER GENERATION DATA...`);

      // POWER GENERATION DATA
      await page.waitForSelector(POWER_REAL_DATA_SELECTOR, { timeout: 5000 });
      let powerGenerationDataEval = await page.$$(POWER_REAL_DATA_SELECTOR);

      logger.info(`Creating powerGenerationDataPromise...`);

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

      logger.info(`Power generation data OK...`);

      //ENVIRONMENTAL BENEFITS

      logger.info(`ENVIRONMENT BENEFITS...`);

      await page.waitForSelector(C02_SELECTOR, { timeout: 5000 });
      let co2Element = await page.$(C02_SELECTOR);
      let co2Value = await page.evaluate(el => el.textContent, co2Element);

      await page.waitForSelector(COAL_SELECTOR, { timeout: 5000 });
      let coalElement = await page.$(COAL_SELECTOR);
      let coalValue = await page.evaluate(el => el.textContent, coalElement);

      await page.waitForSelector(TREE_SELECTOR, { timeout: 5000 });
      let treeElement = await page.$(TREE_SELECTOR);
      let treeValue = await page.evaluate(el => el.textContent, treeElement);

      logger.info(`Environmental benefits data OK...`);

      return {
        powerInRealTime: parseFloat(powerGenerationData[0]),
        powerToday: parseFloat(powerGenerationData[1]),
        powerMonth: parseFloat(powerGenerationData[2]),
        powerYear: parseFloat(powerGenerationData[3]),
        allPower: parseFloat(powerGenerationData[4]),
        co2: parseFloat(co2Value),
        coal: parseFloat(coalValue),
        tree: parseInt(treeValue),
      };
    } catch (error) {
      console.log(error);
    } finally {
      browser.close();
    }
  }

  public async elgin(page: Page, browser: Browser, username: string, password: string): Promise<ElginDataInterface> {
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
      logger.info(`LOGIN ELGIN MONITOR...`);

      // LOGIN
      await page.waitForSelector(USERNAME_INPUT, { timeout: 5000 });
      await page.type(USERNAME_INPUT, username);

      await page.waitForSelector(PASSWORD_INPUT, { timeout: 5000 });
      await page.type(PASSWORD_INPUT, password);

      await page.waitForSelector(LOGIN_BUTTON, { timeout: 5000 });
      await page.click(LOGIN_BUTTON);

      await page.waitForNavigation({ waitUntil: 'networkidle0' });

      // POWER GENERATION DATA
      logger.info(`GETTING TOTAL_ENERGY...`);

      await page.waitForSelector(TODAY_ENERGY);
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
        powerToday: parseFloat(todayPerformance),
        powerMonth: parseFloat(monthPerformace),
        powerYear: parseFloat(yearPerformace),
        allPower: parseFloat(allPerformace),
        co2: parseFloat(coalValue),
      };
    } catch (error) {
      console.log(error);
    } finally {
      browser.close();
    }
  }

  public async goToPage(url: string): Promise<{ browser: Browser; page: Page }> {
    logger.info(`Lauching puppeteer browser...`);

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

    logger.info(`Going to page ${url}...`);

    await page.goto(url, {
      waitUntil: 'networkidle0',
    });

    return { browser, page };
  }

  public async saveInversorData(
    inversorData: HauweiDataInterface | ElginDataInterface,
    weather: WeatherInterface,
    userInfo: { lat: string; long: string; userId: number; inversorId: number },
  ): Promise<PowerGenerated> {
    const createInversorData: Promise<PowerGenerated> = this.powerGenerated.create({
      data: { ...inversorData, ...weather, ...userInfo },
    });
    return createInversorData;
  }

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

    // const createInversorData: Promise<PowerGenerated> = this.powerGenerated.create({ data: { userId, ...inversorData } });
    // return createInversorData;
  }
}
