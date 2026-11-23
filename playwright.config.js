const { defineConfig, devices } = require('@playwright/test');
const path = require('node:path');

const environment = process.env.PLAYWRIGHT_ENV || 'demo';
const supportedEnvironments = ['local', 'development', 'staging', 'production', 'demo'];

if (!supportedEnvironments.includes(environment)) {
  throw new Error(
    `Unknown PLAYWRIGHT_ENV "${environment}". Choose local, development, staging, production, or demo.`,
  );
}

const environmentFile = path.join(__dirname, 'config', 'environments', `.env.${environment}`);
const localEnvironmentFile = path.join(
  __dirname,
  'config',
  'environments',
  `.env.${environment}.local`,
);
try {
  process.loadEnvFile(localEnvironmentFile);
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

try {
  process.loadEnvFile(environmentFile);
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
  throw new Error(`Missing environment config file: ${environmentFile}`);
}

const baseURL = process.env.BASE_URL;
if (!baseURL) {
  throw new Error(`Set BASE_URL in ${environmentFile}.`);
}

const parseBoolean = (value, fallback) => value === undefined ? fallback : value.toLowerCase() === 'true';

module.exports = defineConfig({
  testDir: './tests',
  timeout: Number(process.env.TEST_TIMEOUT || 30_000),
  expect: { timeout: Number(process.env.EXPECT_TIMEOUT || 5_000) },
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: Number(process.env.RETRIES ?? (process.env.CI ? 1 : 0)),
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    headless: parseBoolean(process.env.HEADLESS, true),
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    ...devices['Desktop Chrome'],
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
