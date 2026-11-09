/* Boussole · inspiration Linear (refonte 2024 / 2026) — rendu et gestes. S'appuie sur le noyau commun (données réelles, groupes fictifs). */
"use strict";
const IC = {
  inbox:'<svg viewBox="0 0 16 16"><path d="M2.5 9.5l1.6-5.2a1 1 0 0 1 1-.8h5.8a1 1 0 0 1 1 .8l1.6 5.2v3a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1z"/><path d="M2.5 9.5h3l.7 1.5h3.6l.7-1.5h3"/></svg>',
  mine:'<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5.8"/><path d="M5.6 8.1l1.7 1.7 3.2-3.4"/></svg>',
  folder:'<svg viewBox="0 0 16 16"><path d="M2 4.5a1 1 0 0 1 1-1h3.2l1.3 1.4H13a1 1 0 0 1 1 1V12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/></svg>',
  views:'<svg viewBox="0 0 16 16"><rect x="2" y="2.5" width="9" height="9" rx="2"/><path d="M5 13.5h7a2 2 0 0 0 2-2v-7"/></svg>',
  cycle:'<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5.8" stroke-dasharray="2.2 2"/></svg>',
  edit:'<svg viewBox="0 0 16 16"><path d="M3 13h2.5l7-7L10 3.5l-7 7z"/></svg>',
  search:'<svg viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/></svg>',
  plus:'<svg viewBox="0 0 16 16"><path d="M8 3v10M3 8h10"/></svg>',
  chev:'<svg viewBox="0 0 16 16"><path d="M6 4l4 4-4 4"/></svg>',
  car:'<svg viewBox="0 0 10 10" style="stroke-width:0;fill:currentColor"><path d="M2 3.5h6L5 7z"/></svg>',
  link:'<svg viewBox="0 0 16 16"><path d="M7 9a2.5 2.5 0 0 0 3.5 0l2-2A2.5 2.5 0 0 0 9 3.5l-.7.7"/><path d="M9 7a2.5 2.5 0 0 0-3.5 0l-2 2A2.5 2.5 0 0 0 7 12.5l.7-.7"/></svg>',
  copy:'<svg viewBox="0 0 16 16"><rect x="5" y="5" width="8" height="8.5" rx="1.6"/><path d="M3 10.5V4a1.5 1.5 0 0 1 1.5-1.5H10"/></svg>',
  more:'<svg viewBox="0 0 16 16" style="fill:currentColor;stroke:none"><circle cx="3.5" cy="8" r="1.2"/><circle cx="8" cy="8" r="1.2"/><circle cx="12.5" cy="8" r="1.2"/></svg>',
  menu:'<svg viewBox="0 0 16 16"><path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11"/></svg>',
  side:'<svg viewBox="0 0 16 16"><rect x="2" y="2.5" width="12" height="11" rx="2"/><path d="M6 2.5v11"/></svg>',
  x:'<svg viewBox="0 0 16 16"><path d="M4 4l8 8M12 4l-8 8"/></svg>',
  pin:'<svg viewBox="0 0 16 16"><path d="M9.5 2.5l4 4-2 1-2.5 2.5.5 2.5-1 1-6-6 1-1 2.5.5L8.5 4.5z"/><path d="M5 11l-2.5 2.5"/></svg>',
  cols:'<svg viewBox="0 0 16 16"><rect x="2" y="3" width="12" height="10" rx="1.6"/><path d="M6 3v10M10 3v10"/></svg>',
  list:'<svg viewBox="0 0 16 16"><path d="M5.5 4.5h8M5.5 8h8M5.5 11.5h8M2.5 4.5h.01M2.5 8h.01M2.5 11.5h.01"/></svg>',
  board:'<svg viewBox="0 0 16 16"><rect x="2" y="2.5" width="3.4" height="11" rx="1"/><rect x="6.3" y="2.5" width="3.4" height="7.5" rx="1"/><rect x="10.6" y="2.5" width="3.4" height="9" rx="1"/></svg>',
  grid:'<svg viewBox="0 0 16 16"><rect x="2" y="2.5" width="12" height="11" rx="1.6"/><path d="M2 6.2h12M2 9.8h12M6 2.5v11M10 2.5v11"/></svg>',
  doc:'<svg viewBox="0 0 16 16"><path d="M4 2.5h5l3 3v8H4z"/><path d="M9 2.5v3h3M6 8.5h4M6 11h4"/></svg>',
  diamond:'<svg viewBox="0 0 16 16"><path d="M8 2.5L13.5 8 8 13.5 2.5 8z"/></svg>',
  clock:'<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5.8"/><path d="M8 5v3.2l2 1.3"/></svg>',
  label:'<svg viewBox="0 0 16 16"><path d="M2.5 3.5h6.2l4.8 4.5-4.8 4.5H2.5z"/></svg>',
  user:'<svg viewBox="0 0 16 16"><circle cx="8" cy="6" r="2.6"/><path d="M3.2 13.5a4.8 4.8 0 0 1 9.6 0"/></svg>',
  ref:'<svg viewBox="0 0 16 16"><path d="M3 3.5h10M3 8h10M3 12.5h6"/></svg>',
  eye:'<svg viewBox="0 0 16 16"><path d="M1.8 8S4 3.8 8 3.8 14.2 8 14.2 8 12 12.2 8 12.2 1.8 8 1.8 8z"/><circle cx="8" cy="8" r="2"/></svg>',
  sun:'<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="3"/><path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1 1M11.6 11.6l1 1M3.4 12.6l1-1M11.6 4.4l1-1"/></svg>',
  q:'<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6"/><path d="M6.3 6.2a1.8 1.8 0 1 1 2.4 1.7c-.5.2-.7.6-.7 1.1v.3M8 11.3h.01"/></svg>',
  back:'<svg viewBox="0 0 16 16"><path d="M10 3.5L5.5 8l4.5 4.5"/></svg>',
  speech:'<svg viewBox="0 0 16 16"><path d="M2.5 4a1.5 1.5 0 0 1 1.5-1.5h8A1.5 1.5 0 0 1 13.5 4v5.5A1.5 1.5 0 0 1 12 11H7l-3 2.5V11a1.5 1.5 0 0 1-1.5-1.5z"/></svg>',
  hammer:'<svg viewBox="0 0 16 16"><path d="M9 3l4 4-1.5 1.5-4-4zM7.5 4.5L3 9l4 4 4.5-4.5"/></svg>',
  book:'<svg viewBox="0 0 16 16"><path d="M3 3h4a1.5 1.5 0 0 1 1 .5V13a1.5 1.5 0 0 0-1-.5H3zM13 3H9a1.5 1.5 0 0 0-1 .5V13a1.5 1.5 0 0 1 1-.5h4z"/></svg>',
};
// le sort d'un amendement : mention en capitales (sans couleur) ; le filet de marge est porté par la ligne ou la carte (direction « Le bordereau »)
function sIcon(k){
  const M = {adopte:"Adopté", rejete:"Rejeté", tombe:"Tombé", retire:"Retiré", ns:"Non soutenu", ecarte:"Irrecevable", attente:"En attente"};
  if (M[k]) return `<span class="si sort s-${k}">${M[k]}</span>`;
  const S = {
    draft:`<circle cx="7" cy="7" r="6" stroke="currentColor"/><path d="M7 3a4 4 0 0 1 0 8z" fill="currentColor" stroke="none"/>`,
    place:`<circle cx="7" cy="7" r="6" stroke="currentColor"/><circle cx="7" cy="7" r="2" fill="currentColor" stroke="none"/>`,
  };
  return `<span class="si"><svg viewBox="0 0 14 14">${S[k] || S.place}</svg></span>`;
}
const SORT_LABEL = {adopte:"Adopté", rejete:"Rejeté", tombe:"Tombé", retire:"Retiré", ns:"Non soutenu", ecarte:"Écarté (irrecevable)", attente:"Sans sort en commission"};
const SORT_ORDER = ["adopte", "rejete", "tombe", "retire", "ns", "attente", "ecarte"];
const THC = ["var(--da-int-1)", "var(--da-int-2)", "var(--da-int-3)", "var(--da-int-4)", "var(--da-int-5)"];
const thColor = th => THC[THEMES.indexOf(th)] || "transparent"; // intercalaires : au-delà de cinq familles, la cote suffit
const kbd = s => s.split(" ").map(k => `<kbd>${esc(k)}</kbd>`).join("");
const isMob = () => innerWidth <= 760;
const initials = a => a.inst ? (a.inst === "rapporteure" ? "Rp" : "Ra") : (a.groupe || "?").slice(0, 2);
const av = (a, lg) => { const w = who(a); return `<span class="av${lg ? " lg" : ""}${a.inst ? " inst" : ""}" style="--g:${w.color}" title="${esc(w.name)}">${esc(initials(a))}</span>`; };
const avMe = lg => `<span class="av${lg ? " lg" : ""}" style="--g:${GR[ME].color}" title="Vous · ${esc(GR[ME].name)}">${ME}</span>`;
const avP = p => p.groupe ? `<span class="av" style="--g:${NX.groupColor(p.groupe)}">${esc(p.groupe.slice(0, 2))}</span>` : `<span class="av inst" style="--g:#5b5446">${p.role === "rapporteure" ? "Rp" : esc((p.role || p.nom || "?").slice(0, 2))}</span>`;
const bars = n => { const w = unitWeight(n); return `<span class="bars" title="${n} ${plural(n, "proposition")}">${[5, 8, 11].map((h, i) => `<i class="${i < w ? "on" : ""}" style="height:${h}px"></i>`).join("")}</span>`; };
function rel(s){
  if (!s) return ""; const d = Math.max(0, Math.round((Date.now() - new Date(s).getTime()) / 864e5));
  return d < 1 ? "auj." : d < 7 ? d + " j" : d < 60 ? Math.round(d / 7) + " sem." : Math.round(d / 30) + " mois";
}
const amDate = a => a.dateSort || a.depot;
const OBJ_RE = /^(?:par )?(?:cet|le présent|ce) amendement(?: de (?:repli|cohérence|coordination|précision|suppression)| d['’]appel)?(?: (?:du|des) groupes? .*?(?= vise| visent| propose| a pour| entend| tend| souhaite|,))?,?\s*(?:(?:les députés|nous|le groupe)[^,]*?\s(?=propos|souhait|vis|entend))?(?:visent|vise|proposent|propose|a pour objet|ont pour objet|entendent|entend|tend|souhaitent|souhaite)?\s*(?:à |de |d['’])?/i;
const amTitle = a => { const o = objetOf(a); if (!o) return modeLead(a, a.cible.al); const t = o.replace(OBJ_RE, ""); return t.length > 18 ? cap(t) : o; };
const amAls = a => [...new Set([...a.applique.rows.map(r => r.o).filter(Boolean), ...a.spans.map(s => s.al)])].filter(o => o >= 1 && o <= NAL).sort((x, y) => x - y);
const themesOf = a => THEMES.filter(t => t.amendements.includes(a.id));
const themesOfAl = o => THEMES.filter(t => themeAls(t).includes(o));
const decisionOf = a => { const e = NX.epOf(a); if (!e) return null; return e.decisions.find(d => d.ams.includes(a.id)) || (e.ams[0] === a.id ? e.decisions[0] : null) || null; };
const draftIdx = m => MINE.indexOf(m) + 1;
const modeWord = m => m.mode === "supprimer" ? "supprimer" : m.mode === "inserer" ? "insérer" : "rédiger";

/* ---------- état ---------- */
const S = Object.assign({esp:"atelier", theme:"dark", o:12, cur:null, aview:"issue", dview:"apercu", eview:"board", rview:"places", iview:"tout",
  th:THEMES[3].id, place:1, inbox:null, art:"4", filter:"", pins:[], read:{}, closed:{}, sideClosed:{}}, store.get("ui", {}));
Object.assign(S, {editing:false, unit:null, peek:null, mpane:"detail", sideOpen:false, focus:null});
if (!S.cur || !(MINE.find(m => m.id === S.cur) || AM[S.cur])) S.cur = MINE[0].id;
S.pins = (S.pins || []).filter(id => MINE.find(m => m.id === id) || AM[id]);
const save = () => store.set("ui", {esp:S.esp, theme:S.theme, o:S.o, cur:S.cur, aview:S.aview, dview:S.dview, eview:S.eview, rview:S.rview, iview:S.iview, th:S.th, place:S.place, inbox:S.inbox, filter:S.filter, pins:S.pins, read:S.read, closed:S.closed, sideClosed:S.sideClosed, art:S.art});
const curDraft = () => MINE.find(m => m.id === S.cur);
const curAm = () => AM[S.cur];

