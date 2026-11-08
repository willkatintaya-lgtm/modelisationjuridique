/* Boussole — le modèle : directions (interrupteurs), mes brouillons, concurrents, unités de sens nées du débat,
   référence vierge et versions d'article. */
"use strict";

/* ---------- directions : chacune derrière un interrupteur ---------- */
const DIRS = [
  {id:"L1", t:"Comparer devient un geste", d:"Le coffre suit la main dans tous les rangements ; « Comparer » éclate sur place (une | la référence | l'autre). Les volets passent de cinq à trois."},
  {id:"L2", t:"« Face à » devient une référence", d:"Un clic sur l'en-tête montre ou masque la référence au-dessus de la feuille. Éteint : variante conservatrice, la référence redevient un cran de l'échelle (dézoomer depuis l'alinéa)."},
  {id:"L3", t:"Le dos de la feuille", d:"Chaque feuille a un verso (coin replié en bas à droite, ou touche R) : identité, statut, motif, versions, liens, provenance."},
  {id:"L4", t:"Le repli", d:"Identiques pliés en une feuille, séries en une feuille paramétrée, gages en une ligne, rédactionnels rangés à part, écartés en fin de pile."},
  {id:"D1", t:"Versions et référence variable", d:"La référence vierge se choisit (▾ sur l'en-tête) : texte transmis, étapes du Sénat, texte de la commission."},
  {id:"D2", t:"Sort et état", d:"Matière par sort (tampon adopté, feuille basculée si tombé, coin plié si retiré, fantôme si irrecevable), pastilles d'avis, pile des écartés."},
  {id:"D3", t:"La concurrence réelle", d:"Discussions communes, trois ordres (texte, dépôt, appel), chutes reliées à leur cause, « et si celle-ci passait ? » sur calque."},
  {id:"D4", t:"Le droit : le code tel qu'il deviendrait", d:"Un cran au-dessus de l'article : l'article 31 du CGI en vigueur, et ce qu'il deviendrait avec chaque version, instruction par instruction."},
  {id:"D5", t:"La séance (ici : la commission)", d:"Le dérouleur : places dans l'ordre d'appel, liste de vote, paroles au zoom, partition au dézoom."},
  {id:"D6", t:"Le direct", d:"Non construit : décision du 8 novembre (pas de direct sur la séance logement pour le moment).", off:true},
  {id:"D7", t:"La navette", d:"L'histoire : un alinéa d'étape en étape (Sénat → Assemblée), tampons de provenance, grille alinéas × étapes."},
  {id:"D8", t:"Acteurs et tiers", d:"La rapporteure et le rapporteur pour avis deviennent des acteurs institutionnels (matière du banc), sources revendiquées dans l'exposé."},
  {id:"D9", t:"L'atelier de rédaction", d:"Plusieurs brouillons, replis, dispositif généré, sas de confirmation (gage, doublon, déjà satisfait, renvois)."},
  {id:"D10", t:"Thèmes et synthèse", d:"Le rangement des thèmes : déclarés (rapport) ou calculés (mots-clés), synthèse en trois strates, matrice thèmes × groupes."},
  {id:"D11", t:"La négociation augmentée", d:"Une question ancrée à un amendement, adressée à son auteur ; un engagement noté. Saisi par vous, dit comme tel."},
  {id:"D12", t:"Vue d'ensemble : le plan", d:"Le projet de loi en une feuille : chaque article, ses amendements en traits de marge, l'entrée vers l'article 4."},
  {id:"D13", t:"Visibilité", d:"Seule part gardée des rôles : privé, partagé avec mon groupe, public."},
];
const DIR = Object.assign(Object.fromEntries(DIRS.map(d => [d.id, !d.off])), store.get("dirs", {}));
DIR.D6 = false;
const on = id => !!DIR[id];

/* ---------- groupes et institutions ---------- */
const who = a => a.inst ? {name: INS[a.inst].name, sub: INS[a.inst].sub, color: INS[a.inst].color, inst: true}
  : {name: (GR[a.groupe] || {name: a.groupe || "—"}).name, color: (GR[a.groupe] || {color: "#8c8c8c"}).color};
