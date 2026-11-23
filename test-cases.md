# Detailed Test Cases — Tricentis Demo Web Shop
**Project:** Senior QA Engineer Assessment — Sparkrock  
**Application:** https://demowebshop.tricentis.com/  
**Automation:** Playwright Test + JavaScript  
**Status:** Proposed inventory; two scenarios have been automated and run.

## Test case conventions

- **Priority:** P0 = critical business failure; P1 = high; P2 = moderate; P3 = low.
- **Status:** Not Run unless noted in the case.
- **Automation:** Yes means suitable for UI automation, subject to environment stability.
- **Expected results:** Written as observable outcomes. Exact UI text should be captured during application exploration rather than guessed.

---

## A. Registration and authentication

### TC-AUTH-001 — Register a new customer with valid details

| Attribute | Value |
|---|---|
| Scenario ID | TS-AUTH-001 |
| Module | Registration |
| Priority / Type | P1 / Positive |
| Automation | Yes |
| Status | Not Run |

**Preconditions**
- Registration page is accessible.
- A unique email address is generated for this execution.

**Test data**
- First name and last name: synthetic values.
- Email: unique test email.
- Password and confirmation: valid matching values according to the form's observed rules.

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Open the registration page. | Registration form is displayed. |
| 2 | Enter valid synthetic customer details in the required fields. | Values are accepted by the form. |
| 3 | Submit the registration form. | Registration completes successfully and the application displays its success state or authenticated state. |
The account remains on the demo site. Use a unique email address for each run.

### TC-AUTH-002 — Submit registration with mandatory fields missing

| Attribute | Value |
|---|---|
| Scenario ID | TS-AUTH-002 |
| Module | Registration |
| Priority / Type | P1 / Negative |
| Automation | Yes |
| Status | Not Run |

**Preconditions**
- Registration page is accessible.

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Open the registration page. | Registration form is displayed. |
| 2 | Leave one or more observed mandatory fields empty. | Fields remain empty. |
| 3 | Submit the form. | Registration is rejected; the application identifies required information and does not create an account. |

Confirm the required fields and validation behavior before finalizing assertions.

### TC-AUTH-003 — Submit registration with an invalid email format

| Attribute | Value |
|---|---|
| Scenario ID | TS-AUTH-003 |
| Module | Registration |
| Priority / Type | P2 / Negative |
| Automation | Yes |
| Status | Not Run |

**Preconditions**
- Registration page is accessible.

**Test data**
- Use a clearly malformed email value, such as `invalid-email`.

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Open the registration page. | Registration form is displayed. |
| 2 | Populate the other required fields with valid synthetic values and enter the malformed email. | Form contains the supplied values. |
| 3 | Submit the form. | Registration is rejected and the email validation behavior is shown; no account is created. |

### TC-AUTH-004 — Attempt registration with an already registered email

| Attribute | Value |
|---|---|
| Scenario ID | TS-AUTH-004 |
| Module | Registration |
| Priority / Type | P1 / Negative |
| Automation | Yes |
| Status | Not Run |

**Preconditions**
- A test account already exists and its email is known.

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Open the registration page. | Registration form is displayed. |
| 2 | Enter the existing account email with otherwise valid synthetic details. | Form contains the duplicate email. |
| 3 | Submit the form. | A second account is not created; the application communicates the duplicate-account outcome. |

### TC-AUTH-005 — Log in with valid customer credentials and log out

| Attribute | Value |
|---|---|
| Scenario ID | TS-AUTH-005 |
| Module | Authentication |
| Priority / Type | P1 / Positive |
| Automation | Yes |
| Status | Not Run |

**Preconditions**
- A valid test customer account exists.
- Credentials are provided through environment variables or another secure local mechanism, not committed to Git.

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Open the login page. | Login form is displayed. |
| 2 | Enter valid test credentials and submit. | Customer is authenticated; the account/navigation state reflects login. |
| 3 | Log out using the application control. | Customer is logged out; authenticated navigation is no longer shown. |

