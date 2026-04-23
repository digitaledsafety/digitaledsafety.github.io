const { chromium } = require('/tmp/pw/node_modules/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 1024 });

  console.log('Capturing Homepage (Full Page)...');
  await page.goto('http://localhost:8000/');
  await page.waitForTimeout(3000); // Wait for JS to render cards
  await page.screenshot({ path: '/home/jules/verification/homepage_full.png', fullPage: true });

  console.log('Capturing Services Page (Full Page)...');
  await page.goto('http://localhost:8000/services.html');
  await page.screenshot({ path: '/home/jules/verification/services_full.png', fullPage: true });

  await browser.close();
  console.log('Done.');
})();
