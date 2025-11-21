import { defineConfig, devices } from '@playwright/test';

const WEB_PORT = Number(process.env.UI_PORT ?? 4173);

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: `http://127.0.0.1:${WEB_PORT}`,
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 5'] }
    }
  ],
  webServer: {
    command: 'npm run start:ci',
    port: WEB_PORT,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000
  }
});
