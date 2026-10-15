# DemoBlaze Automation

End-to-end test suite for [DemoBlaze](https://www.demoblaze.com/) using WebdriverIO, Mocha, and the Page Object Model.

## Tech stack

- **WebdriverIO** (v10) — browser automation
- **Mocha** — test framework (BDD)
- **Chrome** — browser under test
- **wdio-html-nice-reporter** — HTML test reports
- **Page Object Model** — page objects under `test/pageobjects/`

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- Google Chrome installed

## Setup

```bash
npm install
```

## Running tests

```bash
npm run wdio
```

This runs all specs matching `./test/specs/**/*.js` against Chrome.

## Project structure

```
demoblaze-automation/
├── wdio.conf.js              # WebdriverIO configuration
├── test/
│   ├── specs/                # Test specs
│   │   ├── login.e2e.js      # Login with valid credentials
│   │   └── cart.e2e.js       # Add product to cart
│   ├── pageobjects/          # Page Object Model
│   │   ├── page.js           # Base page (opens DemoBlaze)
│   │   ├── login.page.js
│   │   ├── products.page.js
│   │   └── cart.page.js
│   └── constants/
│       ├── testData.js       # Credentials and checkout data
│       └── messages.js       # Expected UI messages
├── reports/html-reports/     # HTML reports (generated)
└── error-screenshots/        # Failure screenshots (generated)
```

## Test coverage

| Spec | Description |
|------|-------------|
| `login.e2e.js` | Opens DemoBlaze, logs in with valid credentials, and asserts the welcome message |
| `cart.e2e.js` | Logs in, opens a product, adds it to the cart, verifies the alert, and checks the cart contains the product |

Test credentials and shared data live in `test/constants/testData.js`.

## Reports and screenshots

After a run:

- **HTML report:** `reports/html-reports/master-report.html`
- **Failure screenshots:** `error-screenshots/FAIL_<test_title>.png` (saved automatically when a test fails)

## Configuration notes

- Base URL: `https://www.demoblaze.com/index.html`
- Framework: Mocha (`timeout: 60000`)
- Native alerts are left open (`unhandledPromptBehavior: 'ignore'`); cart flows capture alert text via a page stub so “Product added.” can be asserted reliably
