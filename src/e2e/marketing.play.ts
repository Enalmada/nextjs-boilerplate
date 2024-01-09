import { test } from '@playwright/test';

import { testPageNavigation, type PageTestConfig } from './util';

const pageConfigs: PageTestConfig[] = [
  {
    textToClick: 'FAQ',
    expectedURL: '/faq',
    expectedText: 'Frequently asked questions',
  },
  {
    textToClick: 'Pricing',
    expectedURL: '/pricing',
    expectedText: 'Pricing',
  },
  {
    textToClick: 'About',
    expectedURL: '/about',
    expectedText: 'About',
  },
  {
    textToClick: 'Blog',
    expectedURL: '/blog',
    expectedText: 'Blog',
  },
  {
    textToClick: 'Contact Us',
    expectedURL: '/contact',
    expectedText: 'Contact',
  },
  {
    textToClick: 'Terms and Conditions',
    expectedURL: '/terms',
    expectedText: 'Terms of Service',
  },
  {
    textToClick: 'Privacy Policy',
    expectedURL: '/privacy',
    expectedText: 'Privacy Policy',
  },
];

test.describe('Marketing', () => {
  test(`should navigate to the marketing pages`, async ({ page }) => {
    await page.goto('/');

    for (const config of pageConfigs) {
      await testPageNavigation('main', page, config);
    }
  });
});
