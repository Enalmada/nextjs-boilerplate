/*
import { test, expect } from '@playwright/test';

// force GPU hardware acceleration (even in headless mode)
// https://dev.to/perrocontodo/run-playwright-tests-with-hardware-acceleration-on-a-gpu-enabled-ec2-instance-with-docker-support-4j2

// Confirm it is working (when necessary)
test('GPU hardware acceleration', async ({ page }) => {
    await page.goto('chrome://gpu')
    const featureStatusList = page.locator('.feature-status-list')
    await expect(featureStatusList).toContainText('Hardware accelerated')
})

// To see settings, this test will save a file called gpu.png.
test('It should take a snapshot of the GPU Chrome page', async ({ page }) => {
    await page.goto('chrome://gpu', { waitUntil: 'domcontentloaded' });
    await page.screenshot({ path: 'gpu.png' });
    await expect(page.locator('text=Graphics Feature Status').first()).toBeVisible();
});
*/
