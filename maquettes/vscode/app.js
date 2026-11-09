/* Boussole · inspiration Visual Studio Code — rendu et gestes. S'appuie sur le noyau commun (données réelles, groupes fictifs). */
"use strict";
const I = {   // icônes au trait, façon Codicons (16 px de grille)
  files:'<svg viewBox="0 0 24 24"><path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z"/><path d="M14 3v4h4M9 12h6M9 16h6"/></svg>',
  edit:'<svg viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/></svg>',
  bulb:'<svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/></svg>',
  people:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.3"/><path d="M15.5 14.3c2.9.3 5.5 2.6 5.5 5.7"/></svg>',
  gear:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>',
  chev:'<svg viewBox="0 0 16 16"><path d="M6 4l4 4-4 4"/></svg>',
  close:'<svg viewBox="0 0 16 16"><path d="M4 4l8 8M12 4l-8 8"/></svg>',
  plus:'<svg viewBox="0 0 16 16"><path d="M8 3v10M3 8h10"/></svg>',
  split:'<svg viewBox="0 0 16 16"><rect x="2" y="3" width="12" height="10" rx="1"/><path d="M8 3v10"/></svg>',
  inline:'<svg viewBox="0 0 16 16"><rect x="2" y="3" width="12" height="10" rx="1"/><path d="M4.5 6.5h7M4.5 9.5h5"/></svg>',
  fold:'<svg viewBox="0 0 16 16"><path d="M5 3l3 3 3-3M5 13l3-3 3 3M3 8h10"/></svg>',
  doc:'<svg viewBox="0 0 16 16"><path d="M9.5 2H4.5v12h7V4.5z"/><path d="M9.5 2v2.5H12"/></svg>',
  info:'<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6"/><path d="M8 7v4M8 5h.01"/></svg>',
  branch:'<svg viewBox="0 0 16 16"><circle cx="5" cy="4" r="1.6"/><circle cx="5" cy="12" r="1.6"/><circle cx="11" cy="6" r="1.6"/><path d="M5 5.6v4.8M11 7.6c0 2.4-6 1.2-6 2.8"/></svg>',
  bell:'<svg viewBox="0 0 16 16"><path d="M4 11V7a4 4 0 0 1 8 0v4l1 1.5H3z"/><path d="M6.5 14h3"/></svg>',
  compare:'<svg viewBox="0 0 16 16"><path d="M5 2v12M11 2v12M2 5h3M11 11h3"/></svg>',
};
const SPACES = [
  {id:"dossier", label:"Dossier", icon:I.files, hint:"Ctrl+Maj+1"},
  {id:"atelier", label:"Atelier", icon:I.edit, hint:"Ctrl+Maj+2"},
  {id:"enjeux", label:"Enjeux", icon:I.bulb, hint:"Ctrl+Maj+3"},
  {id:"reunion", label:"Réunion", icon:I.people, hint:"Ctrl+Maj+4"},
];
const st = Object.assign({esp:"atelier", o:12, draft:null, panelTab:"conc", filter:"", diff:"inline", side:innerWidth > 720, panel:innerWidth > 720,
  theme:"dark", th:THEMES[2].id, place:1, sel:null, peek:null, editing:false, closed:{}}, store.get("ui", {}));
st.editing = false; st.peek = null;
if (!MINE.find(m => m.id === st.draft)) st.draft = MINE[0].id;
const save = () => store.set("ui", {esp:st.esp, o:st.o, draft:st.draft, panelTab:st.panelTab, diff:st.diff, theme:st.theme, th:st.th, place:st.place, closed:st.closed});
// onglets ouverts par espace : {k, t, kind, arg, preview}
const TABS = {dossier:[{k:"lisez", t:"Lisez-moi", kind:"lisez"},{k:"grille", t:"Article 4 · grille des étapes", kind:"grille"}], atelier:[], enjeux:[], reunion:[]};
const ACTIVE = {dossier:"grille", atelier:null, enjeux:null, reunion:null};
const draft = () => MINE.find(m => m.id === st.draft) || MINE[0];

function openTab(esp, tab, pin){
  const L = TABS[esp]; let t = L.find(x => x.k === tab.k);
  if (!t){ const pi = L.findIndex(x => x.preview); if (pi >= 0 && !pin) L.splice(pi, 1, tab); else L.push(tab); t = tab; t.preview = !pin; }
  else if (pin) t.preview = false;
  ACTIVE[esp] = t.k;
}
function closeTab(esp, k){ const L = TABS[esp], i = L.findIndex(x => x.k === k); if (i < 0) return; L.splice(i, 1); if (ACTIVE[esp] === k) ACTIVE[esp] = (L[i] || L[i - 1] || {}).k || null; render(); }

/* ---------- utilitaires d'affichage ---------- */
const sortIcon = a => ({adopte:"✓", rejete:"✕", tombe:"↓", retire:"↩", ns:"∅", ecarte:"⊘", attente:"○"})[NX.sortKey(a)];
const sortCls = a => "s-" + NX.sortKey(a);
const dot = c => `<span class="dot" style="background:${c}"></span>`;
const kb = s => s.split(" ").map(k => `<kbd>${esc(k)}</kbd>`).join("");
const amLabel = a => { const w = who(a); return `${a.num} · ${w.name}`; };
function line(o, html, cls, extra){ return `<div class="ln ${cls || ""}" data-o="${o ?? ""}"><div class="g">${o ?? ""}</div><div class="c">${html}</div>${extra || ""}</div>`; }

/* ---------- squelette ---------- */
function renderAct(){
  const nConc = concurrents(st.o).units.length;
  $("#act").innerHTML = SPACES.map(s => `<button class="${st.esp === s.id ? "on" : ""}" data-esp="${s.id}" title="${s.label} (${s.hint})" aria-label="${s.label}">${s.icon}${s.id === "atelier" ? `<span class="badge">${MINE.length}</span>` : ""}</button>`).join("")
    + `<span class="sp"></span><button class="bottom" data-cmd="theme" title="Thème : ${st.theme === "dark" ? "Dark Modern" : "Light Modern"}">${I.gear}</button>`;
}
function sec(id, title, body, actions){
  const closed = st.closed[id];
  return `<div class="sec${closed ? " closed" : ""}" data-sec="${id}"><div class="sec-h"><span class="chev">${I.chev.replace('viewBox="0 0 16 16"', 'viewBox="0 0 16 16" style="transform:rotate(90deg)"')}</span>${esc(title)}<span class="act">${actions || ""}</span></div><div class="sec-b">${body}</div></div>`;
}
function renderSide(){
  const S = {dossier: sideDossier, atelier: sideAtelier, enjeux: sideEnjeux, reunion: sideReunion}[st.esp]();
  $("#side").innerHTML = `<div class="side-title">${S.title}<span class="act">${S.actions || ""}</span></div><div class="side-scroll">${S.body}</div>`;
}
function renderTabs(){
  const L = TABS[st.esp];
  $("#tabs").innerHTML = L.map(t => `<div class="tab${t.k === ACTIVE[st.esp] ? " on" : ""}${t.preview ? " preview" : ""}" data-tab="${esc(t.k)}" title="${esc(t.t)}"><i>${t.icon || "§"}</i><span class="t">${esc(t.t)}</span><button class="x" data-close="${esc(t.k)}" aria-label="Fermer">${I.close}</button></div>`).join("");
}
function render(){
  document.documentElement.dataset.theme = st.theme;
  $("#app").classList.toggle("noside", !st.side);
  renderAct(); renderSide();
  if (!TABS[st.esp].length || !ACTIVE[st.esp]) defaultTab();
  renderTabs();
  const t = TABS[st.esp].find(x => x.k === ACTIVE[st.esp]);
  const R = t ? VIEW[t.kind](t.arg) : {crumbs: "", html: `<div class="empty">Aucun onglet ouvert. <a>Ctrl+P</a> pour ouvrir.</div>`};
  $("#crumbs").innerHTML = (R.crumbs || "") + `<span class="tools">${R.tools || ""}</span>`;
  $("#editor").innerHTML = R.html;
  const mm = $("#minimap"); mm.classList.toggle("on", !!R.minimap); if (R.minimap) mm.innerHTML = R.minimap;
  renderPanel(); renderStatus(); save();
  if (R.after) R.after();
}
function defaultTab(){
  if (st.esp === "atelier") openTab("atelier", {k:"d:" + st.draft, t:draftNum(draft()) + " · al. " + draft().al, kind:"draft", arg:st.draft, icon:"✎"}, true);
  if (st.esp === "enjeux") openTab("enjeux", {k:"th:" + st.th, t:"Thème · " + THEMES.find(t => t.id === st.th).label, kind:"theme", arg:st.th, icon:"#"}, true);
  if (st.esp === "reunion") openTab("reunion", {k:"place:" + st.place, t:"Place " + st.place, kind:"place", arg:st.place, icon:"▶"}, true);
  if (st.esp === "dossier") ACTIVE.dossier = TABS.dossier[0] ? TABS.dossier[0].k : null;
}

