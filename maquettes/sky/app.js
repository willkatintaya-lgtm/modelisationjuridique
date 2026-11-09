/* Boussole · inspiration Sky (app.sky.money) — rendu et gestes. S'appuie sur le noyau commun (données réelles, groupes fictifs). */
"use strict";
const P = {   // pictogrammes au trait, minimalistes
  dossier:'<svg class="pi" viewBox="0 0 16 16"><rect x="2.5" y="3" width="11" height="10.5" rx="2"/><path d="M2.5 6h11M5.5 9h5M5.5 11h3"/></svg>',
  atelier:'<svg class="pi" viewBox="0 0 16 16"><path d="M3 13h3l7-7-3-3-7 7z"/><path d="M9 4l3 3"/></svg>',
  enjeux:'<svg class="pi" viewBox="0 0 16 16"><circle cx="5" cy="5" r="2.2"/><circle cx="11" cy="5" r="2.2"/><circle cx="5" cy="11" r="2.2"/><circle cx="11" cy="11" r="2.2"/></svg>',
  reunion:'<svg class="pi" viewBox="0 0 16 16"><circle cx="6" cy="5.5" r="2.2"/><path d="M2 13c0-2.2 1.8-4 4-4s4 1.8 4 4"/><circle cx="11.5" cy="6" r="1.7"/><path d="M11 9.2c1.8.2 3 1.6 3 3.8"/></svg>',
  back:'<svg class="pi" viewBox="0 0 16 16"><path d="M10 3L5 8l5 5"/></svg>',
  swap:'<svg class="pi" viewBox="0 0 16 16"><path d="M5 3v10M5 13l-2.5-2.5M5 13l2.5-2.5M11 13V3M11 3L8.5 5.5M11 3l2.5 2.5"/></svg>',
  x:'<svg class="pi" viewBox="0 0 16 16"><path d="M4 4l8 8M12 4l-8 8"/></svg>',
  search:'<svg class="pi" viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/></svg>',
  dot:'<svg class="pi" viewBox="0 0 16 16" style="width:12px;height:12px"><path d="M3 8h2M7 8h2M11 8h2"/></svg>',
  info:'<svg class="pi" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6"/><path d="M8 7v4M8 5h.01"/></svg>',
  book:'<svg class="pi" viewBox="0 0 16 16"><path d="M3 3h4a2 2 0 0 1 2 2v8a1.5 1.5 0 0 0-1.5-1.5H3zM13 3H9.5"/><path d="M13 3v8.5H9"/></svg>',
  check:'<svg class="pi" viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7"/></svg>',
};
const SPACES = [{id:"dossier", label:"Dossier"}, {id:"atelier", label:"Atelier"}, {id:"enjeux", label:"Enjeux"}, {id:"reunion", label:"Réunion"}];
const st = Object.assign({esp:"atelier", o:12, draft:null, page:{dossier:{v:"home"}, atelier:{v:"home"}, enjeux:{v:"home"}, reunion:{v:"home"}},
  sortF:"tous", grF:"", place:1, metric:"mots", diff:"inline", cmp:null, steps:{}}, store.get("ui", {}));
st.editing = false;
if (!MINE.find(m => m.id === st.draft)) st.draft = MINE[0].id;
const save = () => store.set("ui", {esp:st.esp, o:st.o, draft:st.draft, page:st.page, sortF:st.sortF, grF:st.grF, place:st.place, metric:st.metric, diff:st.diff, steps:st.steps});
const draft = () => MINE.find(m => m.id === st.draft) || MINE[0];
const pg = () => st.page[st.esp];

/* ---------- briques ---------- */
const SORTS = [["tous","Tous"],["adopte","Adoptés"],["rejete","Rejetés"],["tombe","Tombés"],["retire","Retirés · non soutenus"],["attente","À examiner"],["ecarte","Écartés"]];
const sortOf = a => { const k = NX.sortKey(a); return k === "ns" ? "retire" : k; };
const sortChip = a => `<span class="chip s-${NX.sortKey(a)}">${esc(cap(sortWord(a)))}</span>`;
const gauge = w => `<span class="gauge g${w}" aria-label="niveau ${w} sur 3"><i></i><i></i><i></i></span>`;
const grad = c => c;   // couleur du groupe : un carré de 8 px dans le coin de la pastille
const amLogo = (a, cls) => { const w = who(a); const ini = a.inst ? (a.inst === "rapporteure" ? "Rap" : "RpA") : (a.groupe || "?"); return `<span class="logo ${cls || "s"}" style="--lg:${grad(w.color)}">${esc(ini)}</span>`; };
const myLogo = (m, cls) => `<span class="logo ${cls || ""}" style="--lg:transparent;border-color:var(--da-bordeaux);color:var(--da-bordeaux)">${m.al}</span>`;
const metric = (lbl, val) => `<div class="metric"><span class="lbl">${lbl}</span><span class="num">${val}</span></div>`;
const kv = (k, v) => `<div class="kv">${P.dot}${k}<b>${v}</b></div>`;
const back = (label, to) => `<a class="back" data-back="${to || ""}">${P.back}${esc(label)}</a>`;
const DELAI = "12 nov.";
function maxDispute(o){ const U = unitsOf(o); return U.length ? Math.max(...U.map(u => u.n)) : 0; }
function disputeMetric(o){ const n = maxDispute(o); return n ? `${gauge(unitWeight(n))} <span class="lbl" style="margin-left:6px">${n}</span><span class="info" title="Nombre de propositions sur le passage le plus disputé de l'alinéa (une seule chose comptée : des propositions). Jauge : 2, 3 à 5, 6 et plus.">i</span>` : `<span class="lbl">aucun passage</span>`; }
// la phrase explicative d'abord : ce que fait une rédaction, en mots
function explain(ref, texte, mode, o){
  if (mode === "supprimer") return `Votre brouillon supprime l'alinéa ${o} en entier : « ${esc(short(ref, 110))} ».`;
  if (mode === "inserer") return `Votre brouillon insère un alinéa nouveau après l'alinéa ${o} : « ${esc(short(texte, 110))} ».`;
  const ops = diffOps(ref, texte), ins = ops.filter(x => x.type === "ins").map(x => x.text.trim()).filter(Boolean), del = ops.filter(x => x.type === "del").map(x => x.text.trim()).filter(Boolean);
  if (!ins.length && !del.length) return `Votre brouillon reprend l'alinéa ${o} tel quel : rien n'est encore modifié face à la référence. Double-cliquez sur le texte pour le réécrire.`;
  const q = l => l.slice(0, 2).map(t => `« ${esc(short(t, 70))} »`).join(" et ") + (l.length > 2 ? ` (et ${l.length - 2} autre${l.length > 3 ? "s" : ""})` : "");
  return `Votre brouillon réécrit l'alinéa ${o} : ${ins.length ? "il ajoute " + q(ins) : "il n'ajoute rien"}${del.length ? " et retire " + q(del) : " et ne retire rien"}.`;
}
const modeWord = m => m.mode === "supprimer" ? "Supprimer" : m.mode === "inserer" ? "Insérer" : "Rédiger";

/* ---------- squelette ---------- */
function renderTabs(){
  $("#tabs").innerHTML = SPACES.map(s => `<button class="tab${st.esp === s.id ? " on" : ""}" data-esp="${s.id}" aria-current="${st.esp === s.id}">${P[s.id]}${s.label}</button>`).join("");
}
function render(keepScroll){
  renderTabs();
  const v = pg().v, f = VIEW[st.esp + ":" + v] || VIEW[st.esp + ":home"];
  $("#main").innerHTML = f(pg());
  if (!keepScroll) scrollTo(0, 0);
  save(); afterRender();
}
function afterRender(){
  const ta = $("#ta"); if (!ta) return;
  const m = draft(), fit = () => { ta.style.height = "auto"; ta.style.height = ta.scrollHeight + "px"; };
  ta.addEventListener("input", () => { $("#mirror").innerHTML = liveHTML(refAl(m.al), ta.value) + "​"; fit(); });
  fit(); ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length);
}
function go(esp, page){ st.esp = esp; if (page) st.page[esp] = page; st.editing = false; closeMenu(); render(); }
window.allerA = esp => go(esp);
function nav(page){ st.page[st.esp] = page; st.editing = false; render(); }

