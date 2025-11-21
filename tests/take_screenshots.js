const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  const demoFiles = ['buggy.html', 'fixed.html'];
  await Promise.all(demoFiles.map(async (file) => {
    const html = fs.readFileSync(path.join(process.cwd(), 'public', file), 'utf8');
    await page.setContent(html, { waitUntil: 'load' });
    await page.screenshot({ path: `artifacts/${file.replace('.html','')}.png`, fullPage: true });
  }));

  await browser.close();
  console.log('Saved screenshots to artifacts/');
})();