/* ---------- barres latérales ---------- */
function sideDossier(){
  const plan = NX.plan.map(p => {
    const is4 = p.num === "4";
    return `<div class="row${is4 ? " on" : ""}" style="--ind:1" data-art="${esc(p.num)}"><span class="lbl">Article ${esc(p.num)}${p.intitule ? ` <span class="desc">${esc(short(p.intitule, 46))}</span>` : ""}</span>${p.n ? `<span class="cnt">${p.n}</span>` : ""}</div>`;
  }).join("");
  const grid = NX.grid().filter(r => r.o).map(r => {
    const mod = r.cells.includes("mod"); const deco = mod ? `<span class="deco M" title="modifié en cours de navette">M</span>` : `<span class="deco"></span>`;
    return `<div class="row${st.o === r.o ? " on" : ""}" style="--ind:1" data-hist="${r.o}"><span class="lbl">${r.o} <span class="desc">${esc(NX.alShort(r.o, 50))}</span></span>${r.n ? `<span class="cnt">${r.n}</span>` : ""}${deco}</div>`;
  }).join("");
  return {title: "Explorateur", body:
    sec("plan", "Projet de loi logement", plan)
    + sec("art", "Article 4 · alinéas", grid)
    + sec("etapes", "Chronologie", ETAPES.map((id, i) => `<div class="row" style="--ind:1" data-etape="${id}"><span class="lbl">${esc(ET[id].label)}</span><span class="desc">${i + 1}/4</span></div>`).join(""))};
}
function sideAtelier(){
  const drafts = MINE.map(m => `<div class="row${m.id === st.draft ? " on" : ""}" style="--ind:1" data-draft="${m.id}"><span class="ico-s" style="color:var(--da-bordeaux)">✎</span><span class="lbl">${esc(draftNum(m))} <span class="desc">al. ${m.al} · ${m.mode === "supprimer" ? "supprimer" : m.mode === "inserer" ? "insérer" : "rédiger"}</span></span><span class="deco ${m.mode === "supprimer" ? "D" : m.mode === "inserer" ? "A" : "M"}">${m.mode === "supprimer" ? "D" : m.mode === "inserer" ? "A" : "M"}</span></div>`).join("");
  const U = unitsOf(st.o);
  const units = U.length ? U.map(u => `<div class="row" style="--ind:1" data-unit="${u.k}"><span class="ico-s" style="color:var(--warn)">⚠</span><span class="lbl">« ${esc(u.label)} »</span><span class="cnt">${u.n}</span></div>`).join("") : `<div class="row" style="--ind:1"><span class="desc">Aucun passage disputé sur cet alinéa.</span></div>`;
  const als = NX.alsDisputes().map(x => `<div class="row${x.o === st.o ? " on" : ""}" style="--ind:1" data-al="${x.o}"><span class="lbl">Alinéa ${x.o} <span class="desc">${esc(NX.alShort(x.o, 40))}</span></span><span class="cnt">${x.n}</span></div>`).join("");
  return {title: "Atelier", actions: `<button class="iconbtn" data-cmd="new" title="Nouveau brouillon sur l'alinéa ${st.o}">${I.plus}</button>`, body:
    sec("drafts", "Mes brouillons", drafts, `<button class="iconbtn" data-cmd="new" title="Nouveau brouillon">${I.plus}</button>`)
    + sec("units", `Passages disputés · al. ${st.o}`, units)
    + sec("als", "Alinéas visés", als)
    + sec("vues", "Vues", `<div class="row" style="--ind:1" data-open="article"><span class="ico-s">§</span><span class="lbl">Article 4 · votre version</span></div><div class="row" style="--ind:1" data-open="code"><span class="ico-s">§</span><span class="lbl">Code général des impôts, art. 31</span></div>`)};
}
function sideEnjeux(){
  const th = THEMES.map(t => `<div class="row${t.id === st.th ? " on" : ""}" style="--ind:1" data-th="${t.id}"><span class="ico-s">#</span><span class="lbl">${esc(t.label)} <span class="desc">${t.src}</span></span><span class="cnt">${t.amendements.length}</span></div>`).join("");
  return {title: "Enjeux", body: sec("themes", "Thèmes", th) + sec("mx", "Tableaux", `<div class="row" style="--ind:1" data-open="matrice"><span class="ico-s">▦</span><span class="lbl">Thèmes × groupes</span></div>`)};
}
function sideReunion(){
  const rows = NX.episodes.map(e => {
    const ad = e.ams.some(id => AM[id] && AM[id].sort === "Adopté");
    return `<div class="row${e.place === st.place ? " on" : ""}" style="--ind:1" data-place="${e.place}"><span class="ico-s ${ad ? "s-adopte" : ""}">${ad ? "✓" : "·"}</span><span class="lbl">${e.place}. <span class="desc">${esc(short(e.titre.replace(/^Amendements? /, ""), 52))}</span></span><span class="desc">${e.mots}</span></div>`;
  }).join("");
  return {title: "Réunion", body: sec("places", "Déroulé · 21 septembre 2026", rows)};
}

