const { test, expect } = require('@playwright/test');

test.describe('Collection Search and Filtering', () => {
  test('Open Source page search and filtering', async ({ page }) => {
    await page.goto('/open-source.html');

    const searchInput = page.locator('#card-search');
    await expect(searchInput).toBeVisible();

    // Initial count
    const initialCards = await page.locator('.filterable-card').count();
    expect(initialCards).toBeGreaterThan(0);

    // Search for "Android"
    await searchInput.fill('Android');
    const androidCards = await page.locator('.filterable-card:visible').count();
    expect(androidCards).toBeGreaterThan(0);
    expect(androidCards).toBeLessThan(initialCards);

    // Search for something that doesn't exist
    await searchInput.fill('NonExistentProject123');
    const noCards = await page.locator('.filterable-card:visible').count();
    expect(noCards).toBe(0);

    // Clear search
    await searchInput.fill('');
    const clearedCards = await page.locator('.filterable-card:visible').count();
    expect(clearedCards).toBe(initialCards);

    // Filter by tag (if available)
    const filterDropdown = page.locator('.dropdown-toggle:has-text("Filter by:")');
    await filterDropdown.click();

    const firstTag = page.locator('#card-filters input[type="checkbox"]').first();
    const tagName = await firstTag.getAttribute('id');
    await firstTag.check();

    const filteredCards = await page.locator('.filterable-card:visible').count();
    expect(filteredCards).toBeGreaterThan(0);
    expect(filteredCards).toBeLessThanOrEqual(initialCards);
  });

  test('Organizations page search and filtering', async ({ page }) => {
    await page.goto('/organizations.html');

    const searchInput = page.locator('#card-search');
    await expect(searchInput).toBeVisible();

    const initialCards = await page.locator('.filterable-card').count();
    expect(initialCards).toBeGreaterThan(0);

    await searchInput.fill('Alice');
    const aliceCards = await page.locator('.filterable-card:visible').count();
    expect(aliceCards).toBeGreaterThan(0);

    await searchInput.fill('NonExistentOrg123');
    const noCards = await page.locator('.filterable-card:visible').count();
    expect(noCards).toBe(0);
  });
});
