const { randomUUID } = require('node:crypto');

const catalog = Object.freeze({
  subtotalProduct: '14.1-inch Laptop',
  checkoutProduct: '14.1-inch Laptop',
});

function createSyntheticCustomer() {
  const id = randomUUID().replaceAll('-', '').slice(0, 16);
  return {
    firstName: 'Sparkrock',
    lastName: 'Automation',
    email: `sparkrock.${id}@example.test`,
    password: `Qa-${id}-Safe9!`,
    billingAddress: {
      country: 'United States',
      state: 'California',
      city: 'Test City',
      address1: '100 Example Street',
      postalCode: '10001',
      phone: '5550100100',
    },
  };
}

module.exports = { catalog, createSyntheticCustomer };