/* ---------- 01 App : barre latérale ---------- */
function inboxItems(){
  const out = [];
  for (const e of [...NX.episodes].reverse()) for (const id of e.ams){ const a = AM[id]; if (!a) continue; const d = decisionOf(a); out.push({a, e, d}); }
  return out;
}
const unreadN = () => inboxItems().filter(x => !S.read[x.a.id]).length;
function renderSide(){
  const nav = (esp, icon, label, n, k) => `<div class="ni${S.esp === esp ? " on" : ""}" data-esp="${esp}" data-k="${k}" title="${label} (${k.replace(" ", " puis ")})">${icon}<span class="lbl">${label}</span>${n != null ? `<span class="n">${n}</span>` : ""}</div>`;
  const sh = (k, label) => `<div class="nh${S.sideClosed[k] ? " closed" : ""}" data-sidesec="${k}">${label}${IC.car.replace('<svg', '<svg class="car"')}</div>`;
  const fav = [
    `<div class="ni sub" data-al="12"><span class="dotc" style="background:var(--orange)"></span><span class="lbl">Alinéa 12 · travaux</span></div>`,
    `<div class="ni sub" data-th="${THEMES[0].id}"><span class="dotc" style="background:${thColor(THEMES[0])}"></span><span class="lbl">${esc(THEMES[0].label)}</span></div>`,
    `<div class="ni sub" data-am="CE732"><span class="dotc" style="background:var(--brand)"></span><span class="lbl">CE732 · rapporteure</span></div>`];
  $("#side").innerHTML = `<div class="ws"><span class="logo">AE</span><b>Affaires économiques</b><span class="sp"></span>
      <button class="ib" data-cmd="cmdk" data-k="Ctrl K" title="Rechercher (Ctrl K)">${IC.search}</button><button class="ib" data-cmd="new" data-k="C" title="Nouveau brouillon (C)">${IC.edit}</button></div>
    <div class="nav">
      ${nav("inbox", IC.inbox, "Inbox", unreadN() || null, "G I")}
      ${nav("atelier", IC.mine, "Mes brouillons", MINE.length, "G A")}
      ${sh("ws", "Espace de travail")}
      ${S.sideClosed.ws ? "" : nav("dossier", IC.folder, "Dossier · projet de loi", null, "G D") + nav("enjeux", IC.views, "Enjeux", THEMES.length, "G E") + nav("reunion", IC.cycle, "Réunion · 21 sept.", NX.episodes.length, "G R")}
      ${sh("fav", "Favoris")}
      ${S.sideClosed.fav ? "" : fav.join("")}
      ${sh("grp", "Votre groupe")}
      ${S.sideClosed.grp ? "" : `<div class="ni" data-esp="atelier"><span class="dotc" style="background:${GR[ME].color}"></span><span class="lbl">${esc(GR[ME].name)}</span></div>
        <div class="ni sub" data-cmd="open-article"><span class="lbl">Article 4 · votre version</span></div>
        <div class="ni sub" data-cmd="open-cmp"><span class="lbl">Comparer</span><span class="n">${S.pins.length}/2</span></div>
        <div class="ni sub" data-cmd="open-code"><span class="lbl">Code général des impôts</span></div>`}
    </div>
    <div class="side-foot"><button class="ib" data-cmd="help" data-k="?" title="Raccourcis (?)">${IC.q}</button><button class="ib" data-cmd="readme" title="À propos de cette maquette">${IC.book}</button><span style="flex:1"></span><button class="ib" data-cmd="theme" title="Thème clair / sombre">${IC.sun}</button></div>`;
}

/* ---------- 02 Location bar · 03 View bar ---------- */
function crumbs(list){
  return list.map((c, i) => `<a class="${i === list.length - 1 ? "last" : ""}" ${c.attr || ""}>${c.t}</a>`).join(IC.chev.replace("<svg", '<svg class="chev"'));
}
function locBar(R){
  $("#loc").innerHTML = `<button class="ib" id="menu-btn" data-cmd="side" title="Menu">${IC.menu}</button>${R.back ? `<button class="ib mback" data-cmd="mback" title="Retour à la liste">${IC.back}</button>` : ""}
    <div class="crumb">${crumbs(R.crumbs)}</div>
    <div class="right">${R.locRight || ""}<button class="ib round hide-m" data-cmd="copylink" title="Copier le lien">${IC.link}</button><button class="ib round" data-cmd="copyid" title="Copier l'identifiant">${IC.copy}</button><button class="ib round hide-m" data-cmd="cmdk" data-k="Ctrl K" title="Actions (Ctrl K)">${IC.more}</button></div>`;
}
const vt = (on, attr, icon, label, n, k) => `<button class="vt${on ? " on" : ""}" ${attr} ${k ? `data-k="${k}"` : ""}>${icon || ""}${label}${n != null ? ` <span class="n">${n}</span>` : ""}</button>`;

/* ---------- rendu général ---------- */
function render(){
  document.documentElement.dataset.theme = S.theme;
  renderSide();
  $("#side").classList.toggle("open", S.sideOpen); $("#scrim-side").classList.toggle("on", S.sideOpen);
  const R = (V[S.esp] || V.atelier)();
  locBar(R);
  $("#viewbar").innerHTML = R.viewbar || "";
  $("#viewbar").style.display = R.viewbar ? "" : "none";
  $("#content").innerHTML = R.html;
  save();
  if (R.after) R.after();
  const f = S.focus && $(`#content .row[data-id="${CSS.escape(S.focus)}"]`); if (f) f.classList.add("focus");
}
const V = {};

/* ---------- les propriétés (panneau de droite, ou en ligne sous le titre à largeur moyenne) ---------- */
function propsAm(a){
  const k = NX.sortKey(a), w = who(a), ep = NX.epOf(a), als = amAls(a), ths = themesOf(a);
  return `<h4>Propriétés<span class="act"><button class="ib" data-cmd="pin" data-id="${a.id}" data-k="2" title="Épingler pour comparer (2)">${IC.pin}</button><button class="ib" data-cmd="peek" data-id="${a.id}" data-k="Espace" title="Aperçu (Espace)">${IC.eye}</button></span></h4>
    <div class="pr">${sIcon(k)}<span class="v">${esc(cap(sortWord(a)))}</span></div>
    <div class="pr">${IC.speech.replace("<svg", '<svg style="color:var(--t3)"')}<span class="v${a.avis ? "" : " t3"}">${a.avis ? "Avis " + esc(a.avis) : "Avis non renseigné"}</span></div>
    <div class="pr">${av(a)}<span class="v">${esc(w.name)}</span></div>
    <div class="pr">${IC.user.replace("<svg", '<svg style="color:var(--t3)"')}<span class="v">${esc(a.auteur || "—")}${a.cosign ? ` <span class="t3">+ ${a.cosign} cosign.</span>` : ""}</span></div>
    <div class="pgrp"><div class="lab">Alinéa visé</div><div class="chips">${als.length ? als.map(o => `<button class="chip" data-al="${o}">al. ${o}</button>`).join("") : `<span class="chip">${esc(a.cible.label)}</span>`}</div></div>
    <div class="pgrp"><div class="lab">Thèmes</div><div class="chips">${ths.length ? ths.map(t => `<button class="chip" data-th="${t.id}"><span class="lb" style="background:${thColor(t)}"></span>${esc(t.label)}</button>`).join("") : `<span class="t4">Aucun</span>`}</div></div>
    <div class="pgrp"><div class="lab">Réunion</div>${ep ? `<div class="pr click" data-place="${ep.place}">${IC.cycle.replace("<svg", '<svg style="color:var(--t3)"')}<span class="v">Place ${ep.place} sur ${NX.episodes.length}</span></div>` : `<div class="pr"><span class="v t3">Non appelé</span></div>`}</div>
    <div class="pgrp"><div class="lab">Référence</div><div class="pr click" data-cmd="refmenu">${IC.ref.replace("<svg", '<svg style="color:var(--t3)"')}<span class="v">${esc(refShort())}</span></div></div>
    <div class="pgrp"><div class="lab">Déposé</div><div class="pr">${IC.clock.replace("<svg", '<svg style="color:var(--t3)"')}<span class="v">${NX.fmtDate(a.depot)}</span></div></div>
    <div class="note">La référence reste vierge : les corrections apparentes sont portées sur la rédaction de l'amendement, comme sur la vôtre.</div>`;
}
function propsDraft(m){
  const ths = themesOfAl(m.al), n = concurrents(m.al).units.length;
  return `<h4>Propriétés<span class="act"><button class="ib" data-cmd="pin" data-id="${m.id}" data-k="2" title="Épingler pour comparer (2)">${IC.pin}</button><button class="ib" data-cmd="edit" data-k="E" title="Modifier (E)">${IC.edit}</button></span></h4>
    <div class="pr">${sIcon("draft")}<span class="v">En rédaction</span></div>
    <div class="pr">${avMe()}<span class="v">Vous · ${esc(GR[ME].name)}</span></div>
    <div class="pr click" data-cmd="modemenu">${IC.edit.replace("<svg", '<svg style="color:var(--t3)"')}<span class="v">${cap(modeWord(m))} l'alinéa</span></div>
    <div class="pr">${IC.eye.replace("<svg", '<svg style="color:var(--t3)"')}<span class="v">${esc(cap(m.vis || "privé"))}</span></div>
    <div class="pgrp"><div class="lab">Alinéa visé</div><div class="chips"><button class="chip" data-cmd="almenu">al. ${m.al} ▾</button><button class="chip" data-hist="${m.al}">historique</button></div></div>
    <div class="pgrp"><div class="lab">Thèmes de l'alinéa</div><div class="chips">${ths.length ? ths.map(t => `<button class="chip" data-th="${t.id}"><span class="lb" style="background:${thColor(t)}"></span>${esc(t.label)}</button>`).join("") : `<span class="t4">Aucun</span>`}</div></div>
    <div class="pgrp"><div class="lab">Concurrents</div><div class="pr click" data-cmd="mlist">${IC.list.replace("<svg", '<svg style="color:var(--t3)"')}<span class="v">${n} sur l'alinéa ${m.al}</span></div></div>
    <div class="pgrp"><div class="lab">Référence</div><div class="pr click" data-cmd="refmenu">${IC.ref.replace("<svg", '<svg style="color:var(--t3)"')}<span class="v">${esc(refShort())}</span></div></div>
    <div class="note">Double-clic sur le texte ou ${kbd("E")} pour modifier. Les passages soulignés en tirets sont disputés : un clic ouvre les propositions regroupées.</div>`;
}
const inlineProps = (html, sum) => `<details class="props-inline props"><summary>${sum}</summary>${html.replace(/<h4>[\s\S]*?<\/h4>/, "").replace(/<div class="note">[\s\S]*?<\/div>/, "")}</details>`;

/* ---------- le corps d'une rédaction face à la référence (symétrie : brouillon et amendement passent par ici) ---------- */
function blockDraft(m){
  if (S.editing && S.cur === m.id) return `<div class="ed"><textarea id="ta" spellcheck="false">${esc(m.texte)}</textarea>
    <div class="live"><span class="lab">Pendant la frappe : ajouts soulignés, suppressions marquées d'un trait</span><span id="live">${liveHTML(refAl(m.al), m.texte)}</span></div>
    <div class="btns"><button class="btn primary" data-cmd="valider">Valider ${kbd("Ctrl Entrée")}</button><button class="btn" data-cmd="annuler">Annuler ${kbd("Échap")}</button></div></div>`;
  const html = m.mode === "rediger" ? NX.unitsOnDiff(NX.draftDiff(m), m.al, m.texte) : NX.draftDiff(m);
  return `<div class="al-block" data-o="${m.al}"><span class="k">Alinéa ${m.al}</span><div class="legal" data-editable="1">${html}</div></div>`;
}
function blocksAm(a){
  const out = [];
  for (const o of amAls(a)){
    const d = NX.amDiff(a, o); if (!d) continue; const t = NX.amText(a, o);
    out.push(`<div class="al-block" data-o="${o}"><span class="k">Alinéa ${o}</span><div class="legal">${typeof t === "string" ? NX.unitsOnDiff(d, o, t) : d}</div></div>`);
  }
  for (const [at, l] of verOfAmendment(a).ins) l.forEach(t => out.push(`<div class="al-block"><span class="k">après ${at || "le début"}</span><div class="legal"><ins>${esc(t)}</ins></div></div>`));
  verOfAmendment(a).end.forEach(t => out.push(`<div class="al-block"><span class="k">fin</span><div class="legal"><ins>${esc(t)}</ins></div></div>`));
  if (!out.length) out.push(`<div class="legal dim">${esc(a.dispositif || "—")}</div>`);
  return out.join("");
}
function unitsSection(o){
  const U = unitsOf(o);
  if (!U.length) return "";
  return `<div class="sec-h">Passages disputés <span class="n">${U.length}</span><span class="act"><span class="t4" style="font-size:12px">alinéa ${o}</span></span></div>
    <div class="subs">${U.map(u => `<div class="row" data-unit="${u.k}" data-o="${o}">${bars(u.n)}<span class="ti">« ${esc(u.label)} »</span><span class="mul">${u.n} ${plural(u.n, "proposition")}</span>${IC.chev.replace("<svg", '<svg style="color:var(--t4)"')}</div>`).join("")}</div>`;
}

