/* Boussole · inspiration Jupiter (jup.ag) — rendu et gestes. S'appuie sur le noyau commun (données réelles, groupes fictifs). */
"use strict";
const IC = {   // icônes au trait, grille 24, trait 1,6
  pen:'<svg viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/></svg>',
  cols:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v16"/></svg>',
  doc:'<svg viewBox="0 0 24 24"><path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z"/><path d="M14 3v4h4M9 12h6M9 16h4"/></svg>',
  folder:'<svg viewBox="0 0 24 24"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
  target:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8"/></svg>',
  people:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.3"/><path d="M15.5 14.3c2.9.3 5.5 2.6 5.5 5.7"/></svg>',
  info:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
  sliders:'<svg viewBox="0 0 24 24"><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></svg>',
  swap:'<svg viewBox="0 0 24 24"><path d="M8 4v15M8 19l-3.5-3.5M8 19l3.5-3.5M16 20V5M16 5l-3.5 3.5M16 5l3.5 3.5"/></svg>',
  swapH:'<svg viewBox="0 0 24 24"><path d="M4 8h15M19 8l-3.5-3.5M19 8l-3.5 3.5M20 16H5M5 16l3.5-3.5M5 16l3.5 3.5"/></svg>',
  chev:'<svg viewBox="0 0 24 24" class="chev"><path d="m7 10 5 5 5-5"/></svg>',
  chevR:'<svg viewBox="0 0 24 24" class="sm"><path d="m10 7 5 5-5 5"/></svg>',
  chev2:'<svg viewBox="0 0 24 24"><path d="m7 7 5 5 5-5M7 13l5 5 5-5"/></svg>',
  plus:'<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  x:'<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  search:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  spark:'<svg viewBox="0 0 24 24" class="sm"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></svg>',
  check:'<svg viewBox="0 0 24 24" class="ck"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>',
  side:'<svg viewBox="0 0 24 24" class="sm"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/></svg>',
  clock:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  compass:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></svg>',
  ext:'<svg viewBox="0 0 24 24" class="sm"><path d="M8 16 16 8M10 8h6v6"/></svg>',
};
const VIEWS = {atelier:"Atelier", comparer:"Comparer", article:"Mon article", dossier:"Dossier", enjeux:"Enjeux", reunion:"Réunion", lisez:"Lisez-moi"};
const st = Object.assign({view:"atelier", o:12, draft:null, vers:"mine", cmp:[], filt:"tous", q:"", th:THEMES[0].id, place:3, amSel:null, rtab:"vote", rseg:"diff",
  pf:"toutes", pq:"", artTab:"article", codeTab:"commission", unfold:false, marks:true, rail:false, slide:0, hideAnn:false}, store.get("ui", {}));
st.editing = false; st.drawer = false;
if (!MINE.find(m => m.id === st.draft)) st.draft = MINE[0].id;
const save = () => store.set("ui", {view:st.view, o:st.o, draft:st.draft, vers:st.vers, cmp:st.cmp, filt:st.filt, th:st.th, place:st.place, amSel:st.amSel, rtab:st.rtab, rseg:st.rseg, artTab:st.artTab, codeTab:st.codeTab, marks:st.marks, rail:st.rail, hideAnn:st.hideAnn});
let MODAL = null;   // {kind, …}

/* ---------- utilitaires d'affichage ---------- */
const STOP = /^(et|de|des|du|la|le|les|pour|l’|d’|l'|d')$/i;
const ini = n => String(n || "?").replace(/^(La|Le|Les) /, "").split(/[\s-]+/).filter(w => w && !STOP.test(w)).map(w => w[0].toUpperCase()).join("").slice(0, 2);
const lum = h => { const c = h.replace("#", ""); const r = parseInt(c.slice(0, 2), 16), g = parseInt(c.slice(2, 4), 16), b = parseInt(c.slice(4, 6), 16); return (r * 299 + g * 587 + b * 114) / 1000; };
const avc = (name, color, cls) => `<span class="av ${cls || ""}" style="--c:${color};${lum(color) < 90 ? "color:#e2e8f0" : ""}">${esc(ini(name))}</span>`;
const avA = (a, cls) => { const w = who(a); return avc(w.name, w.color, cls); };
const avMe = cls => avc(GR[ME].name, GR[ME].color, "me " + (cls || ""));
const sk = a => NX.sortKey(a);
const sortBdg = a => `<span class="bdg ${sk(a) === "adopte" ? "g" : ""} s-${sk(a)}">${esc(sortWord(a))}</span>`;
const kb = s => s.split(" ").map(k => `<kbd>${esc(k)}</kbd>`).join(" ");
const draft = () => MINE.find(m => m.id === st.draft) || MINE[0];
const draftOn = o => MINE.find(m => m.id === st.draft && m.al === o) || MINE.find(m => m.al === o) || null;
const modeWord = m => m.mode === "supprimer" ? "supprimer" : m.mode === "inserer" ? "insérer" : "rédiger";
const modeIc = (m, small) => `<span class="mode-ic ${m.mode === "supprimer" ? "d" : m.mode === "inserer" ? "i" : ""}"${small ? ' style="width:22px;height:22px;font-size:10px"' : ""}>${m.mode === "supprimer" ? "−" : m.mode === "inserer" ? "+" : "✎"}</span>`;
const refFor = m => m.mode === "inserer" ? "" : refAl(m.al);
const amO = a => a.cible.al || a.spans.map(s => s.al)[0] || st.o;
const amOctx = a => touchesAl(a, st.o) ? st.o : amO(a);   // l'alinéa courant s'il est touché, sinon celui que vise l'amendement
// le rendu d'une rédaction face à la référence : même traitement pour la mienne et pour celle d'un autre (symétrie)
function draftHTML(m){ return m.mode === "rediger" ? NX.unitsOnDiff(NX.draftDiff(m), m.al, m.texte) : NX.draftDiff(m); }
function amHTML(a, o){
  const d = NX.amDiff(a, o), t = NX.amText(a, o);
  if (d == null) return `<span class="muted">${esc(short(a.dispositif || modeLead(a, o), 600))}</span>`;
  return typeof t === "string" ? NX.unitsOnDiff(d, o, t) : d;
}
const itemLabel = id => id && id[0] === "M" ? (MINE.find(m => m.id === id) ? draftNum(MINE.find(m => m.id === id)) : id) : (AM[id] ? AM[id].num : id);

/* ---------- squelette ---------- */
function renderNav(){
  const it = (v, icon, label, badge) => `<button class="nit${st.view === v ? " on" : ""}" data-go="${v}" title="${label}">${icon}<span>${label}</span>${badge ? `<span class="bd ${badge.g ? "g" : ""}">${badge.t}</span>` : ""}</button>`;
  $("#nav").innerHTML = `<div class="brand"><span class="mk">${IC.compass}</span><b>Boussole</b><button class="tg" data-cmd="rail" title="Replier la navigation">${IC.side}</button></div>
  <div class="scroll">
    <div class="nsec">Rédiger</div>
    ${it("atelier", IC.pen, "Atelier", {t: MINE.length})}
    ${it("comparer", IC.cols, "Comparer", st.cmp.length ? {t: st.cmp.length + "/2", g: 1} : null)}
    ${it("article", IC.doc, "Mon article")}
    <div class="nsec">Explorer</div>
    ${it("dossier", IC.folder, "Dossier")}
    ${it("enjeux", IC.target, "Enjeux", {t: THEMES.length})}
    <div class="nsec">Suivre</div>
    ${it("reunion", IC.people, "Réunion", {t: "21 sept."})}
    <div class="nsec">Plus</div>
    <button class="nit" data-cmd="ref" title="Référence">${IC.sliders}<span>Référence</span><span class="bd">${esc(refShort())}</span></button>
    <button class="nit" data-cmd="search" title="Rechercher">${IC.search}<span>Rechercher</span><span class="bd">/</span></button>
  </div>
  <div class="foot">${it("lisez", IC.info, "Lisez-moi")}</div>`;
  $("#tabbar").innerHTML = [["atelier", IC.pen, "Atelier"], ["comparer", IC.cols, "Comparer"], ["dossier", IC.folder, "Dossier"], ["enjeux", IC.target, "Enjeux"], ["reunion", IC.people, "Réunion"]]
    .map(([v, i, l]) => `<button class="${st.view === v ? "on" : ""}" data-go="${v}">${i}<span>${l}</span></button>`).join("");
  $("#refpill").innerHTML = `${IC.spark}<span class="hide-m">Face à :&nbsp;</span>${esc(refShort())}`;
  $("#app").classList.toggle("rail", st.rail || st.view === "reunion");
  $("#app").classList.toggle("drawer", st.drawer);
}
function renderTick(){
  const L = ALL.filter(a => a.sort && a.dateSort).sort((x, y) => (y.dateSort || "").localeCompare(x.dateSort || "")).slice(0, 36);
  const cls = a => sk(a) === "adopte" ? "up" : sk(a) === "rejete" ? "dn" : "fl";
  const one = L.map(a => `<span class="ti" data-am="${a.id}"><span class="dot" style="background:${who(a).color}"></span><b>${a.num}</b><span class="v">${esc(short(who(a).name, 22))}</span><span class="${cls(a)}">${esc(a.sort.toLowerCase())}</span></span>`).join("");
  const dis = NX.alsDisputes().sort((x, y) => y.n - x.n).slice(0, 6).map(x => `<span class="ti" data-al="${x.o}"><b>Al. ${x.o}</b><span class="v">${x.n} concurrents</span></span>`).join("");
  $("#tick").innerHTML = `<span class="lbl">${IC.clock.replace("<svg", '<svg style="width:14px;height:14px"')}<span class="hide-m">Sorts récents</span></span><div class="track"><div class="run">${dis}${one}${dis}${one}</div></div><button class="plus" data-cmd="search" title="Rechercher">${IC.plus.replace("<svg", '<svg style="width:14px;height:14px"')}</button>`;
}
function render(){
  renderNav();
  const V = {atelier:vAtelier, comparer:vComparer, article:vArticle, dossier:vDossier, enjeux:vEnjeux, reunion:vReunion, lisez:vLisez}[st.view] || vAtelier;
  const R = V();
  const view = $("#view"); view.className = R.full ? "full" : ""; view.innerHTML = R.html;
  renderModal(); save();
  if (R.after) R.after();
}
function go(v, keepScroll){ st.view = v; st.editing = false; st.drawer = false; closeLoupe(); render(); if (!keepScroll) $("#main").scrollTop = 0; }
window.allerA = go;