### TC-AUTH-006 — Attempt login with invalid credentials

| Attribute | Value |
|---|---|
| Scenario ID | TS-AUTH-006 |
| Module | Authentication |
| Priority / Type | P1 / Negative |
| Automation | Yes |
| Status | Not Run |

**Preconditions**
- Login page is accessible.

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Open the login page. | Login form is displayed. |
| 2 | Enter an invalid email/password combination. | Invalid credentials are entered. |
| 3 | Submit the form. | Authentication is rejected; an appropriate error is displayed and the user remains unauthenticated. |

---

## B. Product discovery

### TC-PROD-001 — Search for an existing product

| Attribute | Value |
|---|---|
| Scenario ID | TS-PROD-001 |
| Module | Product search |
| Priority / Type | P1 / Positive |
| Automation | Yes |
| Status | Not Run |

**Preconditions**
- Identify a product that is currently searchable in the demo.

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Enter the known product keyword in the search field. | Search field accepts the keyword. |
| 2 | Submit the search. | Results page is displayed. |
| 3 | Inspect the results. | The expected product appears and its displayed name is relevant to the query. |

### TC-PROD-002 — Search for a product that does not exist

| Attribute | Value |
|---|---|
| Scenario ID | TS-PROD-002 |
| Module | Product search |
| Priority / Type | P2 / Negative |
| Automation | Yes |
| Status | Not Run |

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Enter a distinctive search term that does not match a catalog product. | Search field accepts the term. |
| 2 | Submit the search. | Search completes. |
| 3 | Inspect the results state. | No unrelated product is presented as an exact match; the application communicates the empty-results state. |

### TC-PROD-003 — Search using a partial product keyword

| Attribute | Value |
|---|---|
| Scenario ID | TS-PROD-003 |
| Module | Product search |
| Priority / Type | P2 / Positive |
| Automation | Yes |
| Status | Not Run |

**Preconditions**
- Identify a product whose name contains a distinctive partial keyword.

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Enter the selected partial keyword. | Search field accepts the term. |
| 2 | Submit the search. | Search results are displayed. |
| 3 | Inspect relevant results. | Matching product(s) are returned according to the application's observed search behavior. |

### TC-PROD-004 — Navigate to a product category and open a product

| Attribute | Value |
|---|---|
| Scenario ID | TS-PROD-004 |
| Module | Product listing |
| Priority / Type | P2 / Functional |
| Automation | Yes |
| Status | Not Run |

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Select an available product category from navigation. | The selected category/listing page opens. |
| 2 | Select a product from the listing. | The corresponding product details page opens. |
| 3 | Verify the product heading. | The product details correspond to the selected listing item. |

### TC-PROD-005 — Change product sorting and verify displayed order

| Attribute | Value |
|---|---|
| Scenario ID | TS-PROD-005 |
| Module | Product listing |
| Priority / Type | P2 / Functional |
| Automation | Conditional — if sorting control is available |
| Status | Not Run |

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Open a category with multiple products. | Product listing is displayed. |
| 2 | Select an available sort option, such as price ascending, if offered. | Listing refreshes or reorders. |
| 3 | Compare the displayed product values/order. | Products follow the selected sort direction. |

Use a sort option shown by the application and check enough items to verify the order.

### TC-PROD-006 — Verify product name, price and available configuration

| Attribute | Value |
|---|---|
| Scenario ID | TS-PROD-006 |
| Module | Product details |
| Priority / Type | P2 / Data validation |
| Automation | Yes |
| Status | Not Run |

**Preconditions**
- Select a stable product with a known listing entry.

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Open the product from a category or search result. | Product details page is displayed. |
| 2 | Inspect product name and price. | Name and price are visible and correspond to the selected product. |
| 3 | Inspect available options/configuration controls. | Available options are displayed and can be interacted with as supported. |

