/* Boussole — la scène : rendu, transitions, poignées, coffre, éclatement, loupe, édition, sas, directions, gestes. */
"use strict";
const stage = $("#stage"), view = $("#view");
const hTop = $("#hTop"), hLeft = $("#hLeft"), hRight = $("#hRight"), rail = $("#rail"), side = $("#side");
let CUR = {spec: null, layer: null, drum: null};

/* ---------- rendu ---------- */
const curFace = () => CUR.drum ? CUR.drum.faces[CUR.drum.cur] : CUR.layer && CUR.layer.querySelector(".sheet");
const curSid = () => { const f = curFace(); return f ? f.dataset.sid : null; };
function render(kind){
  if (S.edit) closeEditor(false, true);
  const sp = BUILD[S.r]();
  const old = CUR.layer, oldFace = curFace(), oldSid = oldFace && oldFace.dataset.sid, oldRect = oldFace && kind && kind[0] === "r" ? oldFace.getBoundingClientRect() : null;
  const layer = document.createElement("div");
  layer.className = "layer" + (sp.pile ? " has-pile" : "") + (sp.html ? " has-html" : "");
  layer.innerHTML = (sp.title || "") + (sp.above ? `<div class="above"></div>` : "") + (sp.pile ? `<div class="drum"></div>` : "") + (sp.html || "");
  view.appendChild(layer);
  const drum = sp.pile ? new Drum(layer.querySelector(".drum"), i => { if (sp.onMove) sp.onMove(i); onMove(); }) : null;
  CUR = {spec: sp, layer, drum};
  if (drum) drum.set(sp.pile, sp.focus || 0);
  refreshAbove(true);
  transition(layer, old, kind, oldSid, oldRect, oldFace);
  renderSide(); chrome();
  store.set("r", S.r);
}
function onMove(){ chrome(); }
function refreshAbove(init){
  const sp = CUR.spec, ab = CUR.layer && CUR.layer.querySelector(".above"); if (!ab) return;
  const html = sp.above ? sp.above() : "";
  ab.innerHTML = html; ab.classList.toggle("on", !!html);
  if (CUR.drum) CUR.drum.fade(html ? 0 : 1);
}
function transition(layer, old, kind, oldSid, oldRect, oldFace){
  const done = () => { if (old && old.parentNode) old.remove(); };
  if (!old){ return; }
  old.classList.add("leaving");
  if (reduced || !kind || !layer.animate){ done(); return; }
  const E = {duration: 420, easing: "cubic-bezier(.2,.8,.2,1)"};
  const tf = {"h+": ["translateX(42%)", "translateX(-42%)"], "h-": ["translateX(-42%)", "translateX(42%)"], "z+": ["scale(.86)", "scale(1.16)"], "z-": ["scale(1.16)", "scale(.86)"], "r+": ["translateY(26%)", "translateY(-18%)"], "r-": ["translateY(-26%)", "translateY(18%)"]}[kind] || ["none", "none"];
  layer.animate([{opacity: 0, transform: tf[0]}, {opacity: 1, transform: "none"}], E);
  const a = old.animate([{opacity: 1, transform: "none"}, {opacity: 0, transform: tf[1]}], E); a.onfinish = done; setTimeout(done, 600);
  // la feuille courante voyage d'un rangement à l'autre (S6) : un fantôme part de son ancienne place vers la nouvelle
  if (kind[0] === "r" && oldRect && oldFace){
    const nf = curFace(); if (!nf || nf.dataset.sid !== oldSid) return;
    const nr = nf.getBoundingClientRect(); if (!nr.width) return;
    const g = oldFace.cloneNode(true); g.classList.add("ghost"); g.removeAttribute("style");
    Object.assign(g.style, {position: "fixed", left: oldRect.left + "px", top: oldRect.top + "px", width: oldRect.width + "px", height: oldRect.height + "px", margin: 0, zIndex: 60, pointerEvents: "none", transformOrigin: "0 0"});
    document.body.appendChild(g);
    nf.style.visibility = "hidden";
    const sx = nr.width / oldRect.width, sy = nr.height / oldRect.height;
    const ga = g.animate([{transform: "none", opacity: 1}, {transform: `translate(${nr.left - oldRect.left}px,${nr.top - oldRect.top}px) scale(${sx},${sy})`, opacity: 1}], {duration: 500, easing: "cubic-bezier(.2,.8,.2,1)"});
    const fin = () => { g.remove(); nf.style.visibility = ""; if (CUR.drum) CUR.drum.layout(); };
    ga.onfinish = fin; setTimeout(fin, 700);
  }
}

/* ---------- poignées, aide, repères, index ---------- */
function setHandle(h, html){ h.classList.toggle("hide", html == null); h.setAttribute("aria-hidden", String(html == null)); h.tabIndex = html == null ? -1 : 0; if (html != null) h.innerHTML = html; }
function chrome(){
  const sp = CUR.spec || {}, chev = ` <span class="chev">▲</span>`;
  setHandle(hTop, S.edit ? null : topHandle());
  setHandle(hLeft, S.edit || !sp.left ? null : sp.left + chev);
  setHandle(hRight, S.edit || !sp.right ? null : sp.right + chev);
  $("#hint").innerHTML = S.edit ? "<b>Échap</b> : annuler · <b>Ctrl+Entrée</b> : valider" : (sp.hint || "");
  const d = CUR.drum;
  rail.innerHTML = d && d.n > 1 && d.n <= 24 && !S.edit ? (sp.rail || d.faces.map((_, j) => "Feuille " + (j + 1))).map((l, j) => `<button type="button" data-i="${j}" class="${j === d.cur ? "on" : ""}" aria-label="${esc(l)}" title="${esc(l)}"></button>`).slice(0, 60).join("") : "";
  const R = RANGEMENTS();
  $("#rangements").innerHTML = R.map((r, k) => `<button type="button" data-rg="${r.id}" class="${r.id === S.r ? "on" : ""}" title="Rangement : ${esc(r.label)} (touche ${k + 1})">${esc(r.id === S.r ? r.label.toUpperCase() : r.label)}</button>`).join(`<span class="dot">·</span>`);
  renderCoffre();
  $("#refInfo").innerHTML = `référence vierge : <b>${esc(refShort())}</b>`;
  stage.classList.toggle("editing", !!S.edit);
  stage.dataset.r = S.r;
}
function renderSide(){
  const sp = CUR.spec || {};
  if (sp.side === "units" && !S.edit){
    const o = curAlE(), U = unitsOf(o);
    side.innerHTML = `<p class="units-t">Passages disputés · al. ${o}</p>` + (U.length ? U.map(u => `<button type="button" data-unit="${u.k}" title="Toutes les propositions sur ce passage"><span><i class="w${unitWeight(u.n)}"></i>« ${esc(u.label)} »</span><small>${u.n} ${plural(u.n, "proposition", "propositions")}</small></button>`).join("") : `<span class="units-none">Aucun passage disputé : seuls des alinéas entiers sont visés.</span>`);
    side.classList.remove("hide");
  } else if (sp.side === "themes"){
    side.innerHTML = `<p class="units-t">Thèmes</p>` + THEMES.map((t, k) => `<button type="button" data-th="${k}" class="${k === S.t.theme ? "on" : ""}"><span>${esc(t.label)}</span><small>${t.src} · ${t.amendements.length} amendements</small></button>`).join("");
    side.classList.remove("hide");
  } else { side.classList.add("hide"); side.innerHTML = ""; }
}

