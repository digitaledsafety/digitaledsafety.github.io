const { test, expect } = require('@playwright/test');

test.describe('Site Integrity Tests', () => {
  test('should not have duplicate HTML IDs', async ({ page }) => {
    await page.goto('http://localhost:8000/');
    const ids = await page.evaluate(() => {
      const allElements = document.querySelectorAll('[id]');
      const idCounts = {};
      const duplicates = [];
      allElements.forEach(el => {
        const id = el.id;
        idCounts[id] = (idCounts[id] || 0) + 1;
        if (idCounts[id] === 2) {
          duplicates.push(id);
        }
      });
      return duplicates;
    });
    expect(ids, `Found duplicate IDs: ${ids.join(', ')}`).toEqual([]);
  });

  test('Masthead should have a CTA with hero-cta class', async ({ page }) => {
    await page.goto('http://localhost:8000/');
    const cta = page.locator('.masthead .btn.hero-cta');
    await expect(cta).toBeVisible();
  });

  test('Marketplace section should exist', async ({ page }) => {
    await page.goto('http://localhost:8000/');
    const marketplace = page.locator('#marketplace');
    await expect(marketplace).toBeVisible();
  });
});