/* ---------- vues de l'éditeur ---------- */
const VIEW = {};
VIEW.lisez = () => ({crumbs: `<b>Boussole</b><span class="sep">›</span><b>Lisez-moi</b>`, html: `<div class="welcome">
  <h1>Boussole</h1><div class="sub">Maquette inspirée de Visual Studio Code · article 4 du projet de loi logement (données réelles, groupes fictifs)</div>
  <h3>Démarrer</h3><ul>
   <li><a data-go="atelier">Ouvrir mon brouillon sur l'alinéa 12</a> — l'éditeur, comparé à la référence.</li>
   <li><a data-cmd="palette">Palette de commandes</a> ${kb("F1")} ou ${kb("Ctrl Maj P")} · <a data-cmd="quick">Aller à…</a> ${kb("Ctrl P")}</li>
   <li>Barre latérale ${kb("Ctrl B")} · panneau ${kb("Ctrl J")} · espaces ${kb("Ctrl Maj 1")} à ${kb("Ctrl Maj 4")}</li></ul>
  <h3>Ce qui est emprunté à VS Code, et à quoi cela sert ici</h3><ul>
   <li><b>Barre d'activité</b> (48 px) : les quatre espaces de la refonte, une icône chacun.</li>
   <li><b>Gouttière</b> : les numéros de ligne deviennent les numéros d'alinéa ; trait bleu = alinéa modifié, vert = ajouté, rouge = supprimé.</li>
   <li><b>Éditeur de différences</b> : en ligne ou côte à côte, repli des zones inchangées. Règle du projet conservée : la référence reste vierge, les corrections sont portées sur la rédaction comparée.</li>
   <li><b>Soulignement ondulé</b> (les avertissements de VS Code) : un passage que plusieurs propositions modifient. Un clic ouvre la <b>vue incrustée</b> (Peek) : les rédactions distinctes, avec qui les porte.</li>
   <li><b>CodeLens</b> : au-dessus d'un alinéa, le nombre de concurrents et de passages disputés, cliquables.</li>
   <li><b>Panneau « Problèmes »</b> : la liste des amendements concurrents, filtrable.</li>
   <li><b>Notebook</b> : la réunion, une cellule par prise de parole, la décision en sortie ; <b>minimap</b> : les 26 places à l'échelle des mots prononcés.</li>
   <li><b>Aperçu Markdown</b> : la fiche d'un enjeu. <b>Barre d'état</b> : référence, brouillon, nombre de concurrents. <b>Notifications</b> en bas à droite.</li>
   <li>Couleurs : thèmes « Dark Modern » et « Light Modern » (fichiers du dépôt microsoft/vscode). Tailles : barre de titre 35, onglets 35, fil d'Ariane 22, lignes 22, barre d'état 22.</li></ul>
  <h3>Écarts assumés</h3><ul><li>La direction artistique « papier » du projet est suspendue dans cette maquette : la forme suit VS Code. Les règles de comparaison (référence vierge, symétrie) sont gardées. Depuis, la forme suit la direction artistique « Le bordereau » (<code>direction-artistique/DA.md</code>) ; la structure reste celle de VS Code.</li></ul></div>`});

VIEW.grille = () => {
  const G = NX.grid();
  const rows = G.map(r => `<tr data-hist="${r.o ?? ""}" class="${r.o === st.o ? "cur" : ""}"><td style="color:var(--dim);text-align:right;width:40px">${r.o ?? "+"}</td>${r.cells.map(c => `<td class="cell c-${c}" title="${{mod:"modifié", same:"inchangé", absent:"absent", origine:"première rédaction"}[c]}">${{mod:"● modifié", same:"·", absent:"", origine:"○"}[c]}</td>`).join("")}<td style="color:var(--muted)">${r.o ? esc(NX.alShort(r.o, 70)) : "<i>alinéa introduit en cours de navette</i>"}</td><td style="text-align:right">${r.n ? `<span class="cnt" style="display:inline-grid">${r.n}</span>` : ""}</td></tr>`).join("");
  return {crumbs: `<b>Projet de loi</b><span class="sep">›</span><b>Article 4</b><span class="sep">›</span><b>Grille des étapes</b>`,
    html: `<div class="hdr"><h1>${esc(NX.article.num)} · grille des étapes</h1>${esc(NX.article.intitule)}<br><span class="cmt">// une ligne par alinéa suivi d'étape en étape ; ● = modifié par rapport à l'étape précédente ; nombre = amendements de l'Assemblée sur l'alinéa</span></div>
    <div style="padding:6px 28px 60px 24px;overflow:auto"><table class="t grid-et"><thead><tr><th></th>${ETAPES.map(id => `<th>${esc(ETL[id])}</th>`).join("")}<th>Texte transmis</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>`};
};
VIEW.hist = o => {
  const H = NX.hist(o);
  const blocks = H.map((h, i) => `<div class="lens" style="padding-left:64px">${esc(ET[h.id].label)}${i ? h.same ? `<span class="s">·</span>inchangé` : h.absent ? `<span class="s">·</span>absent` : `<span class="s">·</span>modifié` : ""}</div>${line(i + 1, h.diff == null ? `<span style="color:var(--dim)">— (absent à cette étape)</span>` : h.diff, h.same ? "" : i ? "mod" : "")}`).join("");
  return {crumbs: `<b>Article 4</b><span class="sep">›</span><b>Alinéa ${o}</b><span class="sep">›</span><b>Historique</b>`,
    html: `<div class="hdr"><h1>Alinéa ${o}, d'étape en étape</h1><span class="cmt">// chaque étape comparée à la précédente : ajouts surlignés en vert, suppressions barrées</span></div><div class="doc">${blocks}
      <div class="ln"><div class="g"></div><div class="lens"><a data-amender="${o}">Amender cet alinéa dans l'atelier ↗</a><span class="s">|</span><a data-al="${o}" data-go="atelier">Voir ses ${concurrents(o).units.length} concurrents</a></div></div></div>`};
};
VIEW.art = num => {
  const p = NX.plan.find(x => x.num === num);
  const rows = Object.entries(p.amendements).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<tr><td>${esc(k)}</td><td class="num">${v}</td></tr>`).join("");
  return {crumbs: `<b>Projet de loi</b><span class="sep">›</span><b>Article ${esc(num)}</b>`, html: `<div class="md"><h1>Article ${esc(num)}</h1><p>${esc(p.intitule || "(sans intitulé)")}</p><blockquote>${esc(p.statut || "")}${p.cible ? "<br>Vise : " + esc(short(p.cible, 200)) : ""}</blockquote><h2>Amendements en commission (${p.n})</h2>${p.n ? `<table class="t"><tr><th>Sort</th><th>Nombre</th></tr>${rows}</table>` : "<p>Aucun.</p>"}${num === "4" ? `<p><a data-tabopen="grille">Ouvrir la grille des étapes de l'article 4</a></p>` : `<p style="color:var(--muted)">Seul l'article 4 est chargé en détail dans cette maquette.</p>`}</div>`};
};
VIEW.etape = id => {
  const L = ET[id].alineas.map((t, i) => line(i + 1, esc(t))).join("");
  return {crumbs: `<b>Article 4</b><span class="sep">›</span><b>${esc(ET[id].label)}</b>`, html: `<div class="hdr"><h1>${esc(ET[id].label)}</h1><span class="cmt">// numérotation propre à cette étape</span></div><div class="doc">${L}</div>`};
};