/* ---------- navigation ---------- */
function setScale(sc, kind){ const st = S.r === "ecrire" ? S.e : S.r === "derouleur" ? S.d : S.r === "histoire" ? S.h : S.t; st.scale = sc; render(kind); }
function zoomStep(dir, unitK){
  const L = SCALES[S.r](), i = L.indexOf(curScale());
  let j = clamp(i + (dir < 0 ? 1 : -1), 0, L.length - 1);
  if (S.r === "ecrire" && L[j] === "unite"){
    if (S.e.volet === -1) return;
    if (!unitsOf(curAlE()).length) return;
    if (unitK != null) S.e.unit = unitK;
  }
  if (i === j) return;
  setScale(L[j], dir < 0 ? "z-" : "z+");
}
function sideStep(dir){
  if (S.edit) return;
  if (S.r === "ecrire"){ const v = clamp(S.e.volet + dir, -1, 1); if (v === S.e.volet) return; S.e.volet = v; if (v === 0) S.e.al = null; if (v === -1 && curScale() === "unite") S.e.scale = "alinea"; render(dir > 0 ? "h+" : "h-"); }
  else if (S.r === "themes" && curScale() !== "matrice"){ const v = clamp(S.t.volet + dir, -1, 1); if (v === S.t.volet) return; S.t.volet = v; render(dir > 0 ? "h+" : "h-"); }
  else if (S.r === "histoire" && curScale() === "alinea"){ const l = clamp(S.h.line + dir, 0, LINES.length - 1); if (l === S.h.line) return; S.h.line = l; render(dir > 0 ? "h+" : "h-"); }
}
function focusOn(sid){
  if (!sid) return;
  const [k, id, x] = sid.split(":");
  const a = k === "a" ? AM[id] : null, m = k === "m" ? MINE.find(y => y.id === id) : null;
  const o = a ? (a.cible.al || (a.spans[0] || {}).al || (a.applique.rows[0] || {}).o || 12) : m ? m.al : k === "e" && x && /^\d+$/.test(x) ? +x : null;
  if (S.r === "ecrire"){
    if (a){ S.e.volet = 1; S.e.al = o; S.e.otherSid = sid; if (!["alinea", "face", "article"].includes(S.e.scale)) S.e.scale = "alinea"; }
    else if (m){ S.e.volet = 0; S.e.mine = MINE.indexOf(m); S.e.al = null; if (S.e.scale !== "face") S.e.scale = "alinea"; }
    else if (o){ const mm = MINE.findIndex(y => y.al === o); if (mm >= 0){ S.e.volet = 0; S.e.mine = mm; S.e.al = null; } else { S.e.volet = 1; S.e.al = o; } S.e.scale = "alinea"; }
  } else if (S.r === "derouleur" && a){
    const P = places(); const i = P.findIndex(p => p.ams.includes(a.id) || a.chuteDans === p.id); S.d.place = i >= 0 ? i : P.length - 1;
  } else if (S.r === "histoire" && o){
    if (LINE_OF_T[o] != null) S.h.line = LINE_OF_T[o];
    if (k === "e" && id && HIST_ET().includes(id)) S.h.et = HIST_ET().indexOf(id); else S.h.et = 2;
    S.h.scale = "alinea";
  } else if (S.r === "themes"){
    if (a){ const ti = THEMES.findIndex(t => t.amendements.includes(a.id)); if (ti >= 0){ S.t.theme = ti; S.t.volet = 1; S.t.scale = "theme"; const L = pileUnits(THEMES[ti].amendements.map(z => AM[z]).filter(z => z && !isEcarte(z)), S.ord); S.t.other = Math.max(0, L.findIndex(u => u.members.includes(a))); } }
    else if (o){ const ti = THEMES.findIndex(t => themeAls(t).includes(o)); if (ti >= 0){ S.t.theme = ti; S.t.volet = 0; S.t.scale = "theme"; S.t.pos = themeAls(THEMES[ti]).indexOf(o); } }
  }
}
function setRangement(id, sid){
  if (S.edit) closeEditor(false, true);
  const R = RANGEMENTS().map(r => r.id); if (!R.includes(id) || id === S.r) return;
  const dir = R.indexOf(id) > R.indexOf(S.r) ? "r+" : "r-";
  sid = sid || curSid();
  S.r = id; focusOn(sid);
  render(dir);
}
function goTo(sid){
  if (!sid) return;
  if (S.r === "ecrire"){ focusOn(sid); render("z-"); return; }
  if (S.r === "themes" && curScale() !== "matrice" && sid.startsWith("a:")){ setRangement("ecrire", sid); return; }
  setRangement("ecrire", sid);
}
function back(){
  for (const id of ["refmenu", "tiroir", "loupe", "calque", "sas", "dirs", "burst"]) if ($("#" + id).classList.contains("on")){ closeOverlay(id); return; }
  if (S.edit){ closeEditor(false); return; }
  const f = curFace(); if (f && f.classList.contains("flipped")){ flip(f); return; }
  const def = {ecrire: "alinea", derouleur: "place", histoire: "alinea", themes: "theme", plan: "plan"}[S.r];
  const L = SCALES[S.r](), i = L.indexOf(curScale()), j = L.indexOf(def);
  if (i !== j && j >= 0){ setScale(def, i > j ? "z+" : "z-"); return; }
  if (S.r === "ecrire" && S.e.volet !== 0){ sideStep(S.e.volet > 0 ? -1 : 1); return; }
  if (S.r === "themes" && S.t.volet !== 0){ sideStep(S.t.volet > 0 ? -1 : 1); return; }
}

