const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const testData = require('../constants/testData')

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open()

        await LoginPage.login(testData.LOGIN_DATA.username, testData.LOGIN_DATA.password)
        await expect(LoginPage.welcomeMessage).toBeExisting();
        await expect(LoginPage.welcomeMessage).toHaveText('Welcome ' +testData.LOGIN_DATA.username);
    })
})

