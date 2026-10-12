import { expect, type Page } from "@playwright/test";

export const sourceInput = (page: Page) => page.getByLabel("Source", { exact: true });

export const destinationInput = (page: Page) => page.getByLabel("Destination", { exact: true });

export const fillAndCompare = async (page: Page, source: string, destination: string) => {
  await sourceInput(page).fill(source);
  await destinationInput(page).fill(destination);
  await page.getByRole("button", { name: "Compare" }).click();
  await expect(page.locator(".monaco-editor")).toBeVisible();
};

export const finalBuffer = (page: Page) =>
  page
    .locator(".monaco-editor .view-lines")
    .evaluate((node) => (node as HTMLElement).innerText.replace(/ /g, " "));

export const keepButtons = (page: Page, side: "source" | "destination") =>
  page.getByRole("button", { name: `Keep ${side}` });

export const diffRegion = (page: Page) => page.getByRole("region", { name: "Diff" });
