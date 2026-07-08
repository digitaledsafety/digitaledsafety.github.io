const { test, expect } = require('@playwright/test');

test('Verify English localization on Marketplace page', async ({ page }) => {
  await page.goto('/marketplace.html');

  // Check header strings from sitetext.yml
  const marketplaceTitle = page.locator('.intro-heading');
  await expect(marketplaceTitle).toContainText('Marketplace');

  const marketplaceSubtitle = page.locator('.intro-lead-in');
  await expect(marketplaceSubtitle).toContainText('Apps and Games for a Modern Education');

  const sectionHeading = page.locator('#marketplace .section-heading');
  await expect(sectionHeading).toContainText('Empower Your Learning Journey');
});

test('Verify English localization on Open Source page', async ({ page }) => {
  await page.goto('/open-source.html');

  const introHeading = page.locator('.intro-heading');
  await expect(introHeading).toContainText('Open Source');

  const heading = page.locator('h2').first();
  await expect(heading).toContainText('Collaborate with Industry Leaders through Open Source');
});

test('Verify English localization on Organizations page', async ({ page }) => {
  await page.goto('/organizations.html');

  const introHeading = page.locator('.intro-heading');
  await expect(introHeading).toContainText('Organizations');

  const heading = page.locator('h2').first();
  await expect(heading).toContainText('Partnering for a Brighter STEM Future');
});
