const { test, expect } = require('@playwright/test');

test('verify related marketplace items on program pages', async ({ page }) => {
  // Go to a program page that has related items (Program 4 has item 57)
  await page.goto('http://localhost:8000/programs/4.html');

  // Check if Related Marketplace Items section exists
  const relatedHeading = page.locator('h3:has-text("Related Marketplace Items")');
  await expect(relatedHeading).toBeVisible();

  // Check if at least one item is present
  const relatedCards = page.locator('.related-marketplace .card');
  const count = await relatedCards.count();
  expect(count).toBeGreaterThan(0);

  // Check the "View Details" link
  const viewDetailsBtn = relatedCards.first().locator('a:has-text("View Details")');
  await expect(viewDetailsBtn).toBeVisible();

  const href = await viewDetailsBtn.getAttribute('href');
  expect(href).not.toBe('/#marketplace');
  expect(href).toContain('/marketplace/');

  await page.screenshot({ path: 'screenshots/program_related_items.png' });
});