// --- l'atelier : le brouillon face à la référence
function lensFor(o){
  const n = concurrents(o).units.length, U = unitsOf(o);
  return `<div class="lens"><a data-cmd="panel-conc">${n} concurrent${n > 1 ? "s" : ""}</a><span class="s">|</span><a data-unit="${U[0] ? U[0].k : ""}">${U.length} passage${U.length > 1 ? "s" : ""} disputé${U.length > 1 ? "s" : ""}</a><span class="s">|</span><a data-cmd="diffmode">${st.diff === "inline" ? "Comparer côte à côte" : "Comparer en ligne"}</a><span class="s">|</span><a data-hist="${o}">Historique ↗</a><span class="s">|</span><a data-cmd="select">Sélectionner pour comparer</a></div>`;
}
function draftBody(m){
  if (st.editing) return `<div class="ln cur"><div class="g">${m.al}</div><div class="ed-wrap"><textarea id="ta" spellcheck="false">${esc(m.texte)}</textarea><div class="live" id="live">${liveHTML(refAl(m.al), m.texte)}</div><div class="btns"><button class="btn" data-cmd="valider">Valider ${kb("Ctrl Entrée")}</button><button class="btn sec2" data-cmd="annuler">Annuler ${kb("Échap")}</button></div></div></div>`;
  const marks = m.mode === "rediger" ? unitMarks(m.al, m.texte) : null;
  let html;
  if (st.diff === "side" && m.mode === "rediger"){
    return `<div class="split" style="--n:2"><div class="pane ref"><div class="pane-h"><b>Référence</b> · ${esc(refLabel())} <span style="margin-left:auto">vierge</span></div>${line(m.al, unitMarks(m.al, refAl(m.al)))}</div><div class="pane mine"><div class="pane-h"><b>${esc(draftNum(m))}</b> · corrections apparentes</div>${line(m.al, NX.unitsOnDiff(NX.draftDiff(m), m.al, m.texte), "mod")}</div></div>`;
  }
  html = m.mode === "rediger" ? NX.unitsOnDiff(NX.draftDiff(m), m.al, m.texte) : NX.draftDiff(m);
  return line(m.al, html, m.mode === "supprimer" ? "dl" : m.mode === "inserer" ? "add" : "mod cur", "") + (st.peek ? peekHTML(st.peek) : "");
}
VIEW.draft = id => {
  const m = MINE.find(x => x.id === id) || draft(); st.draft = m.id; st.o = m.al;
  const before = m.al > 1 ? line(m.al - 1, `<span style="color:var(--dim)">${esc(short(refAl(m.al - 1), 160))}</span>`) : "";
  const after = m.al < NAL ? line(m.al + 1, `<span style="color:var(--dim)">${esc(short(refAl(m.al + 1), 160))}</span>`) : "";
  return {crumbs: `<b>Atelier</b><span class="sep">›</span><b>${esc(draftNum(m))}</b><span class="sep">›</span><b>Alinéa ${m.al}</b><span class="sep">›</span><span>face à : ${esc(refShort())}</span>`,
    tools: `<button class="iconbtn${st.diff === "inline" ? " on" : ""}" data-cmd="diff-inline" title="Diff en ligne">${I.inline}</button><button class="iconbtn${st.diff === "side" ? " on" : ""}" data-cmd="diff-side" title="Diff côte à côte">${I.split}</button>`,
    html: `<div class="doc"><div class="hdr" style="padding-left:64px"><span class="cmt">// ${esc(draftLead(m))} — double-clic pour modifier ; ondulé = passage disputé (cliquer)</span></div>
      ${before}<div class="ln"><div class="g"></div>${lensFor(m.al)}</div>${draftBody(m)}${after}</div>`,
    after: () => { const ta = $("#ta"); if (ta){ ta.focus(); ta.addEventListener("input", () => { $("#live").innerHTML = liveHTML(refAl(m.al), ta.value); }); } }};
};
function peekHTML(k){
  const u = unitsOf(st.o).find(x => x.k === k); if (!u) return "";
  const C = clusters(u), sel = st.peekSel || 0, it = C.list[Math.min(sel, C.list.length - 1)];
  const ref = refAl(st.o), ctxA = ref.slice(Math.max(0, u.a - 80), u.a), ctxB = ref.slice(u.b, u.b + 80);
  const body = it.text == null ? `<del>${esc(C.ref)}</del>` : inlineDiff(C.ref, it.text);
  return `<div class="peek"><div class="peek-h"><b>« ${esc(u.label)} »</b><span style="color:var(--muted)">${C.list.length} rédactions distinctes · ${u.n} propositions</span><button class="iconbtn x" data-cmd="peek-close" title="Fermer (Échap)">${I.close}</button></div>
    <div class="peek-l mono"><span class="ctx">…${esc(ctxA)}</span><span class="c">${body}</span><span class="ctx">${esc(ctxB)}…</span><div style="margin-top:10px;font-family:var(--da-f-ui);font-size:12px;line-height:18px;color:var(--muted)">${it.items.map(x => `${dot(x.color)} ${esc(x.label)}${x.a ? ` · <a class="mono" data-am="${x.a.id}" style="cursor:pointer">${x.a.num}</a> · ${esc(sortWord(x.a))}` : ""}`).join("<br>")}</div></div>
    <div class="peek-r">${C.list.map((c, i) => `<div class="row${i === sel ? " on" : ""}" data-psel="${i}"><span class="lbl"><span style="font-family:var(--da-f-loi);font-size:13px">${c.text == null ? "<i>supprimé</i>" : esc(short(c.text, 60))}</span><br><span class="desc">${c.items.map(x => esc(x.label)).slice(0, 3).join(", ")}${c.items.length > 3 ? " +" + (c.items.length - 3) : ""}</span></span><span class="cnt">${c.items.length}</span></div>`).join("")}</div></div>`;
}
VIEW.am = id => {
  const a = AM[id], w = who(a), o = a.cible.al || st.o;
  const touched = [...new Set([...a.applique.rows.map(r => r.o).filter(Boolean), ...a.spans.map(s => s.al)])].sort((x, y) => x - y);
  const lines = touched.length ? touched.map(x => { const d = NX.amDiff(a, x); return d ? line(x, d, NX.amText(a, x) === null ? "dl" : "mod") : ""; }).join("") : line("", esc(a.dispositif || ""));
  const ins = []; for (const [k, l] of verOfAmendment(a).ins) l.forEach(t => ins.push(line("+", `<ins>${esc(t)}</ins>`, "add")));
  const ep = NX.epOf(a);
  return {crumbs: `<b>Atelier</b><span class="sep">›</span><b>Concurrents</b><span class="sep">›</span><b>${a.num}</b><span class="sep">›</span><span>face à : ${esc(refShort())}</span>`,
    tools: `<button class="iconbtn" data-cmd="select-am" data-id="${a.id}" title="Sélectionner pour comparer">${I.compare}</button>`,
    html: `<div class="hdr"><h1>${a.num} <span style="font-size:14px;color:var(--muted)">${dot(w.color)} ${esc(w.name)} · ${esc(a.auteur || "")}</span></h1><span class="${sortCls(a)}">${sortIcon(a)} ${esc(sortWord(a))}</span>${a.avis ? ` · avis ${esc(a.avis)}` : ""} · déposé le ${NX.fmtDate(a.depot)}${ep ? ` · <a class="mono" style="cursor:pointer" data-place="${ep.place}">place ${ep.place} en réunion ↗</a>` : ""}</div>
     <div class="doc"><div class="ln"><div class="g"></div><div class="lens"><span class="cmt mono">// ${esc(modeLead(a, o))}</span><span class="s">|</span><a data-cmd="select-am" data-id="${a.id}">Sélectionner pour comparer</a>${st.sel && st.sel !== a.id ? `<span class="s">|</span><a data-cmp="${a.id}">Comparer avec ${esc(st.sel.startsWith("M") ? "mon brouillon" : st.sel)}</a>` : ""}</div></div>${lines}${ins.join("")}</div>
     <div class="md" style="padding-top:0"><h2>Exposé sommaire</h2><p>${esc(a.expose || "—")}</p>${a.cartouche ? `<blockquote>${esc(a.cartouche)}</blockquote>` : ""}<h2>Versions</h2><table class="t">${a.versions.map(v => `<tr><td class="mono">${esc(v.date.replace("T", " "))}</td><td>${esc(v.etat)}${v.sort ? " · " + esc(v.sort) : ""}</td><td>${esc((v.champs || []).join(", "))}</td></tr>`).join("")}</table></div>`};
};
VIEW.cmp = ([x, y]) => {
  const side = id => id.startsWith("M") ? (() => { const m = MINE.find(z => z.id === id); return {label: draftNum(m), color: GR[ME].color, o: m.al, html: NX.draftDiff(m)}; })()
    : (() => { const a = AM[id], o = a.cible.al || st.o; return {label: a.num + " · " + who(a).name, color: who(a).color, o, html: NX.amDiff(a, o) || esc(a.dispositif)}; })();
  const A = side(x), B = side(y), o = A.o;
  return {crumbs: `<b>Atelier</b><span class="sep">›</span><b>Comparer</b><span class="sep">›</span><span>${esc(A.label)} ↔ ${esc(B.label)}</span>`,
    html: `<div class="split" style="--n:3"><div class="pane${x.startsWith("M") ? " mine" : ""}"><div class="pane-h">${dot(A.color)}<b>${esc(A.label)}</b></div>${line(o, A.html, "mod")}</div><div class="pane ref"><div class="pane-h"><b>Référence</b> · ${esc(refLabel())}</div>${line(o, esc(refAl(o)))}</div><div class="pane${y.startsWith("M") ? " mine" : ""}"><div class="pane-h">${dot(B.color)}<b>${esc(B.label)}</b></div>${line(B.o, B.html, "mod")}</div></div>`};
};
VIEW.article = () => {
  const L = verLines(myVer());
  const out = []; let run = [];
  const flush = () => { if (run.length > 2) out.push(`<div class="fold" data-cmd="unfold">${I.fold} ${run.length} alinéas inchangés (${run[0].o}–${run[run.length - 1].o}) · cliquer pour déplier</div>`); else run.forEach(l => out.push(line(l.o, esc(l.text)))); run = []; };
  for (const l of L){
    if (l.kind === "same" && !st.unfold){ run.push(l); continue; }
    flush();
    out.push(l.kind === "same" ? line(l.o, esc(l.text)) : l.kind === "del" ? line(l.o, `<del>${esc(refAl(l.o))}</del>`, "dl") : l.kind === "mod" ? line(l.o, inlineDiff(refAl(l.o), l.text), "mod") : line("+", `<ins>${esc(l.text)}</ins>`, "add"));
  }
  flush();
  return {crumbs: `<b>Atelier</b><span class="sep">›</span><b>Article 4 · votre version</b><span class="sep">›</span><span>face à : ${esc(refShort())}</span>`,
    tools: `<button class="iconbtn${st.unfold ? "" : " on"}" data-cmd="fold" title="Replier les zones inchangées">${I.fold}</button>`,
    html: `<div class="hdr"><h1>Article 4 · votre version</h1><span class="cmt">// tous vos brouillons appliqués au texte de référence</span></div><div class="doc">${out.join("")}</div>`};
};
VIEW.code = () => {
  const C = NX.code, blocks = C.lettres.map(l => {
    const av = (C.avant[l] || []).join("\n"), ap = (C.apresCommission[l] || []).join("\n");
    return `<div class="lens" style="padding-left:64px"><span class="kw">${l})</span> ${sameText(av, ap) ? "inchangé" : "modifié par la commission"}</div>` + line(l, sameText(av, ap) ? esc(short(ap, 300)) : inlineDiff(av, ap), sameText(av, ap) ? "" : "mod");
  }).join("");
  return {crumbs: `<b>Code général des impôts</b><span class="sep">›</span><b>Article 31</b><span class="sep">›</span><span>en vigueur → après commission</span>`, html: `<div class="hdr"><h1>${esc(C.article)}</h1><span class="cmt">// les instructions de l'article, appliquées mécaniquement : ce que le code deviendrait</span></div><div class="doc">${blocks}</div>`};
};
// --- enjeux : aperçu Markdown
VIEW.theme = id => {
  const th = THEMES.find(t => t.id === id), ams = NX.themeAms(th), als = themeAls(th), eps = NX.themeParoles(th);
  const mine = MINE.filter(m => als.includes(m.al));
  return {crumbs: `<b>Enjeux</b><span class="sep">›</span><b>${esc(th.label)}</b><span class="sep">›</span><span>Aperçu</span>`, html: `<div class="md">
    <h1>${esc(th.label)}</h1><p style="color:var(--muted)">Thème ${th.src === "déclaré" ? "déclaré par le rapport" : "calculé par mots-clés (dit comme tel)"} · ${ams.length} amendements · alinéas ${als.map(o => `<a data-al="${o}" data-go="atelier">${o}</a>`).join(", ") || "—"}</p>
    <h2>Ce que dit le rapport</h2><blockquote>${esc(th.doc || "—")}</blockquote>
    <h2>Ce qui a été dit en réunion</h2>${eps.length ? eps.slice(0, 6).map(e => `<p><a data-place="${e.place}">Place ${e.place}</a> — ${esc(short(e.titre, 120))}<br><span style="color:var(--muted)">${e.paroles.slice(0, 2).map(p => `<b>${esc(NX.speaker(p))}</b> : « ${esc(short(p.txt, 160))} »`).join("<br>")}</span></p>`).join("") : "<p>Rien en réunion.</p>"}
    <h2>Ce que fait votre texte</h2>${mine.length ? mine.map(m => `<p><a data-draft="${m.id}">${esc(draftNum(m))}</a> · alinéa ${m.al}</p><div class="al">${NX.draftDiff(m)}</div>`).join("") : "<p>Aucun de vos brouillons ne touche ce thème.</p>"}
    <h2>Les amendements (${ams.length})</h2><table class="t"><tr><th>N°</th><th>Groupe</th><th>Sort</th><th>Objet</th></tr>${ams.map(a => `<tr><td><a class="mono" data-am="${a.id}">${a.num}</a></td><td>${dot(who(a).color)} ${esc(who(a).name)}</td><td class="${sortCls(a)}">${sortIcon(a)} ${esc(sortWord(a))}</td><td>${esc(objetOf(a))}</td></tr>`).join("")}</table></div>`};
};
VIEW.matrice = () => {
  const M = NX.matrix(), max = Math.max(1, ...M.rows.flatMap(r => r.cells.map(c => c.length)));
  return {crumbs: `<b>Enjeux</b><span class="sep">›</span><b>Thèmes × groupes</b>`, html: `<div class="md" style="max-width:none"><h1>Thèmes × groupes</h1><p style="color:var(--muted)">Nombre d'amendements par thème et par groupe (une seule chose comptée). Cliquer une case ouvre le thème.</p>
    <div style="overflow:auto"><table class="t"><tr><th>Thème</th>${M.gs.map(g => `<th title="${esc(GR[g].name)}">${dot(GR[g].color)} ${g}</th>`).join("")}<th>Inst.</th></tr>${M.rows.map(r => `<tr><td><a data-th="${r.th.id}">${esc(r.th.label)}</a></td>${r.cells.map(c => `<td class="num heat" style="--v:${Math.round(c.length / max * 60)}" data-th="${r.th.id}">${c.length || ""}</td>`).join("")}<td class="num">${r.inst.length || ""}</td></tr>`).join("")}</table></div></div>`};
};
// --- réunion : notebook
VIEW.place = n => {
  const e = NX.episodes.find(x => x.place === n); st.place = n;
  const ams = e.ams.map(id => AM[id]).filter(Boolean);
  const vote = `<table class="t"><tr><th>#</th><th>Auteur</th><th>N°</th><th>Objet</th><th>Avis</th><th>Sort</th></tr>${ams.map((a, i) => `<tr data-am="${a.id}" style="cursor:pointer"><td>${i + 1}</td><td>${dot(who(a).color)} ${esc(who(a).name)}</td><td class="mono">${a.num}</td><td>${esc(objetOf(a))}</td><td>${avisSym(a.avis)}</td><td class="${sortCls(a)}">${esc(sortWord(a))}</td></tr>`).join("")}</table>`;
  let k = 0;
  const cells = `<div class="cellnb"><div class="ex">[${++k}]</div><div class="src">${vote}</div></div>`
    + e.paroles.map(p => `<div class="cellnb"><div class="ex">[${++k}]</div><div class="src"><div class="who">${p.groupe ? dot(NX.groupColor(p.groupe)) : dot("var(--da-encre-3)")}<b>${esc(NX.speaker(p))}</b> · ${p.mots} mots</div>${esc(p.txt)}</div></div>`).join("")
    + e.decisions.map(d => `<div class="cellnb"><div class="ex"></div><div class="out"><span class="kw">→</span> ${esc(d.txt)}</div></div>`).join("");
  const total = NX.episodes.reduce((s, x) => s + x.mots, 0); let y = 0;
  const mm = NX.episodes.map(x => { const h = Math.max(3, x.mots / total * 100); const el = `<div class="mm-place${x.ams.some(id => AM[id] && AM[id].sort === "Adopté") ? " ad" : ""}${x.place === n ? " on" : ""}" style="top:${y}%;height:calc(${h}% - 2px)" data-place="${x.place}" title="Place ${x.place} · ${x.mots} mots"></div>`; y += x.mots / total * 100; return el; }).join("");
  return {crumbs: `<b>Réunion du 21 septembre 2026</b><span class="sep">›</span><b>Place ${n} sur ${NX.episodes.length}</b>`,
    html: `<div class="hdr" style="padding-left:24px"><h1 style="font-size:20px">${esc(e.titre)}</h1>${e.mots} mots · ${e.paroles.length} prises de parole</div><div style="padding:8px 0 60px 4px">${cells}</div>`, minimap: mm};
};

