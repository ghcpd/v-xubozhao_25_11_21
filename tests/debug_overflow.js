const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 360, height: 800 } });
  const html = fs.readFileSync(path.join(process.cwd(), 'public', 'fixed.html'), 'utf8');
  await page.setContent(html, { waitUntil: 'load' });

  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  console.log('clientWidth', clientWidth, 'scrollWidth', scrollWidth);

  const oversized = await page.evaluate(() => {
    const limit = document.documentElement.clientWidth;
    const nodes = [];
    document.querySelectorAll('*').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width > limit) nodes.push({ tag: el.tagName, class: el.className, width: Math.round(r.width) });
    });
    return nodes;
  });

  console.log('oversized elements:', oversized);
  await browser.close();
})();
