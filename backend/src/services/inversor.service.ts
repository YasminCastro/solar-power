import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import puppeteer, { Browser, Page } from 'puppeteer';
import { HttpException } from '@/exceptions/httpException';
import { logger } from '@/utils/logger';

@Service()
export class InversorService {
  public users = new PrismaClient().user;

  public async hauwei(page: Page, browser: Browser): Promise<any> {
    const POWER_REAL_TIME_SELECTOR = '.nco-kiosk-overview-data';
    const C02_SELECTOR = '.social-co2-item';
    const COAL_SELECTOR = '.social-coal-item';
    const TREE_SELECTOR = '.social-trees-item';

    try {
      logger.info(`POWER GENERATION DATA...`);

      // POWER GENERATION DATA
      await page.waitForSelector(POWER_REAL_TIME_SELECTOR, { timeout: 5000 });
      let powerGenerationDataEval = await page.$$(POWER_REAL_TIME_SELECTOR);

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
        todayPerformance: parseFloat(powerGenerationData[1]),
        monthPerformace: parseFloat(powerGenerationData[2]),
        yearPerformace: parseFloat(powerGenerationData[3]),
        allPerformace: parseFloat(powerGenerationData[4]),
        co2Value: parseFloat(co2Value),
        coalValue: parseFloat(coalValue),
        treeValue: parseInt(treeValue),
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
      args: ['--window-size=1400,1080', '--disable-setuid-sandbox'],
      ignoreHTTPSErrors: true,
    });

    let page = (await browser.pages())[0];

    logger.info(`Going to page ${url}...`);

    await page.goto(url, {
      waitUntil: 'networkidle0',
    });

    return { browser, page };
  }
}
