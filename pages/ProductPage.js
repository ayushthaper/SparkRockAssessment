const { expect } = require('@playwright/test');

class ProductPage {
  constructor(page) {
    this.page = page;
    this.price = page.locator('.product-price span').first();
    this.addToCartButton = page.locator('.add-to-cart-button');
    this.addToCartNotification = page.locator('.bar-notification');
  }

  async openByName(name) {
    await this.page.goto('/');
    await this.productLink(name).first().click();
    await expect(this.productHeading(name)).toBeVisible();
  }

  productLink(name) {
    return this.page.getByRole('link', { name, exact: true });
  }

  productHeading(name) {
    return this.page.getByRole('heading', { name, level: 1 });
  }


  async addToCart() {
    await this.addToCartButton.click();
    await expect(this.addToCartNotification).toContainText(/added/i);
  }
}

module.exports = { ProductPage };
