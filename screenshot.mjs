// Usage : node screenshot.mjs <url> [label] [--mobile]
import puppeteer from 'puppeteer';
import { mkdir, readdir } from 'fs/promises';
import { join } from 'path';

const args = process.argv.slice(2);
const mobile = args.includes('--mobile');
const [url = 'http://localhost:3000', label] = args.filter(a => a !== '--mobile');
const dir = 'temporary screenshots';
await mkdir(dir, { recursive: true });
const n = (await readdir(dir)).filter(f => f.startsWith('screenshot-')).length + 1;
const file = join(dir, `screenshot-${n}${label ? '-' + label : ''}.png`);

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport(mobile ? { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true } : { width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle0' });
await page.screenshot({ path: file, fullPage: true });
await browser.close();
console.log(file);
