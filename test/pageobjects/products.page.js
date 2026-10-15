const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProductsPage extends Page {
    
    /**
     * Products list
     */
    get productsList () {
        return $('#tbodyid');
    }

    /**
     * Product name
     */
    get productName () {
        return $('h2.name');
    }

    /**
     * Open a product by its id
     * @param {number|string} id - product id
     */
    async openProduct(id) {
        await this.productsList.$(`a.hrefch[href="prod.html?idp_=${id}"]`).click();
    }

    /**
     * Get the product name
     */
    async getProductName() {
        await this.productName.waitForDisplayed({ timeout: 5000 });
        return await this.productName.getText();
    }
}

module.exports = new ProductsPage();
