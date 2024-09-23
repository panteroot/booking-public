import { test, expect } from "@playwright/test";
import path from "path";

test("should allow admin to add a property", async ({ page }) => {
  await page.goto("/v1/admin/properties/add");

  await page.locator('[name="name"]').fill("Test Property");
  await page.locator('select[name="propertyType"]').selectOption("Hotel");
  await page.locator('select[name="propertyStatus"]').selectOption("Active");
  await page.locator('[name="address"]').fill("Test address");

  // fillup the react-select
  // Click to open the react-select dropdown
  await page.click('[aria-label="Select a city"]');

  // Click the desired option from the dropdown
  await page.click(
    'div[id^="react-select"] div[role="option"]:has-text("Cebu City")'
  );

  await page.locator('[name="description"]').fill("Test description");
  await page.check('input[name="facilities.property"][value="Breakfast"]');
  await page.check('input[name="facilities.property"][value="View"]');
  await page.check('input[name="facilities.view"][value="Bay View"]');
  await page.check('input[name="facilities.meal"][value="Free Breakfast"]');

  // Click the div to switch to the rules tab
  await page.click("#tab1");
  await page.locator('[name="rules.checkin"]').fill("2pm");
  await page.locator('[name="rules.checkout"]').fill("12nn");
  await page.locator('[name="rules.damageDepositFee"]').fill("1000 pesos");
  await page.locator('[name="rules.pet"]').fill("Pets alowed");
  await page.locator('[name="rules.others"]').fill("None");

  // Click the div to switch to the others tab
  await page.click("#tab2");
  await page.locator('[name="totalPhysicalRooms"]').fill("10");
  await page.locator('[name="totalAvailableRooms"]').fill("10");
  await page.check(
    'input[name="featuredFacilities"][value="Spacious Parking"]'
  );
  await page.check('input[name="featuredFacilities"][value="Clean Rooms"]');

  const fileNames = [
    "image.jpg",
    "image2.jpg",
    "image3.jpg",
    "image4.jpg",
    "image5.jpg",
    "image6.jpg",
    "image7.jpg",
  ];
  const filePaths = fileNames.map((fileName) =>
    path.join(__dirname, "files", fileName)
  );

  // Set the files to the input element
  await page.setInputFiles('[name="imageFiles"]', filePaths);

  // search map location
  await page.locator('[name="map"]').fill("Fuente Osmeña");
  await page.getByRole("button", { name: "Search" }).click();

  // Select the first list item and click it
  const firstListItem = page.locator("#listMap > li:first-of-type");

  // Optional: Ensure the item is visible and interactable
  await expect(firstListItem).toBeVisible();
  await expect(firstListItem).toBeEnabled();

  // Click the first list item
  await firstListItem.click();

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Added property successfully!")).toBeVisible();
});

test.only("should allow admin to edit a property", async ({ page }) => {
  await page.goto("/v1/admin/properties");

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

  await page.locator('[name="name"]').fill("Test Property Edit");
  await page.locator('[name="description"]').fill("Test description edit");
  await page.check('input[name="facilities.property"][value="Breakfast"]');
  await page.check(
    'input[name="facilities.property"][value="Private Bathroom"]'
  );
  await page.check('input[name="facilities.property"][value="View"]');

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Updated property successfully!")).toBeVisible();
});
