import { expect, test as setup, type Page } from '@playwright/test';

const adminEmail = process.env.TEST_ADMIN_EMAIL!;
const adminPassword = process.env.TEST_ADMIN_PASSWORD!;
const adminAuthFile = 'playwright/.auth/admin.json';

const memberEmail = process.env.TEST_MEMBER_EMAIL!;
const memberPassword = process.env.TEST_MEMBER_PASSWORD!;
export const memberAuthFile = 'playwright/.auth/member.json';

setup('Create Admin Auth', async ({ page, context }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto('/login?redirect=/admin');

  await loginPage.login(adminEmail, adminPassword);
  await expect(page).toHaveURL('/admin');

  await context.storageState({ path: adminAuthFile });
});

setup('Create Member Auth', async ({ page, context }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto('/login?redirect=/app');

  await loginPage.login(memberEmail, memberPassword);
  await expect(page).toHaveURL('/app');

  await context.storageState({ path: memberAuthFile });
});

class LoginPage {
  constructor(private readonly page: Page) {}

  async goto(url?: string) {
    await this.page.goto(url || '/login');
  }

  async login(email: string, password: string) {
    // match /login*
    await expect(this.page).toHaveURL(/\/login(\?.*)?$/);

    await this.page.fill('input[type="email"]', email);
    await this.page.press('input[type="email"]', 'Enter');
    await this.page.fill('input[type="password"]', password);
    await this.page.press('input[type="password"]', 'Enter');
  }
}

/*
import { existsSync } from 'fs';
import { expect, test as setup, type Page } from '@playwright/test';

function fileExists(filePath: string): boolean {
  return existsSync(filePath);
}

async function isAlreadyLoggedIn(page: Page, expectedPath: string): Promise<boolean> {
  await page.goto(expectedPath);
  const url = new URL(page.url());
  console.log(`Expected path: ${expectedPath}, Actual path: ${url.pathname}`);
  return url.pathname === expectedPath;
}

const adminEmail = process.env.TEST_ADMIN_EMAIL!;
const adminPassword = process.env.TEST_ADMIN_PASSWORD!;
const adminAuthFile = 'playwright/.auth/admin.json';

setup('Create Admin Auth', async ({ page }) => {
  await authenticateUser(page, adminEmail, adminPassword, adminAuthFile, '/admin');
});

async function authenticateUser(
  page: Page,
  email: string,
  password: string,
  authFile: string,
  expectedURL: string
) {
  if (!fileExists(authFile) || !(await isAlreadyLoggedIn(page, expectedURL))) {
    await login(page, email, password, expectedURL);
    await page.context().storageState({ path: authFile });
  }
}

async function login(page: Page, email: string, password: string, expectedURL: string) {
  await expect(page).toHaveURL(/\/login(\?.*)?$/); // match /login*

  await page.fill('input[type="email"]', email);
  await page.press('input[type="email"]', 'Enter');
  await page.fill('input[type="password"]', password);
  await page.press('input[type="password"]', 'Enter');

  await expect(page).toHaveURL(expectedURL);
}

 */
