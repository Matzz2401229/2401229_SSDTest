const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

const BASE_URL = process.env.APP_URL || 'http://localhost:3001';

describe('Search app UI', function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    const options = new chrome.Options();
    options.addArguments('--headless=new', '--no-sandbox', '--disable-dev-shm-usage');
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('submits a search term and shows the result page with a back button', async () => {
    await driver.get(BASE_URL);
    await driver.findElement(By.id('term')).sendKeys('selenium test');
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.elementLocated(By.linkText('Back to Home')), 10000);
    const body = await driver.findElement(By.css('body')).getText();
    assert.match(body, /selenium test/);

    await driver.findElement(By.linkText('Back to Home')).click();
    await driver.wait(until.elementLocated(By.id('term')), 10000);
  });
});
