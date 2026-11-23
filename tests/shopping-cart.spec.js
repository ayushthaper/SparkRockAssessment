const { test, expect } = require('../fixtures/test-fixtures');
const { catalog } = require('../utils/test-data');

test('TC-CART-005: cart subtotal equals unit price multiplied by quantity', async ({
  productPage,
  shoppingCartPage,
}) => {
  const quantity = 2;

  await productPage.openByName(catalog.subtotalProduct);
  const unitPrice = Number((await productPage.price.innerText()).replace(/[^\d.]/g, ''));
  await productPage.addToCart();
  await shoppingCartPage.open();

  const productRow = shoppingCartPage.rowFor(catalog.subtotalProduct);
  await expect(productRow).toBeVisible();
  await expect(shoppingCartPage.quantityInputFor(catalog.subtotalProduct)).toHaveValue('1');
  await shoppingCartPage.updateQuantity(catalog.subtotalProduct, quantity);
  await expect(shoppingCartPage.quantityInputFor(catalog.subtotalProduct)).toHaveValue(String(quantity));

  const displayedSubtotal = Number(
    (await shoppingCartPage.subtotalFor(catalog.subtotalProduct).innerText()).replace(/[^\d.]/g, ''),
  );
  expect(displayedSubtotal).toBeCloseTo(unitPrice * quantity, 2);

  await shoppingCartPage.remove(catalog.subtotalProduct);
  await expect(shoppingCartPage.emptyCartMessage).toBeVisible();
});
