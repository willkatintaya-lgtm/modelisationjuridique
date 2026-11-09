/* Boussole · inspiration Figma (UI3) — pages, calques, cadres sur un canevas, propriétés, Actions, Inspecteur.
   S'appuie sur le noyau commun (données réelles, groupes fictifs). */
"use strict";
const I = {   // icônes au trait fin, grille de 24 px
  move:'<svg viewBox="0 0 24 24"><path d="M7.5 5.5l10 5.2-4.4 1.3-2.1 4.3z" fill="currentColor"/></svg>',
  hand:'<svg viewBox="0 0 24 24"><path d="M9 12V7.5a1 1 0 0 1 2 0V11m0-4.5V6a1 1 0 0 1 2 0v5m0-4a1 1 0 0 1 2 0v4.5m0-3a1 1 0 0 1 2 0V14a5 5 0 0 1-5 5h-.5a5 5 0 0 1-4-2l-2.3-3.2a1 1 0 0 1 1.5-1.3L9 14"/></svg>',
  frame:'<svg viewBox="0 0 24 24"><path d="M9 5v14M15 5v14M5 9h14M5 15h14"/></svg>',
  shape:'<svg viewBox="0 0 24 24"><rect x="5.5" y="6.5" width="13" height="11" rx="1"/><path d="M12 6.5v11"/></svg>',
  text:'<svg viewBox="0 0 24 24"><path d="M6.5 7V5.5h11V7M12 5.5v13M10 18.5h4"/></svg>',
  comment:'<svg viewBox="0 0 24 24"><path d="M12 5.5a6.5 6.5 0 0 0-5.7 9.6L5.5 18.5l3.4-.8A6.5 6.5 0 1 0 12 5.5z"/></svg>',
  actions:'<svg viewBox="0 0 24 24"><path d="M12 4.5l1.6 4.4 4.4 1.6-4.4 1.6L12 16.5l-1.6-4.4L6 10.5l4.4-1.6zM17.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/></svg>',
  code:'<svg viewBox="0 0 24 24"><path d="M9 8l-4 4 4 4M15 8l4 4-4 4M13 6.5l-2 11"/></svg>',
  car:'<svg viewBox="0 0 24 24" class="car"><path d="M8 10l4 4 4-4"/></svg>',
  chev:'<svg viewBox="0 0 24 24"><path d="M8 10l4 4 4-4"/></svg>',
  tw:'<svg viewBox="0 0 12 12"><path d="M4 3l3 3-3 3" fill="currentColor" stroke="none"/></svg>',
  twd:'<svg viewBox="0 0 12 12"><path d="M3 4l3 3 3-3" fill="currentColor" stroke="none"/></svg>',
  search:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="5"/><path d="M15 15l4 4"/></svg>',
  play:'<svg viewBox="0 0 24 24"><path d="M8 6l10 6-10 6z"/></svg>',
  close:'<svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17"/></svg>',
  panel:'<svg viewBox="0 0 24 24"><rect x="4.5" y="5.5" width="15" height="13" rx="2"/><path d="M9.5 5.5v13"/></svg>',
  grid:'<svg viewBox="0 0 24 24"><rect x="5" y="5" width="5.5" height="5.5" rx="1"/><rect x="13.5" y="5" width="5.5" height="5.5" rx="1"/><rect x="5" y="13.5" width="5.5" height="5.5" rx="1"/><rect x="13.5" y="13.5" width="5.5" height="5.5" rx="3"/></svg>',
  section:'<svg viewBox="0 0 24 24"><rect x="5.5" y="5.5" width="13" height="13" rx="1.5"/><path d="M5.5 9.5h6v-4"/></svg>',
  comp:'<svg viewBox="0 0 24 24"><path d="M12 5l2.5 2.5L12 10 9.5 7.5zM12 14l2.5 2.5L12 19l-2.5-2.5zM7.5 9.5L10 12l-2.5 2.5L5 12zM16.5 9.5L19 12l-2.5 2.5L14 12z"/></svg>',
  inst:'<svg viewBox="0 0 24 24"><path d="M12 6l6 6-6 6-6-6z"/></svg>',
  tlayer:'<svg viewBox="0 0 24 24"><path d="M7 7.5V6h10v1.5M12 6v12M10.5 18h3"/></svg>',
  sticky:'<svg viewBox="0 0 24 24"><path d="M6 6h12v8l-4 4H6z"/><path d="M14 18v-4h4"/></svg>',
  table:'<svg viewBox="0 0 24 24"><rect x="5" y="6" width="14" height="12" rx="1"/><path d="M5 10h14M5 14h14M10 6v12"/></svg>',
  eyeoff:'<svg viewBox="0 0 24 24"><path d="M5 12s2.5-4.5 7-4.5 7 4.5 7 4.5-2.5 4.5-7 4.5S5 12 5 12z"/><path d="M6 18L18 6"/></svg>',
  page:'<svg viewBox="0 0 24 24"><path d="M8 5.5h6l3 3v10H8z"/><path d="M14 5.5v3h3"/></svg>',
  folder:'<svg viewBox="0 0 24 24"><path d="M5 8V6.5h5l1.5 1.5H19v10H5z"/></svg>',
  pen:'<svg viewBox="0 0 24 24"><path d="M6 18l1-4 8-8 3 3-8 8z"/><path d="M13.5 7.5l3 3"/></svg>',
  bulb:'<svg viewBox="0 0 24 24"><path d="M9.5 16.5h5M10.5 19h3"/><path d="M12 5a5 5 0 0 0-3 9c.4.4.5.8.5 1.5h5c0-.7.1-1.1.5-1.5A5 5 0 0 0 12 5z"/></svg>',
  people:'<svg viewBox="0 0 24 24"><circle cx="9.5" cy="9" r="2.5"/><path d="M5 18c0-2.5 2-4.5 4.5-4.5S14 15.5 14 18"/><circle cx="16" cy="9.5" r="2"/><path d="M15 13.6c2.2.2 4 2 4 4.4"/></svg>',
  lock:'<svg viewBox="0 0 24 24"><rect x="6.5" y="11" width="11" height="8" rx="1.5"/><path d="M9 11V8.5a3 3 0 0 1 6 0V11"/></svg>',
  globe:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7"/><path d="M5 12h14M12 5c2 2.2 2.8 4.5 2.8 7s-.8 4.8-2.8 7c-2-2.2-2.8-4.5-2.8-7S10 7.2 12 5z"/></svg>',
  plus:'<svg viewBox="0 0 24 24"><path d="M12 7v10M7 12h10"/></svg>',
  cursor:'<svg viewBox="0 0 16 16"><path d="M2 1.5l11 5.2-4.6 1.4-2.2 4.6z"/></svg>',
  cmp:'<svg viewBox="0 0 24 24"><rect x="4.5" y="6" width="15" height="12" rx="1"/><path d="M9.5 6v12M14.5 6v12"/></svg>',
  ref:'<svg viewBox="0 0 24 24"><path d="M7 5.5h10v13l-5-3-5 3z"/></svg>',
};
const PAGES = [
  {id:"dossier", label:"Dossier", icon:I.folder, sub:"projet de loi, navette"},
  {id:"atelier", label:"Atelier", icon:I.pen, sub:"mes brouillons, concurrents"},
  {id:"enjeux", label:"Enjeux", icon:I.bulb, sub:"thèmes, matrice"},
  {id:"reunion", label:"Réunion", icon:I.people, sub:"tableau blanc · 26 places"},
];
const mobile = () => matchMedia("(max-width:720px)").matches;
const st = Object.assign({page:"atelier", o:12, draft:null, th:THEMES[0].id, place:1, al:12, art:"4", rtab:"props", ltab:"file", dev:false, pins:true,
  ui:"full", theme:"light", lw:240, rw:240, filter:"", sortF:"tous", cmp:null, unfold:false, open:{}, closed:{}}, store.get("ui", {}));
Object.assign(st, {vh:false, vhSel:null, extra:null, sel:null, multi:[], editing:false, thread:null, tool:"move", cams:{}, actions:null, drawer:null});
if (!MINE.find(m => m.id === st.draft)) st.draft = (MINE.find(m => m.al === st.o) || MINE[0]).id;
if (!THEMES.find(t => t.id === st.th)) st.th = THEMES[0].id;
const save = () => store.set("ui", {page:st.page, o:st.o, draft:st.draft, th:st.th, place:st.place, al:st.al, art:st.art, rtab:st.rtab, ltab:st.ltab, dev:st.dev, pins:st.pins,
  ui:st.ui === "hidden" ? "full" : st.ui, theme:st.theme, lw:st.lw, rw:st.rw, filter:st.filter, sortF:st.sortF, cmp:st.cmp, unfold:st.unfold, open:st.open, closed:st.closed});

