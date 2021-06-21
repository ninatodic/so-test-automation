const BasePage = require('./BasePage');

class LogoutPage extends BasePage {
  constructor() {
    super();
  }
  get logoutBtn() {
    return this.getElementByCss(
      '#content > div > form > div.grid.gs4 > button'
    );
  }

  async logout() {
    await this.clickElement(await this.logoutBtn);
  }
}

module.exports = LogoutPage;
