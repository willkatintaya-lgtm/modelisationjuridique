const { chromium } = require('playwright');
const D = __dirname + '/../', out = D + 'captures/phantom-';
(async()=>{const b=await chromium.launch();const errs=[];
for (const [w,h,tag] of [[1280,800,'d'],[400,800,'m']]){
const p=await b.newPage({viewport:{width:w,height:h}});p.on('pageerror',e=>errs.push(tag+' '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(tag+' '+m.text())});
await p.goto('file://'+D+'boussole-phantom.html');await p.waitForTimeout(900);
if(tag==='m'){await p.locator('#home [data-draft]').first().click();await p.waitForTimeout(600);await p.screenshot({path:out+'i-draft-m.png'});}
await p.locator('#pbody mark.pt').nth(1).click();await p.waitForTimeout(800);await p.screenshot({path:out+'i-unit-'+tag+'.png'});
await p.keyboard.press('Escape');await p.waitForTimeout(300);
await p.locator('#pbody .legal ins[data-h]').first().click();await p.waitForTimeout(600);await p.screenshot({path:out+'i-loupe-'+tag+'.png'});
await p.keyboard.press('Escape');await p.waitForTimeout(300);
await p.locator('#pbody [data-cmd=confirm]').click();await p.waitForTimeout(600);await p.screenshot({path:out+'i-confirm-'+tag+'.png'});
await p.locator('#shf [data-cmd=do-confirm]').click();await p.waitForTimeout(400);
await p.locator('#pbody .tcard:not(.refc) .legal').first().dblclick();await p.waitForTimeout(400);
await p.locator('#ta').press('End');await p.keyboard.type(' et sous réserve');await p.waitForTimeout(300);await p.screenshot({path:out+'i-edit-'+tag+'.png'});
await p.keyboard.press('Control+Enter');await p.waitForTimeout(400);
if(tag==='m'){await p.keyboard.press('Escape');await p.waitForTimeout(500);}
await p.locator('#home [data-am]').first().scrollIntoViewIfNeeded();await p.locator('#home [data-am]').first().click();await p.waitForTimeout(600);await p.screenshot({path:out+'i-am-'+tag+'.png'});
await p.locator('#pbody .pb[data-sel]').click();await p.waitForTimeout(300);
await p.evaluate(()=>{const id=MINE[0].id; window.__x=id;});
await p.locator('#phead [data-cmd=back]').click().catch(()=>{});await p.waitForTimeout(400);
if(tag==='m'){await p.keyboard.press('Escape');await p.waitForTimeout(400);}
await p.locator('#home .act[data-cmd=cmp]').click();await p.waitForTimeout(500);
await p.locator('#pbody [data-pick="1"]').click();await p.waitForTimeout(500);
await p.locator('#shb [data-pickid^="M"]').first().click();await p.waitForTimeout(400);
await p.locator('#pbody [data-cmd=burst]').click();await p.waitForTimeout(500);await p.screenshot({path:out+'i-cmp-'+tag+'.png'});
await p.keyboard.press('/');await p.keyboard.type('CE73');await p.waitForTimeout(400);await p.screenshot({path:out+'i-search-'+tag+'.png'});
await p.keyboard.press('Escape');
await p.mouse.move(w/2,400);
await p.evaluate(()=>allerA('dossier'));await p.waitForTimeout(400);
await p.locator('#home [data-hist]').nth(11).click();await p.waitForTimeout(500);await p.screenshot({path:out+'i-hist-'+tag+'.png'});
await p.evaluate(()=>allerA('enjeux'));await p.waitForTimeout(300);await p.locator('#home [data-cmd=matrice]').first().click();await p.waitForTimeout(500);await p.screenshot({path:out+'i-mx-'+tag+'.png'});
const sw=await p.evaluate(()=>document.documentElement.scrollWidth);if(sw>w+1)errs.push(tag+' hscroll '+sw);
await p.close();}
console.log('errs',errs);await b.close();})();
