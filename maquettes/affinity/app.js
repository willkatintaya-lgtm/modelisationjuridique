/* Boussole · inspiration Affinity (Persona, barre contextuelle, Studio à onglets, page sur pasteboard).
   S'appuie sur le noyau commun : données réelles, groupes fictifs. */
"use strict";
const S = p => `<svg viewBox="0 0 24 24">${p}</svg>`;
const IC = {
  // glyphes des Personas (dessinés pour la maquette, aucun logo repris)
  pDossier: S('<path d="M5 4h9l5 5v11H5z"/><path d="M14 4v5h5M8 13h8M8 16.5h6"/>'),
  pAtelier: S('<path d="M4 20l2.5-.6L19 7l-2-2L4.6 17.5z"/><path d="M15 7l2 2"/>'),
  pEnjeux: S('<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/>'),
  pReunion: S('<path d="M3 17h3V9H3zM8.5 17h3V5h-3zM14 17h3v-6h-3zM19.5 17H21"/><path d="M3 20h18"/>'),
  // outils
  pen: S('<path d="M4 20l3-1 11-11-2-2L5 17z"/><path d="M14 6l2 2"/>'),
  lens: S('<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5.5 5.5M8 10.5h5"/>'),
  spread: S('<rect x="2.5" y="5" width="6" height="14" rx=".5"/><rect x="9" y="5" width="6" height="14" rx=".5"/><rect x="15.5" y="5" width="6" height="14" rx=".5"/>'),
  article: S('<path d="M6 3h9l4 4v14H6z"/><path d="M9 10h7M9 13h7M9 16h5"/>'),
  book: S('<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19"/>'),
  list: S('<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r=".8"/><circle cx="4.5" cy="12" r=".8"/><circle cx="4.5" cy="18" r=".8"/>'),
  grid: S('<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9.5h18M3 15h18M9 4v16"/>'),
  clock: S('<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/>'),
  stack: S('<path d="M12 4l9 4.5-9 4.5-9-4.5z"/><path d="M3 13l9 4.5 9-4.5"/>'),
  tag: S('<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.3"/>'),
  matrix: S('<rect x="3" y="3" width="5" height="5"/><rect x="10" y="3" width="5" height="5"/><rect x="17" y="3" width="4" height="5"/><rect x="3" y="10" width="5" height="5"/><rect x="10" y="10" width="5" height="5"/><rect x="3" y="17" width="5" height="4"/>'),
  mic: S('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/>'),
  band: S('<path d="M3 8h4v8H3zM8.5 8h7v8h-7zM17 8h4v8h-4z"/>'),
  // commandes
  plus: S('<path d="M12 5v14M5 12h14"/>'), trash: S('<path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13"/>'),
  sun: S('<circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/>'),
  help: S('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17.5h.01"/>'),
  panelL: S('<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M9 4v16"/>'),
  panelR: S('<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M15 4v16"/>'),
  menu: S('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  close: S('<path d="M6 6l12 12M18 6L6 18"/>'),
  first: S('<path d="M6 5v14M18 6l-7 6 7 6z"/>'), prev: S('<path d="M15 6l-7 6 7 6z"/>'),
  next: S('<path d="M9 6l7 6-7 6z"/>'), last: S('<path d="M18 5v14M6 6l7 6-7 6z"/>'),
  swap: S('<path d="M7 7h12l-3-3M17 17H5l3 3"/>'), up: S('<path d="M12 19V5M6 11l6-6 6 6"/>'),
  ref: S('<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 8h6M9 12h6M9 16h3"/>'),
};
const PERSONAS = [
  {id:"dossier", label:"Dossier", g:["#A62130","#FF9350"], ic:IC.pDossier, def:"grille", tools:[
    {id:"plan", label:"Projet de loi", ic:IC.list, key:"P"}, {id:"grille", label:"Grille alinéas × étapes", ic:IC.grid, key:"G"},
    {id:"hist", label:"Alinéa d'étape en étape", ic:IC.clock, key:"H"}, {id:"etape", label:"L'article à une étape", ic:IC.stack, key:"E"}]},
  {id:"atelier", label:"Atelier", g:["#1961AA","#38BDFA"], ic:IC.pAtelier, def:"rediger", tools:[
    {id:"rediger", label:"Rédiger", ic:IC.pen, key:"R"}, {id:"inspecter", label:"Inspecter un passage", ic:IC.lens, key:"I"},
    {id:"comparer", label:"Comparer (planche à trois pages)", ic:IC.spread, key:"C"}, "sep",
    {id:"article", label:"L'article, votre version", ic:IC.article, key:"A"}, {id:"code", label:"Code général des impôts", ic:IC.book, key:"K"}]},
  {id:"enjeux", label:"Enjeux", g:["#6C44BC","#EA73FF"], ic:IC.pEnjeux, def:"theme", tools:[
    {id:"theme", label:"Fiche d'un thème", ic:IC.tag, key:"T"}, {id:"matrice", label:"Matrice thèmes × groupes", ic:IC.matrix, key:"M"}]},
  {id:"reunion", label:"Réunion", g:["#6573DD","#2AC7A5"], ic:IC.pReunion, def:"place", tools:[
    {id:"place", label:"Une place", ic:IC.mic, key:"L"}, {id:"bande", label:"Les 26 places", ic:IC.band, key:"B"}]},
];
const PER = Object.fromEntries(PERSONAS.map(p => [p.id, p]));
const toolsOf = p => PER[p].tools.filter(t => t !== "sep");

const st = Object.assign({p:"atelier", tool:{dossier:"grille", atelier:"rediger", enjeux:"theme", reunion:"place"}, o:12, draft:null, am:null, unit:null,
  cmpL:null, cmpR:null, cmpO:null, lay:"mine", vis:{ref:true, mine:true, am:true}, th:THEMES[0].id, place:1, etape:"transmis", art:"4",
  theme:"dark", showL:true, showR:true, tabs:{}, coll:{}, unfold:false, onlyMod:false, filter:"", fpill:"prop"}, store.get("ui", {}));
st.editing = false; st.sheet = null; st.modal = null; st.flash = "";
const save = () => store.set("ui", {p:st.p, tool:st.tool, o:st.o, draft:st.draft, am:st.am, cmpL:st.cmpL, cmpR:st.cmpR, cmpO:st.cmpO, lay:st.lay, vis:st.vis,
  th:st.th, place:st.place, etape:st.etape, art:st.art, theme:st.theme, showL:st.showL, showR:st.showR, tabs:st.tabs, coll:st.coll, unfold:st.unfold, onlyMod:st.onlyMod});
const narrow = () => innerWidth <= 760;
const draft = () => MINE.find(m => m.id === st.draft && m.al === st.o) || MINE.find(m => m.al === st.o) || null;
const tool = () => st.tool[st.p];
const tabOf = (g, def) => st.tabs[g] || def;

/* ---------- petits rendus ---------- */
const dot = (c, r) => `<span class="dot" style="background:${c}${r ? ";border-radius:50%" : ""}"></span>`;
const kb = s => `<kbd>${esc(s)}</kbd>`;
const sortCls = a => "s-" + NX.sortKey(a);
const sortTag = a => `<span class="sort ${sortCls(a)}">${esc(sortWord(a))}</span>`;
const selHandles = tag => `<i class="hd h1"></i><i class="hd h2"></i><i class="hd h3"></i><i class="hd h4"></i><i class="hd h5"></i><i class="hd h6"></i><i class="hd h7"></i><i class="hd h8"></i>${tag ? `<span class="sizetag">${esc(tag)}</span>` : ""}`;
function group(id, tabs, def, body, opt){
  opt = opt || {}; const cur = tabOf(id, def);
  return `<section class="pg${st.coll[id] ? " coll" : ""}" style="--f:${opt.f || "0 0 auto"}" data-g="${id}"><div class="pg-h"><span class="grip">||</span>${tabs.map(t => `<button class="tab${t.id === cur ? " on" : ""}" data-ptab="${id}:${t.id}">${t.label}</button>`).join("")}<button class="menu" data-coll="${id}" title="Replier ou déplier ce groupe">${IC.menu}</button></div><div class="pg-b" data-keep="g-${id}-${cur}">${body(cur)}</div></section>`;
}
function thumb(o, html, cap, on, extra){
  return `<button class="thumb${on ? " on" : ""}" ${extra || ""}><span class="mini">${html}</span><span class="cap">${cap}</span></button>`;
}
function amOptions(o){
  return [...MINE.filter(m => m.al === o).map(m => ({id:m.id, label:"Vous · " + draftNum(m)})),
    ...concurrents(o).units.map(u => ({id:u.lead.id, label:u.lead.num + " · " + who(u.lead).name}))];
}
function flash(msg){ st.flash = msg; renderStatus(); clearTimeout(flash.t); flash.t = setTimeout(() => { st.flash = ""; renderStatus(); }, 6000); }

/* ---------- squelette ---------- */
function renderTB(){
  $("#personas").innerHTML = PERSONAS.map(p => `<button class="persona${st.p === p.id ? " on" : ""}" data-persona="${p.id}" role="tab" aria-selected="${st.p === p.id}" title="${p.label} (Ctrl+Maj+${PERSONAS.indexOf(p) + 1})" aria-label="${p.label}"><span class="ic" style="--g1:${p.g[0]};--g2:${p.g[1]}">${p.ic}</span></button>`).join("");
  const T = {
    dossier: `<div class="tbg"><button class="tbb${tool() === "plan" ? " on" : ""}" data-tool="plan" title="Projet de loi">${IC.list}</button><button class="tbb${tool() === "grille" ? " on" : ""}" data-tool="grille" title="Grille">${IC.grid}</button></div><div class="tbg"><button class="tbb" data-amender="${st.o}" title="Amender l'alinéa ${st.o} dans l'atelier">${IC.pen}</button></div>`,
    atelier: `<div class="tbg"><button class="tbb" data-cmd="new" title="Nouveau brouillon sur l'alinéa ${st.o}">${IC.plus}</button><button class="tbb" data-cmd="del" title="Supprimer le brouillon courant">${IC.trash}</button></div><div class="tbg"><button class="tbb${tool() === "comparer" ? " on" : ""}" data-tool="comparer" title="Comparer">${IC.spread}</button><button class="tbb${tool() === "article" ? " on" : ""}" data-tool="article" title="L'article, votre version">${IC.article}</button></div>`,
    enjeux: `<div class="tbg"><button class="tbb" data-nav="prev" title="Thème précédent">${IC.prev}</button><button class="tbb" data-nav="next" title="Thème suivant">${IC.next}</button></div>`,
    reunion: `<div class="tbg"><button class="tbb" data-nav="prev" title="Place précédente">${IC.prev}</button><button class="tbb" data-nav="next" title="Place suivante">${IC.next}</button></div>`,
  };
  $("#tbtools").innerHTML = T[st.p];
  const zoom = {dossier:"al. " + st.o, atelier:"al. " + st.o, enjeux:"thème " + (THEMES.findIndex(t => t.id === st.th) + 1), reunion:"place " + st.place}[st.p];
  $("#docpill").textContent = `Article 4 · logement — face à : ${refShort()} (${zoom})`;
  const nm = narrow();
  $("#tbright").innerHTML = (nm ? `<div class="tbg"><button class="tbb${st.sheet === "left" ? " on" : ""}" data-cmd="sheet-left" title="Pages">${IC.panelL}</button><button class="tbb${st.sheet === "right" ? " on" : ""}" data-cmd="sheet-right" title="Studio">${IC.panelR}</button></div>`
    : `<div class="tbg"><button class="tbb${st.showL ? " on" : ""}" data-cmd="toggleL" title="Studio gauche (Pages)">${IC.panelL}</button><button class="tbb${st.showR ? " on" : ""}" data-cmd="toggleR" title="Studio droit">${IC.panelR}</button></div>`)
    + `<div class="tbg hide-m"><button class="tbb" data-cmd="prefs" title="Préférences… (style de l'interface)">${IC.sun}</button></div><div class="tbg"><button class="tbb" data-cmd="about" title="Lisez-moi">${IC.help}</button></div>`;
}
function renderTools(){
  const p = PER[st.p];
  $("#tools").innerHTML = p.tools.map(t => t === "sep" ? `<span class="tsep"></span>` : `<button class="tool${tool() === t.id ? " on" : ""}" data-tool="${t.id}" title="${esc(t.label)} (${t.key})" aria-label="${esc(t.label)}">${t.ic}</button>`).join("")
    + `<span class="sp"></span><span class="tsep"></span><div class="swatchpair" title="Couleurs : mon groupe et le concurrent ouvert"><i style="left:2px;top:2px;background:${GR[ME].color}"></i><i style="left:10px;top:12px;background:${st.am && AM[st.am] ? who(AM[st.am]).color : "#655e52"}"></i></div>`;
}

/* ---------- barre contextuelle (selon l'outil) ---------- */
const CTX = {};
CTX.plan = () => `<span class="lbl">${st.art ? "Article " + esc(st.art) : "Aucune sélection"}</span><button class="cb" data-cmd="setup">Configuration du document…</button><button class="cb" data-cmd="prefs">Préférences…</button>`;
CTX.grille = () => `<span class="lbl">Article 4 · ${NAL} alinéas × 4 étapes</span><label class="chk"><input type="checkbox" id="onlyMod"${st.onlyMod ? " checked" : ""}> Modifiés en navette seulement</label><span class="sep"></span><span class="dim">Alinéa ${st.o}</span><button class="cb" data-tool="hist">D'étape en étape</button><button class="cb" data-amender="${st.o}">Amender…</button>`;
CTX.hist = () => `<span class="lbl">Alinéa ${st.o} sur ${NAL}</span><button class="cb ic" data-nav="prev" title="Alinéa précédent">${IC.prev}</button><button class="cb ic" data-nav="next" title="Alinéa suivant">${IC.next}</button><span class="sep"></span><button class="cb pri" data-amender="${st.o}">Amender cet alinéa</button><button class="cb" data-go-al="${st.o}">Ses ${concurrents(st.o).units.length} concurrents</button>`;
CTX.etape = () => `<span class="lbl">L'article à une étape</span><span class="seg">${ETAPES.map(id => `<button class="${st.etape === id ? "on" : ""}" data-etape="${id}">${esc(ETL[id])}</button>`).join("")}</span>`;
CTX.rediger = () => {
  const m = draft(), o = st.o;
  if (st.editing && m) return `<span class="lbl">Édition · ${esc(draftNum(m))}</span><span class="dim">Mode</span><span class="seg"><button class="${m.mode === "rediger" ? "on" : ""}" data-mode="rediger">Rédiger</button><button class="${m.mode === "supprimer" ? "on" : ""}" data-mode="supprimer">Supprimer</button></span><span class="sep"></span><button class="cb pri" data-cmd="valider">Valider ${kb("Ctrl ↩")}</button><button class="cb" data-cmd="annuler">Annuler ${kb("Échap")}</button>`;
  if (!m) return `<span class="lbl">Alinéa ${o} · aucun brouillon</span><button class="cb pri" data-cmd="new">Nouveau brouillon</button><span class="sep"></span><span class="dim">Face à</span>${refSelect()}<span class="dim">· ${concurrents(o).units.length} concurrents</span>`;
  const a = st.am && AM[st.am];
  return `<span class="lbl">${esc(draftNum(m))} · alinéa ${o}</span><span class="dim">Mode</span><span class="seg"><button class="${m.mode === "rediger" ? "on" : ""}" data-mode="rediger">Rédiger</button><button class="${m.mode === "supprimer" ? "on" : ""}" data-mode="supprimer">Supprimer</button></span>${m.mode === "rediger" ? `<button class="cb" data-cmd="edit">Modifier le texte…</button>` : ""}<span class="sep"></span><span class="dim">Face à</span>${refSelect()}<span class="sep"></span>${a ? `<span class="dim">Calque :</span> ${dot(who(a).color, 1)} <span>${a.num}</span><button class="cb" data-cmp-with="${a.id}">Comparer avec mon brouillon</button><button class="cb ic" data-cmd="unpin" title="Retirer ce calque">${IC.close}</button>` : `<button class="cb" data-tool="comparer">Comparer…</button>`}`;
};
CTX.inspecter = () => {
  const U = unitsOf(st.o), u = U.find(x => x.k === st.unit) || U[0];
  if (!u) return `<span class="lbl">Alinéa ${st.o}</span><span class="dim">Aucun passage disputé sur cet alinéa.</span>`;
  const C = clusters(u);
  return `<span class="lbl">Passage « ${esc(u.label)} »</span><span class="dim">${u.n} propositions · ${C.list.length} rédactions distinctes</span><span class="sep"></span><button class="cb ic" data-unitnav="-1" title="Passage précédent">${IC.prev}</button><span class="dim">${U.indexOf(u) + 1} / ${U.length}</span><button class="cb ic" data-unitnav="1" title="Passage suivant">${IC.next}</button><span class="sep"></span><button class="cb" data-tool="rediger">Fermer ${kb("Échap")}</button>`;
};
CTX.comparer = () => {
  const L = amOptions(st.o), opt = cur => L.map(x => `<option value="${x.id}"${x.id === cur ? " selected" : ""}>${esc(x.label)}</option>`).join("");
  return `<span class="lbl">Comparer · alinéa ${st.o}</span><span class="dim">Gauche</span><select class="sel" id="cmpL">${opt(st.cmpL)}</select><button class="cb ic" data-cmd="swap" title="Inverser">${IC.swap}</button><span class="dim">Droite</span><select class="sel" id="cmpR">${opt(st.cmpR)}</select><span class="sep"></span><span class="dim">Au centre, la référence</span>${refSelect()}`;
};
CTX.article = () => `<span class="lbl">Article 4 · votre version</span><label class="chk"><input type="checkbox" id="unfold"${st.unfold ? "" : " checked"}> Replier les zones inchangées</label><span class="sep"></span><span class="dim">Face à</span>${refSelect()}<span class="dim">· ${MINE.length} brouillons appliqués</span>`;
CTX.code = () => `<span class="lbl">${esc(NX.code.article)}</span><span class="dim">en vigueur → après commission, instruction par instruction</span>`;
CTX.theme = () => { const th = THEMES.find(t => t.id === st.th); return `<span class="lbl">Thème · ${esc(th.label)}</span><span class="dim">${th.src === "déclaré" ? "déclaré par le rapport" : "calculé par mots-clés"} · ${th.amendements.length} amendements</span><span class="sep"></span><button class="cb" data-th-atelier="${th.id}">Ouvrir ses alinéas dans l'atelier</button><button class="cb" data-tool="matrice">Matrice…</button>`; };
CTX.matrice = () => `<span class="lbl">Thèmes × groupes</span><span class="dim">nombre d'amendements, rien d'autre · cliquer une case ouvre le thème</span>`;
CTX.place = () => { const e = NX.episodes.find(x => x.place === st.place); return `<span class="lbl">Place ${st.place} sur ${NX.episodes.length}</span><button class="cb ic" data-nav="prev">${IC.prev}</button><button class="cb ic" data-nav="next">${IC.next}</button><span class="sep"></span><span class="dim">${e.mots} mots · ${e.paroles.length} prises de parole · ${e.ams.length} amendements</span><button class="cb" data-tool="bande">Les 26 places…</button>`; };
CTX.bande = () => `<span class="lbl">Réunion du 21 septembre 2026</span><span class="dim">26 places dans l'ordre d'appel · longueur = mots prononcés · vert = un amendement adopté</span>`;
function refSelect(){ return `<select class="sel" id="refSel" title="La référence reste vierge">${ETAPES.map(id => `<option value="${id}"${id === REF ? " selected" : ""}>${esc(ETL[id])}</option>`).join("")}</select>`; }

/* ---------- Studio gauche (Pages) ---------- */
const LEFT = {};
LEFT.dossier = () => group("Ld", [{id:"art", label:"Articles"}, {id:"al", label:"Alinéas"}], "al", cur => {
  if (cur === "art") return NX.plan.map(p => `<div class="prow${st.art === p.num ? " on" : ""}" data-art="${esc(p.num)}"><span class="n">Art. ${esc(p.num)}</span><span class="t">${esc(short(p.intitule || p.statut || "", 60))}</span>${p.n ? `<span class="badge">${p.n}</span>` : ""}</div>`).join("");
  const G = NX.grid().filter(r => r.o);
  return `<div class="pg-sub">Article 4 <span class="r"><span class="badge">${NAL}</span></span></div><div class="thumbs">` + G.map(r => thumb(r.o, `<b>${r.o}</b><span class="mini-t">${esc(short(TRANSMIS[r.o - 1], 260))}</span>${r.cells.includes("mod") ? `<span class="flag">M</span>` : ""}`, `Alinéa ${r.o}`, st.o === r.o, `data-o="${r.o}"`)).join("") + `</div>`;
}, {f:"1 1 auto"});
LEFT.atelier = () => group("La", [{id:"br", label:"Brouillons"}, {id:"al", label:"Alinéas"}], "br", cur => {
  if (cur === "br") return `<div class="pg-sub">Mes brouillons <span class="badge">${MINE.length}</span><span class="r"><button class="ib" data-cmd="new" title="Nouveau brouillon sur l'alinéa ${st.o}">${IC.plus}</button></span></div><div class="thumbs" style="--tc:1;--ar:4/3">`
    + MINE.map(m => thumb(m.al, `<b>${esc(draftLead(m))}</b><span class="mini-t">${NX.draftDiff(m)}</span>`, `${esc(draftNum(m))} · al. ${m.al}`, draft() === m, `data-draft="${m.id}"`)).join("") + `</div>`;
  const D = new Map(NX.alsDisputes().map(x => [x.o, x.n]));
  return `<div class="thumbs">` + Array.from({length:NAL}, (_, i) => i + 1).map(o => {
    const mine = MINE.some(m => m.al === o);
    return thumb(o, `<b>${o}</b><span class="mini-t">${esc(short(refAl(o), 240))}</span>${D.get(o) ? `<span class="flag">${D.get(o)}</span>` : ""}`, `Alinéa ${o}${mine ? " ✎" : ""}`, st.o === o, `data-o="${o}"`);
  }).join("") + `</div>`;
}, {f:"1 1 auto"});
LEFT.enjeux = () => group("Le", [{id:"th", label:"Thèmes"}], "th", () => THEMES.map((t, i) => `<div class="prow${t.id === st.th && tool() === "theme" ? " on" : ""}" data-th="${t.id}"><span class="n" style="min-width:16px;color:var(--fg2)">${i + 1}</span><span class="t" style="color:var(--fg)">${esc(t.label)}<br><small style="color:var(--fg2)">${t.src}</small></span><span class="badge">${t.amendements.length}</span></div>`).join("")
  + `<div class="prow${tool() === "matrice" ? " on" : ""}" data-tool="matrice"><span class="n" style="min-width:16px">▦</span><span class="t" style="color:var(--fg)">Thèmes × groupes</span></div>`, {f:"1 1 auto"});
LEFT.reunion = () => group("Lr", [{id:"pl", label:"Places"}], "pl", () => `<div class="pg-sub">Ordre d'appel · 21 sept. 2026</div>` + NX.episodes.map(e => {
  const ad = e.ams.some(id => AM[id] && AM[id].sort === "Adopté");
  return `<div class="prow${e.place === st.place ? " on" : ""}" data-place="${e.place}"><span class="n" style="min-width:20px">${e.place}</span><span class="t">${esc(short(e.titre.replace(/^Amendements? /, ""), 60))}</span>${ad ? `<span class="s s-adopte">✓</span>` : ""}<span class="s">${e.mots}</span></div>`;
}).join(""), {f:"1 1 auto"});

/* ---------- Studio droit ---------- */
const RIGHT = {};
function histPanel(o, setRef){
  const H = NX.hist(o);
  return `<div class="pg-sub">Alinéa ${o} · la plus ancienne en haut</div>` + H.map(h => `<div class="histrow${setRef && h.id === REF ? " on" : ""}" ${setRef ? `data-ref="${h.id}"` : `data-etape-open="${h.id}"`}><span class="t">${esc(h.label)}</span><span class="s">${h.absent ? "absent" : h.id === ETAPES[0] ? "origine" : h.same ? "inchangé" : "modifié"}</span></div>`).join("")
    + `<div class="empty" style="font-size:11px">${setRef ? "Cliquer un état en fait la <b>référence</b> (vierge) de toutes les comparaisons." : "Cliquer un état ouvre l'article à cette étape."}</div>`;
}
function navigator(o){
  const G = NX.grid().filter(r => r.o);
  return `<div class="navi"><div class="np">${G.map(r => `<i class="${r.cells.includes("mod") ? "mod" : ""}${MINE.some(m => m.al === r.o) ? " mine" : ""}${r.o === o ? " on" : ""}" style="--c:${GR[ME].color};width:${40 + (TRANSMIS[r.o - 1].length % 55)}%" data-o="${r.o}" title="Alinéa ${r.o}"></i>`).join("")}</div>
    <div class="zoom"><span>al.</span><span class="track" style="background:linear-gradient(90deg,var(--sys) ${o / NAL * 100}%,var(--field) 0)"></span><span class="val">${o} / ${NAL}</span></div></div>`;
}
RIGHT.atelier = () => {
  const o = st.o, C = concurrents(o), U = unitsOf(o), m = draft(), a = st.am && AM[st.am];
  const conc = cur => {
    if (cur === "pas") return U.length ? U.map(u => `<div class="prow${st.unit === u.k && tool() === "inspecter" ? " on" : ""}" data-unit="${u.k}"><span class="t wrap" style="color:var(--fg)">« ${esc(u.label)} »</span><span class="badge">${u.n}</span></div>`).join("") : `<div class="empty">Aucun passage disputé sur l'alinéa ${o}.</div>`;
    const f = st.filter.toLowerCase(), match = x => !f || [x.num, who(x).name, sortWord(x), objetOf(x), x.groupe].join(" ").toLowerCase().includes(f);
    const rows = [...C.units, ...C.ecartes].filter(u => match(u.lead)).map(u => { const x = u.lead; return `<div class="prow${st.am === x.id ? " on" : ""}" data-am="${x.id}" title="${esc(objetOf(x))}">${dot(who(x).color)}<span class="n">${x.num}</span>${u.members.length > 1 ? `<span class="badge" title="${u.kind === "ident" ? "identiques" : "série"}">${u.members.length}</span>` : ""}<span class="t">${esc(who(x).name)}</span><span class="s ${sortCls(x)}">${esc(sortWord(x).split(" ·")[0])}</span></div>`; }).join("");
    return `<div class="pg-sub"><input class="search" id="flt" placeholder="Rechercher (groupe, sort, mot)" value="${esc(st.filter)}"></div>${rows || `<div class="empty">Aucun concurrent ne correspond.</div>`}`;
  };
  const vg = (c, n) => `<span class="vg">${Array.from({length:n}, (_, i) => `<i class="${i === 1 ? "c" : ""}" style="--c:${c};width:${[90, 70, 85, 50][i % 4]}%"></i>`).join("")}</span>`;
  const layers = () => {
    const L = [];
    if (a) L.push(`<div class="lrow${st.lay === "am" ? " on" : ""}${st.vis.am ? "" : " dim"}" data-lay="am"><span class="chev">›</span>${vg(who(a).color, 4)}<span class="nm">${a.num} · ${esc(who(a).name)}<small>concurrent, corrections apparentes</small></span><button class="eye${st.vis.am ? "" : " off"}" data-eye="am" title="Visibilité"></button></div>`);
    L.push(`<div class="lrow${st.lay === "mine" ? " on" : ""}${st.vis.mine ? "" : " dim"}" data-lay="mine"><span class="chev">›</span>${vg(GR[ME].color, 4)}<span class="nm">${m ? esc(draftNum(m)) : "Mon brouillon (aucun)"}<small>${GR[ME].name}, corrections apparentes</small></span><button class="eye${st.vis.mine ? "" : " off"}" data-eye="mine" title="Visibilité"></button></div>`);
    L.push(`<div class="lrow${st.lay === "ref" ? " on" : ""}${st.vis.ref ? "" : " dim"}" data-lay="ref"><span class="chev">›</span>${vg("#655e52", 4)}<span class="nm">Référence · ${esc(refShort())}<small>vierge, verrouillée</small></span><button class="eye${st.vis.ref ? "" : " off"}" data-eye="ref" title="Visibilité"></button></div>`);
    return `<div class="slider"><span>Opacité</span><span class="tr" style="--x:100"><i></i></span><span class="v">100 %</span></div>` + L.join("") + (a ? "" : `<div class="empty" style="font-size:11px">Ouvrir un concurrent (onglet Concurrents) l'ajoute en calque sous votre brouillon.</div>`);
  };
  return group("Rc", [{id:"conc", label:`Concurrents <span class="badge">${C.units.length}</span>`}, {id:"pas", label:`Passages <span class="badge">${U.length}</span>`}], "conc", conc, {f:"1 1 45%"})
    + group("Rl", [{id:"cal", label:"Calques"}], "cal", layers, {f:"0 0 auto"})
    + group("Rh", [{id:"hi", label:"Historique"}, {id:"nav", label:"Navigateur"}], "hi", cur => cur === "hi" ? histPanel(o, true) : navigator(o), {f:"0 1 auto"});
};
RIGHT.dossier = () => {
  const o = st.o, H = NX.hist(o), n = concurrents(o).units.length;
  return group("Rd", [{id:"hi", label:"Historique"}, {id:"nav", label:"Navigateur"}], "hi", cur => cur === "hi" ? histPanel(o, false) : navigator(o), {f:"0 0 auto"})
    + group("Ra", [{id:"al", label:"Alinéa"}, {id:"ref", label:"Référence"}], "al", cur => cur === "ref" ? ETAPES.map(id => `<div class="histrow${id === REF ? " on" : ""}" data-ref="${id}"><span class="t">${esc(ET[id].label)}</span>${id === REF ? `<span class="s">référence</span>` : ""}</div>`).join("")
      : `<div class="kv"><span>Alinéa</span><b>${o} sur ${NAL}</b><span>Navette</span><b>${H.some((h, i) => i && !h.same && !h.absent) ? "modifié" : "inchangé"}</b><span>Concurrents</span><b>${n}</b><span>Passages</span><b>${unitsOf(o).length} disputés</b><span>Brouillon</span><b>${MINE.some(m => m.al === o) ? "oui" : "non"}</b></div><div style="padding:0 10px 12px;display:flex;gap:6px;flex-wrap:wrap"><button class="cb" data-tool="hist">D'étape en étape</button><button class="cb pri" data-amender="${o}">Amender…</button></div>`, {f:"1 1 auto"});
};
RIGHT.enjeux = () => {
  const th = THEMES.find(t => t.id === st.th), M = NX.matrix(), row = M.rows.find(r => r.th.id === th.id);
  return group("Rs", [{id:"gr", label:"Groupes"}], "gr", () => `<div class="pg-sub">${esc(th.label)} · amendements par groupe</div><div class="swatches">${M.gs.map((g, i) => `<div class="swatch${row.cells[i].length ? "" : " zero"}" title="${esc(GR[g].name)}"><i style="--g:${GR[g].color}">${row.cells[i].length || ""}</i>${g}</div>`).join("")}${row.inst.length ? `<div class="swatch" title="Rapporteurs"><i style="--g:#5b5446">${row.inst.length}</i>Inst.</div>` : ""}</div>`, {f:"0 0 auto"})
    + group("Rt", [{id:"al", label:"Alinéas du thème"}], "al", () => { const als = themeAls(th); return als.length ? als.map(o => `<div class="prow" data-go-al="${o}"><span class="n">Al. ${o}</span><span class="t">${esc(NX.alShort(o, 70))}</span></div>`).join("") : `<div class="empty">Aucun alinéa précis.</div>`; }, {f:"1 1 auto"});
};
RIGHT.reunion = () => {
  const e = NX.episodes.find(x => x.place === st.place), ams = e.ams.map(id => AM[id]).filter(Boolean);
  const sp = new Map(); e.paroles.forEach(p => { const k = NX.speaker(p); sp.set(k, (sp.get(k) || {mots:0, c:p.groupe ? NX.groupColor(p.groupe) : "#5b5446"})); sp.get(k).mots += p.mots; });
  return group("Rv", [{id:"am", label:"Amendements"}, {id:"in", label:"Intervenants"}], "am", cur => cur === "am" ? ams.map(a => `<div class="prow" data-am="${a.id}">${dot(who(a).color)}<span class="n">${a.num}</span><span class="t">${esc(who(a).name)}</span><span class="s ${sortCls(a)}">${esc(sortWord(a))}</span></div>`).join("") || `<div class="empty">Aucun amendement.</div>`
    : [...sp].map(([k, v]) => `<div class="prow">${dot(v.c, 1)}<span class="t" style="color:var(--fg)">${esc(k)}</span><span class="s">${v.mots} mots</span></div>`).join(""), {f:"1 1 auto"})
    + group("Rn", [{id:"nav", label:"Navigateur"}], "nav", () => { const max = Math.max(...NX.episodes.map(x => x.mots)); return `<div class="navi"><div class="np" style="gap:3px">${NX.episodes.map(x => `<i class="${x.ams.some(id => AM[id] && AM[id].sort === "Adopté") ? "mod" : ""}${x.place === st.place ? " on" : ""}" style="width:${Math.max(4, x.mots / max * 100)}%;${x.ams.some(id => AM[id] && AM[id].sort === "Adopté") ? "background:var(--da-encre)" : ""}" data-place="${x.place}" title="Place ${x.place} · ${x.mots} mots"></i>`).join("")}</div><div class="zoom"><span>place</span><span class="track" style="background:linear-gradient(90deg,var(--sys) ${st.place / 26 * 100}%,var(--field) 0)"></span><span class="val">${st.place} / 26</span></div></div>`; }, {f:"0 0 auto"});
};

/* ---------- la page : vues ---------- */
const V = {};
const page = (html, cls, style) => `<article class="page ${cls || ""}" style="${style || ""}">${html}</article>`;
const runhead = (l, r) => `<div class="runhead"><span>${l}</span><span>${r}</span></div>`;
const art = (l, r) => `<div class="artlabel"><b>${l}</b>${r ? `<span class="r">${r}</span>` : ""}</div>`;

V.plan = () => {
  const rows = NX.plan.map(p => `<tr class="clk${st.art === p.num ? " on" : ""}" data-art="${esc(p.num)}"><td class="num">${esc(p.num)}</td><td>${esc(short(p.intitule || "(sans intitulé)", 110))}<br><span class="muted" style="font-size:11.5px">${esc(p.statut || "")}</span></td><td class="num">${p.n || ""}</td></tr>`).join("");
  const p = NX.plan.find(x => x.num === st.art);
  const det = p ? `<h2>Article ${esc(p.num)} · amendements en commission (${p.n})</h2>${p.n ? `<table class="tb">${Object.entries(p.amendements).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<tr><td>${esc(k)}</td><td class="num">${v}</td></tr>`).join("")}</table>` : `<p class="small">Aucun.</p>`}${p.num === "4" ? `<p style="margin-top:12px"><button class="pbtn pri" data-tool="grille">Ouvrir la grille de l'article 4</button></p>` : `<p class="small" style="margin-top:10px">Seul l'article 4 est chargé en détail dans cette maquette.</p>`}` : "";
  return art("Projet de loi", `${NX.plan.length} articles`) + page(runhead(esc(NX.dossier.uid), esc(short(NX.dossier.lecture, 60))) + `<h1>${esc(NX.dossier.titre)}</h1><p class="small">${esc(NX.dossier.commission)}</p><h2>Les articles</h2><table class="tb"><tr><th>Art.</th><th>Intitulé · statut</th><th style="text-align:right">Amendements</th></tr>${rows}</table>${det}`);
};
V.grille = () => {
  const G = NX.grid().filter(r => !st.onlyMod || r.cells.includes("mod"));
  const lab = {mod:"mod.", same:"·", absent:"", origine:"orig."};
  const rows = G.map(r => `<tr class="clk${r.o === st.o ? " on" : ""}" ${r.o ? `data-hist="${r.o}"` : ""}><td class="num">${r.o ?? "+"}</td>${r.cells.map(c => `<td class="cellcol"><span class="cellst c-${c}">${lab[c]}</span></td>`).join("")}<td class="txtcol hide-s">${r.o ? esc(NX.alShort(r.o, 80)) : `<i class="muted">alinéa absent du texte transmis</i>`}</td><td class="num">${r.n || ""}</td></tr>`).join("");
  return art("Article 4 · grille des étapes", `${G.length} lignes`) + page(runhead("Article 4", "alinéas × étapes"), "wide", "--pw:1080px") .replace("</article>", `<h1 style="font-size:20px">${esc(short(NX.article.intitule, 140))}</h1><p class="small">Une ligne par alinéa suivi d'étape en étape ; « modifié » = différent de l'étape précédente. Nombre = amendements de l'Assemblée sur l'alinéa. Cliquer une ligne : l'alinéa d'étape en étape.</p><div style="overflow-x:auto"><table class="tb"><tr><th>Al.</th>${ETAPES.map(id => `<th title="${esc(ET[id].label)}">${esc(ETL[id]).replace(" · ", "<br>")}</th>`).join("")}<th class="hide-s">Texte transmis</th><th style="text-align:right">Am.</th></tr>${rows}</table></div></article>`);
};
V.hist = () => {
  const o = st.o, H = NX.hist(o);
  const steps = H.map((h, i) => `<div class="histstep"><div class="st">${esc(ET[h.id].label)}<small>${i === 0 ? "première rédaction" : h.absent ? "absent à cette étape" : h.same ? "inchangé" : "modifié, face à l'étape précédente"}</small></div><div>${h.diff == null ? `<p class="muted">—</p>` : `<p>${h.diff}</p>`}</div></div>`).join("");
  return art(`Alinéa ${o} · d'étape en étape`, `${o} sur ${NAL}`) + page(runhead("Article 4 · navette", `alinéa ${o}`) + `<h1>Alinéa ${o}, d'étape en étape</h1><p class="small">Chaque étape est comparée à la précédente : ajouts soulignés en bleu, suppressions barrées.</p>${steps}<p style="margin-top:18px;display:flex;gap:8px;flex-wrap:wrap"><button class="pbtn pri" data-amender="${o}">${IC.pen.replace("<svg", '<svg style="width:14px;height:14px"')} Amender cet alinéa dans l'atelier</button><button class="pbtn" data-go-al="${o}">Voir ses ${concurrents(o).units.length} concurrents</button></p>`);
};
V.etape = () => {
  const E = ET[st.etape];
  return art(esc(E.label), `${E.alineas.length} alinéas`) + page(runhead("Article 4", esc(E.label)) + `<h1>${esc(E.label)}</h1><p class="small">Numérotation propre à cette étape.</p>` + E.alineas.map((t, i) => `<div class="artal"><span class="no">${i + 1}</span><p>${esc(t)}</p></div>`).join(""));
};

// --- l'atelier : la page de l'alinéa, en calques (référence au-dessus, mon brouillon, un concurrent)
function amBlock(a, o){
  const touched = [...new Set([...a.applique.rows.map(r => r.o).filter(Boolean), ...a.spans.map(s => s.al)])].sort((x, y) => x - y);
  const lines = touched.map(x => { const d = NX.amDiff(a, x); return d ? `<div class="amline">alinéa ${x}${x === o ? "" : " · hors de l'alinéa courant"}</div><p>${x === o && NX.amText(a, x) ? NX.unitsOnDiff(d, x, NX.amText(a, x)) : d}</p>` : ""; }).join("");
  const ins = []; for (const [, l] of verOfAmendment(a).ins) l.forEach(t => ins.push(`<div class="amline">alinéa inséré</div><p><ins>${esc(t)}</ins></p>`));
  return { lead: modeLead(a, o), body: (lines + ins.join("")) || `<p>${esc(a.dispositif || "")}</p>` };
}
V.rediger = () => {
  const o = st.o, m = draft(), a = st.am && AM[st.am];
  const layer = (id, head, body, tag) => `<section class="lay ${id}${st.lay === id ? " picked" : ""}" data-lay="${id}">${selHandles(tag)}<div class="lay-h">${head}</div>${body}</section>`;
  let out = "";
  if (st.vis.ref) out += layer("ref", `${dot("#655e52", 1)} Référence · ${esc(refLabel())} · vierge`, `<p class="ref-t">${esc(refAl(o))}</p>`, "Référence");
  if (st.vis.mine){
    if (!m) out += layer("mine", `${dot(GR[ME].color, 1)} Mon brouillon`, `<p class="small">Aucun brouillon sur l'alinéa ${o}.</p><p><button class="pbtn pri" data-cmd="new">${IC.plus.replace("<svg", '<svg style="width:14px;height:14px"')} Nouveau brouillon à partir de la référence</button></p>`, "Brouillon");
    else if (st.editing) out += layer("mine", `${dot(GR[ME].color, 1)} ${esc(draftNum(m))} · ${esc(GR[ME].name)} · édition`, `<p class="lead">${esc(draftLead(m))}</p><div class="edit"><textarea id="ta" spellcheck="false">${esc(m.texte)}</textarea><div class="livecap">Calque miroir · face à la référence</div><div class="live" id="live">${liveHTML(refAl(o), m.texte)}</div><p style="margin-top:12px;display:flex;gap:8px"><button class="pbtn pri" data-cmd="valider">Valider ${kb("Ctrl ↩")}</button><button class="pbtn" data-cmd="annuler">Annuler</button></p></div>`, "Édition");
    else {
      const html = m.mode === "rediger" ? NX.unitsOnDiff(NX.draftDiff(m), o, m.texte) : NX.draftDiff(m);
      out += layer("mine", `${dot(GR[ME].color, 1)} ${esc(draftNum(m))} · ${esc(GR[ME].name)} · corrections apparentes`, `<p class="lead">${esc(draftLead(m))}</p><p class="mine-t" title="Double-cliquer pour modifier">${html}</p>`, draftNum(m));
    }
  }
  if (a && st.vis.am){
    const w = who(a), B = amBlock(a, o), ep = NX.epOf(a);
    out += layer("am", `${dot(w.color, 1)} ${a.num} · ${esc(w.name)} · ${esc(a.auteur || "")} ${sortTag(a)}${a.avis ? ` <span class="muted" style="text-transform:none;letter-spacing:0">avis ${esc(a.avis)}</span>` : ""}`,
      `<p class="lead">${esc(B.lead)}</p>${B.body}<div class="amline">Exposé sommaire</div><div class="expose">${esc(short(a.expose || "—", 900))}</div><p class="small" style="margin-top:10px">Déposé le ${NX.fmtDate(a.depot)}${ep ? ` · <a data-place="${ep.place}">place ${ep.place} en réunion ↗</a>` : ""} · <a data-cmp-with="${a.id}">comparer avec mon brouillon</a></p>`, a.num);
  }
  if (!out) out = `<p class="small">Tous les calques sont masqués. Rétablir leur visibilité dans le panneau Calques.</p>`;
  return art(`Alinéa ${o}${m ? " · " + esc(draftNum(m)) : ""}`, `face à : ${esc(refShort())}`) + page(runhead("Projet de loi logement · article 4", `alinéa ${o} sur ${NAL}`) + out);
};
V.inspecter = () => {
  const o = st.o, U = unitsOf(o), m = draft();
  const u = U.find(x => x.k === st.unit) || U[0]; if (u) st.unit = u.k;
  const text = m && m.mode === "rediger" ? m.texte : refAl(o);
  let body = m && m.mode === "rediger" ? NX.unitsOnDiff(NX.draftDiff(m), o, m.texte) : unitMarks(o, refAl(o));
  if (u) body = body.replace(new RegExp(`(<mark class="pt[^"]*)(" data-u="${u.k}")`), "$1 cur$2");
  const pg = page(runhead("Inspecter", `alinéa ${o}`) + `<div class="lay-h">${m && m.mode === "rediger" ? dot(GR[ME].color, 1) + " " + esc(draftNum(m)) + " · corrections apparentes" : dot("#655e52", 1) + " Référence · " + esc(refLabel())}</div><p>${body}</p><p class="small" style="margin-top:14px">${U.length} passage${U.length > 1 ? "s" : ""} disputé${U.length > 1 ? "s" : ""} : soulignés en pointillé orangé, plus épais quand ils sont plus disputés. Cliquer un passage.</p>`);
  if (!u) return art(`Alinéa ${o} · inspecter`) + pg;
  const C = clusters(u), ref = TRANSMIS[o - 1];
  const ctxA = short(ref.slice(Math.max(0, u.a - 70), u.a).split(" ").slice(1).join(" "), 80), ctxB = ref.slice(u.b, u.b + 70).split(" ").slice(0, -1).join(" ");
  const fl = `<div class="float" role="dialog" aria-label="Propositions"><div class="float-h"><span class="grip"></span><button class="pill${st.fpill === "prop" ? " on" : ""}" data-fpill="prop">Propositions</button><button class="pill${st.fpill === "ctx" ? " on" : ""}" data-fpill="ctx">Contexte</button><button class="x" data-tool="rediger" title="Fermer (Échap)">${IC.close}</button></div><div class="float-b">`
    + (st.fpill === "ctx" ? `<div class="ctxline">…${esc(ctxA)} <b style="color:var(--fg)">${esc(C.ref)}</b> ${esc(ctxB)}…</div><div class="ctxline">${u.n} propositions touchent ce passage, en ${C.list.length} rédactions distinctes (la référence comprise).</div>`
    : C.list.map(c => { const isRef = c.items.some(i => i.id === "ref"); return `<div class="cl${isRef ? " isref" : ""}"><div class="cnt">${isRef ? "Référence · " : ""}${c.items.length} ${plural(c.items.length, "porteur")}</div><div class="tx"><span class="ctxw">…${esc(ctxA.split(" ").slice(-4).join(" "))} </span>${c.text == null ? `<del>${esc(C.ref)}</del>` : isRef ? esc(c.text) : inlineDiff(C.ref, c.text)}<span class="ctxw"> ${esc(ctxB.split(" ").slice(0, 4).join(" "))}…</span></div><div class="who">${c.items.slice(0, isRef ? 4 : 8).map(x => `<span class="gtag"${x.a ? ` data-am="${x.a.id}" title="Ouvrir ${x.a.num} en calque"` : ""}>${dot(x.color, 1)}${esc(x.label)}${x.a ? ` · ${x.a.num}` : ""}</span>`).join("")}${c.items.length > (isRef ? 4 : 8) ? `<span class="gtag" title="${esc(c.items.slice(isRef ? 4 : 8).map(x => x.label + (x.a ? " " + x.a.num : "")).join(", "))}">+ ${c.items.length - (isRef ? 4 : 8)} autres</span>` : ""}</div></div>`; }).join(""))
    + `</div></div>`;
  return art(`Alinéa ${o} · passage « ${esc(u.label)} »`, `${u.n} propositions`) + `<div class="insp">${pg}</div>` + `<div class="floatdock">${fl}</div>`;
};
function cmpSide(id, o){
  if (!id) return null;
  if (id[0] === "M"){ const m = MINE.find(z => z.id === id); if (!m) return null; return {label:"Vous · " + draftNum(m), color:GR[ME].color, lead:draftLead(m), html:NX.draftDiff(m), sub:GR[ME].name}; }
  const a = AM[id]; if (!a) return null;
  const d = NX.amDiff(a, o);
  return {label:a.num, sub:who(a).name + " · " + sortWord(a), color:who(a).color, lead:modeLead(a, o), html:d || `<span class="muted">Ne réécrit pas l'alinéa ${o} lui-même.</span> ${esc(short(a.dispositif || "", 300))}`};
}
V.comparer = () => {
  const o = st.o, L = amOptions(o);
  if (st.cmpO !== o || !L.some(x => x.id === st.cmpL) || !L.some(x => x.id === st.cmpR)){ st.cmpO = o; st.cmpL = (L[0] || {}).id || null; st.cmpR = (L.find(x => x.id !== st.cmpL) || {}).id || null; }
  const A = cmpSide(st.cmpL, o), B = cmpSide(st.cmpR, o);
  if (!A || !B) return art(`Comparer · alinéa ${o}`) + page(`<p class="small">Il faut deux rédactions sur l'alinéa ${o} (un brouillon ou des concurrents) pour comparer.</p>`);
  const pp = (X, cls) => `<div class="pp ${cls || ""}"><div class="lay-h">${dot(X.color, 1)} ${esc(X.sub)}</div><h3>${esc(X.label)}</h3><p class="lead">${esc(X.lead)}</p><p>${X.html}</p></div>`;
  return `<div class="spreadlbl"><span>Gauche</span><span style="text-align:center">Référence au centre · vierge</span><span style="text-align:right">Droite</span></div><div class="spreadwrap" style="width:min(100%,1180px)"><div class="spread">${pp(A)}${pp({label:refLabel(), sub:"Référence · vierge", color:"#655e52", lead:`Alinéa ${o}, tel qu'il est`, html:esc(refAl(o))}, "mid")}${pp(B)}</div></div><p style="font-size:11px;color:var(--fg2);margin-top:10px;width:min(100%,1180px)">Les corrections apparentes sont portées sur chaque rédaction, face à la référence du centre, qui reste vierge. Sur écran étroit, faire glisser la planche.</p>`;
};
V.article = () => {
  const L = verLines(myVer()), out = []; let run = [];
  const row = (o, html, chg) => `<div class="artal${chg ? " chg" : ""}"><span class="no">${o}</span><p>${html}</p></div>`;
  const flush = () => { if (run.length > 2) out.push(`<div class="fold" data-cmd="unfold">${run.length} alinéas inchangés (${run[0].o}–${run[run.length - 1].o}) · cliquer pour déplier</div>`); else run.forEach(l => out.push(row(l.o, esc(l.text)))); run = []; };
  for (const l of L){
    if (l.kind === "same" && !st.unfold){ run.push(l); continue; }
    flush();
    out.push(l.kind === "same" ? row(l.o, esc(l.text)) : l.kind === "del" ? row(l.o, `<del>${esc(refAl(l.o))}</del>`, 1) : l.kind === "mod" ? row(l.o, inlineDiff(refAl(l.o), l.text), 1) : row("+", `<ins>${esc(l.text)}</ins>`, 1));
  }
  flush();
  return art("Article 4 · votre version", `face à : ${esc(refShort())}`) + page(runhead("Projet de loi logement", "article 4 · votre version") + `<h1>Article 4, avec vos brouillons</h1><p class="small">Tous vos brouillons appliqués au texte de référence ; corrections apparentes sur votre version.</p>${out.join("")}`);
};
V.code = () => {
  const C = NX.code, blocks = C.lettres.map(l => {
    const av = (C.avant[l] || []).join("\n"), ap = (C.apresCommission[l] || []).join("\n"), same = sameText(av, ap);
    return `<div class="histstep"><div class="st">${l})<small>${same ? "inchangé" : "modifié par la commission"}</small></div><div><p style="font-size:14px">${same ? esc(short(ap, 400)) : inlineDiff(av, ap)}</p></div></div>`;
  }).join("");
  return art("Code général des impôts", "art. 31") + page(runhead("Code général des impôts", "en vigueur → après commission") + `<h1>${esc(C.article)}</h1><p class="small">Les instructions de l'article, appliquées mécaniquement : ce que le code deviendrait.</p>${blocks}`);
};
V.theme = () => {
  const th = THEMES.find(t => t.id === st.th), ams = NX.themeAms(th), als = themeAls(th), eps = NX.themeParoles(th), mine = MINE.filter(m => als.includes(m.al));
  return art(`Thème · ${esc(th.label)}`, `${THEMES.indexOf(th) + 1} sur ${THEMES.length}`) + page(runhead("Enjeux", th.src === "déclaré" ? "thème déclaré par le rapport" : "thème calculé par mots-clés") + `<h1>${esc(th.label)}</h1><p class="small">${ams.length} amendements · alinéas ${als.map(o => `<a data-go-al="${o}">${o}</a>`).join(", ") || "—"}</p>
    <h2>1 · Ce que dit le rapport</h2><p>${esc(th.doc || "—")}</p>
    <h2>2 · Ce qui a été dit en réunion</h2>${eps.length ? eps.slice(0, 6).map(e => `<div class="parole"><div class="sp"><a data-place="${e.place}">Place ${e.place}</a><small>${e.mots} mots</small></div><div>${e.paroles.slice(0, 2).map(p => `<p style="font-size:14px;margin-bottom:6px"><b style="font-family:var(--ui);font-size:12px">${esc(NX.speaker(p))}</b> — « ${esc(short(p.txt, 180))} »</p>`).join("")}</div></div>`).join("") : `<p class="small">Rien en réunion.</p>`}
    <h2>3 · Ce que fait mon texte</h2>${mine.length ? mine.map(m => `<p class="small"><a data-draft="${m.id}">${esc(draftNum(m))}</a> · alinéa ${m.al}</p><p>${NX.draftDiff(m)}</p>`).join("") : `<p class="small">Aucun de vos brouillons ne touche ce thème.</p>`}
    <h2>Les amendements (${ams.length})</h2><table class="tb"><tr><th>N°</th><th>Groupe</th><th>Sort</th><th>Objet</th></tr>${ams.map(a => `<tr class="clk" data-am="${a.id}"><td class="num">${a.num}</td><td style="white-space:nowrap">${dot(who(a).color, 1)} ${esc(who(a).name)}</td><td class="${sortCls(a)}" style="white-space:nowrap">${esc(sortWord(a))}</td><td>${esc(objetOf(a))}</td></tr>`).join("")}</table>`);
};
V.matrice = () => {
  const M = NX.matrix(), max = Math.max(1, ...M.rows.flatMap(r => r.cells.map(c => c.length)));
  return art("Thèmes × groupes", "nombre d'amendements") + page(runhead("Enjeux", "matrice") + `<h1>Thèmes × groupes</h1><p class="small">Nombre d'amendements par thème et par groupe : une seule chose comptée. Cliquer une case ouvre le thème.</p><div style="overflow-x:auto"><table class="tb matrix"><tr><th>Thème</th>${M.gs.map(g => `<th title="${esc(GR[g].name)}" style="text-align:center">${dot(GR[g].color, 1)}<br>${g}</th>`).join("")}<th style="text-align:center">Inst.</th></tr>${M.rows.map(r => `<tr><td style="white-space:nowrap"><a data-th="${r.th.id}">${esc(r.th.label)}</a></td>${r.cells.map(c => `<td class="num heat" style="--v:${Math.round(c.length / max * 55)};text-align:center" data-th="${r.th.id}">${c.length || ""}</td>`).join("")}<td class="num" style="text-align:center">${r.inst.length || ""}</td></tr>`).join("")}</table></div>`, "wide", "--pw:960px");
};
function bandStrip(){
  const max = Math.max(...NX.episodes.map(x => x.mots));
  return `<div class="bandwrap"><div class="cap"><span>Les 26 places · largeur = mots prononcés</span><span>${NX.episodes.reduce((s, x) => s + x.mots, 0)} mots</span></div><div class="band">${NX.episodes.map(x => `<button class="seg2${x.ams.some(id => AM[id] && AM[id].sort === "Adopté") ? " ad" : ""}${x.place === st.place ? " on" : ""}" style="--w:${x.mots}" data-place="${x.place}" title="Place ${x.place} · ${x.mots} mots">${x.mots / max > .25 ? `<span>${x.place}</span>` : ""}</button>`).join("")}</div></div>`;
}
V.place = () => {
  const e = NX.episodes.find(x => x.place === st.place), ams = e.ams.map(id => AM[id]).filter(Boolean);
  return bandStrip() + art(`Place ${e.place} sur ${NX.episodes.length}`, `${e.mots} mots`) + page(runhead("Commission des affaires économiques · 21 septembre 2026", `place ${e.place}`) + `<h1 style="font-size:19px">${esc(e.titre)}</h1>
    <h2>Liste de vote</h2><div style="overflow-x:auto"><table class="tb"><tr><th class="hide-s">#</th><th>Auteur · groupe</th><th>N°</th><th>Objet</th><th>Avis</th><th>Sort</th></tr>${ams.map((a, i) => `<tr class="clk" data-am="${a.id}"><td class="hide-s">${i + 1}</td><td style="white-space:nowrap">${dot(who(a).color, 1)} ${esc(a.auteur || "")}<br><span class="muted">${esc(who(a).name)}</span></td><td class="num">${a.num}</td><td>${esc(objetOf(a))}</td><td style="text-align:center">${avisSym(a.avis)}</td><td class="${sortCls(a)}" style="white-space:nowrap">${esc(sortWord(a))}</td></tr>`).join("")}</table></div>
    <h2>Prises de parole (${e.paroles.length})</h2>${e.paroles.map(p => `<div class="parole"><div class="sp">${p.groupe ? dot(NX.groupColor(p.groupe), 1) : dot("#5b5446", 1)} ${esc(NX.speaker(p))}<small>${p.mots} mots</small></div><p>${esc(p.txt)}</p></div>`).join("")}
    <h2>Décisions</h2>${e.decisions.map(d => `<div class="decision">${esc(d.txt)}</div>`).join("") || `<p class="small">—</p>`}`);
};
V.bande = () => {
  const max = Math.max(...NX.episodes.map(x => x.mots));
  return art("Réunion du 21 septembre 2026", "26 places") + page(runhead("Commission des affaires économiques", "vue d'ensemble") + `<h1>Les 26 places, à l'échelle des mots prononcés</h1><p class="small">Dans l'ordre d'appel. Vert : au moins un amendement adopté à cette place. Cliquer une place pour l'ouvrir.</p><div class="bandbig" style="margin-top:14px">${NX.episodes.map(x => `<div class="bar${x.ams.some(id => AM[id] && AM[id].sort === "Adopté") ? " ad" : ""}" data-place="${x.place}"><span class="muted" style="text-align:right">${x.place}</span><span class="b" style="--w:${x.mots / max * 100}"></span><span class="n">${x.mots}</span><span class="t">${esc(short(x.titre.replace(/^Amendements? /, ""), 90))}</span></div>`).join("")}</div>`);
};

/* ---------- barre d'état ---------- */
const HINTS = {
  plan:"<b>Cliquer</b> un article pour voir ses amendements. <b>Cliquer</b> l'article 4 pour ouvrir sa grille.",
  grille:"<b>Cliquer</b> une ligne pour suivre l'alinéa d'étape en étape. <b>H</b> l'ouvre directement.",
  hist:"<b>Page préc./suiv.</b> change d'alinéa. <b>Cliquer</b> « Amender » emporte l'alinéa dans l'atelier.",
  etape:"<b>Cliquer</b> une étape dans la barre contextuelle pour lire l'article tel qu'il était.",
  rediger:"<b>Double-cliquer</b> le texte pour le modifier. <b>Cliquer</b> un passage souligné pour voir les propositions. <b>Cliquer</b> une pastille de calque pour le masquer.",
  inspecter:"<b>Cliquer</b> un passage souligné pour en changer. <b>Cliquer</b> un groupe pour ouvrir son amendement en calque. <b>Échap</b> ferme.",
  comparer:"<b>Choisir</b> les rédactions de gauche et de droite. La référence, au centre, reste vierge.",
  article:"<b>Cliquer</b> une zone repliée pour la déplier.",
  code:"Lecture seule : le code tel qu'il deviendrait.",
  theme:"<b>Cliquer</b> un amendement pour l'ouvrir dans l'atelier ; <b>cliquer</b> une place pour l'écouter.",
  matrice:"<b>Cliquer</b> une case pour ouvrir le thème.",
  place:"<b>Cliquer</b> un amendement de la liste de vote pour l'ouvrir dans l'atelier. <b>Cliquer</b> la bande pour changer de place.",
  bande:"<b>Cliquer</b> une place pour l'ouvrir.",
};
function navInfo(){
  if (st.p === "enjeux") return {pos:`Thème ${THEMES.findIndex(t => t.id === st.th) + 1} sur ${THEMES.length}`};
  if (st.p === "reunion") return {pos:`Place ${st.place} sur ${NX.episodes.length}`};
  return {pos:`Alinéa ${st.o} sur ${NAL}`};
}
function renderStatus(){
  $("#status").innerHTML = `<span class="nav"><button data-nav="first" title="Premier">${IC.first}</button><button data-nav="prev" title="Précédent (Page préc.)">${IC.prev}</button><span class="pos">${navInfo().pos}</span><button data-nav="next" title="Suivant (Page suiv.)">${IC.next}</button><button data-nav="last" title="Dernier">${IC.last}</button></span><span class="hint">${HINTS[tool()] || ""}</span>${st.flash ? `<span class="flash">${st.flash}</span>` : ""}`;
}
function nav(dir){
  const step = (cur, n, d) => d === "first" ? 1 : d === "last" ? n : clamp(cur + (d === "prev" ? -1 : 1), 1, n);
  if (st.p === "enjeux"){ const i = THEMES.findIndex(t => t.id === st.th) + 1; st.th = THEMES[step(i, THEMES.length, dir) - 1].id; if (tool() !== "theme") st.tool.enjeux = "theme"; }
  else if (st.p === "reunion"){ st.place = step(st.place, NX.episodes.length, dir); st.tool.reunion = "place"; }
  else { setO(step(st.o, NAL, dir)); }
  render();
}
function setO(o){ if (o === st.o) return; st.o = o; st.unit = null; st.editing = false; if (st.am && !concurrents(o).units.some(u => u.members.some(x => x.id === st.am)) && !(AM[st.am] && touchesAl(AM[st.am], o))) st.am = null; const m = MINE.find(x => x.al === o); if (m) st.draft = m.id; }

/* ---------- dialogues ---------- */
function openModal(kind){ st.modal = kind; renderModal(); }
function closeModal(){ st.modal = null; renderModal(); }
function renderModal(){
  const M = $("#modal"), sc = $("#scrim");
  if (!st.modal){ M.style.display = "none"; sc.style.display = ""; sc.className = st.sheet ? "sheet" : ""; return; }
  sc.className = ""; sc.style.display = "block"; M.style.display = "flex"; M.className = st.modal === "about" ? "" : "small";
  if (st.modal === "setup") M.innerHTML = `<div class="mh">Configuration du document</div><div class="mb"><p>La <b>référence</b> est le texte face auquel toutes les rédactions sont comparées. Elle reste vierge : les corrections apparentes sont portées sur la rédaction comparée, la vôtre comme celle d'un autre groupe.</p>${ETAPES.map(id => `<label class="opt${id === REF ? " on" : ""}"><input type="radio" name="ref" value="${id}"${id === REF ? " checked" : ""} data-ref="${id}"><span><b>${esc(ET[id].label)}</b><small>${ET[id].alineas.length} alinéas</small></span></label>`).join("")}</div><div class="mf"><button class="cb pri" data-cmd="close-modal">OK</button></div>`;
  if (st.modal === "prefs") M.innerHTML = `<div class="mh">Préférences · Interface</div><div class="mb"><p><b>Style de l'interface</b></p>${["dark", "light"].map(t => `<label class="opt${st.theme === t ? " on" : ""}"><input type="radio" name="ui" data-uistyle="${t}"${st.theme === t ? " checked" : ""}><span><b>${t === "dark" ? "Sombre" : "Clair"}</b><small>${t === "dark" ? "par défaut" : "la page du document reste blanche"}</small></span></label>`).join("")}</div><div class="mf"><button class="cb pri" data-cmd="close-modal">Fermer</button></div>`;
  if (st.modal === "about") M.innerHTML = `<div class="mh">Lisez-moi</div><div class="mb">
    <p><b>Maquette inspirée d'Affinity</b> (Photo, Designer, Publisher v2 de Serif ; « Affinity by Canva » v3, octobre 2025). Article 4 du projet de loi logement : données réelles, groupes politiques fictifs. Aucun logo ni nom de produit dans l'interface ; les glyphes des Personas sont dessinés pour la maquette.</p>
    <p>La forme suit désormais la direction artistique « Le bordereau » (<code>direction-artistique/DA.md</code>) : thème clair unique, papier et encre ; la structure et les mécanismes décrits ci-dessous restent ceux de la maquette.</p>
    <h3>Ce qui est emprunté (forme et mécanismes)</h3><ul>
    <li><b>Personas</b> : les quatre espaces (Dossier, Atelier, Enjeux, Réunion) sont des façons de travailler sur le même document. L'icône active est saturée, les autres désaturées. Chacune change les outils, la barre contextuelle et le Studio, sans quitter l'article (« Think of Personas as different ways of working within your app »). Raccourcis Ctrl+Maj+1 à 4.</li>
    <li><b>Toolbar</b> avec le nom du document en pastille grise au centre ; un clic ouvre <b>Configuration du document…</b>, qui sert ici à choisir la référence.</li>
    <li><b>Barre contextuelle</b> : elle « se met à jour selon l'outil » (Rédiger : mode, Valider/Annuler ; Comparer : gauche, droite, référence au centre ; Inspecter : passage précédent/suivant ; sans sélection : « Configuration du document… | Préférences… »).</li>
    <li><b>Panneau Outils</b> à gauche : colonne d'icônes, séparateurs, pastilles de couleur en bas (mon groupe, le concurrent ouvert) ; raccourcis d'une lettre (R, I, C, A, K…).</li>
    <li><b>Studio</b> en groupes de panneaux à onglets, poignée « || » et menu ☰ (qui replie le groupe). À gauche, façon Publisher, le panneau <b>Pages</b> : alinéas et brouillons en miniatures, sélection cerclée #546984.</li>
    <li><b>Calques</b> : la page de l'atelier empile des calques — la référence en haut, mon brouillon, un concurrent — avec la <b>pastille de visibilité</b> à droite et le <b>cadre de sélection à poignées</b> sur la page.</li>
    <li><b>Historique</b> : les étapes de la navette, la plus ancienne en haut ; cliquer un état en fait la référence (comme on revient à un état dans History).</li>
    <li><b>Navigateur</b>, <b>Nuancier</b> (les groupes en pastilles de couleur, avec leurs nombres d'amendements sur le thème), curseur fin à pouce rond.</li>
    <li><b>Panneau flottant arrondi à onglets en pilules</b> (v3) : les propositions sur un passage disputé.</li>
    <li><b>Planche</b> (pages en vis-à-vis de Publisher) : comparer en trois pages, une rédaction | la référence au centre | l'autre, lignes alignées.</li>
    <li><b>Barre d'état</b> : navigation |◀ ◀ alinéa 12 sur 30 ▶ ▶| et aide sur les gestes, verbe en gras (« <b>Double-cliquer</b> le texte pour le modifier »).</li>
    <li><b>Style de l'interface</b> sombre ou clair (Préférences…). Sur écran étroit, comme sur iPad : Personas en haut, Studio en feuilles arrondies avec poignée.</li></ul>
    <h3>Couleurs et typographie</h3><p>Relevées sur les captures de l'aide v2 : toolbar #303030, boutons contextuels #454545, outils et onglet actif #363636, rangée d'onglets #1F1F1F, pasteboard #222222, filets #0B0B0B, pastille #616161 ; couleur réservée aux icônes de Persona (dégradés rouge→orange, bleu→cyan, violet→rose, indigo/vert d'eau) ; bleu système #007AFF pour les cases et boutons principaux (v3). Police système (SF / Segoe UI), à défaut <b>Inter</b> (Google Fonts) pour remplacer SF ; texte de loi en <b>Source Serif 4</b>. Le style clair est approché, non mesuré.</p>
    <h3>Écarts assumés</h3><ul><li>La direction artistique « papier sombre » du projet est suspendue ici : la forme suit Affinity (page blanche sur pasteboard gris).</li>
    <li>Règles du projet gardées : la référence reste vierge, corrections apparentes sur la rédaction comparée (ajout souligné bleu, suppression barrée rouge), symétrie stricte entre mon brouillon et celui d'un autre groupe ; aucun score, un nombre ne compte qu'une chose.</li>
    <li>Les 9 thèmes sont ceux des données : 5 déclarés par le rapport, 4 calculés par mots-clés (indiqué sur chaque fiche).</li>
    <li>Pas de menus déroulants de la barre de menus (Fichier, Édition…) : la page web n'en a pas l'usage.</li></ul>
    <h3>Sources</h3><p>affinity.help (Designer 2 : Workspace/interface ; Publisher 2 : about Personas ; captures publisher.jpg, draw.jpg, photo_original.jpg, context_toolbar_move_tool.png, icônes de Persona) ; captures de presse Canva pour la v3 (Mac Vector, Windows Pixel, panneau flottant à onglets pilules).</p></div><div class="mf"><button class="cb pri" data-cmd="close-modal">OK</button></div>`;
}

/* ---------- rendu ---------- */
let lastKey = null;
function render(){
  const keep = {}; $$("[data-keep]").forEach(el => keep[el.dataset.keep] = el.scrollTop);
  document.documentElement.dataset.theme = st.theme;
  const A = $("#app"); A.classList.toggle("noL", !st.showL); A.classList.toggle("noR", !st.showR);
  A.classList.toggle("sheet-left", st.sheet === "left"); A.classList.toggle("sheet-right", st.sheet === "right");
  if (!toolsOf(st.p).some(t => t.id === tool())) st.tool[st.p] = PER[st.p].def;
  renderTB(); renderTools();
  $("#ctx").innerHTML = (CTX[tool()] || (() => ""))();
  $("#left").innerHTML = LEFT[st.p](); $("#right").innerHTML = RIGHT[st.p]();
  $("#canvas").innerHTML = V[tool()]();
  renderStatus(); renderModal(); save();
  $("#paste").classList.toggle("docked", !!$(".floatdock") && $("#paste").clientWidth >= 640);
  const cm = $(".page mark.pt.cur"); if (cm && tool() === "inspecter"){ if ($("#paste").classList.contains("docked")) cm.scrollIntoView({block:"center"}); else { const f = $(".float"); if (f) f.scrollIntoView({block:"start"}); } }
  const key = [st.p, tool(), st.o, st.th, st.place, st.etape, st.art].join("|");
  $$("[data-keep]").forEach(el => { if (keep[el.dataset.keep] != null) el.scrollTop = keep[el.dataset.keep]; });
  if (key !== lastKey){ $("#paste").scrollTop = 0; $("#ctx").scrollLeft = 0; lastKey = key; }
  const ta = $("#ta"); if (ta){ const fit = () => { ta.style.height = "auto"; ta.style.height = (ta.scrollHeight + 4) + "px"; }; fit(); ta.focus({preventScroll:true}); ta.setSelectionRange(ta.value.length, ta.value.length); ta.addEventListener("input", () => { fit(); $("#live").innerHTML = liveHTML(refAl(st.o), ta.value); }); }
}
function scrollIntoSel(){ requestAnimationFrame(() => { $$(".thumb.on, .prow.on").forEach(el => el.scrollIntoView({block:"nearest"})); }); }
function go(p){ st.p = p; st.editing = false; st.sheet = null; render(); scrollIntoSel(); }
window.allerA = go;
function setTool(t){ const p = PERSONAS.find(x => toolsOf(x.id).some(y => y.id === t)); if (p) st.p = p.id; st.tool[st.p] = t; st.editing = false; if (narrow()) st.sheet = null; render(); }
function setRef(id){ REF = id; store.set("ref", id); flash(`Référence : ${esc(ET[id].label)} — elle reste vierge.`); render(); }
function openAm(id){ const a = AM[id]; if (!a) return; if (a.cible.al && !touchesAl(a, st.o)) setO(a.cible.al); st.am = id; st.vis.am = true; st.lay = "am"; st.p = "atelier"; st.tool.atelier = "rediger"; st.editing = false; st.sheet = null; render(); requestAnimationFrame(() => { const el = $(".lay.am"); if (el) el.scrollIntoView({block:"start", behavior:"smooth"}); }); }
function openDraft(id){ const m = MINE.find(x => x.id === id); if (!m) return; setO(m.al); st.draft = id; st.p = "atelier"; if (!["rediger", "inspecter", "comparer"].includes(st.tool.atelier)) st.tool.atelier = "rediger"; st.lay = "mine"; st.sheet = null; render(); }
function amender(o){ setO(o); const m = MINE.find(x => x.al === o) || newDraft(o); st.draft = m.id; st.p = "atelier"; st.tool.atelier = "rediger"; st.lay = "mine"; st.vis.mine = true; flash(`${esc(draftNum(m))} sur l'alinéa ${o}.`); render(); }

function cmd(c, el){
  switch (c){
    case "toggleL": st.showL = !st.showL; return render();
    case "toggleR": st.showR = !st.showR; return render();
    case "sheet-left": st.sheet = st.sheet === "left" ? null : "left"; return render();
    case "sheet-right": st.sheet = st.sheet === "right" ? null : "right"; return render();
    case "setup": return openModal("setup");
    case "prefs": return openModal("prefs");
    case "about": return openModal("about");
    case "close-modal": return closeModal();
    case "new": { const m = newDraft(st.o); st.draft = m.id; st.p = "atelier"; st.tool.atelier = "rediger"; st.lay = "mine"; st.vis.mine = true; st.editing = true; flash(`${esc(draftNum(m))} créé sur l'alinéa ${st.o}, à partir de la référence.`); return render(); }
    case "del": { const m = draft(); if (!m) return flash("Aucun brouillon sur cet alinéa."); if (!confirm(`Supprimer ${draftNum(m)} (alinéa ${m.al}) ?`)) return; MINE.splice(MINE.indexOf(m), 1); saveDrafts(); UNIT_CACHE.clear(); flash("Brouillon supprimé."); return render(); }
    case "edit": { const m = draft(); if (m && m.mode === "rediger"){ st.editing = true; st.lay = "mine"; st.vis.mine = true; st.tool.atelier = "rediger"; render(); } return; }
    case "valider": { const m = draft(), ta = $("#ta"); if (!m || !ta) return; m.texte = ta.value; saveDrafts(); UNIT_CACHE.clear(); st.editing = false; flash(`${esc(draftNum(m))} enregistré.`); return render(); }
    case "annuler": st.editing = false; return render();
    case "unpin": st.am = null; st.lay = "mine"; return render();
    case "swap": [st.cmpL, st.cmpR] = [st.cmpR, st.cmpL]; return render();
    case "unfold": st.unfold = true; return render();
  }
}

/* ---------- gestes ---------- */
let clickT = null;
document.addEventListener("click", e => {
  if (e.target === $("#scrim")){ if (st.modal) return closeModal(); if (st.sheet){ st.sheet = null; return render(); } }
  const t = e.target.closest("[data-persona],[data-tool],[data-cmd],[data-ptab],[data-coll],[data-o],[data-draft],[data-am],[data-unit],[data-unitnav],[data-eye],[data-lay],[data-art],[data-hist],[data-etape],[data-etape-open],[data-th],[data-th-atelier],[data-place],[data-ref],[data-uistyle],[data-nav],[data-amender],[data-go-al],[data-mode],[data-cmp-with],[data-fpill],mark.pt");
  if (!t) return;
  const d = t.dataset;
  if (d.eye){ e.stopPropagation(); st.vis[d.eye] = !st.vis[d.eye]; return render(); }
  if (t.matches("mark.pt")){ st.unit = +t.dataset.u; st.p = "atelier"; st.tool.atelier = "inspecter"; st.fpill = "prop"; st.editing = false; return render(); }
  if (d.persona) return go(d.persona);
  if (d.tool) return setTool(d.tool);
  if (d.cmd) return cmd(d.cmd, t);
  if (d.ptab){ const [g, k] = d.ptab.split(":"); st.tabs[g] = k; return render(); }
  if (d.coll){ st.coll[d.coll] = !st.coll[d.coll]; return render(); }
  if (d.nav) return nav(d.nav);
  if (d.uistyle){ st.theme = d.uistyle; return render(); }
  if (d.ref){ if (d.ref !== REF) setRef(d.ref); return; }
  if (d.draft) return openDraft(d.draft);
  if (d.am) return openAm(d.am);
  if (d.unit != null){ st.unit = +d.unit; st.tool.atelier = "inspecter"; st.fpill = "prop"; if (narrow()) st.sheet = null; return render(); }
  if (d.unitnav){ const U = unitsOf(st.o); if (!U.length) return; const i = U.findIndex(u => u.k === st.unit); st.unit = U[(Math.max(0, i) + +d.unitnav + U.length) % U.length].k; return render(); }
  if (d.fpill){ st.fpill = d.fpill; return render(); }
  if (d.lay){ if (d.lay === "am" && !st.am) return; st.lay = d.lay; save(); $$(".lay").forEach(el => el.classList.toggle("picked", el.dataset.lay === st.lay)); $$(".lrow[data-lay]").forEach(el => el.classList.toggle("on", el.dataset.lay === st.lay)); if (t.closest("#right")){ const el = $(`.lay.${st.lay}`); if (el) el.scrollIntoView({block:"nearest", behavior:"smooth"}); } return; }
  if (d.o){ setO(+d.o); if (st.p === "dossier" && !["hist", "grille"].includes(tool())) st.tool.dossier = "hist"; else if (st.p === "dossier" && t.closest("#left, #right")) st.tool.dossier = "hist"; if (narrow()) st.sheet = null; return render(); }
  if (d.hist){ setO(+d.hist); st.tool.dossier = "hist"; return render(); }
  if (d.art){ st.art = d.art; st.p = "dossier"; st.tool.dossier = d.art === "4" && t.closest("#left") ? "grille" : "plan"; if (narrow()) st.sheet = null; return render(); }
  if (d.etape){ st.etape = d.etape; return render(); }
  if (d.etapeOpen){ st.etape = d.etapeOpen; st.tool.dossier = "etape"; return render(); }
  if (d.th){ st.th = d.th; st.p = "enjeux"; st.tool.enjeux = "theme"; if (narrow()) st.sheet = null; return render(); }
  if (d.thAtelier){ const als = themeAls(THEMES.find(x => x.id === d.thAtelier)); if (als.length){ setO(als[0]); st.p = "atelier"; st.tool.atelier = "rediger"; flash(`Alinéas du thème : ${als.join(", ")} — le Navigateur et les miniatures les montrent.`); render(); } return; }
  if (d.place){ st.place = +d.place; st.p = "reunion"; st.tool.reunion = "place"; if (narrow()) st.sheet = null; render(); $("#paste").scrollTop = 0; return; }
  if (d.amender) return amender(+d.amender);
  if (d.goAl){ setO(+d.goAl); st.p = "atelier"; st.tool.atelier = "rediger"; st.tabs.Rc = "conc"; if (narrow()) st.sheet = null; return render(); }
  if (d.mode){ const m = draft(); if (!m) return; m.mode = d.mode; if (m.mode === "rediger" && !m.texte) m.texte = TRANSMIS[m.al - 1]; if (m.mode === "supprimer") st.editing = false; saveDrafts(); UNIT_CACHE.clear(); return render(); }
  if (d.cmpWith){ const m = draft(); st.cmpO = st.o; st.cmpL = m ? m.id : null; st.cmpR = d.cmpWith; if (!m){ const L = amOptions(st.o); st.cmpL = (L.find(x => x.id !== d.cmpWith) || {}).id; } return setTool("comparer"); }
});
document.addEventListener("dblclick", e => {
  if (st.p !== "atelier" || tool() !== "rediger" || st.editing || e.target.closest("mark.pt")) return;
  if (e.target.closest(".lay.mine .mine-t")) return cmd("edit");
});
document.addEventListener("change", e => {
  const t = e.target;
  if (t.id === "refSel") return setRef(t.value);
  if (t.id === "cmpL"){ st.cmpL = t.value; return render(); }
  if (t.id === "cmpR"){ st.cmpR = t.value; return render(); }
  if (t.id === "onlyMod"){ st.onlyMod = t.checked; return render(); }
  if (t.id === "unfold"){ st.unfold = !t.checked; return render(); }
});
document.addEventListener("input", e => {
  if (e.target.id === "flt"){ st.filter = e.target.value; const pos = e.target.selectionStart; $("#right").innerHTML = RIGHT[st.p](); const n = $("#flt"); n.focus(); n.setSelectionRange(pos, pos); }
});
document.addEventListener("keydown", e => {
  const k = e.key, ctrl = e.ctrlKey || e.metaKey;
  if (st.editing){ if (k === "Escape"){ e.preventDefault(); return cmd("annuler"); } if (k === "Enter" && ctrl){ e.preventDefault(); return cmd("valider"); } return; }
  if (ctrl && e.shiftKey && /Digit[1-4]/.test(e.code)){ e.preventDefault(); return go(PERSONAS[+e.code.slice(5) - 1].id); }
  if (k === "Escape"){
    e.preventDefault();
    if (st.modal) return closeModal();
    if (st.sheet){ st.sheet = null; return render(); }
    if (tool() === "inspecter" || tool() === "comparer"){ st.tool.atelier = "rediger"; return render(); }
    if (st.p === "atelier" && st.am){ st.am = null; st.lay = "mine"; return render(); }
    if (tool() !== PER[st.p].def){ st.tool[st.p] = PER[st.p].def; return render(); }
    if (st.p !== "atelier") return go("atelier");
    return;
  }
  if (st.modal || e.target.matches("input,textarea,select") || ctrl || e.altKey) return;
  if (k === "PageDown"){ e.preventDefault(); return nav("next"); }
  if (k === "PageUp"){ e.preventDefault(); return nav("prev"); }
  const T = toolsOf(st.p).find(t => t.key.toLowerCase() === k.toLowerCase());
  if (T){ e.preventDefault(); return setTool(T.id); }
  if (k === "Enter" && st.p === "atelier" && tool() === "rediger" && draft()){ e.preventDefault(); return cmd("edit"); }
});
addEventListener("resize", () => { clearTimeout(window.__rz); window.__rz = setTimeout(() => { if (!narrow()) st.sheet = null; render(); }, 150); });

render(); scrollIntoSel();
if (!store.get("vu", false)){ flash("Maquette inspirée d'Affinity : le bouton ? ouvre le Lisez-moi."); store.set("vu", true); }
