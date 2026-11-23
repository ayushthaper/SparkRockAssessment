const { test, expect } = require('../fixtures/test-fixtures');
const { catalog } = require('../utils/test-data');

test('TC-CHK-001 / TC-ORD-001: registered customer completes checkout and receives order confirmation', async ({
  productPage,
  registrationPage,
  loginPage,
  shoppingCartPage,
  checkoutPage,
  syntheticCustomer,
}) => {
  await registrationPage.register(syntheticCustomer);
  // Registration auto-authenticates. Log in again to verify the generated credentials.
  await loginPage.login(syntheticCustomer);

  await productPage.openByName(catalog.checkoutProduct);
  await productPage.addToCart();
  await shoppingCartPage.open();
  await expect(shoppingCartPage.rowFor(catalog.checkoutProduct)).toBeVisible();
  await checkoutPage.beginFromCart();
  await checkoutPage.completeBilling(syntheticCustomer);
  await checkoutPage.continueShippingAddress();
  await checkoutPage.continueShippingMethodIfPresent();
  await checkoutPage.continuePaymentMethod();
  await checkoutPage.continuePaymentInformation();

  await checkoutPage.assertOrderReview(catalog.checkoutProduct);
  await checkoutPage.confirmOrder();

  await expect(checkoutPage.orderConfirmationMessage).toBeVisible();
  await expect(checkoutPage.orderNumberMessage).toBeVisible();
});
