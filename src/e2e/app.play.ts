import { expect, test } from '@playwright/test';

const uniqueTaskTitle = 'Task ' + Date.now();

test('list should have text', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/app');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Task Manager');
});

test('create new', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/app');
  await page.getByRole('button', { name: 'New Task' }).click();
  await expect(page).toHaveURL('/app/task/new');

  await page.fill('input[name="title"]', uniqueTaskTitle);
  await page.getByRole('button', { name: 'Create' }).click();

  await expect(page).toHaveURL('/app');
  await expect(page.getByText(uniqueTaskTitle)).toBeVisible();
});

test('update', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/app');
  await page.getByRole('link', { name: uniqueTaskTitle }).click();

  const description = uniqueTaskTitle + '_description';

  await page.fill('textarea[name="description"]', description);
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page).toHaveURL('/app');
  await expect(page.getByText(description)).toBeVisible();
});

test('delete', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/app');
  await page.getByRole('link', { name: uniqueTaskTitle }).click();

  await page.getByRole('button', { name: 'Delete' }).click();

  await expect(page).toHaveURL('/app');
  await expect(page.getByText(uniqueTaskTitle)).not.toBeVisible();
});
