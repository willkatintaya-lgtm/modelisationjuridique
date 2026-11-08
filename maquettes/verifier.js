// node verifier.js <nom> : captures 1280×800 et 400×800 des quatre espaces, erreurs console
const { chromium } = require('playwright');
const nom = process.argv[2], dir = __dirname;
(async () => {
  const b = await chromium.launch(); const errs = [];
  for (const [w, h, tag] of [[1280, 800, 'd'], [400, 800, 'm']]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    p.on('pageerror', e => errs.push(tag + ' ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(tag + ' ' + m.text()); });
    await p.goto('file://' + dir + '/boussole-' + nom + '.html'); await p.waitForTimeout(1200);
    for (const esp of ['dossier', 'atelier', 'enjeux', 'reunion']) {
      await p.evaluate(e => window.allerA && window.allerA(e), esp); await p.waitForTimeout(700);
      await p.screenshot({ path: `${dir}/captures/${nom}-${esp}-${tag}.png` });
    }
    const sw = await p.evaluate(() => document.documentElement.scrollWidth);
    if (sw > w + 1) errs.push(tag + ' défilement horizontal ' + sw);
    await p.close();
  }
  console.log(errs.length ? errs.join('\n') : 'aucune erreur'); await b.close();
})();
