const { test, expect } = require('@playwright/test');

test.describe('UI/UX Issue Detection - Buggy Dashboard', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo_dashboard_buggy.html');
  });

  test('ISSUE ui-acc-001: Navigation items missing aria-label', async ({ page }) => {
    // Check navigation links lack proper ARIA labels
    const navLinks = page.locator('.nav a');
    const count = await navLinks.count();
    
    let missingAriaCount = 0;
    for (let i = 0; i < count; i++) {
      const ariaLabel = await navLinks.nth(i).getAttribute('aria-label');
      if (!ariaLabel) {
        missingAriaCount++;
      }
    }
    
    // Expect all nav links to be missing aria-label in buggy version
    expect(missingAriaCount).toBe(count);
    console.log(`✗ Found ${missingAriaCount} navigation items without aria-label`);
  });

  test('ISSUE ui-color-002: Button text has low contrast', async ({ page }) => {
    // Check primary button for low contrast
    const primaryButton = page.locator('.btn-primary').first();
    const bgColor = await primaryButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    const color = await primaryButton.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    
    // Verify we have low contrast colors (both light colors)
    console.log(`✗ Primary button - Background: ${bgColor}, Text: ${color}`);
    expect(bgColor).toContain('204'); // #ccc = rgb(204, 204, 204)
    expect(color).toContain('221'); // #ddd = rgb(221, 221, 221)
  });

  test('ISSUE ui-space-003: Uneven padding and inconsistent spacing', async ({ page }) => {
    // Check header for uneven padding
    const header = page.locator('.header');
    const padding = await header.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        top: style.paddingTop,
        right: style.paddingRight,
        bottom: style.paddingBottom,
        left: style.paddingLeft
      };
    });
    
    // Verify padding is inconsistent
    const paddingValues = Object.values(padding);
    const uniqueValues = [...new Set(paddingValues)];
    expect(uniqueValues.length).toBeGreaterThan(1);
    console.log(`✗ Header has inconsistent padding: ${JSON.stringify(padding)}`);
  });

  test('ISSUE ui-flow-004: Action buttons not grouped logically', async ({ page }) => {
    // Check that destructive and primary actions are mixed together
    const actionsContainer = page.locator('.actions-scattered');
    const buttons = actionsContainer.locator('button');
    const count = await buttons.count();
    
    // Get all button classes
    const buttonClasses = [];
    for (let i = 0; i < count; i++) {
      const className = await buttons.nth(i).getAttribute('class');
      buttonClasses.push(className);
    }
    
    // Check if danger buttons are interspersed (not grouped)
    const dangerIndices = buttonClasses
      .map((cls, idx) => cls.includes('btn-danger') ? idx : -1)
      .filter(idx => idx !== -1);
    
    // In buggy version, danger buttons should not be consecutive
    if (dangerIndices.length > 1) {
      const notGrouped = Math.abs(dangerIndices[0] - dangerIndices[1]) > 1;
      expect(notGrouped).toBe(true);
      console.log(`✗ Destructive actions not grouped together (indices: ${dangerIndices})`);
    }
  });

  test('ISSUE ui-resp-005: Layout breaks on small screens', async ({ page }) => {
    // Resize to mobile viewport
    await page.setViewportSize({ width: 400, height: 800 });
    await page.waitForTimeout(500); // Wait for layout to adjust
    
    // Check if dashboard grid still has 3 columns (causing overflow)
    const grid = page.locator('.dashboard-grid');
    const gridTemplate = await grid.evaluate((el) => {
      return window.getComputedStyle(el).gridTemplateColumns;
    });
    
    // Should still be showing 3 columns on mobile (broken)
    const columnCount = gridTemplate.split(' ').length;
    expect(columnCount).toBe(3);
    console.log(`✗ Grid shows ${columnCount} columns on 400px screen (should be 1)`);
    
    // Check for horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = 400;
    expect(bodyWidth).toBeGreaterThan(viewportWidth);
    console.log(`✗ Body width (${bodyWidth}px) exceeds viewport (${viewportWidth}px)`);
  });
});

