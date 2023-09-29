import { expect, test, test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await expect(page).toHaveURL('/login');

  await page.fill('input[type="email"]', process.env.TEST_EMAIL!);
  await page.press('input[type="email"]', 'Enter');
  await page.fill('input[type="password"]', process.env.TEST_PASSWORD!);
  await page.press('input[type="password"]', 'Enter');

  await expect(page).toHaveURL('/app');

  await page.context().storageState({ path: authFile });
});
