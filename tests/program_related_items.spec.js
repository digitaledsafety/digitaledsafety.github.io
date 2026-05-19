const { test, expect } = require('@playwright/test');

test('program page displays related marketplace items', async ({ page }) => {
  // Go to a program page that has related items (e.g., program 4 - Social Media)
  await page.goto('/programs/4.html');

  // Check if the "Related Marketplace Items" section is present
  const relatedSection = page.locator('.related-marketplace-items');
  await expect(relatedSection).toBeVisible();

  // Verify there's at least one related item card
  const itemCards = relatedSection.locator('.card');
  const count = await itemCards.count();
  expect(count).toBeGreaterThan(0);

  // Check for the title of one known related item (e.g., Thumbnail Generator)
  const itemTitle = relatedSection.locator('h5', { hasText: 'Thumbnail Generator' });
  await expect(itemTitle).toBeVisible();
});
