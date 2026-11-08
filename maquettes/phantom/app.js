/* Boussole · inspiration Phantom (portefeuille mobile et extension) — rendu et gestes.
   S'appuie sur le noyau commun (données réelles, groupes fictifs). */
"use strict";
const P = d => `<svg class="i" viewBox="0 0 24 24">${d}</svg>`;
const I = {   // icônes au trait 2 px, bouts arrondis (style Lucide)
  home: P('<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'),
  pen: P('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'),
  swap: P('<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>'),
  users: P('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
  book: P('<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>'),
  search: P('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>'),
  plus: P('<path d="M5 12h14M12 5v14"/>'),
  x: P('<path d="M18 6 6 18M6 6l12 12"/>'),
  chevR: P('<path d="m9 18 6-6-6-6"/>'), chevL: P('<path d="m15 18-6-6 6-6"/>'), chevD: P('<path d="m6 9 6 6 6-6"/>'),
  info: P('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>'),
  shield: P('<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4M12 16h.01"/>'),
  alert: P('<path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86z"/><path d="M12 8v4M12 16h.01"/>'),
  check: P('<path d="M20 6 9 17l-5-5"/>'), down: P('<path d="M12 5v14M19 12l-7 7-7-7"/>'), undo: P('<path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-4"/>'),
  minus: P('<path d="M5 12h14"/>'), slash: P('<circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>'), clock: P('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
  grid: P('<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>'),
  mic: P('<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/>'),
  file: P('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M16 13H8M16 17H8"/>'),
  hash: P('<path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/>'),
  trash: P('<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>'),
  insert: P('<path d="M11 12H3M16 6H3M16 18H3M18 9v6M21 12h-6"/>'),
  updown: P('<path d="m21 16-4 4-4-4M17 20V4M3 8l4-4 4 4M7 4v16"/>'),
  history: P('<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5M12 7v5l4 2"/>'),
  layers: P('<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>'),
  ok: P('<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>'),
  compass: P('<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/>'),
  copy: P('<rect x="8" y="8" width="14" height="14" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>'),
  scale: P('<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1zM2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>'),
};
const sm = (svg, c) => svg.replace('class="i"', `class="i ${c || "s"}"`);
const SPACES = [{id:"dossier", label:"Dossier"}, {id:"atelier", label:"Atelier"}, {id:"enjeux", label:"Enjeux"}, {id:"reunion", label:"Réunion"}];
const NARROW = () => innerWidth <= 900;

/* ---------- état ---------- */
const st = Object.assign({esp:"atelier", o:12, draft:null, th:"dpe", place:1, filt:"tous", sel:[], burst:false, unfold:false}, store.get("ui", {}));
st.editing = false; st.paneOpen = false;
if (!MINE.find(m => m.id === st.draft)) st.draft = MINE[0].id;
if (!Array.isArray(st.sel)) st.sel = [];
st.sel = st.sel.filter(id => (id[0] === "M" && MINE.find(m => m.id === id)) || AM[id]);
const save = () => store.set("ui", {esp:st.esp, o:st.o, draft:st.draft, th:st.th, place:st.place, filt:st.filt, sel:st.sel, unfold:st.unfold});
const draft = () => MINE.find(m => m.id === st.draft) || MINE[0];
const draftOn = o => MINE.find(m => m.al === o);
const STACK = {dossier:[], atelier:[], enjeux:[], reunion:[]};
const rootOf = esp => esp === "atelier" ? {k:"draft", arg:st.draft} : esp === "dossier" ? {k:"hist", arg:st.o} : esp === "enjeux" ? {k:"theme", arg:st.th} : {k:"place", arg:st.place};
const cur = () => { const S = STACK[st.esp]; if (!S.length) S.push(rootOf(st.esp)); return S[S.length - 1]; };

/* ---------- utilitaires d'affichage ---------- */
const STOP = new Set(["et","de","des","du","la","le","les","l","pour","au","aux","d"]);
const slug = name => "@" + String(name).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/['’]/g, " ").split(/[^a-z0-9]+/).filter(w => w && !STOP.has(w)).join("-");
const initials = name => String(name).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/['’]/g, " ").split(/\s+/).filter(w => w && !STOP.has(w.toLowerCase())).slice(0, 2).map(w => w[0].toUpperCase()).join("");
const SK = {adopte:{ic:I.check, c:"var(--up)", w:"Adopté"}, rejete:{ic:I.x, c:"var(--down)", w:"Rejeté"}, tombe:{ic:I.down, c:"#8D8D8D", w:"Tombé"}, retire:{ic:I.undo, c:"#E8C35A", w:"Retiré"}, ns:{ic:I.minus, c:"#8D8D8D", w:"Non soutenu"}, ecarte:{ic:I.slash, c:"#5f5d64", w:"Écarté"}, attente:{ic:I.clock, c:"var(--purple)", w:"Non examiné"}};
const sk = a => SK[NX.sortKey(a)];
const sortVerb = a => { const k = NX.sortKey(a); return k === "ecarte" ? cap(sortWord(a)) : SK[k].w; };
const ink = c => { const m = /^#?([0-9a-f]{6})$/i.exec(c || ""); if (!m) return "#111"; const n = parseInt(m[1], 16), L = (.299 * (n >> 16) + .587 * (n >> 8 & 255) + .114 * (n & 255)) / 255; return L < .45 ? "#FFFDF8" : "#111"; };
const tok = (name, color, badge, cls) => `<span class="tok ${cls || ""}" style="${color ? `background:${color};color:${ink(color)}` : ""}">${esc(initials(name))}${badge ? `<span class="bd" style="background:${badge.c}">${badge.ic}</span>` : ""}</span>`;
const amTok = (a, cls) => { const w = who(a), s = sk(a); return tok(w.name, w.color, {ic: s.ic, c: s.c}, cls); };
const handle = a => slug(who(a).name);
const words = s => (String(s || "").match(/[\p{L}\p{N}]+/gu) || []).length;
function delta(ref, txt){
  if (txt == null) return {add: 0, del: words(ref)};
  let add = 0, del = 0; for (const op of diffOps(ref, txt)){ if (op.type === "ins") add += words(op.text); if (op.type === "del") del += words(op.text); }
  return {add, del};
}
const draftDelta = m => m.mode === "supprimer" ? delta(refAl(m.al), null) : m.mode === "inserer" ? {add: words(m.texte), del: 0} : delta(refAl(m.al), m.texte);
const modeWord = m => m.mode === "supprimer" ? "supprimer" : m.mode === "inserer" ? "insérer après" : "rédiger";
const nConc = o => concurrents(o).units.length;
const sectionH = (t, more, chev) => `<div class="sec-h">${t}${chev ? `<span class="chev">${sm(I.chevR)}</span>` : ""}${more || ""}</div>`;
const tagSort = a => { const s = sk(a); return `<span class="tag" style="color:${s.c}">${sm(s.ic, "xs")} ${esc(sortWord(a))}</span>`; };
const selLabel = id => id[0] === "M" ? draftNum(MINE.find(m => m.id === id)) : AM[id].num;
// les passages disputés que mon brouillon modifie (ma rédaction n'est pas dans la grappe de la référence)
function myDisputed(m){
  if (m.mode === "inserer") return [];
  return unitsOf(m.al).map(u => { const C = clusters(u); const mine = C.list.find(c => c.items.some(x => x.id === m.id)); return {u, C, mine}; })
    .filter(x => x.mine && !x.mine.items.some(i => i.id === "ref"));
}

/* ---------- squelette ---------- */
function renderChrome(){
  $("#acct").innerHTML = `<span class="av" style="background:${GR[ME].color}">${initials(GR[ME].name)}</span><div class="who"><div class="h">${slug(GR[ME].name)}</div><div class="n">${esc(GR[ME].name)}</div></div>
    <button class="ibtn" data-cmd="search" title="Rechercher (/)" aria-label="Rechercher">${I.search}</button><button class="ibtn" data-cmd="lisez" title="À propos de cette maquette" aria-label="À propos">${I.info}</button>`;
  $("#pills").innerHTML = SPACES.map(s => `<button class="pill${st.esp === s.id ? " on" : ""}" role="tab" aria-selected="${st.esp === s.id}" data-esp="${s.id}">${s.label}</button>`).join("");
  $("#srch").innerHTML = `${sm(I.search)}<span>Rechercher</span>`;
  $("#fab").innerHTML = I.plus;
}
function render(dir){
  renderChrome();
  const h = $("#home"); const y = h.dataset.esp === st.esp ? h.scrollTop : 0;
  h.innerHTML = HOME[st.esp](); h.dataset.esp = st.esp; h.scrollTop = y;
  if (dir){ h.classList.remove("slide-l", "slide-r"); void h.offsetWidth; h.classList.add(dir > 0 ? "slide-l" : "slide-r"); }
  renderPane(); save();
}
function renderPane(){
  const t = cur(), R = VIEW[t.k](t.arg), S = STACK[st.esp];
  const left = S.length > 1 ? `<button class="ibtn" data-cmd="back" aria-label="Retour">${I.chevL}</button>` : NARROW() ? `<button class="ibtn" data-cmd="close" aria-label="Fermer">${I.x}</button>` : `<span class="sp"></span>`;
  $("#phead").innerHTML = `${left}<div class="ttl"><b>${R.title}</b>${R.sub ? `<span>${R.sub}</span>` : ""}</div>${R.right || `<span class="sp"></span>`}`;
  const b = $("#pbody"); b.innerHTML = `<div class="wrapc">${R.html}</div>`;
  if (!t.keep) b.scrollTop = 0; t.keep = true;
  $("#pane").classList.toggle("open", st.paneOpen);
  if (R.after) R.after();
}

/* ---------- accueils (colonne de l'app) ---------- */
const HOME = {};
HOME.atelier = () => {
  const o = st.o, C = concurrents(o), m = draftOn(o), U = unitsOf(o);
  const d = m ? draftDelta(m) : null;
  const hero = `<div class="hero"><div class="lbl">Alinéa ${o} · ${MINE.filter(x => x.al === o).length ? "mon brouillon" : "pas de brouillon"}</div>
    <div class="big">${C.units.length}<small>${plural(C.units.length, "concurrent")}</small></div>
    <div class="deltas">${d ? `<span class="up">+${d.add} ${plural(d.add, "mot")}</span><span class="down">−${d.del}</span>` : `<span class="mute">sur cet alinéa</span>`}<span class="pct ${U.length ? "pur" : "n"}" title="passages que plusieurs propositions modifient">${U.length} ${plural(U.length, "passage disputé", "passages disputés")}</span>
    <button class="refpill" data-cmd="ref">${sm(I.book, "xs")} face à : ${esc(refShort())} ${sm(I.chevD, "xs")}</button></div></div>`;
  const acts = `<div class="acts"><button class="act" data-cmd="rediger">${I.pen}Rédiger</button><button class="act" data-cmd="cmp">${I.swap}Comparer</button><button class="act" data-cmd="conc">${I.users}Concurrents</button><button class="act" data-cmd="ref">${I.book}Référence</button></div>`;
  const coffre = st.sel.length ? `<div class="coffre" style="margin:-6px 0 12px"><span class="mute" style="font-size:13px">À comparer :</span>${st.sel.map(id => `<span class="tag pur">${esc(selLabel(id))}<button data-unsel="${id}" aria-label="Retirer">${sm(I.x, "xs")}</button></span>`).join("")}${st.sel.length === 2 ? `<button class="tag" data-cmd="cmp" style="background:var(--purple-fab);color:#1C1C1C">Comparer ›</button>` : ""}</div>` : "";
  const drafts = MINE.map(x => { const dd = draftDelta(x), n = nConc(x.al); return `<button class="row${x.id === st.draft ? " on" : ""}" data-draft="${x.id}"><span class="tok pur">§${x.al}${x.confirme ? `<span class="bd" style="background:var(--up)">${I.check}</span>` : ""}</span><span class="tx"><div class="t">${esc(draftNum(x))} · ${modeWord(x)}</div><div class="s">Alinéa ${x.al} · <span class="up">+${dd.add}</span> <span class="down">−${dd.del}</span> ${plural(dd.add + dd.del, "mot")}${x.confirme ? " · confirmé" : ""}</div></span><span class="r"><div class="a">${n}</div><div class="b">${plural(n, "concurrent")}</div></span></button>`; }).join("");
  const als = `<div class="chips hide-sb">${NX.alsDisputes().map(x => `<button class="chip${x.o === o ? " on" : ""}" data-al="${x.o}">Al. ${x.o} <span class="c">${x.n}</span></button>`).join("")}</div>`;
  const units = U.length ? `<div class="card">${U.map(u => `<button class="row" data-unit="${u.k}"><span class="tok pur" style="font-size:13px">${u.n}</span><span class="tx"><div class="t">« ${esc(u.label)} »</div><div class="s">${u.n} propositions sur ce passage</div></span><span class="w-dots">${[1, 2, 3].map(w => `<i class="${unitWeight(u.n) >= w ? "on" : ""}"></i>`).join("")}</span></button>`).join("")}</div>` : `<div class="empty">Aucun passage disputé sur cet alinéa.</div>`;
  const F = [["tous", "Tous", () => true], ["adopte", "Adoptés", a => NX.sortKey(a) === "adopte"], ["rejete", "Rejetés", a => NX.sortKey(a) === "rejete"], ["tombe", "Tombés", a => NX.sortKey(a) === "tombe"], ["autre", "Autres", a => !["adopte", "rejete", "tombe"].includes(NX.sortKey(a))]];
  const all = [...C.units, ...C.ecartes];
  const fl = F.find(f => f[0] === st.filt) || F[0];
  const shown = all.filter(u => fl[2](u.lead));
  const chips = `<div class="chips hide-sb">${F.map(f => `<button class="chip${f[0] === fl[0] ? " on" : ""}" data-filt="${f[0]}">${f[1]} <span class="c">${all.filter(u => f[2](u.lead)).length}</span></button>`).join("")}</div>`;
  const conc = shown.length ? `<div class="rows">${shown.map(u => { const a = u.lead; return `<button class="row" data-am="${a.id}">${amTok(a)}<span class="tx"><div class="t">${a.num}${u.members.length > 1 ? ` <span class="tag">${u.kind === "ident" ? "identiques" : "série"} ×${u.members.length}</span>` : ""}</div><div class="s"><span class="handle-name">${esc(handle(a))}</span> · ${esc(objetOf(a) || modeLead(a, o))}</div></span><span class="r"><div class="a" style="color:${sk(a).c}">${esc(sortVerb(a))}</div><div class="b">avis ${avisSym(a.avis)}</div></span></button>`; }).join("")}</div>` : `<div class="empty">Aucun concurrent dans ce filtre.</div>`;
  const plus = `<div class="card"><button class="row" data-cmd="article"><span class="tok ghost">${sm(I.layers)}</span><span class="tx"><div class="t">Article 4 · ma version</div><div class="s">tous mes brouillons appliqués</div></span>${sm(I.chevR)}</button><button class="row" data-cmd="code"><span class="tok ghost">${sm(I.scale)}</span><span class="tx"><div class="t">Code général des impôts</div><div class="s">art. 31, avant / après la commission</div></span>${sm(I.chevR)}</button></div>`;
  return hero + acts + coffre + sectionH("Mes brouillons", `<button class="more" data-cmd="new">+ Nouveau</button>`) + `<div class="rows">${drafts}</div>`
    + sectionH("Alinéas visés") + als + sectionH(`Passages disputés · al. ${o}`) + units
    + `<div id="conc"></div>` + sectionH(`Concurrents · al. ${o}`) + chips + conc + sectionH("Plus") + plus;
};
HOME.dossier = () => {
  const tot = NX.plan.reduce((s, p) => s + p.n, 0), G = NX.grid();
  const hero = `<div class="hero"><div class="lbl">Projet de loi logement · en commission</div><div class="big">${tot}<small>amendements</small></div><div class="deltas"><span class="pct n">${NX.plan.length} articles</span><span class="mute">dont ${NX.plan.find(p => p.num === "4").n} sur l'article 4</span></div></div>`;
  const cards = `<div class="gcards">${NX.plan.map(p => `<button class="gc${p.num === "4" ? " hot" : ""}${p.n ? "" : " zero"}" data-art="${esc(p.num)}"><span><span class="num">${esc(p.num)}</span><div class="it">${esc(short(p.intitule || p.cible || "", 90))}</div></span><span class="lab">Art. ${esc(p.num)} <span>${p.n}</span></span></button>`).join("")}</div>`;
  const leg = `<div class="leg"><span><span class="steps"><i class="origine"></i></span>première rédaction</span><span><span class="steps"><i class="mod"></i></span>modifié</span><span><span class="steps"><i class="same"></i></span>inchangé</span></div>`;
  const et = `<div class="chips hide-sb">${ETAPES.map((id, i) => `<button class="chip" data-etape="${id}">${i + 1}. ${esc(ETL[id])}</button>`).join("")}</div>`;
  const rows = `<div class="card">${G.map(r => `<button class="row${r.o === st.o ? " on" : ""}" ${r.o ? `data-hist="${r.o}"` : "disabled"}><span class="tok ghost" style="font-size:14px">${r.o ?? "+"}</span><span class="tx"><div class="t" style="font-size:15px;font-weight:500">${r.o ? esc(NX.alShort(r.o, 60)) : "<i>introduit en cours de navette</i>"}</div><div class="s"><span class="steps" title="${ETAPES.map(id => ETL[id]).join(" → ")}">${r.cells.map(c => `<i class="${c}"></i>`).join("")}</span></div></span><span class="r"><div class="a">${r.n || ""}</div><div class="b">${r.n ? plural(r.n, "amendement") : ""}</div></span></button>`).join("")}</div>`;
  return hero + sectionH("Articles") + cards + sectionH("Article 4 · alinéas d'étape en étape") + `<div class="mute" style="font-size:13px;margin:-4px 0 6px">Sénat · dépôt → Sénat · commission → texte transmis → commission (AN)</div>` + leg + et + rows;
};
HOME.enjeux = () => {
  const dec = THEMES.filter(t => t.src === "déclaré").length;
  const hero = `<div class="hero"><div class="lbl">Enjeux de l'article 4</div><div class="big">${THEMES.length}<small>thèmes</small></div><div class="deltas"><span class="pct n">${dec} déclarés par le rapport</span><span class="pct n">${THEMES.length - dec} calculés</span></div></div>`;
  const chips = `<div class="chips hide-sb"><button class="chip on">${sm(I.hash)} Thèmes</button><button class="chip" data-cmd="matrice">${sm(I.grid)} Matrice</button><button class="chip" data-al="${st.o}" data-go="atelier">${sm(I.pen)} Mon atelier</button></div>`;
  const sorted = [...THEMES].sort((a, b) => b.amendements.length - a.amendements.length);
  const rows = `<div class="card">${sorted.map((t, i) => { const als = themeAls(t), mine = MINE.filter(m => als.includes(m.al)).length; return `<button class="row${t.id === st.th ? " on" : ""}" data-th="${t.id}"><span class="tok pur">${sm(I.hash)}${i < 3 ? `<span class="rk" style="background:${["#E8C35A", "#C9CBD1", "#D98D5A"][i]}">${i + 1}</span>` : ""}</span><span class="tx"><div class="t">${esc(t.label)}</div><div class="s">${t.src === "déclaré" ? "déclaré" : "calculé"} · ${als.length ? "al. " + als.slice(0, 5).join(", ") + (als.length > 5 ? "…" : "") : "article entier"}${mine ? ` · <span class="handle-name">${mine} ${plural(mine, "brouillon")}</span>` : ""}</div></span><span class="r"><div class="a">${t.amendements.length}</div></span></button>`; }).join("")}</div>`;
  const mx = `<div class="card"><button class="row" data-cmd="matrice"><span class="tok ghost">${sm(I.grid)}</span><span class="tx"><div class="t">Thèmes × groupes</div><div class="s">nombre d'amendements par case</div></span>${sm(I.chevR)}</button></div>`;
  return hero + chips + sectionH("Les plus amendés", `<span class="more" style="font-size:13px">nombre d'amendements</span>`) + rows + sectionH("Matrice") + mx;
};
HOME.reunion = () => {
  const E = NX.episodes, tot = E.reduce((s, e) => s + e.mots, 0), adPl = E.filter(e => e.ams.some(id => AM[id] && AM[id].sort === "Adopté")).length;
  const nAd = ALL.filter(a => a.sort === "Adopté").length;
  const hero = `<div class="hero"><div class="lbl">Commission · réunion du 21 septembre 2026</div><div class="big">${tot.toLocaleString("fr-FR")}<small>mots</small></div><div class="deltas"><span class="up">${nAd} ${plural(nAd, "adopté")}</span><span class="mute">dans ${adPl} places sur ${E.length}</span></div></div>`;
  const strip = `<div class="strip" role="list">${E.map(e => `<button role="listitem" class="${e.ams.some(id => AM[id] && AM[id].sort === "Adopté") ? "ad" : ""}${e.place === st.place ? " on" : ""}" style="flex:${e.mots}" data-place="${e.place}" title="Place ${e.place} · ${e.mots} mots"></button>`).join("")}</div><div class="strip-leg"><span>place 1</span><span>largeur = mots prononcés · vert = amendement adopté</span><span>26</span></div>`;
  const act = E.map(e => {
    const ams = e.ams.map(id => AM[id]).filter(Boolean);
    return `<button class="day" style="display:flex;width:100%;align-items:center;gap:6px" data-place="${e.place}"><span>Place ${e.place}</span><span style="font-weight:400;color:var(--fg3)">· ${e.mots} mots</span><span style="margin-left:auto;color:var(--fg3);font-weight:500;font-size:13px">détail ›</span></button><div class="rows">${ams.map(a => `<button class="row" data-am="${a.id}" data-go="atelier">${amTok(a)}<span class="tx"><div class="t">${esc(sortVerb(a))}</div><div class="s">${a.num} · <span class="handle-name">${esc(handle(a))}</span></div></span><span class="r"><div class="a mute" style="font-size:14px;font-weight:500">${a.avis ? "avis " + esc(a.avis) : "sans avis"}</div><div class="b">${a.cible.al ? "al. " + a.cible.al : "article"}</div></span></button>`).join("")}</div>`;
  }).join("");
  return hero + sectionH("Vue d'ensemble") + strip + sectionH("Activité", `<span class="more" style="font-size:13px">dans l'ordre d'appel</span>`) + act;
};

/* ---------- le panneau : détails ---------- */
const VIEW = {};
const legal = (html, cls) => `<div class="legal ${cls || ""}">${html}</div>`;
function refCard(o, extra){ return `<div class="tcard refc"><div class="k">${sm(I.book, "xs")} <b>Référence</b><span class="tag">vierge</span></div><div class="lead">${esc(refLabel())}, alinéa ${o}</div>${legal(esc(refAl(o)) || "<i>absent à cette étape</i>", "ref")}${extra || ""}</div>`; }
VIEW.draft = id => {
  const m = MINE.find(x => x.id === id) || draft(); st.draft = m.id; st.o = m.al;
  const dd = draftDelta(m), U = unitsOf(m.al), n = nConc(m.al);
  let mineHTML;
  if (st.editing) mineHTML = `<div class="ed"><textarea id="ta" spellcheck="false" aria-label="Ma rédaction">${esc(m.texte)}</textarea><div class="live legal small" id="live">${liveHTML(refAl(m.al), m.texte)}</div></div>`;
  else mineHTML = legal(m.mode === "rediger" ? NX.unitsOnDiff(NX.draftDiff(m), m.al, m.texte) : NX.draftDiff(m) || "<i>(vide)</i>");
  const btns = st.editing
    ? `<div class="pillbtns"><button class="pb" data-cmd="annuler">Annuler<kbd>Échap</kbd></button><button class="pb pri" data-cmd="valider">Valider<kbd>Ctrl ↵</kbd></button></div>`
    : `<div class="pillbtns"><button class="pb" data-cmd="edit" ${m.mode === "supprimer" ? "disabled" : ""}>${sm(I.pen)} Modifier</button><button class="pb pri" data-cmd="confirm">${m.confirme ? "Confirmé ✓" : "Confirmer"}</button></div>`;
  return {title: esc(draftNum(m)), sub: `Alinéa ${m.al} · ${modeWord(m)} · face à : ${esc(refShort())}`, right: `<button class="ibtn" data-sel="${m.id}" title="Ajouter à comparer" aria-label="Ajouter à comparer">${I.swap}</button>`,
    html: `<div class="hero" style="padding-top:0"><div class="deltas"><span class="up">+${dd.add} ${plural(dd.add, "mot ajouté", "mots ajoutés")}</span><span class="down">−${dd.del} ${plural(dd.del, "supprimé")}</span>${m.confirme ? `<span class="pct">confirmé</span>` : `<span class="pct n">brouillon</span>`}<span class="pct n">${esc(m.vis || "privé")}</span></div></div>
      ${refCard(m.al)}
      <div class="tcard"><div class="k">${sm(I.pen, "xs")} <b>Ma rédaction</b><span class="tag pur">corrections apparentes</span></div><div class="lead">${esc(draftLead(m))}</div>${mineHTML}
      ${st.editing ? "" : `<div class="mute" style="font-size:13px;margin-top:10px">${m.mode === "supprimer" ? "Amendement de suppression : l'alinéa entier est barré." : "Double-clic pour modifier · pointillés violets = passage disputé (cliquer) · cliquer une correction = la loupe"}</div>`}</div>
      ${btns}
      ${sectionH("Passages disputés")}${U.length ? `<div class="card">${U.map(u => `<button class="row" data-unit="${u.k}"><span class="tok pur" style="font-size:13px">${u.n}</span><span class="tx"><div class="t">« ${esc(u.label)} »</div><div class="s">${u.n} propositions · voir les rédactions regroupées</div></span>${sm(I.chevR)}</button>`).join("")}</div>` : `<div class="empty">Aucun passage disputé.</div>`}
      <div class="kv"><div><span class="k">${sm(I.users, "xs")} Concurrents sur l'alinéa</span><span class="v"><a data-cmd="conc">${n} ›</a></span></div><div><span class="k">${sm(I.history, "xs")} D'étape en étape</span><span class="v"><a data-hist="${m.al}">Historique ›</a></span></div><div><span class="k">${sm(I.layers, "xs")} Article complet</span><span class="v"><a data-cmd="article">Ma version ›</a></span></div><div><span class="k">${sm(I.trash, "xs")} Brouillon</span><span class="v"><a data-cmd="del-draft" style="color:var(--gray)">Supprimer</a></span></div></div>`,
    after: () => { const ta = $("#ta"); if (ta){ ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); ta.addEventListener("input", () => { $("#live").innerHTML = liveHTML(refAl(m.al), ta.value); }); } }};
};
VIEW.al = o => {
  const C = concurrents(o);
  return {title: `Alinéa ${o}`, sub: `pas encore de brouillon · face à : ${esc(refShort())}`,
    html: `${refCard(o)}<div class="pillbtns"><button class="pb" data-hist="${o}">${sm(I.history)} Historique</button><button class="pb pri" data-amender="${o}">${sm(I.pen)} Amender cet alinéa</button></div>
      ${sectionH(`${C.units.length} ${plural(C.units.length, "concurrent")}`)}<div class="rows">${C.units.map(u => u.lead).map(a => `<button class="row" data-am="${a.id}">${amTok(a)}<span class="tx"><div class="t">${a.num} · <span class="handle-name">${esc(handle(a))}</span></div><div class="s">${esc(objetOf(a) || modeLead(a, o))}</div></span><span class="r"><div class="a" style="color:${sk(a).c}">${esc(sortVerb(a))}</div></span></button>`).join("")}</div>`};
};
VIEW.am = id => {
  const a = AM[id], w = who(a), o0 = a.cible.al || st.o, ep = NX.epOf(a);
  let touched = [...new Set([...a.applique.rows.map(r => r.o ?? r.at).filter(Boolean), ...a.spans.map(s => s.al)])].filter(x => x >= 1 && x <= NAL).sort((x, y) => x - y);
  if (!touched.length) touched = [o0];
  const o = touched.includes(st.o) ? st.o : touched[0];
  const diffs = touched.map(x => { const d = NX.amDiff(a, x); return d ? `${touched.length > 1 ? `<div class="mute" style="font-size:13px;margin:10px 0 2px">Alinéa ${x}</div>` : ""}${legal(d)}` : ""; }).join("") || legal(esc(a.dispositif || "—"), "small");
  const inSel = st.sel.includes(a.id);
  return {title: a.num, sub: `${esc(w.name)} · ${esc(sortWord(a))}`, right: `<button class="ibtn" data-sel="${a.id}" title="Ajouter à comparer" aria-label="Ajouter à comparer">${I.swap}</button>`,
    html: `<div style="display:flex;gap:14px;align-items:center;margin:4px 0 6px">${amTok(a)}<div><div style="font-size:28px;font-weight:700;letter-spacing:-.02em">${a.num}</div><div><span class="handle-name">${esc(handle(a))}</span> <span class="mute">· ${esc(w.name)}${a.auteur ? " · " + esc(a.auteur) : ""}</span></div></div></div>
      <div class="deltas hero" style="padding:4px 0 6px">${tagSort(a)}${a.avis ? `<span class="tag">avis ${esc(a.avis)}</span>` : ""}${a.ident ? `<span class="tag">identiques</span>` : ""}</div>
      ${refCard(o)}
      <div class="tcard"><div class="k">${sm(I.pen, "xs")} <b>Sa rédaction</b><span class="tag pur">corrections apparentes</span></div><div class="lead">${esc(modeLead(a, o))}</div>${diffs}</div>
      <div class="pillbtns"><button class="pb" data-sel="${a.id}">${inSel ? "Retirer de la comparaison" : "Ajouter à comparer"}</button>${ep ? `<button class="pb pri" data-place="${ep.place}">Voir en réunion</button>` : `<button class="pb" disabled>Pas appelé en réunion</button>`}</div>
      <div class="kv"><div><span class="k">Sort</span><span class="v" style="color:${sk(a).c}">${esc(sortWord(a))}</span></div><div><span class="k">Avis</span><span class="v">${esc(a.avis || "—")}</span></div><div><span class="k">Déposé le</span><span class="v">${NX.fmtDate(a.depot)}</span></div><div><span class="k">${sm(I.info, "xs")} Ce qu'il fait</span><span class="v" style="font-weight:500">${esc(modeLead(a, o))}</span></div>${ep ? `<div><span class="k">Place en réunion</span><span class="v"><a data-place="${ep.place}">place ${ep.place} ›</a></span></div>` : ""}</div>
      <div class="tcard"><div class="k"><b>Exposé sommaire</b></div><div style="line-height:1.6;color:#DEDCD5">${esc(a.expose || "—")}</div></div>`};
};
function sideOf(id, o){
  if (id[0] === "M"){ const m = MINE.find(z => z.id === id); return {label: draftNum(m), h: slug(GR[ME].name), color: GR[ME].color, name: GR[ME].name, html: m.al === o ? NX.draftDiff(m) : null, sub: `al. ${m.al} · ${modeWord(m)}`}; }
  const a = AM[id], w = who(a); return {label: a.num, h: handle(a), color: w.color, name: w.name, html: NX.amDiff(a, o), sub: sortWord(a), a};
}
VIEW.cmp = () => {
  const o = st.o, S = [0, 1].map(i => st.sel[i] ? sideOf(st.sel[i], o) : null);
  const slot = (s, i) => `<button class="slot" data-pick="${i}"><span class="lab">${i ? "Avec" : "Rédaction"}</span>${s ? `<span class="val">${tok(s.name, s.color, null, "")} ${esc(s.label)} <span class="handle-name" style="font-size:14px">${esc(s.h)}</span></span><span class="sub">${esc(s.sub)}</span>` : `<span class="val" style="color:var(--fg3)">Choisir une rédaction ${sm(I.chevD, "xs")}</span><span class="sub">mon brouillon ou un concurrent de l'alinéa ${o}</span>`}</button>`;
  const col = (s, i) => `<div class="tcard"><div class="k">${tok(s.name, s.color, null, "t28")}<b>${esc(s.label)}</b></div><div class="lead">${esc(s.h)}</div>${s.html ? legal(s.html, "small") : `<div class="mute">Ne touche pas l'alinéa ${o}.</div>`}</div>`;
  const ready = S[0] && S[1];
  const burst = ready && st.burst ? `<div class="cols">${col(S[0], 0)}<div class="tcard refcol"><div class="k">${sm(I.book, "xs")}<b>Référence</b><span class="tag">vierge</span></div><div class="lead">${esc(refShort())}</div>${legal(esc(refAl(o)), "small ref")}</div>${col(S[1], 1)}</div>` : "";
  return {title: "Comparer", sub: `Alinéa ${o} · face à : ${esc(refShort())}`,
    html: `<div class="swap">${slot(S[0], 0)}<button class="swapbtn" data-cmd="swap" aria-label="Inverser">${sm(I.updown)}</button>${slot(S[1], 1)}</div>
      <div class="pillbtns"><button class="pb" data-cmd="unsel-all">Vider</button><button class="pb pri" data-cmd="burst" ${ready ? "" : "disabled"}>Comparer</button></div>
      ${burst || `<div class="mute" style="text-align:center;font-size:14px">Trois colonnes : une rédaction | la référence au centre | l'autre. Les corrections apparentes sont portées sur chaque rédaction, jamais sur la référence.</div>`}`};
};
VIEW.article = () => {
  const L = verLines(myVer()), out = []; let run = [];
  const row = (n, html) => `<div style="display:flex;gap:12px;padding:8px 0;border-bottom:1px solid #1A1A1C"><span class="mute" style="width:26px;flex:none;text-align:right;font-weight:600;font-size:13px;padding-top:3px">${n}</span>${legal(html, "small")}</div>`;
  const flush = () => { if (run.length > 2 && !st.unfold) out.push(`<button class="chip" style="margin:8px 0" data-cmd="unfold">${sm(I.layers, "xs")} ${run.length} alinéas inchangés (${run[0].o}–${run[run.length - 1].o})</button>`); else run.forEach(l => out.push(row(l.o, esc(l.text)))); run = []; };
  for (const l of L){
    if (l.kind === "same"){ run.push(l); continue; }
    flush();
    out.push(l.kind === "del" ? row(l.o, `<del>${esc(refAl(l.o))}</del>`) : l.kind === "mod" ? row(l.o, inlineDiff(refAl(l.o), l.text)) : row("+", `<ins>${esc(l.text)}</ins>`));
  }
  flush();
  return {title: "Article 4 · ma version", sub: `mes brouillons appliqués · face à : ${esc(refShort())}`, right: `<button class="ibtn" data-cmd="fold" title="${st.unfold ? "Replier" : "Déplier"} les alinéas inchangés">${I.layers}</button>`, html: out.join("")};
};
VIEW.code = () => {
  const C = NX.code;
  return {title: "Code général des impôts", sub: esc(C.article), html: `<div class="mute" style="margin-bottom:8px">Ce que deviendrait chaque subdivision avec le texte de la commission (instructions appliquées mécaniquement).</div>` + C.lettres.map(l => {
    const av = (C.avant[l] || []).join("\n"), ap = (C.apresCommission[l] || []).join("\n"), same = sameText(av, ap);
    return `<div class="tcard"><div class="k"><b>${l})</b><span class="tag ${same ? "" : "pur"}">${same ? "inchangé" : "modifié par la commission"}</span></div>${legal(same ? esc(short(ap, 400)) : inlineDiff(av, ap), "small")}</div>`;
  }).join("")};
};
VIEW.hist = o => {
  st.o = o; const H = NX.hist(o), n = nConc(o);
  const steps = H.map((h, i) => `<div class="st"><span class="tok ${h.same || h.absent ? "ghost" : "pur"}">${i + 1}${!h.same && !h.absent && i ? `<span class="bd">${I.pen}</span>` : ""}</span><div class="body"><div class="head"><b>${esc(ET[h.id].label)}</b><span class="tag ${!h.same && !h.absent && i ? "pur" : ""}">${i === 0 ? "première rédaction" : h.absent ? "absent" : h.same ? "inchangé" : "modifié"}</span></div>${h.diff == null ? `<div class="mute">— absent à cette étape</div>` : `<div class="tcard" style="margin:4px 0 10px">${legal(h.same ? `<span style="color:var(--fg2)">${h.diff}</span>` : h.diff, "small")}</div>`}</div></div>`).join("");
  return {title: `Alinéa ${o}`, sub: "d'étape en étape · chaque étape face à la précédente",
    html: `<div class="tl">${steps}</div><div class="pillbtns"><button class="pb" data-al="${o}" data-go="atelier" data-conc="1">${n} ${plural(n, "concurrent")}</button><button class="pb pri" data-amender="${o}">${sm(I.pen)} Amender cet alinéa</button></div>`};
};
VIEW.art = num => {
  const p = NX.plan.find(x => x.num === num), rows = Object.entries(p.amendements).sort((a, b) => b[1] - a[1]);
  return {title: `Article ${esc(num)}`, sub: esc(p.statut || ""), html: `<div class="hero" style="padding-top:0"><div class="big">${p.n}<small>${plural(p.n, "amendement")}</small></div></div><div class="tcard"><div class="k"><b>Intitulé</b></div>${esc(p.intitule || "(sans intitulé)")}<div class="mute" style="font-size:13px;margin-top:8px">Vise : ${esc(short(p.cible || "—", 260))}</div></div>
    ${rows.length ? `<div class="kv">${rows.map(([k, v]) => `<div><span class="k">${esc(k)}</span><span class="v">${v}</span></div>`).join("")}</div>` : ""}
    ${num === "4" ? `<div class="pillbtns"><button class="pb pri" data-hist="${st.o}">Alinéas d'étape en étape</button></div>` : `<div class="mute" style="text-align:center;font-size:14px">Seul l'article 4 est chargé en détail dans cette maquette.</div>`}`};
};
VIEW.etape = id => ({title: esc(ET[id].label), sub: "numérotation propre à cette étape", html: ET[id].alineas.map((t, i) => `<div style="display:flex;gap:12px;padding:8px 0;border-bottom:1px solid #1A1A1C"><span class="mute" style="width:26px;flex:none;text-align:right;font-weight:600;font-size:13px;padding-top:3px">${i + 1}</span>${legal(esc(t), "small")}</div>`).join("")});
VIEW.theme = id => {
  const th = THEMES.find(t => t.id === id) || THEMES[0]; st.th = th.id;
  const ams = NX.themeAms(th), als = themeAls(th), eps = NX.themeParoles(th), mine = MINE.filter(m => als.includes(m.al));
  return {title: esc(th.label), sub: th.src === "déclaré" ? "thème déclaré par le rapport" : "thème calculé par mots-clés",
    html: `<div class="hero" style="padding-top:0"><div class="big">${ams.length}<small>${plural(ams.length, "amendement")}</small></div><div class="deltas"><span class="pct n">${th.src}</span>${als.length ? `<span class="mute">alinéas</span>${als.map(o => `<button class="tag pur" data-al="${o}" data-go="atelier">${o}</button>`).join("")}` : ""}</div></div>
      <div class="tcard"><div class="k">${sm(I.file, "xs")} <b>Ce que dit le rapport</b></div><div style="line-height:1.6;color:#DEDCD5">${esc(th.doc || "—")}</div></div>
      <div class="tcard"><div class="k">${sm(I.mic, "xs")} <b>Ce qui a été dit en réunion</b><span class="tag">${eps.length} ${plural(eps.length, "place")}</span></div>${eps.length ? eps.slice(0, 5).map(e => `<div style="margin:8px 0 12px"><a class="handle-name" style="cursor:pointer" data-place="${e.place}">Place ${e.place} ›</a> <span class="mute">${esc(short(e.titre, 90))}</span>${e.paroles.slice(0, 2).map(p => `<div style="margin-top:6px;color:#DEDCD5;font-size:15px;line-height:1.5"><b>${esc(NX.speaker(p))}</b> : « ${esc(short(p.txt, 170))} »</div>`).join("")}</div>`).join("") : `<div class="mute">Rien en réunion.</div>`}</div>
      <div class="tcard"><div class="k">${sm(I.pen, "xs")} <b>Ce que fait mon texte</b></div>${mine.length ? mine.map(m => `<div style="margin:6px 0 12px"><a class="handle-name" style="cursor:pointer" data-draft="${m.id}">${esc(draftNum(m))} · alinéa ${m.al} ›</a>${legal(NX.draftDiff(m), "small")}</div>`).join("") : `<div class="mute">Aucun de mes brouillons ne touche ce thème.</div>`}</div>
      ${sectionH("Ses amendements")}<div class="rows">${ams.map(a => `<button class="row" data-am="${a.id}" data-go="atelier">${amTok(a)}<span class="tx"><div class="t">${a.num} · <span class="handle-name">${esc(handle(a))}</span></div><div class="s">${esc(objetOf(a))}</div></span><span class="r"><div class="a" style="color:${sk(a).c}">${esc(sortVerb(a))}</div></span></button>`).join("")}</div>`};
};
VIEW.matrice = () => {
  const M = NX.matrix(), max = Math.max(1, ...M.rows.flatMap(r => r.cells.map(c => c.length)));
  return {title: "Thèmes × groupes", sub: "nombre d'amendements (une seule chose comptée)",
    html: `<div class="mx-wrap hide-sb"><table class="mx"><tr><th class="l">Thème</th>${M.gs.map(g => `<th title="${esc(GR[g].name)}"><span class="av sm" style="background:${GR[g].color};display:inline-grid">${initials(GR[g].name)}</span></th>`).join("")}<th>Inst.</th></tr>
      ${M.rows.map(r => `<tr><td class="l" data-th="${r.th.id}">${esc(short(r.th.label, 26))}</td>${r.cells.map(c => `<td class="${c.length ? "" : "z"}" style="--v:${Math.round(c.length / max * 70)}" data-th="${r.th.id}" title="${c.length} amendement(s)">${c.length || "·"}</td>`).join("")}<td style="--v:0" data-th="${r.th.id}">${r.inst.length || ""}</td></tr>`).join("")}</table></div>
      <div class="kv">${M.gs.map(g => `<div><span class="av sm" style="background:${GR[g].color};color:${ink(GR[g].color)}">${initials(GR[g].name)}</span><span style="min-width:0"><div style="font-weight:600">${esc(GR[g].name)}</div><div class="handle-name" style="font-size:13px">${slug(GR[g].name)}</div></span></div>`).join("")}</div>`};
};
VIEW.place = n => {
  const E = NX.episodes, e = E.find(x => x.place === n) || E[0]; st.place = e.place;
  const ams = e.ams.map(id => AM[id]).filter(Boolean);
  return {title: `Place ${e.place} sur ${E.length}`, sub: `${e.mots} mots · ${e.paroles.length} ${plural(e.paroles.length, "prise de parole", "prises de parole")}`,
    html: `<div style="font-size:20px;font-weight:700;letter-spacing:-.02em;line-height:1.3;margin:2px 0 6px">${esc(e.titre)}</div>
      ${sectionH("Liste de vote")}<div class="rows">${ams.map(a => `<button class="row" data-am="${a.id}" data-go="atelier">${amTok(a)}<span class="tx"><div class="t">${a.num} · <span class="handle-name">${esc(handle(a))}</span></div><div class="s wrap">${esc(objetOf(a) || modeLead(a, a.cible.al))}</div></span><span class="r"><div class="a" style="color:${sk(a).c}">${esc(sortVerb(a))}</div><div class="b">avis ${avisSym(a.avis)}</div></span></button>`).join("")}</div>
      ${sectionH("Prises de parole")}${e.paroles.map(p => `<div class="say">${p.groupe ? `<span class="av sm" style="background:${NX.groupColor(p.groupe)}">${initials(NX.groupName(p.groupe))}</span>` : `<span class="av sm" style="background:var(--purple-d);color:var(--purple-l)" title="institution">${p.role ? "R" : "·"}</span>`}<div class="tx"><div class="nm">${esc(NX.speaker(p))}<span>${p.groupe ? slug(NX.groupName(p.groupe)) + " · " : ""}${p.mots} mots</span></div><p>${esc(p.txt)}</p></div></div>`).join("")}
      ${sectionH("Décisions")}<div class="card" style="padding:4px 14px">${e.decisions.map(d => `<div class="dec">${sm(I.ok)}<span>${esc(d.txt)}</span></div>`).join("")}</div>
      <div class="pillbtns"><button class="pb" data-place="${Math.max(1, e.place - 1)}" ${e.place === 1 ? "disabled" : ""}>‹ Place ${Math.max(1, e.place - 1)}</button><button class="pb" data-place="${Math.min(E.length, e.place + 1)}" ${e.place === E.length ? "disabled" : ""}>Place ${Math.min(E.length, e.place + 1)} ›</button></div>`};
};
VIEW.lisez = () => ({title: "À propos", sub: "maquette inspirée de Phantom", html: `<div class="readme">
  <h2>Boussole, en portefeuille</h2><p>Maquette inspirée de l'application <b>Phantom</b> (portefeuille mobile et extension de navigateur, 2024–2026). Article 4 du projet de loi logement : données réelles, groupes politiques fictifs. Aucun logo ni nom de produit dans l'interface.</p>
  <h3>Ce qui est emprunté (forme et mécanismes)</h3><ul>
  <li><b>Palette officielle</b> (fiche couleurs du dossier de presse) : noir #1C1C1C, violet #AB9FF2, blanc #FFFDF8 ; fonds #111 (extension) et #000 (mobile), feuille du bas #0F0F0F, poignée #838383, hausse #21E56F / pastille #6BE863, baisse #EB3742, bannière tomate #E54D2E, focus orange #FF7243 ; mouvement .4s cubic-bezier(.22,1,.36,1).</li>
  <li><b>Squelette</b> : à 400 px, l'application ; à 1280 px, la colonne de l'extension (420 px) et un <b>panneau latéral</b> pour le détail (aide « side panel », 2026). Sur mobile, le détail monte en <b>feuille</b> arrondie avec poignée et ✕ à gauche.</li>
  <li><b>Onglets du haut en pilules</b> (Home / Trade / Predict / Explore → Dossier · Atelier · Enjeux · Réunion) ; touchez ou <b>glissez</b> horizontalement sur la colonne.</li>
  <li><b>Grand chiffre</b> en tête de chaque espace, qui compte une seule chose (concurrents, amendements, thèmes, mots), avec des deltas colorés (mots ajoutés / supprimés).</li>
  <li><b>Quatre boutons d'action carrés</b> (icône violette au trait, libellé gris) : Rédiger, Comparer, Concurrents, Référence. <b>Champ « Rechercher » en bas et bouton rond violet « + »</b> (nouveau brouillon : feuille « Deposit » transposée, options en lignes avec icône ronde violette).</li>
  <li><b>Lignes de jetons</b> (logo rond 48, nom semi-gras, secondaire gris, chiffres à droite) pour brouillons et concurrents ; badge rond en bas à droite de l'avatar pour le sort (✓ adopté, ✕ rejeté, ↓ tombé…).</li>
  <li><b>@noms</b> à la place des adresses : chaque groupe fictif a son @nom (ex. ${slug(GR.SOL.name)}).</li>
  <li><b>Activité en langage clair</b> (Réunion) : verbe en titre (« Rejeté », « Adopté »), contrepartie en sous-titre, groupé par place comme l'app groupe par jour.</li>
  <li><b>Collectibles</b> (Dossier) : les articles du projet de loi en grille de cartes avec pastille vitrée (nom + nombre). <b>Explore / Trending</b> (Enjeux) : classement avec médailles 1-2-3.</li>
  <li><b>Confirmation de transaction</b> : la feuille « Confirmer le brouillon ? » avec la carte <b>« Changements estimés »</b>, des lignes clé/valeur, et la <b>bannière tomate</b> quand le texte recoupe des passages disputés ; deux pilules Annuler / Confirmer. <b>Échanger</b> (swap) : comparer deux rédactions, avec le rond d'inversion entre les deux cartes.</li>
  <li>Police : la police maison (dérivée de F37 Zagma) n'est pas disponible ; remplacée par <b>Figtree</b> (Google Fonts), grotesque arrondie ; titres à −0,02 em.</li></ul>
  <h3>Règles du projet gardées</h3><ul><li>La référence reste vierge ; corrections apparentes portées seulement sur la rédaction comparée (la mienne comme celle d'un groupe) : ajout souligné vert sur fond léger et gras, suppression barrée rouge et laissée visible. Pas de score : chaque nombre compte une seule chose.</li>
  <li>Passages disputés : soulignés en pointillés violets (tirets à partir de 3 propositions, trait plein à partir de 6) ; un clic ouvre les rédactions regroupées. Un clic sur une correction ouvre la loupe (référence | rédaction, côte à côte).</li></ul>
  <h3>Écarts assumés</h3><ul><li>La direction artistique « papier sombre » du projet est suspendue : la forme suit Phantom. Les textes juridiques restent dans la police de l'interface, en 16–17 px, interligne 1,6.</li>
  <li>La bannière tomate est un signal d'attention neutre (recoupement de passages disputés), pas un jugement juridique. Rien n'est « approuvé » en ligne : confirmer marque seulement le brouillon.</li>
  <li>Clavier : <b>/</b> recherche, <b>1–4</b> espaces, <b>Échap</b> revient d'un cran, <b>Ctrl+Entrée</b> valide une édition.</li></ul>
  <h3>Sources regardées</h3><ul><li>Dossier de presse Phantom (novembre 2024 : écrans mobile Home, Activité, Explore, Collectibles ; extension ; fiche couleurs).</li><li>Centre d'aide Phantom 2026 : accueil et feuille Deposit, avertissement de l'extension, panneau latéral.</li><li>Blog « message simulation » (Changements estimés, message signalé) ; billet @username.</li></ul></div>`});

/* ---------- feuilles du bas ---------- */
let SHEET = null;
function sheet(title, body, foot, after){
  SHEET = {title};
  $("#shh").innerHTML = `<button class="x" data-cmd="sheet-close" aria-label="Fermer">${sm(I.x)}</button><b>${title}</b><span class="sp"></span>`;
  $("#shb").innerHTML = body; $("#shb").scrollTop = 0;
  $("#shf").innerHTML = foot || ""; $("#shf").style.display = foot ? "" : "none";
  $("#sheet").classList.add("on"); $("#scrim").classList.add("on");
  if (after) after(); else setTimeout(() => { const x = $("#shh .x"); if (x) x.focus({preventScroll: true}); }, 50);
}
function closeSheet(){ SHEET = null; $("#sheet").classList.remove("on"); $("#scrim").classList.toggle("on", false); }
function sheetRef(){
  sheet("Référence", `<div class="mute" style="font-size:14px;margin:0 4px 12px">La référence reste vierge ; les corrections apparentes sont portées sur les rédactions comparées.</div>` + ETAPES.map(id => `<button class="opt${id === REF ? " on" : ""}" data-setref="${id}"><span class="ic">${I.book}</span><span><div class="t">${esc(ET[id].label)}</div><div class="s">${esc(ETL[id])}${id === REF ? " · actuelle" : ""}</div></span></button>`).join(""));
}
function sheetNew(){
  const o = st.o;
  sheet("Nouveau", `<button class="opt" data-new="rediger"><span class="ic">${I.pen}</span><span><div class="t">Rédiger l'alinéa ${o}</div><div class="s">à partir de la référence, corrections apparentes</div></span></button>
    <button class="opt" data-new="supprimer"><span class="ic">${I.trash}</span><span><div class="t">Supprimer l'alinéa ${o}</div><div class="s">l'alinéa entier apparaîtra barré</div></span></button>
    <button class="opt" data-new="inserer"><span class="ic">${I.insert}</span><span><div class="t">Insérer après l'alinéa ${o}</div><div class="s">un nouvel alinéa, tout en ajout</div></span></button>
    <div class="mute" style="font-size:13px;margin:8px 4px">Autre alinéa : choisissez-le d'abord dans « Alinéas visés » ou dans le Dossier.</div>`);
}
function sheetUnit(k){
  const u = unitsOf(st.o).find(x => x.k === k); if (!u) return;
  const C = clusters(u), ref = refAl(st.o);
  const body = `<div class="mute" style="font-size:14px;margin:0 4px 10px">${C.list.length} rédactions distinctes · ${u.n} propositions sur ce passage de l'alinéa ${st.o}.</div>
    <div class="tcard refc" style="margin-top:0"><div class="k">${sm(I.book, "xs")}<b>Contexte</b> · ${esc(refShort())}</div>${legal(`<span class="mute">…${esc(ref.slice(Math.max(0, u.a - 70), u.a))}</span><b style="color:var(--purple-l)">${esc(ref.slice(u.a, u.b))}</b><span class="mute">${esc(ref.slice(u.b, u.b + 70))}…</span>`, "small")}</div>`
    + C.list.map(c => { const isRef = c.items.some(i => i.id === "ref"); return `<div class="tcard" ${isRef ? `style="box-shadow:inset 0 0 0 1px var(--card2);background:transparent"` : ""}><div class="k">${isRef ? `${sm(I.book, "xs")}<b>Comme la référence</b>` : `<b>${c.text == null ? "Supprime le passage" : "Rédaction"}</b>`}<span class="tag pur">${c.items.length - (isRef ? 1 : 0)} ${plural(c.items.length - (isRef ? 1 : 0), "porteur")}</span></div>${legal(isRef ? esc(C.ref) : c.text == null ? `<del>${esc(C.ref)}</del>` : inlineDiff(C.ref, c.text), "small")}
      <div class="coffre" style="margin-top:10px">${isRef ? `<span class="mute" style="font-size:13px">${c.items.length - 1} ${plural(c.items.length - 1, "proposition laisse", "propositions laissent")} ce passage tel quel${c.items.some(i => i.mine) ? " (dont la vôtre)" : ""}.</span>` : ""}${c.items.filter(i => i.id !== "ref" && !isRef).slice(0, 10).map(i => i.a ? `<button class="tag" data-am="${i.a.id}" data-go="atelier" style="height:28px"><span class="av sm" style="width:16px;height:16px;background:${i.color}"></span>${i.a.num} ${esc(slug(i.label))}</button>` : `<button class="tag pur" data-draft="${i.id}" style="height:28px">${esc(i.label)}</button>`).join("")}${!isRef && c.items.length > 10 ? `<span class="tag">+${c.items.length - 10}</span>` : ""}</div></div>`; }).join("");
  sheet(`« ${esc(u.label)} »`, body);
}
function sheetConfirm(){
  const m = draft(), d = draftDelta(m), n = nConc(m.al), dis = myDisputed(m), ref = refAl(m.al);
  const same = ALL.filter(a => !isEcarte(a) && (m.mode === "supprimer" ? NX.amText(a, m.al) === null : (() => { const t = NX.amText(a, m.al); return t != null && sameText(t, m.texte); })()));
  const co = new Map(); for (const x of dis) for (const it of x.mine.items) if (it.a && it.id !== m.id) co.set(it.a.id, it.a);
  const others = dis.reduce((s, x) => s + x.u.n - 1, 0);
  const body = `<div style="display:flex;flex-direction:column;align-items:center;text-align:center;margin:0 0 8px"><span class="tok pur" style="width:64px;height:64px;font-size:20px">§${m.al}</span><div style="font-size:22px;font-weight:700;letter-spacing:-.02em;margin-top:8px">Confirmer le brouillon ?</div><div class="mute">${esc(draftNum(m))} · ${esc(draftLead(m))}</div></div>
    ${dis.length ? `<div class="banner">${sm(I.alert)}<span>Votre texte modifie ${dis.length} ${plural(dis.length, "passage disputé", "passages disputés")} : ${others} autres propositions portent aussi sur ${dis.length > 1 ? "ces passages" : "ce passage"}. <a data-unit="${dis[0].u.k}">Voir les rédactions</a></span></div>` : ""}
    <div class="est"><h4>Changements estimés ${sm(I.info, "xs")}</h4>
      <div class="d"><span class="tok" style="background:rgba(33,229,111,.15);color:var(--up)">+</span><span>Mots ajoutés</span><span class="v up">+${d.add}</span></div>
      <div class="d"><span class="tok" style="background:rgba(235,55,66,.15);color:var(--down)">−</span><span>Mots supprimés</span><span class="v down">−${d.del}</span></div>
      <div class="tcard" style="background:var(--sheet);margin:8px 0 2px">${legal(NX.draftDiff(m), "small")}</div></div>
    <div class="kv"><div><span class="k">Alinéa</span><span class="v">${m.al} · ${modeWord(m)}</span></div>
      <div><span class="k">Référence ${sm(I.info, "xs")}</span><span class="v">${esc(refLabel())}</span></div>
      <div><span class="k">Concurrents sur l'alinéa</span><span class="v">${n}</span></div>
      <div><span class="k">Passages disputés touchés</span><span class="v">${dis.length}</span></div>
      <div><span class="k">Déjà proposé par</span><span class="v">${same.length ? same.slice(0, 3).map(a => `<a data-am="${a.id}" data-go="atelier">${a.num} ${esc(handle(a))}</a>`).join("<br>") : co.size ? [...co.values()].slice(0, 3).map(a => `<a data-am="${a.id}" data-go="atelier">${a.num} ${esc(handle(a))}</a>`).join("<br>") + `<div class="mute" style="font-size:12px;font-weight:400">même rédaction sur un passage</div>` : `<span class="mute">personne, à l'identique</span>`}</span></div></div>
    <div class="mute" style="text-align:center;font-size:13px;margin-top:8px">Confirmer marque le brouillon comme prêt ; rien n'est déposé.</div>`;
  sheet("Confirmation", body, `<div class="pillbtns" style="margin:0"><button class="pb" data-cmd="sheet-close">Annuler</button><button class="pb pri" data-cmd="do-confirm">Confirmer</button></div>`);
}
function sheetPick(i){
  const o = st.o, C = concurrents(o);
  const mine = MINE.filter(m => m.al === o).map(m => `<button class="opt" data-pickid="${m.id}" data-slot="${i}"><span class="tok pur" style="width:36px;height:36px;font-size:12px">§${m.al}</span><span><div class="t">${esc(draftNum(m))}</div><div class="s">${slug(GR[ME].name)} · ${modeWord(m)}</div></span></button>`).join("");
  const others = C.units.map(u => u.lead).map(a => `<button class="opt" data-pickid="${a.id}" data-slot="${i}">${amTok(a, "t36")}<span style="min-width:0"><div class="t">${a.num} · <span class="handle-name">${esc(handle(a))}</span></div><div class="s" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(objetOf(a))}</div></span></button>`).join("");
  sheet(i ? "Avec…" : "Rédaction…", `<div class="sec-h" style="margin-top:0;font-size:17px">Mes brouillons · al. ${o}</div>${mine || `<div class="empty">Aucun brouillon sur cet alinéa.</div>`}<div class="sec-h" style="font-size:17px">Concurrents</div>${others}`);
}
function sheetSearch(){
  sheet("Rechercher", `<input class="srch" id="q" placeholder="Alinéa, CE…, @groupe, thème, place" autocomplete="off" spellcheck="false"><div id="qres"></div>`, "", () => { const q = $("#q"); q.focus(); q.addEventListener("input", searchRender); searchRender(); });
}
function searchRender(){
  const q = ($("#q").value || "").trim().toLowerCase();
  const items = [
    ...Array.from({length: NAL}, (_, i) => ({t: `Alinéa ${i + 1}`, s: NX.alShort(i + 1, 70), ic: `<span class="tok ghost" style="width:36px;height:36px;font-size:12px">${i + 1}</span>`, a: `data-al="${i + 1}" data-go="atelier"`})),
    ...ALL.filter(a => a.mode !== "hors-texte").map(a => ({t: `${a.num} · ${handle(a)}`, s: `${sortWord(a)} · ${objetOf(a)}`, ic: amTok(a, "t36"), a: `data-am="${a.id}" data-go="atelier"`})),
    ...THEMES.map(t => ({t: `# ${t.label}`, s: `thème ${t.src} · ${t.amendements.length} amendements`, ic: `<span class="ic">${I.hash}</span>`, a: `data-th="${t.id}"`})),
    ...NX.episodes.map(e => ({t: `Place ${e.place}`, s: e.titre, ic: `<span class="ic">${I.mic}</span>`, a: `data-place="${e.place}"`})),
  ];
  const L = items.filter(x => !q || (x.t + " " + x.s).toLowerCase().includes(q)).slice(0, 40);
  $("#qres").innerHTML = L.map(x => `<button class="opt" ${x.a}>${x.ic}<span style="min-width:0"><div class="t">${esc(x.t)}</div><div class="s" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(x.s)}</div></span></button>`).join("") || `<div class="empty">Aucun résultat.</div>`;
}
// la loupe : la modification et le passage correspondant de la référence, côte à côte
function sheetLoupe(h){
  const H = HUNKS.get(h); if (!H) return;
  const refTxt = H.seg.filter(s => s.type === "del").map(s => s.text).join("");
  const mod = renderOps(H.seg);
  sheet("Loupe", `<div class="cols" style="grid-template-columns:1fr 1fr"><div class="tcard refc"><div class="k">${sm(I.book, "xs")}<b>Référence</b><span class="tag">vierge</span></div>${legal(`<span class="mute">${esc(H.before)}</span> ${refTxt ? `<b>${esc(refTxt)}</b>` : `<span class="mute">(rien)</span>`} <span class="mute">${esc(H.after)}</span>`, "small ref")}</div>
    <div class="tcard"><div class="k">${sm(I.pen, "xs")}<b>Rédaction</b></div>${legal(`<span class="mute">${esc(H.before)}</span> ${mod} <span class="mute">${esc(H.after)}</span>`, "small")}</div></div>`);
}

/* ---------- navigation ---------- */
let toastT = 0;
function toast(msg){ const t = $("#toast"); t.innerHTML = `${sm(I.ok)}<span>${msg}</span>`; t.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("on"), 2600); }
function go(esp, opts){
  const dir = SPACES.findIndex(s => s.id === esp) - SPACES.findIndex(s => s.id === st.esp);
  st.esp = esp; st.editing = false; if (!opts || !opts.keepPane) st.paneOpen = false; closeSheet();
  render(dir || 0);
}
window.allerA = esp => go(esp);
function setRoot(esp, k, arg){ if (st.esp !== esp){ st.esp = esp; } STACK[esp] = [{k, arg}]; st.paneOpen = true; st.editing = false; closeSheet(); render(); }
function push(esp, k, arg){ st.esp = esp; const S = STACK[esp]; if (!S.length) S.push(rootOf(esp)); const t = S[S.length - 1]; if (t.k === k && t.arg === arg){ st.paneOpen = true; closeSheet(); return render(); } S.push({k, arg}); st.paneOpen = true; st.editing = false; closeSheet(); render(); }
function back(){ const S = STACK[st.esp]; if (S.length > 1){ S.pop(); st.editing = false; return render(); } if (NARROW() && st.paneOpen){ st.paneOpen = false; return renderPane(); } }
function openDraft(id){ st.draft = id; const m = draft(); st.o = m.al; setRoot("atelier", "draft", id); }
function openAm(id){ const a = AM[id]; if (a.cible.al && !touchesAl(a, st.o)){ st.o = a.cible.al; const m = draftOn(st.o); if (m) st.draft = m.id; STACK.atelier = [m ? {k:"draft", arg:m.id} : {k:"al", arg:st.o}]; } push("atelier", "am", id); }
function setAl(o){ st.o = o; const m = draftOn(o); if (m) st.draft = m.id; STACK.atelier = [m ? {k:"draft", arg:m.id} : {k:"al", arg:o}]; st.burst = false; }
function toggleSel(id){
  const i = st.sel.indexOf(id);
  if (i >= 0) st.sel.splice(i, 1); else { if (st.sel.length >= 2) st.sel.shift(); st.sel.push(id); }
  st.burst = false; toast(i >= 0 ? `${esc(selLabel(id))} retiré de la comparaison` : `${esc(selLabel(id))} ajouté à comparer (${st.sel.length}/2)`); render();
}
function cmd(c){
  switch (c){
    case "search": return sheetSearch();
    case "lisez": return push(st.esp, "lisez");
    case "ref": return sheetRef();
    case "new": return sheetNew();
    case "back": return back();
    case "close": st.paneOpen = false; st.editing = false; return renderPane();
    case "sheet-close": return closeSheet();
    case "rediger": { let m = draftOn(st.o); if (!m) m = newDraft(st.o); st.draft = m.id; STACK.atelier = [{k:"draft", arg:m.id}]; st.esp = "atelier"; st.paneOpen = true; st.editing = m.mode !== "supprimer"; return render(); }
    case "edit": st.editing = true; return renderPane();
    case "annuler": st.editing = false; return renderPane();
    case "valider": { const m = draft(), ta = $("#ta"); if (!ta) return; m.texte = ta.value; m.confirme = false; saveDrafts(); UNIT_CACHE.clear(); st.editing = false; toast(`${esc(draftNum(m))} enregistré`); return render(); }
    case "confirm": return sheetConfirm();
    case "do-confirm": { const m = draft(); m.confirme = true; saveDrafts(); closeSheet(); toast(`${esc(draftNum(m))} confirmé`); return render(); }
    case "del-draft": { if (MINE.length <= 1) return toast("Gardez au moins un brouillon"); const m = draft(); MINE.splice(MINE.indexOf(m), 1); saveDrafts(); UNIT_CACHE.clear(); st.sel = st.sel.filter(x => x !== m.id); st.draft = MINE[0].id; STACK.atelier = [{k:"draft", arg:st.draft}]; toast("Brouillon supprimé"); return render(); }
    case "cmp": st.esp = "atelier"; if (st.sel.length === 2) st.burst = true; return push("atelier", "cmp");
    case "burst": st.burst = true; cur().keep = true; return renderPane();
    case "swap": st.sel.reverse(); cur().keep = true; return render();
    case "unsel-all": st.sel = []; st.burst = false; return render();
    case "conc": { st.esp = "atelier"; st.paneOpen = false; closeSheet(); render(); const el = $("#conc"); if (el) $("#home").scrollTo({top: el.offsetTop - 10, behavior: "smooth"}); return; }
    case "article": return push("atelier", "article");
    case "code": return push("atelier", "code");
    case "matrice": return push("enjeux", "matrice");
    case "fold": st.unfold = !st.unfold; cur().keep = true; return renderPane();
    case "unfold": st.unfold = true; cur().keep = true; return renderPane();
  }
}

/* ---------- gestes ---------- */
let clickT = 0;
document.addEventListener("click", e => {
  if (e.target.closest("#scrim")) return closeSheet();
  const t = e.target.closest("[data-esp],[data-cmd],[data-draft],[data-al],[data-hist],[data-art],[data-etape],[data-unit],[data-am],[data-th],[data-place],[data-go],[data-amender],[data-filt],[data-sel],[data-unsel],[data-pick],[data-pickid],[data-setref],[data-new],[data-h],mark.pt");
  if (!t) return;
  const d = t.dataset;
  const hk = e.target.closest("#pbody [data-h]");
  if (hk && !st.editing){ e.preventDefault(); clearTimeout(clickT); clickT = setTimeout(() => sheetLoupe(+hk.dataset.h), 260); return; }
  if (t.matches("mark.pt")){ clearTimeout(clickT); const k = +d.u; clickT = setTimeout(() => sheetUnit(k), 260); return; }
  if (d.esp) return go(d.esp);
  if (d.cmd) return cmd(d.cmd);
  if (d.setref){ REF = d.setref; store.set("ref", REF); closeSheet(); toast(`Référence : ${esc(ET[REF].label)}`); return render(); }
  if (d.new){ const m = newDraft(st.o, d.new, d.new === "inserer" ? "" : undefined); UNIT_CACHE.clear(); st.draft = m.id; STACK.atelier = [{k:"draft", arg:m.id}]; st.esp = "atelier"; st.paneOpen = true; st.editing = d.new !== "supprimer"; closeSheet(); toast(`${esc(draftNum(m))} créé sur l'alinéa ${st.o}`); return render(); }
  if (d.pick != null) return sheetPick(+d.pick);
  if (d.pickid){ const i = +d.slot; st.sel[i] = d.pickid; if (i === 1 && !st.sel[0]) st.sel = [d.pickid]; st.sel = st.sel.filter(Boolean).slice(0, 2); st.burst = false; closeSheet(); cur().keep = true; return render(); }
  if (d.sel) return toggleSel(d.sel);
  if (d.unsel){ st.sel = st.sel.filter(x => x !== d.unsel); st.burst = false; return render(); }
  if (d.filt){ st.filt = d.filt; return render(); }
  if (d.unit != null){ closeSheet(); return setTimeout(() => sheetUnit(+d.unit), SHEET ? 0 : 0); }
  if (d.draft) return openDraft(d.draft);
  if (d.amender){ const o = +d.amender, m = draftOn(o) || newDraft(o); UNIT_CACHE.clear(); st.o = o; return openDraft(m.id); }
  if (d.am) return openAm(d.am);
  if (d.al){ setAl(+d.al); if (d.go){ st.esp = "atelier"; closeSheet(); st.paneOpen = !!draftOn(+d.al) && !d.conc; render(); if (d.conc) cmd("conc"); return; } return render(); }
  if (d.hist){ st.o = +d.hist; return setRoot("dossier", "hist", +d.hist); }
  if (d.art) return push("dossier", "art", d.art);
  if (d.etape) return push("dossier", "etape", d.etape);
  if (d.th){ st.th = d.th; return setRoot("enjeux", "theme", d.th); }
  if (d.place){ st.place = +d.place; return setRoot("reunion", "place", +d.place); }
  if (d.go) return go(d.go);
});
document.addEventListener("dblclick", e => {
  if (st.editing || !e.target.closest("#pbody .legal") || e.target.closest(".refc")) return;
  const t = cur(); if (st.esp !== "atelier" || t.k !== "draft" || draft().mode === "supprimer") return;
  clearTimeout(clickT); st.editing = true; renderPane();
});
document.addEventListener("keydown", e => {
  const k = e.key, ctrl = e.ctrlKey || e.metaKey;
  if (st.editing && e.target.id === "ta"){ if (k === "Escape"){ e.preventDefault(); return cmd("annuler"); } if (k === "Enter" && ctrl){ e.preventDefault(); return cmd("valider"); } return; }
  if (k === "Escape"){ if (SHEET) return closeSheet(); if (st.editing) return cmd("annuler"); return back(); }
  if (e.target.matches("input,textarea")) return;
  if (k === "/"){ e.preventDefault(); return sheetSearch(); }
  if (/^[1-4]$/.test(k) && !ctrl && !e.altKey) return go(SPACES[+k - 1].id);
});
$("#srch").onclick = () => sheetSearch();
$("#fab").onclick = () => sheetNew();
// glisser horizontalement sur la colonne = changer d'espace (« tap or swipe »)
const stepEsp = dir => { const i = SPACES.findIndex(s => s.id === st.esp), j = clamp(i + dir, 0, SPACES.length - 1); if (j !== i) go(SPACES[j].id); };
let sw = null;
$("#home").addEventListener("pointerdown", e => { if (e.pointerType === "mouse" && e.button !== 0) return; sw = {x: e.clientX, y: e.clientY}; });
addEventListener("pointerup", e => { if (!sw) return; const dx = e.clientX - sw.x, dy = e.clientY - sw.y; sw = null; if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.6){ stepEsp(dx < 0 ? 1 : -1); } });
let wx = 0, wT = 0, wLock = 0;
$("#home").addEventListener("wheel", e => {
  if (e.ctrlKey || Math.abs(e.deltaX) <= Math.abs(e.deltaY) || e.target.closest(".chips,.mx-wrap")) return;
  e.preventDefault(); if (Date.now() < wLock) return;
  wx += e.deltaX; clearTimeout(wT); wT = setTimeout(() => wx = 0, 200);
  if (Math.abs(wx) > 90){ stepEsp(wx > 0 ? 1 : -1); wx = 0; wLock = Date.now() + 600; }
}, {passive: false});
// glisser vers le bas sur la poignée de la feuille la ferme
let sd = null;
$("#sheet").addEventListener("pointerdown", e => { if (e.target.closest(".poign,.sh-h")) sd = e.clientY; });
addEventListener("pointerup", e => { if (sd != null && e.clientY - sd > 60) closeSheet(); sd = null; });
addEventListener("resize", () => renderPane());

render();
if (!store.get("vu", false)){ toast("Maquette inspirée de Phantom · ⓘ en haut pour le Lisez-moi"); store.set("vu", true); }
