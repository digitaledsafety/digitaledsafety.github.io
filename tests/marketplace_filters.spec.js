const { test, expect } = require('@playwright/test');

test.describe('Marketplace Filtering and Sorting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the marketplace to be rendered
    await expect(page.locator('.marketplace-item-wrapper').first()).toBeVisible();
  });

  test('should filter by service', async ({ page }) => {
    const serviceFilter = page.locator('#service-filter');

    // Select 'Digital Safety'
    await serviceFilter.selectOption('Digital Safety');

    const badges = page.locator('.service-badge');
    const count = await badges.count();
    for (let i = 0; i < count; i++) {
      await expect(badges.nth(i)).toHaveText('Digital Safety');
    }
  });

  test('should sort alphabetically', async ({ page }) => {
    const sortBy = page.locator('#sort-by');
    await sortBy.selectOption('alpha');

    // Allow some time for re-render if necessary
    await page.waitForTimeout(500);

    const titles = await page.locator('.marketplace-title').allTextContents();
    const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));

    expect(titles).toEqual(sortedTitles);
  });

  test('should clear search input', async ({ page }) => {
    const searchInput = page.locator('#marketplace-search');
    const clearButton = page.locator('#clear-search');

    await searchInput.fill('Shark');
    await expect(searchInput).toHaveValue('Shark');

    await clearButton.click();
    await expect(searchInput).toHaveValue('');

    // Check that items are re-rendered (should have more than if filtered by 'Shark')
    const countAfterClear = await page.locator('.marketplace-item-wrapper').count();
    expect(countAfterClear).toBeGreaterThan(0);
  });
});
