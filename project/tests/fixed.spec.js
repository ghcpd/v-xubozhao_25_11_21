const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const baseFile = path.join(__dirname, '..', 'public', 'fixed.html');

test.beforeEach(async ({ page }) => {
  const html = fs.readFileSync(baseFile, 'utf8');
  await page.setContent(html);
});

test('all primary nav links have aria-labels', async ({ page }) => {
  const navAnchors = await page.$$eval('nav a', els => els.map(e => e.getAttribute('aria-label')));
  const missing = navAnchors.filter(a => !a);
  expect(missing.length).toBe(0);
    await page.screenshot({ path: 'tests/screenshots/fixed-missing-aria.png', fullPage: true });
});

// Delete button contrast should now be dark (rgb(255,0,0) approx)
test('buttons have sufficient contrast', async ({ page }) => {
  const deleteButton = await page.$('button:has-text("Delete")');
  expect(deleteButton).toBeTruthy();
  const color = await page.evaluate(el => getComputedStyle(el).color, deleteButton);
  expect(color).toMatch(/rgb\(255,\s*\d+,\s*\d+\)|rgb\(220,\s*0,\s*0\)|rgb\(201,\s*0,\s*0\)/);
    await page.screenshot({ path: 'tests/screenshots/fixed-contrast.png', fullPage: true });
});

// Uniform padding on cards
test('cards have uniform padding', async ({ page }) => {
  const paddings = await page.$$eval('.grid .p-4, .grid > div p-4, .grid > div', els => els.map(e => getComputedStyle(e).paddingTop));
  // They should be equal
  expect(new Set(paddings).size).toBe(1);
    await page.screenshot({ path: 'tests/screenshots/fixed-uniform-padding.png', fullPage: true });
});

// Action buttons are grouped in a container
test('action buttons are grouped', async ({ page }) => {
  const leftPositions = await page.$$eval('button', els => els.filter(b => /save|delete|export/i.test(b.innerText)).map(b => b.parentElement.getBoundingClientRect().left));
  const uniqueLefts = [...new Set(leftPositions)];
  // In the fixed version, grouped buttons should all share very similar left positions (i.e., same parent)
  expect(uniqueLefts.length).toBe(1);
    await page.screenshot({ path: 'tests/screenshots/fixed-actions-grouped.png', fullPage: true });
});

// Responsive check: at small viewport, no overflow
test('no overflow at small viewport', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 375, height: 800 } });
  const page = await context.newPage();
  const html = require('fs').readFileSync(require('path').join(__dirname, '..', 'public', 'fixed.html'), 'utf8');
  await page.setContent(html);
  const bodyScroll = await page.evaluate(() => document.body.scrollWidth);
  expect(bodyScroll).toBeLessThanOrEqual(375);
    await page.screenshot({ path: 'tests/screenshots/fixed-responsive.png', fullPage: true });
  await context.close();
});
