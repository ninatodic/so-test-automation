class BasePage {
  constructor() {
    this.timeout = 20 * 1000;
  }

  //Locates elements using a CSS selector.
  async getElementByCss(selector, timeout = this.timeout) {
    try {
      let element = await driver.wait(
        until.elementLocated(By.css(selector)),
        timeout
      );
      return element;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  //Locates elements by the ID attribute
  async getElementById(id, timeout = this.timeout) {
    try {
      let element = await driver.wait(until.elementLocated(By.id(id)), timeout);
      return element;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  //Locates elements that have a specific class name
  async getElementByClassName(className, timeout = this.timeout) {
    try {
      let element = await driver.wait(
        until.elementLocated(By.className(className)),
        timeout
      );
      return element;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  //Locates elements matching a XPath selector
  async getElementByXPath(xpath, timeout = this.timeout) {
    try {
      let element = await driver.wait(
        until.elementLocated(By.xpath(xpath)),
        timeout
      );
      return element;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  //Locates elements whose name attribute has the given value
  async getElementByName(name, timeout = this.timeout) {
    try {
      let element = await driver.wait(
        until.elementLocated(By.name(name)),
        timeout
      );
      return element;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  //Locates link elements whose visible text matches the given string.
  async getElementByLinkText(text, timeout = this.timeout) {
    try {
      let element = await driver.wait(
        until.elementLocated(By.linkText(text)),
        timeout
      );
      return element;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  //input text into text field
  async inputTextIntoField(element, text) {
    if (element) {
      try {
        await element.sendKeys(text);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('element not selected');
    }
  }

  //click element
  async clickElement(element) {
    if (element) {
      try {
        await element.click();
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('element not selected');
    }
  }

  async getTextFromElement(element) {
    if (element) {
      try {
        let text = await element.getText();
        return text;
      } catch (err) {
        console.log(err);
        return false;
      }
    } else {
      console.log('element not selected');
    }
  }

  async waitUntilUrlChanges(url) {
    try {
      await driver.wait(async () => {
        return url !== (await driver.getCurrentUrl());
      }, 10 * 1000);
    } catch (err) {
      console.log(err);
    }
  }

  async acceptCookies() {
    let cookiePopElement = await this.cookiePopup;
    if (cookiePopElement) {
      await this.clickElement(await this.acceptAllCookiesBtn);
    }
  }
}

module.exports = BasePage;
