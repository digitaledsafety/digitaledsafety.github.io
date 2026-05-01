const { test, expect } = require('@playwright/test');

test('homepage has correct sections and navigation', async ({ page }) => {
  await page.goto('/');

  // Check for Marketplace section
  const marketplace = page.locator('#marketplace');
  await expect(marketplace).toBeAttached();
  await expect(marketplace.locator('h2')).toHaveText('Marketplace');

  // Check for Programs section
  const programs = page.locator('#programs');
  await expect(programs).toBeAttached();
  await expect(programs.locator('h2')).toHaveText('Programs');

  // Check that legacy sections are removed
  await expect(page.locator('#services')).not.toBeAttached();
  await expect(page.locator('#resource')).not.toBeAttached();
  await expect(page.locator('#timeline')).not.toBeAttached();

  // Check navigation links
  const ourWorkLink = page.locator('.nav-link', { hasText: 'Our Work' });
  await expect(ourWorkLink).toHaveAttribute('href', /#marketplace$/);

  const programsLink = page.locator('.nav-link', { hasText: 'Programs' });
  await expect(programsLink).toHaveAttribute('href', /#programs$/);
});
