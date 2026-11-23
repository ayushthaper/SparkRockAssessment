# Test Scenarios — Tricentis Demo Web Shop

**Project:** Senior QA Engineer Assessment — Sparkrock  
**Application:** https://demowebshop.tricentis.com/  
**Automation stack:** Playwright Test + JavaScript  
The list below is a proposed inventory. Only `TC-CART-005` and `TC-CHK-001` are automated; the other scenarios still need to be checked against the site. The automation column indicates suitability, not whether a test is implemented.

## Priority definitions

| Priority | Meaning |
|---|---|
| P0 | Critical business failure |
| P1 | High business impact |
| P2 | Moderate business impact |
| P3 | Low business impact |

These are assessment priorities, not application-defined severity classifications.

## Test inventory

Confirm expected behavior against the current application. If a feature or workflow is unavailable, record that with the observed reason.

| Test Case ID | Scenario ID | Module | Scenario | Type | Priority | Automation suitability |
|---|---|---|---|---|---|---|
| TC-AUTH-001 | TS-AUTH-001 | Registration | Register a new customer with valid details | Positive | P1 | Yes |
| TC-AUTH-002 | TS-AUTH-002 | Registration | Submit registration with mandatory fields missing | Negative | P1 | Yes |
| TC-AUTH-003 | TS-AUTH-003 | Registration | Submit registration with an invalid email format | Negative | P2 | Yes |
| TC-AUTH-004 | TS-AUTH-004 | Registration | Attempt registration using an already registered email | Negative | P1 | Yes |
| TC-AUTH-005 | TS-AUTH-005 | Authentication | Log in with valid customer credentials and log out | Positive | P1 | Yes |
| TC-AUTH-006 | TS-AUTH-006 | Authentication | Attempt login with invalid credentials | Negative | P1 | Yes |
| TC-PROD-001 | TS-PROD-001 | Product search | Search for an existing product | Positive | P1 | Yes |
| TC-PROD-002 | TS-PROD-002 | Product search | Search for a product that does not exist | Negative | P2 | Yes |
| TC-PROD-003 | TS-PROD-003 | Product search | Search using a partial product keyword | Positive | P2 | Yes |
| TC-PROD-004 | TS-PROD-004 | Product listing | Navigate to a product category and open a product | Functional | P2 | Yes |
| TC-PROD-005 | TS-PROD-005 | Product listing | Change product sorting and verify the displayed order | Functional | P2 | Yes, if available |
| TC-PROD-006 | TS-PROD-006 | Product details | Verify product name, price and available configuration | Data validation | P2 | Yes |
| TC-WISH-001 | TS-WISH-001 | Wishlist | Add a product to the wishlist and verify its presence | Positive | P2 | Yes |
| TC-WISH-002 | TS-WISH-002 | Wishlist | Remove a product from the wishlist | Functional | P2 | Yes |
| TC-COMP-001 | TS-COMP-001 | Product comparison | Add products to comparison and verify comparison contents | Functional | P3 | Yes, if available |
| TC-CART-001 | TS-CART-001 | Shopping cart | Add a product and verify cart line details | Positive | P1 | Yes |
| TC-CART-002 | TS-CART-002 | Shopping cart | Add the same product again and verify resulting cart behavior | Functional | P1 | Yes |
| TC-CART-003 | TS-CART-003 | Shopping cart | Update product quantity and verify the updated line | Functional | P1 | Yes |
| TC-CART-004 | TS-CART-004 | Shopping cart | Remove a product and verify the resulting cart state | Functional | P1 | Yes |
| TC-CART-005 | TS-CART-005 | Shopping cart | Independently calculate and verify cart subtotal | Data integrity | P1 | Yes — live coding |
| TC-CART-006 | TS-CART-006 | Shopping cart | Verify cart state after navigating away and returning | Persistence | P2 | Yes |
| TC-DISC-001 | TS-DISC-001 | Discounts | Apply a valid coupon code, if a valid code is supplied | Positive | P2 | Conditional |
| TC-DISC-002 | TS-DISC-002 | Discounts | Apply an invalid coupon code and verify feedback | Negative | P2 | Yes, if coupon UI is available |
| TC-CHK-001 | TS-CHK-001 | Checkout | Complete checkout as a registered customer | End-to-end | P0 | Yes — live coding |
| TC-CHK-002 | TS-CHK-002 | Checkout | Attempt to continue checkout with required information missing | Negative | P1 | Yes |
| TC-ORD-001 | TS-ORD-001 | Order management | Verify order confirmation after checkout | Data integrity | P1 | Yes — covered by TC-CHK-001 |

## Live coding selections

### Live coding test 1 — Cart business validation

**Primary test case:** `TC-CART-005`  
**Supporting behaviors:** `TC-CART-001`, `TC-CART-003`, `TC-CART-004`

The test adds a product, changes its quantity, calculates the expected line subtotal from the unit price, compares it with the cart, then removes the product.

### Live coding test 2 — Registered customer checkout

**Primary test case:** `TC-CHK-001`  
**Supporting verification:** `TC-ORD-001`

The test registers a synthetic customer, adds a product, completes the available checkout steps and checks the order confirmation. It uses the demo cash-on-delivery option and does not use real payment details.

## Scope notes and assumptions

- The target is a shared public demo. Other users may change application data.
- Registration and checkout tests should use unique email addresses.
- Do not commit credentials, real personal data, or payment information to Git.
- The exact validation text, available fields, coupon rules, shipping options and payment choices must be observed before assertions are finalized.
- Coupon and comparison tests are conditional on those controls being available in the current demo.
- If checkout requires an unavailable external service or real payment details, stop before submission, document the blocker and revise the demonstration plan.

## Traceability

Each detailed test case in `test-cases.md` maps to one scenario ID. Automation specs should include the stable test case ID in the test title or annotation.