function badge(w, extra){
  const inst = w.inst && on("D8");
  return `<span class="group-badge${inst ? " inst" : ""}" style="--g:${w.color}"><i></i><span class="name">${esc(w.name)}</span>${inst && w.sub ? `<small>${esc(w.sub)}</small>` : ""}${extra || ""}</span>`;
}
const myWho = () => ({name: GR[ME].name, color: GR[ME].color});

/* ---------- mes brouillons ---------- */
function seedDrafts(){
  const al12 = TRANSMIS[11].replace(/199[\s ]novovicies,/, m => m + " représentent au moins 25 % du prix d’acquisition du bien et");
  return [
    {id:"M1", al:12, mode:"rediger", texte: al12, vis:"privé", journal:[], confirme:false, repliDe:null},
    {id:"M2", al:4, mode:"supprimer", texte:"", vis:"partagé", journal:[], confirme:false, repliDe:null},
    {id:"M3", al:13, mode:"rediger", texte: TRANSMIS[12], vis:"privé", journal:[], confirme:false, repliDe:null},
  ];
}
let MINE = store.get("drafts", null);
if (!Array.isArray(MINE) || !MINE.length || MINE.some(m => !m || !m.al)) MINE = seedDrafts();
const saveDrafts = () => store.set("drafts", MINE);
let draftSeq = Math.max(3, ...MINE.map(m => +String(m.id).slice(1) || 0));
function newDraft(al, mode, texte, repliDe){
  const m = {id: "M" + (++draftSeq), al, mode: mode || "rediger", texte: texte != null ? texte : TRANSMIS[al - 1], vis: "privé", journal: [], confirme: false, repliDe: repliDe || null};
  MINE.push(m); MINE.sort((x, y) => x.al - y.al || (x.repliDe ? 1 : 0) - (y.repliDe ? 1 : 0)); saveDrafts(); return m;
}
const draftNum = m => `Brouillon ${MINE.indexOf(m) + 1}${m.repliDe ? " · repli" : ""}`;
const myVer = () => MINE.reduce((v, m) => verOfDraft(m, v), emptyVer());
const draftLead = m => m.mode === "supprimer" ? `Supprimer l'alinéa ${m.al}.` : m.mode === "inserer" ? `Après l'alinéa ${m.al}, insérer l'alinéa suivant :` : `Rédiger ainsi l'alinéa ${m.al} :`;

/* ---------- la référence vierge (S2) ---------- */
let REF = store.get("ref", "transmis"); if (!ET[REF]) REF = "transmis";
const refLabel = () => ET[REF].label;
const refShort = () => ET[REF].court;
const refAl = o => o == null ? "" : textAt(REF, o);

