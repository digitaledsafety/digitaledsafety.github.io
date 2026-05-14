const { test, expect } = require('@playwright/test');

test.describe('Marketplace Filtering and Sorting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Search filtering works correctly', async ({ page }) => {
    const searchInput = page.locator('#marketplace-search');
    const items = page.locator('#marketplace-container .marketplace-item-wrapper');

    // Get initial count
    const initialCount = await items.count();
    expect(initialCount).toBeGreaterThan(0);

    // Search for something specific
    await searchInput.fill('Shark');
    await page.waitForTimeout(500); // Wait for debounce/animation

    const filteredCount = await items.count();
    expect(filteredCount).toBeLessThan(initialCount);

    const firstTitle = await items.first().locator('.marketplace-title').textContent();
    expect(firstTitle).toContain('Shark');
  });

  test('Service filtering works correctly', async ({ page }) => {
    const serviceFilter = page.locator('#service-filter');
    const items = page.locator('#marketplace-container .marketplace-item-wrapper');

    await serviceFilter.selectOption('Engineering');
    await page.waitForTimeout(500);

    const count = await items.count();
    for (let i = 0; i < count; i++) {
      const badgeText = await items.nth(i).locator('.service-badge').textContent();
      expect(badgeText).toBe('Engineering');
    }
  });

  test('Clear search resets filters', async ({ page }) => {
    const searchInput = page.locator('#marketplace-search');
    const serviceFilter = page.locator('#service-filter');
    const clearButton = page.locator('#clear-search');
    const items = page.locator('#marketplace-container .marketplace-item-wrapper');

    const initialCount = await items.count();

    await searchInput.fill('NonExistent');
    await serviceFilter.selectOption('Engineering');
    await page.waitForTimeout(500);

    await clearButton.click();
    await page.waitForTimeout(500);

    expect(await searchInput.inputValue()).toBe('');
    expect(await serviceFilter.inputValue()).toBe('all');
    expect(await items.count()).toBe(initialCount);
  });

  test('Alphabetical sorting works', async ({ page }) => {
    const sortBy = page.locator('#sort-by');
    await sortBy.selectOption('alpha');
    await page.waitForTimeout(500);

    const titles = await page.locator('#marketplace-container .marketplace-title').allTextContents();
    const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));
    expect(titles).toEqual(sortedTitles);
  });
});