/* ---------- panneau et barre d'état ---------- */
function renderPanel(){
  const P = $("#panel"); P.classList.toggle("off", !st.panel || st.esp !== "atelier");
  if (st.esp !== "atelier") return;
  const C = concurrents(st.o), f = st.filter.toLowerCase();
  const all = [...C.units.map(u => u.lead), ...C.ecartes.map(u => u.lead)];
  const match = a => !f || [a.num, who(a).name, sortWord(a), objetOf(a), a.groupe].join(" ").toLowerCase().includes(f);
  const byG = new Map(); for (const u of [...C.units, ...C.ecartes]){ if (!match(u.lead)) continue; const g = who(u.lead).name; if (!byG.has(g)) byG.set(g, []); byG.get(g).push(u); }
  const body = [...byG].map(([g, L]) => `<div class="p-group">${dot(who(L[0].lead).color)} ${esc(g)} <span class="cnt">${L.length}</span></div>` + L.map(u => { const a = u.lead; return `<div class="prob" data-am="${a.id}"><span class="ico-s ${sortCls(a)}">${sortIcon(a)}</span><span class="n">${a.num}</span>${u.members.length > 1 ? `<span class="cnt" title="${u.kind === "ident" ? "identiques" : "série"}">${u.members.length}</span>` : ""}<span class="o">${esc(objetOf(a) || modeLead(a, st.o))}</span><span class="s">${esc(sortWord(a))}</span></div>`; }).join("")).join("");
  P.innerHTML = `<div class="p-tabs"><span class="p-tab on">Concurrents <span class="cnt">${all.length}</span></span><span class="p-tab">Alinéa ${st.o}</span><span class="filter"><input class="input" id="pf" placeholder="Filtrer (ex. adopté, SOL, classe)" value="${esc(st.filter)}"><button class="iconbtn" data-cmd="panel-close" title="Fermer le panneau">${I.close}</button></span></div><div class="p-body">${body || `<div class="empty">Aucun concurrent ne correspond.</div>`}</div>`;
  $("#pf").addEventListener("input", e => { st.filter = e.target.value; const pos = e.target.selectionStart; renderPanel(); const n = $("#pf"); n.focus(); n.setSelectionRange(pos, pos); });
}
function renderStatus(){
  const m = draft(), n = concurrents(st.o).units.length;
  $("#status").innerHTML = `<span class="it rem" title="Le dossier">${I.branch} DLR5L17N54608</span>
    <span class="it" data-cmd="ref" title="Choisir la référence">face à : ${esc(refShort())}</span>
    ${st.esp === "atelier" ? `<span class="it hide-s" data-draft="${m.id}">✎ ${esc(draftNum(m))} · al. ${m.al}</span>` : ""}
    <span class="sp"></span>
    <span class="it" data-cmd="panel-conc" title="Concurrents de l'alinéa ${st.o}">⚠ ${n}</span>
    <span class="it hide-s">Alinéa ${st.o} / ${NAL}</span>
    <span class="it hide-s">${st.diff === "inline" ? "Diff en ligne" : "Diff côte à côte"}</span>
    <span class="it hide-s">${esc(SPACES.find(s => s.id === st.esp).label)}</span>
    <span class="it" title="Notifications">${I.bell}</span>`;
}

