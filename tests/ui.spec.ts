import { expect, test } from '@playwright/test';

test.describe('Demo dashboard UI', () => {
  test('renders accessible navigation and hierarchy', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Primary', exact: true })).toBeAttached();
    await expect(page.locator('nav[aria-label="Primary"] a')).toHaveCount(4);
    await expect(page.getByRole('heading', { name: /Operations overview/i })).toBeVisible();
  });

  test('filters alerts by severity', async ({ page }) => {
    await page.goto('/');
    const severityOneButton = page.getByRole('button', { name: /Severity 1/i });
    await severityOneButton.click();
    const visibleAlerts = page.locator('.alert-card:visible');
    await expect(visibleAlerts).toHaveCount(1);
    await expect(visibleAlerts.first()).toContainText('API latency spike detected');
    const showAll = page.getByRole('button', { name: /All issues/i });
    await showAll.click();
    await expect(page.locator('.alert-card')).toHaveCount(3);
  });

  test('action buttons provide clear hierarchy', async ({ page }) => {
    await page.goto('/');
    const actionSection = page.getByRole('region', { name: /Next actions/i });
    await expect(actionSection.getByRole('button', { name: /Page now/i })).toHaveClass(
      /primary-btn/
    );
    await expect(actionSection.getByRole('button', { name: /Send digest/i })).toBeVisible();
  });

  test('mobile menu toggles for narrow viewports', async ({ page, browserName }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 420, height: 900 });
    const menuButton = page.getByRole('button', { name: /menu/i });
    await menuButton.click();
    const mobileNav = page.getByRole('navigation', { name: /Primary mobile/i });
    await expect(mobileNav).toBeVisible();
  });
});
