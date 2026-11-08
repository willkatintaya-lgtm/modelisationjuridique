const { chromium } = require('playwright');
const dir = __dirname + '/..';
(async()=>{const b=await chromium.launch();const errs=[];
for (const [w,tag] of [[1280,'d'],[400,'m']]){
const p=await b.newPage({viewport:{width:w,height:800}});p.on('pageerror',e=>errs.push(tag+' '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(tag+' '+m.text())});
const shot=async n=>{await p.waitForTimeout(350);await p.screenshot({path:`${dir}/captures/sky-${n}-${tag}.png`});};
await p.goto('file://'+dir+'/boussole-sky.html');await p.waitForTimeout(800);
await p.locator('[data-draft]').first().click();await shot('draft');
console.log(tag,'marks',await p.locator('mark.pt').count());
await p.locator('mark.pt').first().click();await shot('unit');
await p.keyboard.press('Escape');

await p.locator('.dbl .legal').dblclick({position:{x:5,y:5}});await p.locator('#ta').press('End');await p.keyboard.type(' sous réserve test');await shot('edit');
await p.keyboard.press('Escape');
await p.evaluate(()=>scrollTo(0,1500));await p.waitForTimeout(200);await shot('draft2');
await p.locator('.trow[data-am]').first().click();await shot('am');await p.evaluate(()=>{const e=[...document.querySelectorAll('.legal del[data-h],.legal ins[data-h]')].find(x=>!x.closest('mark'));e.scrollIntoView({block:'center'});});await p.evaluate(()=>{const e=[...document.querySelectorAll('.legal del[data-h],.legal ins[data-h]')].find(x=>!x.closest('mark'));e.click();});await shot('loupe');await p.keyboard.press('Escape');
await p.locator('[data-cmpwith]').click();await shot('cmp');await p.evaluate(()=>window.allerA('atelier'));await p.locator('[data-esp=atelier]').click();await p.locator('[data-draft]').first().click();await p.locator('[data-open=cmp]').first().click();await p.locator('[data-cmd=cmp-go]').click();await p.waitForTimeout(700);await shot('cmp3');
await p.evaluate(()=>window.allerA('dossier'));await p.locator('[data-hist]').nth(11).click();await shot('hist');
await p.evaluate(()=>window.allerA('enjeux'));await p.locator('[data-th]').first().click();await shot('theme');
await p.evaluate(()=>{window.allerA('enjeux');});await p.evaluate(()=>scrollTo(0,99999));await shot('matrice');
await p.evaluate(()=>window.allerA('atelier'));await p.locator('[data-esp=atelier]').click();await p.locator('[data-cmd=menu]').click();await shot('menu');await p.locator('#menu [data-cmd=confirm]').click();await shot('confirm');
await p.keyboard.press('Escape');await p.keyboard.press('/');await p.keyboard.type('CE5');await shot('search');
await p.keyboard.press('Escape');await p.evaluate(()=>scrollTo(0,99999));await shot('atelier-bas');
await p.evaluate(()=>window.allerA('reunion'));await p.evaluate(()=>scrollTo(0,800));await shot('reunion2');
const sw=await p.evaluate(()=>document.documentElement.scrollWidth); if(sw>w+1) errs.push(tag+' hscroll '+sw);
await p.close();}
console.log('errs',errs);await b.close();})();
