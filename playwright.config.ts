import { defineConfig, devices } from '@playwright/test'

const isCI = !!process.env.CI

const webServer = process.env.PW_SKIP_WEB_SERVER
  ? undefined
  : {
      command:
        process.env.PLAYWRIGHT_WEB_SERVER ||
        (isCI ? 'npm run build && npm run start' : 'npm run dev'),
      port: Number(process.env.PLAYWRIGHT_PORT || 3000),
      reuseExistingServer: !isCI,
      timeout: 300_000,
    }

export default defineConfig({
  testDir: 'tests/e2e',
  testMatch: '**/*.spec.ts',
  // Ensure Playwright ignores Jest test suites and other test folders
  testIgnore: [
    '**/__tests__/**',
    'tests/unit/**',
    'tests/integration/**',
    'tests/contracts/**',
  ],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    headless: true,
    trace: 'on-first-retry',
  },
  webServer: webServer as any,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})

