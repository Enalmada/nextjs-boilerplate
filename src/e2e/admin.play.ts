import { expect, test } from '@playwright/test';

import { testPageNavigation, type PageTestConfig } from './util';

test('non-admin should get redirected', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/admin');
  await expect(page).toHaveURL('/');
});

test.describe('Admin', () => {
  test.use({ storageState: 'playwright/.auth/admin.json' });

  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin');
  });

  test('admin should not get redirected', async ({ page }) => {
    await expect(page).toHaveURL('/admin');
  });

  test(`list pages`, async ({ page }) => {
    const pageConfigs: PageTestConfig[] = [
      {
        textToClick: 'Users',
        expectedURL: '/admin/user',
        expectedText: 'Avatar',
      },
      /* clone-code ENTITY_HOOK
      {
        "toPlacement": "below",
        "replacements": [
          { "find": "Tasks", "replace": "<%= h.inflection.pluralize(h.changeCase.pascalCase(name)) %>" },
          { "find": "task", "replace": "<%= h.changeCase.camelCase(name) %>" }
        ]
      }
      */
      {
        textToClick: 'Tasks',
        expectedURL: '/admin/task',
        expectedText: 'Title',
      },
      /* clone-code ENTITY_HOOK end */
    ];

    for (const config of pageConfigs) {
      await testPageNavigation('section', page, config);
    }
  });
});