/* ---------- vue issue : un brouillon ---------- */
function issueDraft(m){
  const n = concurrents(m.al).units.length;
  const journal = (m.journal || []).slice(-6).reverse().map(j => `<div class="ev">${avMe()}<span><b>Vous</b> avez modifié la rédaction · ${esc(rel(j.d))}</span></div>`).join("");
  return `<div class="issue mienne">
    <div class="kicker">${sIcon("draft")}<span>Brouillon ${draftIdx(m)}</span><span>·</span><span>face à : ${esc(refShort())}</span></div>
    <h1>${esc(draftLead(m).replace(/ :$/, ""))}</h1>
    <div class="subof">Article 4 ${IC.chev.replace("<svg", '<svg style="width:12px;height:12px"')} <b data-hist="${m.al}" style="cursor:pointer">alinéa ${m.al}</b><span>·</span><span>${n} ${plural(n, "concurrent")}</span></div>
    ${inlineProps(propsDraft(m), `${sIcon("draft")}<span>En rédaction</span>${avMe()}<span>Vous</span><span class="chip">al. ${m.al}</span><span class="t4">Propriétés</span>`)}
    <div class="desc">${blockDraft(m)}${S.editing ? "" : `<div class="editbar${isMob() ? " show" : ""}">${m.mode !== "supprimer" ? `<button class="btn ghost" data-cmd="edit" data-k="E">${IC.edit} Modifier</button>` : ""}<button class="btn ghost" data-cmd="pin" data-id="${m.id}" data-k="2">${IC.pin} Épingler pour comparer</button></div>`}</div>
    ${unitsSection(m.al)}
    <div class="activity"><h3>Activité</h3>${journal}<div class="ev">${avMe()}<span><b>Vous</b> avez créé le brouillon sur l'alinéa ${m.al}</span></div>
      <div class="cmt sys"><div class="h">${IC.ref.replace("<svg", '<svg style="width:14px;height:14px"')}<b>Référence</b> · ${esc(refLabel())}</div><div class="tx" style="font-size:14px;line-height:1.65;color:var(--t3)">${esc(refAl(m.al))}</div></div></div>
  </div>`;
}
/* ---------- vue issue : l'amendement d'un autre groupe (même grammaire) ---------- */
function issueAm(a){
  const k = NX.sortKey(a), w = who(a), ep = NX.epOf(a), dec = decisionOf(a);
  const vers = (a.versions || []).map(v => `<div class="ev">${sIcon(v.sort ? NX.sortKey({...a, sort:v.sort}) : "attente")}<span>État : <b>${esc(v.etat)}</b>${v.sort ? " · " + esc(v.sort) : ""}${v.champs && v.champs.length ? ` <span class="t4">(${esc(v.champs.slice(0, 4).join(", "))}${v.champs.length > 4 ? "…" : ""})</span>` : ""} · ${esc(rel(v.date))}</span></div>`).join("");
  const paroles = ep ? ep.paroles.filter(p => p.nom === a.auteur || p.role === "rapporteure").slice(0, 3) : [];
  return `<div class="issue">
    <div class="kicker">${sIcon(k)}<span class="mono">${a.num}</span><span>·</span>${av(a)}<span>${esc(w.name)}</span><span>·</span><span>face à : ${esc(refShort())}</span></div>
    <h1>${esc(amTitle(a))}</h1>
    <div class="subof">${esc(modeLead(a, a.cible.al).replace(/ :$/, ""))}${ep ? `<span>·</span><a data-place="${ep.place}" style="cursor:pointer"><b>place ${ep.place}</b></a>` : ""}</div>
    ${inlineProps(propsAm(a), `${sIcon(k)}<span>${esc(cap(sortWord(a)))}</span>${av(a)}<span>${esc(w.name)}</span><span class="t4">Propriétés</span>`)}
    <div class="desc">${blocksAm(a)}<div class="editbar${isMob() ? " show" : ""}"><button class="btn ghost" data-cmd="pin" data-id="${a.id}" data-k="2">${IC.pin} Épingler pour comparer</button>${S.pins.length && !S.pins.includes(a.id) ? `<button class="btn ghost" data-cmd="cmpwith" data-id="${a.id}">${IC.cols} Comparer avec ${esc(pinLabel(S.pins[0]))}</button>` : ""}</div></div>
    ${a.cible.al ? unitsSection(a.cible.al) : ""}
    <div class="activity"><h3>Activité</h3>
      <div class="ev">${av(a)}<span><b>${esc(a.auteur || w.name)}</b> a déposé l'amendement · ${esc(NX.fmtDate(a.depot))}</span></div>
      <div class="cmt"><div class="h">${av(a)}<b>${esc(a.auteur || w.name)}</b><span>exposé sommaire</span></div><div class="tx">${esc(a.expose || "—")}</div></div>
      ${a.cartouche ? `<div class="cmt sys"><div class="tx">${esc(a.cartouche)}</div></div>` : ""}
      ${vers}
      ${paroles.map(p => `<div class="cmt"><div class="h">${avP(p)}<b>${esc(NX.speaker(p))}</b><span>en réunion · ${p.mots} mots</span></div><div class="tx">${esc(short(p.txt, 420))}</div></div>`).join("")}
      ${dec ? `<div class="ev">${IC.hammer.replace("<svg", '<svg style="width:14px;height:14px;color:var(--t3)"')}<span>${esc(dec.txt)}</span></div>` : ""}
    </div></div>`;
}
/* ---------- un passage disputé : les propositions regroupées ---------- */
function unitView(o, k){
  const u = unitsOf(o).find(x => x.k === k); if (!u) return `<div class="empty">Passage introuvable.</div>`;
  const C = clusters(u), ref = TRANSMIS[o - 1];
  const ctx = `…${esc(ref.slice(Math.max(0, u.a - 110), u.a))}<mark>${esc(ref.slice(u.a, u.b))}</mark>${esc(ref.slice(u.b, u.b + 110))}…`;
  const cards = C.list.map(c => {
    const isRef = c.items.some(i => i.id === "ref");
    const body = isRef ? esc(C.ref) : c.text == null ? `<del>${esc(C.ref)}</del>` : inlineDiff(C.ref, c.text);
    const shown = isRef && c.items.length > 6 ? c.items.slice(0, 5) : c.items, rest = c.items.length - shown.length;
    const who_ = shown.map(it => it.id === "ref" ? `<span class="chip">${IC.ref.replace("<svg", '<svg style="width:12px;height:12px"')}Texte transmis</span>` : it.mine ? `<button class="chip" data-draft="${it.id}">${avMe()}${esc(it.label)}</button>` : `<button class="chip" data-am="${it.a.id}">${av(it.a)}${it.a.num} · ${esc(it.label)}</button>`).join("") + (rest > 0 ? `<span class="chip t3" title="${esc(c.items.slice(5).map(i => i.a ? i.a.num : i.label).join(", "))}">+ ${rest} autres</span>` : "");
    const n = c.items.filter(i => i.id !== "ref").length;
    return `<div class="cl${isRef ? " ref" : ""}"><div class="cl-h">${who_}<span class="cnt">${isRef ? "référence, vierge" + (n ? ` · ${n} la gardent` : "") : n + " " + plural(n, "porteur")}</span></div><div class="cl-t">${body}</div></div>`;
  }).join("");
  return `<div class="issue"><div class="kicker">${bars(u.n)}<span>Passage disputé · alinéa ${o}</span></div>
    <h1>« ${esc(u.label)} »</h1>
    <div class="subof">${u.n} ${plural(u.n, "proposition")} · ${C.list.length} ${plural(C.list.length, "rédaction distincte", "rédactions distinctes")} (référence comprise)<button class="btn ghost" data-cmd="unit-close" style="margin-left:auto">${IC.back} Retour ${kbd("Échap")}</button></div>
    <div class="ctxline">${ctx}</div>${cards}</div>`;
}

