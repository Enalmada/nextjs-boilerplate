import { expect, test } from '@playwright/test';

test('non-admin should get redirected', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/admin');
  await expect(page).toHaveURL('/');
});
