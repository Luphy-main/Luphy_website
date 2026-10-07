// Usage : node screenshot.mjs <url> [label] [--mobile] [--width N]
import puppeteer from 'puppeteer';
import { mkdir, readdir, readFile } from 'fs/promises';
import { join, resolve } from 'path';

const args = process.argv.slice(2);
const mobile = args.includes('--mobile');

// Extract --width N
let customWidth = null;
const widthIdx = args.indexOf('--width');
if (widthIdx !== -1 && args[widthIdx + 1]) {
  customWidth = parseInt(args[widthIdx + 1], 10);
}

const positional = args.filter((a, i) =>
  a !== '--mobile' && a !== '--width' && (args[i - 1] !== '--width')
);
const [url = 'http://localhost:3000', label] = positional;

const dir = 'temporary screenshots';
await mkdir(dir, { recursive: true });
const n = (await readdir(dir)).filter(f => f.startsWith('screenshot-')).length + 1;
const file = join(dir, `screenshot-${n}${label ? '-' + label : ''}.png`);

// Collect all hashed CSS files from the build output to inject if needed
const cssDir = resolve('.next/static/css');
let hashedCssContent = '';
try {
  const cssFiles = await readdir(cssDir);
  for (const f of cssFiles) {
    if (f.endsWith('.css')) {
      hashedCssContent += await readFile(join(cssDir, f), 'utf8') + '\n';
    }
  }
} catch {
  // No build output available, continue without injection
}

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-color-profile=srgb'],
});
const page = await browser.newPage();

if (mobile) {
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
} else if (customWidth) {
  await page.setViewport({ width: customWidth, height: 900, deviceScaleFactor: 1 });
} else {
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
}

// Intercept 404 CSS requests and serve hashed CSS instead
await page.setRequestInterception(true);
page.on('request', req => {
  const u = req.url();
  if (u.includes('/_next/static/css/') && u.includes('.css') && hashedCssContent) {
    req.respond({ status: 200, contentType: 'text/css; charset=utf-8', body: hashedCssContent });
  } else {
    req.continue();
  }
});

await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
// Let CSS custom properties and fonts settle
await new Promise(r => setTimeout(r, 2000));
// Force-reveal all scroll-animated elements (IntersectionObserver doesn't fire headless)
await page.evaluate(() => {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('v'));
});
await new Promise(r => setTimeout(r, 700));
await page.screenshot({ path: file, fullPage: true });
await browser.close();
console.log(file);
