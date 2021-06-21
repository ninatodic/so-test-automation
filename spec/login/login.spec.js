const LoginPage = require('./../../pageObjects/LoginPage');
const HomePage = require('./../../pageObjects/HomePage');
const config = require('./../../config/config');
const { credentials } = require('./../../testData/credentials');
const LogoutPage = require('../../pageObjects/LogoutPage');

const homePage = new HomePage();
const loginPage = new LoginPage();
const logoutPage = new LogoutPage();
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20 * 1000;

describe('login suite', () => {
  beforeAll(async () => {
    await driver.get(`${config.baseUrl}/users/login`);
  });
  beforeEach(async () => {
    await driver.get(`${config.baseUrl}/users/login`);
    await loginPage.acceptCookies();
  });

  it('should display login page properly', async () => {
    expect(loginPage.loginWithGoogleBtn).toBeDefined();
    expect(
      await loginPage.getTextFromElement(await loginPage.loginWithGoogleBtn)
    ).toEqual('Log in with Google');
    expect(
      await loginPage.getTextFromElement(await loginPage.loginWithGitHubBtn)
    ).toEqual('Log in with GitHub');
    expect(
      await loginPage.getTextFromElement(await loginPage.loginWithFacebookBtn)
    ).toEqual('Log in with Facebook');
    expect(await loginPage.emailField).not.toBe(false);
    expect(await loginPage.passwordField).not.toBe(false);
    expect(
      await loginPage.getTextFromElement(await loginPage.loginBtn)
    ).toEqual('Log in');
  });

  it('should not log in without username', async () => {
    await loginPage.login(credentials.noUserNameCredentials);
    expect(await loginPage.errorMessageText()).toEqual(
      'Email cannot be empty.'
    );
    await driver.sleep(1000);
  });

  it('should not log in without password', async () => {
    await loginPage.login(credentials.noPasswordCredentials);
    expect(await loginPage.errorMessageText()).toEqual(
      'Password cannot be empty.'
    );
    await driver.sleep(1000);
  });

  it('should not log in with incorrect email', async () => {
    await loginPage.login(credentials.incorectEmailCredentials);
    expect(await loginPage.errorMessageText()).toEqual(
      'The email is not a valid email address.'
    );
    await driver.sleep(1000);
  });

  it('should not log in with unexisting user', async () => {
    await loginPage.login(credentials.unexistingUserCredentials);
    expect(await loginPage.errorMessageText()).toEqual(
      'The email or password is incorrect.'
    );
    await driver.sleep(1000);
  });

  it('should not log in with wrong password', async () => {
    await loginPage.login(credentials.incorrectPasswordCredentials);
    expect(await loginPage.errorMessageText()).toEqual(
      'The email or password is incorrect.'
    );
    await driver.sleep(1000);
  });

  fit('should log in with valid credentials', async () => {
    const url = await driver.getCurrentUrl();
    await loginPage.login(credentials.correctCredentials);
    await loginPage.waitUntilUrlChanges(url);
    expect(await driver.getCurrentUrl()).toBe('https://stackoverflow.com/');
    expect(
      await homePage.getTextFromElement(await homePage.topQuestionHeadline)
    ).toEqual('Top Questions');
  });

  afterAll(async () => {
    const url = await driver.getCurrentUrl();
    await homePage.goToLogoutPage();
    await logoutPage.waitUntilUrlChanges(url);
    await logoutPage.acceptCookies();
    await logoutPage.logout();
    await driver.sleep(3000);
  });
});
