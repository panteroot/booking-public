import {
  Browser,
  BrowserContext,
  chromium,
  expect,
  Page,
} from "@playwright/test";

const URL = "http://localhost:5174/admin/login";

async function globalSetup() {
  const browser: Browser = await chromium.launch({ headless: false });
  const context: BrowserContext = await browser.newContext();
  const page: Page = await context.newPage();

  await page.goto(URL);

  await expect(
    page.getByRole("button", { name: "Login as Admin" })
  ).toBeVisible();

  await page.locator("[name=username]").fill("admin");
  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Login as Admin" }).click();

  await expect(page.getByText("Login Successful!")).toBeVisible();

  //   save state
  await page.context().storageState({ path: "./adminAuth.json" });

  await browser.close();
}

export default globalSetup;