/* ---------- palette de commandes et aller à ---------- */
const COMMANDS = () => [
  ...SPACES.map((s, i) => ({t:`Espace : ${s.label}`, d:"", k:`Ctrl Maj ${i + 1}`, run:() => go(s.id)})),
  {t:"Atelier : nouveau brouillon sur l'alinéa courant", run:() => cmd("new")},
  {t:"Atelier : ouvrir l'article (votre version)", run:() => cmd("open-article")},
  {t:"Atelier : ouvrir le code général des impôts, art. 31", run:() => cmd("open-code")},
  {t:"Diff : en ligne", run:() => cmd("diff-inline")}, {t:"Diff : côte à côte", run:() => cmd("diff-side")},
  ...ETAPES.map(id => ({t:`Référence : ${ET[id].label}`, d:id === REF ? "actuelle" : "", run:() => setRef(id)})),
  {t:"Affichage : barre latérale", k:"Ctrl B", run:() => cmd("side")}, {t:"Affichage : panneau des concurrents", k:"Ctrl J", run:() => cmd("panel")},
  {t:`Préférences : thème ${st.theme === "dark" ? "Light Modern" : "Dark Modern"}`, run:() => cmd("theme")},
  {t:"Aide : Lisez-moi", run:() => { go("dossier"); openTab("dossier", {k:"lisez", t:"Lisez-moi", kind:"lisez"}, true); render(); }},
];
const QUICK = () => [
  ...Array.from({length: NAL}, (_, i) => ({t:`Alinéa ${i + 1}`, d:NX.alShort(i + 1, 70), run:() => { st.o = i + 1; openHist(i + 1); }})),
  ...ALL.filter(a => a.mode !== "hors-texte").map(a => ({t:a.num, d:`${who(a).name} · ${sortWord(a)} · ${objetOf(a)}`, run:() => openAm(a.id)})),
  ...THEMES.map(t => ({t:`# ${t.label}`, d:"thème", run:() => { st.th = t.id; go("enjeux"); openTab("enjeux", {k:"th:" + t.id, t:"Thème · " + t.label, kind:"theme", arg:t.id, icon:"#"}); render(); }})),
  ...NX.episodes.map(e => ({t:`Place ${e.place}`, d:e.titre, run:() => openPlace(e.place)})),
];
let QP = null;
function palette(mode){
  QP = {mode, items: mode === "cmd" ? COMMANDS() : QUICK(), i:0};
  $("#qp").style.display = "block"; const inp = $("#qp-in"); inp.value = mode === "cmd" ? ">" : ""; inp.placeholder = mode === "cmd" ? "Tapez le nom d'une commande" : "Aller à un alinéa, un amendement (CE…), un thème, une place"; inp.focus(); qpRender();
}
function qpRender(){
  const q = $("#qp-in").value.replace(/^>/, "").trim().toLowerCase();
  const L = QP.items.filter(x => !q || (x.t + " " + (x.d || "")).toLowerCase().includes(q)).slice(0, 60);
  QP.list = L; QP.i = Math.min(QP.i, Math.max(0, L.length - 1));
  const hl = s => { if (!q) return esc(s); const i = s.toLowerCase().indexOf(q); return i < 0 ? esc(s) : esc(s.slice(0, i)) + "<b>" + esc(s.slice(i, i + q.length)) + "</b>" + esc(s.slice(i + q.length)); };
  $("#qp-list").innerHTML = L.map((x, i) => `<div class="it${i === QP.i ? " on" : ""}" data-qi="${i}"><span>${hl(x.t)}</span><span class="d">${esc(x.d || "")}</span>${x.k ? `<span class="k">${kb(x.k)}</span>` : ""}</div>`).join("") || `<div class="it"><span class="d">Aucun résultat</span></div>`;
  const on = $("#qp-list .on"); if (on) on.scrollIntoView({block:"nearest"});
}
function qpClose(){ QP = null; $("#qp").style.display = "none"; }
function qpRun(i){ const x = QP.list[i]; qpClose(); if (x) x.run(); }

