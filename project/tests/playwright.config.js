// Playwright Test configuration
const { devices } = require('@playwright/test');
module.exports = {
  testDir: './',
  timeout: 30 * 1000,
  retries: 0,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 5 * 1000,
    ignoreHTTPSErrors: true,
  },
};
