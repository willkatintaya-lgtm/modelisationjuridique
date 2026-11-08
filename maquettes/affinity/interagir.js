const { chromium } = require('playwright');
const D = __dirname + '/../captures/';
(async()=>{const b=await chromium.launch();const errs=[];
for (const [w,tag] of [[1280,'d'],[400,'m']]){
const p=await b.newPage({viewport:{width:w,height:800}});p.on('pageerror',e=>errs.push(tag+' '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(tag+' '+m.text())});
await p.goto('file://'+__dirname+'/../boussole-affinity.html');await p.waitForTimeout(900);
await p.evaluate(()=>allerA('atelier'));await p.waitForTimeout(300);
console.log(tag,'marks',await p.locator('#canvas mark.pt').count());
await p.locator('#canvas mark.pt').nth(1).click();await p.waitForTimeout(400);await p.screenshot({path:D+`affinity-x-insp-${tag}.png`});
await p.keyboard.press('Escape');await p.waitForTimeout(200);
if(tag==='m'){await p.locator('[data-cmd=sheet-right]').click();await p.waitForTimeout(300);await p.screenshot({path:D+`affinity-x-sheet-${tag}.png`});}
await p.locator('#right .prow[data-am]').nth(2).click();await p.waitForTimeout(500);await p.screenshot({path:D+`affinity-x-am-${tag}.png`});
await p.locator('[data-cmp-with]').first().click();await p.waitForTimeout(400);await p.screenshot({path:D+`affinity-x-cmp-${tag}.png`});
await p.keyboard.press('Escape');await p.waitForTimeout(200);await p.keyboard.press('Escape');await p.waitForTimeout(200);
await p.locator('.lay.mine .mine-t').dblclick({position:{x:4,y:8}});await p.waitForTimeout(300);await p.locator('#ta').press('End');await p.keyboard.type(' test ajouté');await p.waitForTimeout(200);await p.screenshot({path:D+`affinity-x-edit-${tag}.png`});
await p.keyboard.press('Control+Enter');await p.waitForTimeout(300);
await p.keyboard.press('a');await p.waitForTimeout(300);await p.screenshot({path:D+`affinity-x-article-${tag}.png`});
await p.evaluate(()=>allerA('reunion'));await p.keyboard.press('b');await p.waitForTimeout(300);await p.screenshot({path:D+`affinity-x-bande-${tag}.png`});
await p.evaluate(()=>allerA('enjeux'));await p.keyboard.press('m');await p.waitForTimeout(300);await p.screenshot({path:D+`affinity-x-mat-${tag}.png`});
await p.locator('[data-cmd=about]').click();await p.waitForTimeout(300);await p.screenshot({path:D+`affinity-x-about-${tag}.png`});await p.keyboard.press('Escape');
await p.evaluate(()=>{localStorage.clear()});
const sw=await p.evaluate(()=>document.documentElement.scrollWidth);if(sw>w+1)errs.push(tag+' hscroll '+sw);
await p.close();}
console.log('errs',errs);await b.close();})();