/* ---------- actions ---------- */
function toast(msg, act){
  const t = document.createElement("div"); t.className = "toast"; t.innerHTML = `<span class="i">${I.info}</span><span>${msg}</span><span class="a">${act || ""}<button class="iconbtn" aria-label="Fermer">${I.close}</button></span>`;
  $("#toasts").appendChild(t); t.querySelector(".a button:last-child").onclick = () => t.remove(); setTimeout(() => t.remove(), 10000);
  while ($("#toasts").children.length > 3) $("#toasts").firstChild.remove();
}
function go(esp){ st.esp = esp; st.peek = null; st.editing = false; if (innerWidth <= 720) st.side = false; render(); }
window.allerA = go;
function setRef(id){ REF = id; store.set("ref", id); toast(`Référence : ${esc(ET[id].label)}. La référence reste vierge ; les corrections sont portées sur les rédactions comparées.`); render(); }
function openDraft(id){ st.draft = id; const m = draft(); st.o = m.al; st.esp = "atelier"; openTab("atelier", {k:"d:" + id, t:draftNum(m) + " · al. " + m.al, kind:"draft", arg:id, icon:"✎"}, true); st.peek = null; render(); }
function openAm(id){ const a = AM[id]; if (a.cible.al) st.o = a.cible.al; st.esp = "atelier"; openTab("atelier", {k:"a:" + id, t:a.num, kind:"am", arg:id, icon:"⚑"}); st.peek = null; render(); }
function openHist(o){ st.o = o; st.esp = "dossier"; openTab("dossier", {k:"h:" + o, t:"Alinéa " + o + " · historique", kind:"hist", arg:o, icon:"⏱"}); render(); }
function openPlace(n){ st.place = n; st.esp = "reunion"; openTab("reunion", {k:"place:" + n, t:"Place " + n, kind:"place", arg:n, icon:"▶"}); render(); }
function cmd(c, el){
  switch (c){
    case "palette": return palette("cmd");
    case "quick": return palette("quick");
    case "theme": st.theme = st.theme === "dark" ? "light" : "dark"; return render();
    case "side": st.side = !st.side; return render();
    case "panel": st.panel = !st.panel; return render();
    case "panel-close": st.panel = false; return render();
    case "panel-conc": st.panel = true; if (st.esp !== "atelier") st.esp = "atelier"; return render();
    case "diffmode": st.diff = st.diff === "inline" ? "side" : "inline"; return render();
    case "diff-inline": st.diff = "inline"; return render();
    case "diff-side": st.diff = "side"; return render();
    case "fold": st.unfold = !st.unfold; return render();
    case "unfold": st.unfold = true; return render();
    case "peek-close": st.peek = null; return render();
    case "new": { const m = newDraft(st.o); toast(`${esc(draftNum(m))} créé sur l'alinéa ${st.o}, à partir de la référence.`); return openDraft(m.id); }
    case "open-article": st.esp = "atelier"; openTab("atelier", {k:"article", t:"Article 4 · votre version", kind:"article", icon:"§"}, true); return render();
    case "open-code": st.esp = "atelier"; openTab("atelier", {k:"code", t:"CGI · art. 31", kind:"code", icon:"§"}, true); return render();
    case "select": st.sel = st.draft; toast(`${esc(draftNum(draft()))} sélectionné pour comparer. Ouvrez un concurrent puis « Comparer avec… ».`); return render();
    case "select-am": st.sel = el.dataset.id; toast(`${esc(st.sel)} sélectionné pour comparer.`); return render();
    case "valider": { const m = draft(); m.texte = $("#ta").value; saveDrafts(); UNIT_CACHE.clear(); st.editing = false; toast(`${esc(draftNum(m))} enregistré.`); return render(); }
    case "annuler": st.editing = false; return render();
    case "ref": return palette("cmd"), ($("#qp-in").value = ">Référence", qpRender());
  }
}

