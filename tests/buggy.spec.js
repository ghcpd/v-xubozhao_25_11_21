const { test, expect } = require('@playwright/test');

test.describe('Buggy Demo checks', () => {
    test.beforeEach(async ({ page }) => {
      // load file contents directly to avoid server/file restrictions in test env
      const fs = require('fs');
      const path = require('path');
      const html = fs.readFileSync(path.join(process.cwd(), 'public', 'buggy.html'), 'utf8');
      await page.setContent(html, { waitUntil: 'load' });
    });

  test('navigation missing aria label', async ({ page }) => {
    const nav = await page.$('nav');
    const aria = nav && await nav.getAttribute('aria-label');
    expect(aria).toBeNull();
  });

  test('button text contrast is low for Save', async ({ page }) => {
    const btn = page.locator('button:has-text("Save")');
    await expect(btn).toHaveCount(1);
    const color = await btn.evaluate(el => window.getComputedStyle(el).color);
    // intentionally expect the low-contrast rgb from the page
    expect(color).toBe('rgb(184, 183, 183)');
  });

  test('uneven padding between two article cards', async ({ page }) => {
    const p1 = page.locator('main article').nth(0);
    const p2 = page.locator('main article').nth(1);
    const pad1 = await p1.evaluate(el => window.getComputedStyle(el).padding);
    const pad2 = await p2.evaluate(el => window.getComputedStyle(el).padding);
    expect(pad1).not.toBe(pad2);
  });

  test('action buttons are not grouped', async ({ page }) => {
    const group = await page.$('[role="group"]');
    expect(group).toBeNull();
  });

  test('layout breaks at small viewport (horizontal overflow)', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    // check if the broken-layout element width exceeds viewport
    const elWidth = await page.evaluate(() => document.querySelector('.broken-layout').getBoundingClientRect().width);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(elWidth).toBeGreaterThan(clientWidth);
  });
});