/* ---------- petits utilitaires ---------- */
const draft = () => MINE.find(m => m.id === st.draft) || MINE[0];
const draftOn = o => (draft().al === o ? draft() : MINE.find(m => m.al === o)) || null;
const words = s => (String(s || "").match(/[\p{L}\p{N}]+/gu) || []).length;
const initials = n => n.replace(/^(La|Le|Les) /, "").split(/[\s'-]+/).filter(w => w.length > 2 || /^[A-Z]/.test(w)).slice(0, 2).map(w => w[0].toUpperCase()).join("");
const av = (name, color, extra) => `<span class="av" style="--g:${color}" data-tip="${esc(name)}" ${extra || ""}>${esc(initials(name))}</span>`;
const mp = (name, color) => `<span class="mp" style="--g:${color}">${I.cursor}<span>${esc(name)}</span></span>`;
const chipSort = a => `<span class="chip ${NX.sortKey(a)}">${esc(sortWord(a))}</span>`;
const dot = c => `<span class="gdot" style="background:${c}"></span>`;
const hd = dimTxt => `<i class="hd a"></i><i class="hd b"></i><i class="hd c"></i><i class="hd d"></i>${dimTxt != null ? `<span class="dim">${esc(dimTxt)}</span>` : ""}`;
const amOf = k => k && k.startsWith("am:") ? AM[k.slice(3)] : null;
const themesOf = a => THEMES.filter(t => t.amendements.includes(a.id));
const kind = k => (k || "").split(":")[0];
const arg = k => (k || "").slice((k || "").indexOf(":") + 1);
function amAl(a){ if (a.cible.al) return a.cible.al; const s = a.spans[0] || a.applique.rows.find(r => r.o); return s ? (s.al || s.o) : st.o; }
function frame(k, w, name, body, opts){
  opts = opts || {};
  return `<div class="frame${opts.cls ? " " + opts.cls : ""}" data-k="${esc(k)}" style="--w:${w}px"${opts.attrs || ""}><div class="flab"><span class="fn" data-k="${esc(k)}">${opts.icon || "#"} ${esc(name)}</span>${opts.right ? `<span class="ml">${opts.right}</span>` : ""}</div>${body}${hd(opts.dim)}</div>`;
}
function section(k, w, name, n, body){
  return `<div class="section" data-k="${esc(k)}" style="--w:${w}px"><div class="slab" data-k="${esc(k)}">${esc(name)}${n != null ? ` <span class="n">${n}</span>` : ""}</div>${body}${hd(null)}</div>`;
}
function amSide(a, o){
  const d = NX.amDiff(a, o), t = NX.amText(a, o);
  if (d == null) return `<span class="ctx">Ne réécrit pas le texte de l'alinéa ${o}.</span> ${esc(short(a.dispositif || "", 220))}`;
  return typeof t === "string" ? NX.unitsOnDiff(d, o, t) : d;
}
function draftSide(m){ return m.mode === "rediger" ? NX.unitsOnDiff(NX.draftDiff(m), m.al, m.texte) : NX.draftDiff(m); }
function filtered(o){
  const C = concurrents(o), f = st.filter.trim().toLowerCase();
  const ok = u => { const a = u.lead; if (st.sortF !== "tous" && NX.sortKey(a) !== st.sortF) return false;
    return !f || [a.num, who(a).name, a.groupe, sortWord(a), objetOf(a), a.auteur].join(" ").toLowerCase().includes(f); };
  return {C, units: C.units.filter(ok)};
}

/* ---------- les pages : des colonnes de cadres sur le canevas ---------- */
const PAGE = {};
PAGE.dossier = () => {
  const G = NX.grid(), o = st.al;
  const etapeF = (id, j) => {
    const nMod = G.filter(r => r.cells[j] === "mod").length, nAl = ET[id].alineas.length;
    const rows = G.map((r, i) => { const ln = LINES[i], x = ln[id], t = x == null ? null : ET[id].alineas[x], c = r.cells[j];
      return `<div class="erow ${c}" ${r.o ? `data-k="al:${r.o}"` : ""} title="${t == null ? "absent à cette étape" : esc(short(t, 300))}"><span class="eo">${x == null ? "" : x + 1}</span><span class="et">${t == null ? "—" : esc(short(t, 120))}</span>${c === "mod" ? `<span class="em">modifié</span>` : ""}${id === "AN-com" && r.n ? `<span class="en" title="amendements de l'Assemblée sur cet alinéa">${r.n} am.</span>` : ""}</div>`; }).join("");
    return frame("etape:" + id, 270, `${j + 1} · ${ETL[id]}`, `<div class="fb" style="padding:14px 0 10px"><div class="eh"><div class="t">${esc(ET[id].label)}</div><div class="kicker">${nAl} alinéas · ${j ? nMod + " modifiés par rapport à l'étape " + j : "première rédaction"}</div></div>${rows}</div>`, {dim: nAl + " alinéas"});
  };
  const H = NX.hist(o), nC = concurrents(o).units.length;
  const hist = frame("frame:hist", 500, `Alinéa ${o} · d'étape en étape`, `<div class="fb"><div class="fh"><span class="t">Alinéa ${o}, d'étape en étape</span></div><div class="kicker" style="margin-bottom:14px">Chaque étape comparée à la précédente ; les corrections sont portées sur l'étape la plus récente.</div>
    ${H.map((h, i) => `<div class="hstep${i && !h.same && !h.absent ? " mod" : ""}"><div class="kicker"><b style="color:#161616">${esc(ET[h.id].label)}</b>${i ? (h.same ? "inchangé" : h.absent ? "absent" : `<span class="chip attente">modifié</span>`) : "origine"}</div><div class="law sm">${h.diff == null ? `<span class="ctx">— absent à cette étape</span>` : h.diff}</div></div>`).join("")}
    <div class="f-actions"><button class="btn pri" data-nav="amender:${o}">Amender cet alinéa</button><button class="btn" data-nav="al:${o}">Voir ses ${nC} concurrents</button></div></div>`, {dim: words(TRANSMIS[o - 1]) + " mots"});
  const plan = frame("frame:plan", 340, "Projet de loi · 16 articles", `<div class="fb"><div class="fh"><span class="t">${esc(NX.dossier.titre)}</span></div><div class="kicker" style="margin-bottom:10px">${esc(NX.dossier.lecture)}</div>
    <table class="ft"><thead><tr><th>Article</th><th>Statut</th><th style="text-align:right">Am.</th></tr></thead><tbody>${NX.plan.map(p => `<tr data-k="art:${esc(p.num)}" class="${st.sel === "art:" + p.num ? "sel" : ""}"><td style="white-space:nowrap;font-weight:${p.num === "4" ? 600 : 450}">Art. ${esc(p.num)}</td><td style="color:#00000096">${esc(short(p.statut || p.intitule || "", 46))}</td><td class="n">${p.n || ""}</td></tr>`).join("")}</tbody></table></div>`, {dim: NX.plan.length + " articles"});
  const cols = [{x:0, w:340, mo:5, html:plan}];
  ETAPES.forEach((id, j) => cols.push({x:400 + j * 300, w:270, mo:j, html:etapeF(id, j)}));
  cols.push({x:1640, w:500, mo:4, html:hist});
  return {cols, focus:["frame:plan", "etape:" + ETAPES[3]], focusMode:"group",
    layers: [
      {k:"frame:plan", label:"Projet de loi", icon:I.frame, kids: NX.plan.map(p => ({k:"art:" + p.num, label:"Article " + p.num, icon:I.tlayer, num:p.n || ""}))},
      ...ETAPES.map((id, j) => ({k:"etape:" + id, label:`${j + 1} · ${ETL[id]}`, icon:I.frame, num: j ? G.filter(r => r.cells[j] === "mod").length + " mod." : ""})),
      {k:"frame:hist", label:`Alinéa ${o} · d'étape en étape`, icon:I.frame},
      {k:"grp:al", label:"Alinéas du texte transmis", icon:I.tlayer, kids: G.filter(r => r.o).map(r => ({k:"al:" + r.o, label:"Alinéa " + r.o, icon:I.tlayer, num:r.n || "", small: r.cells.includes("mod") ? "modifié" : ""}))},
    ]};
};
PAGE.atelier = () => {
  const o = st.o, m = draftOn(o), F = filtered(o), U = unitsOf(o);
  const refF = frame("ref:" + o, 600, `Référence · alinéa ${o}`, `<div class="fb"><div class="fh"><span class="t">Alinéa ${o}</span><span class="chip">${esc(refShort())}</span></div><div class="kicker" style="margin-bottom:8px">${esc(refLabel())} · vierge : aucune correction n'y est portée</div><div class="law">${esc(refAl(o)) || `<span class="ctx">(absent de cette étape)</span>`}</div></div>`, {icon:"◆", dim: words(refAl(o)) + " mots"});
  let mineF, verF = "";
  if (m){
    const body = st.editing ? `<div class="edit-wrap"><textarea id="ta" spellcheck="false" aria-label="Texte du brouillon">${esc(m.texte)}</textarea><div class="edit-hint">Calque miroir : ajouts soulignés, suppressions marquées d'un trait rouge. La feuille montre les corrections complètes après validation.</div><div class="live law sm" id="live">${liveHTML(refAl(m.al), m.texte)}</div><div class="f-actions"><button class="btn pri" data-cmd="valider">Valider <span class="kbd">Ctrl ↵</span></button><button class="btn" data-cmd="annuler">Annuler <span class="kbd">Échap</span></button></div></div>`
      : `<div class="law" data-edit="1">${draftSide(m)}</div><div class="f-actions"><button class="btn" data-cmd="edit">${I.text.replace('<svg', '<svg style="width:16px;height:16px"')} Modifier le texte <span class="kbd">T</span></button><button class="btn" data-cmd="vh">Historique des versions</button><button class="btn" data-cmd="share">Partager</button></div>`;
    mineF = frame("draft:" + m.id, 600, `${draftNum(m)} · alinéa ${m.al}`, `<div class="fb"><div class="fh"><span class="t">${esc(draftLead(m))}</span><span class="chip">${esc(m.vis)}</span></div><div class="kicker" style="margin-bottom:6px">Corrections apparentes face à : ${esc(refLabel())} · double-clic pour modifier · souligné violet : passage disputé</div>${body}</div>`,
      {right: mp("Vous · " + GR[ME].name, GR[ME].color), dim: words(m.texte) + " mots", attrs: ` data-pins="${o}"`});
    if (st.vh && st.vhSel != null){ const V = versionsOf(m)[st.vhSel]; if (V && st.vhSel > 0) verF = frame("frame:version", 600, `Version · ${V.label}`, `<div class="fb"><div class="fh"><span class="t">${esc(V.label)}</span><span class="chip">${esc(V.when)}</span><button class="btn pri" data-cmd="restore">Restaurer cette version</button></div><div class="kicker" style="margin-bottom:6px">Même règle que la feuille : corrections apparentes face à ${esc(refLabel())}.</div><div class="law">${V.mode === "supprimer" ? `<del>${esc(refAl(m.al))}</del>` : inlineDiff(refAl(m.al), V.texte)}</div></div>`, {icon:"⟲", right: mp("Vous · " + GR[ME].name, GR[ME].color), dim: words(V.texte) + " mots"}); }
  } else {
    mineF = frame("nodraft:" + o, 600, "Aucun brouillon", `<div class="fb"><div class="fh"><span class="t">Vous n'avez pas de brouillon sur l'alinéa ${o}</span></div><div class="kicker">Créer un cadre de brouillon à partir de la référence (outil Cadre, touche F).</div><div class="f-actions"><button class="btn pri" data-cmd="new">Créer un brouillon</button></div></div>`);
  }
  const card = (a, u, w0) => { const w = who(a); return frame("am:" + a.id, w0 || 400, a.num, `<div class="fb" style="padding:16px 18px 18px"><div class="fh">${chipSort(a)}${a.avis ? `<span class="chip" title="avis">avis ${esc(avisSym(a.avis))}</span>` : ""}${u && u.members.length > 1 ? `<span class="chip comp">${u.kind === "ident" ? "identiques" : "série"} · ${u.members.length}</span>` : ""}</div><div class="kicker" style="margin-bottom:4px">${esc(modeLead(a, o))}</div><div class="law sm">${amSide(a, o)}</div><div class="kicker" style="margin-top:8px">${esc(objetOf(a))}</div></div>`, {right: mp(w.name, w.color), dim: words(NX.amText(a, o) || "") + " mots"}); };
  const right = [];
  if (st.extra && AM[st.extra]){ const a = AM[st.extra], w = who(a); right.push(frame("am:" + a.id, 400, a.num + " · hors des alinéas", `<div class="fb"><div class="fh">${chipSort(a)}</div><div class="kicker" style="margin-bottom:6px">Le dispositif de cet amendement n'a pas pu être appliqué mécaniquement au texte : il est montré tel quel.</div><div class="law sm">${esc(a.dispositif || "—")}</div><div class="kicker" style="margin-top:8px">${esc(objetOf(a))}</div></div>`, {right: mp(w.name, w.color)})); }
  const cards = F.units.map(u => card(u.lead, u));
  right.push(section("sec:conc", 448, `Concurrents · alinéa ${o}`, `${F.units.length}${F.units.length !== F.C.units.length ? " / " + F.C.units.length : ""}`, cards.length ? `<div class="sgrid" style="--c:1">${cards.join("")}</div>` : `<div class="empty" style="color:#0000008a">Aucun concurrent ne correspond au filtre.</div>`));
  const oth = [...F.C.redac.map(a => ({a, why:"rédactionnel"})), ...F.C.ecartes.map(u => ({a:u.lead, why:sortWord(u.lead)}))];
  if (oth.length) right.push(frame("frame:ecartes", 448, `Rédactionnels et écartés · ${oth.length}`, `<div class="fb"><table class="ft"><tbody>${oth.map(x => `<tr data-k="am:${x.a.id}"><td class="mono" style="white-space:nowrap">${x.a.num}</td><td>${dot(who(x.a).color)} ${esc(who(x.a).name)}<div class="kicker">${esc(x.why)} · ${esc(short(objetOf(x.a), 70))}</div></td></tr>`).join("")}</tbody></table></div>`, {dim: oth.length + " amendements"}));
  const cols = [{x:-560, w:480, mo:3, html: articleFrame() + codeFrame()}, {x:0, w:600, mo:0, html: refF + mineF + verF}, {x:720, w:448, mo:2, html: right.join("")}];
  if (st.cmp){ const c = cmpSection(st.cmp, o); if (c) cols.push({x:1240, w:1272, mo:1, html:c}); }
  const layers = [
    {k:"ref:" + o, label:`Référence · alinéa ${o}`, icon:I.ref},
    m ? {k:"draft:" + m.id, label:`${draftNum(m)} · al. ${m.al}`, icon:I.frame, kids: U.map(u => ({k:"unit:" + u.k, label:`« ${u.label} »`, icon:I.comp, comp:true, num:u.n}))} : {k:"nodraft:" + o, label:"Aucun brouillon", icon:I.frame},
    ...(verF ? [{k:"frame:version", label:"Version · " + versionsOf(m)[st.vhSel].label, icon:I.frame}] : []),
    ...MINE.filter(x => !m || x.id !== m.id).map(x => ({k:"switch:" + x.id, label:`${draftNum(x)} · al. ${x.al}`, icon:I.eyeoff, hid:true, small:"masqué"})),
    ...(st.cmp ? [{k:"sec:cmp", label:"Comparaison", icon:I.section, kids:[{k:"cmp:a", label:"Une rédaction", icon:I.frame}, {k:"cmp:ref", label:"Référence", icon:I.frame}, {k:"cmp:b", label:"L'autre", icon:I.frame}]}] : []),
    ...(st.extra && AM[st.extra] ? [{k:"am:" + st.extra, label:AM[st.extra].num + " · hors des alinéas", icon:I.frame}] : []),
    {k:"sec:conc", label:`Concurrents · al. ${o}`, icon:I.section, num:F.units.length, kids: F.units.map(u => ({k:"am:" + u.lead.id, label:u.lead.num, small:who(u.lead).name, icon:I.frame, dot:who(u.lead).color}))},
    ...(oth.length ? [{k:"frame:ecartes", label:"Rédactionnels et écartés", icon:I.frame, num:oth.length}] : []),
    {k:"frame:article", label:"Article 4 · votre version", icon:I.frame},
    {k:"frame:code", label:"CGI · article 31", icon:I.frame},
  ];
  return {cols, focus: "ref:" + o, focusMode:"atelier", layers};
};
function cmpSide(id, o){
  if (id.startsWith("M")){ const m = MINE.find(z => z.id === id); if (!m) return null; return {label:draftNum(m), sub:"Vous · " + GR[ME].name, color:GR[ME].color, html: m.al === o ? NX.draftDiff(m) : `<span class="ctx">(brouillon sur l'alinéa ${m.al})</span>`, n: m.al === o ? words(m.texte) : 0}; }
  const a = AM[id]; if (!a) return null; const d = NX.amDiff(a, o);
  return {label:a.num, sub:who(a).name, color:who(a).color, html: d == null ? `<span class="ctx">Ne réécrit pas l'alinéa ${o}.</span> ${esc(short(a.dispositif || "", 300))}` : d, n: words(NX.amText(a, o) || "")};
}
function cmpSection([x, y], o){
  const A = cmpSide(x, o), B = cmpSide(y, o); if (!A || !B) return "";
  const fr = (k, S, ref) => frame(k, 400, ref ? `Référence · ${refShort()}` : S.label, `<div class="fb"><div class="kicker" style="margin-bottom:8px">${ref ? "vierge, au centre" : "corrections apparentes face à la référence"}</div><div class="law sm">${S.html}</div></div>`, {icon: ref ? "◆" : "#", right: ref ? "" : mp(S.sub, S.color), dim: S.n + " mots"});
  return section("sec:cmp", 1272, `Comparaison · alinéa ${o} · ${A.label} | référence | ${B.label}`, null,
    `<div class="f-actions" style="margin:-30px 0 30px"><button class="btn" data-cmd="swap">Inverser</button><button class="btn" data-cmd="cmp-close">Fermer la comparaison</button></div><div class="sgrid cmp-row" style="--c:3">${fr("cmp:a", A)}${fr("cmp:ref", {html:esc(refAl(o)), n:words(refAl(o))}, true)}${fr("cmp:b", B)}</div>`);
}
// historique des versions d'un brouillon : la version actuelle, puis chaque état remplacé, puis la création
function versionsOf(m){
  const fmt = t => t ? new Date(t).toLocaleString("fr-FR", {day:"numeric", month:"short", hour:"2-digit", minute:"2-digit"}) : "";
  const L = [{label:"Version actuelle", when: m.savedAt ? fmt(m.savedAt) : "à l'ouverture", texte:m.texte, mode:m.mode}];
  (m.journal || []).slice().reverse().forEach((j, i) => L.push({label:"Version " + ((m.journal.length - i)), when: j.t ? fmt(j.t) : "avant modification", texte:j.texte, mode:j.mode || "rediger"}));
  L.push({label:"Création", when:"depuis la référence", texte:TRANSMIS[m.al - 1], mode:"rediger"});
  return L;
}
function articleFrame(){
  const L = verLines(myVer()), out = []; let run = [];
  const ln = (o, cls, html) => `<div class="vline ${cls}"><span class="o">${o}</span><div class="law sm">${html}</div></div>`;
  const flush = () => { if (run.length > 2 && !st.unfold) out.push(`<div class="fold" data-cmd="unfold">${I.chev.replace('<svg', '<svg style="width:14px;height:14px"')} ${run.length} alinéas inchangés (${run[0].o}–${run[run.length - 1].o}) · déplier</div>`); else run.forEach(l => out.push(ln(l.o, "", esc(refAl(l.o) || l.text)))); run = []; };
  let nmod = 0;
  for (const l of L){
    if (l.kind === "same"){ run.push(l); continue; }
    flush(); nmod++;
    out.push(l.kind === "del" ? ln(l.o, "del", `<del>${esc(refAl(l.o))}</del>`) : l.kind === "mod" ? ln(l.o, "mod", inlineDiff(refAl(l.o), l.text)) : ln("+", "ins", `<ins>${esc(l.text)}</ins>`));
  }
  flush();
  return frame("frame:article", 480, "Article 4 · votre version", `<div class="fb"><div class="fh"><span class="t">Article 4 avec tous vos brouillons</span><button class="btn" data-cmd="${st.unfold ? "fold" : "unfold"}">${st.unfold ? "Replier l'inchangé" : "Tout déplier"}</button></div><div class="kicker" style="margin-bottom:8px">Face à : ${esc(refLabel())}</div>${out.join("")}</div>`, {dim: nmod + " alinéas touchés"});
}
function codeFrame(){
  const C = NX.code;
  const blocks = C.lettres.map(l => { const av = (C.avant[l] || []).join("\n"), ap = (C.apresCommission[l] || []).join("\n"), same = sameText(av, ap);
    return `<div class="vline ${same ? "" : "mod"}"><span class="o">${esc(l)})</span><div class="law sm">${same ? esc(short(ap, 260)) : inlineDiff(av, ap)}</div></div>`; }).join("");
  return frame("frame:code", 480, "CGI · article 31", `<div class="fb"><div class="fh"><span class="t">${esc(C.article)}</span></div><div class="kicker" style="margin-bottom:8px">En vigueur → après la commission : les instructions de l'article appliquées au code.</div>${blocks}</div>`, {dim: C.lettres.length + " lettres"});
}
PAGE.enjeux = () => {
  const th = THEMES.find(t => t.id === st.th);
  const cards = THEMES.map(t => frame("theme:" + t.id, 200, t.label, `<div class="fb tcard" style="padding:14px 16px 16px"><div class="fh" style="margin-bottom:6px"><span class="t" style="font-size:13px">${esc(t.label)}</span></div><span class="chip ${t.src === "déclaré" ? "attente" : "comp"}">${t.src === "déclaré" ? "déclaré par le rapport" : "calculé (mots-clés)"}</span><div style="margin-top:10px"><span class="big">${t.amendements.length}</span> <span class="kicker">amendements</span></div><div class="kicker">${themeAls(t).length} alinéas</div></div>`, {dim: t.amendements.length + " am."}));
  const themes = section("sec:themes", 472, "Thèmes", THEMES.length, `<div class="sgrid" style="--c:2">${cards.join("")}</div>`);
  const ams = NX.themeAms(th), als = themeAls(th), eps = NX.themeParoles(th), mine = MINE.filter(m => als.includes(m.al));
  const fiche = frame("frame:fiche", 600, `Fiche · ${th.label}`, `<div class="fb"><div class="fh"><span class="t" style="font-size:16px;line-height:22px">${esc(th.label)}</span><span class="chip ${th.src === "déclaré" ? "attente" : "comp"}">${th.src === "déclaré" ? "thème déclaré par le rapport" : "thème calculé par mots-clés"}</span></div>
    <div class="kicker" style="margin-bottom:14px">${ams.length} amendements · alinéas ${als.map(o => `<a class="lnk" data-nav="al:${o}">${o}</a>`).join(", ") || "—"}</div>
    <div class="stratum"><h3>1 · Ce que dit le rapport</h3><div class="quote">${esc(th.doc || "—")}</div></div>
    <div class="stratum"><h3>2 · Ce qui a été dit en réunion <span class="nb">${eps.length} ${plural(eps.length, "place")}</span></h3>${eps.length ? eps.slice(0, 5).map(e => `<div style="margin:8px 0"><a class="lnk" data-nav="place:${e.place}">Place ${e.place}</a> <span class="kicker">${esc(short(e.titre, 90))}</span>${e.paroles.slice(0, 2).map(p => `<div class="quote"><b>${esc(NX.speaker(p))}</b> : « ${esc(short(p.txt, 170))} »</div>`).join("")}</div>`).join("") + (eps.length > 5 ? `<div class="kicker">… et ${eps.length - 5} autres places</div>` : "") : `<div class="kicker">Rien en réunion.</div>`}</div>
    <div class="stratum"><h3>3 · Ce que fait mon texte <span class="nb">${mine.length} ${plural(mine.length, "brouillon")}</span></h3>${mine.length ? mine.map(m => `<div style="margin:6px 0"><a class="lnk" data-nav="draft:${m.id}">${esc(draftNum(m))} · alinéa ${m.al}</a><div class="law sm" style="margin-top:4px">${NX.draftDiff(m)}</div></div>`).join("") : `<div class="kicker">Aucun de vos brouillons ne touche les alinéas de ce thème.</div>`}</div>
    <div class="stratum" style="margin:0"><h3>Les amendements <span class="nb">${ams.length}</span></h3><table class="ft"><tbody>${ams.map(a => `<tr data-nav="am:${a.id}" style="cursor:pointer"><td class="mono" style="white-space:nowrap">${a.num}</td><td>${dot(who(a).color)} ${esc(who(a).name)}<div class="kicker">${esc(short(objetOf(a), 110))}</div></td><td style="text-align:right">${chipSort(a)}</td></tr>`).join("")}</tbody></table></div></div>`, {dim: ams.length + " amendements"});
  const M = NX.matrix(), max = Math.max(1, ...M.rows.flatMap(r => r.cells.map(c => c.length)));
  const mx = frame("frame:matrice", 600, "Thèmes × groupes", `<div class="fb"><div class="fh"><span class="t">Thèmes × groupes</span></div><div class="kicker" style="margin-bottom:8px">Nombre d'amendements par thème et par groupe : une seule chose comptée. Cliquer une case ouvre le thème.</div><div class="mx-wrap"><table class="ft mx"><thead><tr><th>Thème</th>${M.gs.map(g => `<th class="g" title="${esc(GR[g].name)}">${dot(GR[g].color)}<br>${g}</th>`).join("")}<th class="g">Inst.</th></tr></thead><tbody>${M.rows.map(r => `<tr><td style="white-space:nowrap"><a class="lnk" data-k="theme:${r.th.id}">${esc(short(r.th.label, 26))}</a></td>${r.cells.map(c => `<td class="n" data-k="theme:${r.th.id}" style="background:${c.length ? `rgba(0,144,243,${(.08 + c.length / max * .5).toFixed(2)})` : "transparent"}">${c.length || ""}</td>`).join("")}<td class="n">${r.inst.length || ""}</td></tr>`).join("")}</tbody></table></div></div>`, {dim: M.rows.length + " × " + M.gs.length});
  return {cols: [{x:0, w:472, mo:0, html:themes}, {x:532, w:600, mo:1, html:fiche + mx}], focus:"sec:themes",
    layers: [{k:"sec:themes", label:"Thèmes", icon:I.section, num:THEMES.length, kids: THEMES.map(t => ({k:"theme:" + t.id, label:t.label, icon:I.frame, num:t.amendements.length}))}, {k:"frame:fiche", label:`Fiche · ${th.label}`, icon:I.frame}, {k:"frame:matrice", label:"Thèmes × groupes", icon:I.table}]};
};
const STICKY = g => g ? `color-mix(in srgb, ${NX.groupColor(g)} 26%, #fff)` : "#fff3b0";
PAGE.reunion = () => {
  const e = NX.episodes.find(x => x.place === st.place) || NX.episodes[0], maxM = Math.max(...NX.episodes.map(x => x.mots));
  const adopted = x => x.ams.some(id => AM[id] && AM[id].sort === "Adopté");
  const strip = section("frame:overview", 760, "Vue d'ensemble · 26 places à l'échelle des mots prononcés", null, `<div class="strip">${NX.episodes.map(x => `<div class="pl${adopted(x) ? " ad" : ""}${x.place === e.place ? " on" : ""}" style="--m:${x.mots};--h:${Math.max(14, Math.round(Math.sqrt(x.mots / maxM) * 100))}%" data-k="place:${x.place}" title="Place ${x.place} · ${x.mots} mots${adopted(x) ? " · amendement adopté" : ""}"><b>${x.place}</b></div>`).join("")}</div><div class="legend" style="margin:10px 0 0;color:${st.theme === "dark" ? "#ffffffa6" : "#00000096"}"><span><i class="cellst" style="background:#14ae5c"></i>un amendement adopté</span><span><i class="cellst" style="background:#d9d9d9"></i>aucun adopté</span><span>largeur = mots prononcés · ${NX.episodes.reduce((s, x) => s + x.mots, 0)} mots au total</span></div>`);
  const ams = e.ams.map(id => AM[id]).filter(Boolean);
  const vote = frame("frame:vote", 712, "Liste de vote", `<div class="fb" style="padding:14px 16px"><table class="ft vote"><thead><tr><th>#</th><th>Auteur · groupe</th><th>N°</th><th class="hide-m">Objet</th><th>Avis</th><th>Sort</th></tr></thead><tbody>${ams.map((a, i) => `<tr data-k="am:${a.id}"><td class="n">${i + 1}</td><td style="white-space:nowrap">${dot(who(a).color)} ${esc(a.auteur || "")}<div class="kicker">${esc(who(a).name)}</div></td><td class="mono" style="white-space:nowrap"><a class="lnk" data-nav="am:${a.id}">${a.num}</a></td><td class="hide-m" style="color:#00000096">${esc(short(objetOf(a), 90))}</td><td style="text-align:center" title="${esc(a.avis || "")}">${esc(avisSym(a.avis))}</td><td>${chipSort(a)}</td></tr>`).join("")}</tbody></table></div>`, {icon:I.table.replace('<svg', '<svg style="width:12px;height:12px"'), dim: ams.length + " amendements"});
  const stickies = `<div class="stickies">${e.paroles.map((p, i) => `<div class="sticky" data-k="parole:${e.place}:${i}" style="--sc:${STICKY(p.groupe)}"><div class="sp">${esc(NX.speaker(p))}</div>${esc(p.txt)}<div class="au">${p.mots} mots</div>${hd(null)}</div>`).join("")}</div>`;
  const dec = e.decisions.map(d => { const ok = /adopt/i.test(d.txt) && !/rejet/i.test(d.txt), ko = /rejet|tomb|retir/i.test(d.txt);
    return `<div class="decision"><span class="stamp ${ok ? "ok" : ko ? "ko" : "mid"}">${ok ? "✓" : ko ? "✕" : "•"}</span><span>${esc(d.txt)}</span></div>`; }).join("");
  const place = section("place:" + e.place, 760, `Place ${e.place} · ${short(e.titre, 70)}`, `${e.mots} mots`, `${vote}<div style="height:28px"></div><div class="kicker" style="margin:0 0 10px;color:${st.theme === "dark" ? "#ffffffa6" : "#00000096"}">Prises de parole · ${e.paroles.length} post-its</div>${stickies}${dec ? `<div class="kicker" style="margin:8px 0 10px;color:${st.theme === "dark" ? "#ffffffa6" : "#00000096"}">Décisions</div>${dec}` : ""}`);
  return {cols: [{x:0, w:760, mo:0, html:strip + place}], focus:"frame:overview", figjam:true,
    layers: [{k:"frame:overview", label:"Vue d'ensemble · 26 places", icon:I.section},
      ...NX.episodes.map(x => ({k:"place:" + x.place, label:`Place ${x.place}`, small: short(x.titre.replace(/^Amendements? (identiques )?/, ""), 34), icon:I.section, num: adopted(x) ? "✓" : "", kids: x.place === e.place ? [{k:"frame:vote", label:"Liste de vote", icon:I.table}, ...x.paroles.map((p, i) => ({k:`parole:${x.place}:${i}`, label:p.nom, small:p.mots + " mots", icon:I.sticky}))] : null}))]};
};

/* ---------- caméra : panoramique et zoom ---------- */
const cv = () => $("#canvas");
const cam = () => st.cams[st.page] || (st.cams[st.page] = {x:40, y:64, z:1});
function applyCam(){
  if (mobile()){ $("#world").style.transform = ""; return; }
  const c = cam(); $("#world").style.transform = `translate(${c.x}px,${c.y}px) scale(${c.z})`;
  const C = cv(); C.style.setProperty("--dg", 24 * c.z + "px"); C.style.setProperty("--dx", c.x + "px"); C.style.setProperty("--dy", c.y + "px");
  const zb = $("#zoomv"); if (zb) zb.textContent = Math.round(c.z * 100) + " %";
}
let camAnim = 0;
function animCam(t){
  cancelAnimationFrame(camAnim); const c = cam(), s = {...c}, t0 = performance.now();
  if (reduced){ Object.assign(c, t); applyCam(); placeThread(); return; }
  const tick = now => { const p = Math.min(1, (now - t0) / 260), e = 1 - Math.pow(1 - p, 3);
    c.x = s.x + (t.x - s.x) * e; c.y = s.y + (t.y - s.y) * e; c.z = s.z + (t.z - s.z) * e; applyCam(); placeThread();
    if (p < 1) camAnim = requestAnimationFrame(tick); };
  camAnim = requestAnimationFrame(tick);
}
function zoomAt(f, px, py){
  const c = cam(), r = cv().getBoundingClientRect(); if (px == null){ px = r.width / 2; py = r.height / 2; }
  const z = clamp(c.z * f, .1, 4); c.x = px - (px - c.x) * z / c.z; c.y = py - (py - c.y) * z / c.z; c.z = z; applyCam(); placeThread();
}
function wrect(el){ const w = $("#world").getBoundingClientRect(), r = el.getBoundingClientRect(), z = cam().z; return {x:(r.left - w.left) / z, y:(r.top - w.top) / z, w:r.width / z, h:r.height / z}; }
function elOf(k){ return k ? document.querySelector(`#world [data-k="${CSS.escape(k)}"]:not(.fn):not(.slab):not(tr):not(td):not(a)`) || document.querySelector(`#world [data-k="${CSS.escape(k)}"]`) : null; }
function focusEl(el, mode){
  if (!el) return;
  if (mobile()){ el.scrollIntoView({block:"start", behavior: reduced ? "auto" : "smooth"}); return; }
  const C = cv(), cw = C.clientWidth, ch = C.clientHeight, R = wrect(el), c = cam(), pad = 40;
  if (mode === "fit"){ const z = clamp(Math.min((cw - 2 * pad) / R.w, (ch - 2 * pad - 70) / R.h), .1, 2); return animCam({z, x:(cw - R.w * z) / 2 - R.x * z, y:Math.max(pad, (ch - 70 - R.h * z) / 2) - R.y * z + 10}); }
  if (mode === "top"){ const z = Math.min(1, (cw - 2 * pad) / R.w); return animCam({z, x:pad - R.x * z, y:56 - R.y * z}); }
  // reveal : amener l'élément à l'écran sans changer l'échelle
  const sx = R.x * c.z + c.x, sy = R.y * c.z + c.y, sw = R.w * c.z;
  if (sx >= 0 && sx + sw <= cw && sy >= 30 && sy < ch - 160) return;
  let x = c.x, y = c.y;
  if (sx < 0 || sx + sw > cw) x = sw > cw - 2 * pad ? pad - R.x * c.z : Math.min(pad, cw - pad - sw) - R.x * c.z + (sx + sw > cw && sw < cw - 2 * pad ? (cw - pad - sw) - Math.min(pad, cw - pad - sw) : 0);
  if (sy < 30 || sy > ch - 160) y = 70 - R.y * c.z;
  animCam({x, y, z:c.z});
}
function openCmp(){
  st.sel = "sec:cmp";
  if (!mobile() && st.ui !== "min" && st.ui !== "hidden"){ st.ui = "min"; st.autoMin = true; }
  render();
  setTimeout(() => { const el = elOf("sec:cmp"); if (!el) return; const C = cv(), R = wrect(el), z = clamp((C.clientWidth - 48) / R.w, .5, 1); animCam({z, x:(C.clientWidth - R.w * z) / 2 - R.x * z, y:64 - R.y * z}); }, 40);
  if (st.autoMin && !mobile()) toast("Interface réduite pour lire les trois colonnes · Ctrl Maj \\ pour la rétablir ; « Fermer la comparaison » la rétablit aussi.");
}
function focusPage(){
  if (mobile()) return;
  if (P.focusMode === "group"){ const a = elOf(P.focus[0]), b = elOf(P.focus[1]); if (!a || !b) return; const A = wrect(a), B = wrect(b), C = cv(), w = B.x + B.w - A.x, z = clamp((C.clientWidth - 80) / w, .9, 1); return animCam({z, x:40 - A.x * z, y:56 - A.y * z}); }
  const el = elOf(P.focus); if (!el) return;
  if (P.focusMode === "atelier"){ const R = wrect(el), z = .8; return animCam({z, x:40 - R.x * z, y:56 - R.y * z}); }
  if (P.focusMode === "center"){ const R = wrect(el), C = cv(), z = Math.min(1, (C.clientWidth - 80) / R.w); return animCam({z, x:(C.clientWidth - R.w * z) / 2 - R.x * z, y:56 - R.y * z}); }
  focusEl(el, "top");
}
function zoomFit(){
  if (mobile()) return;
  const cols = $$("#world .col"); if (!cols.length) return;
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; cols.forEach(c => { const r = wrect(c); x0 = Math.min(x0, r.x); y0 = Math.min(y0, r.y); x1 = Math.max(x1, r.x + r.w); y1 = Math.max(y1, r.y + r.h); });
  const C = cv(), cw = C.clientWidth, ch = C.clientHeight, z = clamp(Math.min((cw - 80) / (x1 - x0), (ch - 140) / (y1 - y0 + 30)), .05, 1);
  animCam({z, x:(cw - (x1 - x0) * z) / 2 - x0 * z, y:50 - (y0 - 30) * z});
}

/* ---------- rendu ---------- */
let P = null;
function render(opts){
  opts = opts || {};
  document.documentElement.dataset.theme = st.theme;
  const app = $("#app");
  app.className = [st.ui === "min" ? "ui-min" : st.ui === "hidden" ? "ui-hidden" : "", st.sel || st.multi.length ? "has-sel" : "", st.dev ? "dev" : "", st.drawer === "l" ? "dl" : st.drawer === "r" ? "dr" : ""].filter(Boolean).join(" ");
  app.style.setProperty("--lw", st.lw + "px"); app.style.setProperty("--rw", st.rw + "px");
  if (!opts.light){
    P = PAGE[st.page]();
    cv().classList.toggle("figjam", !!P.figjam);
    $("#world").innerHTML = P.cols.map(c => `<div class="col" style="left:${c.x}px;width:${c.w}px;--mo:${c.mo || 0}">${c.html}</div>`).join("");
    applyCam(); placePins();
    const ta = $("#ta"); if (ta){ ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); ta.addEventListener("input", () => { $("#live").innerHTML = liveHTML(refAl(draft().al), ta.value); }); }
  }
  markSel(); renderLeft(); renderRight(); renderToolbar(); renderChrome(); placeThread(); save();
}
function markSel(){
  $$("#world .sel, #world .msel").forEach(e => e.classList.remove("sel", "msel"));
  if (st.sel){ $$(`#world [data-k="${CSS.escape(st.sel)}"]`).forEach(e => { if (e.matches(".frame,.section,.sticky,tr,.erow")) e.classList.add("sel"); }); }
  st.multi.forEach(k => { const e = elOf(k); if (e) e.classList.add("msel"); });
  $$("#world .pin").forEach(p => p.classList.toggle("on", st.thread != null && +p.dataset.u === st.thread));
  $$("#world mark.pt").forEach(m => m.classList.toggle("on", st.thread != null && +m.dataset.u === st.thread && !!m.closest("[data-pins]")));
}
function placeCursors(){
  $$("#world .fcur").forEach(c => c.remove());
  if (st.page !== "atelier" || mobile()) return;
  const add = (k, name, color, i) => { const fr = elOf(k); if (!fr) return; const c = document.createElement("div"); c.className = "fcur"; if (k.startsWith("draft:")){ c.style.left = "74%"; c.style.top = "calc(100% - 46px)"; } else { c.style.left = "calc(100% + 6px)"; c.style.top = (90 + i * 30) + "px"; } c.style.animationDelay = (-i * 1.7) + "s"; c.innerHTML = mp(name, color); fr.appendChild(c); };
  const m = draftOn(st.o); if (m) add("draft:" + m.id, "Vous", GR[ME].color, 1);
  groupsHere().slice(0, 3).forEach((g, i) => add("am:" + g.id, g.w.name, g.w.color, i));
}
function placePins(){
  placeCursors();
  $$("#world .pin").forEach(p => p.remove());
  if (mobile() || !st.pins) return;
  const z = cam().z;
  $$("#world [data-pins]").forEach(fr => {
    const o = +fr.dataset.pins, U = unitsOf(o), fb = fr.getBoundingClientRect(), used = [], seen = new Set();
    fr.querySelectorAll("mark.pt").forEach(m => {
      const k = +m.dataset.u; if (seen.has(k)) return; seen.add(k);
      const u = U.find(x => x.k === k); if (!u) return; const r = m.getClientRects()[0]; if (!r) return;
      const y = (r.top - fb.top) / z - 6; let x = 0, yy = y; while (used.some(p => Math.abs(p.y - yy) < 32 && p.x === x)){ x += 38; if (x > 38){ x = 0; yy += 34; } } used.push({x, y:yy});
      const pin = document.createElement("div"); pin.className = "pin"; pin.dataset.u = k; pin.style.top = used[used.length - 1].y + "px"; pin.style.marginLeft = x + "px";
      pin.title = `« ${u.label} » · ${u.n} propositions`; pin.innerHTML = `<i>${u.n}</i>`; fr.appendChild(pin);
    });
  });
}

/* ---------- panneau gauche : fichier, pages, calques ; ressources ---------- */
function renderLeft(){
  const tabs = `<div class="l-tabs"><button class="tabb${st.ltab === "file" ? " on" : ""}" data-ltab="file">Fichier</button><button class="tabb${st.ltab === "assets" ? " on" : ""}" data-ltab="assets">Ressources</button><span class="sp"></span><button class="ibtn sm" data-cmd="find" data-tip="Rechercher" data-key="Ctrl K">${I.search}</button></div>`;
  const head = `<div class="l-head"><div class="l-top"><button class="menu-btn" data-menu="main" data-tip="Menu principal">${I.grid}${I.car}</button><button class="ibtn" data-cmd="minui" data-tip="Réduire l'interface" data-key="Ctrl Maj \\">${I.panel}</button></div>
    <div class="file"><div class="n">Boussole ${I.chev}</div><div class="s">Article 4 · projet de loi logement</div></div></div>`;
  let body;
  if (st.ltab === "file"){
    const pages = PAGES.map(p => `<div class="lrow pg${p.id === st.page ? " on-p" : ""}" data-page="${p.id}"><span class="ic">${p.icon}</span><span class="lbl">${p.label}<small>${p.sub}</small></span>${p.id === "atelier" ? `<span class="num">${MINE.length}</span>` : ""}</div>`).join("");
    body = lsec("pages", "Pages", pages) + lsec("layers", "Calques", layerTree(P ? P.layers : [], 0));
  } else {
    const gs = Object.keys(GR).filter(g => ALL.some(a => a.groupe === g && !a.inst));
    const comps = gs.map(g => `<div class="lrow comp" data-group="${g}" data-tip="Filtrer les concurrents sur ce groupe"><span class="ic">${I.comp}</span><span class="dot" style="background:${GR[g].color}"></span><span class="lbl">${esc(GR[g].name)}${g === ME ? "<small>vous</small>" : ""}</span><span class="num">${ALL.filter(a => a.groupe === g && !a.inst).length}</span></div>`).join("")
      + Object.keys(INS).map(k => `<div class="lrow comp" data-group="${esc(INS[k].name)}"><span class="ic">${I.inst}</span><span class="lbl">${esc(INS[k].name)}<small>${esc(INS[k].sub)}</small></span><span class="num">${ALL.filter(a => a.inst === k).length}</span></div>`).join("");
    const refs = ETAPES.map(id => `<div class="lrow${id === REF ? " on" : ""}" data-ref="${id}"><span class="ic">${id === REF ? "●" : "○"}</span><span class="lbl">${esc(ET[id].label)}</span></div>`).join("");
    const ths = THEMES.map(t => `<div class="lrow" data-nav="theme:${t.id}"><span class="ic">${I.bulb}</span><span class="lbl">${esc(t.label)}<small>${t.src}</small></span><span class="num">${t.amendements.length}</span></div>`).join("");
    body = lsec("refs", "Styles · référence vierge", refs) + lsec("comps", "Composants · groupes", comps) + lsec("ths", "Thèmes", ths);
  }
  $("#left").innerHTML = head + tabs + `<div class="l-body">${body}</div><div class="resizer" data-rs="l"></div>`;
}
function lsec(id, title, body){ return `<div class="l-sec${st.closed[id] ? " closed" : ""}"><div class="sec-h"><span class="chev" data-sec="${id}">${I.chev}</span><span class="t" data-sec="${id}">${esc(title)}</span></div><div class="sec-b">${body}</div></div>`; }
function layerTree(L, d){
  return L.map(n => {
    const kids = n.kids && n.kids.length, open = kids && (st.open[n.k] != null ? st.open[n.k] : (st.sel && n.kids.some(c => c.k === st.sel)) || d === 0 && st.sel === n.k);
    const on = st.sel === n.k || st.multi.includes(n.k), child = !on && kids && n.kids.some(c => c.k === st.sel);
    return `<div class="lrow${on ? " on" : ""}${child ? " child-on" : ""}${n.comp ? " comp" : ""}${n.hid ? " hid" : ""}" style="--d:${d}" data-lk="${esc(n.k)}"><span class="tw" ${kids ? `data-tw="${esc(n.k)}"` : ""}>${kids ? (open ? I.twd : I.tw) : ""}</span><span class="ic">${n.icon || I.frame}</span>${n.dot ? `<span class="dot" style="background:${n.dot}"></span>` : ""}<span class="lbl">${esc(n.label)}${n.small ? `<small>${esc(n.small)}</small>` : ""}</span>${n.num !== undefined && n.num !== "" ? `<span class="num">${n.num}</span>` : ""}</div>` + (open ? layerTree(n.kids, d + 1) : "");
  }).join("");
}

function resolveCmp(k){ if (!k || !k.startsWith("cmp:") || !st.cmp) return k; const A = arg(k); if (A === "ref") return "ref:" + st.o; const id = st.cmp[A === "a" ? 0 : 1]; return id.startsWith("M") ? "draft:" + id : "am:" + id; }
/* ---------- panneau droit : propriétés | concurrents ; inspecteur ---------- */
function groupsHere(){
  const seen = new Map(); for (const u of concurrents(st.o).units){ const w = who(u.lead); if (!seen.has(w.name)) seen.set(w.name, {w, id:u.lead.id}); }
  return [...seen.values()];
}
function renderRight(){
  const G = groupsHere(), z = Math.round(cam().z * 100);
  const head = `<div class="r-head"><div class="avs">${G.slice(0, 3).map(g => av(g.w.name, g.w.color, `data-follow="${g.id}"`)).join("")}${G.length > 3 ? `<span class="av more" data-menu="groups" data-tip="${G.length} groupes ont déposé sur l'alinéa ${st.o}">+${G.length - 3}</span>` : ""}<button class="ibtn sm car-b" data-menu="groups" data-tip="Groupes présents : suivre">${I.chev}</button></div><span class="sp"></span>
    <button class="ibtn" data-cmd="present" data-tip="Présenter la sélection" data-key="Ctrl Alt ↵">${I.play}</button><button class="ibtn sm car-b" data-cmd="present" aria-label="Présenter">${I.chev}</button><button class="share" data-cmd="share">Partager</button></div>`;
  const tabs = st.dev ? `<div class="r-tabs"><button class="tabb on">Inspecter</button><span class="sp"></span><button class="zoomb" data-menu="zoom"><span id="zoomv">${z} %</span>${I.chev}</button></div>`
    : `<div class="r-tabs"><button class="tabb${st.rtab === "props" ? " on" : ""}" data-rtab="props">Propriétés</button><button class="tabb${st.rtab === "conc" ? " on" : ""}" data-rtab="conc">Concurrents</button><span class="sp"></span><button class="zoomb" data-menu="zoom" data-tip="Zoom"><span id="zoomv">${z} %</span>${I.chev}</button></div>`;
  let body = st.dev ? inspect(st.sel) : st.rtab === "conc" ? concList() : props(st.sel);
  if (st.vh && !st.dev){ const m = draft(), V = versionsOf(m);
    body = `<div class="p-h big"><span class="t">Historique des versions</span><button class="ibtn sm" data-cmd="vh-close" data-tip="Fermer l'historique">${I.close}</button></div><div class="p-txt" style="padding-bottom:8px">${esc(draftNum(m))} · alinéa ${m.al}. Chaque validation crée une version ; cliquer une version la pose sur le canevas, à côté de la feuille.</div><div class="vh-list">${V.map((v, i) => `<div class="vh-it${(st.vhSel == null ? 0 : st.vhSel) === i ? " on" : ""}" data-vhsel="${i}"><span class="vh-dot"></span><div><div class="vh-t">${esc(v.label)}</div><div class="vh-w">${esc(v.when)} · ${words(v.texte)} mots${i === 0 ? " · Vous" : ""}</div></div></div>`).join("")}</div>`; }
  $("#right").innerHTML = head + tabs + `<div class="r-body" id="rbody">${body}</div><div class="resizer" data-rs="r"></div>`;
  const pf = $("#pf"); if (pf) pf.addEventListener("input", e => { st.filter = e.target.value; const pos = e.target.selectionStart; render(); const n = $("#pf"); if (n){ n.focus(); n.setSelectionRange(pos, pos); } });
}
const psec = (title, body, act) => `<div class="p-sec"><div class="p-h"><span class="t">${title}</span>${act || ""}</div>${body}</div>`;
const fld = (pre, v, attrs) => `<span class="fld${attrs ? " click" : ""}" ${attrs || ""}><span class="pre">${pre}</span><span class="v">${v}</span></span>`;
const prow = (...xs) => `<div class="p-row">${xs.join("")}</div>`;
const seg = (name, opts, cur) => `<span class="seg">${opts.map(([v, l]) => `<button class="${v === cur ? "on" : ""}" data-seg="${name}" data-v="${v}">${l}</button>`).join("")}</span>`;
function refSelect(){ return `<span class="fld"><span class="pre">${I.ref.replace('<svg', '<svg style="width:14px;height:14px"')}</span><select id="refsel" aria-label="Référence">${ETAPES.map(id => `<option value="${id}"${id === REF ? " selected" : ""}>${esc(ET[id].label)}</option>`).join("")}</select></span>`; }
function pageProps(){
  const p = PAGES.find(x => x.id === st.page);
  let s = `<div class="p-h big"><span class="t">Page · ${p.label}</span></div>`;
  s += psec("Référence vierge", prow(refSelect()) + `<div class="p-txt">Le texte face auquel toute rédaction est comparée. Il reste vierge ; les corrections sont portées sur la rédaction comparée.</div>`);
  if (st.page === "atelier") s += psec("Alinéa", prow(`<span class="fld"><span class="pre">¶</span><select id="alsel" aria-label="Alinéa">${Array.from({length:NAL}, (_, i) => i + 1).map(o => { const n = concurrents(o).units.length; return `<option value="${o}"${o === st.o ? " selected" : ""}>Alinéa ${o}${n ? ` · ${n} concurrents` : ""}${MINE.some(m => m.al === o) ? " · brouillon" : ""}</option>`; }).join("")}</select></span>`))
    + psec("Mes brouillons", `<div class="p-list">${MINE.map(m => `<div class="lrow${m.id === draft().id && draft().al === st.o ? " on" : ""}" data-nav="draft:${m.id}"><span class="ic">${I.frame}</span><span class="lbl">${esc(draftNum(m))}<small>al. ${m.al} · ${m.mode === "supprimer" ? "supprimer" : m.mode === "inserer" ? "insérer" : "rédiger"}</small></span></div>`).join("")}</div>`, `<button class="ibtn sm" data-cmd="new" data-tip="Nouveau brouillon sur l'alinéa ${st.o}" data-key="F">${I.plus}</button>`);
  s += psec("Affichage", prow(`<span class="pre" style="width:64px;color:var(--text2)">Bulles</span>`, seg("pins", [["1", "Afficher"], ["0", "Masquer"]], st.pins ? "1" : "0")) + prow(`<span class="pre" style="width:64px;color:var(--text2)">Thème</span>`, seg("theme", [["light", "Clair"], ["dark", "Sombre"]], st.theme)));
  s += psec("Aide", `<div class="p-txt">Cliquez un cadre pour voir ses propriétés ; Maj+clic pour en sélectionner deux et les comparer. Ctrl+molette : zoom ; glisser le fond : se déplacer.</div><div class="p-row"><button class="btn" data-cmd="help">Lisez-moi</button><button class="btn" data-cmd="actions">Actions <span class="kbd">Ctrl K</span></button></div>`);
  return s;
}
function props(k){
  k = resolveCmp(k);
  if (st.multi.length >= 2){
    const L = st.multi.map(x => x.startsWith("draft:") ? {k:x, l:draftNum(MINE.find(m => m.id === arg(x)) || draft()), c:GR[ME].color} : {k:x, l:AM[arg(x)].num + " · " + who(AM[arg(x)]).name, c:who(AM[arg(x)]).color});
    return `<div class="p-h big"><span class="t">${L.length} sélectionnés</span></div>` + psec("Sélection", `<div class="p-list">${L.map(x => `<div class="lrow"><span class="dot" style="background:${x.c}"></span><span class="lbl">${esc(x.l)}</span></div>`).join("")}</div>`)
      + psec("Comparer", `<div class="p-txt">En trois colonnes : l'une | la référence au centre | l'autre.</div><div class="p-row"><button class="btn pri" data-cmd="compare">Comparer</button><button class="btn" data-cmd="clear-multi">Annuler</button></div>`);
  }
  if (!k) return pageProps();
  const K = kind(k), A = arg(k);
  if (K === "draft" || K === "switch"){
    const m = MINE.find(x => x.id === A) || draft(), U = unitsOf(m.al);
    return `<div class="p-h big"><span class="t">Brouillon ${I.chev.replace('<svg', '<svg style="width:16px;height:16px;color:var(--text2)"')}</span><button class="ibtn sm" data-cmd="dev" data-tip="Inspecter" data-key="Maj D">${I.code}</button><button class="ibtn sm" data-cmd="share" data-tip="Partager">${I.people}</button></div>`
      + psec("Identité", prow(fld("N°", esc(draftNum(m))), fld("¶", "alinéa " + m.al)) + prow(fld(dot(GR[ME].color), esc(GR[ME].name))))
      + psec("Mode", prow(seg("mode", [["rediger", "Rédiger"], ["supprimer", "Supprimer"], ["inserer", "Insérer"]], m.mode)) + `<div class="p-txt">${esc(draftLead(m))}</div>`)
      + psec("Visibilité", prow(seg("vis", [["privé", "Privé"], ["partagé", "Groupe"], ["public", "Public"]], m.vis)))
      + psec("Passages disputés", U.length ? `<div class="p-list">${U.map(u => `<div class="lrow comp" data-unit="${u.k}"><span class="ic">${I.comp}</span><span class="lbl">« ${esc(u.label)} »</span><span class="num">${u.n}</span></div>`).join("")}</div>` : `<div class="p-txt">Aucun passage disputé sur cet alinéa.</div>`)
      + psec("Référence", prow(refSelect()))
      + psec("Actions", `<div class="p-row"><button class="btn" data-cmd="edit">Modifier le texte</button><button class="btn" data-cmd="vh">Versions</button><button class="btn" data-cmd="hist">Navette</button></div>${MINE.length > 1 ? `<div class="p-row"><button class="btn" data-cmd="del-draft" style="color:var(--danger)">Supprimer ce brouillon</button></div>` : ""}`);
  }
  if (K === "am"){
    const a = AM[A], w = who(a), ep = NX.epOf(a), o = st.page === "atelier" ? st.o : amAl(a), u = concurrents(o).units.find(x => x.members.some(y => y.id === a.id));
    const myM = draftOn(o);
    return `<div class="p-h big"><span class="t">Amendement ${esc(a.num)}</span><button class="ibtn sm" data-cmd="dev" data-tip="Inspecter" data-key="Maj D">${I.code}</button></div>`
      + psec("Identité", prow(fld("N°", `<span class="mono">${esc(a.num)}</span>`), fld(dot(w.color), esc(w.name))) + prow(fld("Par", esc(a.auteur || "—"))) + (a.cosign && a.cosign.length ? `<div class="p-txt">et ${a.cosign.length} cosignataires</div>` : ""))
      + psec("Sort", prow(`<span class="fld"><span class="v">${chipSort(a)}</span></span>`, fld("Avis", esc(a.avis ? avisSym(a.avis) + " " + a.avis : "—"))) + (u && u.members.length > 1 ? `<div class="p-txt">${u.kind === "ident" ? "Identiques" : "Série"} : ${u.members.map(x => `<a class="lnk" data-k="am:${x.id}">${x.num}</a>`).join(", ")}</div>` : ""))
      + psec("Cible", prow(fld("¶", a.cible.al ? "alinéa " + a.cible.al : esc(a.cible.label || "—")), fld("Mode", esc(a.mode))) + `<div class="p-txt">${esc(modeLead(a, o))}</div>`)
      + psec("Réunion", ep ? prow(`<button class="btn" data-nav="place:${ep.place}">Place ${ep.place} en réunion ↗</button>`) : `<div class="p-txt">Pas de place en réunion.</div>`)
      + psec("Thèmes", themesOf(a).length ? `<div class="p-list">${themesOf(a).map(t => `<div class="lrow" data-nav="theme:${t.id}"><span class="ic">${I.bulb}</span><span class="lbl">${esc(t.label)}</span></div>`).join("")}</div>` : `<div class="p-txt">Aucun thème.</div>`)
      + psec("Comparer", `<div class="p-row">${myM ? `<button class="btn pri" data-cmd="cmp-mine" data-id="${a.id}">Avec mon brouillon</button>` : ""}<button class="btn" data-cmd="add-multi" data-id="${a.id}">Ajouter à la sélection</button></div>`)
      + psec("Exposé sommaire", `<div class="p-txt law-s">${esc(short(a.expose || "—", 900))}</div>`)
      + (st.page !== "atelier" ? psec("Atelier", prow(`<button class="btn" data-nav="am:${a.id}">Voir dans l'atelier ↗</button>`)) : "");
  }
  if (K === "unit") return unitProps(+A);
  if (K === "ref" || K === "nodraft" || K === "al"){
    const o = +A, n = concurrents(o).units.length, U = unitsOf(o), H = NX.hist(o);
    return `<div class="p-h big"><span class="t">Alinéa ${o}</span></div>`
      + psec("Référence", prow(refSelect()) + `<div class="p-txt law-s">${esc(short(refAl(o), 400))}</div>`)
      + psec("Navette", H.map((h, i) => prow(`<span class="pre" style="flex:1;color:var(--text2)">${esc(ETL[h.id])}</span>`, `<span class="chip ${i && !h.same && !h.absent ? "attente" : ""}">${i ? (h.same ? "inchangé" : h.absent ? "absent" : "modifié") : "origine"}</span>`)).join(""))
      + psec("Concurrents", prow(fld("#", n + " " + plural(n, "concurrent")), fld(I.comp.replace('<svg', '<svg style="width:14px;height:14px;color:var(--comp)"'), U.length + " " + plural(U.length, "passage"))) + `<div class="p-row"><button class="btn pri" data-nav="amender:${o}">Amender cet alinéa</button>${K === "al" ? `<button class="btn" data-nav="al:${o}">Atelier ↗</button>` : ""}</div>`);
  }
  if (K === "art"){
    const p = NX.plan.find(x => x.num === A);
    return `<div class="p-h big"><span class="t">Article ${esc(A)}</span></div>` + psec("Intitulé", `<div class="p-txt law-s">${esc(p.intitule || "(sans intitulé)")}</div>`) + psec("Statut", `<div class="p-txt">${esc(p.statut || "—")}${p.cible ? "<br>Vise : " + esc(short(p.cible, 160)) : ""}</div>`)
      + psec("Amendements en commission", prow(fld("#", p.n + " amendements")) + Object.entries(p.amendements || {}).sort((x, y) => y[1] - x[1]).map(([s, n]) => prow(`<span class="pre" style="flex:1;color:var(--text2)">${esc(s)}</span>`, `<span class="num">${n}</span>`)).join(""))
      + (A === "4" ? psec("Article 4", prow(`<button class="btn pri" data-k="etape:transmis">Les quatre étapes</button>`)) : `<div class="p-txt" style="padding:12px 16px">Seul l'article 4 est chargé en détail.</div>`);
  }
  if (K === "theme"){
    const t = THEMES.find(x => x.id === A), als = themeAls(t);
    return `<div class="p-h big"><span class="t">${esc(t.label)}</span></div>` + psec("Origine", `<div class="p-txt">${t.src === "déclaré" ? "Thème déclaré par le rapport de la commission." : "Thème calculé par mots-clés dans les dispositifs et exposés (dit comme tel)."}</div>`)
      + psec("Compte", prow(fld("#", t.amendements.length + " amendements"), fld("¶", als.length + " alinéas")))
      + psec("Alinéas", `<div class="p-list">${als.map(o => `<div class="lrow" data-nav="al:${o}"><span class="ic">¶</span><span class="lbl">Alinéa ${o}<small>${esc(NX.alShort(o, 30))}</small></span></div>`).join("")}</div>`);
  }
  if (K === "place"){
    const e = NX.episodes.find(x => x.place === +A), ams = e.ams.map(id => AM[id]).filter(Boolean);
    return `<div class="p-h big"><span class="t">Place ${e.place}</span></div>` + psec("Titre", `<div class="p-txt law-s">${esc(e.titre)}</div>`)
      + psec("Compte", prow(fld("#", e.mots + " mots"), fld("✎", e.paroles.length + " prises"))) + psec("Amendements", `<div class="p-list">${ams.map(a => `<div class="lrow" data-nav="am:${a.id}"><span class="dot" style="background:${who(a).color}"></span><span class="lbl"><span class="mono">${a.num}</span><small>${esc(sortWord(a))}</small></span></div>`).join("")}</div>`)
      + psec("Naviguer", prow(`<button class="btn" data-cmd="place-prev">← Place précédente</button>`, `<button class="btn" data-cmd="place-next">Suivante →</button>`));
  }
  if (K === "parole"){
    const [pl, i] = A.split(":").map(Number), e = NX.episodes.find(x => x.place === pl), p = e.paroles[i];
    return `<div class="p-h big"><span class="t">Post-it · prise de parole</span></div>` + psec("Orateur", prow(fld(p.groupe ? dot(NX.groupColor(p.groupe)) : "•", esc(NX.speaker(p)))) + prow(fld("#", p.mots + " mots"), fld("Place", e.place)))
      + psec("Texte", `<div class="p-txt law-s">${esc(p.txt)}</div>`);
  }
  // cadres et sections
  const FR = {"etape:S-depot":["Sénat · dépôt", "Le projet de loi déposé. Une ligne par alinéa, alignée sur les autres étapes."], "etape:S-com":["Sénat · commission", "Bleu : modifié par rapport à l'étape précédente."], "etape:transmis":["Texte transmis", "Le texte examiné par l'Assemblée."], "etape:AN-com":["Commission (AN)", "Le texte de la commission ; nombre d'amendements par alinéa."], "frame:hist":["Alinéa d'étape en étape", "Chaque étape face à la précédente."], "frame:plan":["Projet de loi", "Les 16 articles et leur nombre d'amendements en commission."],
    "frame:article":["Article 4 · votre version", "Tous vos brouillons appliqués au texte de référence ; l'inchangé se replie."], "frame:code":["CGI · article 31", "Le code tel qu'il deviendrait."], "sec:cmp":["Comparaison", "Trois cadres alignés : une rédaction | la référence au centre | l'autre."],
    "sec:conc":["Concurrents", "Une rédaction distincte par cadre ; identiques et séries pliés."], "frame:ecartes":["Rédactionnels et écartés", "Irrecevables, retirés avant séance, rédactionnels."], "sec:themes":["Thèmes", "Neuf thèmes, déclarés par le rapport ou calculés par mots-clés."],
    "frame:fiche":["Fiche du thème", "Trois strates : rapport, réunion, mon texte."], "frame:matrice":["Thèmes × groupes", "Nombre d'amendements, rien d'autre."], "frame:overview":["Vue d'ensemble", "Les 26 places à l'échelle des mots prononcés ; vert : un amendement adopté."], "frame:vote":["Liste de vote", "Auteur, numéro, objet, avis, sort."]};
  const f = FR[k] || [k, ""];
  return `<div class="p-h big"><span class="t">${I.frame.replace('<svg', '<svg style="width:16px;height:16px"')} ${esc(f[0])}</span></div>` + psec("Cadre", `<div class="p-txt">${esc(f[1])}</div>`) + (k === "sec:cmp" ? psec("Comparaison", `<div class="p-row"><button class="btn" data-cmd="swap">Inverser</button><button class="btn" data-cmd="cmp-close">Fermer</button></div>`) : "") + (k === "frame:article" ? psec("Repli", prow(seg("unfold", [["0", "Replié"], ["1", "Déplié"]], st.unfold ? "1" : "0"))) : "");
}
function clusterMsgs(u, cls){
  const C = clusters(u);
  return C.list.map(c => {
    const isRef = c.items.some(i => i.id === "ref"), people = [...new Map(c.items.filter(i => i.id !== "ref").map(i => [i.label, i])).values()];
    const tx = isRef ? esc(C.ref) : c.text == null ? `<del>${esc(C.ref)}</del>` : inlineDiff(C.ref, c.text);
    const names = people.map(i => i.label), ams = c.items.filter(i => i.a);
    const nm = isRef ? `Référence <small>vierge · ${c.items.length - 1} ${plural(c.items.length - 1, "proposition")} ne ${c.items.length - 1 > 1 ? "touchent" : "touche"} pas ce passage</small>` : `${esc(names.slice(0, 2).join(", "))}${names.length > 2 ? ` <small>+${names.length - 2}</small>` : ""}<small>${c.items.length} ${plural(c.items.length, "voix")}</small>`;
    return `<div class="${cls}${isRef ? " ref" : ""}"><span class="avs">${isRef ? `<span class="av" style="--g:#8c8c8c" data-tip="Référence">R</span>` : people.slice(0, 3).map(i => av(i.label, i.color)).join("")}</span><div class="nm">${nm}</div><div class="tx">${tx || "<i>(vide)</i>"}</div>${!isRef && ams.length ? `<div class="ams">${ams.slice(0, 8).map(i => `<button data-nav="am:${i.a.id}" data-tip="${esc(i.label)} · ${esc(sortWord(i.a))}">${i.a.num}</button>`).join("")}${ams.length > 8 ? `<span style="color:var(--text2);font-size:11px;line-height:18px">+${ams.length - 8}</span>` : ""}</div>` : ""}</div>`;
  }).join("");
}
function unitProps(k){
  const u = unitsOf(st.o).find(x => x.k === k); if (!u) return pageProps();
  const C = clusters(u);
  return `<div class="p-h big"><span class="t" style="color:var(--comp)">${I.comp.replace('<svg', '<svg style="width:16px;height:16px"')} Passage disputé</span></div>`
    + psec("Passage", `<div class="p-txt law-s">« ${esc(C.ref)} »</div>` + prow(fld("#", u.n + " propositions"), fld("≠", C.list.length + " rédactions")))
    + psec("Propositions regroupées", `<div>${clusterMsgs(u, "cl")}</div>`);
}
function concList(){
  const F = filtered(st.o), all = [...F.C.units, ...F.C.ecartes];
  const keys = [["tous", "Tous"], ["adopte", "Adoptés"], ["rejete", "Rejetés"], ["tombe", "Tombés"], ["retire", "Retirés"], ["ns", "Non soutenus"]].filter(([v]) => v === "tous" || all.some(u => NX.sortKey(u.lead) === v));
  const byG = new Map(); for (const u of F.units){ const g = who(u.lead).name; if (!byG.has(g)) byG.set(g, []); byG.get(g).push(u); }
  return `<div class="filter">${I.search}<input id="pf" placeholder="Filtrer (n°, groupe, objet…)" value="${esc(st.filter)}" aria-label="Filtrer les concurrents"></div><div class="chips">${keys.map(([v, l]) => `<button class="${st.sortF === v ? "on" : ""}" data-sortf="${v}">${l}</button>`).join("")}</div>
    <div class="grp-h">Alinéa ${st.o} · ${F.units.length} sur ${F.C.units.length}</div>`
    + ([...byG].map(([g, L]) => `<div class="grp-h">${dot(who(L[0].lead).color)} ${esc(g)} <span style="margin-left:auto">${L.length}</span></div>` + L.map(u => { const a = u.lead; return `<div class="lrow${st.sel === "am:" + a.id ? " on" : ""}" data-nav="am:${a.id}"><span class="lbl"><span class="mono">${a.num}</span><small>${esc(short(objetOf(a) || modeLead(a, st.o), 40))}</small></span><span class="chip ${NX.sortKey(a)}" style="height:18px">${esc(sortWord(a).split(" ")[0])}</span></div>`; }).join("")).join("") || `<div class="empty">Aucun concurrent ne correspond.</div>`);
}
/* l'inspecteur (mode développeur) : le texte juridique brut et ses opérations */
function inspect(k){
  k = resolveCmp(k);
  const code = s => `<div class="code">${s}</div>`;
  const banner = `<div class="dev-banner">${I.code.replace('<svg', '<svg style="width:18px;height:18px"')}<span>Inspecteur : le texte brut et ses opérations. <span class="kbd">Maj D</span> pour quitter.</span></div>`;
  if (!k) return banner + `<div class="empty">Sélectionnez un cadre (brouillon, amendement, alinéa, thème, place) pour en voir le texte brut.</div>`;
  const K = kind(k), A = arg(k);
  if (K === "am"){
    const a = AM[A];
    return banner + psec("Dispositif", code(esc(a.dispositif || "—"))) + psec("Opérations", a.applique.ops.map(op => code(`<span class="k">${esc(op.forme)}</span> <span class="c">// ${esc(op.statut)}${op.detail ? " · " + esc(op.detail) : ""}</span>\n${esc(op.texte)}`)).join("") || code("—"))
      + psec("Lignes appliquées", code(a.applique.rows.map(r => r.o != null ? `al. ${r.o} ← ${r.del ? '<span class="k">supprimé</span>' : `<span class="s">"${esc(short(r.t, 120))}"</span>`}` : `<span class="k">insère</span> ${r.fin ? "en fin" : "après al. " + r.at} : <span class="s">"${esc(short(r.t, 100))}"</span>`).join("\n") || "—"))
      + psec("Versions", code(a.versions.map(v => `${esc(v.date.replace("T", " "))}  ${esc(v.etat)}${v.sort ? " · " + esc(v.sort) : ""}`).join("\n")))
      + psec("Identifiants", code(`id: <span class="s">${a.id}</span>\nordreTexte: ${a.ordreTexte}  ordreDepot: ${a.ordreDepot}${a.ident ? `\nidentiques: <span class="s">${esc(a.ident)}</span>` : ""}${a.dc ? `\ndiscussion commune: ${esc(a.dc)}` : ""}${a.gage ? "\ngage: oui" : ""}`));
  }
  if (K === "draft" || K === "switch"){
    const m = MINE.find(x => x.id === A) || draft(), v = verOfDraft(m);
    return banner + psec("Dispositif généré", code(esc(draftLead(m)) + (m.mode !== "supprimer" ? `\n<span class="s">« ${esc(m.texte)} »</span>` : ""))) + psec("Opération", code(m.mode === "supprimer" ? `al. ${m.al} ← <span class="k">supprimé</span>` : m.mode === "inserer" ? `<span class="k">insère</span> après al. ${m.al}` : `al. ${m.al} ← <span class="k">réécrit</span>`))
      + psec("Texte brut de la référence", code(esc(refAl(m.al)))) + psec("Identifiants", code(`id: <span class="s">${m.id}</span>\nvisibilité: ${esc(m.vis)}\nlignes touchées: ${[...verTouched(v)].join(", ")}`));
  }
  if (K === "ref" || K === "al" || K === "nodraft"){
    const o = +A;
    return banner + ETAPES.map(id => psec(esc(ET[id].label), code(esc(textAt(id, o) || "— absent")))).join("");
  }
  if (K === "unit"){ const u = unitsOf(st.o).find(x => x.k === +A); return banner + psec("Passage", code(`alinéa ${u.o}, caractères ${u.a}–${u.b}\n<span class="s">« ${esc(TRANSMIS[u.o - 1].slice(u.a, u.b))} »</span>`)) + psec("Propositions", code([...u.ids].join("\n"))); }
  if (K === "theme"){ const t = THEMES.find(x => x.id === A); return banner + psec("Définition", code(`id: <span class="s">${t.id}</span>\nsource: ${t.src}\ndoc: ${esc(t.doc || "—")}`)) + psec("Amendements", code(t.amendements.join(", "))); }
  if (K === "place"){ const e = NX.episodes.find(x => x.place === +A); return banner + psec("Place", code(`id: <span class="s">${e.id}</span>\nmots: ${e.mots}\namendements: ${e.ams.join(", ")}`)) + psec("Décisions", code(e.decisions.map(d => esc(d.txt)).join("\n") || "—")); }
  if (K === "art"){ const p = NX.plan.find(x => x.num === A); return banner + psec("Article", code(esc(JSON.stringify(p, null, 1)))); }
  return banner + `<div class="empty">Ce cadre n'a pas de texte juridique propre.</div>`;
}

/* ---------- barre d'outils, chrome mobile, petite pastille ---------- */
function renderToolbar(){
  const t = (id, icon, tip, key, on, extra) => `<button class="tb${on ? " on" : ""}${extra || ""}" ${id} data-tip="${esc(tip)}" data-key="${esc(key || "")}" aria-label="${esc(tip)}">${icon}</button>`;
  $("#toolbar").innerHTML = `${t('data-tool="move"', I.move, "Déplacer", "V", st.tool === "move")}${t('data-tool="hand"', I.hand, "Main (se déplacer sur le canevas)", "H", st.tool === "hand", " hide-s")}
    ${t('data-cmd="new"', I.frame, "Cadre : nouveau brouillon sur l'alinéa courant", "F")}${t('data-cmd="compare-tool"', I.shape, "Comparer deux rédactions (Maj+clic sur deux cadres)", "", st.multi.length > 0)}
    ${t('data-cmd="edit"', I.text, "Texte : modifier mon brouillon", "T", st.editing)}${t('data-cmd="pins"', I.comment, st.pins ? "Commentaires : masquer les passages disputés" : "Commentaires : afficher les passages disputés", "C", st.pins)}
    ${t('data-cmd="actions"', I.actions, "Actions", "Ctrl K", !!st.actions)}<span class="sepv"></span>
    <button class="tb dev${st.dev ? " on" : ""}" data-cmd="dev" data-tip="Inspecteur (texte brut et opérations)" data-key="Maj D" aria-label="Inspecteur">${I.code}<span class="sw"></span></button>`;
}
function renderChrome(){
  const p = PAGES.find(x => x.id === st.page);
  $("#minichip").innerHTML = `${I.grid.replace('<svg', '<svg style="width:18px;height:18px"')}<span>Boussole</span><span class="pg">${p.label}</span><button class="ibtn" data-cmd="minui" data-tip="Rétablir l'interface" data-key="Ctrl Maj \\">${I.panel}</button>`;
  $("#mobilebar").innerHTML = `<button class="ibtn" data-cmd="drawer-l" aria-label="Pages et calques">${I.panel}</button><button class="t" data-menu="pages">${p.label} <small>· ${esc(selLabel() || "Boussole")}</small>${I.chev.replace('<svg', '<svg style="width:16px;height:16px"')}</button><button class="ibtn${st.sel ? " on" : ""}" data-cmd="drawer-r" aria-label="Propriétés">${I.frame}</button>`;
}
function selLabel(){
  const k = st.sel; if (!k) return ""; const K = kind(k), A = arg(k);
  if (K === "am") return AM[A].num; if (K === "draft") return draftNum(MINE.find(m => m.id === A) || draft()); if (K === "unit") return "passage disputé";
  if (K === "theme") return THEMES.find(t => t.id === A).label; if (K === "place") return "place " + A; if (K === "al" || K === "ref") return "alinéa " + A; return "";
}

/* ---------- fil de commentaire (passage disputé) ---------- */
function openThread(k, anchor){
  st.thread = k; st.sel = "unit:" + k; st.multi = [];
  render({light:true});
  if (anchor) st.threadAnchor = anchor.classList.contains("pin") ? "pin" : "mark";
  placeThread();
}
function placeThread(){
  const T = $("#thread");
  if (st.thread == null || st.page !== "atelier"){ T.classList.remove("on"); return; }
  const u = unitsOf(st.o).find(x => x.k === st.thread); if (!u){ T.classList.remove("on"); st.thread = null; return; }
  if (!T.classList.contains("on") || T.dataset.k !== String(u.k) + "|" + st.o){
    const ref = TRANSMIS[u.o - 1], C = clusters(u);
    T.innerHTML = `<div class="th-h"><span style="color:var(--comp);display:grid">${I.comp.replace('<svg', '<svg style="width:18px;height:18px"')}</span><span class="t">« ${esc(u.label)} »</span><button class="ibtn sm" data-cmd="thread-close" aria-label="Fermer" data-tip="Fermer" data-key="Échap">${I.close}</button></div>
      <div class="ctxl">${u.n} propositions, ${C.list.length} rédactions distinctes. Contexte : <span style="color:var(--text3)">…${esc(ref.slice(Math.max(0, u.a - 60), u.a))}</span><b>${esc(ref.slice(u.a, u.b))}</b><span style="color:var(--text3)">${esc(ref.slice(u.b, u.b + 60))}…</span></div>
      <div class="th-b">${clusterMsgs(u, "msg")}</div>`;
    T.dataset.k = String(u.k) + "|" + st.o; T.classList.add("on");
  }
  if (mobile()) return;
  const a = document.querySelector(`#world .pin[data-u="${u.k}"]`) || document.querySelector(`#world [data-pins] mark.pt[data-u="${u.k}"]`) || document.querySelector(`#world mark.pt[data-u="${u.k}"]`);
  const C = cv().getBoundingClientRect(), W = 340;
  let x = C.width - W - 16, y = 16;
  if (a){ const r = a.getBoundingClientRect(); x = r.right - C.left + 12; if (x + W > C.width - 8) x = Math.max(8, r.left - C.left - W - 12); y = clamp(r.top - C.top - 8, 8, Math.max(8, C.height - Math.min(480, C.height - 24) - 8)); }
  T.style.left = x + "px"; T.style.top = y + "px";
}
function closeThread(){ st.thread = null; $("#thread").classList.remove("on"); markSel(); }

/* ---------- Actions (⌘K) ---------- */
function actionItems(){
  const L = [];
  PAGES.forEach((p, i) => L.push({g:"Pages", t:p.label, d:p.sub, ic:p.icon, k:"", run:() => go(p.id)}));
  L.push({g:"Commandes", t:"Nouveau brouillon sur l'alinéa " + st.o, ic:I.frame, k:"F", run:() => cmd("new")});
  L.push({g:"Commandes", t:"Modifier mon brouillon", ic:I.text, k:"T", run:() => cmd("edit")});
  L.push({g:"Commandes", t:"Historique des versions de mon brouillon", ic:I.page, k:"", run:() => cmd("vh")});
  L.push({g:"Commandes", t:"Zoom pour tout voir", ic:I.search, k:"Maj 1", run:() => zoomFit()});
  L.push({g:"Commandes", t:"Zoom sur la sélection", ic:I.search, k:"Maj 2", run:() => focusEl(elOf(st.sel), "fit")});
  L.push({g:"Commandes", t:"Zoom à 100 %", ic:I.search, k:"Maj 0", run:() => { const c = cam(); animCam({...c, z:1}); }});
  L.push({g:"Commandes", t:(st.dev ? "Quitter" : "Ouvrir") + " l'inspecteur", ic:I.code, k:"Maj D", run:() => cmd("dev")});
  L.push({g:"Commandes", t:(st.pins ? "Masquer" : "Afficher") + " les commentaires", ic:I.comment, k:"C", run:() => cmd("pins")});
  L.push({g:"Commandes", t:"Réduire l'interface", ic:I.panel, k:"Ctrl Maj \\", run:() => cmd("minui")});
  L.push({g:"Commandes", t:"Masquer l'interface", ic:I.panel, k:"Ctrl \\", run:() => cmd("hideui")});
  L.push({g:"Commandes", t:"Thème " + (st.theme === "dark" ? "clair" : "sombre"), ic:I.bulb, k:"", run:() => { st.theme = st.theme === "dark" ? "light" : "dark"; render(); }});
  L.push({g:"Commandes", t:"Lisez-moi · à propos de cette maquette", ic:I.page, k:"", run:() => cmd("help")});
  ETAPES.forEach(id => L.push({g:"Commandes", t:"Référence : " + ET[id].label, d:id === REF ? "actuelle" : "", ic:I.ref, k:"", run:() => setRef(id)}));
  MINE.forEach(m => L.push({g:"Aller à", t:draftNum(m), d:`alinéa ${m.al} · ${short(m.texte, 60)}`, ic:I.frame, run:() => nav("draft:" + m.id)}));
  for (let o = 1; o <= NAL; o++) L.push({g:"Aller à", t:"Alinéa " + o, d:NX.alShort(o, 70), ic:"¶", run:() => nav("al:" + o)});
  ALL.filter(a => a.mode !== "hors-texte").forEach(a => L.push({g:"Aller à", t:a.num, d:`${who(a).name} · ${sortWord(a)} · ${objetOf(a)}`, ic:`<span class="gdot" style="background:${who(a).color}"></span>`, run:() => nav("am:" + a.id)}));
  THEMES.forEach(t => L.push({g:"Aller à", t:"Thème · " + t.label, d:t.src, ic:I.bulb, run:() => nav("theme:" + t.id)}));
  NX.episodes.forEach(e => L.push({g:"Aller à", t:"Place " + e.place, d:e.titre, ic:I.section, run:() => nav("place:" + e.place)}));
  return L;
}
function openActions(tab){
  st.actions = {tab: tab || "tout", i:0, q:""}; closeMenu();
  const A = $("#actions");
  A.innerHTML = `<div class="srch">${I.search}<input id="aq" placeholder="Rechercher des actions, alinéas, amendements, thèmes, places…" autocomplete="off" spellcheck="false" aria-label="Rechercher"><span class="kbd">Échap</span></div><div class="atabs" id="atabs"></div><div class="alist" id="alist"></div>`;
  A.classList.add("on"); renderToolbar(); actionsRender();
  const q = $("#aq"); q.focus(); q.addEventListener("input", () => { st.actions.q = q.value; st.actions.i = 0; actionsRender(); });
}
function actionsRender(){
  const S = st.actions, q = S.q.trim().toLowerCase();
  $("#atabs").innerHTML = [["tout", "Tout"], ["aller", "Aller à"], ["cmd", "Commandes"]].map(([v, l]) => `<button class="tabb${S.tab === v ? " on" : ""}" data-atab="${v}">${l}</button>`).join("");
  let L = actionItems().filter(x => S.tab === "tout" || (S.tab === "aller" ? x.g !== "Commandes" : x.g === "Commandes"));
  if (q) L = L.filter(x => (x.t + " " + (x.d || "")).toLowerCase().includes(q));
  else if (S.tab === "tout") L = L.filter(x => x.g !== "Aller à" || /^Brouillon/.test(x.t));
  L = L.slice(0, 80); S.list = L; S.i = Math.min(S.i, Math.max(0, L.length - 1));
  const hl = s => { if (!q) return esc(s); const i = s.toLowerCase().indexOf(q); return i < 0 ? esc(s) : esc(s.slice(0, i)) + "<b>" + esc(s.slice(i, i + q.length)) + "</b>" + esc(s.slice(i + q.length)); };
  let g = null, out = "";
  L.forEach((x, i) => { if (x.g !== g){ g = x.g; out += `<div class="ah">${g}</div>`; } out += `<div class="ai${i === S.i ? " on" : ""}" data-ai="${i}"><span class="ic">${x.ic || ""}</span><span class="tt"><div>${hl(x.t)}</div>${x.d ? `<small>${esc(short(x.d, 90))}</small>` : ""}</span>${x.k ? `<span class="k">${esc(x.k)}</span>` : ""}</div>`; });
  $("#alist").innerHTML = out || `<div class="empty">Aucun résultat.</div>`;
  const on = $("#alist .on"); if (on) on.scrollIntoView({block:"nearest"});
}
function closeActions(){ st.actions = null; $("#actions").classList.remove("on"); renderToolbar(); }
function runAction(i){ const x = st.actions && st.actions.list[i]; closeActions(); if (x) x.run(); }

/* ---------- menus sombres, dialogues, infobulles, toast ---------- */
function openMenu(name, el){
  const M = $("#menu"), r = el.getBoundingClientRect(); let items = [];
  if (name === "zoom") items = [["Zoom avant", "+", () => zoomAt(1.25)], ["Zoom arrière", "−", () => zoomAt(.8)], ["Zoom pour tout voir", "Maj 1", zoomFit], ["Zoom sur la sélection", "Maj 2", () => focusEl(elOf(st.sel), "fit")], "-", ["Zoom à 50 %", "", () => animCam({...cam(), z:.5})], ["Zoom à 100 %", "Maj 0", () => animCam({...cam(), z:1})], ["Zoom à 200 %", "", () => animCam({...cam(), z:2})]];
  if (name === "main") items = [["Actions…", "Ctrl K", () => openActions()], ["Lisez-moi", "", () => cmd("help")], ["Historique des versions", "", () => cmd("vh")], "-", ...ETAPES.map(id => [(id === REF ? "✓ " : "   ") + "Référence : " + ET[id].label, "", () => setRef(id)]), "-", ["Thème " + (st.theme === "dark" ? "clair" : "sombre"), "", () => { st.theme = st.theme === "dark" ? "light" : "dark"; render(); }], ["Réduire l'interface", "Ctrl Maj \\", () => cmd("minui")], ["Masquer l'interface", "Ctrl \\", () => cmd("hideui")], ["Inspecteur", "Maj D", () => cmd("dev")]];
  if (name === "groups") items = groupsHere().map(g => [`● ${g.w.name}`, "suivre", () => follow(g.id)]);
  if (name === "pages") items = PAGES.map(p => [(p.id === st.page ? "✓ " : "   ") + p.label, "", () => go(p.id)]);
  if (name === "move") items = [["Déplacer", "V", () => { st.tool = "move"; renderToolbar(); cv().classList.remove("hand"); }], ["Main", "H", () => { st.tool = "hand"; renderToolbar(); cv().classList.add("hand"); }]];
  M._items = items.filter(x => x !== "-");
  let n = 0; M.innerHTML = items.map(x => x === "-" ? `<div class="sepm"></div>` : `<div class="mi" data-mi="${n++}"><span>${esc(x[0])}</span>${x[1] ? `<span class="k">${esc(x[1])}</span>` : ""}</div>`).join("");
  M.style.display = "block"; const mw = M.offsetWidth, mh = M.offsetHeight;
  M.style.left = clamp(r.left, 8, innerWidth - mw - 8) + "px"; M.style.top = (r.bottom + 6 + mh > innerHeight ? Math.max(8, r.top - mh - 6) : r.bottom + 6) + "px";
}
function closeMenu(){ $("#menu").style.display = "none"; }
function dialog(title, html){ const D = $("#dlg"); D.querySelector(".dlg").innerHTML = `<div class="dlg-h"><span class="t">${title}</span><button class="ibtn" data-cmd="dlg-close" aria-label="Fermer">${I.close}</button></div><div class="dlg-b">${html}</div>`; D.classList.add("on"); }
function closeDialog(){ $("#dlg").classList.remove("on"); }
let toastT = 0;
function toast(msg, act){ const T = $("#toast"); T.innerHTML = `<span>${msg}</span>${act || ""}`; T.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => T.classList.remove("on"), 4200); }
function help(){
  dialog("Lisez-moi · à propos de cette maquette", `<p><b>Boussole</b> — maquette inspirée de Figma (interface UI3, 2024–2026), sur l'article 4 du projet de loi logement : données réelles, groupes politiques fictifs.</p>
  <h4>Ce qui est emprunté (forme et mécanismes)</h4><ul>
  <li><b>Squelette</b> : panneau gauche (fichier, onglets Fichier | Ressources, <b>Pages</b>, <b>Calques</b> en arbre), <b>canevas</b> sans barre du haut, <b>barre d'outils flottante</b> en bas au centre (déplacer, main, cadre, comparer, texte, commentaire, Actions, puis l'interrupteur de l'inspecteur derrière un filet), <b>panneau de propriétés</b> à droite (avatars, Présenter, bouton bleu Partager, onglets Propriétés | Concurrents, zoom). Panneaux ancrés de 240 px, redimensionnables par leur bord (« floating panels slowed people down »).</li>
  <li><b>Pages = les quatre espaces</b> (Dossier, Atelier, Enjeux, Réunion) ; <b>Calques</b> = le contenu de la page ; Page préc./suiv. pour changer de page.</li>
  <li><b>Cadres</b> sur un canevas infini, nommés au-dessus ; sélection bleue à poignées et badge de dimension (ici un compte : mots, alinéas, amendements). <b>Sections</b> pour regrouper. Glisser le fond, barre d'espace ou outil Main : se déplacer ; Ctrl+molette ou pincer : zoom ; Maj 0 / 1 / 2 : 100 %, tout voir, sélection ; double-clic sur un cadre : zoom sur lui ; Tab : calque suivant ; Maj+clic : sélection multiple.</li>
  <li><b>Atelier</b> : la référence (vierge) et ma feuille au centre, les concurrents en colonne à droite, l'article complet et le code à gauche. <b>Comparer</b> : deux cadres sélectionnés → une section de trois cadres alignés, une rédaction | la référence | l'autre.</li>
  <li><b>Dossier</b> : quatre cadres-colonnes, une par étape de la navette, lignes alignées alinéa par alinéa (filet bleu : modifié) ; à droite, l'alinéa d'étape en étape.</li>
  <li><b>Composants</b> (violet) = les <b>passages disputés</b> : une même zone du texte, retrouvée dans chaque rédaction comme une instance. <b>Bulles de commentaire</b> épinglées = ces passages, avec le nombre de propositions ; le fil = les rédactions distinctes, avec les groupes qui les portent.</li>
  <li><b>Multijoueur</b> : étiquettes (flèche + étiquette pleine) du groupe qui porte chaque rédaction, la vôtre comprise (symétrie) ; curseurs flottants des groupes présents ; avatars en tête du panneau, un clic = « suivre » (aller à leur cadre).</li>
  <li><b>Historique des versions</b> : chaque validation crée une version ; cliquer une version la pose sur le canevas à côté de la feuille ; « Restaurer ».</li>
  <li><b>Menu Actions</b> (Ctrl K) : aller à un alinéa, un amendement, un thème, une place ; changer de référence ; commandes. <b>Dev Mode</b> → <b>Inspecteur</b> (Maj D) : le texte juridique brut et ses opérations. <b>Partager</b> → la visibilité du brouillon (privé, groupe, public). <b>Présenter</b> → l'interface masquée sur la sélection. <b>Réduire l'interface</b> (Ctrl Maj \ ; le panneau droit revient à la sélection), <b>masquer</b> (Ctrl \).</li>
  <li><b>Réunion</b> dans la grammaire du tableau blanc de l'inspiration (FigJam) : fond pointillé, sections à étiquette, un post-it par prise de parole (teinte du groupe), tampons pour les décisions.</li>
  <li>Couleurs : jetons FPL v2, thème clair et sombre (fond #fff | #212121, survol #f1f1f1 | #292929, filet #e4e4e4 | #353535, sélection #0090f3 | #4579ab, violet #a064fd | #7c68a6) ; rayons 5/8/13 ; champs de 24 px à préfixe grisé sur fond plein, lignes de propriétés au pas de 32, sections séparées par un filet, en-têtes en casse normale ; élévations 100 et 500. Police : <b>Inter</b> (Google Fonts), graisses 450/550/600 ; <b>Roboto Mono</b> pour l'inspecteur.</li></ul>
  <h4>Les règles du projet, gardées</h4><ul><li>La <b>référence reste vierge</b> (un cadre à part) ; les corrections apparentes sont portées sur la rédaction comparée, <b>la mienne comme celle d'un autre</b>, avec le même cadre et la même étiquette. Ajout : souligné vert, gras, fond pâle ; suppression : barré rouge, le texte reste visible.</li>
  <li>Pas de score : chaque nombre compte une seule chose. Thèmes : déclarés par le rapport ou calculés par mots-clés, dit sur chaque carte.</li></ul>
  <h4>Écarts assumés</h4><ul><li>La direction artistique « papier sombre » du projet est suspendue : la forme suit l'inspiration (cadres blancs, canevas gris clair).</li>
  <li>Les cadres ne se déplacent ni ne se redimensionnent (poignées indicatives) ; pas de vraie collaboration en temps réel : les « présences » et curseurs sont les groupes qui ont déposé. En sombre, le violet des calques est éclairci pour rester lisible ; les cadres restent blancs, comme dans l'inspiration.</li>
  <li>Sur écran étroit, le canevas défile verticalement (les cadres s'empilent) ; les panneaux deviennent des tiroirs.</li></ul>
  <h4>Sources</h4><ul><li>figma.com/blog : « Behind our redesign: UI3 », « Our approach to designing UI3 ».</li><li>Captures officielles (cdn.sanity.io, gardées dans <span class="mono">figma/ref/</span>) : fenêtre complète, panneau de propriétés, menu Actions, multijoueur.</li></ul>`);
}
function share(){
  const m = draft();
  const row = (v, ic, t, d) => `<div class="vis-row${m.vis === v ? " on" : ""}" data-vis="${v}"><span class="ic">${ic}</span><span style="flex:1"><b>${t}</b><br><span style="color:var(--text2)">${d}</span></span>${m.vis === v ? "✓" : ""}</div>`;
  dialog(`Partager « ${esc(draftNum(m))} »`, `<p style="margin-top:0;color:var(--text2)">La seule part gardée des rôles : qui voit ce brouillon.</p>${row("privé", I.lock, "Privé", "Vous seul")}${row("partagé", I.people, "Partagé avec mon groupe", esc(GR[ME].name))}${row("public", I.globe, "Public", "Tous les groupes de la commission")}<p style="color:var(--text2);margin-bottom:0">Maquette : rien n'est envoyé.</p>`);
}

/* ---------- navigation et commandes ---------- */
function go(page){
  if (!PAGES.find(p => p.id === page)) return;
  const first = !st.cams[page];
  if (st.autoMin){ st.ui = "full"; st.autoMin = false; }
  st.page = page; st.sel = null; st.multi = []; st.editing = false; closeThread(); closeActions(); st.drawer = null;
  render(); if (first) focusPage();
  if (mobile()) cv().scrollTop = 0;
}
window.allerA = go;
function select(k, add){
  closeMenu();
  if (add && (k.startsWith("am:") || k.startsWith("draft:"))){
    const s = new Set(st.multi.length ? st.multi : (st.sel && /^(am|draft):/.test(st.sel) ? [st.sel] : []));
    s.has(k) ? s.delete(k) : s.add(k); st.multi = [...s].slice(-2); st.sel = st.multi.length === 1 ? st.multi[0] : null; if (st.multi.length < 2 && st.sel) st.multi = [];
    return render({light:true});
  }
  st.multi = [];
  const K = kind(k), A = arg(k);
  if (K === "switch") return nav("draft:" + A);
  if (K === "unit"){ if (st.page !== "atelier") return; return openThread(+A, elOf(k)); }
  if (k !== "unit:" + st.thread) closeThread();
  st.sel = k;
  if (K === "al" && st.page === "dossier"){ st.al = +A; render(); return focusEl(elOf("frame:hist"), "reveal"); }
  if (K === "theme" && st.page === "enjeux"){ st.th = A; render(); return focusEl(elOf("frame:fiche"), "reveal"); }
  if (K === "place" && st.page === "reunion"){ const ch = st.place !== +A; st.place = +A; render(); if (ch) focusEl(elOf("place:" + A), "reveal"); return; }
  render({light:true});
}
function nav(k){
  const K = kind(k), A = arg(k);
  if (st.autoMin && !(st.cmp && K === "am")){ st.ui = "full"; st.autoMin = false; }
  st.drawer = null;
  if (K === "draft"){ const m = MINE.find(x => x.id === A); if (!m) return; st.extra = null; if (st.vh && m.id !== draft().id){ st.vhSel = null; } st.draft = m.id; st.o = m.al; st.page = "atelier"; st.sel = "draft:" + m.id; st.multi = []; closeThread(); render(); return focusEl(elOf(st.sel), "top"); }
  if (K === "al"){ st.extra = null; st.o = +A; const m = MINE.find(x => x.al === st.o); if (m) st.draft = m.id; st.page = "atelier"; st.sel = m ? "draft:" + m.id : "ref:" + A; st.multi = []; closeThread(); render(); return focusEl(elOf("ref:" + A), "top"); }
  if (K === "amender"){ const o = +A, m = MINE.find(x => x.al === o) || newDraft(o); UNIT_CACHE.clear(); return nav("draft:" + m.id); }
  if (K === "am"){
    const a = AM[A]; if (!a) return;
    const inAl = o => { const C = concurrents(o); return [...C.units, ...C.ecartes].find(u => u.members.some(y => y.id === a.id)) || (C.redac.some(r => r.id === a.id) ? {lead:a} : null); };
    let o = st.page === "atelier" && inAl(st.o) ? st.o : null;
    if (o == null){ const cand = [a.cible.al, ...a.spans.map(x => x.al), ...a.applique.rows.map(r => r.o || r.at)].filter(Boolean); o = cand.find(x => inAl(x)) || null; for (let x = 1; o == null && x <= NAL; x++) if (inAl(x)) o = x; }
    st.extra = null; if (o == null){ st.extra = a.id; o = a.cible.al || st.o; }
    st.o = o; const m = MINE.find(x => x.al === o); if (m) st.draft = m.id;
    st.page = "atelier"; closeThread();
    const u = inAl(o), lead = u ? u.lead.id : a.id;
    if (u && u.members && !filtered(o).units.some(x => x.lead.id === lead)){ st.filter = ""; st.sortF = "tous"; }
    st.sel = "am:" + lead; st.multi = []; render();
    return focusEl(elOf(st.sel) || elOf("frame:ecartes"), "reveal");
  }
  if (K === "theme"){ st.th = A; st.page = "enjeux"; st.sel = "theme:" + A; render(); return focusEl(elOf("frame:fiche"), "top"); }
  if (K === "place"){ st.place = +A; st.page = "reunion"; st.sel = "place:" + A; render(); return focusEl(elOf("place:" + A), "top"); }
}
function follow(id){ toast(`Vous suivez ${esc(who(AM[id]).name)}.`); nav("am:" + id); }
function setRef(id){ REF = id; store.set("ref", id); toast(`Référence : ${esc(ET[id].label)}. Elle reste vierge ; les corrections sont portées sur les rédactions.`); render(); }
function cmd(c, el){
  switch (c){
    case "help": return help();
    case "share": return share();
    case "dlg-close": return closeDialog();
    case "actions": return st.actions ? closeActions() : openActions();
    case "find": return openActions("aller");
    case "thread-close": return closeThread();
    case "dev": st.dev = !st.dev; return render({light:true});
    case "pins": st.pins = !st.pins; placePins(); markSel(); return render({light:true});
    case "minui": st.ui = st.ui === "min" ? "full" : "min"; return render({light:true});
    case "hideui": st.ui = st.ui === "hidden" ? "full" : "hidden"; if (st.ui === "hidden") toast("Interface masquée · Ctrl \\ ou Échap pour la rétablir."); return render({light:true});
    case "present": st.ui = "hidden"; render({light:true}); toast("Présentation · Échap pour revenir."); return setTimeout(() => focusEl(elOf(st.sel || (Array.isArray(P.focus) ? P.focus[0] : P.focus)), "fit"), 30);
    case "new": { if (st.page !== "atelier"){ st.page = "atelier"; } const m = newDraft(st.o); UNIT_CACHE.clear(); toast(`${esc(draftNum(m))} créé sur l'alinéa ${st.o}, à partir de la référence.`); return nav("draft:" + m.id); }
    case "edit": { const m = draftOn(st.o); if (st.page !== "atelier" || !m){ return nav("draft:" + draft().id), setTimeout(() => cmd("edit"), 0); } if (m.mode === "supprimer"){ toast("Un brouillon de suppression n'a pas de texte : changez son mode dans les propriétés."); return; } st.draft = m.id; st.editing = true; st.sel = "draft:" + m.id; closeThread(); return render(); }
    case "valider": { const m = draft(), ta = $("#ta"); if (ta && ta.value !== m.texte){ (m.journal = m.journal || []).push({t: m.savedAt || null, texte: m.texte, mode: m.mode}); m.texte = ta.value; m.savedAt = Date.now(); } saveDrafts(); UNIT_CACHE.clear(); st.editing = false; toast(`${esc(draftNum(m))} enregistré.`); return render(); }
    case "annuler": st.editing = false; return render();
    case "vh": { if (st.vh){ st.vh = false; st.vhSel = null; return render(); } const m = draftOn(st.o) || draft(); st.vh = true; st.vhSel = null; if (st.page !== "atelier" || st.o !== m.al) nav("draft:" + m.id); else { st.sel = "draft:" + m.id; render(); } return; }
    case "vh-close": st.vh = false; st.vhSel = null; return render();
    case "restore": { const m = draft(), V = versionsOf(m)[st.vhSel]; if (!V) return; (m.journal = m.journal || []).push({t: m.savedAt || null, texte: m.texte, mode: m.mode}); m.texte = V.texte; m.mode = V.mode; m.savedAt = Date.now(); saveDrafts(); UNIT_CACHE.clear(); st.vhSel = null; toast(`${esc(V.label)} restaurée ; l'état précédent reste dans l'historique.`); return render(); }
    case "compare-tool": if (st.page !== "atelier") nav("al:" + st.o); toast("Maj+clic sur deux cadres (le vôtre ou des concurrents), puis « Comparer » dans les propriétés."); return;
    case "compare": { const ids = st.multi.map(arg); st.cmp = ids; st.multi = []; return openCmp(); }
    case "cmp-mine": { const m = draftOn(st.o); if (!m) return; st.cmp = [m.id, el.dataset.id]; return openCmp(); }
    case "add-multi": return select("am:" + el.dataset.id, true);
    case "clear-multi": st.multi = []; return render({light:true});
    case "swap": if (st.cmp) st.cmp = [st.cmp[1], st.cmp[0]]; return render();
    case "cmp-close": st.cmp = null; st.sel = null; if (st.autoMin){ st.ui = "full"; st.autoMin = false; } render(); return focusPage();
    case "fold": st.unfold = false; return render();
    case "unfold": st.unfold = true; return render();
    case "hist": st.al = draft().al; st.page = "dossier"; st.sel = "al:" + st.al; render(); return focusEl(elOf("frame:hist"), "top");
    case "del-draft": { if (MINE.length < 2) return; const m = MINE.find(x => x.id === arg(st.sel)) || draft(); MINE.splice(MINE.indexOf(m), 1); saveDrafts(); UNIT_CACHE.clear(); st.draft = MINE[0].id; st.sel = null; toast("Brouillon supprimé."); return render(); }
    case "place-prev": return nav("place:" + Math.max(1, st.place - 1));
    case "place-next": return nav("place:" + Math.min(NX.episodes.length, st.place + 1));
    case "drawer-l": st.drawer = st.drawer === "l" ? null : "l"; return render({light:true});
    case "drawer-r": st.drawer = st.drawer === "r" ? null : "r"; return render({light:true});
  }
}

/* ---------- gestes : clic, double-clic, clavier, molette, glisser ---------- */
document.addEventListener("click", e => {
  const t = e.target;
  if (!t.closest("#menu")) closeMenu();
  if (t.closest("#scrim")){ st.drawer = null; return render({light:true}); }
  const mi = t.closest("[data-mi]"); if (mi){ const f = $("#menu")._items[+mi.dataset.mi]; closeMenu(); if (f) f[2](); return; }
  const ai = t.closest("[data-ai]"); if (ai) return runAction(+ai.dataset.ai);
  const at = t.closest("[data-atab]"); if (at){ st.actions.tab = at.dataset.atab; st.actions.i = 0; actionsRender(); $("#aq").focus(); return; }
  if (st.actions && !t.closest("#actions") && !t.closest('[data-cmd="actions"]')) closeActions();
  const menu = t.closest("[data-menu]"); if (menu){ e.stopPropagation(); return openMenu(menu.dataset.menu, menu); }
  const pin = t.closest(".pin"); if (pin) return openThread(+pin.dataset.u, pin);
  const mark = t.closest("mark.pt"); if (mark && !st.editing){ if (clickT) return; clickT = setTimeout(() => { clickT = 0; const fr = mark.closest("[data-k]"); if (fr && /^am:/.test(fr.dataset.k) && st.sel !== fr.dataset.k){ /* d'abord le cadre, puis le passage */ } openThread(+mark.dataset.u, mark); }, 240); return; }
  const c = t.closest("[data-cmd]"); if (c) return cmd(c.dataset.cmd, c);
  const vis = t.closest("[data-vis]"); if (vis){ const m = draft(); m.vis = vis.dataset.vis; saveDrafts(); share(); return render(); }
  if (t.closest("#dlg") && !t.closest(".dlg")) return closeDialog();
  const sg = t.closest("[data-seg]"); if (sg) return segSet(sg.dataset.seg, sg.dataset.v);
  const tool = t.closest("[data-tool]"); if (tool){ st.tool = tool.dataset.tool; cv().classList.toggle("hand", st.tool === "hand"); return renderToolbar(); }
  const pg = t.closest("[data-page]"); if (pg) return go(pg.dataset.page);
  const tw = t.closest("[data-tw]"); if (tw){ const k = tw.dataset.tw, cur = !!tw.querySelector("path[d^='M3']"); st.open[k] = !cur; return renderLeft(); }
  const sec = t.closest("[data-sec]"); if (sec){ st.closed[sec.dataset.sec] = !st.closed[sec.dataset.sec]; return renderLeft(); }
  const lt = t.closest("[data-ltab]"); if (lt){ st.ltab = lt.dataset.ltab; return renderLeft(); }
  const rt = t.closest("[data-rtab]"); if (rt){ st.rtab = rt.dataset.rtab; return renderRight(); }
  const vs = t.closest("[data-vhsel]"); if (vs){ st.vhSel = +vs.dataset.vhsel || null; render(); return focusEl(elOf(st.vhSel ? "frame:version" : "draft:" + draft().id), "reveal"); }
  const sf = t.closest("[data-sortf]"); if (sf){ st.sortF = sf.dataset.sortf; return render(); }
  const rf = t.closest("[data-ref]"); if (rf) return setRef(rf.dataset.ref);
  const gr = t.closest("[data-group]"); if (gr){ st.filter = gr.dataset.group; st.rtab = "conc"; st.sortF = "tous"; if (st.page !== "atelier") return nav("al:" + st.o), render(); return render(); }
  const fo = t.closest("[data-follow]"); if (fo) return follow(fo.dataset.follow);
  const un = t.closest("[data-unit]"); if (un){ if (st.page !== "atelier") nav("al:" + st.o); return openThread(+un.dataset.unit, elOf("unit:" + un.dataset.unit) || document.querySelector(`#world .pin[data-u="${un.dataset.unit}"]`)); }
  const nv = t.closest("[data-nav]"); if (nv) return nav(nv.dataset.nav);
  const lk = t.closest("[data-lk]"); if (lk){ const k = lk.dataset.lk; if (/^(switch|unit):/.test(k)) return select(k); select(k, e.shiftKey); if (st.page === "reunion" && kind(k) === "place") return; return focusEl(elOf(k), mobile() ? "top" : "top"); }
  const sel = t.closest("#world [data-k]"); if (sel){ if (t.closest("textarea,button,select,input")) return; if (window.getSelection && String(window.getSelection()).length > 2) return; return select(sel.dataset.k, e.shiftKey); }
  if (t.closest("#canvas") && !t.closest("#thread,#actions,#toolbar,#help,#minichip") && !panMoved){ if (st.thread != null) return closeThread(); if (st.sel || st.multi.length){ st.sel = null; st.multi = []; render({light:true}); } }
});
let clickT = 0;
document.addEventListener("dblclick", e => {
  if (clickT){ clearTimeout(clickT); clickT = 0; }
  const law = e.target.closest('[data-k^="draft:"] [data-edit]'); if (law && !st.editing) return cmd("edit");
  const fr = e.target.closest("#world .frame[data-k], #world .section[data-k]"); if (fr && !law) focusEl(fr, "fit");
});
document.addEventListener("change", e => {
  if (e.target.id === "refsel") return setRef(e.target.value);
  if (e.target.id === "alsel") return nav("al:" + e.target.value);
});
function segSet(name, v){
  if (name === "pins"){ st.pins = v === "1"; return render(); }
  if (name === "theme"){ st.theme = v; return render(); }
  if (name === "unfold"){ st.unfold = v === "1"; return render(); }
  const m = MINE.find(x => x.id === arg(st.sel)) || draft();
  if (name === "mode"){ m.mode = v; if (v !== "supprimer" && !m.texte) m.texte = TRANSMIS[m.al - 1]; saveDrafts(); UNIT_CACHE.clear(); return render(); }
  if (name === "vis"){ m.vis = v; saveDrafts(); return render(); }
}
function selectables(){ return $$("#world .frame[data-k], #world .sticky[data-k]").map(e => e.dataset.k).filter((k, i, a) => a.indexOf(k) === i); }
document.addEventListener("keydown", e => {
  const k = e.key, ctrl = e.ctrlKey || e.metaKey;
  if ($("#dlg").classList.contains("on")){ if (k === "Escape"){ e.preventDefault(); closeDialog(); } return; }
  if (st.actions){
    if (k === "Escape"){ e.preventDefault(); return closeActions(); }
    if (k === "ArrowDown"){ e.preventDefault(); st.actions.i = Math.min(st.actions.list.length - 1, st.actions.i + 1); return actionsRender(); }
    if (k === "ArrowUp"){ e.preventDefault(); st.actions.i = Math.max(0, st.actions.i - 1); return actionsRender(); }
    if (k === "Enter"){ e.preventDefault(); return runAction(st.actions.i); }
    if (ctrl && k.toLowerCase() === "k"){ e.preventDefault(); return closeActions(); }
    return;
  }
  if (st.editing){ if (k === "Escape"){ e.preventDefault(); return cmd("annuler"); } if (k === "Enter" && ctrl){ e.preventDefault(); return cmd("valider"); } return; }
  if (ctrl && (k.toLowerCase() === "k" || k === "/")){ e.preventDefault(); return openActions(); }
  if (ctrl && e.code === "Backslash"){ e.preventDefault(); return cmd(e.shiftKey ? "minui" : "hideui"); }
  if (e.target.matches("input,textarea,select")) { if (k === "Escape") e.target.blur(); return; }
  if (k === "Escape"){
    if ($("#menu").style.display === "block") return closeMenu();
    if (st.drawer){ st.drawer = null; return render({light:true}); }
    if (st.thread != null){ closeThread(); const m = draftOn(st.o); st.sel = m ? "draft:" + m.id : null; return render({light:true}); }
    if (st.ui === "hidden"){ st.ui = "full"; return render({light:true}); }
    if (st.multi.length){ st.multi = []; return render({light:true}); }
    if (st.sel){ const K = kind(st.sel); st.sel = K === "am" && st.page === "atelier" ? "sec:conc" : K === "theme" ? "sec:themes" : K === "parole" ? "place:" + st.place : null; return render({light:true}); }
    return;
  }
  if (ctrl || e.altKey) return;
  if (e.shiftKey && (k === "D" || k === "d")){ e.preventDefault(); return cmd("dev"); }
  if (e.shiftKey && (e.code === "Digit0")){ e.preventDefault(); return animCam({...cam(), z:1}); }
  if (e.shiftKey && (e.code === "Digit1")){ e.preventDefault(); return zoomFit(); }
  if (e.shiftKey && (e.code === "Digit2")){ e.preventDefault(); return focusEl(elOf(st.sel || (Array.isArray(P.focus) ? P.focus[0] : P.focus)), "fit"); }
  if (k === "Tab"){ const L = selectables(); if (!L.length) return; e.preventDefault(); let i = L.indexOf(st.sel); i = (i + (e.shiftKey ? -1 : 1) + L.length) % L.length; select(L[i]); return focusEl(elOf(L[i]), "reveal"); }
  if (k === "PageDown" || k === "PageUp"){ e.preventDefault(); const i = PAGES.findIndex(p => p.id === st.page); return go(PAGES[(i + (k === "PageDown" ? 1 : 3)) % 4].id); }
  const kk = k.toLowerCase();
  if (kk === "v"){ st.tool = "move"; cv().classList.remove("hand"); return renderToolbar(); }
  if (kk === "h"){ st.tool = "hand"; cv().classList.add("hand"); return renderToolbar(); }
  if (kk === "t") return cmd("edit");
  if (kk === "f") return cmd("new");
  if (kk === "c") return cmd("pins");
  if (k === "+" || k === "="){ return zoomAt(1.25); }
  if (k === "-"){ return zoomAt(.8); }
  if (k === " "){ e.preventDefault(); if (!space){ space = true; cv().classList.add("hand"); } }
});
document.addEventListener("keyup", e => { if (e.key === " "){ space = false; if (st.tool !== "hand") cv().classList.remove("hand"); } });
let space = false, pan = null, panMoved = false;
cv().addEventListener("wheel", e => {
  if (mobile()) return;
  if (e.target.closest("#thread,#actions")) return;
  e.preventDefault();
  const r = cv().getBoundingClientRect();
  if (e.ctrlKey || e.metaKey){ zoomAt(Math.exp(-clamp(e.deltaY * (e.deltaMode ? 33 : 1), -60, 60) * .008), e.clientX - r.left, e.clientY - r.top); return; }
  const c = cam(), f = e.deltaMode ? 30 : 1; c.x -= (e.shiftKey ? e.deltaY : e.deltaX) * f; c.y -= (e.shiftKey ? 0 : e.deltaY) * f; applyCam(); placeThread();
}, {passive:false});
cv().addEventListener("scroll", () => { if (!mobile() && (cv().scrollTop || cv().scrollLeft)){ cv().scrollTop = 0; cv().scrollLeft = 0; } });
const touches = new Map(); let pinch = null;
cv().addEventListener("pointerdown", e => { if (e.pointerType !== "touch" || mobile()) return; touches.set(e.pointerId, {x:e.clientX, y:e.clientY}); if (touches.size === 2){ const [a, b] = [...touches.values()]; pinch = {d:Math.hypot(a.x - b.x, a.y - b.y)}; pan = null; } });
addEventListener("pointermove", e => { if (!touches.has(e.pointerId)) return; touches.set(e.pointerId, {x:e.clientX, y:e.clientY}); if (pinch && touches.size === 2){ const [a, b] = [...touches.values()], d = Math.hypot(a.x - b.x, a.y - b.y), r = cv().getBoundingClientRect(); zoomAt(d / pinch.d, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top); pinch.d = d; } });
addEventListener("pointerup", e => { touches.delete(e.pointerId); if (touches.size < 2) pinch = null; });
let gz = 1;
cv().addEventListener("gesturestart", e => { e.preventDefault(); gz = 1; });
cv().addEventListener("gesturechange", e => { e.preventDefault(); const r = cv().getBoundingClientRect(); zoomAt(e.scale / gz, e.clientX - r.left, e.clientY - r.top); gz = e.scale; });
cv().addEventListener("pointerdown", e => {
  panMoved = false;
  if (mobile() || e.button === 2) return;
  const bg = !e.target.closest(".frame,.section,.sticky,#toolbar,#thread,#actions,#help,#minichip,.pin");
  if (!(bg || st.tool === "hand" || space || e.button === 1)) return;
  pan = {x:e.clientX, y:e.clientY, cx:cam().x, cy:cam().y, id:e.pointerId};
});
addEventListener("pointermove", e => {
  if (rs){ const w = clamp(rs.side === "l" ? e.clientX : innerWidth - e.clientX, 200, 420); st[rs.side === "l" ? "lw" : "rw"] = Math.round(w); $("#app").style.setProperty(rs.side === "l" ? "--lw" : "--rw", w + "px"); return; }
  if (!pan) return;
  const dx = e.clientX - pan.x, dy = e.clientY - pan.y;
  if (!panMoved && Math.hypot(dx, dy) < 4) return;
  if (!panMoved){ panMoved = true; cv().classList.add("panning"); }
  const c = cam(); c.x = pan.cx + dx; c.y = pan.cy + dy; applyCam(); placeThread();
});
addEventListener("pointerup", () => { if (rs){ rs = null; $$(".resizer.on").forEach(x => x.classList.remove("on")); save(); placeThread(); return; } if (pan){ pan = null; cv().classList.remove("panning"); setTimeout(() => panMoved = false, 0); } });
let rs = null;
document.addEventListener("pointerdown", e => { const r = e.target.closest(".resizer"); if (r){ e.preventDefault(); rs = {side:r.dataset.rs}; r.classList.add("on"); } });
// infobulles sombres avec raccourci
let tipT = 0;
document.addEventListener("mouseover", e => {
  const el = e.target.closest("[data-tip]"), T = $("#tip"); clearTimeout(tipT);
  if (!el){ T.style.display = "none"; return; }
  tipT = setTimeout(() => { T.innerHTML = esc(el.dataset.tip) + (el.dataset.key ? `<span class="k">${esc(el.dataset.key)}</span>` : ""); T.style.display = "block";
    const r = el.getBoundingClientRect(), w = T.offsetWidth, below = r.top < 60 || !el.closest("#toolbar");
    T.style.left = clamp(r.left + r.width / 2 - w / 2, 6, innerWidth - w - 6) + "px"; T.style.top = (below ? r.bottom + 6 : r.top - T.offsetHeight - 8) + "px"; }, 450);
});
document.addEventListener("pointerdown", () => { clearTimeout(tipT); $("#tip").style.display = "none"; });
let resizeT = 0;
addEventListener("resize", () => { clearTimeout(resizeT); resizeT = setTimeout(() => { applyCam(); placePins(); markSel(); placeThread(); }, 120); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { placePins(); markSel(); placeThread(); });

render();
focusPage();
if (!store.get("vu", false)){ toast("Maquette inspirée de Figma. <b>Ctrl K</b> : Actions · <b>?</b> en bas à droite : Lisez-moi.", `<button data-cmd="help">Lisez-moi</button>`); store.set("vu", true); }
