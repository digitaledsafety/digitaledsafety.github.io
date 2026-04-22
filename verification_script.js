const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Verify Homepage
  console.log('Verifying Homepage...');
  await page.goto('http://localhost:8000/index.html');
  await page.screenshot({ path: '/home/jules/verification/homepage.png', fullPage: true });

  const marketplaceHeader = await page.textContent('h2.section-heading');
  console.log('Homepage Header:', marketplaceHeader);

  // Verify Services Page
  console.log('Verifying Services Page...');
  await page.goto('http://localhost:8000/services.html');
  await page.screenshot({ path: '/home/jules/verification/services.png', fullPage: true });

  const servicesHeader = await page.textContent('.intro-heading');
  console.log('Services Page Header:', servicesHeader);

  await browser.close();
})();
