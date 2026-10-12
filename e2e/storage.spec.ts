import { expect, test } from "@playwright/test";
import { DESTINATION_TEXT, SOURCE_TEXT } from "./constants";
import { destinationInput, fillAndCompare, sourceInput } from "./helpers";

test.beforeEach(async ({ page }) => page.goto("/"));

test("restores compared files after reload", async ({ page }) => {
  await fillAndCompare(page, SOURCE_TEXT, DESTINATION_TEXT);
  await page.reload();
  await expect(sourceInput(page)).toHaveValue(SOURCE_TEXT);
  await expect(destinationInput(page)).toHaveValue(DESTINATION_TEXT);
});

test("clears the cache from the actions menu", async ({ page }) => {
  await fillAndCompare(page, SOURCE_TEXT, DESTINATION_TEXT);
  await page.getByRole("button", { name: "More actions" }).click();
  await page.getByRole("menuitem", { name: "Clear cache" }).click();
  await expect(page.getByText("Cache cleared")).toBeVisible();
  await expect(sourceInput(page)).toHaveValue("");
  await page.reload();
  await expect(destinationInput(page)).toHaveValue("");
});

test("persists the dark theme", async ({ page }) => {
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
});