/* ---------- ATELIER : la carte de swap ---------- */
function annonces(){
  const U = unitsOf(st.o), C = concurrents(st.o), top = [...U].sort((x, y) => y.n - x.n)[0];
  const ad = C.units.map(u => u.lead).find(a => a.sort === "Adopté");
  const S = [];
  if (top) S.push({ic: U.length, t: `Alinéa ${st.o} : ${U.length} ${plural(U.length, "passage disputé", "passages disputés")}`, s: `Le plus disputé : « ${top.label} », ${top.n} propositions. Cliquer pour les voir regroupées.`, attr: `data-unit="${top.k}"`});
  else S.push({ic: C.units.length, t: `Alinéa ${st.o} : ${C.units.length} ${plural(C.units.length, "concurrent")}`, s: "Aucun passage n'est disputé par plusieurs propositions sur cet alinéa.", attr: `data-cmd="toconc"`});
  if (ad) S.push({ic: "✓", t: `${ad.num} adopté · ${who(ad).name}`, s: short(objetOf(ad) || modeLead(ad, st.o), 90), attr: `data-am="${ad.id}"`});
  S.push({ic: "⇆", t: "Comparer en trois colonnes", s: "Une rédaction | la référence au centre | l'autre. Déposez deux rédactions dans le comparateur.", attr: `data-go="comparer"`});
  return S;
}
function annonceHTML(){
  if (st.hideAnn) return "";
  const S = annonces(), i = st.slide % S.length, s = S[i];
  return `<div id="ann"><div class="annonce shine" ${s.attr}><span class="ic">${esc(String(s.ic))}</span><div><b>${esc(s.t)}</b><small>${esc(s.s)}</small></div><button class="ib x" data-cmd="hideann" title="Masquer">${IC.x}</button></div>
    <div class="dots" style="margin-top:10px">${S.map((_, k) => `<i class="${k === i ? "on" : ""}" data-slide="${k}"></i>`).join("")}</div></div>`;
}
function draftsCard(alt){
  return `<div class="card promo ${alt ? "c-left-alt" : ""}"><h3>Mes brouillons</h3><div class="lead">${MINE.length} ${plural(MINE.length, "rédaction")} en cours · groupe ${esc(GR[ME].name)}</div>
    <div>${MINE.map(m => `<div class="drow${m.id === st.draft && st.vers === "mine" ? " on" : ""}" data-draft="${m.id}">${modeIc(m)}<div class="tx"><b>${esc(draftNum(m))} · al. ${m.al}</b><small>${esc(cap(modeWord(m)))} · ${esc(short(m.mode === "supprimer" ? refAl(m.al) : m.texte || "(vide)", 48))}</small></div></div>`).join("")}</div>
    <button class="btn-sec" data-cmd="new">${IC.plus.replace("<svg", '<svg style="width:16px;height:16px"')} Nouveau brouillon · al. ${st.o}</button></div>`;
}
function glanceCard(){
  const C = concurrents(st.o), U = unitsOf(st.o), touched = verTouched(myVer()).size;
  const slot = k => { const id = st.cmp[k]; if (!id) return `<div class="slot">${k ? "Seconde" : "Première"} rédaction · ⊕ sur une ligne</div>`;
    const m = id[0] === "M" ? MINE.find(x => x.id === id) : null, a = AM[id];
    return `<div class="slot full">${m ? avMe("sm") : a ? avA(a, "sm") : ""}<span class="tx">${esc(itemLabel(id))}${a ? ` · <span class="muted">${esc(who(a).name)}</span>` : m ? ` · <span class="muted">al. ${m.al}</span>` : ""}</span><button class="ib" data-uncmp="${id}" title="Retirer">${IC.x}</button></div>`; };
  return `<div class="card c-right-card"><div class="card-h"><h3>Votre rédaction, en un coup d'œil</h3></div>
    <div class="glance"><div class="ln">Brouillons<b>${MINE.length}</b></div><div class="ln">Alinéas que vous touchez<b>${touched}</b></div><div class="ln">Concurrents sur l'al. ${st.o}<b>${C.units.length}</b></div><div class="ln">Passages disputés sur l'al. ${st.o}<b>${U.length}</b></div></div></div>
    <div class="card"><div class="card-h"><h3>Comparateur</h3><span class="sp"></span><span class="bdg ${st.cmp.length === 2 ? "g" : ""}">${st.cmp.length}/2</span></div>
    <div class="coffre">${slot(0)}${slot(1)}<button class="btn-sec" data-go="comparer" style="width:100%">${IC.cols.replace("<svg", '<svg style="width:16px;height:16px"')} Comparer en trois colonnes</button></div></div>
    <div class="card"><div class="card-h"><h3>Aller plus loin</h3></div><div class="links">
      <button class="btn-ghost" data-go="article">${IC.doc} Article 4 · ma version</button>
      <button class="btn-ghost" data-cmd="code">§ Code général des impôts</button>
      <button class="btn-ghost" data-hist="${st.o}">${IC.clock} L'alinéa ${st.o} d'étape en étape</button></div></div>`;
}
function swapCard(){
  const o = st.o, m = draftOn(o), cand = st.vers !== "mine" && AM[st.vers] ? AM[st.vers] : null;
  const U = unitsOf(o);
  const tabs = ["rediger", "inserer", "supprimer"].map(x => `<button class="${m && m.mode === x && !cand ? "on" : ""}" data-mode="${x}" ${cand || !m ? "disabled style=\"opacity:.45;cursor:default\"" : ""}>${{rediger:"Rédiger", inserer:"Insérer", supprimer:"Supprimer"}[x]}</button>`).join("");
  const refTxt = m && m.mode === "inserer" ? `<span class="faint">Rien à cet endroit : un nouvel alinéa s'insère après l'alinéa ${o}.</span><br><span class="muted" style="font-size:13px">${esc(short(refAl(o), 160))}</span>` : esc(refAl(o)) || `<span class="faint">(alinéa absent de cette étape)</span>`;
  let versH, versBody, main;
  if (cand){
    const w = who(cand);
    versH = `<div class="lab">Vers · un concurrent<small>${esc(modeLead(cand, o))}</small></div><span class="sp"></span><button class="tok" data-cmd="pick-vers">${avA(cand)}${cand.num}${IC.chev}</button>`;
    versBody = `<div class="legal lg ${st.marks ? "" : "nomarks"}" data-o="${o}">${amHTML(cand, o)}</div><div class="hint">${avc(w.name, w.color, "sm")} ${esc(w.name)} · ${sortBdg(cand)}${cand.avis ? ` · avis ${esc(cand.avis)}` : ""}</div>`;
    main = `<div class="btn-row"><button class="btn-main" data-cmd="back-mine">Revenir à ma rédaction</button><button class="btn-ghost" data-am="${cand.id}" title="Fiche">Fiche</button></div>`;
  } else if (!m){
    versH = `<div class="lab">Vers · ma rédaction<small>pas encore de brouillon sur cet alinéa</small></div><span class="sp"></span><button class="tok noav" data-cmd="pick-vers">Choisir${IC.chev}</button>`;
    versBody = `<div class="empty" style="padding:22px 0 8px">Vous n'avez rien rédigé sur l'alinéa ${o}.</div>`;
    main = `<button class="btn-main" data-cmd="new">Amender l'alinéa ${o}</button>`;
  } else if (st.editing){
    versH = `<div class="lab">Vers · ma rédaction<small>édition en place · ${esc(draftLead(m))}</small></div><span class="sp"></span><span class="tok">${avMe()}${esc(draftNum(m))}</span>`;
    versBody = `<div class="edit-wrap"><div class="edit"><div class="mirror" id="mirror">${liveHTML(refFor(m), m.texte)}</div><textarea id="ta" spellcheck="false" aria-label="Ma rédaction">${esc(m.texte)}</textarea></div></div>
      <div class="hint">Pendant la frappe : ajouts soulignés, suppressions en repère rouge ; corrections complètes après validation. ${kb("Ctrl Entrée")} valider · ${kb("Échap")} annuler</div>`;
    main = `<div class="btn-row"><button class="btn-main" data-cmd="valider">Valider</button><button class="btn-ghost" data-cmd="annuler">Annuler</button></div>`;
  } else {
    versH = `<div class="lab">Vers · ma rédaction<small>${esc(draftLead(m))}</small></div><span class="sp"></span><button class="tok" data-cmd="pick-vers">${avMe()}${esc(draftNum(m))}${IC.chev}</button>`;
    versBody = `<div class="legal lg ${st.marks ? "" : "nomarks"}" id="vers" data-o="${o}" title="${m.mode === "supprimer" ? "" : "Double-clic pour modifier"}">${draftHTML(m)}</div>`;
    main = m.mode === "supprimer" ? `<button class="btn-main" data-cmp-add="${m.id}">Déposer au comparateur</button>` : `<button class="btn-main" data-cmd="edit">Modifier ma rédaction</button>`;
  }
  const chips = U.length && !st.editing ? `<div class="units">${U.map(u => `<button class="chip" data-unit="${u.k}" title="${u.n} propositions sur ce passage"><b>${u.n}</b><span>« ${esc(u.label)} »</span></button>`).join("")}</div>` : "";
  return `<div class="swap" id="swap">
    <div class="swap-h"><div class="tp">${tabs}</div><span class="sp"></span><button class="chip g" data-cmd="ref" title="Choisir la référence">${IC.spark} ${esc(refShort())}</button><button class="ib" data-cmd="ref" title="Réglages de la référence">${IC.sliders}</button></div>
    <div class="blk full"><div class="blk-h"><div class="lab">De · la référence<small>${esc(refLabel())} · vierge</small></div><span class="sp"></span><button class="tok noav" data-cmd="pick-al">§ Al. ${o}${IC.chev}</button></div>
      <div class="legal lg refclamp${st.refOpen ? " open" : ""}">${refTxt}</div>${refAl(o).length > 260 && !(m && m.mode === "inserer") ? `<button class="chip" data-cmd="refopen" style="margin-top:8px">${st.refOpen ? "Replier la référence" : "Déplier la référence"}</button>` : ""}</div>
    <div class="seam"><button class="flip" data-cmd="flip" title="${cand ? "Revenir à ma rédaction" : "Mettre un concurrent à la place de ma rédaction"}">${IC.swap}</button></div>
    <div class="blk hollow"><div class="blk-h">${versH}</div>${versBody}${chips}</div>
    <div class="opt" data-cmd="marks"><u>Montrer les passages disputés</u><span class="bdg g">${U.length}</span><span class="sp"></span><span class="toggle ${st.marks ? "on" : ""}"></span></div>
    ${main}</div>`;
}
function concList(){
  const C = concurrents(st.o), q = st.q.toLowerCase();
  const F = {tous: () => true, adopte: a => sk(a) === "adopte", rejete: a => sk(a) === "rejete", tombe: a => sk(a) === "tombe", autres: a => !["adopte", "rejete", "tombe"].includes(sk(a))};
  const match = a => F[st.filt](a) && (!q || [a.num, who(a).name, sortWord(a), objetOf(a), a.auteur].join(" ").toLowerCase().includes(q));
  const row = (u, ec) => { const a = u.lead, w = who(a), inC = st.cmp.includes(a.id);
    return `<div class="row${st.vers === a.id ? " on" : ""}" data-am="${a.id}" ${ec ? 'style="opacity:.6"' : ""}>${avA(a)}<div class="tx"><div class="t1">${a.num}${sk(a) === "adopte" ? IC.check.replace('class="ck"', 'class="ck" style="width:14px;height:14px;color:var(--acc)"') : ""}${u.members.length > 1 ? `<span class="bdg">${u.kind === "ident" ? "identiques" : "série"} ×${u.members.length}</span>` : ""}</div><div class="t2">${esc(w.name)} · ${esc(objetOf(a) || modeLead(a, st.o))}</div></div>
      <div class="r"><div class="s-${sk(a)}">${esc(sortWord(a))}</div>${a.avis ? `<div class="faint">avis ${esc(avisSym(a.avis))}</div>` : ""}</div>
      <button class="ib${inC ? " on" : ""}" data-cmp-add="${a.id}" title="${inC ? "Retirer du comparateur" : "Déposer au comparateur"}">${inC ? IC.check.replace('class="ck"', "") : IC.plus}</button></div>`; };
  const L = C.units.filter(u => match(u.lead)), E = C.ecartes.filter(u => match(u.lead));
  const cnt = k => C.units.filter(u => F[k](u.lead)).length;
  return `<div id="conc"><div class="sect-h"><h2>Concurrents de l'alinéa ${st.o}</h2><span class="bdg">${C.units.length}</span><span class="sp"></span><span class="faint" style="font-size:12px">${C.total} amendements le touchent</span></div>
    <div class="filters"><div class="search-in">${IC.search}<input id="cq" placeholder="Filtrer : numéro, groupe, objet…" value="${esc(st.q)}"></div></div>
    <div class="tp" style="margin-bottom:10px">${[["tous", "Tous"], ["adopte", "Adoptés"], ["rejete", "Rejetés"], ["tombe", "Tombés"], ["autres", "Autres"]].map(([k, l]) => `<button class="${st.filt === k ? "on" : ""}" data-filt="${k}">${l} <span class="faint">${cnt(k)}</span></button>`).join("")}</div>
    <div class="rows" id="concrows">${L.map(u => row(u)).join("") || `<div class="empty">Aucun concurrent ne correspond.</div>`}
    ${E.length ? `<div class="faint" style="font-size:12px;margin:10px 4px 2px">Écartés (irrecevables, retirés) · ${E.length}</div>` + E.map(u => row(u, 1)).join("") : ""}</div></div>`;
}
function vAtelier(){
  const o = st.o, H = NX.hist(o), nmod = H.filter((h, i) => i && !h.same && !h.absent).length;
  const tc = `<div class="tcards"><div class="tcard" data-hist="${o}"><span class="av" style="--c:#212a36;color:var(--t)">§</span><div class="tx"><b>Alinéa ${o} ${IC.ext}</b><small>d'étape en étape</small></div><div class="n">${nmod}<small class="faint" style="font-size:11px;display:block;font-weight:400">${plural(nmod, "étape", "étapes")}</small></div></div>
    <div class="tcard" data-go="article"><span class="av" style="--c:${GR[ME].color}">4</span><div class="tx"><b>Article 4 ${IC.ext}</b><small>vos brouillons appliqués</small></div><div class="n">${verTouched(myVer()).size}<small class="faint" style="font-size:11px;display:block;font-weight:400">${plural(verTouched(myVer()).size, "alinéa", "alinéas")}</small></div></div></div>`;
  return {html: `<div class="cols3"><aside class="c-left">${draftsCard()}</aside>
    <div class="mid">${annonceHTML()}${swapCard()}${tc}<div class="chev2">${IC.chev2}</div>${concList()}</div>
    <aside class="c-right">${draftsCard(true)}${glanceCard()}</aside></div>`, after: afterAtelier};
}
function afterAtelier(){
  const ta = $("#ta");
  if (ta){
    const m = draftOn(st.o), fit = () => { ta.style.height = "auto"; ta.style.height = ta.scrollHeight + "px"; };
    fit(); ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length);
    ta.addEventListener("input", () => { $("#mirror").innerHTML = liveHTML(refFor(m), ta.value); fit(); });
  }
  const cq = $("#cq");
  if (cq) cq.addEventListener("input", () => { st.q = cq.value; const p = cq.selectionStart; $("#conc").outerHTML = concList(); const n = $("#cq"); n.focus(); n.setSelectionRange(p, p); afterAtelier.bindOnly(); });
}
afterAtelier.bindOnly = () => { const cq = $("#cq"); if (cq) cq.addEventListener("input", () => { st.q = cq.value; const p = cq.selectionStart; $("#conc").outerHTML = concList(); const n = $("#cq"); n.focus(); n.setSelectionRange(p, p); afterAtelier.bindOnly(); }); };

