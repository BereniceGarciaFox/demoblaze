const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get loginModal () {
        return $('#login2');
    }

    get inputUsername () {
        return $('#loginusername');
    }

    get inputPassword () {
        return $('#loginpassword');
    }

    get btnLogIn () {
        return $('button[onclick="logIn()"]');
    }

    get welcomeMessage () {
        return $('#nameofuser');
    }

    /**
     * login using username and password
     */
    async login (username, password) {
        await (await this.loginModal).click();
        await (await this.inputUsername).setValue(username);
        await (await this.inputPassword).setValue(password);
        await this.btnLogIn.click();
    }

    /**
     * open blaze page
     */
    open () {
        return super.open('login');
    }
}

module.exports = new LoginPage();
