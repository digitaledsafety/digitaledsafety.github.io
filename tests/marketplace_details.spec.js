const { test, expect } = require('@playwright/test');

test.describe('Marketplace Item Details', () => {
  const variants = ['variant-a', 'variant-b', 'variant-c'];

  for (const variant of variants) {
    test(`Verify ${variant} layout`, async ({ page }) => {
      await page.goto(`/marketplace/14.html?variant=${variant}`);

      // Check title - targeting the specific active variant container
      const activeHero = page.locator(`#${variant}`);
      await expect(activeHero.locator('h1')).toBeVisible();

      // Check badges within active variant
      await expect(activeHero.locator('.meta-badges-hero')).toBeVisible();

      // Check primary CTA within active variant
      await expect(activeHero.locator('.hero-actions .btn-primary')).toBeVisible();

      // Take screenshot
      await page.screenshot({ path: `tests/marketplace_14_${variant}.png`, fullPage: true });
    });
  }

  test('Verify mobile responsiveness', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/marketplace/14.html?variant=variant-b');

    // Check navigation toggle is visible
    await expect(page.locator('.navbar-toggler')).toBeVisible();

    // Check image is visible in variant-b
    await expect(page.locator('#variant-b .hero-img')).toBeVisible();

    await page.screenshot({ path: 'tests/marketplace_14_mobile.png', fullPage: true });
  });
});