/* ---------- verso ---------- */
function flip(f){
  if (!f || !on("L3")) return;
  const r = f.querySelector(".recto"), v = f.querySelector(".verso"); if (!r || !v) return;
  const toV = !f.classList.contains("flipped"), sid = f.dataset.sid;
  const swap = () => { f.classList.toggle("flipped", toV); r.hidden = toV; v.hidden = !toV; if (toV) S.flipped.add(sid); else S.flipped.delete(sid); if (CUR.drum) CUR.drum.layout(); };
  if (reduced || !f.animate){ swap(); return; }
  const base = f.style.transform || "";
  const a = f.animate([{transform: base}, {transform: base + " scaleX(0.02)"}], {duration: 160, easing: "ease-in"});
  a.onfinish = () => { swap(); f.animate([{transform: (f.style.transform || "") + " scaleX(0.02)"}, {transform: f.style.transform || ""}], {duration: 200, easing: "ease-out"}); };
}

/* ---------- coffre et éclatement (L1) ---------- */
function resolveSid(sid){
  const [k, id, x] = sid.split(":");
  if (k === "m"){ const m = MINE.find(y => y.id === id); if (!m) return null; return {sid, label: "Vous · " + draftNum(m).toLowerCase(), short: "Vous (al. " + m.al + ")", color: GR[ME].color, ver: verOfDraft(m), scope: new Set([m.al])}; }
  if (k === "a"){ const a = AM[id]; if (!a) return null; const w = who(a), v = verOfAmendment(a); const sc = verTouched(v); return {sid, label: `${w.name} · ${a.num}`, short: a.num, color: w.color, inst: w.inst, sub: w.sub, ver: v, scope: sc.size && a.mode !== "rediger-article" ? sc : null}; }
  if (k === "art"){ const A = articleVersions().find(y => y.id === sid.slice(4)); if (!A) return null; return {sid, label: A.label, short: A.label.split(" ")[0], color: A.color, inst: A.inst, sub: A.sub, ver: A.ver, scope: null}; }
  if (k === "e"){ if (!ET[id]) return null; const v = verOfEtape(id); return {sid, label: ET[id].label, short: ET[id].court, color: "#6b6457", ver: v, scope: x && /^\d+$/.test(x) ? new Set([+x]) : null}; }
  return null;
}
function renderCoffre(){
  const el = $("#coffre"); if (!on("L1")){ el.innerHTML = ""; el.classList.add("hide"); return; }
  el.classList.remove("hide");
  const items = S.coffre.map(resolveSid).filter(Boolean);
  el.innerHTML = `<span class="coffre-t">coffre <b>${items.length}</b>/2</span>` + items.map(it => `<span class="pastille" style="--g:${it.color}"><i></i>${esc(short(it.short, 18))}<button type="button" data-x="${esc(it.sid)}" aria-label="Retirer">×</button></span>`).join("")
    + `<button type="button" class="tiroir-b" data-tiroir title="Le tiroir : toutes les rédactions d'ici">tiroir ▾</button><button type="button" class="btn sm" data-cmp ${items.length ? "" : "disabled"}>Comparer</button>`;
}
function toggleCoffre(sid){
  const k = S.coffre.indexOf(sid);
  if (k >= 0) S.coffre.splice(k, 1);
  else if (S.coffre.length >= 2){ const c = $("#coffre"); c.classList.remove("flash"); void c.offsetWidth; c.classList.add("flash"); return; }
  else S.coffre.push(sid);
  $$(`[data-coffre]`).forEach(b => b.textContent = S.coffre.includes(b.dataset.coffre) ? "✓" : "⊕");
  renderCoffre(); renderTiroir();
}
function tiroirItems(){
  const o = curAlE(), L = [];
  MINE.filter(m => m.al === o).forEach(m => L.push("m:" + m.id));
  concurrents(o, S.ord).units.forEach(u => L.push("a:" + u.lead.id));
  ["S-com", "transmis", "AN-com"].forEach(e => L.push(`e:${e}:${o}`));
  articleVersions().forEach(A => L.push("art:" + A.id));
  return [...new Set(L)];
}
function renderTiroir(){
  const el = $("#tiroirIn"); if (!$("#tiroir").classList.contains("on")) return;
  el.innerHTML = `<p class="loupe-title">Le tiroir · alinéa ${curAlE()} · <b>${S.coffre.length}</b>/2 dans le coffre</p><div class="tlist">` + tiroirItems().map(sid => { const it = resolveSid(sid); if (!it) return ""; const inn = S.coffre.includes(sid); return `<button type="button" class="titem paper${inn ? " on" : ""}" data-coffre="${esc(sid)}">${badge({name: it.label, color: it.color, inst: it.inst, sub: it.sub})}<small>${it.scope ? "alinéa " + [...it.scope].join(", ") : "article entier"}${inn ? " · ✓ dans le coffre" : ""}</small></button>`; }).join("") + `</div><button type="button" class="btn" data-close="tiroir">Fermer</button>`;
}
function openBurst(){
  const items = S.coffre.map(resolveSid).filter(Boolean); if (!items.length) return;
  let scope = new Set(); for (const it of items){ if (!it.scope){ scope = null; break; } it.scope.forEach(o => scope.add(o)); }
  $("#burstTitle").innerHTML = `<b>${items.map(it => esc(it.short)).join("</b> et <b>")}</b> face à : ${esc(refShort())}${scope ? ` · ${plural(scope.size, "alinéa", "alinéas")} ${[...scope].sort((a, b) => a - b).join(", ")}` : " · l'article entier"}`;
  $("#burstIn").innerHTML = `<div class="burst-scroll">${columnsHTML(items, scope)}</div>`;
  openOverlay("burst");
}

