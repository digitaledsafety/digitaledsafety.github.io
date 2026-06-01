const { test, expect } = require('@playwright/test');

test('open-source filtering shows no results message', async ({ page }) => {
  await page.goto('/open-source.html');

  // Wait for cards to populate
  await page.waitForSelector('.filterable-card');

  // Let's try to inject a checkbox with a non-existent tag to test the UI logic
  await page.evaluate(() => {
    const container = document.getElementById('card-filters');
    const li = document.createElement('li');
    li.className = 'pl-2';
    li.innerHTML = `
        <div class="form-check">
            <input type="checkbox" class="form-check-input" id="nonexistent-tag">
            <label class="form-check-label" for="nonexistent-tag">Nonexistent Tag</label>
        </div>
    `;
    container.appendChild(li);
    // Force call filterCards since we added it manually
    window.filterCards();
  });

  // Instead of clicking which might fail if invisible, just check it via JS and trigger filter
  await page.evaluate(() => {
      document.getElementById('nonexistent-tag').checked = true;
      window.filterCards();
  });

  const noResultsMessage = page.locator('#no-results-message');
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).not.toHaveClass(/d-none/);
});

test('organizations filtering shows no results message', async ({ page }) => {
    await page.goto('/organizations.html');

    // Wait for cards to populate
    await page.waitForSelector('.filterable-card');

    // Inject a non-existent tag
    await page.evaluate(() => {
      const container = document.getElementById('card-filters');
      const li = document.createElement('li');
      li.className = 'pl-2';
      li.innerHTML = `
          <div class="form-check">
              <input type="checkbox" class="form-check-input" id="nonexistent-tag-org">
              <label class="form-check-label" for="nonexistent-tag-org">Nonexistent Tag</label>
          </div>
      `;
      container.appendChild(li);
    });

    await page.evaluate(() => {
        document.getElementById('nonexistent-tag-org').checked = true;
        window.filterCards();
    });

    const noResultsMessage = page.locator('#no-results-message');
    await expect(noResultsMessage).toBeVisible();
  });
