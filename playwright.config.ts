import path from 'path';
import { defineConfig, devices } from '@playwright/test';

// Use process.env.PORT by default and fallback to port 3000
const PORT = process.env.PORT || 3000;

// Set webServer.url and use.baseURL with the location of the WebServer respecting the correct set port
const baseURL = `http://localhost:${PORT}`;

// Reference: https://playwright.dev/docs/test-configuration
export default defineConfig({
  // Timeout per test (dev page compilation can take more than default)
  timeout: 60 * 1000,
  expect: { timeout: 60000 },

  // Test directory
  testDir: path.join(__dirname, 'src/e2e'),

  // To not conflict with test|spec which bun and vitest default to running
  testMatch: '*.play.ts',

  // On CI, if a test fails, retry it additional 2 times
  // trying once locally to get around some strange just compiled issues
  retries: process.env.CI ? 2 : 1,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Artifacts folder where screenshots, videos, and traces are stored.
  outputDir: 'playwright/test-results/',

  // Reporter to use
  reporter: process.env.CI ? 'dot' : 'list',

  // Run your local dev server before starting the tests:
  // https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
  webServer: {
    command: 'bun run dev:only',
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    // Use baseURL so to make navigations relative.
    // More information: https://playwright.dev/docs/api/class-testoptions#test-options-base-url
    baseURL,

    // Retry a test if its failing with enabled tracing. This allows you to analyse the DOM, console logs, network traffic etc.
    // More information: https://playwright.dev/docs/trace-viewer
    trace: 'retry-with-trace',

    // All available context options: https://playwright.dev/docs/api/class-browser#browser-new-context
    // contextOptions: {
    //   ignoreHTTPSErrors: true,
    // },

    colorScheme: 'dark',
    locale: 'en-US',
    timezoneId: 'America/Los_Angeles',
  },

  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
        launchOptions: {
          // force GPU hardware acceleration (confirm by removing skip from gpu.play.ts)
          // https://dev.to/perrocontodo/run-playwright-tests-with-hardware-acceleration-on-a-gpu-enabled-ec2-instance-with-docker-support-4j2
          args: [
            '--enable-features=Vulkan,UseSkiaRenderer',
            '--use-vulkan=swiftshader',
            '--enable-unsafe-webgpu',
            '--disable-vulkan-fallback-to-gl-for-testing',
            '--dignore-gpu-blocklist',
            '--use-angle=vulkan',
          ],
        },
      },
      dependencies: ['setup'],
    },
    // {
    //   name: 'Desktop Firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     storageState: 'playwright/.auth/user.json',
    //   },
    //   dependencies: ['setup'],
    // },
    // {
    //   name: 'Desktop Safari',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     storageState: 'playwright/.auth/user.json',
    //   },
    //   dependencies: ['setup'],
    // },
    // // Test against mobile viewports.
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //     storageState: 'playwright/.auth/user.json',
    //   },
    //   dependencies: ['setup'],
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //     storageState: 'playwright/.auth/user.json',
    //   },
    //   dependencies: ['setup'],
    // },
  ],
});