/* ---------- les amendements des autres ---------- */
const ALL = D.amendements;
const isEcarte = a => /^Irrecevable/.test(a.etat || "") || a.sousEtat === "Retiré après publication" || a.mode === "hors-texte";
const touchesAl = (a, o) => {
  if (a.mode === "supprimer-article" || a.mode === "rediger-article") return true;
  if (a.applique.rows.some(r => r.o === o || (r.o == null && r.at === o && !r.fin))) return true;
  return a.spans.some(s => s.al === o);
};
const SERIES = (() => {        // une même matrice, une valeur qui varie
  const m = new Map();
  for (const a of ALL){
    if (!a.dispositif || a.mode === "hors-texte") continue;
    const k = [a.auteur, a.cible.al, a.dispositif.split(/perte de recettes/)[0].replace(/«[^»]*»/g, "«·»").replace(/\s+/g, " ")].join("|");
    if (!m.has(k)) m.set(k, []); m.get(k).push(a.id);
  }
  const s = new Map(); for (const [k, ids] of m) if (ids.length >= 3) ids.forEach(id => s.set(id, k));
  return s;
})();
const DC_NUM = (() => { const m = new Map(); let k = 0; for (const a of [...ALL].sort((x, y) => x.ordreTexte - y.ordreTexte)) if (a.dc && !m.has(a.dc)) m.set(a.dc, ++k); return m; })();
const orderKey = (a, ord) => ord === "depot" ? a.ordreDepot : ord === "appel" ? (a.ordreAppel || 900) * 1000 + a.ordreTexte : a.ordreTexte;
// les unités d'une pile : une rédaction distincte ; identiques pliés, séries pliées (L4)
function pileUnits(list, ord){
  const fold = on("L4"), groups = new Map();
  for (const a of list){
    let key = a.id, kind = "single";
    if (fold && a.ident){ key = "id:" + a.ident; kind = "ident"; }
    else if (fold && SERIES.has(a.id)){ key = "se:" + SERIES.get(a.id); kind = "serie"; }
    if (!groups.has(key)) groups.set(key, {key, kind, members: []});
    groups.get(key).members.push(a);
  }
  const u = [...groups.values()];
  for (const g of u){
    g.members.sort((x, y) => (y.inst ? 1 : 0) - (x.inst ? 1 : 0) || orderKey(x, ord) - orderKey(y, ord));
    if (g.members.length === 1) g.kind = "single";
    g.lead = g.members.find(x => x.sort === "Adopté") || g.members[0];
    g.k = Math.min(...g.members.map(x => orderKey(x, ord)));
  }
  return u.sort((x, y) => x.k - y.k);
}
function concurrents(o, ord){
  const base = ALL.filter(a => a.mode !== "hors-texte" && touchesAl(a, o));
  const main = base.filter(a => !isEcarte(a) && !(on("L4") && a.redactionnel));
  const redac = on("L4") ? base.filter(a => !isEcarte(a) && a.redactionnel) : [];
  const ecartes = on("L4") || on("D2") ? base.filter(isEcarte) : [];
  const whole = u => u.lead.mode === "supprimer-article" || u.lead.mode === "rediger-article";
  const all = pileUnits(on("L4") || on("D2") ? main : base, ord);
  const units = [...all.filter(u => !whole(u)), ...all.filter(whole)];
  return {units, redac, ecartes: on("L4") || on("D2") ? pileUnits(ecartes, ord) : [], total: base.length};
}
// la version de l'article d'un groupe : ses amendements appliqués, dans l'ordre du texte (le dernier l'emporte)
function groupVer(g, inst){
  const v = emptyVer();
  ALL.filter(a => !isEcarte(a) && (inst ? a.inst === inst : a.groupe === g && !a.inst)).sort((x, y) => x.ordreTexte - y.ordreTexte).forEach(a => merge(v, verOfAmendment(a)));
  return v;
}

