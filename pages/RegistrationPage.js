const { expect } = require('@playwright/test');

class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByLabel('First name:');
    this.lastName = page.getByLabel('Last name:');
    this.email = page.getByLabel('Email:');
    this.password = page.getByLabel('Password:', { exact: true });
    this.confirmPassword = page.getByLabel('Confirm password:');
    this.registerButton = page.getByRole('button', { name: 'Register', exact: true });
    this.result = page.locator('.result');
  }

  async register(customer) {
    await this.page.goto('/register');
    await this.firstName.fill(customer.firstName);
    await this.lastName.fill(customer.lastName);
    await this.email.fill(customer.email);
    await this.password.fill(customer.password);
    await this.confirmPassword.fill(customer.password);
    await this.registerButton.click();
    await expect(this.result).toContainText(/registration completed/i);
  }
}

module.exports = { RegistrationPage };