/* ---------- COMPARER : une | la référence | l'autre ---------- */
function sideOf(id){
  if (id && id[0] === "M"){ const m = MINE.find(x => x.id === id); if (m) return {id, o: m.al, label: draftNum(m), sub: "Vous · " + GR[ME].name, av: avMe("lg"), html: draftHTML(m), foot: `${modeIc(m, 1)} ${esc(draftLead(m))}`}; }
  const a = AM[id]; if (!a) return null; const o = amOctx(a);
  return {id, o, label: a.num, sub: who(a).name + (a.auteur ? " · " + a.auteur : ""), av: avA(a, "lg"), html: amHTML(a, o), foot: `${sortBdg(a)} ${a.avis ? `<span>avis ${esc(a.avis)}</span>` : ""} <button class="chip" data-am="${a.id}">Fiche ${IC.chevR}</button>`};
}
function vComparer(){
  st.cmp = st.cmp.filter(id => id && sideOf(id));
  if (!st.cmp[0]) st.cmp[0] = (draftOn(st.o) || draft()).id;
  if (!st.cmp[1]){ const c = concurrents(sideOf(st.cmp[0]).o).units[0]; if (c) st.cmp[1] = c.lead.id; }
  const A = sideOf(st.cmp[0]), B = st.cmp[1] ? sideOf(st.cmp[1]) : null, o = A.o;
  const pill = (k, S) => `<button class="tok" data-cmd="pick-slot" data-k="${k}">${S ? S.av.replace("av lg", "av") + esc(S.label) : `<span style="padding-left:8px">Choisir</span>`}${IC.chev}</button>`;
  const col = (S, cls) => S ? `<div class="col hollow"><div class="ch">${S.av}<div><b>${esc(S.label)}</b><small>${esc(S.sub)}</small></div></div><div class="legal ${st.marks ? "" : "nomarks"}" data-o="${S.o}">${S.html}</div><div class="foot">${S.foot}${S.o !== o ? `<span class="faint">vise l'alinéa ${S.o}</span>` : ""}</div></div>`
    : `<div class="col hollow"><div class="ch"><b>—</b></div><div class="empty">Choisissez une seconde rédaction.</div><div></div></div>`;
  return {html: `<div class="cmp-wrap"><div class="hero" style="margin-top:0"><h1 style="font-size:32px;line-height:38px;letter-spacing:-.8px">Comparer <span class="g">deux rédactions</span></h1><p style="font-size:14px">La référence reste vierge au centre ; les corrections apparentes sont portées sur chaque rédaction, de la même manière des deux côtés.</p></div>
    <div class="cmp-slots">${pill(0, A)}<button class="flip" data-cmd="swap-slots" title="Inverser">${IC.swapH}</button>${pill(1, B)}<button class="chip" data-al="${o}">§ Alinéa ${o}</button></div>
    <div class="cols">${col(A)}<div class="col full"><div class="ch"><span class="av lg" style="--c:#212a36;color:var(--t)">§</span><div><b>La référence</b><small>${esc(refLabel())} · alinéa ${o}</small></div></div><div class="legal">${esc(refAl(o))}</div><div class="foot">vierge : aucune correction n'y est portée</div></div>${col(B)}</div></div>`};
}

