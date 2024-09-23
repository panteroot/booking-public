// tests/playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  globalSetup: "./global-setup",
  timeout: 30000, // Global timeout for tests
  retries: 2, // Number of retries on failure
  use: {
    headless: true, // Run tests in headless mode
    baseURL: "http://localhost:5174/", // Base URL for your tests
    storageState: "./adminAuth.json",
  },
  projects: [
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    // {
    //   name: "Desktop Firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "Mobile Safari",
    //   use: { ...devices["iPhone 12"] },
    // },
  ],
});
