    const { expect } = require('@wdio/globals')
    const LoginPage = require('../pageobjects/login.page')
    const ProductsPage = require('../pageobjects/products.page')
    const CartPage = require('../pageobjects/cart.page')
    const testData = require('../constants/testData')
    const messages = require('../constants/messages')
    
describe('Cart application', () => {
    /**
     * Login before each test
     */
    before(async () => {
        await LoginPage.open();
        await LoginPage.login(testData.LOGIN_DATA.username, testData.LOGIN_DATA.password);
    });

    it('should add a product to the cart', async () => {
        await ProductsPage.openProduct(1);
        const productName = await ProductsPage.getProductName();
        await CartPage.addItemToCart(1);
        const alertText = await CartPage.getProductAddedMessage();
        await expect(alertText).toBe(messages.PRODUCT_ADDED);
        await CartPage.openCart();
        const cartProducts = await CartPage.getAllCartProducts();
        await expect(cartProducts).toContain(productName);
    })
})