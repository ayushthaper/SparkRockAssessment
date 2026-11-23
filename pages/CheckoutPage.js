const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.orderConfirmationMessage = page.getByText(/your order has been successfully processed/i);
    this.orderNumberMessage = page.getByText(/order number/i);
    this.termsCheckbox = page.locator('#termsofservice');
    this.checkoutButton = page.getByRole('button', { name: /checkout/i });
    this.billingCountry = page.locator('#BillingNewAddress_CountryId');
    this.billingState = page.locator('#BillingNewAddress_StateProvinceId');
    this.billingCity = page.locator('#BillingNewAddress_City');
    this.billingAddress1 = page.locator('#BillingNewAddress_Address1');
    this.billingPostalCode = page.locator('#BillingNewAddress_ZipPostalCode');
    this.billingPhone = page.locator('#BillingNewAddress_PhoneNumber');
    this.billingContinueButton = page.locator(
      '#billing-buttons-container input.new-address-next-step-button',
    );
    this.shippingContinueButton = page.locator(
      '#shipping-buttons-container input.new-address-next-step-button',
    );
    this.inStorePickup = page.getByLabel('In-Store Pickup');
    this.shippingAddress = page.locator('#shipping-address-select');
    this.shippingMethodContinueButton = page.locator('input.shipping-method-next-step-button');
    this.paymentMethodContinueButton = page.locator('input.payment-method-next-step-button');
    this.paymentInfoContinueButton = page.locator('input.payment-info-next-step-button');
    this.confirmOrderSection = page.locator('#checkout-step-confirm-order');
    this.confirmOrderButton = this.confirmOrderSection.getByRole('button', { name: /confirm/i });
    this.visibleRadioOptions = page.locator('input[type="radio"]:visible');
  }

  async beginFromCart() {
    if (await this.termsCheckbox.isVisible()) await this.termsCheckbox.check();
    await this.checkoutButton.click();
  }

  async completeBilling(customer) {
    await this.billingCountry.selectOption({ label: customer.billingAddress.country });
    await this.billingState.selectOption({ label: customer.billingAddress.state });
    await this.billingCity.fill(customer.billingAddress.city);
    await this.billingAddress1.fill(customer.billingAddress.address1);
    await this.billingPostalCode.fill(customer.billingAddress.postalCode);
    await this.billingPhone.fill(customer.billingAddress.phone);

    await expect(this.billingContinueButton).toBeVisible();
    await expect(this.billingContinueButton).toBeEnabled();
    await this.billingContinueButton.click();
  }

  async continueShippingAddress() {
    await expect(this.shippingContinueButton).toBeVisible();

    if (await this.inStorePickup.isVisible()) await this.inStorePickup.check();

    if (await this.shippingAddress.isVisible()) {
      await this.shippingAddress.selectOption(await this.shippingAddress.inputValue());
    }

    await expect(this.shippingContinueButton).toBeEnabled();
    await this.shippingContinueButton.click();
  }

  async continueShippingMethodIfPresent() {
    if (await this.shippingMethodContinueButton.isVisible()) {
      await this.selectFirstAvailableRadio();
      await expect(this.shippingMethodContinueButton).toBeEnabled();
      await this.shippingMethodContinueButton.click();
    }
  }

  async continuePaymentMethod() {
    await expect(this.paymentMethodContinueButton).toBeVisible();
    await this.selectFirstAvailableRadio();
    await expect(this.paymentMethodContinueButton).toBeEnabled();
    await this.paymentMethodContinueButton.click();
  }

  async continuePaymentInformation() {
    await expect(this.paymentInfoContinueButton).toBeVisible();
    await expect(this.paymentInfoContinueButton).toBeEnabled();
    await this.paymentInfoContinueButton.click();
  }

  async assertOrderReview(productName) {
    await expect(this.confirmOrderSection).toBeVisible();
    await expect(this.reviewProduct(productName)).toBeVisible();
    await expect(this.confirmOrderButton).toBeVisible();
  }

  reviewProduct(productName) {
    return this.confirmOrderSection.getByText(productName, { exact: true });
  }

  async confirmOrder() {
    await this.confirmOrderButton.click();
  }

  async selectFirstAvailableRadio() {
    if (await this.visibleRadioOptions.count()) await this.visibleRadioOptions.first().check();
  }
}

module.exports = { CheckoutPage };
