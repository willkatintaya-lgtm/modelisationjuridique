/* Boussole · inspiration Raycast — une fenêtre flottante, une pile de vues (Échap revient), un panneau d'actions ⌘K.
   S'appuie sur le noyau commun (données réelles, groupes fictifs). Tout est enfermé dans une fonction : aucun nom global ajouté, sauf allerA. */
(() => {
"use strict";

/* ---------- icônes au trait (grille 24) ---------- */
const P = d => `<svg viewBox="0 0 24 24">${d}</svg>`;
const I = {
  search: P('<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>'),
  folder: P('<path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/>'),
  pencil: P('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>'),
  grid: P('<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>'),
  people: P('<circle cx="9" cy="8" r="3"/><path d="M3.5 19.5c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5"/><circle cx="17" cy="9" r="2.3"/><path d="M15.8 14.2c2.6.4 4.7 2.6 4.7 5.3"/>'),
  doc: P('<path d="M14 3.5H7a1.5 1.5 0 0 0-1.5 1.5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3.5V8h4.5M9 12.5h6M9 16h6"/>'),
  book: P('<path d="M5 4.5h9a3 3 0 0 1 3 3v12H8a3 3 0 0 1-3-3z"/><path d="M5 16.5a3 3 0 0 1 3-3h9"/>'),
  table: P('<rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="M3.5 10h17M3.5 14.5h17M9.5 5v14"/>'),
  columns: P('<rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="M9.2 5v14M14.8 5v14"/>'),
  plus: P('<path d="M12 5v14M5 12h14"/>'),
  check: P('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
  x: P('<path d="M6 6l12 12M18 6L6 18"/>'),
  clock: P('<circle cx="12" cy="12" r="8"/><path d="M12 7.5V12l3 2"/>'),
  copy: P('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),
  sun: P('<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>'),
  moon: P('<path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z"/>'),
  expand: P('<path d="M14 4.5h5.5V10M10 19.5H4.5V14M19.5 4.5l-6 6M4.5 19.5l6-6"/>'),
  shrink: P('<path d="M19.5 4.5l-6 6M13.5 6v4.5H18M4.5 19.5l6-6M10.5 18v-4.5H6"/>'),
  bar: P('<rect x="3.5" y="9" width="17" height="6" rx="3"/>'),
  info: P('<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.1"/>'),
  home: P('<path d="M4 11l8-6.5 8 6.5"/><path d="M6 9.5v10h12v-10"/>'),
  bookmark: P('<path d="M7 4h10v16l-5-3.5L7 20z"/>'),
  trash: P('<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/>'),
  flag: P('<path d="M5.5 21V4M5.5 4.5h11l-2 4 2 4h-11"/>'),
  quote: P('<path d="M5 6h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-6l-4 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/>'),
  layers: P('<path d="M12 4l8.5 4.5L12 13 3.5 8.5z"/><path d="M3.5 12.5L12 17l8.5-4.5M3.5 16.5L12 21l8.5-4.5"/>'),
  arrow: P('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  swap: P('<path d="M7 7h12l-3-3M17 17H5l3 3"/>'),
  undo: P('<path d="M9 7L4.5 11.5 9 16"/><path d="M5 11.5h9a5 5 0 0 1 0 10h-2"/>'),
  sparkle: P('<path d="M12 3.5l1.8 5.2 5.2 1.8-5.2 1.8L12 17.5l-1.8-5.2L5 10.5l5.2-1.8z"/>'),
  chev: '<svg viewBox="0 0 24 24" style="width:14px;height:14px"><path d="M7 10l5 5 5-5"/></svg>',
  hash: P('<path d="M9.5 4l-2 16M16.5 4l-2 16M4.5 9h15M4 15h15"/>'),
  place: P('<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>'),
};
const ai = (svg, c) => `<span class="ai" style="--c:${c}">${svg}</span>`;
const li = (svg, c) => `<span class="li"${c ? ` style="--c:${c}"` : ""}>${svg}</span>`;
const dot = c => `<span class="dot" style="--c:${c}"></span>`;
const numI = n => `<span class="num">${n}</span>`;
const tagCls = c => c && c[0] === "#" ? "tag g" : "tag";
const tag = (t, c, attr) => `<span class="${tagCls(c)}" style="--c:${c || "var(--text2)"}"${attr || ""}>${esc(t)}</span>`;
const KEYN = {mod:"⌘", alt:"⌥", shift:"⇧", ctrl:"⌃", enter:"↵", esc:"esc", backspace:"⌫", up:"↑", down:"↓"};
const kc = sc => `<span class="kcs">${sc.split("+").map(k => `<span class="kc">${esc(KEYN[k] || k.toUpperCase())}</span>`).join("")}</span>`;
const N = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const narrow = () => innerWidth <= 720;

/* ---------- préférences ---------- */
const UI = Object.assign({theme: "dark", large: false, compact: false, seen: false}, store.get("ui", {}));
const saveUI = () => store.set("ui", UI);
let CMP = store.get("cmp", []).filter(id => id && (id[0] === "M" ? MINE.some(m => m.id === id) : AM[id]));
const saveCmp = () => store.set("cmp", CMP);

/* ---------- sorts, groupes ---------- */
const SC = {adopte: "var(--da-encre)", rejete: "var(--da-encre-3)", tombe: "var(--da-encre-3)", retire: "var(--da-encre-3)", ns: "var(--da-encre-3)", ecarte: "var(--da-encre-3)", attente: "var(--da-encre-3)"};
const sortTag = a => tag(cap(sortWord(a).split(" · ")[0]), SC[NX.sortKey(a)], ` data-sort="${NX.sortKey(a)}"`);
const gcol = a => a.inst ? "var(--text2)" : (GR[a.groupe] || {}).color || "var(--text2)";
const gabbr = a => a.inst ? (a.inst === "rapporteure" ? "Rapp." : "Rapp. avis") : a.groupe;
const ME_C = GR[ME].color;
const modeWord = m => m.mode === "supprimer" ? "supprimer" : m.mode === "inserer" ? "insérer" : "rédiger";
const modeCol = m => m.mode === "supprimer" ? "var(--red)" : m.mode === "inserer" ? "var(--green)" : "var(--blue)";
const draftsOn = o => MINE.filter(m => m.al === o);
const amAls = a => [...new Set([...a.applique.rows.map(r => r.o || (r.fin ? null : r.at)).filter(x => x), ...a.spans.map(s => s.al)])].filter(o => o >= 1 && o <= NAL).sort((x, y) => x - y);
const amAl = a => a.cible.al || amAls(a)[0] || null;
const adopted = e => e.ams.some(id => AM[id] && AM[id].sort === "Adopté");
const placeShort = e => e.titre.replace(/^Amendements? /, "").replace(/^de /, "");

/* ---------- blocs de texte : la référence vierge, et les rédactions (la mienne ou une autre) en corrections apparentes ---------- */
function refBlock(o){
  const t = refAl(o);
  return `<div class="tb" data-o="${o}"><div class="tb-h">Référence · ${esc(refShort())} ${tag("vierge")}</div><div class="lx ref">${t ? esc(t) : '<span class="ctx">— absent à cette étape</span>'}</div></div>`;
}
function mineBlock(m){
  const html = m.mode === "rediger" ? NX.unitsOnDiff(NX.draftDiff(m), m.al, m.texte) : NX.draftDiff(m);
  return `<div class="tb" data-o="${m.al}"><div class="tb-h">Ma rédaction · ${esc(draftNum(m))} ${tag(GR[ME].name, ME_C)}</div><div class="lx mine" data-edit="${m.id}" title="Double-clic pour modifier">${html}</div></div>`;
}
function theirBlock(a, o){
  const d = NX.amDiff(a, o), t = NX.amText(a, o);
  const html = d == null ? `<span class="ctx">${esc(a.dispositif || "")}</span>` : typeof t === "string" ? NX.unitsOnDiff(d, o, t) : d;
  return `<div class="tb" data-o="${o}"><div class="tb-h">Sa rédaction · ${esc(a.num)} ${tag(who(a).name, gcol(a))}</div><div class="lx">${html}</div></div>`;
}
const meta = rows => rows.map(r => r === "-" ? `<div class="msep"></div>` : `<div class="mrow"><span class="ml">${esc(r[0])}</span><span class="mv">${r[1]}</span></div>`).join("");
const unitTags = o => unitsOf(o).map(u => tag(`« ${short(u.label, 22)} » ${u.n}`, "var(--yellow)", ` data-u="${u.k}" data-o="${o}" title="Voir les propositions"`)).join("") || '<span class="empty-note">aucun</span>';

/* ---------- actions ---------- */
const A = (t, icon, run, sc, x) => Object.assign({t, icon, run, sc}, x || {});
const asSecs = x => !x || !x.length ? [] : x[0].items ? x : [{items: x}];
function globalSecs(){
  return [{title: "Boussole", items: [
    A("Changer la référence…", I.bookmark, null, "alt+r", {sub: () => [{title: "Référence vierge", items: ETAPES.map(id => A(ET[id].label, id === REF ? I.check : I.doc, () => setRef(id)))}]}),
    A(UI.large ? "Fenêtre normale" : "Grande fenêtre", UI.large ? I.shrink : I.expand, () => { UI.large = !UI.large; saveUI(); render(); }, "alt+l"),
    A(UI.theme === "dark" ? "Thème clair" : "Thème sombre", UI.theme === "dark" ? I.sun : I.moon, () => { UI.theme = UI.theme === "dark" ? "light" : "dark"; saveUI(); render(); }, "alt+t"),
    A(UI.compact ? "Quitter le mode compact" : "Mode compact", I.bar, () => { UI.compact = !UI.compact; saveUI(); render(); toast("success", UI.compact ? "Mode compact" : "Mode compact désactivé", UI.compact ? "la racine se réduit à la barre de recherche" : ""); }, "alt+m"),
    A("Revenir à la racine", I.home, toRoot, "mod+esc"),
    A("Lisez-moi · à propos", I.info, () => push(readmeV()), "alt+i"),
  ]}];
}
function setRef(id){ REF = id; store.set("ref", id); render(); toast("success", "Référence : " + ET[id].court, "elle reste vierge ; les corrections sont portées sur les rédactions"); }
function copy(text){
  const ok = () => toast("success", "Copié dans le presse-papiers"), ko = () => toast("failure", "Copie impossible", "le navigateur refuse l'accès au presse-papiers");
  try { navigator.clipboard.writeText(text).then(ok, ko); } catch (_){ ko(); }
}
function addCmp(id){
  if (CMP.includes(id)) return toast("success", "Déjà dans le comparateur", `${CMP.length}/2`);
  CMP.push(id); if (CMP.length > 2) CMP.shift(); saveCmp();
  toast("success", `Ajouté au comparateur · ${CMP.length}/2`, CMP.length === 2 ? "" : "ajoutez une autre rédaction", CMP.length === 2 ? {t: "Comparer", run: () => push(cmpV(CMP[0], CMP[1]))} : null);
}
const cmpLabel = id => id[0] === "M" ? draftNum(MINE.find(m => m.id === id) || MINE[0]) : id;

/* ---------- la pile de navigation ---------- */
let STACK = [];
const cur = () => STACK[STACK.length - 1];
function push(v){ STACK.push(v); closeAll(); render(); }
function pop(){ if (STACK.length > 1){ STACK.pop(); closeAll(); render(); } }
function toRoot(){ STACK = [ROOT]; ROOT.q = ""; closeAll(); render(); }
function setStack(L){ STACK = L; closeAll(); render(); }
const spaceOf = () => { for (let i = STACK.length - 1; i >= 0; i--) if (STACK[i].space) return STACK[i].space; return null; };

/* passages entre espaces : on emporte l'objet courant */
const openAtelierAl = (o, focus) => setStack([ROOT, atelierV(), alineaV(o, focus)]);
function openAm(id){
  const a = AM[id], o = amAl(a);
  if (o && a.mode !== "supprimer-article" && a.mode !== "rediger-article") setStack([ROOT, atelierV(), alineaV(o, "a:" + id)]);
  else setStack([ROOT, atelierV(), amV(id)]);
}
const openPlace = n => setStack([ROOT, reunionV("p:" + n)]);
const openTheme = id => setStack([ROOT, enjeuxV("t:" + id), themeV(id)]);
function amend(o){
  let m = draftsOn(o)[0];
  if (m) return setStack([ROOT, atelierV(), alineaV(o, "m:" + m.id)]);
  m = newDraft(o); UNIT_CACHE.clear();
  setStack([ROOT, atelierV(), alineaV(o, "m:" + m.id), formV(m)]);
  toast("success", `${draftNum(m)} créé`, `sur l'alinéa ${o}, à partir du texte transmis`);
}

/* ---------- éléments de liste réutilisés ---------- */
const SPACES = {
  dossier: {t: "Dossier", sub: "Le projet de loi, l'article 4 d'étape en étape", c: "var(--blue)", icon: I.folder},
  atelier: {t: "Atelier", sub: "Mes brouillons face à la référence, les concurrents", c: "var(--orange)", icon: I.pencil},
  enjeux: {t: "Enjeux", sub: "Les thèmes, la matrice thèmes × groupes", c: "var(--purple)", icon: I.grid},
  reunion: {t: "Réunion", sub: "La commission du 21 septembre 2026, place par place", c: "var(--green)", icon: I.people},
};
const spaceIcon = s => ai(SPACES[s].icon, SPACES[s].c);
const openSpace = s => setStack([ROOT, {dossier: dossierV, atelier: atelierV, enjeux: enjeuxV, reunion: reunionV}[s]()]);

function itemDraft(m, ctx){
  const n = concurrents(m.al).units.length;
  return {key: "m:" + m.id, icon: li(I.pencil, ME_C), title: draftNum(m), sub: `alinéa ${m.al} · ${short(m.mode === "supprimer" ? refAl(m.al) : m.texte, 80)}`, kw: m.texte,
    acc: [{tag: modeWord(m), c: modeCol(m)}, ctx === "root" ? {text: "Brouillon"} : {text: `${n} conc.`, tip: `${n} concurrents sur l'alinéa ${m.al}`}],
    detail: () => draftDetail(m),
    actions: () => [
      ctx === "alinea" ? A("Modifier le texte", I.pencil, () => push(formV(m)), "mod+e") : A(`Ouvrir l'alinéa ${m.al}`, I.arrow, () => ctx === "root" ? openAtelierAl(m.al, "m:" + m.id) : push(alineaV(m.al, "m:" + m.id))),
      ctx === "alinea" ? A("Ajouter au comparateur", I.columns, () => addCmp(m.id), "alt+a") : A("Modifier le texte", I.pencil, () => ctx === "root" ? setStack([ROOT, atelierV(), alineaV(m.al, "m:" + m.id), formV(m)]) : push(formV(m)), "mod+e"),
      ...(ctx === "alinea" ? [] : [A("Ajouter au comparateur", I.columns, () => addCmp(m.id), "alt+a")]),
      A("Copier le texte", I.copy, () => copy(m.texte), "alt+c"),
      A(`L'alinéa ${m.al} d'étape en étape`, I.clock, () => setStack([ROOT, dossierV(), art4V("o:" + m.al)]), "alt+h"),
      A("Supprimer le brouillon", I.trash, () => delDraft(m), "mod+backspace", {danger: true}),
    ]};
}
function draftDetail(m){
  const n = concurrents(m.al).units.length;
  return {md: `<h1>${esc(draftNum(m))}</h1><div class="sub">${esc(draftLead(m))}</div>${mineBlock(m)}${refBlock(m.al)}`,
    meta: meta([["Alinéa", tag("Alinéa " + m.al, "var(--blue)", ` data-al="${m.al}"`)], ["Mode", tag(modeWord(m), modeCol(m))], ["Face à", esc(refShort())], ["Visibilité", esc(m.vis || "privé")], "-",
      ["Concurrents", `<span>${n}</span>`], ["Passages disputés", unitTags(m.al)]])};
}
function delDraft(m){
  const i = MINE.indexOf(m); MINE.splice(i, 1); saveDrafts(); UNIT_CACHE.clear(); CMP = CMP.filter(x => x !== m.id); saveCmp(); render();
  toast("success", "Brouillon supprimé", "", {t: "Annuler", run: () => { MINE.splice(i, 0, m); saveDrafts(); UNIT_CACHE.clear(); render(); toast("success", "Brouillon rétabli"); }});
}
function itemConc(u, o, ctx){
  const a = u.lead, w = who(a);
  return {key: "a:" + a.id, alt: u.members.map(x => "a:" + x.id), icon: dot(gcol(a)), title: a.num, sub: objetOf(a) || modeLead(a, o), kw: [w.name, a.auteur, sortWord(a), a.groupe, u.members.map(x => x.num).join(" ")].join(" "),
    acc: [u.members.length > 1 ? {text: "×" + u.members.length, tip: u.kind === "ident" ? "amendements identiques" : "série"} : null, {tag: gabbr(a), c: gcol(a), tip: w.name}, {html: sortTag(a)}],
    detail: () => amDetail(a, o, u), actions: () => amActions(a, o, ctx)};
}
function amDetail(a, o, u){
  const w = who(a), ep = NX.epOf(a);
  const idents = u && u.members.length > 1 ? `<h3>${u.kind === "ident" ? "Identiques" : "Même série"} (${u.members.length})</h3><p>${u.members.map(x => `<a data-am="${x.id}">${x.num}</a> ${esc(who(x).name)}`).join(" · ")}</p>` : "";
  const ex = a.expose || "";
  return {md: `<h1>${esc(a.num)}</h1><div class="sub">${tag(w.name, gcol(a))} ${esc(a.auteur || "")} · ${esc(modeLead(a, o))}</div>${theirBlock(a, o)}${refBlock(o)}${idents}<h3>Exposé sommaire</h3><p>${esc(short(ex, 520))}${ex.length > 520 ? ` <a data-full="${a.id}">Lire la suite</a>` : ""}</p>`,
    meta: meta([["Groupe", tag(gabbr(a), gcol(a), ` title="${esc(w.name)}"`)], ["Auteur", esc(a.auteur || "—")], ["Sort", sortTag(a)], ["Avis", esc(a.avis || "—")], ["Déposé", esc(NX.fmtDate(a.depot))],
      ["En réunion", ep ? `<a class="lnk" data-place="${ep.place}">place ${ep.place}</a>` : "—"], "-", ["Alinéas", amAls(a).map(x => tag("al. " + x, "var(--blue)", ` data-al="${x}"`)).join("") || "—"]])};
}
function amActions(a, o, ctx){
  const ep = NX.epOf(a), m = o ? draftsOn(o)[0] : null;
  const L = [A("Ouvrir l'amendement", I.doc, () => push(amV(a.id)))];
  if (m) L.push(A("Comparer avec mon brouillon", I.columns, () => push(cmpV(m.id, a.id))));
  L.push(A("Ajouter au comparateur", I.columns, () => addCmp(a.id), "alt+a"));
  if (ep) L.push(A(`Aller à sa place en réunion · ${ep.place}`, I.people, () => openPlace(ep.place), "alt+p"));
  if (ctx !== "alinea" && o) L.push(A(`Ouvrir l'alinéa ${o} dans l'atelier`, I.pencil, () => openAm(a.id), "alt+o"));
  L.push(A("Copier le numéro", I.copy, () => copy(a.num), "alt+c"));
  return L;
}
function itemUnit(o, u){
  return {key: "u:" + u.k, icon: li(I.layers, "var(--yellow)"), title: `« ${u.label} »`, sub: "", kw: "passage disputé",
    acc: [{tag: `${u.n} ${plural(u.n, "proposition")}`, c: "var(--yellow)"}],
    detail: () => unitDetail(o, u), actions: () => [A("Voir les propositions regroupées", I.layers, () => push(clustersV(o, u.k)))]};
}
function unitDetail(o, u){
  const C = clusters(u);
  const rows = C.list.map(c => { const isRef = c.items.some(x => x.id === "ref");
    return `<div class="tb"><div class="tb-h">${isRef ? "La référence (texte transmis)" : c.text == null ? "Suppression du passage" : "Une rédaction"} · ${c.items.filter(x => x.id !== "ref").length} ${plural(c.items.filter(x => x.id !== "ref").length, "proposition")}</div><div class="lx${isRef ? " ref" : ""}">${isRef ? esc(C.ref) : c.text == null ? `<del>${esc(C.ref)}</del>` : inlineDiff(C.ref, c.text)}</div><div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:4px">${c.items.filter(x => x.id !== "ref").map(x => tag(x.label + (x.a ? " · " + x.a.num : ""), x.a ? gcol(x.a) : x.color, x.a ? ` data-am="${x.a.id}" style="cursor:pointer;--c:${x.a ? gcol(x.a) : x.color}"` : "")).join("")}</div></div>`; }).join("");
  return {md: `<h1>« ${esc(u.label)} »</h1><div class="sub">Passage disputé de l'alinéa ${o} · ${u.n} propositions · ${C.list.length} rédactions distinctes</div>${rows}`};
}

/* ---------- les vues ---------- */
const ROOT = {kind: "list", key: "root", title: "Boussole", icon: ai(I.search, "var(--red)"), ph: "Rechercher un espace, un alinéa, un amendement, un thème, une place…", q: "", sel: 0,
  dd: {value: "all", options: [["all", "Tout"], ["esp", "Espaces"], ["drafts", "Brouillons"], ["al", "Alinéas"], ["am", "Amendements"], ["th", "Thèmes"], ["pl", "Places"]]},
  sections(q){
    const cat = this.dd.value, show = k => cat === "all" ? (k === "esp" || k === "drafts" || k === "set" || !!q) : cat === k;
    const S = [];
    if (show("esp")) S.push({title: "Espaces", items: Object.keys(SPACES).map(s => ({key: "s:" + s, icon: spaceIcon(s), title: SPACES[s].t, sub: SPACES[s].sub, acc: [{text: "Commande"}],
      actions: () => [A("Ouvrir " + SPACES[s].t, I.arrow, () => openSpace(s))]}))});
    if (show("drafts")) S.push({title: "Mes brouillons", items: MINE.map(m => itemDraft(m, "root"))});
    if (show("al")) S.push({title: "Alinéas", items: Array.from({length: NAL}, (_, i) => i + 1).map(o => ({key: "o:" + o, icon: numI(o), title: `Alinéa ${o}`, sub: NX.alShort(o, 90), kw: TRANSMIS[o - 1], acc: [{text: "Alinéa"}],
      actions: () => [A("Ouvrir dans l'atelier", I.pencil, () => openAtelierAl(o)), A("D'étape en étape", I.clock, () => setStack([ROOT, dossierV(), art4V("o:" + o)])), A("Amender cet alinéa", I.plus, () => amend(o), "alt+n")]}))});
    if (show("am")){ const L = ALL.filter(a => a.mode !== "hors-texte"); S.push({title: "Amendements", cap: q ? 40 : 200, items: L.map(a => ({key: "a:" + a.id, icon: dot(gcol(a)), title: a.num, sub: `${who(a).name} · ${objetOf(a)}`, kw: [a.auteur, sortWord(a), a.groupe].join(" "), acc: [{html: sortTag(a)}, {text: "Amendement"}],
      actions: () => [A("Ouvrir dans l'atelier", I.pencil, () => openAm(a.id)), ...(NX.epOf(a) ? [A("Aller à sa place en réunion", I.people, () => openPlace(NX.epOf(a).place), "alt+p")] : []), A("Ajouter au comparateur", I.columns, () => addCmp(a.id), "alt+a")]}))}); }
    if (show("th")) S.push({title: "Thèmes", items: THEMES.map(th => ({key: "t:" + th.id, icon: ai(I.hash, thColor(th)), title: th.label, sub: `${th.amendements.length} amendements · ${th.src}`, acc: [{text: "Thème"}], actions: () => [A("Ouvrir la fiche", I.doc, () => openTheme(th.id))]}))});
    if (show("pl")) S.push({title: "Places", items: NX.episodes.map(e => ({key: "p:" + e.place, icon: numI(e.place), title: `Place ${e.place}`, sub: placeShort(e), kw: e.ams.join(" ") + " " + e.paroles.map(p => p.nom).join(" "), acc: [adopted(e) ? {icon: I.check, c: "var(--green)", tip: "amendement adopté"} : null, {text: "Place"}], actions: () => [A("Ouvrir la place", I.people, () => openPlace(e.place))]}))});
    if (cat === "all"){
      S.push({title: "Réglages", items: [
        {key: "set:ref", icon: li(I.bookmark), title: "Changer la référence", sub: `actuellement : ${refLabel()}`, kw: "référence étape", acc: [{text: "Commande"}], actions: () => [globalSecs()[0].items[0]]},
        {key: "set:th", icon: li(UI.theme === "dark" ? I.sun : I.moon), title: UI.theme === "dark" ? "Thème clair" : "Thème sombre", sub: "verre clair ou sombre", acc: [{text: "Commande"}], actions: () => [globalSecs()[0].items[2]]},
        {key: "set:cp", icon: li(I.bar), title: UI.compact ? "Quitter le mode compact" : "Mode compact", sub: "seule la barre de recherche tant que la saisie est vide", acc: [{text: "Commande"}], actions: () => [globalSecs()[0].items[3]]},
        {key: "set:lg", icon: li(I.expand), title: UI.large ? "Fenêtre normale" : "Grande fenêtre", sub: "toutes les vues en grand", acc: [{text: "Commande"}], actions: () => [globalSecs()[0].items[1]]}]});
      S.push({title: "Aide", items: [{key: "help", icon: li(I.info), title: "Lisez-moi · à propos", sub: "ce qui est emprunté, les écarts", acc: [{text: "⌥ I"}], actions: () => [A("Ouvrir", I.info, () => push(readmeV()))]}]});
    }
    return S;
  }};

/* — Dossier — */
function dossierV(){
  return {kind: "list", key: "dossier", space: "dossier", title: "Dossier", icon: spaceIcon("dossier"), ph: "Rechercher un article, une étape…", q: "", sel: 3, detail: true,
    sections(){
      const art = NX.plan.map(p => ({key: "art:" + p.num, icon: p.num === "4" ? ai(I.doc, "var(--blue)") : li(I.doc), title: `Article ${p.num}`, sub: p.intitule || "", kw: p.statut,
        acc: [p.num === "4" ? {tag: "détaillé", c: "var(--blue)"} : null, {text: p.n ? `${p.n} am.` : "—", tip: `${p.n} amendements en commission`}],
        detail: () => ({md: `<h1>Article ${esc(p.num)}</h1><div class="sub">${esc(p.statut || "")}</div><p>${esc(p.intitule || "(sans intitulé)")}</p>${p.cible ? `<blockquote>Vise : ${esc(short(p.cible, 260))}</blockquote>` : ""}${p.num === "4" ? `<p><a data-art4>Ouvrir l'article 4 d'étape en étape</a></p>` : `<p class="empty-note">Seul l'article 4 est chargé en détail dans cette maquette.</p>`}`,
          meta: meta([["Amendements en commission", String(p.n)], "-", ...Object.entries(p.amendements).sort((x, y) => y[1] - x[1]).map(([k, v]) => [k, String(v)])])}),
        actions: () => p.num === "4" ? [A("Ouvrir l'article 4", I.arrow, () => push(art4V())), A("Grille alinéas × étapes", I.table, () => push(gridV()), "alt+g")] : [A("Copier l'intitulé", I.copy, () => copy(p.intitule || ""), "alt+c")]}));
      const a4 = [
        {key: "a4", icon: ai(I.clock, "var(--blue)"), title: "Alinéas d'étape en étape", sub: "chaque alinéa, du dépôt au Sénat à la commission de l'Assemblée", acc: [{text: `${NX.grid().length} lignes`}],
          detail: () => ({md: `<h1>Article 4</h1><div class="sub">${esc(NX.article.intitule)}</div><p>Une ligne par alinéa suivi d'étape en étape ; pour chacune, le texte à chaque étape, comparé à l'étape précédente.</p>`}), actions: () => [A("Ouvrir", I.arrow, () => push(art4V()))]},
        {key: "grid", icon: li(I.table), title: "Grille alinéas × étapes", sub: "modifié ou non, à chaque étape", acc: [], detail: () => ({md: `<h1>Grille alinéas × étapes</h1><p>Un tableau : une ligne par alinéa, une colonne par étape.</p>`}), actions: () => [A("Ouvrir", I.table, () => push(gridV()))]},
        ...ETAPES.map(id => ({key: "e:" + id, icon: li(I.book), title: ET[id].label, sub: `${ET[id].alineas.length} alinéas`, acc: [{text: ETL[id]}],
          detail: () => ({md: `<h1>${esc(ET[id].label)}</h1><p>${ET[id].alineas.length} alinéas, numérotation propre à cette étape.</p><p class="empty-note">${esc(short(ET[id].alineas[0], 200))}</p>`}), actions: () => [A("Lire le texte", I.book, () => push(etapeV(id)))]})),
        {key: "cgi", icon: li(I.book), title: "Code général des impôts, art. 31", sub: "en vigueur → après la commission", acc: [],
          detail: () => ({md: `<h1>${esc(NX.code.article)}</h1><p>Les instructions de l'article appliquées mécaniquement au code : ce qu'il deviendrait.</p>`}), actions: () => [A("Ouvrir", I.book, () => push(codeV()))]},
      ];
      return [{title: "Projet de loi logement · 16 articles", items: art}, {title: "Article 4", items: a4}];
    }};
}
function art4V(focus){
  const G = NX.grid();
  return {kind: "list", key: "art4", space: "dossier", title: "Article 4 · d'étape en étape", icon: spaceIcon("dossier"), ph: "Filtrer les alinéas…", q: "", sel: 0, detail: true, large: true, focus,
    dd: {value: "all", options: [["all", "Tous les alinéas"], ["mod", "Modifiés en navette"], ["am", "Amendés à l'Assemblée"]]},
    sections(){
      const f = this.dd.value;
      const items = G.filter(r => f === "all" || (f === "mod" && r.cells.includes("mod")) || (f === "am" && r.n)).map(r => {
        const ln = LINES[r.i], anyText = ETAPES.map(id => ln[id] == null ? null : ET[id].alineas[ln[id]]).find(Boolean) || "";
        const cells = `<span class="cells" title="${ETAPES.map((id, k) => ETL[id] + " : " + {mod: "modifié", same: "inchangé", absent: "absent", origine: "origine"}[r.cells[k]]).join(" · ")}">${r.cells.map(c => `<i class="${c}"></i>`).join("")}</span>`;
        return {key: r.o ? "o:" + r.o : "l:" + r.i, icon: r.o ? numI(r.o) : li(I.plus, "var(--green)"), title: r.o ? `Alinéa ${r.o}` : "Alinéa inséré", sub: short(r.o ? TRANSMIS[r.o - 1] : anyText, 90), kw: anyText,
          acc: [{html: cells}, r.n ? {tag: String(r.n), c: "var(--text2)", tip: `${r.n} amendements de l'Assemblée`} : null],
          detail: () => r.o ? histDetail(r.o) : lineDetail(r.i),
          actions: () => r.o ? [A("Amender cet alinéa", I.pencil, () => amend(r.o)), A("Voir les concurrents dans l'atelier", I.people, () => openAtelierAl(r.o)), A("Copier le texte", I.copy, () => copy(TRANSMIS[r.o - 1]), "alt+c"), A("Grille alinéas × étapes", I.table, () => push(gridV()), "alt+g")] : [A("Grille alinéas × étapes", I.table, () => push(gridV()), "alt+g")]};
      });
      return [{title: "Article 4 · une ligne par alinéa suivi", items}];
    }};
}
function histDetail(o){
  const H = NX.hist(o), st = (h, i) => i === 0 ? tag("origine") : h.absent ? tag("absent", "var(--text3)") : h.same ? tag("inchangé", "var(--text2)") : tag("modifié", "var(--blue)");
  return {md: `<h1>Alinéa ${o}, d'étape en étape</h1><div class="sub">chaque étape comparée à la précédente</div>` + H.map((h, i) => `<div class="tb"><div class="tb-h">${esc(ET[h.id].label)} ${st(h, i)}</div><div class="lx${h.same ? " ref" : ""}">${h.diff == null ? '<span class="ctx">— absent à cette étape</span>' : h.diff}</div></div>`).join("") + `<p><a data-amend="${o}">Amender cet alinéa dans l'atelier ↵</a></p>`,
    meta: meta([["Amendements de l'Assemblée", String(NX.grid().find(r => r.o === o).n)], ["Mes brouillons", String(draftsOn(o).length)], ["Modifié à", H.filter((h, i) => i && !h.same && !h.absent).map(h => tag(ETL[h.id], "var(--blue)")).join("") || '<span class="empty-note">jamais</span>']])};
}
function lineDetail(i){
  const ln = LINES[i];
  return {md: `<h1>Alinéa inséré en cours de navette</h1><div class="sub">absent du texte transmis</div>` + ETAPES.map(id => `<div class="tb"><div class="tb-h">${esc(ET[id].label)}</div><div class="lx">${ln[id] == null ? '<span class="ctx">— absent</span>' : `<ins>${esc(ET[id].alineas[ln[id]])}</ins>`}</div></div>`).join("")};
}
function gridV(){
  return {kind: "detail", key: "grid", space: "dossier", title: "Grille alinéas × étapes", subtitle: "article 4", icon: spaceIcon("dossier"), large: true,
    md(){
      const W = {mod: `<span style="color:var(--blue)">● modifié</span>`, same: `<span style="color:var(--text3)">·</span>`, absent: "", origine: `<span style="color:var(--text2)">○</span>`};
      return `<h1>Article 4 · grille des étapes</h1><div class="sub">● modifié par rapport à l'étape précédente · nombre = amendements de l'Assemblée sur l'alinéa · cliquer une ligne</div><div class="tw"><table><tr><th></th>${ETAPES.map(id => `<th>${esc(ETL[id])}</th>`).join("")}<th>Texte transmis</th><th>Am.</th></tr>${NX.grid().map(r => `<tr${r.o ? ` data-goal="${r.o}"` : ""}><td class="c" style="color:var(--text2)">${r.o ?? "+"}</td>${r.cells.map(c => `<td class="c">${W[c]}</td>`).join("")}<td style="color:var(--text2)">${r.o ? esc(NX.alShort(r.o, 70)) : "<i>alinéa introduit en cours de navette</i>"}</td><td class="c">${r.n || ""}</td></tr>`).join("")}</table></div>`;
    }, actions: () => [A("Ouvrir les alinéas d'étape en étape", I.clock, () => push(art4V()))]};
}
function etapeV(id){
  return {kind: "detail", key: "et:" + id, space: "dossier", title: ET[id].label, icon: spaceIcon("dossier"), large: true,
    md: () => `<h1>${esc(ET[id].label)}</h1><div class="sub">Article 4 · ${ET[id].alineas.length} alinéas · numérotation propre à cette étape</div>` + ET[id].alineas.map((t, i) => `<p><span class="mono" style="color:var(--text3);font-size:12px;margin-right:8px">${i + 1}</span>${esc(t)}</p>`).join(""),
    actions: () => [A("Copier le texte", I.copy, () => copy(ET[id].alineas.join("\n")), "alt+c")]};
}
function codeV(){
  const C = NX.code;
  return {kind: "detail", key: "cgi", space: "dossier", title: "Code général des impôts, art. 31", subtitle: "en vigueur → après commission", icon: spaceIcon("dossier"), large: true,
    md: () => `<h1>${esc(C.article)}</h1><div class="sub">Les instructions de l'article appliquées mécaniquement : le texte en vigueur, corrections apparentes portées sur le texte après la commission.</div>` + C.lettres.map(l => { const av = (C.avant[l] || []).join("\n"), ap = (C.apresCommission[l] || []).join("\n"), same = sameText(av, ap);
      return `<div class="tb"><div class="tb-h"><b class="mono">${l})</b> ${same ? tag("inchangé") : tag("modifié par la commission", "var(--blue)")}</div><div class="lx${same ? " ref" : ""}" style="white-space:pre-wrap">${same ? esc(short(ap, 420)) : inlineDiff(av, ap)}</div></div>`; }).join(""),
    actions: () => []};
}

/* — Atelier — */
function atelierV(){
  return {kind: "list", key: "atelier", space: "atelier", title: "Atelier", icon: spaceIcon("atelier"), ph: "Rechercher un brouillon, un alinéa…", q: "", sel: 0, detail: true,
    sections(){
      return [
        {title: "Mes brouillons", items: MINE.map(m => itemDraft(m, "atelier"))},
        {title: "Créer", items: [{key: "new", icon: li(I.plus, "var(--green)"), title: "Nouveau brouillon…", sub: "choisir l'alinéa à amender", acc: [],
          detail: () => ({md: `<h1>Nouveau brouillon</h1><p>Choisissez un alinéa : le brouillon part de son texte transmis, puis s'ouvre en formulaire.</p>`}), actions: () => [A("Choisir l'alinéa", I.plus, () => push(pickAlV()))]}]},
        {title: "Vues", items: [
          {key: "art", icon: li(I.doc), title: "Article 4 · votre version", sub: "tous vos brouillons appliqués", acc: [{text: `${MINE.length} brouillons`}],
            detail: () => ({md: `<h1>Article 4 · votre version</h1><p>L'article entier, vos brouillons appliqués, face à : ${esc(refLabel())}. Zones inchangées repliées.</p>`}), actions: () => [A("Ouvrir", I.doc, () => push(articleV()))]},
          {key: "cmp", icon: li(I.columns), title: "Comparateur", sub: CMP.length ? CMP.map(cmpLabel).join(" ↔ ") : "vide : « Ajouter au comparateur » (⌥ A) sur une rédaction", acc: [{tag: `${CMP.length}/2`, c: CMP.length === 2 ? "var(--green)" : "var(--text2)"}],
            detail: () => ({md: `<h1>Comparateur</h1><p>Deux rédactions au plus. « Comparer » les ouvre en trois colonnes : <b>l'une | la référence au centre | l'autre</b>, lignes alignées.</p><p>${CMP.map(id => tag(cmpLabel(id), "var(--blue)")).join(" ") || '<span class="empty-note">Vide.</span>'}</p>`}),
            actions: () => CMP.length === 2 ? [A("Comparer", I.columns, () => push(cmpV(CMP[0], CMP[1]))), A("Vider le comparateur", I.trash, () => { CMP = []; saveCmp(); render(); })] : [A("Vider le comparateur", I.trash, () => { CMP = []; saveCmp(); render(); })]},
          {key: "ref", icon: li(I.bookmark), title: "Référence", sub: refLabel(), acc: [{tag: refShort(), c: "var(--blue)"}],
            detail: () => ({md: `<h1>La référence</h1><p>Le texte face auquel les rédactions sont comparées. Il reste <b>vierge</b> : les corrections apparentes sont portées uniquement sur la rédaction comparée, la mienne comme celle d'un autre groupe.</p>`, meta: meta(ETAPES.map(id => [ET[id].court, id === REF ? tag("référence", "var(--blue)") : ""]))}),
            actions: () => [globalSecs()[0].items[0]]},
          {key: "cgi", icon: li(I.book), title: "Code général des impôts, art. 31", sub: "en vigueur → après commission", acc: [], detail: () => ({md: `<h1>${esc(NX.code.article)}</h1><p>Le code tel qu'il deviendrait.</p>`}), actions: () => [A("Ouvrir", I.book, () => push(codeV()))]},
        ]},
        {title: "Alinéas disputés", items: NX.alsDisputes().map(x => ({key: "o:" + x.o, icon: numI(x.o), title: `Alinéa ${x.o}`, sub: NX.alShort(x.o, 80), kw: TRANSMIS[x.o - 1],
          acc: [draftsOn(x.o).length ? {icon: I.pencil, c: ME_C, tip: "un de mes brouillons"} : null, {tag: `${x.n}`, c: "var(--text2)", tip: `${x.n} amendements`}],
          detail: () => ({md: `<h1>Alinéa ${x.o}</h1><div class="sub">${x.n} amendements le visent · ${unitsOf(x.o).length} passages disputés</div>${refBlock(x.o)}`, meta: meta([["Passages disputés", unitTags(x.o)]])}),
          actions: () => [A("Ouvrir l'alinéa", I.arrow, () => push(alineaV(x.o))), A("Amender cet alinéa", I.pencil, () => amend(x.o), "alt+n")]}))},
      ];
    }};
}
function alineaV(o, focus){
  return {kind: "list", key: "al:" + o, space: "atelier", title: `Alinéa ${o}`, icon: spaceIcon("atelier"), ph: `Filtrer les propositions sur l'alinéa ${o}…`, q: "", sel: 0, detail: true, large: true, focus,
    dd: {value: "all", options: [["all", "Tous les sorts"], ["adopte", "Adoptés"], ["rejete", "Rejetés"], ["tombe", "Tombés"], ["retire", "Retirés ou non soutenus"], ["attente", "Non examinés"]]},
    sections(){
      const C = concurrents(o), f = this.dd.value, ok = u => f === "all" || NX.sortKey(u.lead) === f || (f === "retire" && NX.sortKey(u.lead) === "ns");
      const mine = draftsOn(o).map(m => itemDraft(m, "alinea"));
      if (!mine.length) mine.push({key: "new", icon: li(I.plus, "var(--green)"), title: "Rédiger un brouillon sur cet alinéa", sub: "", acc: [], detail: () => ({md: `<h1>Alinéa ${o}</h1><div class="sub">Aucun brouillon de votre part sur cet alinéa.</div>${refBlock(o)}`}), actions: () => [A("Créer un brouillon", I.plus, () => amend(o))]});
      const U = unitsOf(o);
      const S = [{title: "Mes brouillons", items: mine}];
      if (U.length) S.push({title: `Passages disputés · ${U.length}`, items: U.map(u => itemUnit(o, u))});
      S.push({title: `Concurrents · ${C.units.filter(ok).length}`, items: C.units.filter(ok).map(u => itemConc(u, o, "alinea"))});
      if (C.redac.length && f === "all") S.push({title: `Rédactionnels · ${C.redac.length}`, items: pileUnits(C.redac).map(u => itemConc(u, o, "alinea"))});
      if (C.ecartes.length && f === "all") S.push({title: `Écartés · ${C.ecartes.length}`, items: C.ecartes.map(u => itemConc(u, o, "alinea"))});
      return S;
    }};
}
function clustersV(o, k){
  const u = unitsOf(o).find(x => x.k === k) || unitsOf(o)[0];
  const ref = TRANSMIS[o - 1], C0 = clusters(u); let at = ref.indexOf(C0.ref, Math.max(0, u.a - 8)); if (at < 0) at = u.a;
  const cA = ref.slice(Math.max(0, at - 90), at).replace(at > 90 ? /^\S*\s/ : /^/, ""), cB = ref.slice(at + C0.ref.length, at + C0.ref.length + 90).replace(/\s\S*$/, "");
  const colOf = x => x.a ? gcol(x.a) : x.mine ? ME_C : "var(--text2)";
  return {kind: "list", key: "cl:" + o + ":" + k, space: "atelier", title: `« ${u.label} »`, icon: spaceIcon("atelier"), ph: "Filtrer les rédactions, les groupes…", q: "", sel: 0, detail: true, large: true,
    sections(){
      const C = clusters(u);
      const items = C.list.map((c, i) => { const isRef = c.items.some(x => x.id === "ref"), props = c.items.filter(x => x.id !== "ref"), mine = props.find(x => x.mine);
        return {key: "c:" + i, icon: isRef ? li(I.bookmark) : mine ? li(I.pencil, ME_C) : dot(props[0] ? colOf(props[0]) : "var(--text2)"),
          title: isRef ? "La référence" : c.text == null ? "Suppression de l'alinéa" : !c.text.trim() ? "Suppression du passage" : short(c.text, 70), sub: isRef ? short(c.text || "", 60) : "", kw: props.map(x => x.label + " " + (x.a ? x.a.num : "")).join(" "),
          acc: [isRef ? {tag: "référence", c: "var(--text2)"} : null, {tag: `${props.length}`, c: "var(--yellow)", tip: `${props.length} propositions`}],
          detail: () => {
            const body = isRef ? `<span class="ctx">…${esc(cA)}</span>${esc(C.ref)}<span class="ctx">${esc(cB)}…</span>` : `<span class="ctx">…${esc(cA)}</span>${c.text == null ? `<del>${esc(C.ref)}</del>` : inlineDiff(C.ref, c.text)}<span class="ctx">${esc(cB)}…</span>`;
            return {md: `<h1>${isRef ? "La référence" : "Une rédaction distincte"}</h1><div class="sub">alinéa ${o} · passage « ${esc(u.label)} »</div>${isRef ? "" : `<div class="tb"><div class="tb-h">Référence · texte transmis ${tag("vierge")}</div><div class="lx ref"><span class="ctx">…${esc(cA)}</span>${esc(C.ref)}<span class="ctx">${esc(cB)}…</span></div></div>`}<div class="tb"><div class="tb-h">${isRef ? "Le passage, inchangé" : "Cette rédaction · corrections apparentes"}</div><div class="lx${isRef ? " ref" : ""}">${body}</div></div>
              <h3>${isRef ? "Laissent ce passage tel quel" : "Portée par"} ${props.length ? `(${props.length})` : ""}</h3>${props.length ? `<table>${props.map(x => `<tr${x.a ? ` data-am="${x.a.id}"` : ` data-draft="${x.id}"`}><td>${dot(colOf(x))}</td><td>${esc(x.label)}</td><td class="mono">${x.a ? x.a.num : ""}</td><td>${x.a ? sortTag(x.a) : tag("brouillon", ME_C)}</td></tr>`).join("")}</table>` : '<p class="empty-note">Personne ne propose de garder ce passage tel quel… sauf ceux qui ne le touchent pas.</p>'}`,
              meta: meta([["Propositions", String(props.length)], ["Groupes", [...new Map(props.map(x => [x.label, x])).values()].map(x => tag(x.a ? gabbr(x.a) : "Vous", colOf(x), ` title="${esc(x.label)}"`)).join("") || "—"]])};
          },
          actions: () => [...props.filter(x => x.a).map(x => A(`Ouvrir ${x.a.num} · ${x.label}`, I.doc, () => push(amV(x.a.id)))), ...props.filter(x => x.mine).map(x => A("Modifier mon brouillon", I.pencil, () => push(formV(MINE.find(m => m.id === x.id))), "mod+e"))]};
      });
      const chg = C.list.filter(c => !c.items.some(x => x.id === "ref")).reduce((n, c) => n + c.items.length, 0);
      return [{title: `${C.list.length} rédactions distinctes, la référence comprise · ${chg} ${plural(chg, "proposition")} de changement`, items}];
    }};
}
function amV(id){
  const a = AM[id], w = who(a), ep = NX.epOf(a), o = amAl(a);
  return {kind: "detail", key: "am:" + id, space: "atelier", title: a.num, subtitle: w.name, icon: spaceIcon("atelier"), large: true,
    md(){
      const als = amAls(a), ins = []; for (const [k, l] of verOfAmendment(a).ins) l.forEach(t => ins.push(`<div class="tb"><div class="tb-h">Après l'alinéa ${k} ${tag("inséré", "var(--green)")}</div><div class="lx"><ins>${esc(t)}</ins></div></div>`));
      const body = (a.mode === "supprimer-article" ? `<div class="tb"><div class="tb-h">Sa rédaction ${tag(w.name, gcol(a))}</div><div class="lx"><del>${esc(short(refAl(1), 200))} … (l'article entier)</del></div></div>`
        : als.map(x => `<h3>Alinéa ${x}</h3>${refBlock(x)}${theirBlock(a, x)}`).join("")) + ins.join("");
      return `<h1>${esc(a.num)}</h1><div class="sub">${tag(w.name, gcol(a))} ${esc(a.auteur || "")} · ${esc(modeLead(a, o))}</div>${body || `<div class="lx">${esc(a.dispositif || "")}</div>`}
        <h2>Exposé sommaire</h2><p>${esc(a.expose || "—")}</p>${a.cartouche ? `<blockquote>${esc(a.cartouche)}</blockquote>` : ""}
        <h2>Versions</h2><div class="tw"><table><tr><th>Date</th><th>État</th><th>Champs modifiés</th></tr>${a.versions.map(v => `<tr><td class="mono" style="white-space:nowrap">${esc(v.date.replace("T", " "))}</td><td>${esc(v.etat)}${v.sort ? " · " + esc(v.sort) : ""}</td><td>${esc((v.champs || []).join(", ") || "—")}</td></tr>`).join("")}</table></div>`;
    },
    meta: () => meta([["Groupe", tag(gabbr(a), gcol(a), ` title="${esc(w.name)}"`)], ["Auteur", esc(a.auteur || "—")], ["Cosignataires", String((a.cosign || []).length)], ["Sort", sortTag(a)], ["Avis", esc(a.avis || "—")], ["Déposé", esc(NX.fmtDate(a.depot))],
      ["En réunion", ep ? `<a class="lnk" data-place="${ep.place}">place ${ep.place}</a>` : "—"], "-", ["Alinéas", amAls(a).map(x => tag("al. " + x, "var(--blue)", ` data-al="${x}"`)).join("") || "—"]]),
    actions: () => amActions(a, o, "am").slice(1)};
}
function cmpV(x, y){
  const side = id => { if (id[0] === "M"){ const m = MINE.find(z => z.id === id); return {label: draftNum(m), sub: GR[ME].name, color: ME_C, als: [m.al], html: o => o === m.al ? (m.mode === "rediger" ? NX.unitsOnDiff(NX.draftDiff(m), o, m.texte) : NX.draftDiff(m)) : null}; }
    const a = AM[id]; return {label: a.num, sub: who(a).name, color: gcol(a), als: amAls(a), html: o => { const d = NX.amDiff(a, o), t = NX.amText(a, o); return d == null ? null : typeof t === "string" ? NX.unitsOnDiff(d, o, t) : d; }}; };
  const v = {kind: "custom", key: "cmp", space: "atelier", title: "Comparer", icon: spaceIcon("atelier"), large: true, ids: [x, y],
    html(){
      const L = side(this.ids[0]), R = side(this.ids[1]);
      const als = [...new Set([...L.als, ...R.als])].sort((p, q) => p - q);
      const none = `<div class="lx ref"><span class="ctx">— ne modifie pas cet alinéa</span></div>`;
      const head = `<div class="ch">${dot(L.color)}${esc(L.label)} <small>${esc(L.sub)}</small></div><div class="ch">${li(I.bookmark)}Référence <small>${esc(refShort())} · vierge</small></div><div class="ch">${dot(R.color)}${esc(R.label)} <small>${esc(R.sub)}</small></div>`;
      const rows = als.map(o => { const l = L.html(o), r = R.html(o);
        return `<div class="ca">Alinéa ${o}</div><div class="ca">Alinéa ${o}</div><div class="ca">Alinéa ${o}</div><div data-o="${o}">${l == null ? none : `<div class="lx">${l}</div>`}</div><div><div class="lx ref">${esc(refAl(o)) || '<span class="ctx">— absent</span>'}</div></div><div data-o="${o}">${r == null ? none : `<div class="lx">${r}</div>`}</div>`; }).join("");
      return `<div class="cmpwrap"><div class="cmp">${head}${rows}</div></div>`;
    },
    actions: () => [A("Inverser les colonnes", I.swap, () => { v.ids.reverse(); render(); }), A("Ajouter ces deux au comparateur", I.columns, () => { CMP = v.ids.slice(); saveCmp(); toast("success", "Comparateur rempli", "2/2"); }, "alt+a"), A("Vider le comparateur", I.trash, () => { CMP = []; saveCmp(); toast("success", "Comparateur vidé"); })]};
  return v;
}
function articleV(){
  return {kind: "detail", key: "article", space: "atelier", title: "Article 4 · votre version", subtitle: "face à : " + refShort(), icon: spaceIcon("atelier"), large: true, unfold: false,
    md(){
      const L = verLines(myVer()), out = []; let run = [];
      const flush = () => { if (run.length > 2 && !this.unfold) out.push(`<p><a data-unfold>⋯ ${run.length} alinéas inchangés (${run[0].o}–${run[run.length - 1].o}) · déplier</a></p>`); else run.forEach(l => out.push(`<p><span class="mono" style="color:var(--text3);font-size:12px;margin-right:8px">${l.o}</span><span style="color:var(--text2)">${esc(refAl(l.o) || l.text)}</span></p>`)); run = []; };
      for (const l of L){
        if (l.kind === "same"){ run.push(l); continue; }
        flush();
        out.push(l.kind === "del" ? `<div class="tb"><div class="tb-h">Alinéa ${l.o} ${tag("supprimé", "var(--red)")}</div><div class="lx"><del>${esc(refAl(l.o))}</del></div></div>`
          : l.kind === "mod" ? `<div class="tb" data-o="${l.o}"><div class="tb-h">Alinéa ${l.o} ${tag("modifié", "var(--blue)")}</div><div class="lx">${inlineDiff(refAl(l.o), l.text)}</div></div>`
          : `<div class="tb"><div class="tb-h">Inséré ${tag("ajout", "var(--green)")}</div><div class="lx"><ins>${esc(l.text)}</ins></div></div>`);
      }
      flush();
      return `<h1>Article 4 · votre version</h1><div class="sub">tous vos brouillons appliqués, face à : ${esc(refLabel())}</div>${out.join("")}`;
    },
    meta: () => meta([["Brouillons", String(MINE.length)], ["Alinéas touchés", String(verTouched(myVer()).size)], ["Face à", esc(refShort())]]),
    actions(){ return [A(this.unfold ? "Replier les zones inchangées" : "Déplier les zones inchangées", I.layers, () => { this.unfold = !this.unfold; render(); }), A("Copier l'article", I.copy, () => copy(verAlineas(myVer()).join("\n")), "alt+c")]; }};
}
function pickAlV(){
  return {kind: "list", key: "pick", space: "atelier", title: "Nouveau brouillon", icon: spaceIcon("atelier"), ph: "Choisir l'alinéa à amender…", q: "", sel: 0,
    sections: () => [{title: "Alinéas du texte transmis", items: Array.from({length: NAL}, (_, i) => i + 1).map(o => ({key: "o:" + o, icon: numI(o), title: `Alinéa ${o}`, sub: NX.alShort(o, 90), kw: TRANSMIS[o - 1],
      acc: [draftsOn(o).length ? {tag: "brouillon", c: ME_C} : null],
      actions: () => [A("Créer un brouillon sur cet alinéa", I.plus, () => { const m = newDraft(o); UNIT_CACHE.clear(); STACK.pop(); push(formV(m, true)); toast("success", `${draftNum(m)} créé`, `alinéa ${o}`); })]}))}]};
}
function formV(m, fresh){
  const v = {kind: "form", key: "form:" + m.id, space: "atelier", title: `Modifier · ${draftNum(m)}`, subtitle: `alinéa ${m.al}`, icon: spaceIcon("atelier"), large: true,
    html(){
      return `<div class="form"><div class="frow"><label>Alinéa</label><div class="fstatic">Alinéa ${m.al} <span style="color:var(--text3)">· ${esc(NX.alShort(m.al, 60))}</span></div></div>
        <div class="frow"><label for="f-mode">Mode</label><div><select class="fin" id="f-mode"><option value="rediger"${m.mode === "rediger" ? " selected" : ""}>Rédiger ainsi l'alinéa</option><option value="supprimer"${m.mode === "supprimer" ? " selected" : ""}>Supprimer l'alinéa</option><option value="inserer"${m.mode === "inserer" ? " selected" : ""}>Insérer un alinéa après</option></select></div></div>
        <div class="frow"><label for="f-tx">Texte</label><div><textarea class="fin" id="f-tx" spellcheck="false">${esc(m.texte)}</textarea><div class="fdesc">${kc("mod+enter")} enregistrer · ${kc("esc")} annuler</div></div></div>
        <div class="fsep"></div>
        <div class="frow"><label>Calque miroir</label><div><div class="lx live" id="f-live"></div><div class="fdesc">pendant la frappe : ajouts soulignés, suppressions en trait rouge fin ; corrections complètes après enregistrement</div></div></div>
        <div class="frow"><label>Face à</label><div class="fstatic">${esc(refLabel())} ${tag("vierge")}</div></div></div>`;
    },
    after(){
      const ta = $("#f-tx"), md = $("#f-mode"), lv = $("#f-live");
      const up = () => { const mode = md.value; ta.disabled = mode === "supprimer"; lv.innerHTML = mode === "supprimer" ? `<del>${esc(refAl(m.al))}</del>` : mode === "inserer" ? `<ins>${esc(ta.value)}</ins>` : liveHTML(refAl(m.al), ta.value); };
      ta.addEventListener("input", up); md.addEventListener("change", up); up();
      if (!narrow()){ ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); }
    },
    submit(){
      const ta = $("#f-tx"), md = $("#f-mode"); if (!ta) return;
      m.texte = ta.value; m.mode = md.value; saveDrafts(); UNIT_CACHE.clear();
      toast("animated", "Enregistrement du brouillon…");
      setTimeout(() => { STACK.pop(); closeAll(); const p = cur(); if (p && p.key === "al:" + m.al) p.focus = "m:" + m.id; render(); toast("success", "Brouillon enregistré", `${draftNum(m)} · alinéa ${m.al}`); }, 380);
    },
    actions: () => [A("Enregistrer le brouillon", I.check, () => v.submit(), "mod+enter"), A("Annuler", I.x, pop, "esc"), A("Repartir de la référence", I.undo, () => { $("#f-tx").value = refAl(m.al); $("#f-tx").dispatchEvent(new Event("input")); }, "alt+z")]};
  return v;
}

/* — Enjeux — */
const TH_COL = ["var(--da-int-1)", "var(--da-int-2)", "var(--da-int-3)", "var(--da-int-4)", "var(--da-int-5)", "var(--da-papier-2)", "var(--da-papier-2)", "var(--da-papier-2)", "var(--da-papier-2)"];
const TH_GLY = {famille: "⌂", scpi: "◫", neuf: "↻", seuil: "▤", dpe: "◐", fossile: "▲", plafond: "%", maisons: "▦", supprimer: "✕"};
const thColor = th => TH_COL[THEMES.indexOf(th) % TH_COL.length];
function enjeuxV(focus){
  const cell = th => ({key: "t:" + th.id, title: th.label, sub: `${th.amendements.length} amendements`, kw: th.doc + " " + th.src,
    tile: `<div class="tile" style="--c:${thColor(th)}"><span class="g">${TH_GLY[th.id] || "#"}</span><span><span class="k">${th.src === "déclaré" ? "RAPPORT" : "MOTS-CLÉS"}</span><div class="als">al. ${themeAls(th).join(" · ") || "—"}</div></span></div>`,
    actions: () => [A("Ouvrir la fiche", I.doc, () => push(themeV(th.id))), A("Voir les amendements", I.flag, () => push(themeAmsV(th.id))), A("Ouvrir les alinéas dans l'atelier", I.pencil, () => setStack([ROOT, atelierV(), themeAlsV(th.id)]), "alt+o"), A("Matrice thèmes × groupes", I.table, () => push(matrixV()), "alt+x")]});
  return {kind: "grid", key: "enjeux", space: "enjeux", title: "Enjeux", icon: spaceIcon("enjeux"), ph: "Rechercher un thème…", q: "", sel: 0, focus,
    sections: () => [
      {title: "Déclarés par le rapport", items: THEMES.filter(t => t.src === "déclaré").map(cell)},
      {title: "Calculés par mots-clés (dit comme tel)", items: THEMES.filter(t => t.src !== "déclaré").map(cell)},
      {title: "Tableau", items: [{key: "mx", title: "Thèmes × groupes", sub: "nombre d'amendements", tile: `<div class="tile" style="--c:var(--da-papier-2)"><span class="g">▦</span><span><span class="k">MATRICE</span><div class="als">${THEMES.length} × ${NX.matrix().gs.length}</div></span></div>`, actions: () => [A("Ouvrir la matrice", I.table, () => push(matrixV()))]}]},
    ]};
}
function themeV(id){
  const th = THEMES.find(t => t.id === id);
  return {kind: "detail", key: "th:" + id, space: "enjeux", title: th.label, subtitle: th.src === "déclaré" ? "déclaré par le rapport" : "calculé par mots-clés", icon: spaceIcon("enjeux"), large: true,
    md(){
      const ams = NX.themeAms(th), als = themeAls(th), eps = NX.themeParoles(th), mine = MINE.filter(m => als.includes(m.al));
      return `<h1>${esc(th.label)}</h1><div class="sub">${th.src === "déclaré" ? "Thème déclaré par le rapport" : "Thème calculé par mots-clés (dit comme tel)"} · ${ams.length} amendements</div>
        <h2>Ce que dit le rapport</h2><blockquote>${esc(th.doc || "—")}</blockquote>
        <h2>Ce qui a été dit en réunion</h2>${eps.length ? eps.slice(0, 6).map(e => `<p><a data-place="${e.place}">Place ${e.place}</a> — ${esc(short(placeShort(e), 110))}<br><span style="color:var(--text2)">${e.paroles.slice(0, 2).map(p => `<b style="color:var(--text)">${esc(NX.speaker(p))}</b> : « ${esc(short(p.txt, 170))} »`).join("<br>")}</span></p>`).join("") + (eps.length > 6 ? `<p class="empty-note">… et ${eps.length - 6} autres places.</p>` : "") : '<p class="empty-note">Rien en réunion.</p>'}
        <h2>Ce que fait mon texte</h2>${mine.length ? mine.map(m => mineBlock(m)).join("") : '<p class="empty-note">Aucun de mes brouillons ne touche ce thème.</p>'}
        <h2>Ses amendements (${ams.length})</h2><div class="tw"><table><tr><th>N°</th><th>Groupe</th><th>Sort</th><th>Objet</th></tr>${ams.map(a => `<tr data-am="${a.id}"><td class="mono">${a.num}</td><td>${tag(gabbr(a), gcol(a), ` title="${esc(who(a).name)}"`)}</td><td>${sortTag(a)}</td><td>${esc(objetOf(a))}</td></tr>`).join("")}</table></div>`;
    },
    meta(){
      const ams = NX.themeAms(th), gs = new Map(); ams.forEach(a => { const k = gabbr(a); gs.set(k, (gs.get(k) || 0) + 1); });
      return meta([["Source", th.src === "déclaré" ? "rapport" : "mots-clés"], ["Amendements", String(ams.length)], ["Places en réunion", String(NX.themeParoles(th).length)], "-",
        ["Alinéas", themeAls(th).map(o => tag("al. " + o, "var(--blue)", ` data-al="${o}"`)).join("") || "—"], ["Groupes", [...gs].sort((x, y) => y[1] - x[1]).map(([g, n]) => tag(`${g} ${n}`, GR[g] ? GR[g].color : "var(--text2)", GR[g] ? ` title="${esc(GR[g].name)}"` : "")).join("")]]);
    },
    actions: () => [A("Voir les amendements", I.flag, () => push(themeAmsV(id))), A("Ouvrir les alinéas dans l'atelier", I.pencil, () => setStack([ROOT, atelierV(), themeAlsV(id)]), "alt+o"), A("Matrice thèmes × groupes", I.table, () => push(matrixV()), "alt+x")]};
}
function themeAmsV(id){
  const th = THEMES.find(t => t.id === id);
  return {kind: "list", key: "tha:" + id, space: "enjeux", title: th.label, icon: spaceIcon("enjeux"), ph: `Filtrer les amendements « ${th.label} »…`, q: "", sel: 0, detail: true, large: true,
    dd: {value: "all", options: [["all", "Tous les sorts"], ["adopte", "Adoptés"], ["rejete", "Rejetés"], ["tombe", "Tombés"], ["retire", "Retirés ou non soutenus"], ["ecarte", "Écartés"]]},
    sections(){
      const f = this.dd.value, ok = a => f === "all" || NX.sortKey(a) === f || (f === "retire" && NX.sortKey(a) === "ns");
      return [{title: `Amendements · ${th.label}`, items: NX.themeAms(th).filter(ok).map(a => itemConc({lead: a, members: [a], kind: "single"}, amAl(a), "theme"))}];
    }};
}
function themeAlsV(id){
  const th = THEMES.find(t => t.id === id);
  return {kind: "list", key: "thal:" + id, space: "atelier", title: `Alinéas · ${th.label}`, icon: spaceIcon("atelier"), ph: "Filtrer les alinéas…", q: "", sel: 0, detail: true, large: true,
    sections: () => [{title: `Alinéas du thème « ${th.label} »`, items: themeAls(th).map(o => ({key: "o:" + o, icon: numI(o), title: `Alinéa ${o}`, sub: NX.alShort(o, 80), kw: TRANSMIS[o - 1],
      acc: [draftsOn(o).length ? {icon: I.pencil, c: ME_C, tip: "un de mes brouillons"} : null, {tag: String(concurrents(o).units.length), c: "var(--text2)", tip: "concurrents"}],
      detail: () => ({md: `<h1>Alinéa ${o}</h1><div class="sub">thème « ${esc(th.label)} »</div>${refBlock(o)}${draftsOn(o).map(mineBlock).join("")}`, meta: meta([["Concurrents", String(concurrents(o).units.length)], ["Passages disputés", unitTags(o)]])}),
      actions: () => [A("Ouvrir l'alinéa", I.arrow, () => push(alineaV(o))), A("Amender cet alinéa", I.pencil, () => amend(o), "alt+n")]}))}]};
}
function matrixV(){
  return {kind: "detail", key: "mx", space: "enjeux", title: "Thèmes × groupes", subtitle: "nombre d'amendements", icon: spaceIcon("enjeux"), large: true,
    md(){
      const M = NX.matrix(), max = Math.max(1, ...M.rows.flatMap(r => r.cells.map(c => c.length)));
      return `<h1>Thèmes × groupes</h1><div class="sub">Nombre d'amendements par thème et par groupe : une seule chose comptée. Cliquer une ligne ouvre le thème.</div>
        <div class="tw"><table><tr><th>Thème</th>${M.gs.map(g => `<th class="c" title="${esc(GR[g].name)}"><span class="da-groupe" style="--g:${GR[g].color}"></span>${g}</th>`).join("")}<th class="c">Rapp.</th></tr>
        ${M.rows.map(r => `<tr data-th="${r.th.id}" style="cursor:pointer"><td>${esc(r.th.label)}</td>${r.cells.map(c => `<td class="c" style="background:color-mix(in srgb,var(--da-encre-2) ${Math.round(c.length / max * 35)}%,transparent)">${c.length || ""}</td>`).join("")}<td class="c">${r.inst.length || ""}</td></tr>`).join("")}</table></div>
        <h3>Groupes (fictifs)</h3><p>${M.gs.map(g => tag(`${g} · ${GR[g].name}`, GR[g].color)).join(" ")}</p>`;
    }, actions: () => []};
}

/* — Réunion — */
function reunionV(focus){
  const max = Math.max(...NX.episodes.map(e => e.mots));
  return {kind: "list", key: "reunion", space: "reunion", title: "Réunion", icon: spaceIcon("reunion"), ph: "Rechercher une place, un orateur, un amendement…", q: "", sel: 1, detail: true, large: true, focus,
    dd: {value: "all", options: [["all", "Toutes les places"], ["ad", "Avec un amendement adopté"], ...THEMES.map(t => ["t:" + t.id, "Thème · " + t.label])]},
    sections(){
      const f = this.dd.value, th = f.startsWith("t:") ? THEMES.find(t => "t:" + t.id === f) : null, tset = th ? new Set(th.amendements) : null;
      const eps = NX.episodes.filter(e => f === "all" || (f === "ad" && adopted(e)) || (tset && e.ams.some(id => tset.has(id))));
      return [
        {title: "Vue d'ensemble", items: [{key: "ov", icon: li(I.bar, "var(--green)"), title: "Les 26 places à l'échelle des mots", sub: "", acc: [{text: `${NX.episodes.reduce((s, e) => s + e.mots, 0).toLocaleString("fr-FR")} mots`}], detail: overviewDetail, actions: () => []}]},
        {title: "Commission des affaires économiques · 21 septembre 2026 · ordre d'appel", items: eps.map(e => ({key: "p:" + e.place, icon: numI(e.place), title: `Place ${e.place}`, sub: placeShort(e),
          kw: e.titre + " " + e.ams.map(id => AM[id] ? AM[id].num : id).join(" ") + " " + e.paroles.map(p => p.nom).join(" "),
          acc: [{html: `<span class="bar${adopted(e) ? " ad" : ""}" style="width:${Math.max(3, Math.round(e.mots / max * 56))}px" title="${e.mots} mots"></span>`}, {html: `<span class="ax" style="min-width:74px;text-align:right">${e.mots.toLocaleString("fr-FR")} mots</span>`}, adopted(e) ? {icon: I.check, c: "var(--green)", tip: "un amendement adopté"} : {html: `<span style="width:20px"></span>`}],
          detail: () => placeDetail(e),
          actions: () => [{title: "Amendements de la place", items: e.ams.filter(id => AM[id]).map(id => A(`Ouvrir ${AM[id].num} dans l'atelier`, I.pencil, () => openAm(id)))}]}))},
      ];
    }};
}
function placeDetail(e){
  const ams = e.ams.map(id => AM[id]).filter(Boolean);
  return {md: `<h1>Place ${e.place}</h1><div class="sub">${esc(e.titre)}</div>
    <h2>Liste de vote</h2><div class="tw"><table><tr><th>Auteur · groupe</th><th>N°</th><th>Objet</th><th class="c">Avis</th><th>Sort</th></tr>${ams.map(a => `<tr data-am="${a.id}"><td>${esc(a.auteur || who(a).name)}<br>${tag(gabbr(a), gcol(a), ` title="${esc(who(a).name)}"`)}</td><td class="mono">${a.num}</td><td>${esc(short(objetOf(a), 110))}</td><td class="c" title="${esc(a.avis || "")}">${avisSym(a.avis)}</td><td>${sortTag(a)}</td></tr>`).join("")}</table></div>
    <h2>Prises de parole (${e.paroles.length})</h2>${e.paroles.map(p => `<p><b>${esc(NX.speaker(p))}</b> <span style="color:var(--text3);font-size:12px">· ${p.mots} mots</span><br><span style="color:var(--text2)">${esc(p.txt)}</span></p>`).join("") || '<p class="empty-note">Aucune.</p>'}
    <h2>Décisions</h2><ul>${e.decisions.map(d => `<li>${esc(d.txt)}</li>`).join("") || "<li>—</li>"}</ul>`,
    meta: meta([["Mots prononcés", String(e.mots)], ["Prises de parole", String(e.paroles.length)], ["Amendements", String(ams.length)], ["Adoptés", String(ams.filter(a => a.sort === "Adopté").length)]])};
}
function overviewDetail(){
  const E = NX.episodes, tot = E.reduce((s, e) => s + e.mots, 0), max = Math.max(...E.map(e => e.mots));
  return {md: `<h1>Les 26 places à l'échelle des mots</h1><div class="sub">${tot.toLocaleString("fr-FR")} mots prononcés · en vert, les places où un amendement a été adopté · cliquer une place</div>
    <div style="display:flex;gap:2px;height:26px;margin:10px 0 18px">${E.map(e => `<div data-selplace="${e.place}" title="Place ${e.place} · ${e.mots} mots" style="flex:${e.mots} 1 0;min-width:3px;border-radius:0;cursor:pointer;background:${adopted(e) ? "var(--da-encre)" : "var(--da-filet-fort)"}"></div>`).join("")}</div>
    ${E.map(e => `<div data-selplace="${e.place}" style="display:flex;align-items:center;gap:10px;height:24px;cursor:pointer;font-size:13px"><span class="mono" style="width:22px;text-align:right;color:var(--text3)">${e.place}</span><span class="bar${adopted(e) ? " ad" : ""}" style="width:${Math.max(3, e.mots / max * 60)}%;height:8px"></span><span style="color:var(--text2);white-space:nowrap">${e.mots}${adopted(e) ? ' <span style="color:var(--da-encre)">✓</span>' : ""}</span></div>`).join("")}`};
}

/* — Lisez-moi — */
function readmeV(){
  return {kind: "detail", key: "readme", title: "Lisez-moi · à propos", icon: ai(I.info, "var(--text2)"), large: true,
    md: () => `<h1>Boussole</h1><div class="sub">Maquette inspirée de Raycast (lanceur macOS, v1 et v2 « Liquid Glass ») · article 4 du projet de loi logement · données réelles, groupes politiques fictifs</div>
      <p>La forme suit désormais la direction artistique « Le bordereau » (<code>direction-artistique/DA.md</code>) : papier, encre, bordereau à cadre complet ; la structure Raycast est inchangée.</p>
      <h2>Comment s'en servir</h2><ul>
        <li>Tout se pilote au clavier : ${kc("up")} ${kc("down")} (ou ${kc("ctrl+n")} ${kc("ctrl+p")}) parcourir · ${kc("mod+up")} ${kc("mod+down")} section précédente / suivante · ${kc("alt+up")} ${kc("alt+down")} page · ${kc("enter")} action principale · ${kc("mod+enter")} action secondaire.</li>
        <li>${kc("mod+k")} ouvre le <b>panneau d'actions</b> de l'élément sélectionné : « press ⌘K whenever you're unsure ». Chaque action affiche son raccourci à droite, pour l'apprendre.</li>
        <li>${kc("esc")} revient à la vue précédente (efface d'abord la recherche) ; ${kc("mod+esc")} revient à la racine. ${kc("mod+p")} ouvre le menu déroulant de la barre de recherche.</li>
        <li>Hors Mac, ${kc("mod")} = Ctrl. Les raccourcis que Raycast écrit ${kc("mod+shift")} (réservés par le navigateur) passent ici sur ${kc("alt")} : ${kc("alt+a")} ajouter au comparateur, ${kc("alt+r")} référence, ${kc("alt+t")} thème, ${kc("alt+l")} grande fenêtre, ${kc("alt+m")} mode compact.</li></ul>
      <h2>Les quatre espaces, en commandes</h2><ul>
        <li><b>Racine</b> : la recherche unifiée (espaces, brouillons, alinéas, amendements, thèmes, places, réglages) ; le menu « Tout ⌄ » restreint à une catégorie.</li>
        <li><b>Dossier</b> : liste + détail des 16 articles ; l'article 4 en liste dont chaque ligne porte sa <b>grille d'étapes</b> en accessoire (quatre pastilles : origine, modifié, inchangé, absent) et, en détail, l'alinéa d'étape en étape ; la grille complète en tableau ; le texte à chaque étape ; le code général des impôts.</li>
        <li><b>Atelier</b> : mes brouillons (détail : la référence vierge, puis ma rédaction en corrections apparentes) ; un alinéa = une liste à sections (mes brouillons, passages disputés, concurrents avec accessoires groupe et sort, rédactionnels, écartés) et menu déroulant par sort ; l'édition est une vue <b>Form</b> avec calque miroir ; « Comparer » ouvre trois colonnes <b>l'une | la référence | l'autre</b>.</li>
        <li><b>Enjeux</b> : une <b>Grid</b> de vignettes (thèmes déclarés par le rapport, thèmes calculés par mots-clés, la matrice) ; la fiche en Détail : rapport, réunion, mon texte, amendements ; métadonnées à droite.</li>
        <li><b>Réunion</b> : les 26 places dans l'ordre d'appel, accessoires « mots » (barre et nombre) et ✓ si adopté ; la vue d'ensemble à l'échelle des mots ; le détail : liste de vote, paroles, décisions.</li></ul>
      <h2>Ce qui est emprunté à Raycast</h2><ul>
        <li><b>Squelette</b> : une fenêtre flottante 750 × 475, rayon 18, sur un bureau ; barre de recherche 56 px (retour ‹, champ 16 px, menu déroulant à droite), filet 10 % ; liste à sections (titres 12 px / 500) ; lignes 40 px, marge 8, <b>sélection en pastille arrondie 10 px</b> à 10 % ; icônes 20 px, écart 12 ; <b>accessoires</b> à droite (texte, icône, tag coloré = texte coloré sur fond de même couleur à 15 %).</li>
        <li><b>Liste + détail</b> 38 % / 62 % (Markdown en haut, métadonnées en bas : libellé gris / valeur à droite, TagList, Separator) ; <b>Detail</b> avec métadonnées à droite ; <b>Grid</b> 5 colonnes, vignettes rayon 8 ; <b>Form</b> ; <b>EmptyView</b>.</li>
        <li><b>Barre d'actions</b> en bas, v2 : pilule flottante « action principale ↵ | Actions ⌘K » ; à gauche l'icône et le nom de la commande, ou le <b>toast</b> (animé, succès, échec, avec action).</li>
        <li><b>Action Panel</b> : titre en tête, 1re action ↵, 2e ⌘↵, sections séparées par des filets, « Rechercher une action… » en bas, raccourcis en touches-pastilles (22 × 20, rayon 6, fond texte 10 %), « … » pour un sous-menu.</li>
        <li><b>Pile de navigation</b> (Échap, ⌘Échap), <b>mode compact</b> (seule la barre de recherche tant que la saisie est vide), fenêtres plus grandes pour les vues de lecture, comme les fenêtres AI Chat et Notes de la v2.</li>
        <li><b>Couleurs</b> : thème à 12 clés ; valeurs du site sombre (fond #07080A, texte #F4F4F6, bleu #57C1FF, vert #59D499, jaune #FFC533, rouge #FF6161) ; fenêtre « verre » : dégradé vertical background → backgroundSecondary, <code>backdrop-filter: blur(72px)</code>, contour intérieur 1 px à 20 % du texte ; texte secondaire 60 %, indicatif 40 %. Thème clair en verre clair.</li>
        <li><b>Typographie</b> : SF Pro n'étant pas libre, pile système puis <b>Inter</b> (Google Fonts) ; chasse fixe <b>JetBrains Mono</b> (Google Fonts).</li></ul>
      <h2>Sources</h2><ul><li>manual.raycast.com (Action Panel, New in v2) ; developers.raycast.com/api-reference/user-interface (List, Grid, Detail, Form, Action Panel, Navigation, Toast) ; raycast.com/blog/a-fresh-look-and-feel ; captures publiques de la v2 et de la documentation des extensions (dossier <code>ref/</code> de la maquette) ; ray.so pour les jetons de thème.</li></ul>
      <h2>Écarts assumés</h2><ul>
        <li>La direction artistique « papier sombre » du projet est <b>suspendue</b> : la forme suit Raycast. Les règles de comparaison sont gardées : la <b>référence reste vierge</b>, les corrections apparentes sont portées sur la rédaction comparée (ajout : vert, gras, souligné ; suppression : rouge, barrée, toujours visible), <b>symétrie stricte</b> entre ma rédaction et celle d'un autre groupe (mêmes blocs, mêmes marques).</li>
        <li>Raycast n'a pas de surlignage : les <b>passages disputés</b> empruntent le tag jaune à 15 % (pointillé ; plus dense quand plus de propositions) ; un clic ouvre les propositions regroupées. Un clic sur une correction ouvre la <b>loupe</b> : la rédaction et la référence côte à côte.</li>
        <li>Aucun logo, aucun fond d'écran copié : le bureau est un dégradé dessiné en CSS. Pas de score : les seuls nombres comptent une chose (amendements, mots, propositions, alinéas).</li>
        <li>Sur écran étroit, la fenêtre occupe l'écran ; dans une liste + détail, toucher une ligne pousse son détail (comme une vue de plus dans la pile).</li></ul>`,
    meta: () => meta([["Inspiration", "Raycast (macOS)"], ["Fenêtre", "750 × 475, rayon 18"], ["Lignes", "40 px"], ["Police", "Inter · JetBrains Mono"], "-", ["Brouillons", String(MINE.length)], ["Référence", esc(refShort())], ["Amendements", String(ALL.length)]]),
    actions: () => []};
}

/* ---------- vue « détail seul » (écran étroit : toucher une ligne pousse son détail) ---------- */
function focusV(it, parent){
  const d = it.detail();
  return {kind: "detail", key: "f:" + it.key, space: parent.space, title: it.title, icon: parent.icon, large: parent.large, md: () => d.md, meta: d.meta ? () => d.meta : null, actions: it.actions};
}

/* ---------- filtrage ---------- */
function match(it, q){ if (!q) return true; const h = N([it.title, it.sub, it.kw].join(" ")); return N(q).split(/\s+/).filter(Boolean).every(w => h.includes(w)); }
function listData(v){
  const q = v.q.trim();
  const secs = v.sections(q).map(s => { let items = s.items.filter(it => match(it, q)); if (s.cap) items = items.slice(0, s.cap); return {...s, items}; }).filter(s => s.items.length);
  const flat = []; secs.forEach(s => s.items.forEach(it => { it._i = flat.length; flat.push(it); }));
  if (v.focus){ const i = flat.findIndex(it => it.key === v.focus || (it.alt || []).includes(v.focus)); if (i >= 0) v.sel = i; v.focus = null; }
  v.sel = clamp(v.sel, 0, Math.max(0, flat.length - 1));
  v._flat = flat; v._secs = secs;
  return {secs, flat};
}
const selItem = () => { const v = cur(); return (v.kind === "list" || v.kind === "grid") && v._flat ? v._flat[v.sel] : null; };

/* ---------- rendu ---------- */
const W = $("#win"), BODY = $("#body"), Q = $("#q");
function render(){
  const v = cur();
  document.documentElement.dataset.theme = UI.theme;
  W.classList.toggle("large", !!(v.large || UI.large));
  W.classList.toggle("compact", !!(UI.compact && STACK.length === 1 && !v.q));
  renderHead(v); renderBody(v); renderFoot();
}
function renderHead(v){
  $("#back").hidden = STACK.length < 2;
  const isQ = v.kind === "list" || v.kind === "grid";
  Q.style.display = isQ ? "" : "none"; $("#htitle").hidden = isQ;
  $("#glyph").style.display = STACK.length < 2 ? "" : "none"; $("#glyph").innerHTML = I.search;
  if (isQ){ if (Q.value !== v.q) Q.value = v.q; Q.placeholder = v.ph; if (!AP && !DDP && !narrow()) Q.focus(); }
  else { $("#htitle").innerHTML = esc(v.title) + (v.subtitle ? `<small>${esc(v.subtitle)}</small>` : ""); if (document.activeElement === Q) Q.blur(); }
  const dd = $("#dd"); dd.hidden = !v.dd;
  if (v.dd) dd.innerHTML = esc(v.dd.options.find(o => o[0] === v.dd.value)[1]) + I.chev;
}
function rowHTML(it, on){
  const acc = (it.acc || []).filter(Boolean).map(x => x.tag != null ? `<span class="${tagCls(x.c)}" style="--c:${x.c}"${x.tip ? ` title="${esc(x.tip)}"` : ""}>${esc(x.tag)}</span>` : x.html ? x.html : x.icon ? `<span class="li" style="--c:${x.c || "var(--text2)"}"${x.tip ? ` title="${esc(x.tip)}"` : ""}>${x.icon}</span>` : `<span class="ax"${x.c ? ` style="color:${x.c}"` : ""}${x.tip ? ` title="${esc(x.tip)}"` : ""}>${esc(x.text)}</span>`).join("");
  return `<div class="row${on ? " on" : ""}" data-i="${it._i}" role="option" aria-selected="${on}">${it.icon || ""}<span class="tt">${esc(it.title)}</span><span class="st">${esc(it.sub || "")}</span><span class="acc">${acc}</span></div>`;
}
const emptyView = v => `<div class="emptyv"><span class="ei">${I.search}</span><b>Aucun résultat</b><span>${v.q ? `Rien ne correspond à « ${esc(v.q)} ».` : "Rien à afficher avec ce filtre."} ${kc("esc")} pour effacer.</span></div>`;
function detHTML(it){
  if (!it || !it.detail) return `<div class="emptyv"><span class="ei">${I.info}</span><span>Pas de détail.</span></div>`;
  const d = it.detail();
  return `<div class="md">${d.md}</div>${d.meta ? `<div class="meta">${d.meta}</div>` : ""}`;
}
function renderBody(v){
  closeLoupe();
  if (v.kind === "list" || v.kind === "grid"){
    const {secs, flat} = listData(v);
    if (!flat.length){ BODY.innerHTML = emptyView(v); return; }
    let inner;
    if (v.kind === "grid") inner = `<div class="list" id="lst">${secs.map(s => `<div class="sec-t">${esc(s.title)}</div><div class="grid">${s.items.map(it => `<div class="cell${it._i === v.sel ? " on" : ""}" data-i="${it._i}">${it.tile}<div class="ct">${esc(it.title)}</div><div class="cs">${esc(it.sub || "")}</div></div>`).join("")}</div>`).join("")}</div>`;
    else inner = `<div class="list" id="lst" role="listbox">${secs.map(s => `<div class="sec-t">${esc(s.title)}</div>` + s.items.map(it => rowHTML(it, it._i === v.sel)).join("")).join("")}</div>`;
    BODY.innerHTML = v.detail ? `<div class="split">${inner}<div class="det" id="det">${detHTML(flat[v.sel])}</div></div>` : inner;
    scrollSel();
  } else if (v.kind === "detail"){
    BODY.innerHTML = `<div class="dview"><div class="md">${v.md()}</div>${v.meta ? `<aside class="meta">${v.meta()}</aside>` : ""}</div>`;
  } else {
    BODY.innerHTML = v.html();
    if (v.after) v.after();
  }
}
function scrollSel(){ const el = BODY.querySelector(`#lst [data-i="${cur().sel}"]`); if (el) el.scrollIntoView({block: "nearest"}); }
function selectTo(i){
  const v = cur(); if (!v._flat || !v._flat.length) return;
  i = clamp(i, 0, v._flat.length - 1); if (i === v.sel) return;
  const old = BODY.querySelector(`#lst [data-i="${v.sel}"]`); if (old) old.classList.remove("on");
  v.sel = i; const el = BODY.querySelector(`#lst [data-i="${i}"]`); if (el) el.classList.add("on");
  if (v.detail && $("#det")){ $("#det").innerHTML = detHTML(v._flat[i]); }
  scrollSel(); renderFoot();
}

/* contexte d'actions : l'élément sélectionné (ou la vue), puis les actions de la Boussole */
function ctx(){
  const v = cur(), it = selItem();
  const own = asSecs(it ? (it.actions ? it.actions() : []) : (v.actions ? v.actions() : []));
  return {title: it ? it.title : v.title, own, all: [...own, ...globalSecs()]};
}
const flatOwn = c => c.own.flatMap(s => s.items);
function primaries(){
  const v = cur(), f = flatOwn(ctx());
  if (v.kind === "form") return [f[0], null];
  return [f[0] || null, f[1] || null];
}
function runAction(a){
  if (!a) return;
  if (a.sub){ openPanel({title: a.t.replace("…", ""), sections: a.sub()}); return; }
  closeAll(); a.run();
}

/* ---------- pied : nom de la commande ou toast ; pilule « action ↵ | Actions ⌘K » ---------- */
let TOAST = null, TT = 0;
function toast(style, title, msg, action){
  TOAST = {style, title, msg, action}; clearTimeout(TT); renderFoot();
  if (style !== "animated") TT = setTimeout(() => { TOAST = null; renderFoot(); }, action ? 6000 : 2800);
}
function renderFoot(){
  const v = cur();
  if (TOAST){
    const ic = TOAST.style === "animated" ? `<span class="spin"></span>` : `<span class="tic" style="--c:${TOAST.style === "failure" ? "var(--da-del)" : "var(--da-encre)"}">${TOAST.style === "failure" ? I.x : I.check}</span>`;
    $("#fl").innerHTML = `<span class="toast">${ic}<span class="nm">${esc(TOAST.title)}</span>${TOAST.msg ? `<span class="msg">${esc(TOAST.msg)}</span>` : ""}${TOAST.action ? `<span class="ta" data-toastact>${esc(TOAST.action.t)}</span>` : ""}</span>`;
  } else $("#fl").innerHTML = `${v.icon || ""}<span class="nm">${esc(STACK.length > 1 ? STACK.slice(1).map(x => x.title).slice(-2).join(" › ") : "Boussole")}</span>`;
  const [p] = primaries(), isForm = v.kind === "form";
  $("#pill").innerHTML = (p ? `<button data-primary title="${esc(p.t)}"><span class="lbl">${esc(p.t)}</span>${kc(isForm ? "mod+enter" : "enter")}</button><span class="sep"></span>` : "") + `<button class="act2" data-panel><span class="lbl">Actions</span>${kc("mod+k")}</button>`;
}

/* ---------- Action Panel ⌘K ---------- */
let AP = null;
function openPanel(level){
  closeDD();
  if (!level){ const c = ctx(), f = flatOwn(c), form = cur().kind === "form"; level = {title: c.title, sections: c.all, prim: f[0], sec: form ? null : f[1]}; AP = {levels: [level], q: "", sel: 0}; }
  else { if (!AP) AP = {levels: [], q: "", sel: 0}; AP.levels.push(level); AP.q = ""; AP.sel = 0; }
  let el = $("#ap");
  if (!el){ el = document.createElement("div"); el.id = "ap"; el.className = "pop"; el.innerHTML = `<div class="apt"></div><div class="apl"></div><div class="apin"><input id="apq" placeholder="Rechercher une action…" spellcheck="false" autocomplete="off"></div>`; W.appendChild(el);
    el.querySelector("#apq").addEventListener("input", e => { AP.q = e.target.value; AP.sel = 0; panelList(); }); }
  el.querySelector("#apq").value = ""; panelList(); el.querySelector("#apq").focus();
}
function panelList(){
  const L = AP.levels[AP.levels.length - 1], q = AP.q.trim(), el = $("#ap");
  el.querySelector(".apt").textContent = L.title;
  const secs = L.sections.map(s => ({...s, items: s.items.filter(a => !q || N(a.t).includes(N(q)))})).filter(s => s.items.length);
  const flat = []; secs.forEach(s => s.items.forEach(a => flat.push(a))); AP.flat = flat; AP.sel = clamp(AP.sel, 0, Math.max(0, flat.length - 1));
  let k = 0;
  el.querySelector(".apl").innerHTML = secs.map((s, si) => (si ? `<div class="aps"></div>` : "") + (s.title && si ? `<div class="aph">${esc(s.title)}</div>` : "") + s.items.map(a => { const i = k++, sc = a === L.prim ? (cur().kind === "form" ? "mod+enter" : "enter") : a === L.sec ? "mod+enter" : a.sc;
    return `<div class="ait${i === AP.sel ? " on" : ""}${a.danger ? " danger" : ""}" data-ai="${i}">${li(a.icon || I.arrow)}<span class="at">${esc(a.t)}</span>${sc ? kc(sc) : ""}</div>`; }).join("")).join("") || `<div class="aph">Aucune action</div>`;
  const on = el.querySelector(".ait.on"); if (on) on.scrollIntoView({block: "nearest"});
}
function closePanel(){ AP = null; const el = $("#ap"); if (el) el.remove(); }
function panelBack(){ if (AP.levels.length > 1){ AP.levels.pop(); AP.q = ""; AP.sel = 0; $("#apq").value = ""; panelList(); } else { closePanel(); refocus(); } }

/* ---------- menu déroulant de la barre de recherche ---------- */
let DDP = null;
function openDD(){
  const v = cur(); if (!v.dd) return; closePanel();
  DDP = {sel: Math.max(0, v.dd.options.findIndex(o => o[0] === v.dd.value))};
  let el = $("#ddp"); if (!el){ el = document.createElement("div"); el.id = "ddp"; el.className = "pop"; el.innerHTML = `<div class="apl"></div>`; W.appendChild(el); }
  $("#dd").classList.add("open"); ddList();
}
function ddList(){
  const v = cur(), el = $("#ddp");
  el.querySelector(".apl").innerHTML = v.dd.options.map((o, i) => `<div class="ait${i === DDP.sel ? " on" : ""}" data-ddi="${i}"><span class="ck">${o[0] === v.dd.value ? I.check : ""}</span><span class="at">${esc(o[1])}</span></div>`).join("");
  const on = el.querySelector(".ait.on"); if (on) on.scrollIntoView({block: "nearest"});
}
function closeDD(){ DDP = null; const el = $("#ddp"); if (el) el.remove(); $("#dd").classList.remove("open"); }
function pickDD(i){ const v = cur(); v.dd.value = v.dd.options[i][0]; v.sel = 0; closeDD(); render(); }

/* ---------- loupe : clic sur une correction → la rédaction et la référence côte à côte ---------- */
function openLoupe(id){
  const h = HUNKS.get(+id); if (!h) return; closeLoupe();
  const refPart = h.seg.filter(s => s.type !== "ins").map(s => esc(s.text)).join("");
  const el = document.createElement("div"); el.id = "loupe"; el.className = "pop";
  el.style.cssText = "left:50%;top:64px;transform:translateX(-50%)";
  const who_ = h.meta.m ? draftNum(MINE.find(m => m.id === h.meta.m) || MINE[0]) : h.meta.a ? AM[h.meta.a].num : "la rédaction";
  el.innerHTML = `<div class="lh">Loupe · alinéa ${h.meta.o || ""}<span class="x">${kc("esc")}</span></div><div class="lc"><div><div class="tb-h">${esc(who_)} · corrections apparentes</div><div class="lx"><span class="ctx">${esc(h.before)}</span>${renderOps(h.seg)}<span class="ctx">${esc(h.after)}</span></div></div><div><div class="tb-h">Référence · ${esc(refShort())} ${tag("vierge")}</div><div class="lx ref"><span class="ctx">${esc(h.before)}</span><span style="color:var(--text)">${refPart || "<i>(rien)</i>"}</span><span class="ctx">${esc(h.after)}</span></div></div></div>`;
  W.appendChild(el);
}
function closeLoupe(){ const el = $("#loupe"); if (el) el.remove(); }
function closeAll(){ closePanel(); closeDD(); closeLoupe(); }
const refocus = () => { if ((cur().kind === "list" || cur().kind === "grid") && !narrow()) Q.focus(); };

/* ---------- gestes : souris ---------- */
Q.addEventListener("input", () => { const v = cur(); v.q = Q.value; v.sel = 0; W.classList.toggle("compact", !!(UI.compact && STACK.length === 1 && !v.q)); renderBody(v); renderFoot(); });
$("#back").addEventListener("click", pop);
$("#dd").addEventListener("click", e => { e.stopPropagation(); DDP ? closeDD() : openDD(); });
document.addEventListener("click", e => {
  const t = e.target;
  if (AP && !t.closest("#ap")){ if (!t.closest("[data-panel]")){ closePanel(); refocus(); } }
  if (DDP && !t.closest("#ddp") && !t.closest("#dd")) closeDD();
  if ($("#loupe") && !t.closest("#loupe") && !t.closest("[data-h]")) closeLoupe();
  const ai_ = t.closest("[data-ai]"); if (ai_ && AP){ runAction(AP.flat[+ai_.dataset.ai]); return; }
  const di = t.closest("[data-ddi]"); if (di) return pickDD(+di.dataset.ddi);
  if (t.closest("[data-panel]")){ AP ? (closePanel(), refocus()) : openPanel(); return; }
  if (t.closest("[data-primary]")) return runAction(primaries()[0]);
  if (t.closest("[data-toastact]")){ const a = TOAST && TOAST.action; TOAST = null; renderFoot(); if (a) a.run(); return; }
  const v = cur();
  const mk = t.closest("mark.pt[data-u]"); if (mk){ const o = +mk.closest("[data-o]").dataset.o; return push(clustersV(o, +mk.dataset.u)); }
  const h = t.closest("[data-h]"); if (h) return openLoupe(h.dataset.h);
  const ut = t.closest("[data-u][data-o]"); if (ut) return push(clustersV(+ut.dataset.o, +ut.dataset.u));
  const am = t.closest("[data-am]"); if (am){ return spaceOf() === "atelier" ? push(amV(am.dataset.am)) : openAm(am.dataset.am); }
  const full = t.closest("[data-full]"); if (full) return push(amV(full.dataset.full));
  const pl = t.closest("[data-place]"); if (pl) return openPlace(+pl.dataset.place);
  const sp = t.closest("[data-selplace]"); if (sp && v._flat){ const i = v._flat.findIndex(x => x.key === "p:" + sp.dataset.selplace); if (i >= 0){ selectTo(i); return; } return openPlace(+sp.dataset.selplace); }
  const th = t.closest("[data-th]"); if (th) return openTheme(th.dataset.th);
  const al = t.closest("[data-al]"); if (al) return openAtelierAl(+al.dataset.al);
  const ga = t.closest("[data-goal]"); if (ga) return push(art4V("o:" + ga.dataset.goal));
  const amd = t.closest("[data-amend]"); if (amd) return amend(+amd.dataset.amend);
  const dr = t.closest("[data-draft]"); if (dr){ const m = MINE.find(x => x.id === dr.dataset.draft); if (m) return openAtelierAl(m.al, "m:" + m.id); }
  if (t.closest("[data-art4]")) return push(art4V());
  if (t.closest("[data-unfold]")){ v.unfold = true; return render(); }
  const row = t.closest("#lst [data-i]");
  if (row){
    const i = +row.dataset.i; selectTo(i);
    if (narrow()){ const it = v._flat[i]; if (it.detail) push(focusV(it, v)); else runAction(primaries()[0]); }
  }
});
document.addEventListener("dblclick", e => {
  const ed = e.target.closest("[data-edit]"); if (ed && !e.target.closest("mark.pt,[data-h]")){ const m = MINE.find(x => x.id === ed.dataset.edit); if (m && m.mode !== "supprimer") push(formV(m)); return; }
  if (e.target.closest("#lst [data-i]") && !narrow()) runAction(primaries()[0]);
});

/* ---------- gestes : clavier ---------- */
const hit = (e, sc) => {
  const p = sc.split("+"), k = p[p.length - 1];
  if (p.includes("mod") !== (e.metaKey || e.ctrlKey) || p.includes("alt") !== e.altKey || p.includes("shift") !== e.shiftKey) return false;
  if (k === "enter") return e.key === "Enter"; if (k === "esc") return e.key === "Escape"; if (k === "backspace") return e.key === "Backspace";
  if (/^[a-z]$/.test(k)) return e.code === "Key" + k.toUpperCase();
  return e.key.toLowerCase() === k;
};
function move(d){ const v = cur(); if (v._flat && v._flat.length) selectTo(clamp(v.sel + d, 0, v._flat.length - 1)); }
function moveSection(d){
  const v = cur(); if (!v._secs) return;
  const starts = []; let k = 0; v._secs.forEach(s => { starts.push(k); k += s.items.length; });
  let si = 0; starts.forEach((s, i) => { if (v.sel >= s) si = i; });
  const t = d > 0 ? starts[Math.min(starts.length - 1, si + 1)] : (v.sel > starts[si] ? starts[si] : starts[Math.max(0, si - 1)]);
  selectTo(t);
}
function gridCols(){ return narrow() ? 3 : 5; }
document.addEventListener("keydown", e => {
  const k = e.key, mod = e.metaKey || e.ctrlKey, v = cur();
  if (k === "Escape" && $("#loupe")){ e.preventDefault(); closeLoupe(); return; }
  if (AP){
    if (k === "Escape" || (mod && e.code === "KeyK")){ e.preventDefault(); return mod ? (closePanel(), refocus()) : panelBack(); }
    if (k === "ArrowDown" || (e.ctrlKey && e.code === "KeyN")){ e.preventDefault(); AP.sel = Math.min(AP.flat.length - 1, AP.sel + 1); return panelList(); }
    if (k === "ArrowUp" || (e.ctrlKey && e.code === "KeyP")){ e.preventDefault(); AP.sel = Math.max(0, AP.sel - 1); return panelList(); }
    if (k === "Enter"){ e.preventDefault(); return runAction(AP.flat[AP.sel]); }
    if (k === "Backspace" && !AP.q && AP.levels.length > 1){ e.preventDefault(); return panelBack(); }
    const sc = AP.flat.find(a => a.sc && hit(e, a.sc)); if (sc){ e.preventDefault(); return runAction(sc); }
    return;
  }
  if (DDP){
    if (k === "Escape"){ e.preventDefault(); closeDD(); return refocus(); }
    if (k === "ArrowDown"){ e.preventDefault(); DDP.sel = Math.min(v.dd.options.length - 1, DDP.sel + 1); return ddList(); }
    if (k === "ArrowUp"){ e.preventDefault(); DDP.sel = Math.max(0, DDP.sel - 1); return ddList(); }
    if (k === "Enter"){ e.preventDefault(); return pickDD(DDP.sel); }
    return;
  }
  if (mod && e.code === "KeyK"){ e.preventDefault(); return openPanel(); }
  if (mod && e.code === "KeyP" && v.dd){ e.preventDefault(); return openDD(); }
  if (k === "Escape" && mod){ e.preventDefault(); return toRoot(); }
  if (v.kind === "form"){
    if (k === "Escape"){ e.preventDefault(); pop(); return toast("success", "Modifications abandonnées"); }
    if (k === "Enter" && mod){ e.preventDefault(); return v.submit(); }
    const sc = flatOwn(ctx()).find(a => a.sc && a.sc !== "esc" && hit(e, a.sc)); if (sc){ e.preventDefault(); return runAction(sc); }
    return;
  }
  if (k === "Escape"){ e.preventDefault(); if (v.q){ v.q = ""; Q.value = ""; v.sel = 0; return render(); } return pop(); }
  const isL = v.kind === "list" || v.kind === "grid";
  if (isL){
    const step = v.kind === "grid" ? gridCols() : 1;
    if (k === "ArrowDown" && mod){ e.preventDefault(); return moveSection(1); }
    if (k === "ArrowUp" && mod){ e.preventDefault(); return moveSection(-1); }
    if (k === "ArrowDown" && e.altKey){ e.preventDefault(); return move(8); }
    if (k === "ArrowUp" && e.altKey){ e.preventDefault(); return move(-8); }
    if (k === "ArrowDown" || (e.ctrlKey && !e.metaKey && e.code === "KeyN")){ e.preventDefault(); return move(step); }
    if (k === "ArrowUp" || (e.ctrlKey && !e.metaKey && e.code === "KeyP" && !v.dd)){ e.preventDefault(); return move(-step); }
    if (v.kind === "grid" && (k === "ArrowRight" || k === "ArrowLeft") && !Q.value.length){ e.preventDefault(); return move(k === "ArrowRight" ? 1 : -1); }
  } else {
    const sc = BODY.querySelector(".md,.cmpwrap");
    if (sc && (k === "ArrowDown" || k === "ArrowUp")){ e.preventDefault(); sc.scrollBy({top: k === "ArrowDown" ? 80 : -80}); return; }
  }
  if (k === "Enter" && !e.altKey && !e.shiftKey){ e.preventDefault(); const [p, s] = primaries(); return runAction(mod ? s : p); }
  const all = ctx().all.flatMap(s => s.items).find(a => a.sc && hit(e, a.sc));
  if (all){ e.preventDefault(); return runAction(all); }
  if (isL && document.activeElement !== Q && k.length === 1 && !mod && !e.altKey){ Q.focus(); }
});
addEventListener("resize", () => render());

/* ---------- départ ---------- */
$("#desk .hint").innerHTML = `${kc("mod+k")} actions · ${kc("enter")} ouvrir · ${kc("esc")} revenir · ${kc("alt+i")} lisez-moi`;
window.allerA = esp => {
  if (esp === "dossier") setStack([ROOT, dossierV(), art4V("o:12")]);
  else if (esp === "atelier"){ const m = MINE[0]; setStack([ROOT, atelierV(), alineaV(m ? m.al : 12, m ? "m:" + m.id : null)]); }
  else if (esp === "enjeux") setStack([ROOT, enjeuxV()]);
  else if (esp === "reunion") setStack([ROOT, reunionV()]);
};
STACK = [ROOT];
render();
if (!UI.seen){ UI.seen = true; saveUI(); toast("success", "Bienvenue", "⌘K (Ctrl+K) affiche les actions ; ⌥I le lisez-moi", {t: "Lisez-moi", run: () => push(readmeV())}); }
})();