/* ---------- surcouches ---------- */
function openOverlay(id){
  const el = $("#" + id); el.classList.add("on"); el.setAttribute("aria-hidden", "false");
  const box = el.querySelector(".panel,.overlay-in") || el; box.tabIndex = -1; box.scrollTop = 0; box.focus({preventScroll: true});
}
function closeOverlay(id){ const el = $("#" + id); el.classList.remove("on"); el.setAttribute("aria-hidden", "true"); }
const anyOverlay = () => ["refmenu", "tiroir", "loupe", "calque", "sas", "dirs", "burst"].some(id => $("#" + id).classList.contains("on"));
function openLoupe(id){
  const h = HUNKS.get(+id); if (!h) return;
  const ctx = t => t ? `<span class="ctx">${esc(t)}</span>` : "";
  const refPart = h.seg.filter(o => o.type === "del").map(o => o.text).join("");
  const left = ctx(h.before) + esc(refPart) + ctx(h.after), right = ctx(h.before) + renderOps(h.seg) + ctx(h.after);
  const card = (color, label, body, empty) => `<section class="lc paper"><div class="head">${badge({name: label, color})}</div><p${empty ? ' class="none"' : ""}>${body}</p></section>`;
  $("#loupeTitle").innerHTML = `Modification · <b>${esc(h.meta.where || "")}</b>`;
  $("#loupeCols").innerHTML = card("#6b6457", h.meta.refLabel || refLabel(), left.trim() ? left : "(rien à cet endroit)", !left.trim()) + card(h.meta.color, h.meta.label, right);
  openOverlay("loupe");
}
function openRefMenu(btn){
  const el = $("#refmenu"), r = btn.getBoundingClientRect();
  el.innerHTML = `<p class="units-t">La référence vierge</p>` + D.etapes.map(e => `<button type="button" data-setref="${e.id}" class="${e.id === REF ? "on" : ""}"><span>${esc(e.label)}</span><small>${esc(e.chambre)}${e.id === "transmis" ? " · par défaut : le texte que la commission examine" : ""}</small></button>`).join("");
  el.style.left = clamp(r.left - 120, 8, innerWidth - 300) + "px"; el.style.top = clamp(r.bottom + 6, 8, innerHeight - 260) + "px";
  openOverlay("refmenu");
}
function openDirs(){
  $("#dirsIn").innerHTML = `<div class="head"><span>Les directions du modèle</span><span>éliminer d'un geste</span></div><p class="lead">Chaque allègement (L) et chaque direction (D) se coupe ici, à l'œil. Rien n'est supprimé : on rallume quand on veut. Touche D.</p><div class="dlist">`
    + DIRS.map(d => `<label class="drow${d.off ? " off" : ""}"><input type="checkbox" data-dir="${d.id}"${DIR[d.id] ? " checked" : ""}${d.off ? " disabled" : ""}><span><b>${d.id} · ${esc(d.t)}</b><small>${esc(d.d)}</small></span></label>`).join("")
    + `</div><div class="foot"><button type="button" data-dirall="1">Tout allumer</button><button type="button" data-dirall="0">Tout éteindre</button><button type="button" class="primary" data-close="dirs">Fermer</button></div>`;
  openOverlay("dirs");
}
function setDir(id, v){
  DIR[id] = v; DIR.D6 = false; store.set("dirs", DIR);
  if (!RANGEMENTS().some(r => r.id === S.r)) S.r = "ecrire";
  if (!on("L1")) S.coffre = [];
  render(null);
}
// « et si celle-ci passait ? » : calculé par l'outil, posé sur calque (D3)
function openCalque(id){
  const a = AM[id]; if (!a) return;
  const ov = (x, y) => x.spans.some(s => y.spans.some(t => s.al === t.al && ((s.whole && t.whole) || (!s.whole && !t.whole && s.a < t.b && t.a < s.b))));
  const pos = {Premier: 0, Milieu: 1, Dernier: 2};
  const same = a.ident ? ALL.filter(x => x !== a && x.ident === a.ident) : [];
  const falls = ALL.filter(x => x !== a && !isEcarte(x) && !same.includes(x) && ((a.dc && x.dc === a.dc && (pos[x.dcPos] || 0) >= (pos[a.dcPos] || 0)) || ov(x, a)));
  const w = who(a), v = verOfAmendment(a), meta = {label: `${w.name} · ${a.num}`, color: w.color, refLabel: refLabel(), where: "si adopté"};
  $("#calqueIn").innerHTML = `<div class="head"><span>Calque · provisoire, calculé par l'outil</span><span>${a.num}</span></div>`
    + `<p class="lead">Et si ${esc(a.num)} (${esc(w.name)}) était adopté ? En réalité : ${esc(sortWord(a))}.</p>`
    + vsec("Adoptés avec lui (identiques)", same.length ? `<p>${same.map(x => `<button type="button" class="lnk" data-goto="a:${x.id}">${x.num}</button> ${esc(who(x).name)}`).join(" · ")}</p>` : "")
    + vsec("Tomberaient (même discussion commune, ou même passage)", falls.length ? `<p>${falls.map(x => `<button type="button" class="lnk" data-goto="a:${x.id}">${x.num}</button> <small>${esc(who(x).name)} · en réalité ${esc(sortWord(x))}</small>`).join("<br>")}</p>` : `<p class="none">Aucun concurrent direct.</p>`)
    + vsec("Le texte deviendrait", `<div class="calque-txt">${versionBody(v, verTouched(v), meta, true)}</div>`)
    + `<div class="foot"><span>Règle simple : une rédaction adoptée fait tomber celles qui la suivent dans sa discussion commune et celles qui touchent le même passage.</span><button type="button" class="primary" data-close="calque">Fermer</button></div>`;
  openOverlay("calque");
}