/* ---------- unités de sens nées du débat ---------- */
// une unité = une zone du texte que quelqu'un modifie ; les modifications de tous les amendements (et les miennes) sont fusionnées
function myHunks(o){
  const out = [];
  for (const m of MINE){
    if (m.al !== o || m.mode !== "rediger") continue;
    const ref = TRANSMIS[o - 1], R = wordsPos(ref), V = wordsPos(m.texte);
    const [kr, kv] = lcsKeep(R.map(x => x.w), V.map(x => x.w));
    let i = 0, j = 0;
    while (i < R.length || j < V.length){
      if (i < R.length && j < V.length && kr[i] && kv[j]){ i++; j++; continue; }
      const i0 = i; while (i < R.length && !kr[i]) i++;
      const jIns = j < V.length && !kv[j]; while (j < V.length && !kv[j]) j++;
      if (i > i0) out.push({a: R[i0].s, b: R[i - 1].e, id: m.id});
      else if (jIns){ const k = Math.max(0, i0 - 1); if (R[k]) out.push({a: R[k].s, b: R[k].e, id: m.id}); }
      if (i === i0 && !jIns) break;
    }
  }
  return out;
}
const UNIT_CACHE = new Map();
function unitsOf(o){
  const key = o + "|" + MINE.filter(m => m.al === o).map(m => m.texte).join("¦");
  if (UNIT_CACHE.has(key)) return UNIT_CACHE.get(key);
  // petites zones (un mot, une locution) : elles se fusionnent quand elles se recouvrent ;
  // les longues réécritures ne fabriquent pas d'unité, elles comptent comme une proposition sur chaque passage qu'elles couvrent
  const small = [], large = [];
  for (const a of ALL) if (!isEcarte(a)) for (const s of a.spans) if (s.al === o && !s.whole && !s.after && !s.end){ const x = {a: s.a, b: Math.max(s.b, s.a + 1), id: a.id}; (x.b - x.a > 60 ? large : small).push(x); }
  myHunks(o).forEach(s => (s.b - s.a > 60 ? large : small).push(s));
  small.sort((x, y) => x.a - y.a);
  const U = [];
  for (const s of small){
    const l = U[U.length - 1];
    if (l && s.a < l.b + 1){ l.b = Math.max(l.b, s.b); l.ids.add(s.id); }
    else U.push({o, a: s.a, b: s.b, ids: new Set([s.id])});
  }
  for (const u of U) for (const s of large) if (s.a <= u.a && s.b >= u.b) u.ids.add(s.id);
  const ref = TRANSMIS[o - 1];
  const out = U.filter(u => u.ids.size >= 2 || [...u.ids].some(id => id[0] === "M")).map((u, k) => {
    const seg = ref.slice(u.a, u.b).replace(/^[\s,;]+|[\s,;]+$/g, "");
    return {...u, k, label: short(seg, 34) || "fin de l'alinéa", n: u.ids.size};
  });
  UNIT_CACHE.set(key, out); if (UNIT_CACHE.size > 200) UNIT_CACHE.delete(UNIT_CACHE.keys().next().value);
  return out;
}
const unitWeight = n => n >= 6 ? 3 : n >= 3 ? 2 : 1;
// les filets dorés d'une rédaction : chaque unité est retrouvée dans le texte par alignement
function unitMarks(o, text, opts){
  if (!text) return "";
  const U = unitsOf(o); if (!U.length) return esc(text);
  const ref = TRANSMIS[o - 1], hits = [];
  for (const u of U){
    const seg = sameText(text, ref) ? ref.slice(u.a, u.b) : mapRange(ref, text, u.a, u.b).ver;
    if (!seg) continue;
    const at = text.indexOf(seg.trim()); if (at < 0) continue;
    hits.push({s: at, e: at + seg.trim().length, u});
  }
  hits.sort((x, y) => x.s - y.s);
  let out = "", i = 0;
  for (const h of hits){ if (h.s < i) continue; out += esc(text.slice(i, h.s)) + `<mark class="pt w${unitWeight(h.u.n)}" data-u="${h.u.k}" title="${h.u.n} ${plural(h.u.n, "proposition", "propositions")} sur ce passage : cliquer pour les voir">${esc(text.slice(h.s, h.e))}</mark>`; i = h.e; }
  return out + esc(text.slice(i));
}
// au niveau d'une unité : une feuille par proposition distincte, avec ceux qui la portent
function clusters(u){
  const ref = TRANSMIS[u.o - 1], items = [];
  const seg = t => t == null ? null : mapRange(ref, t, u.a, u.b).ver;
  const refSeg = mapRange(ref, ref, u.a, u.b).ref;
  items.push({id: "ref", label: "Texte transmis", color: "#6b6457", text: refSeg});
  for (const m of MINE) if (m.al === u.o && m.mode !== "inserer") items.push({id: m.id, label: "Vous · " + draftNum(m).toLowerCase(), color: GR[ME].color, text: m.mode === "supprimer" ? null : seg(m.texte), mine: true});
  for (const a of ALL){
    if (isEcarte(a) || !touchesAl(a, u.o)) continue;
    const v = verOfAmendment(a), t = v.rows.has(u.o) ? v.rows.get(u.o) : ref, w = who(a);
    items.push({id: a.id, label: w.name, color: w.color, text: t == null ? null : seg(t), a});
  }
  const map = new Map();
  for (const it of items){ const key = it.text == null ? "∅" : norm(it.text).replace(/\s+/g, " ").trim(); if (!map.has(key)) map.set(key, {text: it.text, items: []}); map.get(key).items.push(it); }
  return {ref: refSeg, list: [...map.values()].sort((x, y) => (y.items.some(i => i.id === "ref") ? 1 : 0) - (x.items.some(i => i.id === "ref") ? 1 : 0) || y.items.length - x.items.length)};
}

