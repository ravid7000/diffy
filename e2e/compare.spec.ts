import { expect, test } from "@playwright/test";
import { DESTINATION_TEXT, LONG_LINE_COUNT, SOURCE_TEXT } from "./constants";
import { diffRegion, fillAndCompare } from "./helpers";

test.beforeEach(async ({ page }) => page.goto("/"));

test("disables compare until a file has content", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Compare" })).toBeDisabled();
});

test("shows both files side by side with change counts", async ({ page }) => {
  await fillAndCompare(page, SOURCE_TEXT, DESTINATION_TEXT);
  await expect(page.getByText("2 changes")).toBeVisible();
  await expect(page.getByText("Modified 2")).toBeVisible();
  await expect(page.getByText("Resolved 2/2")).toBeVisible();
  await expect(diffRegion(page).getByText("removed line")).toBeVisible();
  await expect(diffRegion(page).getByText("extra line")).toBeVisible();
});

test("scrolls both sides together", async ({ page }) => {
  const lines = Array.from({ length: LONG_LINE_COUNT }, (_, index) => `line ${index}`);
  await fillAndCompare(page, lines.join("\n"), [...lines.slice(0, -1), "changed"].join("\n"));
  await diffRegion(page).getByText("changed", { exact: true }).scrollIntoViewIfNeeded();
  await expect(
    diffRegion(page).getByText(`line ${LONG_LINE_COUNT - 1}`, { exact: true }),
  ).toBeInViewport();
  await expect(
    diffRegion(page).getByText(`line ${LONG_LINE_COUNT - 2}`, { exact: true }),
  ).toHaveCount(2);
  for (const cell of await diffRegion(page)
    .getByText(`line ${LONG_LINE_COUNT - 2}`, { exact: true })
    .all()) {
    await expect(cell).toBeInViewport();
  }
});

test("returns to the editable inputs", async ({ page }) => {
  await fillAndCompare(page, SOURCE_TEXT, DESTINATION_TEXT);
  await page.getByRole("button", { name: "Edit files" }).click();
  await expect(page.getByLabel("Source", { exact: true })).toHaveValue(SOURCE_TEXT);
});