---

## C. Wishlist and comparison

### TC-WISH-001 — Add a product to the wishlist and verify its presence

| Attribute | Value |
|---|---|
| Scenario ID | TS-WISH-001 |
| Module | Wishlist |
| Priority / Type | P2 / Positive |
| Automation | Yes |
| Status | Not Run |

**Preconditions**
- Confirm whether wishlist use requires authentication.

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Open a product details page. | Product details are displayed. |
| 2 | Use the wishlist action. | Application responds to the action; authentication is completed first if required. |
| 3 | Open the wishlist. | Selected product appears in the wishlist. |

### TC-WISH-002 — Remove a product from the wishlist

| Attribute | Value |
|---|---|
| Scenario ID | TS-WISH-002 |
| Module | Wishlist |
| Priority / Type | P2 / Functional |
| Automation | Yes |
| Status | Not Run |

**Preconditions**
- Wishlist contains a known test product.

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Open the wishlist. | The selected test product is present. |
| 2 | Select the remove action for that product. | Product is removed. |
| 3 | Verify wishlist contents. | Removed product is no longer listed. |

### TC-COMP-001 — Add products to comparison and verify comparison contents

| Attribute | Value |
|---|---|
| Scenario ID | TS-COMP-001 |
| Module | Product comparison |
| Priority / Type | P3 / Functional |
| Automation | Conditional — if comparison is available |
| Status | Not Run |

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Select the comparison action for two available products. | Both selections are accepted by the application. |
| 2 | Open the comparison view. | Comparison view is displayed. |
| 3 | Verify the selected products. | Both selected products appear in the comparison view. |

---

## D. Shopping cart

### TC-CART-001 — Add a product and verify cart line details

| Attribute | Value |
|---|---|
| Scenario ID | TS-CART-001 |
| Module | Shopping cart |
| Priority / Type | P1 / Positive |
| Automation | Yes |
| Status | Not Run |

**Preconditions**
- Identify a product that can be added without requiring unhandled configuration.

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Open the selected product details page. | Correct product page is displayed. |
| 2 | Add the product to the cart. | Application acknowledges the add-to-cart action. |
| 3 | Open the cart. | Cart contains the selected product. |
| 4 | Verify product name, unit price and quantity. | Values correspond to the selected product and requested quantity. |

### TC-CART-002 — Add the same product again and verify resulting cart behavior

| Attribute | Value |
|---|---|
| Scenario ID | TS-CART-002 |
| Module | Shopping cart |
| Priority / Type | P1 / Functional |
| Automation | Yes |
| Status | Not Run |

**Preconditions**
- Cart initially contains the selected product once, or is empty before the first add.

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Add the selected product to the cart. | Product is added. |
| 2 | Add the same product again using the same product configuration. | Application processes the second add action. |
| 3 | Open the cart and inspect the line items and quantities. | Cart reflects the application's defined behavior for repeated additions; no product addition is silently lost. |

Check whether the second add increments quantity or creates another line, then assert the observed behavior.

### TC-CART-003 — Update product quantity and verify the updated line

| Attribute | Value |
|---|---|
| Scenario ID | TS-CART-003 |
| Module | Shopping cart |
| Priority / Type | P1 / Functional |
| Automation | Yes |
| Status | Not Run |

**Preconditions**
- Cart contains one known product.

**Test data**
- Requested quantity: `2`, provided the application accepts it.

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Open the shopping cart. | Existing product line is displayed. |
| 2 | Change the product quantity to 2. | Quantity control accepts the value. |
| 3 | Trigger the cart update action if required. | Cart reflects the updated quantity. |
| 4 | Verify the line item. | Displayed quantity is 2 and line total is consistent with unit price × quantity, subject to displayed rounding/tax rules. |

### TC-CART-004 — Remove a product and verify the resulting cart state

