const { test, expect } = require('@playwright/test');

test.describe('Security and Robustness', () => {
  test('should not throw unhandled TypeError on pages using default layout without paypalDonate', async ({ page }) => {
    const consoleErrors = [];
    page.on('pageerror', (err) => {
      const msg = err.message || '';
      if (!msg.includes('CookieYes') && !msg.includes('Turnstile') && !msg.includes('Cloudflare')) {
        consoleErrors.push(err);
      }
    });

    // Navigate to /open-source.html, which uses layout: default but does not have #paypalDonate
    await page.goto('/open-source.html', { waitUntil: 'domcontentloaded' });

    // Also wait a bit for scripts to execute fully
    await page.waitForTimeout(1000);

    // Verify no unhandled exceptions were thrown
    expect(consoleErrors).toHaveLength(0);
  });

  test('should safely reject dynamic unsafe links in RSS feed to prevent DOM XSS', async ({ page }) => {
    const mockRssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Digital Education &amp; Safety Foundation Feed</title>
    <link>https://digitaleducationsafety.org</link>
    <description>Latest updates from the Foundation</description>
    <item>
      <title>Safe Post</title>
      <link>https://digitaleducationsafety.org/safe-link</link>
      <description>This is a safe update.</description>
      <pubDate>Mon, 16 Jul 2026 00:00:00 GMT</pubDate>
    </item>
    <item>
      <title>Unsafe Post</title>
      <link>javascript:alert(document.cookie)</link>
      <description>This is an unsafe update with malicious JS.</description>
      <pubDate>Mon, 16 Jul 2026 00:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>`;

    // Intercept the RSS feed network request
    await page.route('**/v1/relay?action=rss&username=digitaledsafety', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'text/xml',
        body: mockRssXml,
      });
    });

    // Navigate to /programs/4.html which includes rss_feed.html
    await page.goto('/programs/4.html', { waitUntil: 'domcontentloaded' });

    // Wait for the dynamic loading to complete
    await page.waitForSelector('.rss-card', { timeout: 15000 });

    // Verify that the safe post is rendered with a "View Post" button
    const safeCard = page.locator('.rss-card', { has: page.locator('h5.card-title', { hasText: /^Safe Post$/ }) });
    await expect(safeCard).toBeVisible();

    const safeLink = safeCard.locator('a:has-text("View Post")');
    await expect(safeLink).toBeVisible();
    await expect(safeLink).toHaveAttribute('href', 'https://digitaleducationsafety.org/safe-link');

    // Verify that the unsafe post is rendered, but does NOT contain a "View Post" button with the javascript link
    const unsafeCard = page.locator('.rss-card', { has: page.locator('h5.card-title', { hasText: /^Unsafe Post$/ }) });
    await expect(unsafeCard).toBeVisible();

    // There shouldn't be any dynamic "View Post" button inside the unsafe post card
    const unsafeLink = unsafeCard.locator('a:has-text("View Post")');
    await expect(unsafeLink).not.toBeVisible();
  });
});