/* ---------- ATELIER ---------- */
function atelierList(){
  const f = S.filter.trim().toLowerCase();
  const match = a => !f || [a.num, who(a).name, a.groupe, sortWord(a), objetOf(a), a.auteur].join(" ").toLowerCase().includes(f);
  const gh = (k, label, n, act) => `<div class="gh${S.closed[k] ? " closed" : ""}" data-gh="${k}">${IC.car.replace("<svg", '<svg class="car"')}${label} <span class="n">${n}</span>${act ? `<span class="act">${act}</span>` : ""}</div>`;
  let h = gh("mine", "Mes brouillons", MINE.length, `<button class="ib" data-cmd="new" data-k="C" title="Nouveau brouillon (C)">${IC.plus}</button>`);
  if (!S.closed.mine) h += MINE.map(m => `<div class="row${S.cur === m.id ? " on" : ""}" data-id="${m.id}" data-draft="${m.id}">${sIcon("draft")}<span class="id">B${draftIdx(m)}</span><span class="ti">${cap(modeWord(m))} <span class="sub">· alinéa ${m.al}</span></span>${S.pins.includes(m.id) ? IC.pin.replace("<svg", '<svg style="width:13px;height:13px;color:var(--accent)"') : ""}${avMe()}</div>`).join("");
  const C = concurrents(S.o), units = [...C.units, ...C.ecartes].filter(u => match(u.lead));
  const by = {}; units.forEach(u => (by[NX.sortKey(u.lead)] = by[NX.sortKey(u.lead)] || []).push(u));
  h += `<div class="gh" style="cursor:default;background:none;color:var(--t3);font-size:12px;height:30px;border:0">Concurrents · alinéa ${S.o}${f ? ` · filtre « ${esc(S.filter)} »` : ""}</div>`;
  for (const k of SORT_ORDER){
    const L = by[k]; if (!L) continue;
    h += gh("s-" + k, `${sIcon(k)} ${SORT_LABEL[k]}`, L.length);
    if (S.closed["s-" + k]) continue;
    h += L.map(u => { const a = u.lead; return `<div class="row${S.cur === a.id ? " on" : ""}" data-id="${a.id}" data-am="${a.id}" title="${esc(amTitle(a))}">${sIcon(k)}<span class="id">${a.num}</span><span class="ti">${esc(amTitle(a))}</span>${u.members.length > 1 ? `<span class="mul" title="${u.kind === "ident" ? "identiques" : "série"}">×${u.members.length}</span>` : ""}${S.pins.includes(a.id) ? IC.pin.replace("<svg", '<svg style="width:13px;height:13px;color:var(--accent)"') : ""}${av(a)}<span class="dt">${rel(amDate(a))}</span></div>`; }).join("");
  }
  if (!units.length) h += `<div class="empty">Aucun concurrent ne correspond.</div>`;
  return h;
}
function pinLabel(id){ const m = MINE.find(x => x.id === id); return m ? `Brouillon ${draftIdx(m)}` : id; }
V.atelier = () => {
  const m = curDraft(), a = curAm();
  const vb = vt(S.aview === "issue", 'data-aview="issue"', IC.doc, m ? `Brouillon ${draftIdx(m)}` : a ? a.num : "Rédaction")
    + vt(S.aview === "article", 'data-aview="article"', IC.ref, "Article · votre version")
    + vt(S.aview === "cmp", 'data-aview="cmp"', IC.cols, "Comparer", `${S.pins.length}/2`)
    + vt(S.aview === "code", 'data-aview="code"', IC.book, "Code (CGI)")
    + `<span class="vb-sp"></span>`
    + S.pins.map(id => `<span class="pin">${IC.pin.replace("<svg", '<svg style="width:12px;height:12px;color:var(--accent)"')}${esc(pinLabel(id))}<button data-unpin="${id}" title="Retirer">${IC.x}</button></span>`).join("")
    + `<button class="btn" data-cmd="almenu" title="Changer d'alinéa">Alinéa ${S.o} ▾</button>`
    + `<label class="filter">${IC.search}<input id="flt" placeholder="Filtrer les concurrents" value="${esc(S.filter)}"></label>`;
  const cr = [{t:"Article 4", attr:'data-esp="dossier" data-dv="etapes"'}, {t:`Alinéa ${S.o}`, attr:`data-hist="${S.o}"`}];
  let detail, props = "", back = true;
  if (S.aview === "article"){ cr.push({t:"Votre version"}); return {crumbs:cr, viewbar:vb, html:`<div class="full">${articleView()}</div>`, after:afterAtelier}; }
  if (S.aview === "code"){ cr.push({t:"Code général des impôts"}); return {crumbs:cr, viewbar:vb, html:`<div class="full">${codeView()}</div>`, after:afterAtelier}; }
  if (S.aview === "cmp"){ cr.push({t:"Comparer"}); return {crumbs:cr, viewbar:vb, html:`<div class="full">${cmpView()}</div>`, after:afterAtelier}; }
  if (S.unit != null){ detail = unitView(S.unit.o, S.unit.k); cr.push({t:m ? `Brouillon ${draftIdx(m)}` : a ? a.num : "", attr:'data-cmd="unit-close"'}, {t:"Passage disputé"}); props = m ? propsDraft(m) : a ? propsAm(a) : ""; }
  else if (m){ detail = issueDraft(m); props = propsDraft(m); cr.push({t:`Brouillon ${draftIdx(m)}`}); }
  else if (a){ detail = issueAm(a); props = propsAm(a); cr.push({t:a.num}); }
  return {crumbs:cr, viewbar:vb, back, locRight:`<button class="btn hide-m" data-cmd="peek" data-k="Espace" title="Aperçu de la ligne sélectionnée">${IC.eye} Aperçu</button>`,
    html:`<div class="split ${isMob() ? (S.mpane === "list" ? "m-list" : "m-detail") : ""}"><div class="pane list" id="list">${atelierList()}</div><div class="pane detail">${detail}</div><div class="pane props">${props}</div></div>`, after:afterAtelier};
};
function afterAtelier(){
  const ta = $("#ta");
  if (ta){ const fit = () => { ta.style.height = "auto"; ta.style.height = Math.min(ta.scrollHeight + 4, innerHeight * .55) + "px"; }; fit(); ta.addEventListener("input", fit); ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); const m = curDraft(); ta.addEventListener("input", () => { $("#live").innerHTML = liveHTML(refAl(m.al), ta.value); }); }
  const fl = $("#flt"); if (fl) fl.addEventListener("input", () => { S.filter = fl.value; const L = $("#list"); if (L) L.innerHTML = atelierList(); save(); });
  const on_ = $("#list .row.on"); if (on_ && on_.scrollIntoViewIfNeeded) on_.scrollIntoViewIfNeeded(false);
}
function articleView(){
  const L = verLines(myVer()), out = []; let run = [];
  const flush = () => { if (run.length > 2 && !S.unfold) out.push(`<div class="row" data-cmd="unfold" style="color:var(--t3);height:34px">${IC.list.replace("<svg", '<svg style="color:var(--t4)"')}<span class="ti" style="color:var(--t3);font-weight:400">${run.length} alinéas inchangés (${run[0].o}–${run[run.length - 1].o}) · déplier</span></div>`); else run.forEach(l => out.push(`<div class="al-block left"><span class="k">${l.o}</span><div class="legal dim">${esc(l.text)}</div></div>`)); run = []; };
  for (const l of L){
    if (l.kind === "same"){ run.push(l); continue; }
    flush();
    out.push(`<div class="al-block left"><span class="k">${l.o ?? "+"}</span><div class="legal">${l.kind === "del" ? `<del>${esc(refAl(l.o))}</del>` : l.kind === "mod" ? inlineDiff(refAl(l.o), l.text) : `<ins>${esc(l.text)}</ins>`}</div></div>`);
  }
  flush();
  return `<div class="issue"><div class="kicker">${avMe()}<span>Vos ${MINE.length} brouillons appliqués · face à : ${esc(refShort())}</span>${S.unfold ? `<button class="btn ghost" data-cmd="fold" style="margin-left:auto">Replier les zones inchangées</button>` : ""}</div><h1>Article 4 · votre version</h1><div class="subof">${esc(NX.article.intitule)}</div>${out.join("")}</div>`;
}
function codeView(){
  const C = NX.code;
  return `<div class="issue"><div class="kicker">${IC.book.replace("<svg", '<svg style="width:14px;height:14px"')}<span>en vigueur → après commission</span></div><h1>${esc(C.article)}</h1><div class="subof">Les instructions de l'article, appliquées mécaniquement : ce que le code deviendrait.</div>
    ${C.lettres.map(l => { const avn = (C.avant[l] || []).join("\n"), ap = (C.apresCommission[l] || []).join("\n"), same = sameText(avn, ap);
      return `<div class="al-block left"><span class="k">${esc(l)})${same ? "" : ` <span style="color:var(--orange)">●</span>`}</span><div class="legal${same ? " dim" : ""}" style="white-space:pre-line">${same ? esc(short(ap, 320)) : inlineDiff(avn, ap)}</div></div>`; }).join("")}</div>`;
}
function sideOf(id){
  const m = MINE.find(z => z.id === id);
  if (m) return {mine:true, label:`Brouillon ${draftIdx(m)}`, sub:"Vous", av:avMe(), als:[m.al], cell:o => o === m.al ? NX.draftDiff(m) : null};
  const a = AM[id]; return {label:a.num, sub:who(a).name, av:av(a), als:amAls(a), cell:o => NX.amDiff(a, o)};
}
function cmpView(){
  if (S.pins.length < 2){
    return `<div class="empty" style="padding:60px 20px"><div style="color:var(--t1);font-weight:500;font-size:15px;margin-bottom:6px">Comparer deux rédactions</div>Épinglez deux rédactions (${kbd("2")} sur une ligne, ou ${IC.pin.replace("<svg", '<svg style="width:13px;height:13px;vertical-align:-2px"')} dans les propriétés).<br>Elles s'ouvrent ici en trois colonnes : l'une | la référence au centre | l'autre.<br><br>${S.pins.length ? `Épinglée : <b>${esc(pinLabel(S.pins[0]))}</b>` : ""}</div>`;
  }
  const A = sideOf(S.pins[0]), B = sideOf(S.pins[1]);
  const als = [...new Set([...A.als, ...B.als])].sort((x, y) => x - y);
  const col = (cls, head, f) => `<div class="col ${cls}" style="--rows:${als.length + 1}"><div class="ch">${head}</div>${als.map(o => { const c = f(o); return `<div class="cell${c == null ? " none" : ""}"><span class="k">Alinéa ${o}</span>${c == null ? "ne touche pas cet alinéa" : c}</div>`; }).join("")}</div>`;
  return `<div class="cmp" style="grid-template-rows:repeat(${als.length + 1},auto)">
    ${col(A.mine ? "mienne" : "", `${A.av}<span>${esc(A.label)}</span><small>${esc(A.sub)}</small>`, A.cell)}
    ${col("ref", `${IC.ref}<span>Référence</span><small>${esc(refShort())} · vierge</small>`, o => esc(refAl(o)))}
    ${col(B.mine ? "mienne" : "", `${B.av}<span>${esc(B.label)}</span><small>${esc(B.sub)}</small>`, B.cell)}</div>`;
}

/* ---------- INBOX : la réunion comme fil d'activité ---------- */
V.inbox = () => {
  const L = inboxItems().filter(x => S.iview !== "nonlus" || !S.read[x.a.id]);
  if (!S.inbox || !AM[S.inbox]) S.inbox = L[0] ? L[0].a.id : null;
  const a = AM[S.inbox];
  const list = L.map(x => { const k = NX.sortKey(x.a), rd = S.read[x.a.id];
    return `<div class="row two${S.inbox === x.a.id ? " on" : ""}${rd ? " read" : ""}" data-id="${x.a.id}" data-inbox="${x.a.id}">${rd ? "" : `<span class="unread"></span>`}<span class="av-badge">${av(x.a, 1)}<span class="bd">${sIcon(k)}</span></span><span class="body"><span class="ti">${x.a.num} · ${esc(short(amTitle(x.a), 60))}</span><span class="sl" style="display:block">${esc(short(x.d ? x.d.txt : `Examiné à la place ${x.e.place}`, 70))}</span></span><span class="rt">${sIcon(k)}<span class="dt" style="color:var(--t4);font-size:12px">${rel(amDate(x.a))}</span></span></div>`; }).join("");
  const vb = vt(S.iview === "tout", 'data-iview="tout"', "", "Tout", inboxItems().length) + vt(S.iview === "nonlus", 'data-iview="nonlus"', "", "Non lus", unreadN()) + `<span class="vb-sp"></span><button class="btn" data-cmd="readall">Tout marquer lu</button>`;
  return {crumbs:[{t:"Inbox"}, ...(a ? [{t:a.num}] : [])], viewbar:vb, back:true, locRight:a ? `<button class="btn hide-m" data-cmd="read" data-id="${a.id}" data-k="1">${S.read[a.id] ? "Marquer non lu" : "Marquer lu"}</button>` : "",
    html:`<div class="split ${isMob() ? (S.mpane === "list" ? "m-list" : "m-detail") : ""}"><div class="pane list" id="list">${list || `<div class="empty">Rien à lire.</div>`}</div><div class="pane detail">${a ? issueAm(a) : `<div class="empty">Inbox vide.</div>`}</div><div class="pane props">${a ? propsAm(a) : ""}</div></div>`};
};

