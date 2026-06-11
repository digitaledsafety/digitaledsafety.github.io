const { test, expect } = require('@playwright/test');

test('program page related items link to detail pages', async ({ page }) => {
  await page.goto('/programs/1.html'); // Assuming program 1 exists and has related items

  const relatedLink = page.locator('.related-marketplace a').first();
  await expect(relatedLink).toBeVisible();
  const href = await relatedLink.getAttribute('href');
  expect(href).toMatch(/\/marketplace\/\d+\.html/);
});

test('marketplace grid has view details buttons', async ({ page }) => {
  await page.goto('/');

  // Wait for items to render
  await page.waitForSelector('.marketplace-card');

  const detailsBtn = page.locator('.marketplace-card .btn-outline-secondary').first();
  await expect(detailsBtn).toBeVisible();
  await expect(detailsBtn).toHaveText(/View Details/i);

  const href = await detailsBtn.getAttribute('href');
  expect(href).toMatch(/\/marketplace\/\d+\.html/);
});

test('marketplace item detail page shows metadata and program link', async ({ page }) => {
  // Navigate to a specific item page
  await page.goto('/marketplace/56.html'); // MakeCode

  // Check metadata
  await expect(page.locator('strong', { hasText: /Platform:/i })).toBeVisible();
  await expect(page.locator('strong', { hasText: /Category:/i })).toBeVisible();
  await expect(page.locator('strong', { hasText: /Service:/i })).toBeVisible();

  // Check program link
  const programLink = page.locator('p.text-muted a');
  await expect(programLink).toBeVisible();
  await expect(programLink).toHaveAttribute('href', /\/programs\/\d+\.html/);

  // Check standardized launch button
  const launchBtn = page.locator('.launch-trigger');
  await expect(launchBtn).toBeVisible();
  await expect(launchBtn).toHaveAttribute('data-link', /http/);
});
