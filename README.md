# Sparkrock QA assessment

This project tests the Tricentis Demo Web Shop with Playwright and JavaScript. The automated scenarios cover a cart subtotal and a registered customer checkout.

## Setup

Use Node.js 20.12 or newer. Install the dependencies and Chromium:

```sh
npm install
npx playwright install chromium
```

## Run tests

```sh
npm test
npm run test:headed
npx playwright test tests/shopping-cart.spec.js
npm run report
```

Tests run headless by default. The headed command opens the browser window. The HTML report is written to `playwright-report/`; screenshots and traces from failed tests are saved under `test-results/`.

## Environments

Set `PLAYWRIGHT_ENV` to `demo`, `local`, `development`, `staging` or `production`. It defaults to `demo`. Each target has a settings file under `config/environments/`; the demo file is ready to use. Fill in `BASE_URL` in the file for any other target. Optional `.env.<environment>.local` files can hold local overrides and are ignored by Git. Shell variables override values in these files.

The checkout test creates an account and order. It is intended for the demo site; don’t point it at production.

## Test documents

- [Test strategy](test-strategy.md)
- [Test scenarios](test-scenarios.md)
- [Detailed test cases](test-cases.md)

## Current coverage

Two tests are automated: `TC-CART-005` checks the line subtotal, and `TC-CHK-001` completes checkout and checks the confirmation and order number. The other cases in the inventory are planned, not automated.