| Attribute | Value |
|---|---|
| Scenario ID | TS-CART-004 |
| Module | Shopping cart |
| Priority / Type | P1 / Functional |
| Automation | Yes |
| Status | Not Run |

**Preconditions**
- Cart contains a known product.

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Open the shopping cart. | Selected product is present. |
| 2 | Select the remove control for that product. | Removal is processed. |
| 3 | Apply/update cart if the interface requires it. | Cart is refreshed. |
| 4 | Verify cart state. | Removed product is absent and totals reflect the remaining cart contents. |

### TC-CART-005 — Independently calculate and verify cart subtotal

**Live coding selection 1**

| Attribute | Value |
|---|---|
| Scenario ID | TS-CART-005 |
| Module | Shopping cart |
| Priority / Type | P1 / Data integrity |
| Automation | Yes — primary demonstration |
| Status | Passed on 2026-11-22 (Chromium; before the latest page-object and config changes) |

**Objective**

Verify that the cart's displayed subtotal is consistent with the product unit price and quantity, rather than merely asserting that a subtotal is present.

**Preconditions**
- A stable product is available.
- Cart is empty or its initial contents are known.
- Product does not require an unhandled configuration.
- The displayed subtotal's inclusion/exclusion of tax, shipping and discounts has been established.

**Test data**
- Product: selected stable catalog item.
- Quantity: `2`, if accepted.
- Expected line subtotal: displayed unit price × quantity, using the application's currency precision and rounding behavior.

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Open the selected product and capture its displayed unit price. | Product and unit price are identified. |
| 2 | Add the product to the cart. | Product is added successfully. |
| 3 | Open the cart and verify the product line. | Correct product and unit price are displayed. |
| 4 | Set quantity to 2 and update the cart if required. | Cart reflects quantity 2. |
| 5 | Calculate expected line subtotal independently from captured unit price and quantity. | Test computes the expected amount without reading the displayed subtotal as its expected value. |
| 6 | Compare expected amount with the displayed line subtotal/subtotal, after confirming the relevant cart calculation rules. | Displayed amount matches the independently calculated expected amount within the application's currency precision. |
| 7 | Remove the test product and update the cart if required. | Product is removed and cart state is verified. |

**Important assertion design**
- Keep unit price, quantity and displayed subtotal as separate values.
- Parse currency carefully; do not use floating-point equality without an appropriate currency/decimal strategy.
- If the cart subtotal includes or excludes tax, discounts or other charges, account for that observed rule explicitly.
- Do not hardcode a product price if the catalog price can change.

### TC-CART-006 — Verify cart state after navigating away and returning

| Attribute | Value |
|---|---|
| Scenario ID | TS-CART-006 |
| Module | Shopping cart |
| Priority / Type | P2 / Persistence |
| Automation | Yes |
| Status | Not Run |

**Preconditions**
- Add a known product to the cart.

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Add a product to the cart. | Product is added. |
| 2 | Navigate to another page within the site. | Navigation succeeds. |
| 3 | Return to the cart. | Cart contents remain consistent with the application's observed persistence behavior. |

Specify whether this test checks navigation, refresh, or a new browser session; each checks a different kind of persistence.

---

## E. Discounts

### TC-DISC-001 — Apply a valid coupon code, if a valid code is supplied

| Attribute | Value |
|---|---|
| Scenario ID | TS-DISC-001 |
| Module | Discounts |
| Priority / Type | P2 / Positive |
| Automation | Conditional |
| Status | Not Run |

**Preconditions**
- Coupon input is available in the cart/checkout.
- A valid, authorized test coupon and its eligibility conditions are known.

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Add eligible product(s) to the cart. | Cart contains eligible item(s). |
| 2 | Enter the verified coupon code. | Coupon value is entered. |
| 3 | Apply the coupon. | Application accepts the code if eligibility conditions are met. |
| 4 | Verify discount and total. | Displayed discount and resulting total follow the confirmed coupon rules. |

