const { test: base, expect } = require('@playwright/test');
const { ProductPage } = require('../pages/ProductPage');
const { RegistrationPage } = require('../pages/RegistrationPage');
const { LoginPage } = require('../pages/LoginPage');
const { ShoppingCartPage } = require('../pages/ShoppingCartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { createSyntheticCustomer } = require('../utils/test-data');

const test = base.extend({
  productPage: async ({ page }, use) => { await use(new ProductPage(page)); },
  registrationPage: async ({ page }, use) => { await use(new RegistrationPage(page)); },
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  shoppingCartPage: async ({ page }, use) => { await use(new ShoppingCartPage(page)); },
  checkoutPage: async ({ page }, use) => { await use(new CheckoutPage(page)); },
  syntheticCustomer: async ({}, use) => { await use(createSyntheticCustomer()); },
});

module.exports = { test, expect };
