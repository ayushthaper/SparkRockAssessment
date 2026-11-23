const { expect } = require('@playwright/test');

class ShoppingCartPage {
  constructor(page) {
    this.page = page;
    this.rows = page.locator('.cart tbody tr');
    this.updateCart = page.getByRole('button', { name: /update shopping cart/i });
    this.emptyCartMessage = page.getByText(/your shopping cart is empty/i);
    this.shoppingCartLink = page.getByRole('link', { name: /shopping cart/i });
  }

  async open() {
    await this.shoppingCartLink.first().click();
    await expect(this.page).toHaveURL(/cart/);
  }

  rowFor(productName) {
    return this.rows.filter({ hasText: productName });
  }

  quantityInputFor(productName) {
    return this.rowFor(productName).locator('input.qty-input');
  }

  subtotalFor(productName) {
    return this.rowFor(productName).locator('.subtotal');
  }

  removeCheckboxFor(productName) {
    return this.rowFor(productName).locator('input[type="checkbox"]');
  }

  async updateQuantity(productName, quantity) {
    await this.quantityInputFor(productName).fill(String(quantity));
    await this.updateCart.click();
  }

  async remove(productName) {
    await this.removeCheckboxFor(productName).check();
    await this.updateCart.click();
    await expect(this.rowFor(productName)).toHaveCount(0);
  }
}

module.exports = { ShoppingCartPage };