**Do not invent a valid coupon code or expected discount percentage.**

### TC-DISC-002 — Apply an invalid coupon code and verify feedback

| Attribute | Value |
|---|---|
| Scenario ID | TS-DISC-002 |
| Module | Discounts |
| Priority / Type | P2 / Negative |
| Automation | Conditional — if coupon UI is available |
| Status | Not Run |

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Open the cart and locate the coupon control. | Coupon control is available. |
| 2 | Enter a deliberately invalid code. | Code is entered. |
| 3 | Apply the code. | Application rejects the code and displays feedback. |
| 4 | Verify totals. | No invalid discount is applied and cart totals remain correct. |

---

## F. Registered customer checkout and order confirmation

### TC-CHK-001 — Complete checkout with a newly registered customer

**Live coding selection 2**

| Attribute | Value |
|---|---|
| Scenario ID | TS-CHK-001 |
| Module | Checkout |
| Priority / Type | P0 / End-to-End |
| Automation | Yes — primary demonstration |
| Status | Passed on 2026-11-22 (Chromium; before the latest page-object and config changes) |

**Objective**

Validate that an authenticated customer can complete the available checkout workflow and reach an order confirmation with consistent order information.

**Preconditions**
- The registration form is available.
- A suitable product is available.
- The checkout path uses simulated/demo payment behavior and does not require real payment details.
- The test is run only when it is safe to create a demo order.

**Test data**
- A synthetic customer with a unique email address, generated for this run.
- Synthetic billing/shipping information as required.
- One stable product and a known quantity.
- Only payment options explicitly available in the demo.

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Register the synthetic customer and log in with the new credentials. | Customer is authenticated. |
| 2 | Add the selected product to the cart and open the cart. | Cart contains the selected product. |
| 3 | Proceed to checkout and complete the required billing and shipping steps. | Checkout advances through the available steps. |
| 4 | Select the demo payment option and review the order. | Product is listed in the order review. |
| 5 | Confirm the order. | The application displays a success message and order number. |

The test creates a persistent demo account and order. Use synthetic data, and check the site after an interrupted run before trying checkout again.

### TC-CHK-002 — Attempt to continue checkout with required information missing

| Attribute | Value |
|---|---|
| Scenario ID | TS-CHK-002 |
| Module | Checkout |
| Priority / Type | P1 / Negative |
| Automation | Yes |
| Status | Not Run |

**Preconditions**
- Checkout can be opened with a test cart.
- Customer is in the appropriate checkout state.

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Navigate to a checkout step that contains required fields. | Relevant form is displayed. |
| 2 | Leave one or more observed mandatory fields empty. | Required values remain absent. |
| 3 | Attempt to continue. | Application prevents progression and communicates the missing/invalid information. |
| 4 | Verify workflow state. | Order is not submitted and the customer remains at the relevant step. |

---

## G. Order management

### TC-ORD-001 — Verify order confirmation after checkout

| Attribute | Value |
|---|---|
| Scenario ID | TS-ORD-001 |
| Module | Order management |
| Priority / Type | P1 / Data integrity |
| Automation | Yes |
| Status | Verified as part of TC-CHK-001 on 2026-11-22 (Chromium; before the latest page-object and config changes) |

**Preconditions**
- A demo order has been submitted by `TC-CHK-001`.

**Steps and expected results**

| Step | Action | Expected result |
|---:|---|---|
| 1 | Check the order confirmation page. | A success message and order number are displayed. |

The current automated test checks the success message and order number. It does not check order history or compare the full order summary.

---

## Live coding implementation scope

The two automated tests are:

1. **Cart business validation:** `TC-CART-005`, supported by add/update/remove behavior from `TC-CART-001`, `TC-CART-003` and `TC-CART-004`.
2. **Registered customer checkout:** `TC-CHK-001`, with order confirmation verification from `TC-ORD-001`.

Both tests run independently. Checkout creates its own synthetic customer and order.
