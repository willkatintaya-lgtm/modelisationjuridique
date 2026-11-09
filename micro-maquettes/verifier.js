// node micro-maquettes/verifier.js <id> [--plein] : pour chaque variante, captures 1280×800 et 400×800, erreurs console, défilement horizontal.
// Captures dans micro-maquettes/captures/ (non versionnées).
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const id = process.argv[2], plein = process.argv.includes('--plein'), dir = __dirname;
fs.mkdirSync(path.join(dir, 'captures'), { recursive: true });
(async () => {
  const b = await chromium.launch(); const errs = [];
  for (const [w, h, tag] of [[1280, 800, 'd'], [400, 800, 'm']]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    p.on('pageerror', e => errs.push(tag + ' ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(tag + ' ' + m.text()); });
    await p.goto('file://' + path.join(dir, id, 'index.html')); await p.waitForTimeout(800);
    const n = await p.evaluate(() => document.querySelectorAll('.variantes [data-v]').length) || 1;
    for (let v = 0; v < n; v++) {
      await p.evaluate(v => window.MMvariante && window.MMvariante(v), v); await p.waitForTimeout(400);
      await p.screenshot({ path: `${dir}/captures/${id}-${String.fromCharCode(65 + v)}-${tag}.png`, fullPage: plein });
      const sw = await p.evaluate(() => document.documentElement.scrollWidth);
      if (sw > w + 1) errs.push(`${tag} variante ${v}: défilement horizontal ${sw}`);
    }
    await p.evaluate(() => window.MMvariante && window.MMvariante(0));
    await p.close();
  }
  console.log(errs.length ? errs.join('\n') : 'aucune erreur'); await b.close();
})();