const VIEW = {};
/* ================= ATELIER ================= */
VIEW["atelier:home"] = () => {
  const C = concurrents(st.o), nAm = ALL.filter(a => !isEcarte(a) && a.mode !== "hors-texte").length;
  const cards = MINE.map(m => {
    const ref = refAl(m.al), n = concurrents(m.al).units.length;
    return `<div class="glass card prod mienne"><div class="top">${myLogo(m)}<div class="chips"><span class="chip w">Alinéa ${m.al}</span><span class="chip w">${modeWord(m)}</span>${m.confirme ? `<span class="chip ok">Confirmé</span>` : `<span class="chip w">${esc(cap(m.vis || "privé"))}</span>`}</div></div>
      <h2>${esc(draftNum(m))}</h2><p class="expl">${explain(ref, m.texte, m.mode, m.al)}</p>
      <div class="metrics">${metric("Concurrents", n)}${metric("Dispute", disputeMetric(m.al))}${metric("Délai de dépôt", DELAI + `<span class="info" title="${esc(D.dossier.delai)}">i</span>`)}<button class="cta big" data-draft="${m.id}">Ouvrir</button></div></div>`;
  }).join("");
  const opts = NX.alsDisputes().map(x => `<option value="${x.o}"${x.o === st.o ? " selected" : ""}>Alinéa ${x.o}</option>`).join("");
  const newCard = `<div class="glass card prod"><div class="top"><span class="logo" style="--lg:transparent">+</span></div>
      <h2>Nouveau brouillon</h2><p class="expl">Un brouillon part toujours de la référence (${esc(refShort())}) : choisissez l'alinéa, puis réécrivez-le en place. Rien n'est déposé.</p>
      <div class="metrics"><div class="metric"><span class="lbl">Alinéa</span><select class="sel" id="newal">${Array.from({length: NAL}, (_, i) => `<option value="${i + 1}"${i + 1 === st.o ? " selected" : ""}>Alinéa ${i + 1}</option>`).join("")}</select></div><button class="cta big" data-cmd="new">Créer</button></div></div>`;
  return `<div class="col"><div class="hero"><div class="stats"><span class="stat"><span class="orb"></span>${MINE.length} brouillons</span><span class="stat"><span class="orb"></span>${nAm} amendements en concurrence</span><span class="stat"><span class="orb"></span>Face à : ${esc(refShort())}</span></div>
    <h1>Ce que votre amendement change, et face à qui</h1><p class="lede">Chaque brouillon est lu face au texte de référence, qui reste vierge ; les corrections apparentes sont portées sur votre rédaction, comme sur celle des autres groupes. Ouvrez un brouillon pour le réécrire, le comparer ou le confirmer.</p></div>
    <div class="cards">${cards}${newCard}</div>
    <div class="secttl"><h2>Concurrents</h2><span class="sp"></span><a class="pill" data-open="article">Votre version de l'article</a><a class="pill" data-open="cmp">Comparer des rédactions</a></div>
    ${concTable(st.o, opts)}</div>`;
};
function concTable(o, alOpts){
  const C = concurrents(o), units = [...C.units, ...C.ecartes];
  const count = k => units.filter(u => k === "tous" || sortOf(u.lead) === k).length;
  const gs = [...new Set(units.map(u => who(u.lead).name))];
  const L = units.filter(u => (st.sortF === "tous" || sortOf(u.lead) === st.sortF) && (!st.grF || who(u.lead).name === st.grF));
  const rows = L.map(u => { const a = u.lead, w = who(a), ep = NX.epOf(a);
    return `<div class="trow conc-grid" data-am="${a.id}"><div class="who">${amLogo(a)}<div><div class="t1">${a.num}${u.members.length > 1 ? ` <span class="chip" title="${u.kind === "ident" ? "identiques" : "série"}">+${u.members.length - 1}</span>` : ""}</div><div class="t2">${esc(w.name)}</div></div></div>
      <div class="t2">${esc(modeLead(a, o).replace(/ :$/, ""))}</div><div>${sortChip(a)}</div><div class="t2" title="${esc(a.avis || "")}">${avisSym(a.avis)}</div><div>${ep ? `<a class="t2" data-place="${ep.place}" style="color:var(--accent)">place ${ep.place}</a>` : `<span class="t2">—</span>`}</div><div class="ob">${esc(objetOf(a) || "—")}</div></div>`; }).join("");
  return `<div class="filters"><span class="lab">Sort :</span>${SORTS.filter(([k]) => k === "tous" || count(k)).map(([k, l]) => `<button class="pill${st.sortF === k ? " on" : ""}" data-sortf="${k}">${l} <span class="c">${count(k)}</span></button>`).join("")}
      <span class="sp"></span>${alOpts ? `<select class="sel" data-pick="al" aria-label="Alinéa">${alOpts}</select>` : ""}<select class="sel" data-pick="gr" aria-label="Groupe"><option value="">Tous les groupes</option>${gs.map(g => `<option${g === st.grF ? " selected" : ""}>${esc(g)}</option>`).join("")}</select></div>
    <div class="thead conc-grid"><span>Amendement</span><span>Geste</span><span>Sort</span><span>Avis</span><span>Réunion</span><span>Objet</span></div>
    <div class="glass tbl-card">${rows || `<div class="empty">Aucun concurrent sur l'alinéa ${o} pour ces filtres.</div>`}</div>`;
}
// le texte d'une rédaction face à la référence : même rendu pour la mienne et pour celle d'un autre groupe
function textBlock(o, html, label){ return `<div class="legal" data-o="${o}">${label ? `<span class="al-n">${label}</span>` : ""}${html}</div>`; }
function unitsPills(o){
  const U = unitsOf(o); if (!U.length) return `<p class="expl" style="margin-top:18px">Aucun passage de cet alinéa n'est disputé par deux propositions ou plus.</p>`;
  return `<div class="units">${U.map(u => `<button class="pill" data-unit="${u.k}" data-o="${o}">« ${esc(u.label)} » ${gauge(unitWeight(u.n))}<span class="c">${u.n}</span></button>`).join("")}</div>`;
}
const legend = `<div class="legend"><span><ins>ajout</ins></span><span><del>suppression</del></span><span><mark class="pt w1" style="cursor:default">passage disputé</mark> (2 · 3–5 · 6+ propositions)</span><span>clic sur une modification : la loupe</span></div>`;
VIEW["atelier:draft"] = () => {
  const m = draft(), o = m.al; st.o = o;
  const C = concurrents(o), U = unitsOf(o), ref = refAl(o);
  let body;
  if (st.editing) body = `<div class="edbox"><div class="mirror" id="mirror">${liveHTML(ref, m.texte)}​</div><textarea id="ta" spellcheck="false" aria-label="Texte du brouillon">${esc(m.texte)}</textarea></div>
      <div class="edbtns"><button class="cta pri" data-cmd="valider">Valider <span class="kbd">Ctrl Entrée</span></button><button class="pill" data-cmd="annuler">Annuler <span class="kbd">Échap</span></button><span class="expl">Pendant la frappe : ajouts soulignés, suppressions marquées d'un trait rouge fin.</span></div>`;
  else if (st.diff === "side" && m.mode !== "inserer") body = `<div class="cols3" style="grid-template-columns:1fr 1fr;margin-top:20px"><div class="glass card ref"><span class="lbl">Référence · vierge</span>${textBlock(o, esc(ref))}</div><div class="glass card"><span class="lbl">Votre rédaction</span>${textBlock(o, m.mode === "rediger" ? NX.unitsOnDiff(NX.draftDiff(m), o, m.texte) : NX.draftDiff(m))}</div></div>`;
  else body = `<div title="${m.mode === "supprimer" ? "" : "Double-clic pour modifier"}" class="dbl">${textBlock(o, m.mode === "rediger" ? NX.unitsOnDiff(NX.draftDiff(m), o, m.texte) : NX.draftDiff(m), o)}</div>`;
  const ins = diffOps(ref, m.mode === "rediger" ? m.texte : "").filter(x => x.type === "ins").reduce((s, x) => s + x.text.trim().split(/\s+/).filter(Boolean).length, 0);
  const del = m.mode === "supprimer" ? ref.split(/\s+/).length : diffOps(ref, m.mode === "rediger" ? m.texte : ref).filter(x => x.type === "del").reduce((s, x) => s + x.text.trim().split(/\s+/).filter(Boolean).length, 0);
  return `<div class="wide">${back("Retour aux brouillons")}
    <div class="phead">${myLogo(m)}<div><h1>${esc(draftNum(m))} · alinéa ${o}</h1><div class="sub">${esc(draftLead(m))}</div></div><span class="sp"></span>${refSelect()}</div>
    <div class="pgrid"><div class="glass card mienne"><div class="chart-h"><div><span class="lbl">Votre rédaction, face à</span><div class="num" style="margin-top:4px">${esc(refLabel())}</div></div><span class="sp"></span>
        <div class="seg"><button class="${st.diff === "inline" ? "on" : ""}" data-diff="inline">Corrections apparentes</button><button class="${st.diff === "side" ? "on" : ""}" data-diff="side">Côte à côte</button></div></div>
      ${body}${st.editing ? "" : legend}
      <div style="margin-top:28px"><span class="lbl">Passages disputés de l'alinéa ${o}</span>${unitsPills(o)}</div></div>
    <div class="glass card act"><div><span class="chip">${modeWord(m)} · alinéa ${o}</span></div><h2>${m.mode === "supprimer" ? `Supprimer l'alinéa ${o}` : m.mode === "inserer" ? `Insérer après l'alinéa ${o}` : `Réécrire l'alinéa ${o}`} face à ${C.units.length} concurrent${C.units.length > 1 ? "s" : ""}</h2>
      <p class="expl">${explain(ref, m.texte, m.mode, o)}</p>
      <div class="metrics">${metric("Passages disputés", U.length)}${metric("Dispute", disputeMetric(o))}</div>
      ${m.mode === "supprimer" ? `<button class="cta full" data-cmd="torediger">Rédiger plutôt l'alinéa</button>` : `<button class="cta full" data-cmd="edit">Modifier le texte</button>`}
      <div class="more"><button class="pill" data-open="cmp">Comparer</button><button class="pill" data-cmd="confirm">Confirmer</button><button class="pill" data-hist="${o}">Historique</button><button class="pill" data-open="article">Version de l'article</button></div></div></div>
    <div class="secttl"><h2>Détails</h2></div>
    <div class="details">${kv("Geste", esc(draftLead(m).replace(/ :$/, "")))}${kv("Référence", esc(refShort()))}${kv("Mots ajoutés", ins)}${kv("Mots retirés", del)}${kv("Concurrents sur l'alinéa", C.units.length)}${kv("Écartés", C.ecartes.length)}${kv("Visibilité", esc(cap(m.vis || "privé")))}${kv("Statut", m.confirme ? "confirmé" : "brouillon")}</div>
    <div class="secttl"><h2>Les autres propositions sur l'alinéa ${o}</h2></div>${concTable(o)}</div>`;
};
function refSelect(){ return `<select class="sel big" data-pick="ref" aria-label="Référence">${ETAPES.map(id => `<option value="${id}"${id === REF ? " selected" : ""}>Face à : ${esc(ETL[id])}</option>`).join("")}</select>`; }
VIEW["atelier:am"] = p => {
  const a = AM[p.id], w = who(a), o = a.cible.al || st.o, ep = NX.epOf(a);
  let touched = [...new Set([...a.applique.rows.map(r => r.o).filter(Boolean), ...a.spans.map(s => s.al)])].sort((x, y) => x - y);
  if (!touched.length) touched = [o];
  const blocks = touched.map(x => { const d = NX.amDiff(a, x), t = NX.amText(a, x); if (!d) return ""; return textBlock(x, typeof t === "string" ? NX.unitsOnDiff(d, x, t) : d, x); }).join("")
    + [...verOfAmendment(a).ins].map(([k, l]) => l.map(t => textBlock(k, `<ins>${esc(t)}</ins>`, "+")).join("")).join("");
  const mine = MINE.find(m => m.al === o);
  return `<div class="wide">${back("Retour")}
    <div class="phead">${amLogo(a, "m")}<div><h1>${a.num} · ${esc(w.name)}</h1><div class="sub">${esc(a.auteur || "")}${w.sub ? " · " + esc(w.sub) : ""} · déposé le ${NX.fmtDate(a.depot)}</div></div><span class="sp"></span>${refSelect()}</div>
    <div class="pgrid"><div class="glass card"><div class="chart-h"><div><span class="lbl">Sa rédaction, face à</span><div class="num" style="margin-top:4px">${esc(refLabel())}</div></div></div>
      ${blocks || textBlock(o, esc(a.dispositif || "—"))}${legend}
      <div style="margin-top:28px"><span class="lbl">Passages disputés de l'alinéa ${o}</span>${unitsPills(o)}</div></div>
    <div class="glass card act"><div>${sortChip(a)}</div><h2>${esc(modeLead(a, o).replace(/ :$/, ""))}</h2>
      <p class="expl">${esc(objetOf(a) || "Pas d'exposé sommaire.")}</p>
      <div class="metrics">${metric("Avis", a.avis ? `<span title="${esc(a.avis)}">${avisSym(a.avis)} <span class="lbl">${esc(a.avis)}</span></span>` : "—")}${metric("Réunion", ep ? `place ${ep.place}` : "—")}</div>
      <button class="cta full" data-cmpwith="${a.id}">${mine ? "Comparer avec mon brouillon" : "Comparer"}</button>
      <div class="more">${ep ? `<button class="pill" data-place="${ep.place}">Voir sa place en réunion</button>` : ""}<button class="pill" data-amender="${o}">${mine ? "Mon brouillon" : "Amender l'alinéa " + o}</button></div></div></div>
    <div class="secttl"><h2>Détails</h2></div>
    <div class="details">${kv("Groupe", esc(w.name))}${kv("Auteur", esc(a.auteur || "—"))}${kv("Sort", esc(sortWord(a)))}${kv("Avis", esc(a.avis || "—"))}${kv("Alinéa visé", esc(a.cible.label || "—"))}${kv("Discussion commune", a.dc ? "n° " + (DC_NUM.get(a.dc) || "") : "non")}${kv("Déposé le", NX.fmtDate(a.depot))}${kv("Cosignataires", (a.cosign || []).length)}</div>
    <div class="secttl"><h2>Exposé sommaire</h2></div><div class="glass card"><p style="margin:0;font:400 15px/1.75 var(--b);max-width:72ch;color:var(--text2)">${esc(a.expose || "—")}</p></div></div>`;
};
// comparer : la carte de conversion (De / Vers, bouton d'inversion), puis l'éclatement en trois colonnes
function cmpOptions(o){
  const L = MINE.filter(m => m.al === o).map(m => ({id: m.id, label: draftNum(m), big: "Vous", color: GR[ME].color}));
  for (const u of concurrents(o).units) L.push({id: u.lead.id, label: u.lead.num + " · " + who(u.lead).name, big: u.lead.num, color: who(u.lead).color});
  return L;
}
function sideOf(id, o){
  if (id[0] === "M"){ const m = MINE.find(z => z.id === id); return {label: draftNum(m), sub: "Votre rédaction", html: m.mode === "rediger" ? NX.unitsOnDiff(NX.draftDiff(m), o, m.texte) : NX.draftDiff(m), color: GR[ME].color}; }
  const a = AM[id], d = NX.amDiff(a, o), t = NX.amText(a, o);
  return {label: a.num, sub: who(a).name + " · " + sortWord(a), html: d ? (typeof t === "string" ? NX.unitsOnDiff(d, o, t) : d) : esc(a.dispositif || "—"), color: who(a).color};
}
VIEW["atelier:cmp"] = () => {
  const c = st.cmp || (st.cmp = {o: st.o, a: null, b: null, shown: false});
  const L = cmpOptions(c.o);
  if (!L.find(x => x.id === c.a)) c.a = (L[0] || {}).id; if (!L.find(x => x.id === c.b) || c.b === c.a) c.b = (L.find(x => x.id !== c.a) || {}).id;
  const opt = sel => L.map(x => `<option value="${x.id}"${x.id === sel ? " selected" : ""}>${esc(x.label)}</option>`).join("");
  const pv = id => { if (!id) return ""; const x = L.find(z => z.id === id); return x ? x.label : ""; };
  const side = (k, lbl) => { const id = c[k]; const x = L.find(z => z.id === id) || {}; return `<div class="side">${k === "b" ? `<button class="swap" data-cmd="swap" aria-label="Inverser" title="Inverser">${P.swap}</button>` : ""}<div class="l"><span>${lbl}</span><span>${id && id[0] === "M" ? "Votre rédaction" : id ? esc(who(AM[id]).name) : ""}</span></div><div class="amt"><b>${esc(x.big || "—")}</b><select class="sel" data-pick="cmp-${k}" aria-label="${lbl}">${opt(id)}</select></div><div class="pv">${id ? esc(short(id[0] === "M" ? MINE.find(m => m.id === id).texte || "(suppression)" : objetOf(AM[id]) || modeLead(AM[id], c.o), 150)) : ""}</div></div>`; };
  let res = "";
  if (c.shown && c.a && c.b){
    const A = sideOf(c.a, c.o), B = sideOf(c.b, c.o);
    const col = (S) => `<div class="glass card"><div class="who"><span class="logo s" style="--lg:${grad(S.color)}"></span><div><div class="num">${esc(S.label)}</div><div class="lbl">${esc(S.sub)}</div></div></div>${textBlock(c.o, S.html)}</div>`;
    res = `<div class="cols3" id="cols3">${col(A)}<div class="glass card ref"><div class="who"><span class="logo s" style="--lg:transparent"></span><div><div class="num">Référence</div><div class="lbl">${esc(refLabel())} · vierge</div></div></div>${textBlock(c.o, esc(refAl(c.o)))}</div>${col(B)}</div><div class="col">${legend}</div>`;
  }
  return `<div class="wide">${back("Retour aux brouillons", "home")}<div class="hero" style="padding-top:0"><div class="stats"><span class="stat"><span class="orb"></span>Alinéa ${c.o}</span><span class="stat"><span class="orb"></span>Face à : ${esc(refShort())}</span></div>
    <h1>Comparer deux rédactions</h1><p class="lede">Choisissez une rédaction de départ et une autre ; elles s'ouvrent en trois colonnes, la référence au centre, vierge. Les corrections apparentes sont portées sur chaque rédaction.</p></div>
    <div class="conv"><div class="glass"><div class="row"><span class="lbl" style="font:400 14px/16px var(--h)">Alinéa</span><select class="sel" data-pick="cmp-o">${NX.alsDisputes().map(x => `<option value="${x.o}"${x.o === c.o ? " selected" : ""}>Alinéa ${x.o} · ${x.n} amendements</option>`).join("")}</select></div>
      ${side("a", "De")}${side("b", "Vers")}</div>
      <button class="cta" data-cmd="cmp-go"${c.a && c.b ? "" : " disabled"}>${c.shown ? "Comparer à nouveau" : "Comparer"}</button></div>${res}</div>`;
};
VIEW["atelier:article"] = () => {
  const L = verLines(myVer()), out = []; let run = [];
  const flush = () => { if (run.length > 2 && !st.unfold) out.push(`<button class="pill" data-cmd="unfold" style="margin:14px 0">${run.length} alinéas inchangés (${run[0].o} à ${run[run.length - 1].o}) · déplier</button>`); else run.forEach(l => out.push(textBlock(l.o, `<span style="color:var(--desat)">${esc(l.text)}</span>`, l.o))); run = []; };
  for (const l of L){
    if (l.kind === "same"){ run.push(l); continue; }
    flush();
    out.push(l.kind === "del" ? textBlock(l.o, `<del>${esc(refAl(l.o))}</del>`, l.o) : l.kind === "mod" ? textBlock(l.o, inlineDiff(refAl(l.o), l.text), l.o) : textBlock(l.at, `<ins>${esc(l.text)}</ins>`, "+"));
  }
  flush();
  return `<div class="wide">${back("Retour aux brouillons", "home")}<div class="phead"><span class="logo" style="--lg:transparent">§</span><div><h1>Article 4 · votre version</h1><div class="sub">Tous vos brouillons appliqués, face à : ${esc(refLabel())}</div></div><span class="sp"></span>${refSelect()}</div>
    <div class="pgrid"><div class="glass card">${out.join("")}${legend}</div>
    <div class="glass card act"><div><span class="chip">${MINE.length} brouillons</span></div><h2>L'article tel que vos brouillons le rédigent</h2><p class="expl">Les alinéas que vous ne touchez pas sont repliés ; ceux que vous modifiez portent les corrections apparentes face à la référence.</p>
      <div class="metrics">${metric("Alinéas touchés", verTouched(myVer()).size)}${metric("Alinéas", NAL)}</div>
      <button class="cta full" data-cmd="${st.unfold ? "fold" : "unfold"}">${st.unfold ? "Replier les alinéas inchangés" : "Tout déplier"}</button>
      <div class="more"><button class="pill" data-open="code">Le code général des impôts</button></div></div></div></div>`;
};
VIEW["atelier:code"] = () => {
  const C = NX.code;
  const blocks = C.lettres.map(l => { const av = (C.avant[l] || []).join("\n"), ap = (C.apresCommission[l] || []).join("\n"), same = sameText(av, ap);
    return `<div class="parole"><div class="w"><span class="al-n">${esc(l)})</span>${same ? `<span class="chip">inchangé</span>` : `<span class="chip s-attente">modifié par la commission</span>`}</div><div class="legal" style="margin-top:4px">${same ? esc(short(ap, 420)) : inlineDiff(av, ap)}</div></div>`; }).join("");
  return `<div class="wide">${back("Retour à l'article", "article")}<div class="phead"><span class="logo" style="--lg:transparent">CGI</span><div><h1>${esc(C.article)}</h1><div class="sub">En vigueur, puis après la commission : les instructions de l'article appliquées mécaniquement</div></div></div><div class="glass card">${blocks}</div></div>`;
};

