const { test, expect } = require('@playwright/test');

test.describe('Collection Search and Filtering', () => {

  test('Organizations page search and filter', async ({ page }) => {
    await page.goto('/organizations.html');

    // Check if localized heading is present
    await expect(page.locator('h1.intro-heading')).toContainText(/Organizations|Organizaciones/);

    // Check search input
    const searchInput = page.locator('#card-search');
    await expect(searchInput).toBeVisible();

    // Count initial cards
    const initialCards = await page.locator('.filterable-card').count();
    expect(initialCards).toBeGreaterThan(0);

    // Test search
    await searchInput.fill('Digital');
    const filteredCards = await page.locator('.filterable-card').count();
    expect(filteredCards).toBeLessThanOrEqual(initialCards);

    // Test no results
    await searchInput.fill('NonExistentOrganizationXYZ');
    await expect(page.locator('#no-results-message')).toBeVisible();
    await expect(page.locator('.filterable-card')).toHaveCount(0);
  });

  test('Open Source page search and filter', async ({ page }) => {
    await page.goto('/open-source.html');

    await expect(page.locator('h1.intro-heading')).toContainText(/Open Source|Código Abierto/);

    const searchInput = page.locator('#card-search');
    await expect(searchInput).toBeVisible();

    const initialCards = await page.locator('.filterable-card').count();
    expect(initialCards).toBeGreaterThan(0);

    // Test search
    await searchInput.fill('Linux');
    const filteredCards = await page.locator('.filterable-card').count();
    expect(filteredCards).toBeLessThanOrEqual(initialCards);
  });

  test('Resources page search and filter', async ({ page }) => {
    await page.goto('/categories/games.html');

    const searchInput = page.locator('#card-search');
    await expect(searchInput).toBeVisible();

    const initialCards = await page.locator('.filterable-card').count();
    // Some resources might exist
    if (initialCards > 0) {
        await searchInput.fill('NonExistentXYZ');
        await expect(page.locator('.filterable-card')).toHaveCount(0);
        await expect(page.locator('#no-results-message')).toBeVisible();
    }
  });
});
