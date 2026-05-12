const { test, expect } = require('@playwright/test');

test('open-source grid images have descriptive alt text', async ({ page }) => {
  await page.goto('/open-source.html');
  // Wait for cards to be populated
  await page.waitForSelector('.filterable-card img');

  const images = page.locator('.filterable-card img');
  const count = await images.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    const alt = await images.nth(i).getAttribute('alt');
    expect(alt).not.toBeNull();
    expect(alt.trim().length).toBeGreaterThan(0);
    expect(alt.toLowerCase()).toContain('logo');
  }
});

test('organizations grid images have descriptive alt text', async ({ page }) => {
  await page.goto('/organizations.html');
  // Wait for cards to be populated
  await page.waitForSelector('.filterable-card img');

  const images = page.locator('.filterable-card img');
  const count = await images.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    const alt = await images.nth(i).getAttribute('alt');
    expect(alt).not.toBeNull();
    expect(alt.trim().length).toBeGreaterThan(0);
    expect(alt.toLowerCase()).toContain('logo');
  }
});
