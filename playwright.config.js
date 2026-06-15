// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
  {
    name: 'chromium',
    testMatch: /.*(compatibility|portability)\.spec\.js/,
    grep: /FS_COMP_|FS_PORT_001|FS_PORT_004|FS_PORT_007|FS_PORT_008|FS_PORT_009|FS_PORT_010/,
    use: {
      ...devices['Desktop Chrome'],
    },
  },

  {
    name: 'firefox',
    testMatch: /.*(compatibility|portability)\.spec\.js/,
    grep: /FS_COMP_|FS_PORT_002/,
    use: {
      ...devices['Desktop Firefox'],
    },
  },

  {
    name: 'webkit',
    testMatch: /.*(compatibility|portability)\.spec\.js/,
    grep: /FS_COMP_|FS_PORT_003/,
    use: {
      ...devices['Desktop Safari'],
    },
  },

  {
    name: 'android',
    testMatch: /.*portability\.spec\.js/,
    grep: /FS_PORT_005/,
    use: {
      ...devices['Pixel 5'],
    },
  },

  {
    name: 'ios',
    testMatch: /.*portability\.spec\.js/,
    grep: /FS_PORT_006/,
    use: {
      ...devices['iPhone 12'],
    },
  },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

