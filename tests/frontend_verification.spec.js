const { test, expect } = require('@playwright/test');

test('frontend verification of enhancements', async ({ page }) => {
  // 1. Verify Navigation
  await page.goto('http://localhost:8000/');
  const programsNavLink = page.locator('.nav-link:has-text("Programs")');
  await expect(programsNavLink).toBeVisible();

  // 2. Verify Marketplace Clear Filters button
  const clearFiltersBtn = page.locator('#clear-filters');
  await expect(clearFiltersBtn).toContainText('Clear Filters');
  await page.locator('#marketplace').scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'verification/marketplace_nav.png' });

  // 3. Verify Program Page related items
  await page.goto('http://localhost:8000/programs/4.html');
  const viewDetailsBtn = page.locator('.related-marketplace a:has-text("View Details")').first();
  await expect(viewDetailsBtn).toBeVisible();
  await page.locator('.related-marketplace').scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'verification/program_details_related.png' });

  // 4. Verify X-Twitter icon in the footer
  await page.goto('http://localhost:8000/index.html');
  const twitterIcon = page.locator('footer .fa-x-twitter');
  // Use count() or check existence without strict visibility if it might be considered hidden by Playwright
  const count = await twitterIcon.count();
  expect(count).toBeGreaterThan(0);
});
