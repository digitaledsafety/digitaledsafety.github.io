const { test, expect } = require('@playwright/test');

test.describe('Marketplace Functionality and Share Features', () => {
  test.beforeEach(async ({ page }) => {
    // Block external resources
    await page.route('**/*.{png,jpg,jpeg,svg,gif}', route => route.abort());
    await page.route('**/cdn-cookieyes.com/**', route => route.abort());
    await page.route('**/challenges.cloudflare.com/**', route => route.abort());
    await page.route('**/fonts.googleapis.com/**', route => route.abort());
    await page.route('**/fonts.gstatic.com/**', route => route.abort());
  });

  test('marketplace cards have share and copy buttons', async ({ page }) => {
    await page.goto('/marketplace.html', { waitUntil: 'domcontentloaded' });

    // Wait for the container to have children (rendered via JS)
    const container = page.locator('#marketplace-container');
    const firstItem = container.locator('.marketplace-item-wrapper').first();
    await expect(firstItem).toBeVisible({ timeout: 20000 });

    // Check for share buttons on cards
    const shareButtons = page.locator('.marketplace-item-wrapper .btn-link:has-text("Share")');
    await expect(shareButtons.first()).toBeVisible();

    // Check for copy buttons on cards (the one with the icon only)
    const copyButtons = page.locator('.marketplace-item-wrapper .btn-link:has(i.fa-copy)');
    await expect(copyButtons.first()).toBeVisible();
  });

  test('marketplace detail page has share features', async ({ page }) => {
    await page.goto('/marketplace/53.html', { waitUntil: 'domcontentloaded' });

    const shareBtn = page.locator('#share-btn');
    const copyBtn = page.locator('#copy-btn');

    await expect(shareBtn).toBeVisible({ timeout: 20000 });
    await expect(copyBtn).toBeVisible();
  });

  test('hash-based filtering works on marketplace', async ({ page }) => {
    await page.goto('/marketplace.html#Engineering', { waitUntil: 'domcontentloaded' });

    const serviceFilter = page.locator('#service-filter');
    await expect(serviceFilter).toHaveValue('Engineering', { timeout: 20000 });

    const items = page.locator('.marketplace-item-wrapper');
    await expect(items.first()).toBeVisible();

    const count = await items.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const badge = items.nth(i).locator('.service-badge');
      await expect(badge).toHaveText('Engineering');
    }
  });

  test('related marketplace items on program pages have share features', async ({ page }) => {
    await page.goto('/programs/6.html', { waitUntil: 'domcontentloaded' });

    const relatedSection = page.locator('.related-marketplace');
    await expect(relatedSection).toBeVisible({ timeout: 20000 });

    // Wait for JS rendering
    const shareButtons = relatedSection.locator('.btn-link:has-text("Share")');
    await expect(shareButtons.first()).toBeVisible();
  });
});
