//imports
require('dotenv').config();
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');
const { Builder, By, Key, until } = require('selenium-webdriver');
const Jasmine = require('jasmine');
const reporters = require('jasmine-reporters');

//initialize jasmine and load config gile
const jasmine = new Jasmine();
jasmine.loadConfigFile('./spec/support/jasmine.json');

// initialize and add junitReporter
const junitReporter = new reporters.JUnitXmlReporter({
  savePath: './reports',
  consolidateAll: false,
});
jasmine.addReporter(junitReporter);

//initialize chromeOptions and add arguments
const chromeOptions = new chrome.Options();
chromeOptions.addArguments;

//create driver and add it to global object
const createDriver = async () => {
  return await new Builder()
    .forBrowser('chrome')
    .withCapabilities(chromeOptions)
    .build();
};

createDriver().then((driver) => {
  global.driver = driver;
  global.By = By;
  global.Key = Key;
  global.until = until;
  jasmine.execute();
});

//define what happens when execution is finished
jasmine.onComplete((passed) => {
  driver.close();
  if (passed) {
    console.log('all passed');
  } else {
    console.log('not all tests passed');
  }
});