/* ---------- MON ARTICLE et le code ---------- */
function vArticle(){
  const tabs = `<div class="tp" style="justify-content:center;margin:22px 0 18px">${[["article", "Article 4 · ma version"], ["code", "Code général des impôts"]].map(([k, l]) => `<button class="${st.artTab === k ? "on" : ""}" data-arttab="${k}">${l}</button>`).join("")}</div>`;
  let body;
  if (st.artTab === "article"){
    const L = verLines(myVer()), out = []; let run = [];
    const lrow = (n, html, cls) => `<div class="row" style="cursor:default;align-items:flex-start;${cls === "same" ? "background:none;box-shadow:inset 0 0 0 1px var(--bd)" : ""}"><span class="av sm" style="--c:${cls === "same" ? "#212a36" : cls === "ins" ? "#38bdf8" : GR[ME].color};${cls === "same" ? "color:var(--t3)" : ""};margin-top:3px">${n}</span><div class="tx legal">${html}</div></div>`;
    const flush = () => { if (run.length > 2) out.push(`<button class="row" data-cmd="unfold" style="min-height:44px;justify-content:center;color:var(--t3);background:none;box-shadow:inset 0 0 0 1px dashed var(--bd)">${IC.chev} ${run.length} alinéas inchangés (${run[0].o}–${run[run.length - 1].o}) · déplier</button>`); else run.forEach(l => out.push(lrow(l.o, esc(l.text), "same"))); run = []; };
    for (const l of L){
      if (l.kind === "same" && !st.unfold){ run.push(l); continue; }
      flush();
      out.push(l.kind === "same" ? lrow(l.o, esc(l.text), "same") : l.kind === "del" ? lrow(l.o, `<del>${esc(refAl(l.o))}</del>`) : l.kind === "mod" ? lrow(l.o, inlineDiff(refAl(l.o), l.text, {o: l.o})) : lrow("+", `<ins>${esc(l.text)}</ins>`, "ins"));
    }
    flush();
    body = `<div class="sect-h"><h2>Article 4 avec vos ${MINE.length} brouillons</h2><span class="sp"></span><button class="chip" data-cmd="fold">${st.unfold ? "Replier les zones inchangées" : "Tout déplier"}</button></div><div class="rows">${out.join("")}</div>`;
  } else {
    const C = NX.code; let apres = C.apresCommission, err = "";
    if (st.codeTab === "mine"){ try { apres = applyToCode(verAlineas(verOfDraftsOnRef())).apres; } catch (e){ err = "Application mécanique impossible sur cette version."; } }
    const blocks = C.lettres.map(l => { const av = (C.avant[l] || []).join("\n"), ap = (apres[l] || []).join("\n"), same = sameText(av, ap);
      return `<div class="card" style="padding:16px;margin-bottom:10px"><div style="display:flex;gap:8px;align-items:center;margin-bottom:8px"><span class="av sm" style="--c:#212a36;color:var(--t)">${l}</span><b>${l})</b><span class="sp" style="flex:1"></span><span class="bdg ${same ? "" : "g"}">${same ? "inchangé" : "modifié"}</span></div><div class="legal" style="white-space:pre-line">${same ? esc(short(ap, 420)) : inlineDiff(av, ap)}</div></div>`; }).join("");
    body = `<div class="sect-h"><h2>${esc(C.article)}</h2><span class="sp"></span></div><div class="tp" style="margin-bottom:12px"><button class="${st.codeTab === "commission" ? "on" : ""}" data-codetab="commission">En vigueur → après commission</button><button class="${st.codeTab === "mine" ? "on" : ""}" data-codetab="mine">En vigueur → avec ma version</button></div>${err ? `<div class="empty">${err}</div>` : ""}<p class="muted" style="font-size:13px;margin:0 0 12px">Les instructions de l'article, appliquées mécaniquement au code : ce qu'il deviendrait. Corrections portées sur la version d'arrivée.</p>${blocks}`;
  }
  return {html: `<div class="wrap" style="max-width:820px"><div class="hero" style="margin-top:0"><h1 style="font-size:32px;line-height:38px;letter-spacing:-.8px">L'article 4, <span class="g">tel que vous l'écrivez</span></h1><p style="font-size:14px">Face à : ${esc(refLabel())}</p></div>${tabs}${body}</div>`};
}
// ma version de l'article exprimée sur le texte transmis (pour appliquer au code)
const verOfDraftsOnRef = () => myVer();

