const { test, expect } = require('@playwright/test');

test('homepage has correct sections and navigation', async ({ page }) => {
  await page.goto('/');

  // Check for Marketplace section
  const marketplace = page.locator('#marketplace');
  await expect(marketplace).toBeAttached();
  await expect(marketplace.locator('h2')).toHaveText('Marketplace');

  // Check that legacy sections are removed
  await expect(page.locator('#services')).not.toBeAttached();
  await expect(page.locator('#resource')).not.toBeAttached();
  await expect(page.locator('#timeline')).not.toBeAttached();

  // Check navigation links
  const ourWorkLink = page.locator('.nav-link', { hasText: 'Our Work' });
  await expect(ourWorkLink).toHaveAttribute('href', /#marketplace$/);
});