/* ---------- gestes ---------- */
document.addEventListener("click", e => {
  const t = e.target.closest("[data-esp],[data-cmd],[data-tab],[data-close],[data-draft],[data-al],[data-hist],[data-art],[data-etape],[data-unit],[data-psel],[data-am],[data-cmp],[data-th],[data-place],[data-open],[data-go],[data-amender],[data-tabopen],[data-sec] .sec-h,[data-qi],mark.pt");
  if (!t){ if (!e.target.closest("#qp") && QP) qpClose(); return; }
  if (t.matches(".sec-h")){ const s = t.parentElement.dataset.sec; st.closed[s] = !st.closed[s]; return render(); }
  const d = t.dataset;
  if (d.qi != null) return qpRun(+d.qi);
  if (d.close){ e.stopPropagation(); return closeTab(st.esp, d.close); }
  if (d.esp){ if (st.esp === d.esp && innerWidth > 720){ st.side = !st.side; return render(); } if (innerWidth <= 720 && st.esp === d.esp){ st.side = !st.side; return render(); } return go(d.esp); }
  if (d.cmd) return cmd(d.cmd, t);
  if (d.tab){ ACTIVE[st.esp] = d.tab; const x = TABS[st.esp].find(z => z.k === d.tab); if (x && x.kind === "draft") st.draft = x.arg; return render(); }
  if (t.matches("mark.pt") || d.unit != null){ const k = t.matches("mark.pt") ? +t.dataset.u : +d.unit; if (Number.isNaN(k)) return; if (st.esp !== "atelier" || (TABS.atelier.find(x => x.k === ACTIVE.atelier) || {}).kind !== "draft") openDraft(MINE.find(m => m.al === st.o)?.id || st.draft); st.diff = "inline"; st.peek = k; st.peekSel = 0; return render(); }
  if (d.psel != null){ st.peekSel = +d.psel; return render(); }
  if (d.draft) return openDraft(d.draft);
  if (d.amender){ const o = +d.amender, m = MINE.find(x => x.al === o) || newDraft(o); return openDraft(m.id); }
  if (d.go && d.al){ st.o = +d.al; const m = MINE.find(x => x.al === st.o); if (m) return openDraft(m.id); st.esp = "atelier"; st.panel = true; return render(); }
  if (d.al){ st.o = +d.al; const m = MINE.find(x => x.al === st.o); if (m) return openDraft(m.id); st.panel = true; return render(); }
  if (d.hist) return openHist(+d.hist);
  if (d.art){ if (d.art === "4"){ openTab("dossier", {k:"grille", t:"Article 4 · grille des étapes", kind:"grille"}, true); return render(); } openTab("dossier", {k:"art:" + d.art, t:"Article " + d.art, kind:"art", arg:d.art, icon:"§"}); return render(); }
  if (d.etape){ openTab("dossier", {k:"e:" + d.etape, t:ET[d.etape].label, kind:"etape", arg:d.etape, icon:"§"}); return render(); }
  if (d.cmp){ st.esp = "atelier"; openTab("atelier", {k:"cmp:" + st.sel + ":" + d.cmp, t:"Comparer", kind:"cmp", arg:[st.sel, d.cmp], icon:"⇆"}, true); return render(); }
  if (d.am) return openAm(d.am);
  if (d.th){ st.th = d.th; st.esp = "enjeux"; const th = THEMES.find(x => x.id === d.th); openTab("enjeux", {k:"th:" + d.th, t:"Thème · " + th.label, kind:"theme", arg:d.th, icon:"#"}); return render(); }
  if (d.place) return openPlace(+d.place);
  if (d.open === "matrice"){ openTab("enjeux", {k:"matrice", t:"Thèmes × groupes", kind:"matrice", icon:"▦"}, true); return render(); }
  if (d.open === "article") return cmd("open-article");
  if (d.open === "code") return cmd("open-code");
  if (d.tabopen){ ACTIVE[st.esp] = d.tabopen; return render(); }
  if (d.go) return go(d.go);
});
document.addEventListener("dblclick", e => {
  if (st.esp !== "atelier" || st.editing || e.target.closest("mark.pt")) return;
  const t = TABS.atelier.find(x => x.k === ACTIVE.atelier);
  if (t && t.kind === "draft" && e.target.closest(".ln.cur, .split .pane:last-child .ln") && draft().mode !== "supprimer"){ st.editing = true; st.peek = null; render(); }
});
$("#cc").onclick = () => palette("quick");
$("#b-side").onclick = () => cmd("side"); $("#b-panel").onclick = () => cmd("panel");
$("#qp-in").addEventListener("input", () => { QP.i = 0; if (QP.mode === "quick" && $("#qp-in").value.startsWith(">")){ QP.mode = "cmd"; QP.items = COMMANDS(); } qpRender(); });
document.addEventListener("keydown", e => {
  const k = e.key, ctrl = e.ctrlKey || e.metaKey;
  if (QP){
    if (k === "Escape"){ e.preventDefault(); return qpClose(); }
    if (k === "ArrowDown"){ e.preventDefault(); QP.i = Math.min(QP.list.length - 1, QP.i + 1); return qpRender(); }
    if (k === "ArrowUp"){ e.preventDefault(); QP.i = Math.max(0, QP.i - 1); return qpRender(); }
    if (k === "Enter"){ e.preventDefault(); return qpRun(QP.i); }
    return;
  }
  if (st.editing){ if (k === "Escape"){ e.preventDefault(); return cmd("annuler"); } if (k === "Enter" && ctrl){ e.preventDefault(); return cmd("valider"); } return; }
  if (e.target.matches("input,textarea")) return;
  if (k === "F1" || (ctrl && e.shiftKey && k.toLowerCase() === "p")){ e.preventDefault(); return palette("cmd"); }
  if (ctrl && k.toLowerCase() === "p"){ e.preventDefault(); return palette("quick"); }
  if (ctrl && k.toLowerCase() === "b"){ e.preventDefault(); return cmd("side"); }
  if (ctrl && k.toLowerCase() === "j"){ e.preventDefault(); return cmd("panel"); }
  if (ctrl && e.shiftKey && /^[1-4]$/.test(k)){ e.preventDefault(); return go(SPACES[+k - 1].id); }
  if (ctrl && e.shiftKey && /Digit[1-4]/.test(e.code)){ e.preventDefault(); return go(SPACES[+e.code.slice(5) - 1].id); }
  if (k === "Escape"){ if (st.peek != null){ st.peek = null; return render(); } }
  if (e.altKey && k === "F12" && st.esp === "atelier"){ const U = unitsOf(st.o); if (U[0]){ st.peek = U[0].k; st.peekSel = 0; render(); } }
});
// survol d'un passage disputé : carte d'information (hover)
let hovT = null;
document.addEventListener("mouseover", e => {
  const m = e.target.closest("mark.pt"); const H = $("#hover");
  if (!m){ if (!e.target.closest("#hover")){ clearTimeout(hovT); hovT = setTimeout(() => H.style.display = "none", 250); } return; }
  clearTimeout(hovT);
  const u = unitsOf(st.o).find(x => x.k === +m.dataset.u); if (!u) return;
  const r = m.getBoundingClientRect();
  H.innerHTML = `<div class="hb"><b>Passage disputé</b> · « ${esc(u.label)} »<br><span style="color:var(--muted)">${u.n} propositions le modifient.</span></div><div class="hf"><a data-unit="${u.k}">Voir les propositions</a><span style="color:var(--muted)">${kb("Alt F12")}</span></div>`;
  H.style.display = "block"; H.style.left = Math.min(r.left, innerWidth - 450) + "px"; H.style.top = (r.bottom + 6) + "px";
});

render();
if (!store.get("vu", false)){ toast("Maquette inspirée de VS Code. <b>F1</b> ouvre la palette de commandes ; le Lisez-moi (espace Dossier) dit ce qui est emprunté.", `<button class="btn sec2" data-go="dossier">Lisez-moi</button>`); store.set("vu", true); }
