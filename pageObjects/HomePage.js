const BasePage = require('./BasePage');
class HomePage extends BasePage {
  constructor() {
    super();
  }

  get topQuestionHeadline() {
    return this.getElementByXPath('//*[@id="mainbar"]/div[1]/h1');
  }

  get menuBtn() {
    return this.getElementByCss('.site-switcher-item > a');
  }

  get logoutLink() {
    return this.getElementByLinkText('log out');
  }

  async goToLogoutPage() {
    await this.clickElement(await this.menuBtn);
    await this.clickElement(await this.logoutLink);
  }
}

module.exports = HomePage;