/* ---------- versions d'article (volet des articles) ---------- */
function articleVersions(){
  const L = [{id: "mine", label: "Votre version", color: GR[ME].color, ver: myVer(), me: true},
    {id: "AN-com", label: "Texte de la commission (résultat)", color: "#6b6457", ver: verOfEtape("AN-com"), etape: true}];
  for (const k of Object.keys(INS)) L.push({id: "inst:" + k, label: INS[k].name, sub: INS[k].sub, color: INS[k].color, ver: groupVer(null, k), inst: true});
  for (const g of Object.keys(GR)){
    const v = groupVer(g); if (!verTouched(v).size) continue;
    L.push({id: "g:" + g, label: GR[g].name + (g === ME ? " (vos collègues)" : ""), color: GR[g].color, ver: v});
  }
  return L;
}

/* ---------- thèmes ---------- */
const THEMES = D.themes;
const themeAls = th => {
  const c = new Map();
  th.amendements.forEach(id => { const a = AM[id]; if (!a || a.mode === "hors-texte" || a.mode === "supprimer-article" || a.mode === "rediger-article") return;
    const s = new Set(); a.spans.forEach(x => s.add(x.al)); a.applique.rows.forEach(r => { if (!r.fin) s.add(r.o || r.at); }); s.forEach(o => c.set(o, (c.get(o) || 0) + 1)); });
  const max = Math.max(0, ...c.values()), th0 = Math.max(1, Math.min(2, Math.ceil(max * .25)));
  return [...c].filter(([o, n]) => o >= 1 && o <= NAL && n >= th0).map(([o]) => o).sort((x, y) => x - y);
};

/* ---------- textes courts ---------- */
const objetOf = a => {
  const e = (a.expose || "").replace(/^["“]+/, "").replace(/\s+/g, " ").trim();
  const s = e.split(/(?<=[.!?])\s/)[0] || "";
  return short(s, 150);
};
const modeLead = (a, o) => {
  switch (a.mode){
    case "supprimer-article": return "Supprimer cet article.";
    case "rediger-article": return "Rédiger ainsi cet article :";
    case "supprimer": return "Supprime " + (o ? `l'alinéa ${o}` : "des alinéas") + ".";
    case "inserer": return `Insère après l'alinéa ${a.cible.al || o} :`;
    case "completer": return `Complète l'alinéa ${a.cible.al || o} :`;
    case "hors-texte": return "Vise un autre texte que l'article (hors du texte examiné).";
    default: return `Modifie ${o ? "l'alinéa " + o : a.cible.label.toLowerCase()} :`;
  }
};
const SORT_CLASS = {"Adopté": "s-adopte", "Rejeté": "s-rejete", "Tombé": "s-tombe", "Retiré": "s-retire", "Non soutenu": "s-ns"};
const sortClass = a => !on("D2") ? "" : isEcarte(a) ? "s-irr" : (SORT_CLASS[a.sort] || "");
const sortWord = a => isEcarte(a) ? (a.sousEtat === "Retiré après publication" ? "retiré" : "irrecevable" + (a.sousEtat ? " · " + a.sousEtat.toLowerCase() : "")) : (a.sort || "non examiné").toLowerCase();
const avisSym = v => !v ? "—" : /favorable/.test(v) && !/dé/.test(v) ? "✓" : /défavorable/.test(v) ? "✕" : /sagesse/.test(v) ? "S" : /retrait/.test(v) ? "R" : "·";
// sources revendiquées dans l'exposé (D8) : repérées par motif, dites comme telles
const SOURCES = /(Cour des comptes|Conseil d['’]État|Insee|INSEE|Fédération [^,.;]{3,40}|Agence [^,.;]{3,40}|Observatoire [^,.;]{3,40}|Haut Conseil [^,.;]{3,40}|Union sociale pour l['’]habitat|France Stratégie|Banque de France|ADEME|Anah|ANAH|Inspection générale [^,.;]{3,40}|rapport [^,.;]{3,50})/g;
const sourcesOf = a => [...new Set(((a.expose || "").match(SOURCES) || []).map(s => s.trim()))].slice(0, 5);

/* ---------- négociation (D11) : saisie par l'utilisateur ---------- */
let NOTES = store.get("notes", {});
const saveNotes = () => store.set("notes", NOTES);
