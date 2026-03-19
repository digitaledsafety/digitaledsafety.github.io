const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Verify Homepage
  await page.goto('http://localhost:8080/index.html');
  await page.screenshot({ path: 'homepage_resources_full.png', fullPage: true });

  // Verify Open Source page
  await page.goto('http://localhost:8080/open-source.html');
  await page.screenshot({ path: 'opensource_cards_full.png', fullPage: true });

  // Verify a Category page (Apps)
  await page.goto('http://localhost:8080/categories/apps.html');
  await page.screenshot({ path: 'apps_resources_full.png', fullPage: true });

  await browser.close();
})();
