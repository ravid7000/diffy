import { expect, test } from "@playwright/test";
import { DESTINATION_TEXT, SOURCE_TEXT } from "./constants";
import { fillAndCompare, finalBuffer, keepButtons } from "./helpers";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await fillAndCompare(page, SOURCE_TEXT, DESTINATION_TEXT);
});

test("starts the final buffer from source", async ({ page }) => {
  await expect.poll(() => finalBuffer(page)).toBe(SOURCE_TEXT);
});

test("keeps destination per change and toggles back to a conflict", async ({ page }) => {
  await keepButtons(page, "destination").first().click();
  await expect.poll(() => finalBuffer(page)).toContain("const b = 1;");
  await keepButtons(page, "destination").first().click();
  await expect.poll(() => finalBuffer(page)).toContain("<<<<<<< source");
  await expect(page.getByText("Resolved 1/2")).toBeVisible();
});

test("applies the destination strategy to every change", async ({ page }) => {
  await page.getByRole("combobox", { name: "Merge strategy" }).click();
  await page.getByRole("option", { name: "Start from destination" }).click();
  await expect.poll(() => finalBuffer(page)).toBe(DESTINATION_TEXT);
});

test("locks change buttons after a manual edit until reset", async ({ page }) => {
  await page.locator(".monaco-editor .view-lines").click();
  await page.keyboard.press("ControlOrMeta+End");
  await page.keyboard.type("!");
  await expect(page.getByText("Edited")).toBeVisible();
  await expect(keepButtons(page, "source").first()).toBeDisabled();
  await page.getByRole("button", { name: "Reset edits" }).click();
  await expect(keepButtons(page, "source").first()).toBeEnabled();
  await expect.poll(() => finalBuffer(page)).toBe(SOURCE_TEXT);
});
