import { Service } from 'typedi';
import puppeteer, { Browser, Page } from 'puppeteer';
import { HttpException } from '@/exceptions/httpException';
import { logger } from '@/utils/logger';
import { ElginDataInterface, HauweiDataInterface, WeatherInterface, PowerGenerated } from '@/interfaces/powerGenerated.interface';
import { PowerGeneratedModel } from '@/models/powerGenerated.models';
import { convertToKWh } from '@/utils/convertPower';
import chalk from 'chalk';
import moment from 'moment-timezone';

interface Time {
  hours: number;
  minutes: number;
}

@Service()
export class SolarDataService {
  //COMUM
  public async goToPage(url: string): Promise<{ browser: Browser; page: Page }> {
    console.log(chalk.bgMagenta(`Lauching puppeteer browser...`));

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--disable-setuid-sandbox', '--no-sandbox'],
      ignoreHTTPSErrors: true,
      defaultViewport: { width: 1800, height: 800 },
    });

    let page = (await browser.pages())[0];

    await page.setRequestInterception(true);

    page.on('request', request =>
      /image/.test(request.resourceType()) && !request.isInterceptResolutionHandled()
        ? request.respond({ status: 200, body: 'aborted' })
        : request.continue(),
    );

    console.log(chalk.magentaBright(`Going to page ${url}...`));

    await page.goto(url, {
      waitUntil: 'networkidle0',
    });

    return { browser, page };
  }

  public async saveInverterData(
    solarData: HauweiDataInterface | ElginDataInterface,
    inverterId: string,
    weather?: WeatherInterface,
  ): Promise<PowerGenerated | { message: string }> {
    console.log(chalk.yellow('Saving solar data...'));
    try {
      const data: Partial<HauweiDataInterface & ElginDataInterface & { weather?: WeatherInterface; inverterId: string }> = {
        ...solarData,
        inverterId,
      };

      if (weather) {
        data.weather = weather;
      }

      const createPowerGenerated: PowerGenerated = await PowerGeneratedModel.create(data);
      console.log(chalk.green('Solar data saved!'));
      console.log(createPowerGenerated);

      return createPowerGenerated;
    } catch (error) {
      console.log(error);
      throw new HttpException(400, error.message);
    }
  }

  //HAUWEI

  public async hauweiInterface(page: Page, browser: Browser): Promise<HauweiDataInterface> {
    const POWER_REAL_DATA_SELECTOR = '.nco-kiosk-overview-data';
    const C02_SELECTOR = '.social-co2-item';
    const COAL_SELECTOR = '.social-coal-item';
    const TREE_SELECTOR = '.social-trees-item';

    try {
      console.log(chalk.yellow(`HAUWEI POWER GENERATION DATA...`));

      // POWER GENERATION DATA
      await page.waitForSelector(POWER_REAL_DATA_SELECTOR, { timeout: 5000 });
      let powerGenerationDataEval = await page.$$(POWER_REAL_DATA_SELECTOR);

      console.log(chalk.yellow(`Creating powerGenerationDataPromise...`));

      const getPowerGenerationDataPromise = async () => {
        let data = [];
        for (let textData of powerGenerationDataEval) {
          const text = await (await textData.getProperty('innerText')).jsonValue();
          data.push(text);
        }
        return data;
      };

      const powerGenerationData = await getPowerGenerationDataPromise();

      if (!powerGenerationData || powerGenerationData.length !== 5) {
        throw new HttpException(404, 'Power generation data not found');
      }

      console.log(chalk.green(`Power generation data OK...`));

      //ENVIRONMENTAL BENEFITS

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

      console.log(chalk.green(`Environmental benefits data OK...`));

      return {
        powerInRealTime: powerGenerationData[0],
        powerToday: convertToKWh(powerGenerationData[1]),
        powerMonth: convertToKWh(powerGenerationData[2]),
        powerYear: convertToKWh(powerGenerationData[3]),
        allPower: convertToKWh(powerGenerationData[4]),
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

  public async elginInterface(page: Page, browser: Browser, username: string, password: string): Promise<ElginDataInterface> {
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
      console.log(chalk.yellow(`ELGIN LOGIN TO PLATAFORM...`));

      // LOGIN
      await page.waitForSelector(USERNAME_INPUT, { timeout: 10000 });
      await page.type(USERNAME_INPUT, username);

      await page.waitForSelector(PASSWORD_INPUT, { timeout: 10000 });
      await page.type(PASSWORD_INPUT, password);

      await page.waitForSelector(LOGIN_BUTTON, { timeout: 10000 });
      await page.click(LOGIN_BUTTON);

      await page.waitForNavigation({ waitUntil: 'networkidle0' });

      // POWER GENERATION DATA
      console.log(chalk.yellow(`ELGIN POWER GENERATION DATA...`));

      await page.waitForSelector(TODAY_ENERGY, { timeout: 10000 });
      let todayPerformanceElement = await page.$(TODAY_ENERGY);
      let todayPerformance: string = await page.evaluate(el => el.textContent, todayPerformanceElement);

      await page.waitForSelector(MONTH_ENERGY);
      let monthPerformaceElement = await page.$(MONTH_ENERGY);
      let monthPerformace: string = await page.evaluate(el => el.textContent, monthPerformaceElement);

      await page.waitForSelector(YEAR_ENERGY);
      let yearPerformaceElement = await page.$(YEAR_ENERGY);
      let yearPerformace: string = await page.evaluate(el => el.textContent, yearPerformaceElement);

      await page.waitForSelector(TOTAL_ENERGY);
      let allPerformaceElement = await page.$(TOTAL_ENERGY);
      let allPerformace: string = await page.evaluate(el => el.textContent, allPerformaceElement);

      await page.waitForSelector(COAL_SELECTOR);
      let coalValueElement = await page.$(COAL_SELECTOR);
      let coalValue = await page.evaluate(el => el.textContent, coalValueElement);

      const powerInRealTime = await this.selectCanvasDate(page);

      logger.info(`Generation: ${powerInRealTime} - ${todayPerformance} - ${monthPerformace} - ${yearPerformace} - ${allPerformace}`);
      console.log(chalk.green(`Power generation data OK...`));

      return {
        powerInRealTime: powerInRealTime || 0,
        powerToday: convertToKWh(todayPerformance),
        powerMonth: convertToKWh(monthPerformace),
        powerYear: convertToKWh(yearPerformace),
        allPower: convertToKWh(allPerformace),
        co2: coalValue,
      };
    } catch (error) {
      console.log(error);
    } finally {
      browser.close();
    }
  }

  private async selectCanvasDate(page: Page): Promise<any> {
    try {
      // 1° Procurar o canvas pelo selector e pegar o tamanho do gráfico
      logger.info(chalk.yellow(`SEARCHING FOR CANVAS SELECTOR...`));
      const CANVAS_SELECTOR = 'canvas[data-zr-dom-id="1"]';
      const canvas = await page.$(CANVAS_SELECTOR);
      const boundingBox = await canvas.boundingBox();
      const graphWidth = boundingBox.width;
      let currentPositionX = boundingBox.x + graphWidth / 2;

      // 2° Passar o mouse no meio do canvas, pegar o dado trazido no tooltip
      console.log(chalk.yellow(`MOVING MOUSE TO CANVAS...`));
      await page.mouse.move(currentPositionX, boundingBox.y + boundingBox.height / 2);
      await page.waitForSelector('.echarts-tooltip', { visible: true });
      const tooltipElement = await page.$('.echarts-tooltip');
      const tooltipText = await page.evaluate(el => el.textContent, tooltipElement);
      let timeFound: Time = this.extractTimeFromTooltip(tooltipText);
      console.log(chalk.yellow(`FIRST TIME FOUND: ${timeFound.hours}:${timeFound.minutes}`));

      // 3° Pegar o horário de agora, arredondando para baixo
      const now = moment.utc().tz('America/Sao_Paulo');
      const targetTime = {
        hours: now.hours(),
        minutes: Math.floor(now.minutes() / 10) * 10,
      };

      logger.info(chalk.blue(`Target time: ${targetTime.hours}:${targetTime.minutes}`));

      // Inicializa as variáveis para o loop
      let newTooltipText = '';
      const maxAttempts = 5;
      let attempt = 0;

      while (attempt < maxAttempts) {
        // Calcula a nova posição do mouse com base na posição anterior
        console.log(chalk.yellow(`AJUSTING MOUSE POSITION...`));
        const adjustedPositionX = this.adjustMousePosition(currentPositionX, timeFound, targetTime, graphWidth, 100);

        // Mover o mouse para a nova posição ajustada
        await page.mouse.move(adjustedPositionX, boundingBox.y + boundingBox.height / 2);
        await new Promise(resolve => setTimeout(resolve, 4000)); // Atraso

        // Aguarda e verifica o tooltip
        console.log(chalk.yellow(`WAITING FOR TOOLTIP...`));
        await page.waitForSelector('.echarts-tooltip', { timeout: 50000 });
        const newTooltipElement = await page.$('.echarts-tooltip');
        newTooltipText = await page.evaluate(el => el.textContent, newTooltipElement);

        console.log(`Attempt ${attempt + 1}, Tooltip Text: ${newTooltipText}`);

        // Extrai o tempo do novo tooltip
        timeFound = this.extractTimeFromTooltip(newTooltipText);

        // Atualiza currentPositionX para a próxima iteração
        currentPositionX = adjustedPositionX;

        // Verifica se alcançou o horário desejado
        if (timeFound.hours === targetTime.hours && timeFound.minutes === targetTime.minutes) {
          console.log(chalk.blue(`Target time found! ${timeFound.hours}:${timeFound.minutes}`));
          break;
        }

        attempt++;
      }

      const powerFound = this.extractPowerFromTooltip(newTooltipText);

      logger.info(chalk.blue(`Power Found: ${powerFound} at ${timeFound.hours}:${timeFound.minutes}`));

      return powerFound;
    } catch (error) {
      console.log(error);
    }
  }

  private adjustMousePosition(currentPositionX: number, timeFound: Time, targetTime: Time, graphWidth: number, margin: number): number {
    // Converte os tempos em slots de 10 minutos
    const currentSlot = timeFound.hours * 6 + Math.floor(timeFound.minutes / 10);
    const targetSlot = targetTime.hours * 6 + Math.floor(targetTime.minutes / 10);

    // Calcula a diferença em slots
    const slotDifference = targetSlot - currentSlot;

    // Ajusta a largura do gráfico para excluir as margens
    const adjustedGraphWidth = graphWidth - 2 * margin;

    // Calcula a diferença em pixels
    const pixelDifference = (slotDifference / (24 * 6)) * adjustedGraphWidth;

    // Ajusta a posição X atual com base na diferença calculada
    return currentPositionX + pixelDifference;
  }

  private extractTimeFromTooltip(tooltipText: string): Time {
    const timePattern = /(\d{2}):(\d{2})/;
    const match = tooltipText.match(timePattern);

    if (match && match.length >= 3) {
      const hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);

      return { hours, minutes };
    }

    return { hours: 0, minutes: 0 };
  }

  private extractPowerFromTooltip(tooltipText: string): number {
    const powerPattern = /Power:(\d\.\d)/;
    const match = tooltipText.match(powerPattern);

    if (match && match.length >= 2) {
      return parseFloat(match[1]);
    }

    return 0.0;
  }
}
