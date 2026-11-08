const { chromium } = require('playwright');
const D = __dirname + '/..', C = D + '/captures/raycast-';
(async () => {
  const b = await chromium.launch(); const errs = [];
  const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + D + '/boussole-raycast.html'); await p.waitForTimeout(900);
  await p.screenshot({ path: C + 'i-racine.png' });
  await p.keyboard.type('CE283'); await p.waitForTimeout(300); await p.screenshot({ path: C + 'i-recherche.png' });
  await p.keyboard.press('Escape'); await p.waitForTimeout(100);
  await p.evaluate(() => allerA('atelier')); await p.waitForTimeout(400);
  await p.keyboard.press('Control+k'); await p.waitForTimeout(300); await p.screenshot({ path: C + 'i-actions.png' });
  await p.keyboard.press('Escape');
  await p.locator('.det mark.pt').nth(2).click(); await p.waitForTimeout(400); await p.screenshot({ path: C + 'i-regroupe.png' });
  await p.keyboard.press('Escape'); await p.waitForTimeout(200);
  // un concurrent
  const conc = p.locator('#lst .row', { hasText: 'CF33' }).first(); await conc.click(); await p.waitForTimeout(300); await p.screenshot({ path: C + 'i-concurrent.png' });
  await p.keyboard.press('Control+Enter'); await p.waitForTimeout(400); await p.screenshot({ path: C + 'i-comparer.png' });
  await p.keyboard.press('Escape'); await p.waitForTimeout(200);
  // loupe
  const h = p.locator('.det [data-h]').first(); if (await h.count()) { await h.click(); await p.waitForTimeout(300); await p.screenshot({ path: C + 'i-loupe.png' }); await p.keyboard.press('Escape'); }
  // édition
  await p.locator('#lst .row').first().click(); await p.keyboard.press('Enter'); await p.waitForTimeout(300);
  await p.locator('#f-tx').press('End'); await p.keyboard.type(' et sous réserve de test'); await p.waitForTimeout(200); await p.screenshot({ path: C + 'i-edition.png' });
  await p.keyboard.press('Control+Enter'); await p.waitForTimeout(250); await p.screenshot({ path: C + 'i-toast.png' }); await p.waitForTimeout(500); await p.screenshot({ path: C + 'i-apres.png' });
  // sous-menu référence
  await p.keyboard.press('Control+k'); await p.keyboard.type('référence'); await p.waitForTimeout(150); await p.keyboard.press('Enter'); await p.waitForTimeout(200); await p.screenshot({ path: C + 'i-sousmenu.png' });
  await p.keyboard.press('Escape'); await p.keyboard.press('Escape');
  // enjeux fiche, matrice, réunion, thème clair
  await p.evaluate(() => allerA('enjeux')); await p.keyboard.press('Enter'); await p.waitForTimeout(300); await p.screenshot({ path: C + 'i-theme.png' });
  await p.keyboard.press('Alt+x'); await p.waitForTimeout(300); await p.screenshot({ path: C + 'i-matrice.png' });
  await p.evaluate(() => allerA('reunion')); await p.locator('#lst .row').first().click(); await p.waitForTimeout(300); await p.screenshot({ path: C + 'i-ensemble.png' });
  await p.keyboard.press('Alt+t'); await p.evaluate(() => allerA('atelier')); await p.waitForTimeout(400); await p.screenshot({ path: C + 'i-clair.png' }); await p.keyboard.press('Alt+t');
  await p.evaluate(() => allerA('dossier')); await p.keyboard.press('Control+Escape'); await p.keyboard.press('Alt+m'); await p.waitForTimeout(400); await p.screenshot({ path: C + 'i-compact.png' }); await p.keyboard.press('Alt+m');
  await p.close();
  const m = await b.newPage({ viewport: { width: 400, height: 800 } });
  m.on('pageerror', e => errs.push('m ' + e.message));
  await m.goto('file://' + D + '/boussole-raycast.html'); await m.waitForTimeout(600);
  await m.evaluate(() => allerA('atelier')); await m.waitForTimeout(300);
  await m.locator('#lst .row').first().click(); await m.waitForTimeout(300); await m.screenshot({ path: C + 'i-m-detail.png' });
  await m.keyboard.press('Escape'); const c2 = m.locator('#lst .row', { hasText: 'CF33' }).first(); await c2.click(); await m.waitForTimeout(200); await m.locator('#pill [data-panel]').click(); await m.waitForTimeout(200); await m.screenshot({ path: C + 'i-m-actions.png' });
  await m.locator('.ait', { hasText: 'Comparer avec mon brouillon' }).click(); await m.waitForTimeout(300); await m.screenshot({ path: C + 'i-m-comparer.png' });
  const sw = await m.evaluate(() => document.documentElement.scrollWidth); if (sw > 401) errs.push('m scroll ' + sw);
  console.log(errs.length ? errs.join('\n') : 'aucune erreur'); await b.close();
})();
