import { chromium } from '@playwright/test';
import { spawn } from 'child_process';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const screenshotPath = path.join(rootDir, 'artifacts', 'dashboard.png');
const PORT = process.env.UI_PORT || process.env.PORT || '4173';

function waitForServer(url, timeoutMs = 10_000) {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const check = () => {
      const req = http.get(url, (res) => {
        res.resume();
        if (res.statusCode && res.statusCode < 500) {
          resolve(true);
        } else {
          setTimeout(next, 300);
        }
      });

      req.on('error', () => {
        setTimeout(next, 300);
      });
    };

    const next = () => {
      if (Date.now() - start > timeoutMs) {
        reject(new Error('Server did not start in time'));
        return;
      }
      check();
    };

    check();
  });
}

async function main() {
  const server = spawn('node', ['server.js'], {
    cwd: rootDir,
    env: { ...process.env, PORT },
    stdio: 'inherit',
    shell: false
  });

  try {
    await waitForServer(`http://127.0.0.1:${PORT}/health`);
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    await page.goto(`http://127.0.0.1:${PORT}`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: screenshotPath, fullPage: true });
    await browser.close();
  } finally {
    server.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