/* ---------- sas de confirmation (D9) : la frontière entre écrire et explorer ---------- */
function checks(m){
  const out = [], o = m.al, mine = m.mode === "supprimer" ? null : m.texte, ref = TRANSMIS[o - 1];
  out.push({lv: "ok", t: "Lien avec le texte (article 45)", d: `Il modifie l'alinéa ${o} de l'article 4 : lien direct avec le texte examiné.`});
  const ops = m.mode === "rediger" ? diffOps(ref, m.texte) : [];
  const delW = ops.filter(x => x.type === "del").map(x => x.text).join(" "), insW = ops.filter(x => x.type === "ins").map(x => x.text).join(" ");
  const pct = s => (s.match(/(\d+)\s*%/g) || []).map(x => parseInt(x));
  const lowers = pct(delW).some(p => pct(insW).some(q => q < p));
  const widens = /au moins|subordonn|condition|ne peut|dans la limite|plafonn|à l['’]exclusion/.test(delW) || lowers || (m.mode === "supprimer" && /subordonn|au moins|ne peut/.test(ref));
  const irr40 = ALL.filter(a => touchesAl(a, o) && /Gage|Charge|Irrecevable 40/.test((a.sousEtat || "") + " " + (a.etat || ""))).length;
  if (m.gage) out.push({lv: "ok", t: "Recevabilité financière (article 40)", d: "Un gage est ajouté à la fin de l'article."});
  else if (widens) out.push({lv: "warn", t: "Recevabilité financière (article 40)", d: `Votre rédaction semble élargir l'avantage fiscal (une condition ou un seuil recule) : perte de recettes probable. Un gage est d'usage.${irr40 ? ` En commission, ${irr40} ${plural(irr40, "amendement")} sur cet alinéa ${irr40 > 1 ? "ont" : "a"} buté sur l'article 40.` : ""}`, act: "gage"});
  else out.push({lv: "ok", t: "Recevabilité financière (article 40)", d: "Pas d'élargissement repéré : votre texte ajoute ou resserre une condition. (Heuristique : le contrôle réel est fait par les services.)"});
  const myV = verOfDraft(m), myT = myV.rows.has(o) ? myV.rows.get(o) : (myV.ins.get(o) || [])[0];
  const dup = ALL.filter(a => !isEcarte(a) && (() => { const v = verOfAmendment(a); if (m.mode === "inserer") return (v.ins.get(o) || []).some(t => sameText(t, m.texte)); return v.rows.has(o) && (v.rows.get(o) == null ? mine == null : mine != null && sameText(v.rows.get(o), mine)); })());
  if (dup.length){ const lead = dup.find(a => a.sort === "Adopté") || dup[0]; out.push({lv: "warn", t: "Doublon", d: `Même effet sur l'alinéa ${o} que ${lead.num} (${who(lead).name}, ${sortWord(lead)})${dup.length > 1 ? ` et ${dup.length - 1} ${plural(dup.length - 1, "autre")}` : ""}${lead.applique.rows.length > 1 ? ` — qui touche aussi ${plural(lead.applique.rows.length - 1, "un autre alinéa", "d'autres alinéas")}` : ""}. Cosigner plutôt ?`, go: "a:" + lead.id}); }
  const anc = textAt("AN-com", o);
  if (m.mode !== "inserer" && ((mine == null && !anc) || (mine != null && anc && sameText(mine, anc)))) out.push({lv: "info", t: "Déjà satisfait", d: "Le texte de la commission produit déjà ce résultat : en séance, cet amendement viserait un alinéa qui a changé."});
  const U = unitsOf(o).filter(u => [...u.ids].includes(m.id)), rivals = [...new Set(U.flatMap(u => [...u.ids].filter(id => id[0] !== "M")))];
  if (rivals.length) out.push({lv: "info", t: "Concurrence", d: `Sur le même passage : ${rivals.slice(0, 8).map(id => `${id} (${who(AM[id]).name}, ${sortWord(AM[id])})`).join(", ")}${rivals.length > 8 ? "…" : ""}. Probable discussion commune.`});
  if (on("D4")){ const {log} = applyToCode(verAlineas(myVer())); const ko = log.filter(e => e.statut === "échec"); out.push(ko.length ? {lv: "warn", t: "Renvois et application au code", d: `${ko.length} ${plural(ko.length, "instruction ne s'applique", "instructions ne s'appliquent")} pas au code : ${ko.map(e => esc(short(e.texte, 80)) + " (" + e.detail + ")").join(" ; ")}`} : {lv: "ok", t: "Renvois et application au code", d: `Les ${log.length} instructions de votre version de l'article s'appliquent à l'article 31 du CGI.`}); }
  return out;
}
function openSas(id){
  const m = MINE.find(x => x.id === id); if (!m) return;
  const C = checks(m), disp = genDispositif(m);
  $("#sasIn").innerHTML = `<div class="head">${badge(myWho())}<span>${esc(draftNum(m))} · ${D.article.num}, alinéa ${m.al}</span></div>`
    + `<h3 class="sas-h">Confirmer l'amendement ?</h3><p class="lead">C'est la frontière entre écrire et explorer : voici ce qui serait déposé, et ce que l'outil y voit.</p>`
    + vsec("Dispositif", `<p class="disp">${esc(disp.text)}</p>`)
    + vsec("Contrôles", `<ul class="checks">${C.map(c => `<li class="lv-${c.lv}"><b>${c.lv === "ok" ? "✓" : c.lv === "warn" ? "!" : "i"} ${esc(c.t)}</b> ${esc(c.d)}${c.act === "gage" ? ` <button type="button" data-addgage="${m.id}">Ajouter le gage</button>` : ""}${c.go ? ` <button type="button" class="lnk" data-goto="${c.go}">voir</button>` : ""}</li>`).join("")}</ul>`)
    + `<div class="foot"><span>Simulation : rien n'est transmis à l'Assemblée.</span><button type="button" data-close="sas">Revenir à l'écriture</button><button type="button" class="primary" data-confirm="${m.id}">${m.confirme ? "Retirer la confirmation" : "Confirmer"}</button></div>`;
  openOverlay("sas");
}

/* ---------- édition en place ---------- */
function caretOffset(e, root){
  let r = null;
  if (document.caretPositionFromPoint){ const p = document.caretPositionFromPoint(e.clientX, e.clientY); if (p){ r = document.createRange(); r.setStart(p.offsetNode, p.offset); } }
  else if (document.caretRangeFromPoint) r = document.caretRangeFromPoint(e.clientX, e.clientY);
  if (!r || !root || !root.contains(r.startContainer)) return null;
  const pre = document.createRange(); pre.selectNodeContents(root); pre.setEnd(r.startContainer, r.startOffset);
  return pre.toString().replace(/^\d+/, "").length;
}
function fit(){ const ta = $("#edText"); if (!ta) return; ta.style.height = "auto"; ta.style.height = ta.scrollHeight + "px"; }
function onEdit(){
  const ta = $("#edText"); if (!ta) return;
  const m = MINE.find(x => x.id === S.edit), t = ta.value;
  $("#edMirror").innerHTML = (showRef() ? liveHTML(refAl(m.al), t) : esc(t)) + (t.endsWith("\n") ? " " : "");
  fit(); if (CUR.drum) CUR.drum.layout();
}
function openEditor(e, forced){
  if (S.edit || S.r !== "ecrire" || S.e.volet !== 0 || !["alinea", "face"].includes(curScale())) return;
  const f = curFace(); if (!f || !f.dataset.sid || !f.dataset.sid.startsWith("m:")) return;
  if (f.classList.contains("flipped")) return;
  const m = MINE.find(x => "m:" + x.id === f.dataset.sid); if (!m) return;
  const off = e ? caretOffset(e, f.querySelector(".body")) : null;
  S.edit = m.id; f.classList.add("editing"); chrome(); renderSide();
  if (CUR.drum) CUR.drum.fade(0);
  const startText = m.mode === "supprimer" ? TRANSMIS[m.al - 1] : m.texte;
  f.querySelector(".body").innerHTML = `<div class="ed"><div class="mirror" id="edMirror" aria-hidden="true"></div><textarea id="edText" aria-label="Texte de l'amendement" spellcheck="false" rows="1"></textarea></div>`;
  f.querySelector(".foot").innerHTML = `<span>Échap pour annuler · Ctrl+Entrée pour valider${m.mode === "supprimer" ? " · vous passez d'une suppression à une rédaction" : ""}</span><button type="button" data-act="cancel">Annuler</button><button type="button" class="primary" data-act="ok">Valider</button>`;
  const ta = $("#edText"); ta.value = startText;
  ta.addEventListener("keydown", ev => { if (ev.key === "Escape"){ ev.preventDefault(); ev.stopPropagation(); closeEditor(false); } if (ev.key === "Enter" && (ev.ctrlKey || ev.metaKey)){ ev.preventDefault(); ev.stopPropagation(); closeEditor(true); } });
  ta.addEventListener("input", onEdit);
  onEdit();
  // le double-clic sélectionnerait un mot dans la zone de saisie : on pose le curseur après lui
  const p = off == null ? ta.value.length : clamp(off, 0, ta.value.length);
  ta.focus({preventScroll: true}); ta.setSelectionRange(p, p);
  setTimeout(() => { if ($("#edText") === ta){ ta.setSelectionRange(p, p); } }, 0);
}
function closeEditor(commit, silent){
  if (!S.edit) return;
  const m = MINE.find(x => x.id === S.edit), ta = $("#edText"), v = ta ? ta.value.trim() : "";
  if (commit && m && v && (v !== m.texte || m.mode === "supprimer")){
    m.journal = m.journal || []; m.journal.push({date: new Date().toLocaleString("fr-FR", {dateStyle: "short", timeStyle: "short"}), texte: m.mode === "supprimer" ? "(suppression de l'alinéa)" : m.texte});
    m.texte = v; if (m.mode === "supprimer") m.mode = "rediger"; m.confirme = false; saveDrafts();
  }
  S.edit = null;
  if (!silent) render(null);
}

/* ---------- clics ---------- */
let clickTimer = 0;
stage.addEventListener("click", e => {
  const t = e.target;
  const q = s => t.closest(s);
  let b;
  if ((b = q("[data-close]"))){ closeOverlay(b.dataset.close); return; }
  if ((b = q("[data-rg]"))){ setRangement(b.dataset.rg); return; }
  if ((b = q("[data-x]"))){ toggleCoffre(b.dataset.x); return; }
  if (q("[data-cmp]")){ openBurst(); return; }
  if (q("[data-tiroir]")){ openOverlay("tiroir"); renderTiroir(); return; }
  if ((b = q("[data-coffre]"))){ toggleCoffre(b.dataset.coffre); return; }
  if (q("#dirBtn")){ openDirs(); return; }
  if ((b = q("[data-dirall]"))){ const v = b.dataset.dirall === "1"; DIRS.forEach(d => { if (!d.off) DIR[d.id] = v; }); setDir("L1", v); openDirs(); return; }
  if ((b = q("[data-setref]"))){ REF = b.dataset.setref; store.set("ref", REF); closeOverlay("refmenu"); render(null); return; }
  if ((b = q("[data-addgage]"))){ const m = MINE.find(x => x.id === b.dataset.addgage); m.gage = true; saveDrafts(); openSas(m.id); return; }
  if ((b = q("[data-confirm]"))){ const m = MINE.find(x => x.id === b.dataset.confirm); m.confirme = !m.confirme; if (m.confirme && on("D13")) m.vis = "public"; saveDrafts(); closeOverlay("sas"); render(null); return; }
  if ((b = q("[data-goto]"))){ e.stopPropagation(); ["calque", "sas", "burst", "loupe"].forEach(id => closeOverlay(id)); goTo(b.dataset.goto); return; }
  if (t.closest("#loupe") && t === $("#loupe")){ closeOverlay("loupe"); return; }
  for (const id of ["burst", "calque", "sas", "dirs", "tiroir"]) if (t === $("#" + id)){ closeOverlay(id); return; }
  if ($("#refmenu").classList.contains("on") && !q("#refmenu")){ closeOverlay("refmenu"); }
  if (q(".overlay, #refmenu")){
    const h = q("[data-h]"); if (h){ openLoupe(h.dataset.h); }
    return;
  }
  if (q("#hTop")){ const L = SCALES[S.r](), i = L.indexOf(curScale()); zoomStep(i < L.length - 1 ? -1 : 1); return; }
  if (q("#hLeft")){ sideStep(-1); return; }
  if (q("#hRight")){ sideStep(1); return; }
  if ((b = q("#rail button"))){ if (CUR.drum) CUR.drum.to(+b.dataset.i); return; }
  if ((b = q("[data-unit]"))){ S.e.unit = +b.dataset.unit; S.e.volet = 1; S.e.scale = "unite"; render("h+"); return; }
  if ((b = q("[data-th]"))){ S.t.theme = +b.dataset.th; S.t.pos = 0; S.t.other = 0; render(null); return; }
  if ((b = q("[data-theme]"))){ S.t.theme = +b.dataset.theme; S.t.scale = "theme"; S.t.volet = 0; render("z+"); return; }
  if ((b = q("[data-place]"))){ S.d.place = +b.dataset.place; S.d.scale = "place"; render("z+"); return; }
  if ((b = q("td[data-line]"))){ S.h.line = +b.dataset.line; S.h.et = HIST_ET().indexOf(b.dataset.et); S.h.scale = "alinea"; render("z+"); return; }
  if ((b = q("[data-open]"))){ setRangement("ecrire"); return; }
  // la feuille : une voisine se met au centre ; la feuille courante répond à ses commandes
  const f = q(".face");
  if (f && CUR.drum && +f.dataset.i !== CUR.drum.cur){ if (!S.edit) CUR.drum.to(+f.dataset.i); return; }
  if ((b = q("[data-act]"))){ closeEditor(b.dataset.act === "ok"); return; }
  if (S.edit) return;
  if ((b = q("[data-face]"))){ S.showRef = !S.showRef; store.set("showRef", S.showRef); render(null); return; }
  if ((b = q("[data-refpick]"))){ openRefMenu(b); return; }
  if ((b = q("[data-flip]"))){ flip(b.closest(".face")); return; }
  if ((b = q("[data-pick]"))){ S.e.otherSid = "a:" + b.dataset.pick; if (S.r === "ecrire") render(null); else goTo(S.e.otherSid); return; }
  if ((b = q("[data-sim]"))){ openCalque(b.dataset.sim); return; }
  if ((b = q("[data-sas]"))){ openSas(b.dataset.sas); return; }
  if ((b = q("[data-repli]"))){ const m0 = MINE.find(x => x.id === b.dataset.repli); const m = newDraft(m0.al, m0.mode, m0.texte, m0.id); S.e.mine = MINE.indexOf(m); render(null); setTimeout(() => openEditor(null), 60); return; }
  if ((b = q("[data-vis]"))){ const m = MINE.find(x => x.id === b.dataset.vis); m.vis = {"privé": "partagé", "partagé": "public", "public": "privé"}[m.vis] || "privé"; saveDrafts(); b.outerHTML = `<button type="button" class="vis" data-vis="${m.id}">${m.vis === "public" ? "◎ public" : m.vis === "partagé" ? "◑ partagé" : "○ privé"}</button>`; return; }
  if ((b = q("[data-ord]"))){ S.ord = b.dataset.ord; S.e.other = 0; render(null); return; }
  const h = q("[data-h]"); if (h){ openLoupe(h.dataset.h); return; }
  if ((b = q("tr[data-goto]"))){ goTo(b.dataset.goto); return; }
  if ((b = q("li[data-line]"))){ S.h.line = +b.dataset.line; S.h.scale = "alinea"; render("z+"); return; }
  if ((b = q("li[data-o]")) && S.r === "ecrire" && S.e.volet === -1){
    const o = +b.dataset.o, A = articleVersions()[S.e.art];
    if (A.me){ let m = MINE.find(x => x.al === o); const fresh = !m; if (!m) m = newDraft(o); S.e.volet = 0; S.e.mine = MINE.indexOf(m); S.e.al = null; S.e.scale = "alinea"; render("h+"); if (fresh) setTimeout(() => openEditor(null), 480); }
    else { S.e.volet = 1; S.e.al = o; S.e.scale = "alinea"; const g = A.id.startsWith("g:") ? A.id.slice(2) : null, ins = A.id.startsWith("inst:") ? A.id.slice(5) : null; const a = ALL.find(x => !isEcarte(x) && touchesAl(x, o) && (g ? x.groupe === g && !x.inst : ins ? x.inst === ins : false)); S.e.otherSid = a ? "a:" + a.id : null; render("h+"); }
    return;
  }
  const mk = q("mark.pt");
  if (mk){ clearTimeout(clickTimer); const k = +mk.dataset.u; clickTimer = setTimeout(() => { S.e.unit = k; if (S.r === "ecrire"){ S.e.scale = "unite"; render("z+"); } }, 260); return; }
  if (showRef() && f && f.dataset.sid && f.dataset.sid.startsWith("m:") && q(".body")) openEditor(e);
});
stage.addEventListener("dblclick", e => { clearTimeout(clickTimer); const f = e.target.closest(".face"); if (f && CUR.drum && +f.dataset.i === CUR.drum.cur && e.target.closest(".body")) openEditor(e); });
stage.addEventListener("change", e => {
  const t = e.target;
  if (t.dataset.dir){ setDir(t.dataset.dir, t.checked); openDirs(); return; }
  if (t.dataset.note){ NOTES[t.dataset.note] = Object.assign(NOTES[t.dataset.note] || {}, {q: t.value}); saveNotes(); }
  if (t.dataset.eng){ NOTES[t.dataset.eng] = Object.assign(NOTES[t.dataset.eng] || {}, {eng: t.checked}); saveNotes(); }
});
window.addEventListener("resize", () => { fit(); if (CUR.drum) CUR.drum.layout(); });
window.addEventListener("keydown", e => {
  if (e.target.closest && e.target.closest("textarea,input")) return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key === "Escape"){ e.preventDefault(); back(); return; }
  if (anyOverlay()) return;
  if (S.edit) return;
  if (e.target.closest && e.target.closest("button") && (e.key === " " || e.key === "Enter")) return;
  const d = CUR.drum;
  if ((e.key === "ArrowDown" || e.key === "PageDown") && d){ e.preventDefault(); d.to(Math.round(d.raw) + 1); }
  else if ((e.key === "ArrowUp" || e.key === "PageUp") && d){ e.preventDefault(); d.to(Math.round(d.raw) - 1); }
  else if (e.key === "ArrowRight") sideStep(1);
  else if (e.key === "ArrowLeft") sideStep(-1);
  else if (e.key === "Enter" || e.key === "+" || e.key === "=") zoomStep(1);
  else if (e.key === "-") zoomStep(-1);
  else if (/^[1-5]$/.test(e.key)){ const R = RANGEMENTS(); const r = R[+e.key - 1]; if (r) setRangement(r.id); }
  else if (e.key === "r" || e.key === "R") flip(curFace());
  else if (e.key === "d" || e.key === "D") openDirs();
  else if ((e.key === "c" || e.key === "C") && S.coffre.length) openBurst();
});

/* ---------- gestes : doigt ou souris ---------- */
const touches = new Map(); let g = null, pinch = null, suppressClick = false;
const dist = () => { const [a, b] = [...touches.values()]; return Math.hypot(a.x - b.x, a.y - b.y); };
const canScroll = (el, d) => el && (d > 0 ? el.scrollTop + el.clientHeight < el.scrollHeight - 1 : el.scrollTop > 0);
const nestedEl = () => { const f = curFace(); const b = f && (f.querySelector(".verso:not([hidden]) .body") || f.querySelector(".recto .body")); return b && b.scrollHeight > b.clientHeight + 1 ? b : null; };
stage.addEventListener("pointerdown", e => {
  suppressClick = false;
  touches.set(e.pointerId, {x: e.clientX, y: e.clientY});
  if (touches.size === 2){ if (g && g.axis === "v" && g.drum) g.drum.snap(g.start, 0); g = null; const mk = e.target.closest("mark.pt"); pinch = {d0: dist() || 1, done: false, k: mk ? +mk.dataset.u : null}; return; }
  if (touches.size > 1) return;
  if (anyOverlay() || e.target.closest(".handle,.rail,button,textarea,input,label,.units,select,summary,#topbar")) return;
  if (S.edit && e.target.closest(".face.editing")) return;
  g = {id: e.pointerId, x: e.clientX, y: e.clientY, axis: null, ly: e.clientY, lt: performance.now(), v: 0, bottom: !!e.target.closest("#rangements")};
});
stage.addEventListener("pointermove", e => {
  const t = touches.get(e.pointerId); if (t){ t.x = e.clientX; t.y = e.clientY; }
  if (pinch){ if (touches.size >= 2 && !pinch.done){ const r = dist() / pinch.d0; if (r < .78){ pinch.done = true; zoomStep(-1); } else if (r > 1.28){ pinch.done = true; zoomStep(1, pinch.k); } } return; }
  if (!g || e.pointerId !== g.id) return;
  const dx = e.clientX - g.x, dy = e.clientY - g.y;
  if (!g.axis){
    if (Math.abs(dx) + Math.abs(dy) < 8) return;
    g.axis = Math.abs(dy) > Math.abs(dx) ? "v" : "h";
    if (g.axis === "v"){
      const hs = e.target.closest && e.target.closest(".burst-scroll");
      const el = hs || nestedEl();
      if (el && (hs || canScroll(el, -dy))){ g.scrollEl = el; g.scroll0 = el.scrollTop + dy; }
      else { g.drum = S.edit ? null : CUR.drum; if (!g.drum){ g = null; return; } g.start = g.drum.begin(); g.from = g.drum.pos; }
    }
    suppressClick = true;
    try{ stage.setPointerCapture(e.pointerId); }catch(_){}
  }
  if (g.axis === "h"){
    if (e.target.closest && e.target.closest(".burst-scroll") && innerWidth < 760) { g = null; return; }
    if (dx < -50){ if (g.bottom) stepRangement(1); else sideStep(1); g = null; } else if (dx > 50){ if (g.bottom) stepRangement(-1); else sideStep(-1); g = null; }
    return;
  }
  if (g.scrollEl){ g.scrollEl.style.scrollBehavior = "auto"; g.scrollEl.scrollTop = g.scroll0 - dy; return; }
  const now = performance.now(), sp = g.drum.step();
  g.drum.dragTo(g.from, -dy);
  const dt = Math.max(1, now - g.lt); g.v = .7 * g.v + .3 * (-(e.clientY - g.ly) / sp) / (dt / 1000); g.ly = e.clientY; g.lt = now;
});
function stepRangement(dir){ const R = RANGEMENTS(), i = R.findIndex(r => r.id === S.r), j = clamp(i + dir, 0, R.length - 1); if (i !== j) setRangement(R[j].id); }
function pointerEnd(e){
  touches.delete(e.pointerId);
  if (pinch){ if (touches.size < 2) pinch = null; return; }
  if (g && e.pointerId === g.id){ if (g.scrollEl) g.scrollEl.style.scrollBehavior = ""; else if (g.axis === "v" && g.drum) g.drum.snap(g.start, g.v); g = null; }
}
stage.addEventListener("pointerup", pointerEnd); stage.addEventListener("pointercancel", pointerEnd);
stage.addEventListener("click", e => { if (suppressClick){ suppressClick = false; e.stopPropagation(); e.preventDefault(); } }, true);

/* ---------- gestes : pavé tactile ---------- */
let zw = null, zwT = 0, wg = null, wgT = 0;
const scrollsY = el => el && el.scrollHeight > el.clientHeight + 1, scrollsX = el => el && el.scrollWidth > el.clientWidth + 1;
stage.addEventListener("wheel", e => {
  const kf = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? innerHeight : 1, dx = e.deltaX * kf, dy = e.deltaY * kf;
  if (anyOverlay()){ if (!e.target.closest(".burst-scroll,.overlay-in,.dlist,.tlist,.sas-body")) e.preventDefault(); return; }
  if (e.ctrlKey){
    e.preventDefault();
    if (!zw){ const mk = e.target.closest("mark.pt"); zw = {acc: 0, done: false, k: mk ? +mk.dataset.u : null}; }
    zw.acc += dy;
    if (!zw.done){ if (zw.acc > 24){ zw.done = true; zoomStep(-1); } else if (zw.acc < -24){ zw.done = true; zoomStep(1, zw.k); } }
    clearTimeout(zwT); zwT = setTimeout(() => { zw = null; }, 220);
    return;
  }
  if (e.target.closest("textarea")) return;
  const vertical = Math.abs(dy) >= Math.abs(dx);
  if (vertical && !(wg && wg.axis === "h") && scrollsY(e.target.closest(".orig .body,.burst-scroll,.units"))) return;
  if (!vertical && !(wg && wg.axis === "v") && scrollsX(e.target.closest(".units,.burst-scroll,#rangements"))) return;
  if (vertical && (!wg || wg.native)){
    const el = nestedEl();
    if (el && (wg && wg.native || canScroll(el, dy))){
      if (!wg) wg = {axis: "v", native: true};
      clearTimeout(wgT); wgT = setTimeout(endWheel, 150);
      if (!e.target.closest(".face.cur .body")){ el.scrollTop += dy; e.preventDefault(); }
      else if (!canScroll(el, dy)) e.preventDefault();
      return;
    }
  }
  e.preventDefault();
  if (!wg) wg = {ax: 0, ay: 0, axis: null, done: false, h: 0};
  clearTimeout(wgT); wgT = setTimeout(endWheel, 150);
  let ddx = dx, ddy = dy;
  if (!wg.axis){
    wg.ax += dx; wg.ay += dy;
    if (Math.abs(wg.ax) + Math.abs(wg.ay) < 6) return;
    wg.axis = Math.abs(wg.ax) > Math.abs(wg.ay) ? "h" : "v"; ddx = wg.ax; ddy = wg.ay;
    if (wg.axis === "v"){ wg.drum = S.edit ? null : CUR.drum; if (wg.drum) wg.start = wg.drum.begin(); }
  }
  if (wg.axis === "h"){
    if (wg.done) return; wg.h += ddx;
    if (wg.h > 90){ sideStep(1); wg.done = true; } else if (wg.h < -90){ sideStep(-1); wg.done = true; }
    return;
  }
  if (wg.drum) wg.drum.move(ddy);
}, {passive: false});
function endWheel(){ if (wg && !wg.native && wg.axis === "v" && wg.drum) wg.drum.snap(wg.start, 0); wg = null; }
let sg = null;
stage.addEventListener("gesturestart", e => { e.preventDefault(); sg = pinch ? null : {done: false}; });
stage.addEventListener("gesturechange", e => { e.preventDefault(); if (!sg || sg.done) return; if (e.scale < .85){ sg.done = true; zoomStep(-1); } else if (e.scale > 1.18){ sg.done = true; zoomStep(1); } });
stage.addEventListener("gestureend", e => { e.preventDefault(); sg = null; });

/* ---------- la scène ne défile jamais : un focus ou un curseur ne doit pas la déplacer ---------- */
stage.addEventListener("scroll", () => { if (stage.scrollTop || stage.scrollLeft){ stage.scrollTop = 0; stage.scrollLeft = 0; } });
view.addEventListener("scroll", () => { if (view.scrollTop || view.scrollLeft){ view.scrollTop = 0; view.scrollLeft = 0; } }, true);

/* ---------- départ ---------- */
if (!RANGEMENTS().some(r => r.id === S.r)) S.r = "ecrire";
render(null);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (CUR.drum) CUR.drum.layout(); });
