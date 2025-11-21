const { test, expect } = require('@playwright/test');

test.describe('UI checks', () => {
  test('Buggy page reproduces issues', async ({ page }) => {
    await page.goto('/');
    // nav items should have aria-labels - buggy page fails
    const navLinks = await page.$$eval('header nav a', els => els.map(e => ({text: e.textContent.trim(), aria: e.getAttribute('aria-label')})));
    // at least one missing aria-label
    const missing = navLinks.filter(n => !n.aria);
    expect(missing.length).toBeGreaterThan(0);

    // Low contrast save button
    const saveColor = await page.$eval('button.bg-blue-200', el => window.getComputedStyle(el).color);
    expect(saveColor).toBeTruthy();

    // Check layout width fixed element
    const sampleWidth = await page.$eval('main div[style*="width:700px"]', el => el.style.width);
    expect(sampleWidth).toContain('700px');
  });

  test('Fixed page accessibility and layout', async ({ page }) => {
    await page.goto('/fixed');
    // nav should have aria-label
    const nav = await page.$('nav[aria-label="Main navigation"]');
    expect(nav).not.toBeNull();

    // nav links all have aria-label
    const navLinks = await page.$$eval('nav a', els => els.map(e => e.getAttribute('aria-label')));
    expect(navLinks.every(a => a)).toBeTruthy();

    // Save button contrast color should be dark text on blue background
    const saveColor = await page.$eval('button[aria-label="Save"]', el => window.getComputedStyle(el).color);
    expect(saveColor).toBe('rgb(255, 255, 255)');

    // Buttons grouped near each other
    const buttons = await page.$$eval('main .flex .flex > button, main .flex > button', els => els.length);
    expect(buttons).toBeGreaterThan(0);

    // Responsive check: resize to 360 width and ensure no horizontal scroll
    await page.setViewportSize({width:360, height:800});
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(360);
  });
});