/* ---------- DOSSIER : le projet (projet de loi), ses jalons (étapes), ses articles ---------- */
V.dossier = () => {
  const vb = vt(S.dview === "apercu", 'data-dv="apercu"', IC.folder, "Vue d'ensemble") + vt(S.dview === "etapes", 'data-dv="etapes"', IC.grid, "Article 4 · étapes", null, "")
    + vt(S.dview === "hist", 'data-dv="hist"', IC.clock, `Alinéa ${S.o} · d'étape en étape`) + vt(S.dview === "readme", 'data-dv="readme"', IC.book, "À propos");
  const cr = [{t:"Projet de loi logement", attr:'data-dv="apercu"'}];
  let html;
  if (S.dview === "etapes"){ cr.push({t:"Article 4"}, {t:"Étapes"}); html = etapesView(); }
  else if (S.dview === "hist"){ cr.push({t:"Article 4", attr:'data-dv="etapes"'}, {t:`Alinéa ${S.o}`}); html = histView(S.o); }
  else if (S.dview === "readme"){ cr.push({t:"À propos"}); html = readme(); }
  else if (S.dview === "art"){ cr.push({t:`Article ${S.art}`}); html = artView(S.art); }
  else html = projView();
  return {crumbs:cr, viewbar:vb, html:`<div class="full">${html}</div>`};
};
function projView(){
  const Dd = NX.dossier;
  const miles = ETAPES.map((id, i) => `<div class="mile done" data-etape-hist="${id}"><span class="dm"></span><b>${esc(ETL[id])}</b><span class="sub2">${i === 3 ? "résultat de la commission" : i === 2 ? "référence par défaut" : ""}</span></div>`).join("") + `<div class="mile"><span class="dm"></span><b>Séance publique</b><span class="sub2">16–20 nov.</span></div>`;
  const rows = NX.plan.map(p => `<div class="row${p.num === "4" ? " on" : ""}" data-id="art${p.num}" data-art="${esc(p.num)}">${p.num === "4" ? sIcon("draft") : /Supprim/.test(p.statut || "") ? sIcon("rejete") : sIcon("attente")}<span class="id">Art. ${esc(p.num)}</span><span class="ti">${esc(short(p.intitule || "(sans intitulé)", 120))}</span>${p.statut ? `<span class="chip hide-m" style="max-width:180px;overflow:hidden;text-overflow:ellipsis">${esc(short(p.statut, 30))}</span>` : ""}<span class="mul">${p.n}</span></div>`).join("");
  return `<div class="proj"><div class="kicker" style="display:flex;gap:8px;color:var(--t3);font-size:12px;align-items:center">${IC.folder.replace("<svg", '<svg style="width:14px;height:14px"')}Projet · ${esc(Dd.uid || "")}</div>
    <h1>${esc(Dd.titre)}</h1>
    <div class="meta"><span class="chip">${esc(Dd.lecture || "")}</span><span class="chip">${IC.clock.replace("<svg", '<svg style="width:12px;height:12px"')}${esc(Dd.seance || "")}</span></div>
    <div style="color:var(--t3);font-size:13px">${esc(Dd.commission || "")}</div>
    <div class="sec-h">Jalons · la navette de l'article 4</div><div class="miles">${miles}</div>
    <div class="sec-h">Articles <span class="n">${NX.plan.length}</span><span class="act"><span class="t4" style="font-size:12px">nombre = amendements en commission</span></span></div>
    <div class="subs">${rows}</div></div>`;
}
function artView(num){
  const p = NX.plan.find(x => x.num === num); if (!p) return "";
  return `<div class="issue"><div class="kicker">Article ${esc(num)} · ${esc(p.statut || "")}</div><h1>${esc(p.intitule || "(sans intitulé)")}</h1>${p.cible ? `<div class="subof">Vise : ${esc(short(p.cible, 200))}</div>` : ""}
    <div class="sec-h">Amendements en commission <span class="n">${p.n}</span></div>
    <div class="subs">${Object.entries(p.amendements).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<div class="row" style="cursor:default"><span class="ti" style="font-weight:400">${esc(k)}</span><span class="mul">${v}</span></div>`).join("")}</div>
    <p class="t3" style="margin-top:20px">Seul l'article 4 est chargé en détail. ${num !== "4" ? `<a data-dv="etapes" style="color:var(--accent-h);cursor:pointer">Ouvrir l'article 4</a>` : ""}</p></div>`;
}
function etapesView(){
  const G = NX.grid(), cell = c => c === "mod" ? `<span class="cellst" title="modifié par rapport à l'étape précédente">${sIcon("draft").replace(/var\(--yellow\)/g, "var(--orange)")}modifié</span>` : c === "same" ? `<span class="cellst t4">·</span>` : c === "origine" ? `<span class="cellst">${sIcon("attente")}</span>` : `<span class="cellst t4"></span>`;
  return `<div class="wrap-pad"><div style="color:var(--t3);font-size:12px;padding:10px 0 6px">Une ligne par alinéa suivi d'étape en étape. Cliquer une ligne : l'alinéa d'étape en étape.</div>
    <div style="overflow-x:auto"><table class="mx"><thead><tr><th>Al.</th>${ETAPES.map(id => `<th>${esc(ETL[id])}</th>`).join("")}<th>Texte transmis</th><th style="text-align:right">Amdts</th></tr></thead><tbody>
    ${G.map(r => `<tr class="hov${r.o === S.o ? " on" : ""}" ${r.o ? `data-hist="${r.o}"` : ""}><td class="t3">${r.o ?? "+"}</td>${r.cells.map(c => `<td>${cell(c)}</td>`).join("")}<td style="max-width:420px;overflow:hidden;text-overflow:ellipsis;color:var(--t2)">${r.o ? esc(NX.alShort(r.o, 80)) : `<i class="t4">introduit en cours de navette</i>`}</td><td style="text-align:right">${r.n ? `<span class="mul" style="font-size:11px;color:var(--t2);border:1px solid var(--da-encre);border-radius:0;padding:2px 5px">${r.n}</span>` : ""}</td></tr>`).join("")}</tbody></table></div></div>`;
}
function histView(o){
  const H = NX.hist(o), n = concurrents(o).units.length;
  return `<div class="issue"><div class="kicker">${IC.clock.replace("<svg", '<svg style="width:14px;height:14px"')}Alinéa ${o} · chaque étape face à la précédente</div><h1>Alinéa ${o}, d'étape en étape</h1>
    <div class="subof"><button class="btn primary" data-amender="${o}">${IC.edit} Amender cet alinéa</button><button class="btn" data-al="${o}">${n} ${plural(n, "concurrent")}</button>
      ${o > 1 ? `<button class="btn ghost" data-histstep="-1">‹ al. ${o - 1}</button>` : ""}${o < NAL ? `<button class="btn ghost" data-histstep="1">al. ${o + 1} ›</button>` : ""}</div>
    <div class="hist">${H.map((h, i) => `<div class="st ${i === 0 ? "org" : h.same ? "" : h.absent ? "" : "mod"}"><span class="dm"></span><div class="b"><div class="lab">${esc(ET[h.id].label)}<span>${i === 0 ? "première rédaction" : h.same ? "inchangé" : h.absent ? "absent" : "modifié"}</span></div><div class="legal${h.same ? " dim" : ""}" style="margin-top:4px">${h.diff == null ? `<span class="t4">— absent à cette étape</span>` : h.diff}</div></div></div>`).join("")}</div></div>`;
}

/* ---------- ENJEUX : vues (tableau groupé par thème, matrice, fiche) ---------- */
V.enjeux = () => {
  const th = THEMES.find(t => t.id === S.th) || THEMES[0];
  const vb = vt(S.eview === "board", 'data-ev="board"', IC.board, "Tableau par thème") + vt(S.eview === "matrice", 'data-ev="matrice"', IC.grid, "Thèmes × groupes") + vt(S.eview === "theme", 'data-ev="theme"', IC.label, esc(th.label))
    + `<span class="vb-sp"></span><span class="t4 hide-m" style="font-size:12px;white-space:nowrap">thèmes déclarés (rapport) ou calculés (mots-clés)</span>`;
  const cr = [{t:"Enjeux", attr:'data-ev="board"'}];
  if (S.eview === "matrice"){ cr.push({t:"Thèmes × groupes"}); return {crumbs:cr, viewbar:vb, html:`<div class="full">${matrixView()}</div>`}; }
  if (S.eview === "theme"){ cr.push({t:th.label}); return {crumbs:cr, viewbar:vb, html:`<div class="split noprops" style="--listw:280px"><div class="pane list">${THEMES.map(t => `<div class="row${t.id === th.id ? " on" : ""}" data-id="${t.id}" data-th="${t.id}"><span class="dotc" style="background:${thColor(t)};border-radius:50%"></span><span class="ti">${esc(t.label)}</span><span class="t4" style="font-size:11px">${t.src}</span><span class="mul">${t.amendements.length}</span></div>`).join("")}</div><div class="pane detail">${themeView(th)}</div></div>`}; }
  cr.push({t:"Tableau"});
  const cols = THEMES.map(t => { const ams = NX.themeAms(t);
    return `<div class="bcol"><div class="bcol-h" data-th="${t.id}"><span class="dotc" style="background:${thColor(t)};border-radius:50%"></span>${esc(t.label)} <span class="n">${ams.length}</span><span class="src">${t.src}</span></div>
      ${ams.map(a => `<div class="card" data-am="${a.id}" data-id="${a.id}"><div class="top">${sIcon(NX.sortKey(a))}<span class="mono">${a.num}</span>${av(a)}</div><div class="ti">${esc(amTitle(a))}</div><div class="ft">${amAls(a).slice(0, 3).map(o => `<span class="chip">al. ${o}</span>`).join("")}<span class="chip">${esc(sortWord(a))}</span></div></div>`).join("")}</div>`; }).join("");
  return {crumbs:cr, viewbar:vb, html:`<div class="full"><div class="board">${cols}</div></div>`};
};
function themeView(th){
  const ams = NX.themeAms(th), als = themeAls(th), eps = NX.themeParoles(th), mine = MINE.filter(m => als.includes(m.al));
  return `<div class="issue"><div class="kicker"><span class="dotc" style="background:${thColor(th)};border-radius:50%"></span>Thème ${th.src === "déclaré" ? "déclaré par le rapport" : "calculé par mots-clés (dit comme tel)"} · ${ams.length} amendements</div>
    <h1>${esc(th.label)}</h1>
    <div class="subof">Alinéas : ${als.map(o => `<button class="chip" data-al="${o}">al. ${o}</button>`).join("") || "—"}</div>
    <div class="sec-h">Ce que dit le rapport</div><div class="cmt sys"><div class="tx">${esc(th.doc || "—")}</div></div>
    <div class="sec-h">Ce qui a été dit en réunion <span class="n">${eps.length} ${plural(eps.length, "place")}</span></div>
    ${eps.length ? eps.slice(0, 5).map(e => `<div class="cmt"><div class="h"><a data-place="${e.place}" style="cursor:pointer;color:var(--t1);font-weight:500">Place ${e.place}</a><span>${esc(short(e.titre, 80))}</span></div>${e.paroles.slice(0, 2).map(p => `<div class="tx" style="margin-top:6px"><span style="display:inline-flex;gap:6px;align-items:center;color:var(--t1);font-weight:500">${avP(p)}${esc(NX.speaker(p))}</span> « ${esc(short(p.txt, 220))} »</div>`).join("")}</div>`).join("") : `<div class="t3">Rien en réunion.</div>`}
    <div class="sec-h">Ce que fait votre texte</div>
    ${mine.length ? mine.map(m => `<div class="cmt"><div class="h">${avMe()}<a data-draft="${m.id}" style="cursor:pointer;color:var(--t1);font-weight:500">Brouillon ${draftIdx(m)}</a><span>alinéa ${m.al} · ${modeWord(m)}</span></div><div class="tx legal" style="font-size:14px">${NX.draftDiff(m)}</div></div>`).join("") : `<div class="t3">Aucun de vos brouillons ne touche les alinéas de ce thème.</div>`}
    <div class="sec-h">Amendements <span class="n">${ams.length}</span></div>
    <div class="subs">${ams.map(a => `<div class="row" data-id="${a.id}" data-am="${a.id}">${sIcon(NX.sortKey(a))}<span class="id">${a.num}</span><span class="ti">${esc(amTitle(a))}</span>${av(a)}<span class="dt">${rel(amDate(a))}</span></div>`).join("")}</div></div>`;
}
function matrixView(){
  const M = NX.matrix(), max = Math.max(1, ...M.rows.flatMap(r => r.cells.map(c => c.length)));
  return `<div class="wrap-pad"><div style="color:var(--t3);font-size:12px;padding:10px 0 6px">Nombre d'amendements par thème et par groupe : une seule chose comptée. Une case ouvre le thème.</div>
    <div style="overflow-x:auto"><table class="mx"><thead><tr><th>Thème</th>${M.gs.map(g => `<th title="${esc(GR[g].name)}"><span style="display:inline-flex;gap:5px;align-items:center"><span class="av" style="--g:${GR[g].color}">${g.slice(0, 2)}</span></span></th>`).join("")}<th>Inst.</th></tr></thead><tbody>
    ${M.rows.map(r => `<tr><td><a data-th="${r.th.id}" style="cursor:pointer;color:var(--t1);display:inline-flex;gap:7px;align-items:center"><span class="dotc" style="background:${thColor(r.th)};border-radius:50%"></span>${esc(r.th.label)}</a></td>${r.cells.map(c => `<td class="num" data-th="${r.th.id}">${c.length ? `<span style="--v:${Math.round(c.length / max * 55)}">${c.length}</span>` : `<span class="t4" style="--v:0">·</span>`}</td>`).join("")}<td class="num" data-th="${r.th.id}"><span style="--v:0">${r.inst.length || ""}</span></td></tr>`).join("")}</tbody></table></div>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:14px">${M.gs.map(g => `<span class="chip"><span class="av" style="--g:${GR[g].color}">${g.slice(0, 2)}</span>${esc(GR[g].name)}</span>`).join("")}</div></div>`;
}

