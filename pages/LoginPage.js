const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.getByLabel('Email:');
    this.password = page.getByLabel('Password:', { exact: true });
    this.submit = page.getByRole('button', { name: 'Log in', exact: true });
    this.logoutLink = page.getByRole('link', { name: /log out/i });
    this.loginLink = page.getByRole('link', { name: 'Log in', exact: true });
  }

  async login(customer) {
    if (await this.logoutLink.isVisible()) await this.logoutLink.click();
    await this.loginLink.click();
    await this.email.fill(customer.email);
    await this.password.fill(customer.password);
    await this.submit.click();
    await expect(this.logoutLink).toBeVisible();
  }
}

module.exports = { LoginPage };
