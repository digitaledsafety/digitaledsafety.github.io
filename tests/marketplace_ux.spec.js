const { test, expect } = require('@playwright/test');

test('marketplace search has aria-label', async ({ page }) => {
  await page.goto('/');
  const searchInput = page.locator('#marketplace-search');
  await expect(searchInput).toHaveAttribute('aria-label', /Search/i);
});

test('marketplace displays no results message when no items match', async ({ page }) => {
  await page.goto('/');
  const searchInput = page.locator('#marketplace-search');
  await searchInput.fill('nonexistent-item-xyz-123');

  const noResultsMessage = page.locator('#no-results-message');
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).toHaveAttribute('role', 'status');
});

test('marketplace items display localized labels', async ({ page }) => {
  await page.goto('/');

  // Wait for items to be rendered
  const firstMetaItem = page.locator('.meta-item').first();
  await expect(firstMetaItem).toBeVisible();

  const platformLabel = page.locator('.meta-label', { hasText: /Platform:/i }).first();
  await expect(platformLabel).toBeVisible();

  const categoryLabel = page.locator('.meta-label', { hasText: /Category:/i }).first();
  await expect(categoryLabel).toBeVisible();
});

test('marketplace clear search button resets filters', async ({ page }) => {
  await page.goto('/');

  const searchInput = page.locator('#marketplace-search');
  const serviceFilter = page.locator('#service-filter');
  const clearButton = page.locator('#clear-search');

  // Initial state
  await expect(searchInput).toHaveValue('');
  await expect(serviceFilter).toHaveValue('all');

  // Apply filters
  await searchInput.fill('Shark');
  await serviceFilter.selectOption({ label: 'Engineering' });

  await expect(searchInput).toHaveValue('Shark');
  await expect(serviceFilter).toHaveValue('Engineering');

  // Click clear
  await clearButton.click();

  // Verify reset
  await expect(searchInput).toHaveValue('');
  await expect(serviceFilter).toHaveValue('all');

  // Verify results are re-rendered (at least one item should be visible)
  const items = page.locator('.marketplace-item-wrapper');
  await expect(items.first()).toBeVisible();
});