/* ---------- RÉUNION : un cycle de 26 places ---------- */
const adoptedIn = e => e.ams.some(id => AM[id] && AM[id].sort === "Adopté");
V.reunion = () => {
  const tot = NX.episodes.reduce((s, x) => s + x.mots, 0), nAd = NX.episodes.filter(adoptedIn).length;
  const vb = vt(S.rview === "places", 'data-rv="places"', IC.list, "Places", NX.episodes.length) + vt(S.rview === "ensemble", 'data-rv="ensemble"', IC.board, "Vue d'ensemble · mots prononcés")
    + `<span class="vb-sp"></span><span class="t4 hide-m" style="font-size:12px;white-space:nowrap">${tot.toLocaleString("fr-FR")} mots · ${nAd} places avec un amendement adopté</span>`;
  const cr = [{t:"Réunion du 21 septembre 2026", attr:'data-rv="places"'}];
  if (S.rview === "ensemble"){
    cr.push({t:"Vue d'ensemble"}); const mx = Math.max(...NX.episodes.map(e => e.mots));
    return {crumbs:cr, viewbar:vb, html:`<div class="full"><div class="bigstrip"><div style="color:var(--t3);font-size:12px;margin-bottom:10px">Les 26 places dans l'ordre d'appel, à l'échelle des mots prononcés. En indigo : une place où un amendement a été adopté.</div>
      ${NX.episodes.map(e => `<div class="bs-row${adoptedIn(e) ? " ad" : ""}" data-place="${e.place}"><span class="t3 mono">P${String(e.place).padStart(2, "0")}</span><span class="barw"><span class="bar" style="width:${Math.max(1, e.mots / mx * 62)}%"></span><span class="lbl">${esc(short(e.titre.replace(/^Amendements? /, ""), 90))}</span></span><span class="t3" style="text-align:right;font-size:12px">${e.mots} mots</span></div>`).join("")}</div></div>`};
  }
  const e = NX.episodes.find(x => x.place === S.place) || NX.episodes[0];
  cr.push({t:`Place ${e.place}`});
  const strip = `<div class="cyc"><div class="l1">${IC.cycle}Réunion · 26 places</div><div class="l2">largeur = mots prononcés · indigo = amendement adopté</div><div class="strip">${NX.episodes.map(x => `<i class="${adoptedIn(x) ? "ad" : ""}${x.place === e.place ? " on" : ""}" style="flex:${x.mots}" data-place="${x.place}" title="Place ${x.place} · ${x.mots} mots"></i>`).join("")}</div></div>`;
  const list = strip + NX.episodes.map(x => `<div class="row${x.place === e.place ? " on" : ""}" data-id="P${x.place}" data-place="${x.place}">${adoptedIn(x) ? sIcon("adopte") : sIcon("place")}<span class="id">P${String(x.place).padStart(2, "0")}</span><span class="ti">${esc(short(x.titre, 90))}</span><span class="dt" style="width:auto">${x.mots}</span></div>`).join("");
  const ams = e.ams.map(id => AM[id]).filter(Boolean);
  const vote = ams.map((a, i) => `<div class="row" data-id="${a.id}" data-am="${a.id}"><span class="t4" style="width:14px;font-size:12px">${i + 1}</span>${sIcon(NX.sortKey(a))}<span class="id">${a.num}</span><span class="ti">${esc(amTitle(a))}</span><span class="t3 hide-m" style="font-size:12px" title="avis">${avisSym(a.avis)}</span>${av(a)}<span class="dt" style="width:auto">${esc(sortWord(a))}</span></div>`).join("");
  const detail = `<div class="issue"><div class="kicker">${adoptedIn(e) ? sIcon("adopte") : sIcon("place")}<span class="mono">P${String(e.place).padStart(2, "0")}</span><span>·</span><span>${e.mots} mots · ${e.paroles.length} prises de parole</span></div>
    <h1>${esc(e.titre)}</h1>
    <div class="subof">${e.place > 1 ? `<button class="btn ghost" data-pstep="-1">‹ Place ${e.place - 1}</button>` : ""}${e.place < NX.episodes.length ? `<button class="btn ghost" data-pstep="1">Place ${e.place + 1} ›</button>` : ""}</div>
    <div class="sec-h">Liste de vote <span class="n">${ams.length}</span><span class="act"><span class="t4" style="font-size:12px">n° · objet · avis · groupe · sort</span></span></div>
    <div class="subs">${vote}</div>
    <div class="activity"><h3>Prises de parole et décisions</h3>
      ${e.paroles.map(p => `<div class="cmt"><div class="h">${avP(p)}<b>${esc(NX.speaker(p))}</b><span>${p.mots} mots</span></div><div class="tx">${esc(p.txt)}</div></div>`).join("")}
      ${e.decisions.map(d => `<div class="ev">${IC.hammer.replace("<svg", '<svg style="width:14px;height:14px;color:var(--t3)"')}<span><b>${esc(d.txt)}</b>${d.ams && d.ams.length ? " " + d.ams.map(id => `<a data-am="${id}">${id}</a>`).join(", ") : ""}</span></div>`).join("")}</div></div>`;
  const props = `<h4>Propriétés</h4><div class="pr">${IC.cycle.replace("<svg", '<svg style="color:var(--t3)"')}<span class="v">Place ${e.place} sur ${NX.episodes.length}</span></div>
    <div class="pr">${IC.speech.replace("<svg", '<svg style="color:var(--t3)"')}<span class="v">${e.mots} mots · ${e.paroles.length} interventions</span></div>
    <div class="pr">${sIcon("adopte")}<span class="v">${ams.filter(a => a.sort === "Adopté").length} adopté(s) sur ${ams.length}</span></div>
    <div class="pgrp"><div class="lab">Groupes</div><div class="chips">${[...new Set(ams.map(a => who(a).name))].map(n => { const a = ams.find(z => who(z).name === n); return `<span class="chip">${av(a)}${esc(n)}</span>`; }).join("")}</div></div>
    <div class="pgrp"><div class="lab">Thèmes</div><div class="chips">${THEMES.filter(t => ams.some(a => t.amendements.includes(a.id))).map(t => `<button class="chip" data-th="${t.id}"><span class="lb" style="background:${thColor(t)}"></span>${esc(t.label)}</button>`).join("") || `<span class="t4">Aucun</span>`}</div></div>
    <div class="note">Un clic sur un amendement de la liste de vote l'ouvre dans l'atelier, face à la référence.</div>`;
  return {crumbs:cr, viewbar:vb, back:true, html:`<div class="split ${isMob() ? (S.mpane === "list" ? "m-list" : "m-detail") : ""}" style="--listw:330px"><div class="pane list" id="list">${list}</div><div class="pane detail">${detail}</div><div class="pane props">${props}</div></div>`};
};

/* ---------- À propos ---------- */
function readme(){
  return `<div class="readme"><h1>À propos de cette maquette</h1><p class="t3">Maquette inspirée de Linear (refonte 2024 et 2026). Article 4 du projet de loi logement : données réelles (143 amendements, 26 places de la réunion de commission), groupes politiques fictifs.</p>
  <h2>Ce qui est emprunté (forme et mécanismes)</h2><ul>
  <li><b>Squelette en « L inversé »</b>, et les quatre couches emboîtées de 2026 : 01 l'application (fond, barre latérale de 232 px atténuée), 02 la barre de lieu (fil d'Ariane, boutons ronds lien / copie), 03 la barre de vues (vues en pilules, filtre), 04 le contenu, panneau incrusté plus clair à coins arrondis (12 px).</li>
  <li><b>Vue issue en trois volets</b> : liste (~340 px) | détail (titre, description, sous-issues, activité) | propriétés (~272 px, icône + texte). Ici : un brouillon ou l'amendement d'un autre groupe, avec la même grammaire (symétrie).</li>
  <li><b>Ligne de liste</b> : icône de statut ronde (dérivée du sort : coche pleine = adopté, croix = rejeté, flèche = tombé, retour = retiré, pointillés = non soutenu, barré = irrecevable, cercle vide = sans sort ; demi-plein jaune = mon brouillon en rédaction), identifiant en tertiaire (<span class="mono">CE732</span>), titre, groupe en avatar, date relative grisée. Listes groupées (par sort) à en-têtes repliables.</li>
  <li><b>Inbox</b> : la réunion comme fil d'activité (avatar + badge de sort, titre, sous-ligne de décision, date) ; <b>Dossier</b> = un projet et ses jalons (les étapes de la navette) ; <b>Enjeux</b> = des vues (tableau groupé par thème, matrice) ; <b>Réunion</b> = un cycle de 26 places.</li>
  <li><b>Passages disputés</b> rendus comme des sous-issues (barres de « priorité » = nombre de propositions : 1, 3 ou 6 et plus) qui ouvrent les propositions regroupées.</li>
  <li><b>⌘K</b> (Ctrl K) : menu de commandes ; <b>?</b> : aide des raccourcis consultable ; <b>G puis I / A / D / E / R</b> : aller à ; <b>J / K</b> : parcourir ; <b>Entrée</b> : ouvrir ; <b>Espace</b> : aperçu (Peek ; maintenu = aperçu tant que la touche est enfoncée) ; <b>1</b> : marquer lu, <b>2</b> : épingler pour comparer (triage au clavier, sans action politique) ; <b>C</b> : nouveau brouillon ; <b>E</b> : modifier ; <b>Échap</b> : revenir d'un cran.</li>
  <li><b>Entraîneur de raccourcis</b> : quand on clique un bouton à la souris, une bulle montre le raccourci équivalent.</li>
  <li>Couleurs relevées (site et application, clair | sombre), accent #7170ff, indigo #5e6ad2, statuts vert / jaune / orange / rouge / bleu ; mélanges <span class="mono">color-mix(in lch, …)</span>. Typographie : Inter (Google Fonts, avec « cv01 » et « ss03 »), graisses 400/500/600, échelle 12 / 13 / 15 / 17 / 22 ; la police mono propriétaire (Berkeley Mono) est remplacée par <b>JetBrains Mono</b>, et Inter Display par Inter 600 resserré. Rayons 6 / 8 / 12 / pilule ; ombres claires douces, sombres plus fortes ; puce <kbd>K</kbd> fond primaire et anneau.</li>
  <li>Principes de 2026 : moins d'icônes et plus petites, moins de séparateurs, bordures adoucies, texte atténué pour l'inactif (« Structure should be felt not seen », « Don't compete for attention you haven't earned »).</li></ul>
  <p class="src">Sources : linear.app/now/behind-the-latest-design-refresh ; linear.app/now/how-we-redesigned-the-linear-ui ; linear.app/method/introduction ; linear.app/docs/triage ; captures publiques de l'application (fenêtre claire et sombre, barre latérale avant/après, schéma des quatre couches, aide des raccourcis, triage, ⌘K) sur webassets.linear.app. La page linear.app/docs/peek renvoie « Not found » : le comportement d'Espace suit la description du brief.</p>
  <h2>Écarts assumés</h2><ul>
  <li>La direction artistique « papier sombre » du projet est suspendue : la forme suit Linear. Les règles de comparaison sont gardées : la référence reste vierge, les corrections apparentes (ajout : souligné, gras, encre indigo sur fond léger ; suppression : barré rouge, texte visible) sont portées sur la rédaction comparée, la mienne comme celle d'un autre groupe.</li>
  <li>Pas de priorité, d'estimation ni d'assignation : ces notions n'ont pas d'équivalent. Aucune action « accepter / refuser » sur l'amendement d'autrui ; le triage se limite à lire et à épingler.</li>
  <li>Aucun score : les seuls nombres comptent une chose (amendements, mots, propositions, alinéas).</li>
  <li>Thème clair et thème sombre (comme l'inspiration), bouton en bas de la barre latérale.</li>
  <li>La forme suit désormais la direction artistique « Le bordereau » (<span class="mono">direction-artistique/DA.md</span>) : papier clair, encre, listes en bordereau à cadre complet, sorts dits par une mention en capitales et un filet de marge.</li></ul></div>`;
}

/* ---------- aperçu (Peek) ---------- */
function peekHTML(id){
  const m = MINE.find(x => x.id === id), a = AM[id];
  if (m) return `<div class="ph">${sIcon("draft")}<b>Brouillon ${draftIdx(m)}</b><span>· alinéa ${m.al} · face à : ${esc(refShort())}</span><span style="margin-left:auto">${kbd("Espace")} ${kbd("Échap")}</span></div><div class="pb"><h2>${esc(draftLead(m))}</h2><div class="legal">${NX.draftDiff(m)}</div></div>`;
  if (a) return `<div class="ph">${sIcon(NX.sortKey(a))}<b class="mono">${a.num}</b>${av(a)}<span>${esc(who(a).name)} · ${esc(sortWord(a))}${a.avis ? " · avis " + esc(a.avis) : ""}</span><span style="margin-left:auto">${kbd("Espace")} ${kbd("Échap")}</span></div><div class="pb"><h2>${esc(amTitle(a))}</h2><div class="lead">${esc(modeLead(a, a.cible.al).replace(/ :$/, ""))} · face à : ${esc(refShort())}</div><div class="peek">${blocksAm(a)}</div><div style="margin-top:14px;display:flex;gap:6px"><button class="btn" data-am="${a.id}">Ouvrir ${kbd("Entrée")}</button><button class="btn" data-cmd="pin" data-id="${a.id}">${IC.pin} Épingler ${kbd("2")}</button></div></div>`;
  return "";
}
function openPeek(id){ if (!id) return; S.peek = id; const P = $("#peek"); P.innerHTML = peekHTML(id); P.classList.add("on"); $("#scrim").classList.add("on"); }
function closePeek(){ S.peek = null; $("#peek").classList.remove("on"); if (!$("#cmdk").style.display || $("#cmdk").style.display === "none") $("#scrim").classList.remove("on"); }