test.describe('UI/UX Fixes Verification - Fixed Dashboard', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo_dashboard_fixed.html');
  });

  test('FIXED ui-acc-001: Navigation items have proper aria-label', async ({ page }) => {
    // Check all navigation links have ARIA labels
    const navLinks = page.locator('nav[aria-label="Main navigation"] a[role="menuitem"]');
    const count = await navLinks.count();
    
    expect(count).toBeGreaterThan(0);
    
    for (let i = 0; i < count; i++) {
      const ariaLabel = await navLinks.nth(i).getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel).toContain('Navigate to');
    }
    
    console.log(`✓ All ${count} navigation items have proper aria-label attributes`);
  });

  test('FIXED ui-color-002: Buttons have high contrast text', async ({ page }) => {
    // Check primary button for high contrast
    const primaryButton = page.locator('button').filter({ hasText: 'New User' }).first();
    await expect(primaryButton).toBeVisible();
    
    const bgColor = await primaryButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    const color = await primaryButton.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    
    console.log(`✓ Primary button - Background: ${bgColor}, Text: ${color}`);
    
    // Verify we have high contrast (dark blue bg, white text)
    expect(color).toMatch(/rgb\(255,\s*255,\s*255\)/); // White text
    
    // Check status badges for high contrast
    const badge = page.locator('span[role="status"]').first();
    const badgeBg = await badge.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    const badgeColor = await badge.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    
    console.log(`✓ Badge - Background: ${badgeBg}, Text: ${badgeColor}`);
    expect(badgeBg).not.toBe(badgeColor); // Should have clear distinction
  });

  test('FIXED ui-space-003: Consistent spacing with Tailwind', async ({ page }) => {
    // Check that Tailwind classes are used consistently
    const cards = page.locator('article.shadow-md');
    const count = await cards.count();
    
    expect(count).toBeGreaterThan(0);
    
    // Check all cards have consistent padding (p-6 = 24px on all sides)
    for (let i = 0; i < count; i++) {
      const padding = await cards.nth(i).evaluate((el) => {
        const style = window.getComputedStyle(el);
        return {
          top: style.paddingTop,
          right: style.paddingRight,
          bottom: style.paddingBottom,
          left: style.paddingLeft
        };
      });
      
      // All padding values should be equal (24px)
      const paddingValues = Object.values(padding);
      const allEqual = paddingValues.every(val => val === paddingValues[0]);
      expect(allEqual).toBe(true);
    }
    
    console.log(`✓ All ${count} cards have consistent padding on all sides`);
  });

  test('FIXED ui-flow-004: Action buttons are logically grouped', async ({ page }) => {
    // Check for proper grouping sections
    const primaryGroup = page.locator('[aria-labelledby="primary-actions-label"]');
    const secondaryGroup = page.locator('[aria-labelledby="secondary-actions-label"]');
    const destructiveGroup = page.locator('[aria-labelledby="destructive-actions-label"]');
    
    await expect(primaryGroup).toBeVisible();
    await expect(secondaryGroup).toBeVisible();
    await expect(destructiveGroup).toBeVisible();
    
    // Verify primary actions are together
    const primaryButtons = primaryGroup.locator('button');
    const primaryCount = await primaryButtons.count();
    expect(primaryCount).toBe(2);
    
    // Verify destructive actions are together
    const destructiveButtons = destructiveGroup.locator('button');
    const destructiveCount = await destructiveButtons.count();
    expect(destructiveCount).toBe(2);
    
    console.log(`✓ Actions grouped logically: ${primaryCount} primary, ${destructiveCount} destructive`);
  });

  test('FIXED ui-resp-005: Layout is responsive on small screens', async ({ page }) => {
    // Resize to mobile viewport
    await page.setViewportSize({ width: 400, height: 800 });
    await page.waitForTimeout(500);
    
    // Check if grid adapts to 1 column on mobile
    const grid = page.locator('main .grid').first();
    const gridTemplate = await grid.evaluate((el) => {
      return window.getComputedStyle(el).gridTemplateColumns;
    });
    
    // Should be showing 1 column on mobile
    const columnCount = gridTemplate.split(' ').length;
    expect(columnCount).toBe(1);
    console.log(`✓ Grid correctly shows ${columnCount} column on 400px screen`);
    
    // Check no horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = 400;
    
    // Allow small tolerance for scrollbar
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20);
    console.log(`✓ No horizontal overflow: body width ${bodyWidth}px fits in ${viewportWidth}px viewport`);
  });

  test('ACCESSIBILITY: Semantic HTML structure', async ({ page }) => {
    // Verify semantic HTML elements
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    
    // Verify ARIA landmarks
    const nav = page.locator('nav[aria-label]');
    await expect(nav).toBeVisible();
    
    console.log('✓ Proper semantic HTML structure with header, nav, main, footer');
  });

  test('ACCESSIBILITY: Keyboard navigation', async ({ page }) => {
    // Test keyboard focus on interactive elements
    await page.keyboard.press('Tab');
    
    // Check if first focusable element has focus ring
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Tab through several elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const focused = page.locator(':focus');
      await expect(focused).toBeVisible();
    }
    
    console.log('✓ Keyboard navigation works correctly with visible focus indicators');
  });
});

test.describe('Visual Comparison Tests', () => {
  
  test('Screenshot comparison - Buggy vs Fixed', async ({ page }, testInfo) => {
    // Capture buggy version
    await page.goto('/demo_dashboard_buggy.html');
    await page.waitForLoadState('networkidle');
    const buggyScreenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('buggy-dashboard', { body: buggyScreenshot, contentType: 'image/png' });
    
    // Capture fixed version
    await page.goto('/demo_dashboard_fixed.html');
    await page.waitForLoadState('networkidle');
    const fixedScreenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('fixed-dashboard', { body: fixedScreenshot, contentType: 'image/png' });
    
    console.log('✓ Screenshots captured for both versions');
  });

  test('Mobile view screenshots', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Buggy mobile view
    await page.goto('/demo_dashboard_buggy.html');
    await page.waitForLoadState('networkidle');
    const buggyMobile = await page.screenshot({ fullPage: true });
    await testInfo.attach('buggy-mobile', { body: buggyMobile, contentType: 'image/png' });
    
    // Fixed mobile view
    await page.goto('/demo_dashboard_fixed.html');
    await page.waitForLoadState('networkidle');
    const fixedMobile = await page.screenshot({ fullPage: true });
    await testInfo.attach('fixed-mobile', { body: fixedMobile, contentType: 'image/png' });
    
    console.log('✓ Mobile screenshots captured for both versions');
  });
});
