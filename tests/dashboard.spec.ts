import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// Helper to compute contrast ratio between two colors
function luminance(r: number, g: number, b: number) {
  const a = [r, g, b].map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]
}

function contrast(rgb1: [number, number, number], rgb2: [number, number, number]) {
  const L1 = luminance(...rgb1)
  const L2 = luminance(...rgb2)
  const [lighter, darker] = L1 > L2 ? [L1, L2] : [L2, L1]
  return (lighter + 0.05) / (darker + 0.05)
}

const switchToFixed = async (page: any) => {
  await page.getByRole('button', { name: 'Fixed' }).click()
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await switchToFixed(page)
})

test('fixed view has accessible navigation and grouped actions', async ({ page }) => {
  const nav = page.getByRole('navigation', { name: /primary navigation/i })
  await expect(nav).toBeVisible()

  const overviewLink = nav.getByRole('link', { name: /overview/i })
  await expect(overviewLink).toHaveAttribute('aria-current', 'page')

  const actionsGroup = page.getByRole('group', { name: /primary actions/i })
  await expect(actionsGroup).toBeVisible()
  await expect(actionsGroup.getByRole('button')).toHaveCount(3)
})

test('primary action button has sufficient contrast', async ({ page }) => {
  const button = page.getByRole('button', { name: 'Primary Action' })
  const styles = await button.evaluate((el) => {
    const cs = window.getComputedStyle(el as HTMLElement)
    return {
      color: cs.color,
      backgroundColor: cs.backgroundColor,
    }
  })

  const parseRgb = (str: string): [number, number, number] => {
    const match = str.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
    if (!match) throw new Error(`Unexpected color: ${str}`)
    return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)]
  }

  const ratio = contrast(parseRgb(styles.color), parseRgb(styles.backgroundColor))
  expect(ratio).toBeGreaterThanOrEqual(3)
})

test('layout is responsive under 480px (no horizontal scroll)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  const scrollOk = await page.evaluate(() => {
    return document.documentElement.scrollWidth <= window.innerWidth + 1
  })
  expect(scrollOk).toBeTruthy()

  // Cards are stacked and visible
  const cards = page.getByTestId('stats-card')
  await expect(cards).toHaveCount(4)
  for (const card of await cards.elementHandles()) {
    const box = await card.boundingBox()
    expect(box?.width).toBeLessThanOrEqual(375)
  }
})

test('basic accessibility scan (axe) passes critical checks', async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toHaveLength(0)
})

test('capture fixed dashboard screenshot', async ({ page }) => {
  await page.screenshot({ path: 'tests/screenshots/fixed-dashboard.png', fullPage: true })
})
