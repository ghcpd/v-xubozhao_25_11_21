const { test, expect } = require('@playwright/test');

test.describe('Fixed Demo checks', () => {
  test.beforeEach(async ({ page }) => {
    const fs = require('fs');
    const path = require('path');
    const html = fs.readFileSync(path.join(process.cwd(), 'public', 'fixed.html'), 'utf8');
    await page.setContent(html, { waitUntil: 'load' });
  });

  test('navigation has aria label', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toHaveCount(1);
    const aria = await nav.getAttribute('aria-label');
    expect(aria).toBeTruthy();
  });

  test('buttons are grouped and have clear visual contrast', async ({ page }) => {
    const group = page.locator('[role="group"]');
    await expect(group).toHaveCount(1);
    const btn = group.locator('button').first();
    const color = await btn.evaluate(el => window.getComputedStyle(el).color);
    // Primary button is white text on dark background; ensure it isn't the low contrast color
    expect(color).not.toBe('rgb(184, 183, 183)');
  });

  test('cards have consistent padding', async ({ page }) => {
    const cards = page.locator('main section').nth(0).locator('div');
    const pad1 = await cards.nth(0).evaluate(el => window.getComputedStyle(el).padding);
    const pad2 = await cards.nth(1).evaluate(el => window.getComputedStyle(el).padding);
    expect(pad1).toBe(pad2);
  });

  test('page does not overflow at small viewport', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    // ensure no element's bounding box is wider than the viewport
    const tooWide = await page.evaluate(() => {
      const limit = document.documentElement.clientWidth;
      return Array.from(document.querySelectorAll('*')).filter(el => el.getBoundingClientRect().width > limit).map(el => ({ tag: el.tagName, cls: el.className }));
    });
    expect(tooWide.length).toBe(0);
  });
});
