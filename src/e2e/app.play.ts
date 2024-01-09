import { expect, test } from '@playwright/test';

test.describe('App', () => {
  const uniqueTaskTitle = 'Task ' + Date.now();

  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  test.beforeEach(async ({ page }) => {
    await page.goto('/app');
  });

  test('happy path', async ({ page }) => {
    // list should have text
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Task Manager');

    // create new
    await page.getByRole('button', { name: 'New Task' }).click();
    await expect(page).toHaveURL('/app/task/new');

    await page.fill('input[name="title"]', uniqueTaskTitle);
    await page.getByRole('button', { name: 'Create' }).click();

    await expect(page).toHaveURL('/app');
    await expect(page.getByText(uniqueTaskTitle)).toBeVisible();

    // update
    await page.getByRole('link', { name: uniqueTaskTitle }).click();

    const description = uniqueTaskTitle + '_description';

    await page.fill('textarea[name="description"]', description);
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page).toHaveURL('/app');
    await expect(page.getByText(description)).toBeVisible();

    // delete
    await page.getByRole('link', { name: uniqueTaskTitle }).click();

    await page.getByRole('button', { name: 'Delete' }).click();

    await expect(page).toHaveURL('/app');
    await expect(page.getByText(uniqueTaskTitle)).not.toBeVisible();
  });
});
