const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor() {
    super();
  }

  get acceptAllCookiesBtn() {
    return this.getElementByClassName('js-accept-cookies');
  }

  get emailField() {
    return this.getElementById('email');
  }

  get passwordField() {
    return this.getElementByName('password');
  }

  get loginBtn() {
    return this.getElementByXPath('//*[@id="submit-button"]');
  }

  get loginWithGoogleBtn() {
    return this.getElementByXPath('//*[@id="openid-buttons"]/button[1]');
  }

  get loginWithGitHubBtn() {
    return this.getElementByXPath('//*[@id="openid-buttons"]/button[2]');
  }

  get loginWithFacebookBtn() {
    return this.getElementByXPath('//*[@id="openid-buttons"]/button[3]');
  }

  get formValidationError() {
    return this.getElementByCss('.has-error > p');
  }

  get cookiePopup() {
    return this.getElementByClassName('js-consent-banner');
  }

  async errorMessageText() {
    return await this.getTextFromElement(await this.formValidationError);
  }

  async login(credentials) {
    if (credentials.email)
      await this.inputTextIntoField(await this.emailField, credentials.email);

    if (credentials.password)
      await this.inputTextIntoField(
        await this.passwordField,
        credentials.password
      );
    await this.clickElement(await this.loginBtn);
  }
}

module.exports = LoginPage;
