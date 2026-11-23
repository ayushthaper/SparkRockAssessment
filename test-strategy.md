# Test strategy — Tricentis Demo Web Shop

## Purpose

This strategy describes how the Tricentis Demo Web Shop will be tested for the Sparkrock Senior QA Engineer assessment. The application is a shared public demo, so its data and available options can change during testing.

## Scope

The test inventory covers registration and login, product search and details, wishlist and comparison, cart, discounts, checkout, and order confirmation. The current automated coverage is narrower: one cart subtotal test and one registered checkout test. The remaining cases are documented proposals and need to be checked against the site before implementation.

Actual payment processing, load testing, security testing, and backend database checks are outside this assessment.

## Approach

- Prioritize checkout, authentication, cart contents, and price calculations because failures there affect a purchase.
- Check both successful actions and invalid or incomplete input.
- Use observed site behavior for expected results; don’t assume coupon rules, validation messages, or checkout options.
- Calculate the cart line subtotal from the displayed unit price and quantity, rather than copying the displayed subtotal as the expected value.
- Keep tests independent and use a unique customer for registration and checkout.
- Use role and label locators where available. Avoid fixed waits when Playwright can wait for the expected state.

## Automation design

Playwright Test runs the JavaScript specs. Tests hold scenario flow and business assertions. Page objects hold page locators and UI actions. Fixtures provide the page objects and per-test customer data. The test data helper creates a unique email for each customer.

The checkout test registers a customer and places an order. Those records can remain on the shared demo site, so avoid rerunning it unnecessarily. The test uses the demo cash-on-delivery option and synthetic address details; it must not use real payment or personal information.

## Environment and execution

The default target is the public demo site. Other environment settings are under `config/environments/`. The checkout test changes application state and is intended for the demo environment, not production.

Run the cart and checkout specs in Chromium. On failure, use the Playwright HTML report, screenshot, and trace to investigate. Record whether a failure came from the test, the application, or the shared environment before calling it a defect.

## Risks and limits

| Risk | Effect | Response |
|---|---|---|
| Shared demo data changes | A product, price, or option may differ between runs | Check current site behavior and keep test data isolated where possible |
| Demo site is unavailable | Tests cannot run | Record the interruption and retry when the site is available |
| Checkout creates persistent records | Repeated runs add accounts and orders | Use synthetic data and avoid unnecessary retries |
| Features vary or are unavailable | Some cases may not be testable | Mark them conditional or blocked with the observed reason |

## Test documents

`test-scenarios.md` lists the scenarios and priority. `test-cases.md` contains the detailed steps and expected results. Update case status only after execution, and revise expectations when the site’s behavior has been confirmed.
