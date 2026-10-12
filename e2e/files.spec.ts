import { expect, test } from "@playwright/test";
import { DESTINATION_TEXT, SOURCE_TEXT } from "./constants";
import { destinationInput, fillAndCompare, sourceInput } from "./helpers";

test.beforeEach(async ({ page }) => page.goto("/"));

test("uploads a file into the source", async ({ page }) => {
  await page
    .getByLabel("Upload Source file")
    .setInputFiles({ name: "a.txt", mimeType: "text/plain", buffer: Buffer.from(SOURCE_TEXT) });
  await expect(sourceInput(page)).toHaveValue(SOURCE_TEXT);
});

test("drops a file into the destination", async ({ page }) => {
  const dataTransfer = await page.evaluateHandle((text) => {
    const transfer = new DataTransfer();
    transfer.items.add(new File([text], "b.txt", { type: "text/plain" }));
    return transfer;
  }, DESTINATION_TEXT);
  await destinationInput(page).dispatchEvent("drop", { dataTransfer });
  await expect(destinationInput(page)).toHaveValue(DESTINATION_TEXT);
});

test("downloads the final buffer with a timestamped name", async ({ page }) => {
  await fillAndCompare(page, SOURCE_TEXT, DESTINATION_TEXT);
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "Download final buffer" }).click(),
  ]);
  expect(download.suggestedFilename()).toMatch(/^merged-\d{8}-\d{6}\.txt$/);
});

test("copies the final buffer to the clipboard", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await fillAndCompare(page, SOURCE_TEXT, DESTINATION_TEXT);
  await page.getByRole("button", { name: "Copy final buffer" }).click();
  await expect(page.getByText("Copied final buffer")).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(SOURCE_TEXT);
});
