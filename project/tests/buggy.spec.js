const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const baseFile = path.join(__dirname, '..', 'public', 'buggy.html');

test.beforeEach(async ({ page }) => {
  const html = fs.readFileSync(baseFile, 'utf8');
  await page.setContent(html);
});

test('detect missing aria-label on nav items', async ({ page }) => {
  const navAnchors = await page.$$eval('nav a', els => els.map(e => ({ text: e.innerText, aria: e.getAttribute('aria-label') })));
  const missing = navAnchors.filter(a => !a.aria);
  expect(missing.length).toBeGreaterThan(0);
  await page.screenshot({ path: 'tests/screenshots/buggy-missing-aria.png', fullPage: true });
});

// Low contrast button
test('detect low contrast button', async ({ page }) => {
  const deleteButton = await page.$('button.low-contrast');
  expect(deleteButton).toBeTruthy();
  const color = await page.evaluate(el => getComputedStyle(el).color, deleteButton);
  // low contrast color we used was rgb(192, 192, 192)
  expect(color).toMatch(/rgb\(192,\s*192,\s*192\)|rgb\(200,\s*200,\s*200\)/);
  await page.screenshot({ path: 'tests/screenshots/buggy-low-contrast.png', fullPage: true });
});

// Uneven padding check on cards
test('detect uneven padding on cards', async ({ page }) => {
  const paddings = await page.$$eval('.card', els => els.map(e => getComputedStyle(e).paddingTop));
  // Expect paddings to vary for buggy page
  const unique = [...new Set(paddings)];
  expect(unique.length).toBeGreaterThan(1);
  await page.screenshot({ path: 'tests/screenshots/buggy-uneven-padding.png', fullPage: true });
});

// Action buttons not grouped
test('detect action buttons are not grouped', async ({ page }) => {
  const parents = await page.$$eval('button', els => els.filter(b => /save|delete|export/i.test(b.innerText)).map(b => b.parentElement));
  const positions = await page.$$eval('button', els => els.filter(b => /save|delete|export/i.test(b.innerText)).map(b => b.parentElement.getBoundingClientRect().left));
  const uniqueLefts = [...new Set(positions)];
  expect(uniqueLefts.length).toBeGreaterThan(1);
  await page.screenshot({ path: 'tests/screenshots/buggy-actions-not-grouped.png', fullPage: true });
});

// Responsive break check on small viewport
test('detect layout breaks under 480px width', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 375, height: 800 } });
  const page = await context.newPage();
  const html = require('fs').readFileSync(require('path').join(__dirname, '..', 'public', 'buggy.html'), 'utf8');
  await page.setContent(html);
  // Check for horizontal overflow: body scrollWidth > viewport width
  const bodyScroll = await page.evaluate(() => document.body.scrollWidth);
  expect(bodyScroll).toBeGreaterThan(375);
  await page.screenshot({ path: 'tests/screenshots/buggy-responsive-break.png', fullPage: true });
  await context.close();
});
