import { expect, type Page } from '@playwright/test';

export type PageTestConfig = {
  textToClick: string;
  expectedURL: string;
  expectedText: string;
};

export async function testPageNavigation(locator: string, page: Page, config: PageTestConfig) {
  // Directly target links within the footer that contain the text
  const footerLinkLocator = page.getByRole('link', { name: config.textToClick });
  if ((await footerLinkLocator.count()) === 0) {
    throw new Error(`Link with text "${config.textToClick}" not found`);
  }
  await footerLinkLocator.click();

  await expect(page).toHaveURL(config.expectedURL);
  await expect(page.locator(locator)).toContainText(new RegExp(config.expectedText));
}
