const { test, expect } = require('@playwright/test');

test('screenshot marketplace with results count', async ({ page }) => {
  await page.goto('/marketplace.html');
  await page.waitForSelector('#results-count');

  // Test search and check results count update
  await page.fill('#marketplace-search', 'Shark');
  // Wait for the results count to update to something containing '1'
  await expect(page.locator('#results-count')).toContainText('1');
  const resultsCountText = await page.innerText('#results-count');
  expect(resultsCountText).toContain('1');
});

test('verify organizations with search', async ({ page }) => {
  await page.goto('/organizations.html');
  await page.waitForSelector('#card-container');

  await page.fill('#card-search', 'science');
  // Wait for results count to be visible and have text
  await expect(page.locator('#results-count')).not.toBeEmpty();
  const resultsCountText = await page.innerText('#results-count');
  expect(resultsCountText).toBeTruthy();
});

test('verify open-source with search', async ({ page }) => {
  await page.goto('/open-source.html');
  await page.waitForSelector('#card-container');

  await page.fill('#card-search', 'linux');
  // Wait for results count to update
  await expect(page.locator('#results-count')).toContainText('1');
  const resultsCountText = await page.innerText('#results-count');
  expect(resultsCountText).toContain('1');
});