/* ---------- DOSSIER : héros, recherche géante, chiffres, cartes ---------- */
function vDossier(){
  const plan = NX.plan.map(p => `<button class="acard${p.num === "4" ? " on" : ""}" data-art="${esc(p.num)}"><span class="num">${esc(p.num.replace(" bis", "b").replace(" ter", "t"))}</span><div class="tx"><b>Article ${esc(p.num)}</b><small>${esc(p.intitule || "(sans intitulé)")}</small></div><div class="n">${p.n}<small>amend.</small></div></button>`).join("");
  const G = NX.grid();
  const rows = G.map(r => `<div class="ge-r${r.o && r.o === st.o ? " on" : ""}" ${r.o ? `data-hist="${r.o}"` : 'style="cursor:default"'}><span class="o">${r.o ?? "+"}</span>${r.cells.map(c => `<span class="cell ${c}" title="${{mod:"modifié par rapport à l'étape précédente", same:"inchangé", absent:"absent", origine:"première rédaction"}[c]}">${{mod:"modifié", same:"·", absent:"—", origine:"origine"}[c]}</span>`).join("")}<span class="tx">${r.o ? esc(NX.alShort(r.o, 120)) : "<i>alinéa absent du texte transmis</i>"}</span><span class="n">${r.n ? `<span class="bdg ${r.n >= 10 ? "g" : ""}">${r.n}</span>` : ""}</span></div>`).join("");
  const d = NX.dossier;
  return {html: `<div class="hero"><h1>Le projet de loi logement, <span class="g">article par article.</span></h1><p>${esc(d.titre)} · ${esc(d.lecture)}</p></div>
    <div class="bigsearch" data-cmd="search">${IC.search}<span>Rechercher un alinéa, un amendement (CE…), un thème, une place</span><button class="go" data-go="atelier">Ouvrir l'atelier</button></div>
    <div class="stats"><div><div class="n">${NX.plan.length}</div><div class="l">articles</div><div class="s">dans le projet de loi transmis</div></div><div><div class="n">${ALL.length}</div><div class="l">amendements à l'article 4</div><div class="s">tous états, irrecevables compris</div></div><div><div class="n">${NAL}</div><div class="l">alinéas</div><div class="s">au texte transmis par le Sénat</div></div></div>
    <div class="wrap"><div class="h2row"><div><h2>Le projet de loi</h2><p>Chaque article avec son nombre d'amendements en commission. Seul l'article 4 est chargé en détail.</p></div></div><div class="acards">${plan}</div>
    <div class="h2row" id="grille"><div><h2>Article 4, d'étape en étape</h2><p>${esc(short(NX.article.intitule, 140))}</p></div><span class="sp"></span><span class="faint" style="font-size:12px">« modifié » = changé par rapport à l'étape précédente · pastille = amendements à l'Assemblée</span></div>
    <div class="grid-et"><div class="ge-h"><span>Al.</span>${ETAPES.map(id => `<span>${esc(ETL[id])}</span>`).join("")}<span>Texte transmis</span><span style="text-align:right">Amend.</span></div>${rows}</div></div>`};
}

/* ---------- ENJEUX ---------- */
function vEnjeux(){
  const th = THEMES.find(t => t.id === st.th) || THEMES[0], ams = NX.themeAms(th), als = themeAls(th), eps = NX.themeParoles(th);
  const mine = MINE.filter(m => als.includes(m.al));
  const nDecl = THEMES.filter(t => t.src === "déclaré").length;
  const pills = THEMES.map(t => `<button class="${t.id === th.id ? "on" : ""}" data-th="${t.id}">${esc(t.label)}<span class="faint" style="font-size:12px">${t.amendements.length}</span></button>`).join("");
  const M = NX.matrix(), max = Math.max(1, ...M.rows.flatMap(r => r.cells.map(c => c.length)));
  const mx = `<table class="mx"><thead><tr><th class="l">Thème</th>${M.gs.map(g => `<th title="${esc(GR[g].name)}"><span class="dot" style="background:${GR[g].color}"></span><br>${g}</th>`).join("")}<th title="Rapporteurs">Inst.</th></tr></thead><tbody>${M.rows.map(r => `<tr class="${r.th.id === th.id ? "on" : ""}"><td class="l" data-th="${r.th.id}" title="${esc(r.th.label)}">${esc(r.th.label)}</td>${r.cells.map(c => `<td data-th="${r.th.id}" style="--v:${c.length ? (.08 + c.length / max * .5).toFixed(2) : 0}">${c.length || ""}</td>`).join("")}<td data-th="${r.th.id}" style="--v:${r.inst.length ? .1 : 0}">${r.inst.length || ""}</td></tr>`).join("")}</tbody></table>`;
  const par = eps.slice(0, 4).map(e => `<div class="parole"><div class="w"><button class="chip" data-place="${e.place}">Place ${e.place}</button><span>${e.mots} mots</span></div>${e.paroles.slice(0, 2).map(p => `<div style="margin-top:4px"><b>${esc(NX.speaker(p))}</b> : « ${esc(short(p.txt, 170))} »</div>`).join("")}</div>`).join("");
  const amRows = ams.map(a => `<div class="row" data-am="${a.id}">${avA(a)}<div class="tx"><div class="t1">${a.num}</div><div class="t2">${esc(who(a).name)} · ${esc(objetOf(a))}</div></div><div class="r s-${sk(a)}">${esc(sortWord(a))}</div></div>`).join("");
  return {html: `<div class="wrap"><div class="hero"><h1>${THEMES.length} enjeux, <span class="g">trois strates.</span></h1><p>${nDecl} thèmes déclarés par le rapport, ${THEMES.length - nDecl} calculés par mots-clés. Pour chacun : ce que dit le rapport, ce qui a été dit en réunion, ce que fait votre texte.</p></div>
    <div class="thpills">${pills}</div>
    <div class="en-grid"><div style="display:flex;flex-direction:column;gap:16px"><div class="card"><div class="card-h"><h3>${esc(th.label)}</h3><span class="bdg ${th.src === "déclaré" ? "g" : ""}">${th.src === "déclaré" ? "déclaré par le rapport" : "calculé par mots-clés"}</span><span class="sp"></span><span class="faint" style="font-size:12px">${ams.length} amendements</span></div>
      <div class="strate"><h4>CE QUE DIT LE RAPPORT</h4><div class="quote">${esc(th.doc || "—")}</div></div>
      <div class="strate"><h4>CE QUI A ÉTÉ DIT EN RÉUNION · ${eps.length} ${plural(eps.length, "place")}</h4>${par || `<div class="faint">Rien en réunion.</div>`}</div>
      <div class="strate"><h4>CE QUE FAIT VOTRE TEXTE</h4>${mine.length ? mine.map(m => `<div class="parole" data-draft="${m.id}" style="cursor:pointer"><div class="w">${modeIc(m, 1)}<b>${esc(draftNum(m))}</b> · alinéa ${m.al}</div><div class="legal" style="font-size:14px;line-height:23px">${NX.draftDiff(m)}</div></div>`).join("") : `<div class="faint">Aucun de vos brouillons ne touche ce thème.</div>`}
        <div class="units" style="margin-top:10px"><span class="faint" style="font-size:12px;align-self:center">Alinéas du thème :</span>${als.map(o => `<button class="chip" data-al="${o}">§ ${o}</button>`).join("") || "—"}</div></div></div>
      <div><div class="sect-h"><h2>Les amendements du thème</h2><span class="bdg">${ams.length}</span></div><div class="rows">${amRows}</div></div></div>
      <div class="card" style="position:sticky;top:0"><div class="card-h"><h3>Thèmes × groupes</h3></div><div style="padding:0 12px 6px;color:var(--t3);font-size:12px">Nombre d'amendements, une seule chose comptée. Cliquer une case ouvre le thème.</div><div style="padding:0 8px 14px;overflow-x:auto">${mx}</div></div></div></div>`};
}

/* ---------- RÉUNION : le terminal ---------- */
const adopted = e => e.ams.some(id => AM[id] && AM[id].sort === "Adopté");
function vReunion(){
  const E = NX.episodes, e = E.find(x => x.place === st.place) || E[0], ams = e.ams.map(id => AM[id]).filter(Boolean);
  if (!st.amSel || !e.ams.includes(st.amSel)) st.amSel = ams[0] ? ams[0].id : null;
  const q = st.pq.toLowerCase();
  const list = E.filter(x => (st.pf === "toutes" || adopted(x)) && (!q || (x.titre + " " + x.place).toLowerCase().includes(q))).map(x => `<div class="prow${x.place === e.place ? " on" : ""}${adopted(x) ? " ad" : ""}" data-place="${x.place}"><span class="pn">${x.place}</span><div class="tx"><div class="t1">${esc(x.ams.slice(0, 3).join(", ") + (x.ams.length > 3 ? " +" + (x.ams.length - 3) : "") || short(x.titre, 40))}</div><div class="t2"><span class="bdg">${x.ams.length} am.</span>${adopted(x) ? `<span class="bdg g">adopté</span>` : ""}</div></div><div class="r"><b>${x.mots}</b><span class="faint">mots</span></div></div>`).join("");
  const total = E.reduce((s, x) => s + x.mots, 0);
  const bars = E.map(x => `<i class="${adopted(x) ? "ad" : ""}${x.place === e.place ? " on" : ""}" style="flex:${x.mots}" data-place="${x.place}" title="Place ${x.place} · ${x.mots} mots${adopted(x) ? " · amendement adopté" : ""}"></i>`).join("");
  const bnums = E.map(x => `<span style="flex:${x.mots}">${x.mots / total > .025 ? x.place : ""}</span>`).join("");
  const nad = ams.filter(a => a.sort === "Adopté").length;
  let tab;
  if (st.rtab === "vote") tab = `<div style="overflow-x:auto"><table class="vote"><thead><tr><th>#</th><th>Auteur</th><th>N°</th><th class="ob">Objet</th><th>Avis</th><th style="text-align:right">Sort</th></tr></thead><tbody>${ams.map((a, i) => `<tr class="${a.id === st.amSel ? "on" : ""}" data-sel="${a.id}"><td class="faint">${i + 1}</td><td><span class="who">${avA(a, "sm")}${esc(short(who(a).name, 26))}</span></td><td><b>${a.num}</b></td><td class="ob">${esc(short(objetOf(a), 110))}</td><td title="${esc(a.avis || "")}">${avisSym(a.avis)}</td><td style="text-align:right" class="s-${sk(a)}">${esc(sortWord(a))}</td></tr>`).join("")}</tbody></table></div>`;
  else if (st.rtab === "paroles") tab = `<div class="feed">${e.paroles.map(p => `<div class="parole"><div class="w">${p.groupe ? avc(NX.groupName(p.groupe), NX.groupColor(p.groupe), "sm") : `<span class="av sm" style="--c:#3d3a33;color:#e2e8f0">${p.role ? "R" : "·"}</span>`}<b style="color:var(--t)">${esc(NX.speaker(p))}</b><span>${p.mots} mots</span></div>${esc(p.txt)}</div>`).join("") || `<div class="empty">Aucune prise de parole.</div>`}</div>`;
  else tab = `<div class="feed">${e.decisions.map(d => `<div class="parole" style="display:flex;gap:10px"><span class="g">→</span><div>${esc(d.txt)}${d.ams.length ? `<div class="units" style="margin-top:8px">${d.ams.map(id => AM[id] ? `<button class="chip" data-sel="${id}">${id}</button>` : "").join("")}</div>` : ""}</div></div>`).join("")}</div>`;
  const a = AM[st.amSel];
  const right = a ? (() => { const w = who(a), o = amO(a), ep = NX.epOf(a);
    return `<div style="display:flex;gap:12px;align-items:center">${avA(a, "lg")}<div style="flex:1;min-width:0"><b style="font-size:16px">${a.num}</b><div class="muted" style="font-size:12px">${esc(w.name)}${a.auteur ? " · " + esc(a.auteur) : ""}</div></div>${sortBdg(a)}</div>
      <div class="seg"><button class="${st.rseg === "diff" ? "on" : ""}" data-rseg="diff">Face à la référence</button><button class="${st.rseg === "expose" ? "on" : ""}" data-rseg="expose">Exposé sommaire</button></div>
      <div class="amfield"><div class="lab"><span>${esc(modeLead(a, o))}</span><span>al. ${o}</span></div><div class="legal" style="font-size:14px;line-height:23px">${st.rseg === "diff" ? amHTML(a, o) : esc(a.expose || "—")}</div></div>
      <button class="btn-main" data-open-at="${a.id}">Ouvrir dans l'atelier</button>
      <dl class="kv"><dt>Groupe</dt><dd>${esc(w.name)}</dd><dt>Avis</dt><dd>${esc(a.avis || "—")}</dd><dt>Sort</dt><dd class="s-${sk(a)}">${esc(sortWord(a))}</dd><dt>Déposé le</dt><dd>${NX.fmtDate(a.depot)}</dd><dt>Place en réunion</dt><dd>${ep ? ep.place + " / " + E.length : "—"}</dd><dt>Alinéa visé</dt><dd>${o}</dd></dl>
      <button class="btn-ghost" data-cmp-add="${a.id}">${st.cmp.includes(a.id) ? "Retirer du comparateur" : "Déposer au comparateur"}</button>`; })() : `<div class="empty">Aucun amendement à cette place.</div>`;
  return {full: true, html: `<div class="term">
    <div class="tcol tl-left"><div class="hd"><div class="search-in" style="height:36px">${IC.search}<input id="pq" placeholder="Rechercher une place" value="${esc(st.pq)}"></div><div class="tp">${[["toutes", "Toutes"], ["adopte", "Avec adoption"]].map(([k, l]) => `<button class="${st.pf === k ? "on" : ""}" data-pf="${k}">${l}</button>`).join("")}</div></div><div class="lh"><span>Place · ordre d'appel</span><span>Mots prononcés</span></div><div id="plist">${list}</div></div>
    <div class="tcol tc-center"><div class="mkt"><button class="tok m-only" data-cmd="pick-place">${e.place} / ${E.length}${IC.chev}</button><div class="sym"><span class="pn av" style="--c:${adopted(e) ? "#acf47d" : "#212a36"};${adopted(e) ? "" : "color:var(--t)"}">${e.place}</span>Place ${e.place}</div><div class="st">Mots<b>${e.mots}</b></div><div class="st">Prises de parole<b>${e.paroles.length}</b></div><div class="st">Amendements<b>${ams.length}</b></div><div class="st">Adoptés<b class="${nad ? "g" : ""}">${nad}</b></div><div class="st">Réunion<b>21 sept. 2026</b></div></div>
      <div style="padding:12px 16px 0;font-weight:500;color:var(--t2);font-size:13px;line-height:19px">${esc(e.titre)}</div>
      <div class="bande"><div class="bh"><span>Les ${E.length} places, à l'échelle des mots prononcés (${total} mots)</span><span><span class="dot" style="background:var(--a2)"></span> amendement adopté</span></div><div class="bars">${bars}</div><div class="bnums">${bnums}</div></div>
      <div class="tl">${[["vote", "Liste de vote", ams.length], ["paroles", "Paroles", e.paroles.length], ["decisions", "Décisions", e.decisions.length]].map(([k, l, n]) => `<button class="${st.rtab === k ? "on" : ""}" data-rtab="${k}">${l} <span class="faint">${n}</span></button>`).join("")}</div>${tab}</div>
    <div class="tcol tc-right">${right}</div></div>`, after: () => { const pq = $("#pq"); if (pq) pq.addEventListener("input", () => { st.pq = pq.value; const p = pq.selectionStart; render(); const n = $("#pq"); n.focus(); n.setSelectionRange(p, p); }); }};
}

/* ---------- LISEZ-MOI ---------- */
function vLisez(){
  return {html: `<div class="readme"><div class="hero" style="margin-top:0"><h1 style="font-size:36px;line-height:42px">Boussole, <span class="g">à la manière d'une super-app.</span></h1><p style="font-size:14px">Maquette inspirée de Jupiter (jup.ag, 2025–2026) · article 4 du projet de loi logement · données réelles, groupes politiques fictifs.</p></div>
  <div class="card" style="padding:4px 22px 20px;margin-top:28px">
  <h3>Les quatre espaces, transposés</h3><ul>
   <li><b>Atelier = la carte d'échange (swap).</b> Bloc plein « De : la référence » (vierge), bloc en creux « Vers : ma rédaction » (corrections apparentes), <b>bouton d'inversion</b> à cheval sur les deux : il met un concurrent à la place de ma rédaction, rendu exactement de la même manière (symétrie). Onglets pilules Rédiger | Insérer | Supprimer = les modes ; la pilule « § Al. 12 » ouvre le sélecteur (recherche, Esc, raccourcis = alinéas les plus disputés, onglets Mes brouillons | Disputés | Tous). Bouton principal plein « Modifier ma rédaction », puis « Valider ». Sous la carte : deux cartes de jeton, le chevron double, les concurrents en lignes de cartes filtrables.</li>
   <li><b>Comparer</b> : deux pilules de sélection et un bouton d'inversion, puis trois colonnes alignées (sous-grille) : une rédaction | la référence pleine au centre | l'autre. Carrousel horizontal sur mobile.</li>
   <li><b>Dossier et Enjeux = la page Portfolio</b> : héros deux tons, grande recherche en pilule avec bouton vert intégré, trois chiffres clés (chacun compte une seule chose), cartes d'articles 88 px ; grille alinéas × étapes ; fiche de thème en trois strates et matrice thèmes × groupes (nombres d'amendements).</li>
   <li><b>Réunion = le terminal Perps</b> : à gauche les 26 places (recherche, filtres pilules, lignes 72) ; au centre la barre de statistiques, la bande des places à l'échelle des mots (les barres de volume), puis les onglets soulignés Liste de vote | Paroles | Décisions ; à droite le panneau de l'amendement (segment, champ, gros bouton vert, liste clé–valeur alignée à droite).</li>
   <li><b>Bandeau défilant</b> (le bandeau de cours) : les alinéas les plus disputés puis les sorts récents, en vert (adopté) et rose (rejeté).</li></ul>
  <h3>Ce qui est emprunté à la forme</h3><ul>
   <li>Navigation gauche 224 px en trois sections verbales titrées (Rédiger, Explorer, Suivre, puis Plus), repliable en rail 56 px (.28 s, cubic-bezier(.22,1,.36,1)) ; barre du haut 56 px avec recherche en pilule 448×36 et raccourci « / » ; pilule verte à droite (ici : la référence).</li>
   <li>Surfaces en niveaux plutôt qu'en ombres : fond #090d10, carte #0d151e, champ plein #151e28, bordures #19242e / #212a36 en anneau intérieur ; accent unique vert citron #acf47d ; hausse #3ce3ab, baisse #f23674.</li>
   <li>Rayons : pilule partout, 12 (lignes, modale), 16 (cartes, bouton principal 58 px), 32 (cadre de la carte d'échange). Grille de points et halo vert à 5 % en haut ; liseré « shine » sur l'annonce.</li>
   <li>Sélecteur modal 448 px : champ de recherche + touche Esc, raccourcis en pilules 36, onglets pilules, lignes 72 avec pastille ronde 32. Mobile : tiroir (hamburger) et barre d'onglets en bas.</li>
   <li>Police : Inter (Google Fonts), la police de Jupiter, 14 px dominant.</li></ul>
  <h3>Gestes</h3><ul><li>${kb("/")} rechercher (ou Ctrl+K) · double-clic sur ma rédaction pour l'éditer · ${kb("Ctrl Entrée")} valider · ${kb("Échap")} revient d'un cran (loupe, modale, édition, concurrent → ma rédaction, vue → atelier) · clic sur une correction : la loupe, référence et rédaction côte à côte · ⊕ sur une ligne : au comparateur.</li></ul>
  <h3>Écarts assumés</h3><ul>
   <li>La direction artistique « papier sombre » du projet est suspendue ici : la forme suit l'inspiration. Les règles de comparaison sont gardées : référence vierge, corrections portées sur la rédaction comparée, symétrie stricte ; ajouts soulignés en gras vert, suppressions barrées en rose.</li>
   <li>Pas de score ni de jauge : les chiffres affichés comptent chacun une seule chose (amendements, mots, alinéas, places).</li>
   <li>Aucun logo ni nom de produit, aucune opération de portefeuille. Les passages disputés reprennent la couleur « warning » (#fbbf25) en souligné tireté, absente de la grammaire d'origine.</li>
   <li>Sources : jup.ag (accueil, /perps, /portfolio, sélecteur de jeton), relevés en novembre 2026 ; aucun billet de principes de design officiel trouvé.</li></ul></div></div>`};
}

/* ---------- MODALES ---------- */
function openModal(M){ MODAL = M; renderModal(); const i = $("#modal .m-in input"); if (i) i.focus(); }
function closeModal(){ MODAL = null; renderModal(); }
function renderModal(){
  const el = $("#modal"), sc = $("#scrim");
  el.classList.toggle("on", !!MODAL); sc.classList.toggle("on", !!MODAL);
  if (!MODAL){ el.innerHTML = ""; return; }
  el.classList.toggle("wide", !!MODAL.wide);
  el.innerHTML = ({pick: mPick, am: mAm, unit: mUnit, hist: mHist, art: mArt})[MODAL.kind]();
  if (MODAL.kind === "pick") bindPick();
}
// le sélecteur : recherche + Esc, raccourcis pilules, onglets, lignes 72
function mPick(){
  const M = MODAL;
  return `<div class="m-in">${IC.search}<input id="mq" placeholder="${esc(M.ph)}" value="${esc(M.q || "")}" autocomplete="off" spellcheck="false"><button data-cmd="close"><kbd>Esc</kbd></button></div>
    ${M.sc && M.sc.length ? `<div class="m-sc">${M.sc.map((s, i) => `<button data-sc="${i}">${s.av}${esc(s.label)}</button>`).join("")}</div>` : ""}
    ${M.tabs.length > 1 ? `<div class="m-tabs tp">${M.tabs.map((t, i) => `<button class="${i === M.tab ? "on" : ""}" data-mtab="${i}">${esc(t.label)}</button>`).join("")}</div>` : ""}
    <div class="m-list" id="mlist">${pickList()}</div>`;
}
function pickItems(){ const M = MODAL, q = (M.q || "").toLowerCase().trim(); return M.tabs[M.tab].items().filter(x => !q || (x.t + " " + (x.sub || "")).toLowerCase().includes(q)).slice(0, 80); }
function pickList(){
  const L = pickItems(); MODAL.list = L; MODAL.i = Math.min(MODAL.i || 0, Math.max(0, L.length - 1));
  return L.map((x, i) => `<div class="mrow${i === MODAL.i ? " on" : ""}" data-mi="${i}">${x.av}<div class="tx"><div class="t1">${esc(x.t)}${x.check ? IC.check : ""}${x.bdg || ""}</div><div class="t2">${esc(x.sub || "")}</div></div><div class="r">${x.r || ""}</div></div>`).join("") || `<div class="empty">Aucun résultat.</div>`;
}
function bindPick(){
  const i = $("#mq"); if (!i) return;
  i.addEventListener("input", () => { MODAL.q = i.value; MODAL.i = 0; $("#mlist").innerHTML = pickList(); });
}
function pickRun(i){ const x = MODAL && MODAL.list && MODAL.list[i]; if (!x) return; closeModal(); x.run(); }
const avSec = (t, c) => `<span class="av" style="--c:${c || "#212a36"};color:${c ? "#090d10" : "var(--t)"}">${esc(t)}</span>`;
const itDraft = (m, run) => ({av: avMe(), t: `${draftNum(m)} · alinéa ${m.al}`, sub: `${cap(modeWord(m))} · ${short(m.mode === "supprimer" ? refAl(m.al) : m.texte, 80)}`, r: m.id === st.draft ? `<span class="g">en cours</span>` : "", run: run || (() => openDraft(m.id))});
const itAm = (a, run) => ({av: avA(a), t: a.num, check: sk(a) === "adopte", sub: `${who(a).name} · ${objetOf(a) || modeLead(a, amO(a))}`, r: `<span class="s-${sk(a)}">${esc(sortWord(a))}</span>`, run: run || (() => openModal({kind: "am", id: a.id, wide: true}))});
const itAl = (o, run) => { const n = concurrents(o).units.length; return {av: avSec(o, MINE.some(m => m.al === o) ? GR[ME].color : null), t: `Alinéa ${o}`, check: MINE.some(m => m.al === o), sub: NX.alShort(o, 90), r: n ? `${n} conc.` : "", run: run || (() => setAl(o))}; };
const itTh = t => ({av: avSec("#"), t: t.label, sub: `${t.src === "déclaré" ? "déclaré par le rapport" : "calculé par mots-clés"} · ${t.amendements.length} amendements`, run: () => { st.th = t.id; go("enjeux"); }});
const itPl = e => ({av: avSec(e.place, adopted(e) ? "#acf47d" : null), t: `Place ${e.place}`, sub: e.titre, r: `${e.mots} mots`, run: () => openPlace(e.place)});
const discTop = () => NX.alsDisputes().sort((x, y) => y.n - x.n).slice(0, 5);
const scAls = run => discTop().map(x => ({av: avSec(x.o), label: `${x.n} conc.`, run: () => (run || setAl)(x.o)}));
function searchModal(){
  const acts = [{av: avSec("✎", "#acf47d"), t: "Nouveau brouillon sur l'alinéa courant", sub: `alinéa ${st.o}`, run: () => cmd("new")},
    ...ETAPES.map(id => ({av: avSec("✦"), t: `Référence : ${ET[id].label}`, sub: id === REF ? "actuelle" : "changer la référence vierge", run: () => setRef(id)})),
    ...Object.entries(VIEWS).map(([k, l]) => ({av: avSec("→"), t: `Aller à : ${l}`, sub: "", run: () => go(k)}))];
  const all = () => [...MINE.map(m => itDraft(m)), ...Array.from({length: NAL}, (_, i) => itAl(i + 1)), ...ALL.filter(a => a.mode !== "hors-texte").map(a => itAm(a)), ...THEMES.map(itTh), ...NX.episodes.map(itPl), ...acts];
  openModal({kind: "pick", ph: "Rechercher un alinéa, un amendement (CE…), un thème, une place…", tab: 0, i: 0, sc: scAls(),
    tabs: [{label: "Tout", items: all}, {label: "Alinéas", items: () => Array.from({length: NAL}, (_, i) => itAl(i + 1))}, {label: "Amendements", items: () => ALL.filter(a => a.mode !== "hors-texte").map(a => itAm(a))}, {label: "Thèmes", items: () => THEMES.map(itTh)}, {label: "Places", items: () => NX.episodes.map(itPl)}, {label: "Actions", items: () => acts}]});
}
function alModal(){
  openModal({kind: "pick", ph: "Rechercher un alinéa (numéro ou mots)", tab: MINE.some(m => m.al === st.o) ? 0 : 1, i: 0, sc: scAls(),
    tabs: [{label: "Mes brouillons", items: () => MINE.map(m => itAl(m.al, () => openDraft(m.id))).map((x, i) => ({...x, t: `${x.t} · ${draftNum(MINE[i])}`}))}, {label: "Disputés", items: () => NX.alsDisputes().sort((x, y) => y.n - x.n).map(x => itAl(x.o))}, {label: "Tous", items: () => Array.from({length: NAL}, (_, i) => itAl(i + 1))}]});
}
function versModal(){
  openModal({kind: "pick", ph: "Ma rédaction ou un concurrent de l'alinéa " + st.o, tab: 0, i: 0, sc: [],
    tabs: [{label: "Mes brouillons", items: () => MINE.map(m => itDraft(m))}, {label: `Concurrents · al. ${st.o}`, items: () => concurrents(st.o).units.map(u => itAm(u.lead, () => { st.vers = u.lead.id; st.editing = false; render(); }))}]});
}
function slotModal(k){
  const o = st.cmp[0] && sideOf(st.cmp[0]) ? sideOf(st.cmp[0]).o : st.o, setK = id => { if (st.cmp[1 - k] === id) st.cmp[1 - k] = st.cmp[k]; st.cmp[k] = id; render(); };
  openModal({kind: "pick", ph: "Choisir une rédaction à comparer", tab: k ? 1 : 0, i: 0, sc: [],
    tabs: [{label: "Mes brouillons", items: () => MINE.map(m => itDraft(m, () => setK(m.id)))}, {label: `Concurrents · al. ${o}`, items: () => concurrents(o).units.map(u => itAm(u.lead, () => setK(u.lead.id)))}, {label: "Tous", items: () => ALL.filter(a => !isEcarte(a)).map(a => itAm(a, () => setK(a.id)))}]});
}
function refModal(){
  openModal({kind: "pick", ph: "Choisir la référence vierge", tab: 0, i: ETAPES.indexOf(REF), sc: [],
    tabs: [{label: "Étapes", items: () => ETAPES.map((id, i) => ({av: avSec(i + 1, id === REF ? "#acf47d" : null), t: ET[id].label, check: id === REF, sub: id === REF ? "référence actuelle · reste vierge, les corrections sont portées sur les rédactions" : ETL[id], run: () => setRef(id)}))}]});
}
function placeModal(){ openModal({kind: "pick", ph: "Rechercher une place", tab: 0, i: st.place - 1, sc: [], tabs: [{label: "Toutes", items: () => NX.episodes.map(itPl)}, {label: "Avec adoption", items: () => NX.episodes.filter(adopted).map(itPl)}]}); }
// la fiche d'un amendement
function mAm(){
  const a = AM[MODAL.id], w = who(a), o = amO(a), ep = NX.epOf(a), tab = MODAL.tab || "diff";
  const touched = [...new Set([...a.applique.rows.map(r => r.o).filter(Boolean), ...a.spans.map(s => s.al)])].sort((x, y) => x - y);
  const diff = touched.length ? touched.map(x => `<div class="clu"><div class="faint" style="font-size:12px;margin-bottom:4px">Alinéa ${x}</div><div class="legal" data-o="${x}">${amHTML(a, x)}</div></div>`).join("") : `<div class="clu"><div class="legal">${esc(a.dispositif || "—")}</div></div>`;
  const ins = []; for (const [, l] of verOfAmendment(a).ins) l.forEach(t => ins.push(`<div class="clu"><div class="faint" style="font-size:12px;margin-bottom:4px">Alinéa inséré</div><div class="legal"><ins>${esc(t)}</ins></div></div>`));
  const body = tab === "diff" ? `<div class="muted" style="font-size:13px;margin-top:12px">${esc(modeLead(a, o))} · face à : ${esc(refShort())}</div>${diff}${ins.join("")}`
    : tab === "expose" ? `<div class="legal" style="margin-top:12px;font-size:14px;line-height:23px">${esc(a.expose || "—")}</div>${a.cartouche ? `<div class="quote" style="margin-top:12px;font-size:13px">${esc(a.cartouche)}</div>` : ""}`
    : `<div class="rows" style="margin-top:12px">${a.versions.map(v => `<div class="row" style="cursor:default;min-height:48px"><div class="tx"><div class="t1" style="font-size:13px">${esc(v.etat)}${v.sort ? " · " + esc(v.sort) : ""}</div><div class="t2">${esc((v.champs || []).join(", "))}</div></div><div class="r faint">${esc(v.date.replace("T", " "))}</div></div>`).join("")}</div>`;
  return `<div class="m-head">${avA(a, "lg")}<div class="tx"><b>${a.num} ${sortBdg(a)}</b><small>${esc(w.name)}${a.auteur ? " · " + esc(a.auteur) : ""} · déposé le ${NX.fmtDate(a.depot)}</small></div><button data-cmd="close"><kbd>Esc</kbd></button></div>
    <div class="m-tabs tp">${[["diff", "Face à la référence"], ["expose", "Exposé sommaire"], ["versions", "Versions"]].map(([k, l]) => `<button class="${tab === k ? "on" : ""}" data-amtab="${k}">${l}</button>`).join("")}</div>
    <div class="m-body">${body}<dl class="kv" style="margin-top:16px"><dt>Avis</dt><dd>${esc(a.avis || "—")}</dd><dt>Sort</dt><dd class="s-${sk(a)}">${esc(sortWord(a))}</dd><dt>Place en réunion</dt><dd>${ep ? `<a href="#" data-place="${ep.place}" class="g">place ${ep.place} ↗</a>` : "—"}</dd></dl></div>
    <div class="m-act"><button class="btn-main" data-open-at="${a.id}">Mettre face à la référence</button><button class="btn-ghost" data-cmp-add="${a.id}">${st.cmp.includes(a.id) ? "Retirer du comparateur" : "Au comparateur"}</button>${ep ? `<button class="btn-ghost" data-place="${ep.place}">Place ${ep.place}</button>` : ""}</div>`;
}
// les propositions regroupées sur un passage disputé
function mUnit(){
  const u = unitsOf(MODAL.o).find(x => x.k === MODAL.k); if (!u) return `<div class="empty">Passage introuvable.</div>`;
  const C = clusters(u);
  const rows = C.list.map(c => { const isRef = c.items.some(i => i.id === "ref");
    const txt = isRef ? esc(c.text) : c.text == null ? `<del>${esc(C.ref)}</del>` : inlineDiff(C.ref, c.text);
    const its = c.items.filter(i => i.id !== "ref"), more = its.length - 8;
    const who_ = its.sort((x, y) => (y.mine ? 1 : 0) - (x.mine ? 1 : 0)).slice(0, 8).map(i => i.a ? `<button class="chip" data-am="${i.a.id}">${avc(i.label, i.color, "sm")}${esc(i.a.num)} · ${esc(short(i.label, 20))}</button>` : `<button class="chip g" data-draft="${i.id}">${avMe("sm")}${esc(i.label)}</button>`).join("") + (more > 0 ? `<span class="chip" style="cursor:default">+${more}</span>` : "");
    return `<div class="clu ${isRef ? "ref" : ""}"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px"><span class="${isRef ? "g" : "muted"}">${isRef ? "Texte transmis · vierge · garder le passage" : c.text == null ? "Supprime le passage" : "Rédaction distincte"}</span><span class="faint">${c.items.filter(i => i.id !== "ref").length} ${plural(c.items.filter(i => i.id !== "ref").length, "porteur")}</span></div><div class="legal">${txt}</div>${who_ ? `<div class="who">${who_}</div>` : ""}</div>`; }).join("");
  return `<div class="m-head"><span class="av lg" style="--c:rgba(251,191,37,.18);color:var(--warn)">${u.n}</span><div class="tx"><b>« ${esc(u.label)} »</b><small>Alinéa ${u.o} · ${u.n} propositions · ${C.list.length} rédactions distinctes, la référence comprise</small></div><button data-cmd="close"><kbd>Esc</kbd></button></div><div class="m-body">${rows}</div>`;
}
function mHist(){
  const o = MODAL.o, H = NX.hist(o), n = concurrents(o).units.length;
  return `<div class="m-head">${avSec(o)}<div class="tx"><b>Alinéa ${o}, d'étape en étape</b><small>chaque étape face à la précédente</small></div><button data-cmd="close"><kbd>Esc</kbd></button></div>
    <div class="m-body">${H.map((h, i) => `<div class="etape"><div class="eh"><span class="av sm" style="--c:${h.same || !i ? "#212a36" : "#acf47d"};${h.same || !i ? "color:var(--t)" : ""}">${i + 1}</span>${esc(ET[h.id].label)}<span class="sp" style="flex:1"></span><span class="bdg ${i && !h.same && !h.absent ? "g" : ""}">${!i ? "origine" : h.absent ? "absent" : h.same ? "inchangé" : "modifié"}</span></div><div class="legal" style="font-size:14px;line-height:23px">${h.diff == null ? `<span class="faint">— absent à cette étape</span>` : h.diff}</div></div>`).join("")}</div>
    <div class="m-act"><button class="btn-main" data-amender="${o}">Amender cet alinéa</button><button class="btn-ghost" data-al="${o}">${n} ${plural(n, "concurrent")}</button></div>`;
}
function mArt(){
  const p = NX.plan.find(x => x.num === MODAL.num);
  return `<div class="m-head">${avSec(p.num)}<div class="tx"><b>Article ${esc(p.num)}</b><small>${esc(p.statut || "")}</small></div><button data-cmd="close"><kbd>Esc</kbd></button></div>
    <div class="m-body"><p class="legal" style="font-size:14px">${esc(p.intitule || "(sans intitulé)")}</p>${p.cible ? `<p class="muted" style="font-size:13px">Vise : ${esc(short(p.cible, 220))}</p>` : ""}
    <dl class="kv">${Object.entries(p.amendements).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${v}</dd>`).join("") || "<dt>Aucun amendement</dt><dd></dd>"}</dl>
    <p class="faint" style="font-size:12px;margin-top:16px">Seul l'article 4 est chargé en détail dans cette maquette.</p></div>`;
}

/* ---------- la loupe ---------- */
function openLoupe(el, ev){
  const h = HUNKS.get(+el.dataset.h); if (!h) return;
  const refPart = h.seg.filter(s => s.type === "del").map(s => s.text).join("").trim();
  const L = $("#loupe");
  L.innerHTML = `<div class="lh"><span>La modification et le passage de la référence, côte à côte</span><span>${kb("Échap")}</span></div><div class="lc"><div><small>Référence · ${esc(refShort())}</small><span class="cx">${esc(h.before)}</span> ${refPart ? `<b style="font-weight:600">${esc(refPart)}</b>` : `<span class="faint">∅</span>`} <span class="cx">${esc(h.after)}</span></div><div><small>Cette rédaction</small><span class="cx">${esc(h.before)}</span> ${renderOps(h.seg)} <span class="cx">${esc(h.after)}</span></div></div>`;
  L.classList.add("on");
  const r = el.getBoundingClientRect(), w = L.offsetWidth, hh = L.offsetHeight;
  L.style.left = clamp(r.left - 40, 12, innerWidth - w - 12) + "px";
  L.style.top = (r.bottom + 8 + hh > innerHeight ? Math.max(8, r.top - hh - 8) : r.bottom + 8) + "px";
}
function closeLoupe(){ $("#loupe").classList.remove("on"); }

/* ---------- actions ---------- */
function toast(msg){
  const t = document.createElement("div"); t.className = "toast"; t.innerHTML = `<span class="i">${IC.spark}</span><span>${msg}</span>`;
  $("#toasts").appendChild(t); setTimeout(() => t.remove(), 5000); while ($("#toasts").children.length > 3) $("#toasts").firstChild.remove();
}
function setAl(o){ st.o = o; const m = draftOn(o); if (m) st.draft = m.id; st.vers = "mine"; st.q = ""; go("atelier"); }
function openDraft(id){ const m = MINE.find(x => x.id === id); if (!m) return; st.draft = id; st.o = m.al; st.vers = "mine"; go("atelier"); }
function openPlace(n){ st.place = n; st.amSel = null; go("reunion"); }
function setRef(id){ REF = id; store.set("ref", id); toast(`Référence : ${esc(ET[id].label)}. Elle reste vierge ; les corrections sont portées sur les rédactions.`); render(); }
function cmpToggle(id){
  const i = st.cmp.indexOf(id);
  if (i >= 0) st.cmp.splice(i, 1); else { if (st.cmp.length >= 2) st.cmp[1] = id; else st.cmp.push(id); toast(`${esc(itemLabel(id))} déposé au comparateur (${st.cmp.length}/2).${st.cmp.length === 2 ? ` <a href="#" data-go="comparer" class="g">Comparer</a>` : ""}`); }
  render();
}
function cmd(c, el){
  switch (c){
    case "search": return searchModal();
    case "close": return closeModal();
    case "ref": return refModal();
    case "rail": st.rail = !st.rail; return render();
    case "pick-al": return alModal();
    case "pick-vers": return versModal();
    case "pick-slot": return slotModal(+el.dataset.k);
    case "pick-place": return placeModal();
    case "swap-slots": st.cmp = [st.cmp[1], st.cmp[0]].filter(Boolean); return render();
    case "refopen": st.refOpen = !st.refOpen; return render();
    case "marks": st.marks = !st.marks; return render();
    case "hideann": st.hideAnn = true; return render();
    case "toconc": { const c2 = $("#conc"); if (c2) c2.scrollIntoView({behavior: reduced ? "auto" : "smooth"}); return; }
    case "flip": {
      if (st.vers !== "mine"){ st.vers = "mine"; return render(); }
      const C = concurrents(st.o).units; if (!C.length) return toast(`Aucun concurrent sur l'alinéa ${st.o}.`);
      st.vers = C[0].lead.id; st.editing = false; toast(`${C[0].lead.num} prend la place de votre rédaction, face à la même référence. ⇅ pour revenir.`); return render();
    }
    case "back-mine": st.vers = "mine"; return render();
    case "new": { const m = newDraft(st.o); st.draft = m.id; st.vers = "mine"; st.editing = true; toast(`${esc(draftNum(m))} créé sur l'alinéa ${st.o}, à partir de la référence.`); return go("atelier"); }
    case "edit": { const m = draftOn(st.o); if (!m || m.mode === "supprimer") return; st.editing = true; return render(); }
    case "valider": { const m = draftOn(st.o), ta = $("#ta"); if (m && ta){ m.texte = ta.value; saveDrafts(); UNIT_CACHE.clear(); } st.editing = false; toast(`${esc(draftNum(m))} enregistré.`); return render(); }
    case "annuler": st.editing = false; return render();
    case "fold": st.unfold = !st.unfold; return render();
    case "unfold": st.unfold = true; return render();
    case "code": st.artTab = "code"; return go("article");
  }
}
function setMode(x){
  const m = draftOn(st.o); if (!m || m.mode === x) return;
  m.mode = x;
  if (x === "rediger" && !m.texte) m.texte = TRANSMIS[m.al - 1];
  if (x === "inserer" && sameText(m.texte, TRANSMIS[m.al - 1])) m.texte = "";
  saveDrafts(); UNIT_CACHE.clear(); st.editing = x === "inserer" && !m.texte; render();
}

/* ---------- gestes ---------- */
document.addEventListener("click", e => {
  const L = $("#loupe");
  if (L.classList.contains("on") && !e.target.closest("#loupe")){ closeLoupe(); if (!e.target.closest("[data-h]")) return; }
  const hk = e.target.closest("ins[data-h],del[data-h]");
  if (hk && !st.editing){ e.preventDefault(); return openLoupe(hk, e); }
  if (e.target.id === "scrim"){ return closeModal(); }
  const t = e.target.closest("[data-go],[data-cmd],[data-draft],[data-al],[data-hist],[data-art],[data-unit],[data-am],[data-th],[data-place],[data-amender],[data-mode],[data-filt],[data-cmp-add],[data-uncmp],[data-slide],[data-arttab],[data-codetab],[data-rtab],[data-rseg],[data-sel],[data-pf],[data-open-at],[data-mi],[data-mtab],[data-sc],[data-amtab],mark.pt");
  if (!t) return;
  if (t.tagName === "A") e.preventDefault();
  const d = t.dataset;
  if (d.cmpAdd){ e.stopPropagation(); return cmpToggle(d.cmpAdd); }
  if (d.uncmp){ st.cmp = st.cmp.filter(x => x !== d.uncmp); return render(); }
  if (d.mi != null) return pickRun(+d.mi);
  if (d.mtab != null){ MODAL.tab = +d.mtab; MODAL.i = 0; return renderModal(), $("#mq") && $("#mq").focus(); }
  if (d.sc != null){ const s = MODAL.sc[+d.sc]; closeModal(); return s.run(); }
  if (d.amtab){ MODAL.tab = d.amtab; return renderModal(); }
  if (t.matches("mark.pt") || d.unit != null){
    if (st.editing) return;
    const k = t.matches("mark.pt") ? +t.dataset.u : +d.unit; if (Number.isNaN(k)) return;
    let o = st.o; const sh = t.closest("[data-o]"); if (sh) o = +sh.dataset.o;
    return openModal({kind: "unit", o, k, wide: true});
  }
  if (MODAL && !t.closest("#modal") && d.cmd !== "close") closeModal();
  if (d.cmd) return cmd(d.cmd, t);
  if (d.mode){ if (t.disabled) return; return setMode(d.mode); }
  if (d.go){ closeModal(); return go(d.go); }
  if (d.draft){ closeModal(); return openDraft(d.draft); }
  if (d.amender){ const o = +d.amender, m = draftOn(o) || newDraft(o); closeModal(); return openDraft(m.id); }
  if (d.openAt){ const a = AM[d.openAt]; closeModal(); st.o = amOctx(a); st.vers = a.id; st.editing = false; return go("atelier"); }
  if (d.al){ closeModal(); return setAl(+d.al); }
  if (d.hist) return openModal({kind: "hist", o: +d.hist, wide: true});
  if (d.art){ if (d.art === "4"){ const g = $("#grille"); if (g) g.scrollIntoView({behavior: reduced ? "auto" : "smooth"}); return; } return openModal({kind: "art", num: d.art}); }
  if (d.am) return openModal({kind: "am", id: d.am, wide: true});
  if (d.th){ st.th = d.th; return go("enjeux", st.view === "enjeux"); }
  if (d.place){ closeModal(); return openPlace(+d.place); }
  if (d.filt){ st.filt = d.filt; $("#conc").outerHTML = concList(); return afterAtelier.bindOnly(); }
  if (d.slide != null){ st.slide = +d.slide; const a = $("#ann"); if (a) a.outerHTML = annonceHTML(); return; }
  if (d.arttab){ st.artTab = d.arttab; return render(); }
  if (d.codetab){ st.codeTab = d.codetab; return render(); }
  if (d.rtab){ st.rtab = d.rtab; return render(); }
  if (d.rseg){ st.rseg = d.rseg; return render(); }
  if (d.sel){ st.amSel = d.sel; return render(); }
  if (d.pf){ st.pf = d.pf; return render(); }
});
document.addEventListener("dblclick", e => {
  if (st.view !== "atelier" || st.editing || st.vers !== "mine" || e.target.closest("mark.pt")) return;
  if (e.target.closest("#vers")){ const m = draftOn(st.o); if (m && m.mode !== "supprimer"){ st.editing = true; render(); } }
});
$("#search").onclick = () => searchModal();
$("#burger").onclick = () => { st.drawer = !st.drawer; renderNav(); };
document.addEventListener("pointerdown", e => { if (st.drawer && !e.target.closest("#nav") && !e.target.closest("#burger")){ st.drawer = false; renderNav(); } });
document.addEventListener("keydown", e => {
  const k = e.key, ctrl = e.ctrlKey || e.metaKey;
  if ($("#loupe").classList.contains("on") && k === "Escape"){ e.preventDefault(); return closeLoupe(); }
  if (MODAL){
    if (k === "Escape"){ e.preventDefault(); return closeModal(); }
    if (MODAL.kind === "pick"){
      if (k === "ArrowDown" || k === "ArrowUp"){ e.preventDefault(); MODAL.i = clamp((MODAL.i || 0) + (k === "ArrowDown" ? 1 : -1), 0, Math.max(0, MODAL.list.length - 1)); $("#mlist").innerHTML = pickList(); const on = $("#mlist .on"); if (on) on.scrollIntoView({block: "nearest"}); return; }
      if (k === "Enter"){ e.preventDefault(); return pickRun(MODAL.i || 0); }
    }
    return;
  }
  if (st.editing){ if (k === "Escape"){ e.preventDefault(); return cmd("annuler"); } if (k === "Enter" && ctrl){ e.preventDefault(); return cmd("valider"); } return; }
  if (e.target.matches("input,textarea")){ if (k === "Escape") e.target.blur(); return; }
  if (k === "/" || (ctrl && k.toLowerCase() === "k")){ e.preventDefault(); return searchModal(); }
  if (k === "Escape"){
    if (st.drawer){ st.drawer = false; return renderNav(); }
    if (st.view === "atelier" && st.vers !== "mine"){ st.vers = "mine"; return render(); }
    if (["comparer", "article", "lisez"].includes(st.view)) return go("atelier");
    if (st.view !== "atelier") return go("atelier");
  }
});
// l'annonce tourne (carrousel), sauf pendant l'édition
setInterval(() => { if (st.view !== "atelier" || st.editing || MODAL || reduced || document.hidden) return; const a = $("#ann"); if (!a || a.matches(":hover")) return; st.slide++; a.outerHTML = annonceHTML(); }, 7000);

renderTick();
render();
if (!store.get("vu", false)){ toast("Maquette inspirée de Jupiter. <b>/</b> pour rechercher ; le Lisez-moi (en bas de la navigation) dit ce qui est emprunté."); store.set("vu", true); }