/* ---------- menus (popover) ---------- */
let POP = null;
function popMenu(anchor, title, items){
  const P = $("#pop"); POP = items;
  P.innerHTML = (title ? `<div class="ph">${esc(title)}</div>` : "") + items.map((x, i) => `<div class="pi${x.on ? " on" : ""}" data-pi="${i}"><span class="ck">${x.on ? "✓" : ""}</span><span>${x.t}</span>${x.d ? `<span class="d">${esc(x.d)}</span>` : ""}</div>`).join("");
  P.classList.add("on"); const r = anchor.getBoundingClientRect();
  const w = P.offsetWidth, h = P.offsetHeight;
  P.style.left = Math.max(8, Math.min(r.left, innerWidth - w - 8)) + "px";
  P.style.top = (r.bottom + h + 8 < innerHeight ? r.bottom + 4 : Math.max(8, r.top - h - 4)) + "px";
  const on_ = P.querySelector(".on"); if (on_) on_.scrollIntoView({block:"nearest"});
}
function closePop(){ POP = null; $("#pop").classList.remove("on"); }
function hunkPop(el){
  const H = HUNKS.get(+el.dataset.h); if (!H) return;
  const refT = H.seg.filter(s => s.type === "del").map(s => esc(s.text)).join("");
  const verT = H.seg.map(s => `<${s.type}>${esc(s.text)}</${s.type}>`).join("");
  const P = $("#pop"); POP = [];
  P.innerHTML = `<div class="ph">Loupe : la référence (vierge) | la rédaction</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:6px 8px 8px;font-size:13.5px;line-height:1.6"><div style="color:var(--t2)"><span class="t4">${esc(H.before)} </span><span style="background:var(--da-papier-ref);border-radius:0">${refT || "<span class='t4'>∅</span>"}</span><span class="t4"> ${esc(H.after)}</span></div><div class="peek" style="color:var(--t1)"><span class="t4">${esc(H.before)} </span>${verT}<span class="t4"> ${esc(H.after)}</span></div></div>`;
  P.style.maxWidth = "min(560px, calc(100vw - 16px))"; P.classList.add("on");
  const r = el.getBoundingClientRect(), w = P.offsetWidth;
  P.style.left = Math.max(8, Math.min(r.left - 40, innerWidth - w - 8)) + "px"; P.style.top = Math.min(r.bottom + 6, innerHeight - P.offsetHeight - 8) + "px";
}

/* ---------- ⌘K : menu de commandes ---------- */
const go = (esp, extra) => { S.esp = esp; S.unit = null; S.editing = false; S.sideOpen = false; if (extra) Object.assign(S, extra); render(); };
window.allerA = esp => go(esp, {mpane:"detail"});
const CMDS = () => [
  {g:"Navigation", t:"Aller à l'Inbox", k:"G I", ic:IC.inbox, run:() => go("inbox")},
  {g:"Navigation", t:"Aller à Mes brouillons (atelier)", k:"G A", ic:IC.mine, run:() => go("atelier")},
  {g:"Navigation", t:"Aller au Dossier", k:"G D", ic:IC.folder, run:() => go("dossier")},
  {g:"Navigation", t:"Aller aux Enjeux", k:"G E", ic:IC.views, run:() => go("enjeux")},
  {g:"Navigation", t:"Aller à la Réunion", k:"G R", ic:IC.cycle, run:() => go("reunion")},
  {g:"Actions", t:"Nouveau brouillon sur l'alinéa " + S.o, k:"C", ic:IC.edit, run:() => cmd("new")},
  {g:"Actions", t:"Modifier le brouillon courant", k:"E", ic:IC.edit, run:() => cmd("edit")},
  {g:"Actions", t:"Ouvrir l'article (votre version)", ic:IC.ref, run:() => cmd("open-article")},
  {g:"Actions", t:"Comparer les rédactions épinglées", ic:IC.cols, run:() => cmd("open-cmp")},
  {g:"Actions", t:"Ouvrir le code général des impôts, art. 31", ic:IC.book, run:() => cmd("open-code")},
  {g:"Actions", t:"Changer de thème (clair / sombre)", ic:IC.sun, run:() => cmd("theme")},
  {g:"Actions", t:"Raccourcis clavier", k:"?", ic:IC.q, run:() => cmd("help")},
  {g:"Actions", t:"À propos de cette maquette", ic:IC.book, run:() => cmd("readme")},
  ...ETAPES.map(id => ({g:"Référence", t:"Référence : " + ET[id].label, d:id === REF ? "actuelle" : "", ic:IC.ref, run:() => setRef(id)})),
  ...MINE.map(m => ({g:"Brouillons", t:`Brouillon ${draftIdx(m)}`, d:`alinéa ${m.al} · ${modeWord(m)}`, ic:sIcon("draft"), run:() => openDraft(m.id)})),
  ...Array.from({length:NAL}, (_, i) => ({g:"Alinéas", t:`Alinéa ${i + 1}`, d:NX.alShort(i + 1, 70), ic:IC.ref, run:() => openAl(i + 1)})),
  ...ALL.filter(a => a.mode !== "hors-texte").map(a => ({g:"Amendements", t:a.num, d:`${who(a).name} · ${sortWord(a)} · ${objetOf(a)}`, ic:sIcon(NX.sortKey(a)), run:() => openAm(a.id)})),
  ...THEMES.map(t => ({g:"Thèmes", t:t.label, d:t.src, ic:`<span class="dotc" style="background:${thColor(t)};border-radius:50%"></span>`, run:() => openTheme(t.id)})),
  ...NX.episodes.map(e => ({g:"Places", t:`Place ${e.place}`, d:e.titre, ic:IC.cycle, run:() => openPlace(e.place)})),
];
let CK = null;
function cmdk(){ CK = {items:CMDS(), i:0}; $("#cmdk").style.display = "block"; $("#scrim").classList.add("on"); const ctx = S.esp === "atelier" ? (curDraft() ? `Brouillon ${draftIdx(curDraft())}` : S.cur) : S.esp === "reunion" ? `Place ${S.place}` : cap(S.esp); $("#cmdk-ctx").textContent = ctx; const inp = $("#cmdk-in"); inp.value = ""; inp.focus(); ckRender(); }
function ckRender(){
  const q = $("#cmdk-in").value.trim().toLowerCase();
  let L = CK.items.filter(x => !q || (x.t + " " + (x.d || "") + " " + x.g).toLowerCase().includes(q));
  if (!q) L = L.filter(x => x.g === "Navigation" || x.g === "Actions" || x.g === "Brouillons");
  L = L.slice(0, 80); CK.list = L; CK.i = Math.min(CK.i, Math.max(0, L.length - 1));
  let g = null, h = "";
  L.forEach((x, i) => { if (x.g !== g){ g = x.g; h += `<div class="grp">${esc(g)}</div>`; } h += `<div class="it${i === CK.i ? " on" : ""}" data-ck="${i}">${x.ic || ""}<span>${esc(x.t)}</span><span class="d">${esc(x.d || "")}</span>${x.k ? `<span class="k">${kbd(x.k)}</span>` : ""}</div>`; });
  $("#cmdk-list").innerHTML = h || `<div class="grp">Aucun résultat</div>`;
  const o = $("#cmdk-list .on"); if (o) o.scrollIntoView({block:"nearest"});
}
function ckClose(){ CK = null; $("#cmdk").style.display = "none"; if (!S.peek) $("#scrim").classList.remove("on"); }
function ckRun(i){ const x = CK && CK.list[i]; ckClose(); if (x) x.run(); }

/* ---------- aide des raccourcis ---------- */
const HELP = [
  ["Général", [["Ouvrir le menu de commandes", "Ctrl K"], ["Aide des raccourcis", "?"], ["Revenir d'un cran", "Échap"], ["Barre latérale (mobile : tiroir)", "["]]],
  ["Navigation", [["Aller à l'Inbox", "G I"], ["Aller à Mes brouillons", "G A"], ["Aller au Dossier", "G D"], ["Aller aux Enjeux", "G E"], ["Aller à la Réunion", "G R"], ["Ligne suivante / précédente", "J|K"], ["Ouvrir la ligne", "Entrée|O"]]],
  ["Lire et comparer", [["Aperçu (maintenir = tant que la touche est enfoncée)", "Espace"], ["Marquer lu / non lu", "1"], ["Épingler pour comparer (deux au plus)", "2"], ["Passage disputé suivant", "P"]]],
  ["Rédiger", [["Nouveau brouillon sur l'alinéa courant", "C"], ["Modifier le brouillon", "E"], ["Valider la rédaction", "Ctrl Entrée"], ["Annuler", "Échap"]]],
];
function help(){
  const H = $("#help"); H.classList.add("on");
  const draw = q => HELP.map(([g, L]) => { const M = L.filter(x => !q || x[0].toLowerCase().includes(q)); return M.length ? `<h3>${g}</h3>` + M.map(([t, k]) => `<div class="hk"><span>${esc(t)}</span>${k.split("|").map(kbd).join(`<span class="or">ou</span>`)}</div>`).join("") : ""; }).join("");
  H.innerHTML = `<div class="hh"><h2>Raccourcis clavier</h2><button class="ib" data-cmd="help-close" title="Fermer (Échap)">${IC.x}</button></div><label class="srch">${IC.search}<input id="help-in" placeholder="Chercher un raccourci"></label><div class="hb" id="help-b">${draw("")}</div>`;
  const inp = $("#help-in"); inp.addEventListener("input", () => { $("#help-b").innerHTML = draw(inp.value.toLowerCase()); });
}
const helpClose = () => $("#help").classList.remove("on");

/* ---------- entraîneur de raccourcis : une bulle quand on clique à la souris ---------- */
let tipT = null;
function tip(k, label){
  if (!k || k === "—") return;
  const T = $("#tip"); T.innerHTML = `<span>${esc(label || "Astuce")} : la prochaine fois, au clavier</span><span class="k">${k.split(" ").map(x => `<kbd>${esc(x)}</kbd>`).join(k.startsWith("G ") ? `<span class="t4" style="font-size:11px">puis</span>` : "")}</span>`;
  T.classList.add("on"); clearTimeout(tipT); tipT = setTimeout(() => T.classList.remove("on"), 2200);
}
let toastT = null;
function toast(msg){ const T = $("#toast"); T.innerHTML = msg; T.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => T.classList.remove("on"), 3200); }