/* ================= DOSSIER ================= */
VIEW["dossier:home"] = () => {
  const G = NX.grid(), nmod = G.filter(r => r.cells.includes("mod")).length;
  const arts = NX.plan.map(p => `<div class="glass card" style="padding:24px;cursor:pointer;${p.num === "4" ? "outline:2px solid var(--da-encre);outline-offset:-2px" : ""}" data-art="${esc(p.num)}"><div class="top" style="display:flex;gap:8px;align-items:center"><span class="logo s" style="--lg:transparent">${esc(p.num)}</span><span class="sp"></span>${p.statut ? `<span class="chip w" title="${esc(p.statut)}">${esc(p.statut.split(" ")[0])}</span>` : ""}</div>
      <h3 style="margin:16px 0 6px">Article ${esc(p.num)}</h3><p class="expl" style="display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden">${esc(p.intitule || "(sans intitulé)")}</p>
      <div class="metrics" style="margin-top:16px">${metric("Amendements", p.n)}</div></div>`).join("");
  const rows = G.map(r => `<div class="trow grille-grid${r.o === st.o ? " cur" : ""}" ${r.o ? `data-hist="${r.o}"` : ""}><span class="t1">${r.o ?? "+"}</span>${r.cells.map(c => `<span><span class="cell ${c}" title="${{mod:"modifié par rapport à l'étape précédente", same:"inchangé", absent:"absent à cette étape", origine:"première rédaction"}[c]}">${{mod:"modifié", same:"·", absent:"absent", origine:"origine"}[c]}</span></span>`).join("")}<span class="ob">${r.o ? esc(NX.alShort(r.o, 120)) : "<i>alinéa introduit puis retiré en cours de navette</i>"}</span><span class="t1" style="text-align:right">${r.n || ""}</span></div>`).join("");
  return `<div class="col"><div class="hero"><div class="stats"><span class="stat"><span class="orb"></span>${NX.plan.length} articles</span><span class="stat"><span class="orb"></span>${esc(D.dossier.lecture)}</span></div>
    <h1>Le projet de loi, de chambre en chambre</h1><p class="lede">${esc(D.dossier.titre)}. ${esc(D.dossier.commission)}. Seul l'article 4 est chargé en détail : ses ${NAL} alinéas, suivis du dépôt au Sénat à la commission de l'Assemblée.</p></div>
    <div class="secttl" style="margin-top:0"><h2>Les articles</h2><span class="sp"></span><span class="lbl">nombre d'amendements déposés en commission</span></div>
    <div class="cards four">${arts}</div>
    <div class="secttl"><h2>Article 4 · grille des étapes</h2><span class="sp"></span><span class="lbl">${nmod} alinéas modifiés en cours de navette</span></div>
    <p class="expl" style="margin:-6px 0 18px;max-width:640px">Une ligne par alinéa suivi d'étape en étape ; « modifié » se lit par rapport à l'étape précédente. À droite, le nombre d'amendements de l'Assemblée sur l'alinéa. Cliquer une ligne : l'alinéa d'étape en étape.</p>
    <div class="thead grille-grid"><span>Al.</span>${ETAPES.map(id => `<span>${esc(ETL[id])}</span>`).join("")}<span class="hide-m">Texte transmis</span><span style="justify-content:flex-end">Am.</span></div>
    <div class="glass tbl-card">${rows}</div></div>`;
};
VIEW["dossier:hist"] = p => {
  const o = p.o, H = NX.hist(o), n = concurrents(o).units.length, nmod = H.filter((h, i) => i && !h.same && !h.absent).length;
  const steps = H.map((h, i) => `<div class="step${i && !h.same ? " done" : ""}"><span class="n">${i + 1}</span><div class="b"><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><h3>${esc(ET[h.id].label)}</h3>${i ? `<span class="chip ${h.absent ? "s-ecarte" : h.same ? "" : "s-attente"}">${h.absent ? "absent" : h.same ? "inchangé" : "modifié"}</span>` : `<span class="chip">origine</span>`}</div>
      <div class="legal" style="margin-top:10px;font-size:15px">${h.diff == null ? `<span style="color:var(--faint)">Absent à cette étape.</span>` : h.diff}</div></div></div>`).join("");
  return `<div class="wide">${back("Retour au dossier", "home")}
    <div class="phead"><span class="logo">${o}</span><div><h1>Alinéa ${o}, d'étape en étape</h1><div class="sub">Chaque étape face à la précédente : ajouts soulignés, suppressions barrées</div></div></div>
    <div class="pgrid"><div class="glass card"><span class="lbl">Suivez les étapes</span><div class="steps">${steps}</div></div>
    <div class="glass card act"><div><span class="chip">Article 4 · alinéa ${o}</span></div><h2>Amender l'alinéa ${o}</h2><p class="expl">${esc(NX.alShort(o, 200))}</p>
      <div class="metrics">${metric("Concurrents", n)}${metric("Étapes modifiées", nmod)}</div>
      <button class="cta full" data-amender="${o}">Amender cet alinéa</button>
      <div class="more"><button class="pill" data-al="${o}">Voir ses ${n} concurrents</button></div></div></div></div>`;
};

/* ================= ENJEUX ================= */
VIEW["enjeux:home"] = () => {
  const decl = THEMES.filter(t => t.src === "déclaré").length;
  const cards = THEMES.map((th, i) => { const als = themeAls(th), eps = NX.themeParoles(th);
    return `<div class="glass card prod" style="min-height:0"><div class="top"><span class="logo m" style="--lg:transparent;background:${["var(--da-int-1)","var(--da-int-2)","var(--da-int-3)","var(--da-int-4)"][i % 4]}">${i + 1}</span><div class="chips"><span class="chip w" title="${th.src === "déclaré" ? "thème déclaré par le rapport" : "thème calculé par mots-clés"}">${th.src === "déclaré" ? "Déclaré par le rapport" : "Calculé"}</span></div></div>
      <h2 style="margin-top:20px">${esc(th.label)}</h2><p class="expl" style="display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden">${esc(th.doc || "Thème calculé à partir des mots-clés des amendements ; le rapport n'en dit rien.")}</p>
      <div class="metrics">${metric("Amendements", th.amendements.length)}${metric("Alinéas", als.length)}${metric("Places", eps.length)}</div>
      <button class="cta full" style="margin-top:22px" data-th="${th.id}">Ouvrir</button></div>`; }).join("");
  const M = NX.matrix(), max = Math.max(1, ...M.rows.flatMap(r => r.cells.map(c => c.length)));
  const mx = `<table class="mx"><thead><tr><th>Thème</th>${M.gs.map(g => `<th title="${esc(GR[g].name)}"><span class="chip w" style="padding:0 7px"><span class="d" style="background:${GR[g].color}"></span>${g}</span></th>`).join("")}<th>Inst.</th></tr></thead><tbody>${M.rows.map(r => `<tr><td data-th="${r.th.id}">${esc(r.th.label)}</td>${r.cells.map(c => { const v = c.length, a = v / max; return `<td>${v ? `<span class="v" data-th="${r.th.id}" style="--a:${(.08 + a * .62).toFixed(2)};--c:${a > .5 ? "#fdfcf9" : "#1a1a1a"}">${v}</span>` : ""}</td>`; }).join("")}<td>${r.inst.length ? `<span class="v" style="--a:.06">${r.inst.length}</span>` : ""}</td></tr>`).join("")}</tbody></table>`;
  return `<div class="col"><div class="hero"><div class="stats"><span class="stat"><span class="orb"></span>${THEMES.length} thèmes</span><span class="stat"><span class="orb"></span>${decl} déclarés · ${THEMES.length - decl} calculés</span></div>
    <h1>Ce qui se joue dans l'article 4</h1><p class="lede">Les thèmes déclarés viennent du rapport de la commission ; les thèmes calculés sont repérés par mots-clés dans les amendements, et dits comme tels. Chaque fiche dit ce qu'en dit le rapport, ce qui en a été dit en réunion, et ce qu'en fait votre texte.</p></div>
    <div class="cards three">${cards}</div>
    <div class="secttl"><h2>Thèmes × groupes</h2><span class="sp"></span><span class="lbl">nombre d'amendements, rien d'autre</span></div>
    <div class="glass mx-wrap">${mx}</div></div>`;
};
VIEW["enjeux:theme"] = p => {
  const th = THEMES.find(t => t.id === p.id) || THEMES[0], ams = NX.themeAms(th), als = themeAls(th), eps = NX.themeParoles(th);
  const mine = MINE.filter(m => als.includes(m.al));
  const s1 = `<p class="legal" style="margin-top:8px;font-size:15px">${esc(th.doc || "Le rapport ne traite pas ce thème en tant que tel : il est calculé par mots-clés.")}</p>`;
  const s2 = eps.length ? eps.slice(0, 5).map(e => `<div class="parole"><div class="w"><a data-place="${e.place}">Place ${e.place}</a><span class="lbl">${esc(short(e.titre, 90))}</span></div>${e.paroles.slice(0, 2).map(x => `<p><b style="color:var(--text)">${esc(NX.speaker(x))}</b> : « ${esc(short(x.txt, 220))} »</p>`).join("")}</div>`).join("") : `<p class="expl">Rien n'en a été dit en réunion.</p>`;
  const s3 = mine.length ? mine.map(m => `<div class="parole"><div class="w"><a data-draft="${m.id}">${esc(draftNum(m))}</a><span class="lbl">alinéa ${m.al}</span></div>${textBlock(m.al, NX.draftDiff(m))}</div>`).join("") : `<p class="expl">Aucun de vos brouillons ne touche les alinéas de ce thème.</p>`;
  const rows = ams.map(a => `<div class="trow th-grid" data-am="${a.id}"><div class="who">${amLogo(a)}<div><div class="t1">${a.num}</div><div class="t2">${esc(who(a).name)}</div></div></div><div class="t2">${a.cible.al ? "alinéa " + a.cible.al : esc(a.cible.label || "")}</div><div>${sortChip(a)}</div><div class="ob">${esc(objetOf(a))}</div></div>`).join("");
  return `<div class="wide">${back("Retour aux enjeux", "home")}
    <div class="phead"><span class="logo">${THEMES.indexOf(th) + 1}</span><div><h1>${esc(th.label)}</h1><div class="sub">${th.src === "déclaré" ? "Thème déclaré par le rapport" : "Thème calculé par mots-clés (dit comme tel)"}</div></div></div>
    <div class="pgrid"><div class="glass card"><span class="lbl">Trois strates</span><div class="steps">
      <div class="step"><span class="n">1</span><div class="b"><h3>Ce que dit le rapport</h3>${s1}</div></div>
      <div class="step"><span class="n">2</span><div class="b"><h3>Ce qui a été dit en réunion</h3><div style="margin-top:12px">${s2}</div></div></div>
      <div class="step"><span class="n">3</span><div class="b"><h3>Ce que fait votre texte</h3><div style="margin-top:12px">${s3}</div></div></div></div></div>
    <div class="glass card act"><div><span class="chip">${ams.length} amendements</span></div><h2>Voir les alinéas du thème dans l'atelier</h2><p class="expl">Les alinéas que les amendements de ce thème touchent le plus souvent.</p>
      <div class="metrics">${metric("Alinéas", als.length)}${metric("Places en réunion", eps.length)}</div>
      <button class="cta full" data-al="${als[0] || 12}">Ouvrir l'alinéa ${als[0] || 12}</button>
      <div class="more">${als.slice(1, 9).map(o => `<button class="pill" data-al="${o}">Alinéa ${o}</button>`).join("")}</div></div></div>
    <div class="secttl"><h2>Les amendements du thème</h2></div>
    <div class="thead th-grid"><span>Amendement</span><span>Vise</span><span>Sort</span><span>Objet</span></div><div class="glass tbl-card">${rows}</div></div>`;
};

/* ================= RÉUNION ================= */
VIEW["reunion:home"] = () => {
  const E = NX.episodes, e = E.find(x => x.place === st.place) || E[0], total = E.reduce((s, x) => s + x.mots, 0);
  const val = x => st.metric === "mots" ? x.mots : x.paroles.length, max = Math.max(...E.map(val));
  const adopted = x => x.ams.some(id => AM[id] && AM[id].sort === "Adopté");
  const bars = E.map(x => `<div class="bar${adopted(x) ? " ad" : ""}${x.place === e.place ? " on" : ""}" style="height:${Math.max(3, val(x) / max * 100).toFixed(1)}%" data-place="${x.place}" title="Place ${x.place} · ${x.mots} mots · ${x.paroles.length} prises de parole${adopted(x) ? " · amendement adopté" : ""}"></div>`).join("");
  const axis = E.map(x => `<span>${x.place % 5 === 0 || x.place === 1 ? x.place : ""}</span>`).join("");
  const ams = e.ams.map(id => AM[id]).filter(Boolean);
  const vote = ams.map((a, i) => `<div class="trow vote-grid" data-am="${a.id}"><span class="t2">${i + 1}</span><div class="who">${amLogo(a)}<div><div class="t1">${esc(who(a).name)}</div><div class="t2">${esc(a.auteur || "")}</div></div></div><span class="t1">${a.num}</span><div class="ob">${esc(objetOf(a) || modeLead(a))}</div><span class="t1" title="${esc(a.avis || "")}">${avisSym(a.avis)}</span><div>${sortChip(a)}</div></div>`).join("");
  const paroles = e.paroles.map(x => `<div class="parole"><div class="w"><span class="chip w"><span class="d" style="background:${x.groupe ? NX.groupColor(x.groupe) : "#3d3a33"}"></span>${esc(NX.speaker(x))}</span><span class="lbl">${x.mots} mots</span></div><p>${esc(x.txt)}</p></div>`).join("");
  return `<div class="wide"><div class="hero"><div class="stats"><span class="stat"><span class="orb"></span>${E.length} places</span><span class="stat"><span class="orb"></span>${total.toLocaleString("fr-FR")} mots prononcés</span><span class="stat"><span class="orb"></span>Réunion du 21 septembre 2026</span></div>
    <h1>La réunion de commission, place par place</h1><p class="lede">Les 26 places dans l'ordre d'appel, à l'échelle des mots prononcés. Un point vert marque une place où un amendement a été adopté. Choisissez une place : sa liste de vote, ses prises de parole, ses décisions.</p></div>
    <div class="pgrid"><div class="glass card"><div class="chart-h"><div><span class="lbl">${st.metric === "mots" ? "Mots prononcés" : "Prises de parole"} · place ${e.place}</span><div class="big-n">${val(e).toLocaleString("fr-FR")}</div></div><span class="sp"></span>
        <div class="seg"><button class="${st.metric === "mots" ? "on" : ""}" data-metric="mots">Mots</button><button class="${st.metric === "paroles" ? "on" : ""}" data-metric="paroles">Prises de parole</button></div></div>
      <div class="bars">${bars}</div><div class="axis">${axis}</div></div>
    <div class="glass card act"><div><span class="chip">Place ${e.place} sur ${E.length}</span>${adopted(e) ? ` <span class="chip ok">adopté</span>` : ""}</div><h2 style="font-size:22px;line-height:26px">${esc(short(e.titre, 110))}</h2><p class="expl">${esc(e.decisions.map(d => d.txt).join(" ") || "Pas de décision consignée.")}</p>
      <div class="metrics">${metric("Amendements", ams.length)}${metric("Prises de parole", e.paroles.length)}</div>
      <button class="cta full"${ams[0] ? ` data-am="${ams[0].id}"` : " disabled"}>Ouvrir ${ams[0] ? ams[0].num : "l'amendement"} dans l'atelier</button>
      <div class="more"><button class="pill" data-place="${Math.max(1, e.place - 1)}"${e.place === 1 ? " disabled" : ""}>‹ Précédente</button><button class="pill" data-place="${Math.min(E.length, e.place + 1)}">Suivante ›</button></div></div></div>
    <div class="secttl"><h2>Liste de vote</h2></div>
    <div class="thead vote-grid"><span>#</span><span>Auteur</span><span>N°</span><span>Objet</span><span>Avis</span><span>Sort</span></div><div class="glass tbl-card">${vote || `<div class="empty">Aucun amendement appelé.</div>`}</div>
    <div class="secttl"><h2>Prises de parole</h2><span class="sp"></span><span class="lbl">${e.mots} mots</span></div><div class="glass card">${paroles || `<p class="expl">Aucune.</p>`}</div>
    <div class="secttl"><h2>Décisions</h2></div><div class="details" style="max-width:none">${e.decisions.map((d, i) => kv(`Décision ${i + 1}`, esc(d.txt))).join("") || kv("—", "aucune")}</div></div>`;
};

/* ---------- modales ---------- */
function modal(html, narrow){ $("#modal").className = narrow ? "narrow" : ""; $("#modal").innerHTML = `<button class="round x" data-cmd="close" aria-label="Fermer">${P.x}</button>` + html; $("#veil").classList.add("on"); }
function closeModal(){ $("#veil").classList.remove("on"); MODAL = null; }
let MODAL = null;
function unitModal(o, k){
  const u = unitsOf(o).find(x => x.k === k); if (!u) return;
  const C = clusters(u), ref = refAl(o), tr = TRANSMIS[o - 1];
  const ctxA = short(tr.slice(Math.max(0, u.a - 70), u.a).split(" ").slice(1).join(" "), 80), ctxB = tr.slice(u.b, u.b + 70).split(" ").slice(0, -1).join(" ");
  const list = C.list.map(c => { const isRef = c.items.some(i => i.id === "ref");
    const body = isRef ? esc(C.ref) : c.text == null ? `<del>${esc(C.ref)}</del>` : inlineDiff(C.ref, c.text);
    return `<div class="cl"><div style="display:flex;gap:8px;align-items:center;margin-bottom:6px"><span class="lbl">${isRef ? "La référence (texte transmis) · vierge" : c.text == null ? "Supprime le passage" : "Rédaction proposée"}</span><span class="sp"></span><span class="chip">${isRef ? `gardée par ${c.items.length - 1}` : `${c.items.length} ${plural(c.items.length, "porteur")}`}</span></div>
      <div class="ex"><span class="ctx">… ${esc(ctxA)} </span>${body}<span class="ctx"> ${esc(ctxB)} …</span></div>
      <div class="grp">${c.items.filter(i => i.id !== "ref").map(i => `<span class="chip w" ${i.a ? `data-am="${i.a.id}"` : i.mine ? `data-draft="${i.id}"` : ""} title="${i.a ? esc(i.a.num + " · " + sortWord(i.a)) : ""}"><span class="d" style="background:${i.color}"></span>${esc(i.label)}${i.a ? " · " + i.a.num : ""}</span>`).join("")}</div></div>`; }).join("");
  MODAL = "unit";
  modal(`<span class="chip">Passage disputé · alinéa ${o}</span><h2 style="margin:14px 0 6px">« ${esc(u.label)} »</h2><p class="expl" style="margin-bottom:12px">${u.n} propositions modifient ce passage ; elles se regroupent en ${C.list.length - 1} rédaction${C.list.length > 2 ? "s" : ""} distincte${C.list.length > 2 ? "s" : ""}, plus la référence. Cliquer un groupe ouvre son amendement.</p>${gauge(unitWeight(u.n))}<div style="margin-top:16px">${list}</div>`);
}
function hunkModal(id){
  const h = HUNKS.get(id); if (!h) return;
  const refTxt = h.seg.filter(x => x.type === "del").map(x => x.text).join("");
  MODAL = "loupe";
  modal(`<span class="chip">La loupe</span><h2 style="margin:14px 0 4px">La modification, face à la référence</h2><p class="expl">Le passage de la référence (vierge) et la rédaction comparée, côte à côte, avec quelques mots de contexte.</p>
    <div class="loupe"><div><span class="lbl">Référence · ${esc(refShort())}</span><div class="ex" style="margin-top:8px"><span class="ctx">${esc(h.before)}</span>${refTxt ? esc(refTxt) : `<span class="ctx">(rien à cet endroit)</span>`}<span class="ctx">${esc(h.after)}</span></div></div>
    <div><span class="lbl">${h.meta.m ? "Votre rédaction" : esc((AM[h.meta.a] || {}).num || "Rédaction")}</span><div class="ex" style="margin-top:8px"><span class="ctx">${esc(h.before)}</span>${renderOps(h.seg)}<span class="ctx">${esc(h.after)}</span></div></div></div>`);
}
function confirmModal(){
  const m = draft(), s = st.steps[m.id] || {}, U = unitsOf(m.al);
  const step = (n, done, t, d, btn) => `<div class="step${done ? " done" : ""}"><span class="n">${done ? P.check : n}</span><div class="b"><h3>${t}</h3><p class="expl">${d}</p></div>${btn}</div>`;
  MODAL = "confirm";
  modal(`<span class="chip">${esc(draftNum(m))} · alinéa ${m.al}</span><h2 style="margin:14px 0 6px">Suivez les étapes</h2><p class="expl">Confirmer marque le brouillon comme prêt dans cette maquette : rien n'est déposé, rien n'est envoyé.</p>
    <div class="steps">${step(1, s.relu, "Relire face à la référence", `Votre rédaction, corrections apparentes, face à : ${esc(refLabel())}.`, `<button class="pill" data-step="relu">Relire</button>`)}
    ${step(2, s.vu, "Voir les passages disputés", U.length ? `${U.length} passage${U.length > 1 ? "s" : ""} de l'alinéa ${m.al} ${U.length > 1 ? "sont" : "est"} modifié${U.length > 1 ? "s" : ""} par d'autres propositions.` : "Aucun passage de cet alinéa n'est disputé.", `<button class="pill" data-step="vu">${U.length ? "Voir" : "Noter"}</button>`)}
    ${step(3, m.confirme, "Confirmer l'amendement", m.confirme ? "Confirmé." : "Disponible une fois les deux premières étapes faites.", `<button class="cta pri" data-step="ok"${s.relu && s.vu && !m.confirme ? "" : " disabled"}>${m.confirme ? "Confirmé" : "Confirmer"}</button>`)}</div>`, true);
}
function readme(){
  MODAL = "readme";
  modal(`<div class="readme"><span class="chip">À propos</span><h2 style="margin:14px 0 8px">Maquette inspirée de Sky (app.sky.money)</h2>
  <p>La Boussole des amendements, article 4 du projet de loi logement : données réelles (143 amendements, 26 places de la réunion de commission), groupes politiques fictifs. Inspiration : l'application Sky (ex-MakerDAO), état 2026, identité visuelle de l'agence Clay. Aucun logo ni asset de marque n'est repris ; le ciel est recréé en dégradés CSS.</p>
  <p>La forme suit désormais la direction artistique « Le bordereau » (<code>direction-artistique/DA.md</code>).</p>
  <h3>Ce qui est emprunté (forme et mécanismes)</h3><ul>
  <li><b>Squelette sans barre latérale</b> : marque à gauche, <b>quatre onglets en pilules de 40 px</b> avec pictogramme (ici Dossier, Atelier, Enjeux, Réunion), bouton en dégradé et bouton rond « menu » à droite. Sur mobile, les onglets défilent sous l'en-tête.</li>
  <li><b>Fond lavande</b> (rgb 220,223,252) et ciel nuageux ; <b>cartes en verre</b> (blanc 60 %, flou 20 px), rayon 28, aucune ombre ; bordures lavande 30 %.</li>
  <li><b>Accueil Earn → Atelier</b> : pilules de statistiques, titre centré 44/48, phrase de 12/18 ; une <b>carte produit par brouillon</b> (logo cerclé, puces, phrase explicative avant les chiffres, métriques séparées de filets, bouton) ; « Opportunités » → le <b>tableau des concurrents</b> avec filtres en pilules par sort et menus en pilules (alinéa, groupe).</li>
  <li><b>Jauge de risque à trois traits</b> → la <b>dispute</b> d'un alinéa : le nombre de propositions sur son passage le plus disputé (2 · 3 à 5 · 6 et plus). Une seule chose comptée.</li>
  <li><b>Page produit</b> (« ‹ Retour », sélecteur en pilule, grande carte + carte d'action, « Détails » en paires clé–valeur) → un brouillon ou un concurrent face à la référence ; le sélecteur de réseau devient le <b>choix de la référence</b>. Symétrie stricte entre les deux pages.</li>
  <li><b>Convert</b> → comparer : De / Vers séparés d'un filet, <b>bouton d'inversion rond à cheval sur le filet</b>, bouton pleine largeur ; l'affichage final reste <b>une | la référence | l'autre</b>.</li>
  <li><b>Étapes numérotées</b> (planche Clay « Follow the steps ») → confirmer mon amendement, l'alinéa d'étape en étape, les trois strates d'un thème.</li>
  <li><b>Graphique avec chiffre courant 44 px et segments pilules</b> → les 26 places à l'échelle des mots prononcés (ou des prises de parole).</li>
  <li>Polices : CircularStd et GraphikStd étant indisponibles, <b>Figtree</b> remplace Circular (titres, boutons, chiffres) et <b>Inter</b> remplace Graphik (corps). Accent #4836f5, bouton en dégradé #2a197d → #6a6cfb.</li></ul>
  <h3>Gestes</h3><ul><li>Échap : ferme la fenêtre, sinon revient d'un cran. <b>/</b> ou Ctrl+K : rechercher. Alt+1 à 4 : les espaces.</li><li>Double-clic sur votre texte : édition en place (Ctrl+Entrée valide, Échap annule). Clic sur un passage disputé (filet coloré) : les propositions regroupées. Clic sur une modification : la loupe.</li></ul>
  <h3>Écarts assumés</h3><ul><li>La direction artistique « papier sombre » du projet est suspendue : la forme suit Sky. Les règles de comparaison sont gardées : référence vierge, corrections portées sur la rédaction comparée, ajouts soulignés et en gras, suppressions barrées et visibles.</li>
  <li>Sky a des corps de texte très petits (12/18) ; les textes juridiques sont ici en 16/1,8 pour rester lisibles. Pas de « taux » : aucun score, aucun axe composite.</li>
  <li>Sky n'a pas de recherche ; une recherche simple est ajoutée dans le menu.</li></ul></div>`);
}
// recherche
let SR = null;
function searchModal(){
  const items = [...Array.from({length: NAL}, (_, i) => ({t: `Alinéa ${i + 1}`, d: NX.alShort(i + 1, 90), run: () => go("dossier", {v: "hist", o: i + 1})})),
    ...ALL.filter(a => a.mode !== "hors-texte").map(a => ({t: a.num, d: who(a).name + " · " + sortWord(a) + " · " + objetOf(a), run: () => openAm(a.id)})),
    ...THEMES.map(t => ({t: t.label, d: "thème", run: () => go("enjeux", {v: "theme", id: t.id})})),
    ...NX.episodes.map(e => ({t: `Place ${e.place}`, d: e.titre, run: () => { st.place = e.place; go("reunion", {v: "home"}); }}))];
  SR = {items, i: 0, list: []}; MODAL = "search";
  modal(`<h2 style="margin-bottom:16px">Rechercher</h2><input class="search" id="sq" placeholder="Alinéa, amendement (CE…), thème, place" autocomplete="off"><div class="res" id="sr"></div>`, true);
  const q = $("#sq"); q.addEventListener("input", () => { SR.i = 0; srRender(); }); q.focus(); srRender();
}
function srRender(){
  const q = $("#sq").value.trim().toLowerCase();
  SR.list = SR.items.filter(x => !q || (x.t + " " + x.d).toLowerCase().includes(q)).slice(0, 40);
  $("#sr").innerHTML = SR.list.map((x, i) => `<div class="r${i === SR.i ? " on" : ""}" data-sr="${i}"><span class="t1">${esc(x.t)}</span><span class="t2">${esc(x.d)}</span></div>`).join("") || `<div class="empty">Aucun résultat.</div>`;
  const on = $("#sr .on"); if (on) on.scrollIntoView({block: "nearest"});
}
function srRun(i){ const x = SR.list[i]; closeModal(); if (x) x.run(); }

/* ---------- menu, toasts ---------- */
function openMenu(){
  $("#menu").innerHTML = `<button data-cmd="search">${P.search}Rechercher <span class="sp"></span><span class="kbd" style="background:var(--sec)">/</span></button><button data-cmd="confirm">${P.check}Confirmer mon amendement</button><button data-cmd="readme">${P.book}À propos de cette maquette</button><div class="sep"></div><div class="cap">Référence (reste vierge)</div>${ETAPES.map(id => `<button class="${id === REF ? "on" : ""}" data-ref="${id}">${esc(ET[id].label)}</button>`).join("")}`;
  $("#menu").classList.add("on");
}
function closeMenu(){ $("#menu").classList.remove("on"); }
let toastT = 0;
function toast(msg){ const t = $("#toast"); t.innerHTML = msg; t.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("on"), 4200); }
function setRef(id){ REF = id; store.set("ref", id); toast(`Face à : ${esc(ET[id].label)}. La référence reste vierge.`); closeMenu(); render(true); }

/* ---------- actions ---------- */
function openDraft(id){ st.draft = id; st.o = draft().al; closeModal(); go("atelier", {v: "draft"}); }
function openAm(id){ const a = AM[id]; if (a.cible.al) st.o = a.cible.al; closeModal(); go("atelier", {v: "am", id}); }
function openAl(o){ st.o = o; const m = MINE.find(x => x.al === o); if (m) return openDraft(m.id); st.sortF = "tous"; st.grF = ""; go("atelier", {v: "home"}); setTimeout(() => { const t = $(".secttl:nth-of-type(1)"); const s = [...document.querySelectorAll(".secttl")][0]; if (s) s.scrollIntoView({behavior: "smooth"}); }, 50); }
function cmd(c, el){
  switch (c){
    case "menu": return $("#menu").classList.contains("on") ? closeMenu() : openMenu();
    case "close": return closeModal();
    case "readme": closeMenu(); return readme();
    case "search": closeMenu(); return searchModal();
    case "confirm": closeMenu(); return confirmModal();
    case "edit": st.editing = true; return render(true);
    case "annuler": st.editing = false; return render(true);
    case "valider": { const m = draft(); m.texte = $("#ta").value; m.confirme = false; saveDrafts(); UNIT_CACHE.clear(); st.editing = false; toast(`${esc(draftNum(m))} enregistré.`); return render(true); }
    case "torediger": { const m = draft(); m.mode = "rediger"; m.texte = TRANSMIS[m.al - 1]; saveDrafts(); UNIT_CACHE.clear(); st.editing = true; return render(true); }
    case "new": { const o = +($("#newal") || {value: st.o}).value; const m = newDraft(o); toast(`${esc(draftNum(m))} créé sur l'alinéa ${o}, à partir de la référence.`); return openDraft(m.id); }
    case "swap": { const c2 = st.cmp; [c2.a, c2.b] = [c2.b, c2.a]; return render(true); }
    case "cmp-go": st.cmp.shown = true; render(true); { const r = $("#cols3"); if (r) r.scrollIntoView({behavior: "smooth", block: "start"}); } return;
    case "unfold": st.unfold = true; return render(true);
    case "fold": st.unfold = false; return render(true);
  }
}
function backOne(){
  if (MODAL){ closeModal(); return true; }
  if ($("#menu").classList.contains("on")){ closeMenu(); return true; }
  if (st.editing){ st.editing = false; render(true); return true; }
  if (st.esp === "atelier" && pg().v === "cmp" && st.cmp && st.cmp.shown){ st.cmp.shown = false; render(true); return true; }
  if (pg().v === "code"){ nav({v: "article"}); return true; }
  if (pg().v !== "home"){ nav({v: "home"}); return true; }
  return false;
}

document.addEventListener("click", e => {
  if (!e.target.closest("#menu,[data-cmd=menu]")) closeMenu();
  if (e.target.id === "veil"){ closeModal(); return; }
  const mk = e.target.closest("mark.pt");
  if (mk){ const o = +mk.closest("[data-o]").dataset.o; return unitModal(o, +mk.dataset.u); }
  const h = e.target.closest("ins[data-h],del[data-h]");
  if (h && !e.target.closest(".edbox")) return hunkModal(+h.dataset.h);
  const t = e.target.closest("[data-esp],[data-cmd],[data-draft],[data-am],[data-al],[data-hist],[data-art],[data-unit],[data-th],[data-place],[data-open],[data-go],[data-amender],[data-back],[data-sortf],[data-diff],[data-metric],[data-ref],[data-step],[data-cmpwith],[data-sr]");
  if (!t || t.disabled) return;
  const d = t.dataset;
  if (d.sr != null) return srRun(+d.sr);
  if (d.esp){ if (st.esp === d.esp && pg().v !== "home") return nav({v: "home"}); return go(d.esp); }
  if (d.cmd) return cmd(d.cmd, t);
  if (d.back != null){ return nav({v: d.back || "home"}); }
  if (d.step){ const m = draft(), s = st.steps[m.id] = st.steps[m.id] || {};
    if (d.step === "relu"){ s.relu = true; save(); closeModal(); st.diff = "inline"; if (!(st.esp === "atelier" && pg().v === "draft")) go("atelier", {v: "draft"}); toast("Relisez votre rédaction face à la référence, puis revenez à l'étape 2 (bouton « Confirmer »)."); return; }
    if (d.step === "vu"){ s.vu = true; save(); const U = unitsOf(m.al); if (U.length) return unitModal(m.al, U[0].k); return confirmModal(); }
    if (d.step === "ok"){ m.confirme = true; saveDrafts(); toast(`${esc(draftNum(m))} confirmé (dans la maquette : rien n'est déposé).`); confirmModal(); return render(true); } }
  if (d.unit != null) return unitModal(+d.o || st.o, +d.unit);
  if (d.draft) return openDraft(d.draft);
  if (d.amender){ const o = +d.amender, m = MINE.find(x => x.al === o) || newDraft(o); return openDraft(m.id); }
  if (d.cmpwith){ const a = AM[d.cmpwith], o = a.cible.al || st.o, m = MINE.find(x => x.al === o); st.cmp = {o, a: m ? m.id : null, b: a.id, shown: !!m}; if (!m){ st.cmp.a = a.id; st.cmp.b = null; } return go("atelier", {v: "cmp"}); }
  if (d.am) return openAm(d.am);
  if (d.al) return openAl(+d.al);
  if (d.hist) return go("dossier", {v: "hist", o: +d.hist});
  if (d.art){ if (d.art === "4"){ const g = [...document.querySelectorAll(".secttl")][1]; if (g) g.scrollIntoView({behavior: "smooth"}); return; }
    const p = NX.plan.find(x => x.num === d.art); MODAL = "art";
    return modal(`<span class="chip">${esc(p.statut || "Article")}</span><h2 style="margin:14px 0 8px">Article ${esc(p.num)}</h2><p class="expl">${esc(p.intitule || "(sans intitulé)")}</p>${p.cible ? `<p class="expl" style="margin-top:8px">Vise : ${esc(short(p.cible, 220))}</p>` : ""}
      <div class="details" style="grid-template-columns:1fr;margin-top:12px">${Object.entries(p.amendements).sort((a, b) => b[1] - a[1]).map(([k, v]) => kv(esc(k), v)).join("") || kv("Amendements", 0)}</div><p class="expl" style="margin-top:16px">Seul l'article 4 est chargé en détail dans cette maquette.</p>`, true); }
  if (d.th){ return go("enjeux", {v: "theme", id: d.th}); }
  if (d.place){ st.place = +d.place; closeModal(); if (st.esp === "reunion" && pg().v === "home") return render(true); return go("reunion", {v: "home"}); }
  if (d.open === "article") return go("atelier", {v: "article"});
  if (d.open === "code") return go("atelier", {v: "code"});
  if (d.open === "cmp"){ const m = st.esp === "atelier" && pg().v === "draft" ? draft() : MINE.find(x => x.al === st.o); st.cmp = {o: m ? m.al : st.o, a: m ? m.id : null, b: null, shown: false}; return go("atelier", {v: "cmp"}); }
  if (d.ref) return setRef(d.ref);
  if (d.sortf){ st.sortF = d.sortf; return render(true); }
  if (d.diff){ st.diff = d.diff; return render(true); }
  if (d.metric){ st.metric = d.metric; return render(true); }
  if (d.go) return go(d.go, {v: "home"});
});
document.addEventListener("change", e => {
  const s = e.target.closest("[data-pick]"); if (!s) return;
  const k = s.dataset.pick, v = s.value;
  if (k === "ref") return setRef(v);
  if (k === "al"){ st.o = +v; st.grF = ""; return render(true); }
  if (k === "gr"){ st.grF = v; return render(true); }
  if (k === "cmp-o"){ st.cmp = {o: +v, a: null, b: null, shown: false}; return render(true); }
  if (k === "cmp-a" || k === "cmp-b"){ st.cmp[k.slice(4)] = v; if (st.cmp.a === st.cmp.b) st.cmp[k === "cmp-a" ? "b" : "a"] = null; return render(true); }
});
document.addEventListener("dblclick", e => {
  if (st.editing || st.esp !== "atelier" || pg().v !== "draft" || e.target.closest("mark.pt")) return;
  if (e.target.closest(".dbl") && draft().mode !== "supprimer"){ st.editing = true; render(true); }
});
document.addEventListener("keydown", e => {
  const k = e.key, ctrl = e.ctrlKey || e.metaKey;
  if (MODAL === "search"){
    if (k === "ArrowDown"){ e.preventDefault(); SR.i = Math.min(SR.list.length - 1, SR.i + 1); return srRender(); }
    if (k === "ArrowUp"){ e.preventDefault(); SR.i = Math.max(0, SR.i - 1); return srRender(); }
    if (k === "Enter"){ e.preventDefault(); return srRun(SR.i); }
  }
  if (st.editing && !MODAL){ if (k === "Escape"){ e.preventDefault(); return cmd("annuler"); } if (k === "Enter" && ctrl){ e.preventDefault(); return cmd("valider"); } return; }
  if (k === "Escape"){ if (backOne()) e.preventDefault(); return; }
  if (e.target.matches("input,textarea,select")) return;
  if (k === "/" || (ctrl && k.toLowerCase() === "k")){ e.preventDefault(); return searchModal(); }
  if (e.altKey && /^Digit[1-4]$/.test(e.code)){ e.preventDefault(); return go(SPACES[+e.code.slice(5) - 1].id); }
});

render();
if (!store.get("vu", false)){ toast(`Maquette inspirée de Sky. <a data-cmd="readme">À propos</a> dit ce qui est emprunté.`); store.set("vu", true); }
