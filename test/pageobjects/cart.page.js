const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CartPage extends Page {
    /**
     * Add to cart button for a given product id
     * @param {number|string} itemId - product id used in addToCart(N)
     */
    btnAddToCart (itemId) {
        return $(`a[onclick="addToCart(${itemId})"]`);
    }

    /**
     * View cart button
     */
    get btnViewCart () {
        return $('#cartur');
    }

    /**
     * Cart products
     */
    get cartProducts () {
        return $$('#tbodyid tr td:nth-child(2)');
    }

    /**
     * Cart table rows (one per product)
     */
    get cartRows () {
        return $$('#tbodyid tr');
    }

    /**
     * Click Add to cart for product N.
     * Stubs window.alert first so the message is captured even if the
     * native dialog flashes and is auto-dismissed by the driver.
     * @param {number|string} itemId
     */
    async addItemToCart (productId) {
        await browser.execute(() => {
            window.__lastAlertText = undefined;
            window.__originalAlert = window.alert;
            window.alert = (text) => {
                window.__lastAlertText = text;
                // Restore the original alert after catching
                window.alert = window.__originalAlert;
                delete window.__originalAlert;
            };
        });
        await this.btnAddToCart(productId).click();
    }

    /**
     * Return the product added message alert text
     */
    async getProductAddedMessage () {
        await browser.waitUntil(
            async () => (await browser.execute(() => window.__lastAlertText)) !== undefined,
            {
                timeout: 5000,
                timeoutMsg: 'Product added to cart message not found'
            }
        );
        return browser.execute(() => window.__lastAlertText);
    }

    /**
     * Open the cart page
     */
    async openCart() {
        await this.btnViewCart.click();
    }

    /**
     * Get the products names from the cart page
     */
    async getAllCartProducts () {
        await browser.waitUntil(
            async () => (await this.cartRows.length) > 0,
            {
                timeout: 5000,
                timeoutMsg: 'No products found in the cart'
            }
        );
        return await this.cartProducts.map(async (product) => {
            return await product.getText();
        });
    }
}

module.exports = new CartPage();
