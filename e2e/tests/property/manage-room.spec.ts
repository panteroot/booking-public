import { test, expect } from "@playwright/test";
import path from "path";

test("should allow admin to add a room", async ({ page }) => {
  await page.goto("/v1/admin/rooms/add");

  await page.locator('[name="name"]').fill("Test Room");

  // fillup the react-select
  // Click to open the react-select dropdown
  await page.click('[aria-label="Select a property"]');

  // Select the first option
  await page.click('div[id^="react-select"] div[role="option"]:nth-of-type(1)');

  await page.locator('select[name="type"]').selectOption("Presidential Suite");
  await page.locator('[name="pricePerNight"]').fill("1000");
  await page.locator('[name="roomSize"]').fill("50");
  await page.locator('[name="noPhysicalRooms"]').fill("10");
  await page.locator('[name="noAvailableRooms"]').fill("10");
  await page.locator('[name="description"]').fill("Test description");

  await page.check('input[name="facilities.room"][value="Desk"]');
  await page.check('input[name="facilities.room"][value="Safe"]');
  await page.check(
    'input[name="facilities.bathroom"][value="Free toiletries"]'
  );
  await page.check('input[name="facilities.bathroom"][value="Mirror"]');

  // Click the div to switch to the others tab
  await page.click("#tab1");
  await page.locator('select[name="facilities.view"]').selectOption("Bay View");
  await page
    .locator('select[name="facilities.meal"]')
    .selectOption("Free Breakfast");
  await page.check('input[name="facilities.bed"][value="1 twin bed"]');
  await page.check('input[name="facilities.bed"][value="2 twin beds"]');

  await page.locator('[name="adultCount"]').fill("4");
  await page.locator('[name="childCount"]').fill("2");

  const fileNames = ["image.jpg", "image2.jpg", "image3.jpg", "image4.jpg"];
  const filePaths = fileNames.map((fileName) =>
    path.join(__dirname, "files", fileName)
  );

  // Set the files to the input element
  await page.setInputFiles('[name="imageFiles"]', filePaths);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Added room successfully!")).toBeVisible();
});

test.only("should allow admin to edit a room", async ({ page }) => {
  await page.goto("/v1/admin/rooms");

  // Select the last page number
  const lastPageNo = page.locator("#pagination > li:last-of-type");

  // Optional: Ensure the item is visible and interactable
  await expect(lastPageNo).toBeVisible();
  await expect(lastPageNo).toBeEnabled();

  // Click the first last page no
  await lastPageNo.click();

  // Fetch all buttons with the text 'Edit'
  const buttons = page.locator('button:has-text("Edit")');
  const firstButton = buttons.nth(0);
  await firstButton.click();

  await page.locator('[name="description"]').fill("Test description edit");
  await page.check(
    'input[name="facilities.room"][value="Upper floors accessible by elevator"]'
  );
  await page.check('input[name="facilities.room"][value="Flat-screen TV"]');
  await page.check('input[name="facilities.bathroom"][value="Hairdryer"]');
  await page.check('input[name="facilities.bathroom"][value="Toilet paper"]');

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Updated room successfully!")).toBeVisible();
});