/* ---------- actions ---------- */
function setRef(id){ REF = id; store.set("ref", id); UNIT_CACHE.clear(); toast(`Référence : <b>${esc(ET[id].label)}</b>. Elle reste vierge ; les corrections sont portées sur les rédactions comparées.`); render(); }
function openDraft(id){ S.cur = id; S.focus = id; const m = curDraft(); if (m) S.o = m.al; go("atelier", {aview:"issue", mpane:"detail"}); }
function openAm(id){ const a = AM[id]; if (!a) return; S.cur = id; S.focus = id; if (a.cible.al) S.o = a.cible.al; else { const als = amAls(a); if (als[0]) S.o = als[0]; } go("atelier", {aview:"issue", mpane:"detail"}); }
function openAl(o){ S.o = o; const m = MINE.find(x => x.al === o); if (m) return openDraft(m.id); const C = concurrents(o); S.cur = C.units[0] ? C.units[0].lead.id : S.cur; go("atelier", {aview:"issue", mpane:"list"}); }
function openTheme(id){ S.th = id; go("enjeux", {eview:"theme", mpane:"detail"}); }
function openPlace(n){ S.place = n; go("reunion", {rview:"places", mpane:"detail"}); }
function openHist(o){ S.o = o; go("dossier", {dview:"hist"}); }
function pin(id){
  if (!id) return; const i = S.pins.indexOf(id);
  if (i >= 0){ S.pins.splice(i, 1); toast(`${esc(pinLabel(id))} retiré du comparateur.`); }
  else { S.pins.push(id); if (S.pins.length > 2) S.pins.shift(); toast(S.pins.length === 2 ? `Deux rédactions épinglées. <a data-cmd="open-cmp" style="color:var(--accent-h);cursor:pointer">Comparer</a>` : `${esc(pinLabel(id))} épinglé. Épinglez-en une deuxième pour comparer.`); }
  render(); if (S.peek) openPeek(S.peek);
}
function focusedId(){ const f = $("#content .row.focus") || $("#content .row.on") || null; return f ? f.dataset.id : null; }
function cmd(c, el){
  switch (c){
    case "cmdk": return cmdk();
    case "help": return help();
    case "help-close": return helpClose();
    case "theme": S.theme = S.theme === "dark" ? "light" : "dark"; return render();
    case "side": S.sideOpen = !S.sideOpen; return render();
    case "readme": return go("dossier", {dview:"readme"});
    case "mback": S.mpane = "list"; S.unit = null; return render();
    case "mlist": if (isMob()){ S.mpane = "list"; return render(); } return;
    case "new": { const m = newDraft(S.o); toast(`Brouillon ${draftIdx(m)} créé sur l'alinéa ${S.o}, à partir de la référence.`); S.editing = false; openDraft(m.id); S.editing = true; return render(); }
    case "edit": { const m = curDraft(); if (!m || m.mode === "supprimer") return; S.esp = "atelier"; S.aview = "issue"; S.unit = null; S.editing = true; S.mpane = "detail"; return render(); }
    case "valider": { const m = curDraft(); m.texte = $("#ta").value; (m.journal = m.journal || []).push({d:new Date().toISOString()}); saveDrafts(); UNIT_CACHE.clear(); S.editing = false; toast(`Brouillon ${draftIdx(m)} enregistré.`); return render(); }
    case "annuler": S.editing = false; return render();
    case "unit-close": S.unit = null; return render();
    case "open-article": return go("atelier", {aview:"article"});
    case "open-code": return go("atelier", {aview:"code"});
    case "open-cmp": return go("atelier", {aview:"cmp"});
    case "fold": S.unfold = false; return render();
    case "unfold": S.unfold = true; return render();
    case "pin": return pin(el && el.dataset.id || focusedId() || S.cur);
    case "cmpwith": S.pins = [S.pins[0], el.dataset.id]; return go("atelier", {aview:"cmp"});
    case "peek": return openPeek(el && el.dataset.id || focusedId() || S.cur);
    case "read": { const id = el.dataset.id; S.read[id] = !S.read[id]; return render(); }
    case "readall": inboxItems().forEach(x => S.read[x.a.id] = true); return render();
    case "copyid": case "copylink": { const t = c === "copyid" ? (S.esp === "atelier" ? (curDraft() ? `Brouillon ${draftIdx(curDraft())}` : S.cur) : S.esp === "reunion" ? `Place ${S.place}` : "Article 4") : location.href; try { navigator.clipboard.writeText(t); } catch(_){} return toast(`Copié : <span class="mono">${esc(short(t, 60))}</span>`); }
    case "refmenu": return popMenu(el, "Référence (vierge)", ETAPES.map(id => ({t:esc(ET[id].label), d:ETL[id], on:id === REF, run:() => setRef(id)})));
    case "almenu": return popMenu(el, "Alinéa visé", NX.alsDisputes().map(x => ({t:`Alinéa ${x.o}`, d:`${x.n} amdt${x.n > 1 ? "s" : ""}`, on:x.o === S.o, run:() => { const m = curDraft(); if (m && el.closest(".props, .props-inline")){ m.al = x.o; if (m.mode === "rediger") m.texte = TRANSMIS[x.o - 1]; saveDrafts(); UNIT_CACHE.clear(); S.o = x.o; return render(); } openAl(x.o); }})));
    case "modemenu": { const m = curDraft(); return popMenu(el, "Mode", ["rediger", "supprimer", "inserer"].map(md => ({t:cap(md === "rediger" ? "rédiger" : md === "inserer" ? "insérer après" : md) + " l'alinéa", on:m.mode === md, run:() => { m.mode = md; if (md === "inserer" && sameText(m.texte, TRANSMIS[m.al - 1])) m.texte = "Nouvel alinéa."; saveDrafts(); UNIT_CACHE.clear(); render(); }}))); }
  }
}

/* ---------- gestes : clic ---------- */
document.addEventListener("click", e => {
  const pi = e.target.closest("[data-pi]");
  if (pi && POP){ const x = POP[+pi.dataset.pi]; closePop(); if (x) x.run(); return; }
  if (!e.target.closest("#pop")) closePop();
  const ck = e.target.closest("[data-ck]"); if (ck) return ckRun(+ck.dataset.ck);
  if (e.target.id === "scrim"){ ckClose(); closePeek(); return; }
  if (e.target.id === "scrim-side"){ S.sideOpen = false; return render(); }
  const hk = e.target.closest("ins[data-h],del[data-h]");
  if (hk && !e.target.closest("mark.pt")) return hunkPop(hk);
  const t = e.target.closest("[data-cmd],[data-esp],[data-draft],[data-am],[data-al],[data-hist],[data-th],[data-place],[data-unit],[data-gh],[data-sidesec],[data-aview],[data-dv],[data-ev],[data-rv],[data-iview],[data-inbox],[data-art],[data-amender],[data-unpin],[data-histstep],[data-pstep],[data-etape-hist],mark.pt");
  if (!t) return;
  if (e.detail > 0 && t.dataset.k) tip(t.dataset.k, (t.title || t.textContent || "").replace(/\(.*\)/, "").trim().slice(0, 40));
  const d = t.dataset;
  if (t.matches("mark.pt")){ const host = t.closest("[data-o]"); const o = host ? +host.dataset.o : S.o; S.o = o; clearTimeout(clickT); clickT = setTimeout(() => { S.unit = {o, k:+t.dataset.u}; S.editing = false; S.esp = "atelier"; S.aview = "issue"; S.mpane = "detail"; render(); $(".pane.detail") && ($(".pane.detail").scrollTop = 0); }, 260); return; }
  if (d.cmd) return cmd(d.cmd, t);
  if (d.unpin){ S.pins = S.pins.filter(x => x !== d.unpin); return render(); }
  if (d.sidesec){ S.sideClosed[d.sidesec] = !S.sideClosed[d.sidesec]; return render(); }
  if (d.gh){ S.closed[d.gh] = !S.closed[d.gh]; return render(); }
  if (d.aview){ S.aview = d.aview; S.unit = null; return render(); }
  if (d.iview){ S.iview = d.iview; return render(); }
  if (d.dv && !d.esp){ S.dview = d.dv; return go("dossier"); }
  if (d.ev){ S.eview = d.ev; return go("enjeux"); }
  if (d.rv){ S.rview = d.rv; return go("reunion"); }
  if (d.esp){ if (d.dv) S.dview = d.dv; return go(d.esp, {mpane:d.esp === "atelier" ? "detail" : S.mpane}); }
  if (d.inbox){ S.inbox = d.inbox; S.read[d.inbox] = true; S.focus = d.inbox; S.mpane = "detail"; return render(); }
  if (d.unit != null){ S.unit = {o:+(d.o || S.o), k:+d.unit}; S.editing = false; return render(); }
  if (d.draft) return openDraft(d.draft);
  if (d.am) return openAm(d.am);
  if (d.amender){ const o = +d.amender, m = MINE.find(x => x.al === o) || newDraft(o); return openDraft(m.id); }
  if (d.histstep){ S.o = clamp(S.o + +d.histstep, 1, NAL); return render(); }
  if (d.pstep){ S.place = clamp(S.place + +d.pstep, 1, NX.episodes.length); return render(); }
  if (d.hist) return openHist(+d.hist);
  if (d.etapeHist){ S.dview = "etapes"; return render(); }
  if (d.al) return openAl(+d.al);
  if (d.th) return openTheme(d.th);
  if (d.place) return openPlace(+d.place);
  if (d.art){ if (d.art === "4"){ S.dview = "etapes"; return render(); } S.art = d.art; S.dview = "art"; return render(); }
});
let clickT = null;
document.addEventListener("dblclick", e => {
  if (e.target.closest("[data-editable]") && curDraft() && curDraft().mode !== "supprimer"){ clearTimeout(clickT); closePop(); S.editing = true; render(); }
});

/* ---------- gestes : clavier ---------- */
let gPending = 0, spaceAt = 0, spaceHeld = false;
function moveFocus(dir){
  const rows = $$("#content .pane.list .row[data-id], #content .full .row[data-id], #content .card[data-id], #content .subs .row[data-id]");
  if (!rows.length) return;
  let i = rows.findIndex(r => r.dataset.id === S.focus); if (i < 0) i = rows.findIndex(r => r.classList.contains("on"));
  i = clamp(i + dir, 0, rows.length - 1); rows.forEach(r => r.classList.remove("focus"));
  const r = rows[i]; r.classList.add("focus"); S.focus = r.dataset.id; r.scrollIntoView({block:"nearest"});
}
function openFocused(){ const r = S.focus && $(`#content [data-id="${CSS.escape(S.focus)}"]`); if (r) r.click(); }
document.addEventListener("keydown", e => {
  const k = e.key, ctrl = e.ctrlKey || e.metaKey;
  if (CK){
    if (k === "Escape"){ e.preventDefault(); return ckClose(); }
    if (k === "ArrowDown"){ e.preventDefault(); CK.i = Math.min(CK.list.length - 1, CK.i + 1); return ckRender(); }
    if (k === "ArrowUp"){ e.preventDefault(); CK.i = Math.max(0, CK.i - 1); return ckRender(); }
    if (k === "Enter"){ e.preventDefault(); return ckRun(CK.i); }
    return;
  }
  if (ctrl && k.toLowerCase() === "k"){ e.preventDefault(); return cmdk(); }
  if (S.editing){ if (k === "Escape"){ e.preventDefault(); return cmd("annuler"); } if (k === "Enter" && ctrl){ e.preventDefault(); return cmd("valider"); } return; }
  if (e.target.matches("input,textarea")){ if (k === "Escape"){ e.target.blur(); if ($("#help").classList.contains("on")) helpClose(); } return; }
  if (k === "Escape"){
    e.preventDefault();
    if (POP) return closePop();
    if (S.peek) return closePeek();
    if ($("#help").classList.contains("on")) return helpClose();
    if (S.sideOpen){ S.sideOpen = false; return render(); }
    if (S.unit){ S.unit = null; return render(); }
    if (S.esp === "atelier" && S.aview !== "issue"){ S.aview = "issue"; return render(); }
    if (S.esp === "enjeux" && S.eview !== "board"){ S.eview = "board"; return render(); }
    if (S.esp === "dossier" && S.dview === "hist"){ S.dview = "etapes"; return render(); }
    if (S.esp === "dossier" && S.dview !== "apercu"){ S.dview = "apercu"; return render(); }
    if (S.esp === "reunion" && S.rview !== "places"){ S.rview = "places"; return render(); }
    if (isMob() && S.mpane === "detail" && S.esp !== "dossier" && S.esp !== "enjeux"){ S.mpane = "list"; return render(); }
    if (S.esp !== "atelier") return go("atelier");
    return;
  }
  if (ctrl || e.altKey) return;
  if (k === " "){ e.preventDefault(); if (e.repeat) return; if (S.peek){ closePeek(); return; } spaceAt = Date.now(); spaceHeld = true; openPeek(focusedId() || (S.esp === "atelier" ? S.cur : S.esp === "inbox" ? S.inbox : null)); return; }
  if (gPending && Date.now() - gPending < 1200){
    gPending = 0; const m = {i:"inbox", a:"atelier", d:"dossier", e:"enjeux", r:"reunion"}[k.toLowerCase()];
    if (m){ e.preventDefault(); return go(m); }
  }
  if (k === "g" || k === "G"){ gPending = Date.now(); return; }
  if (k === "?"){ e.preventDefault(); return $("#help").classList.contains("on") ? helpClose() : help(); }
  if (k === "j" || k === "ArrowDown"){ e.preventDefault(); return moveFocus(1); }
  if (k === "k" || k === "ArrowUp"){ e.preventDefault(); return moveFocus(-1); }
  if (k === "Enter" || k === "o"){ e.preventDefault(); return openFocused(); }
  if (k === "c"){ e.preventDefault(); return cmd("new"); }
  if (k === "e"){ e.preventDefault(); return cmd("edit"); }
  if (k === "["){ S.sideOpen = !S.sideOpen; return render(); }
  if (k === "1"){ const id = focusedId() || S.inbox; if (id && AM[id]){ S.read[id] = !S.read[id]; toast(`${id} marqué ${S.read[id] ? "lu" : "non lu"}.`); return render(); } return; }
  if (k === "2"){ const id = focusedId() || (S.esp === "atelier" ? S.cur : null); if (id && (AM[id] || MINE.find(m => m.id === id))) return pin(id); return; }
  if (k === "p" && S.esp === "atelier"){ const U = unitsOf(S.o); if (!U.length) return; const i = S.unit ? (U.findIndex(u => u.k === S.unit.k) + 1) % U.length : 0; S.unit = {o:S.o, k:U[i].k}; return render(); }
});
document.addEventListener("keyup", e => {
  if (e.key === " " && spaceHeld){ spaceHeld = false; if (Date.now() - spaceAt > 350) closePeek(); }
});
$("#cmdk-in").addEventListener("input", () => { CK.i = 0; ckRender(); });
addEventListener("resize", () => { clearTimeout(window.__rz); window.__rz = setTimeout(render, 120); });

render();
if (!store.get("vu", false)){ setTimeout(() => toast(`Maquette inspirée de Linear. ${kbd("Ctrl K")} ouvre le menu de commandes, ${kbd("?")} les raccourcis. <a data-cmd="readme" style="color:var(--accent-h);cursor:pointer">À propos</a>`), 400); store.set("vu", true); }
