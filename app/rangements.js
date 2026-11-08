/* Boussole — les cinq rangements. Chacun garde les trois gestes : haut/bas parcourt, gauche/droite change de volet,
   pincer change d'échelle ; seul ce qu'ils parcourent change. */
"use strict";

const T = s => `<p class="pile-title">${s}</p>`;
const scaleIdx = () => SCALES[S.r]().indexOf(curScale());
function curScale(){ const st = S.r === "ecrire" ? S.e : S.r === "derouleur" ? S.d : S.r === "histoire" ? S.h : S.r === "themes" ? S.t : {scale: "plan"}; const L = SCALES[S.r](); if (!L.includes(st.scale)) st.scale = L.includes("alinea") ? "alinea" : L.includes("place") ? "place" : L[0]; return st.scale; }
const zg = d => `<span class="zg">${d < 0 ? "⊖" : "⊕"}</span>`;
function topHandle(){
  const L = SCALES[S.r](), i = L.indexOf(curScale());
  if (L.length < 2) return null;
  const up = L[i + 1], down = L[i - 1];
  return up ? `<b>${esc(cap(SCALE_NAME[L[i]]))}</b> ${esc(SCALE_NAME[up])} ${zg(-1)}` : `<b>${esc(cap(SCALE_NAME[L[i]]))}</b> revenir à ${esc(SCALE_NAME[down])} ${zg(1)}`;
}

/* ================= R1 · ÉCRIRE ================= */
function unitSheet(u, m, k, n){
  const ref = TRANSMIS[u.o - 1], mine = m && m.mode !== "inserer" ? (m.mode === "supprimer" ? null : m.texte) : ref;
  const r = mapRange(ref, mine, u.a, u.b), refSeg = r.ref;
  const before = ref.slice(Math.max(0, u.a - 70), u.a).replace(/^\S*\s/, "… "), after = ref.slice(u.b, u.b + 70).replace(/\s\S*$/, " …");
  const meta = {label: "Vous", color: GR[ME].color, refLabel: refLabel(), where: `« ${u.label} », alinéa ${u.o}`};
  const refBox = `<span class="ctx">${esc(before)}</span>${esc(REF === "transmis" ? refSeg : mapRange(ref, refAl(u.o), u.a, u.b).ver || refSeg)}<span class="ctx">${esc(after)}</span>`;
  const myBox = r.ver == null ? `${inlineDiff(refSeg, "", meta)} <span class="none">(vous supprimez l'alinéa)</span>` : `<span class="ctx">${esc(before)}</span>${inlineDiff(refSeg, r.ver, meta)}<span class="ctx">${esc(after)}</span>`;
  return sheet({sid: "u:" + u.o + ":" + u.k, cls: "unitf", label: "Unité « " + u.label + " »",
    head: `<span class="tagu"><i class="w${unitWeight(u.n)}"></i><b>« ${esc(u.label)} »</b></span><span class="hr"><span>alinéa ${u.o} · unité ${k + 1} sur ${n}</span>${faceCtl()}</span>`,
    body: `<div class="duo2"><section class="lc paper"><div class="head"><span>${esc(refLabel())}</span><span>référence vierge</span></div><p>${refBox}</p></section><section class="lc paper"><div class="head">${badge(myWho())}<span>votre rédaction</span></div><p>${myBox}</p></section></div>`,
    foot: `<span>${u.n} ${plural(u.n, "rédaction touche", "rédactions touchent")} ce passage · <b>à droite</b> : les propositions</span><span class="count">${k + 1} / ${n}</span>`});
}
function clusterSheet(c, u, k, n, refSeg){
  const isRef = c.items.some(x => x.id === "ref"), ws = c.items.filter(x => x.id !== "ref");
  const meta = {label: ws.map(x => x.label).join(", ") || "Texte transmis", color: (ws[0] || c.items[0]).color, refLabel: refLabel(), where: `« ${u.label} », alinéa ${u.o}`};
  const txt = c.text == null ? `${inlineDiff(refSeg, "", meta)} <span class="none">(supprime ce passage)</span>` : isRef ? esc(c.text) : inlineDiff(refSeg, c.text, meta);
  const MAXP = 10, extra = c.items.length > MAXP ? c.items.length - MAXP : 0;
  const pills = c.items.slice(0, MAXP).map(x => x.id === "ref" ? `<span class="who-i" style="--g:${x.color}"><i></i>${esc(x.label)}</span>`
    : `<button type="button" class="who-i" data-goto="${x.mine ? "m:" : "a:"}${esc(x.id)}" style="--g:${x.color}" title="Voir cette rédaction"><i></i>${esc(x.label)}${x.a ? ` <small>${x.a.num}${on("D2") ? " · " + esc(sortWord(x.a)) : ""}</small>` : ""}</button>`).join("");
  return sheet({sid: "c:" + u.o + ":" + u.k + ":" + k, cls: "passage cluster", label: `Proposition ${k + 1}`,
    head: `<span>« ${esc(u.label)} » · proposition ${k + 1} sur ${n}</span><span>${isRef ? "rédaction du texte transmis" : "modifie le texte transmis"}</span>`,
    body: `<p class="ptxt">${txt}</p><div class="who">${pills}${extra ? `<span class="who-i more">et ${extra} ${plural(extra, "autre")}</span>` : ""}</div>`,
    foot: `<span>${ws.length} ${plural(ws.length, "rédaction", "rédactions")}${isRef ? " · identique au texte transmis" : ""}</span><span class="count">${k + 1} / ${n}</span>`});
}
function refAbove(o, legend){
  return `<section class="orig paper" aria-label="Référence vierge"><div class="head"><span>${esc(refLabel())} · référence vierge</span><span>${D.article.num}, alinéa ${o}</span></div><div class="body"><p>${esc(refAl(o)) || '<span class="none">(cet alinéa n\'existe pas dans la référence)</span>'}</p></div><p class="legend">${legend || "Les modifications sont portées sur la feuille : <ins>ajouté</ins> · <del>supprimé</del> · cliquer l'une d'elles pour la comparer."}</p></section>`;
}
let PILE_CACHE = null;
function buildEcrire(){
  const sc = curScale(), vol = S.e.volet, m = curDraft(), o = curAlE(), sp = {};
  const nUnits = unitsOf(o).length;
  if (vol === 0){
    if (sc === "unite"){
      const U = unitsOf(o);
      if (!U.length){ S.e.scale = "alinea"; return buildEcrire(); }
      S.e.unit = clamp(S.e.unit, 0, U.length - 1);
      sp.title = T(`${D.article.num}, alinéa ${o} · <b>votre rédaction</b>, passage par passage`);
      sp.pile = U.map((u, k) => unitSheet(u, m, k, U.length)); sp.focus = S.e.unit; sp.onMove = i => { S.e.unit = i; };
      sp.rail = U.map(u => u.label);
    } else if (sc === "alinea" || sc === "face"){
      sp.title = T(`${D.article.num} · <b>vos brouillons</b> · ${MINE.length} ${plural(MINE.length, "feuille")}${MINE.length ? "" : " · cliquer un alinéa dans le volet des articles pour en créer un"}`);
      sp.pile = MINE.map((x, i) => draftSheet(x, i, MINE.length)); sp.focus = S.e.mine;
      sp.onMove = i => { const changed = S.e.mine !== i; S.e.mine = i; if (changed){ S.e.al = null; S.e.unit = 0; refreshAbove(); renderSide(); } };
      sp.above = () => showRef() ? refAbove(curAlE(), (() => { const d = curDraft(); return d && d.mode === "rediger" && sameText(d.texte, refAl(d.al)) ? "Votre brouillon reprend la référence à l'identique : modifiez-le, les modifications s'inscrivent sur votre feuille." : null; })()) : "";
      sp.side = "units"; sp.rail = MINE.map(x => `Alinéa ${x.al}`);
    } else if (sc === "article"){
      sp.title = T(`${D.article.num} · <b>votre version</b> face à : ${esc(refShort())}`);
      sp.html = `<div class="burst-scroll">${columnsHTML([{label: "Votre version", color: GR[ME].color, ver: myVer()}], null)}</div>`;
    } else if (sc === "droit"){
      sp.title = T(`<b>Le code tel qu'il deviendrait</b> avec votre version de l'article`);
      sp.pile = [codeSheet("code:mine", myVer(), "Votre version", GR[ME].color)];
    }
  } else if (vol === 1){
    if (sc === "unite"){
      const U = unitsOf(o); if (!U.length){ S.e.scale = "alinea"; return buildEcrire(); }
      const u = U[clamp(S.e.unit, 0, U.length - 1)], C = clusters(u), total = C.list.reduce((s, c) => s + c.items.length, 0);
      sp.title = T(`« ${esc(u.label)} » · alinéa ${o} · <b>${C.list.length}</b> ${plural(C.list.length, "proposition", "propositions")} pour ${total} rédactions`);
      sp.pile = C.list.map((c, k) => clusterSheet(c, u, k, C.list.length, C.ref)); sp.focus = 0; sp.onMove = () => {};
      sp.rail = C.list.map((c, k) => "Proposition " + (k + 1));
    } else if (sc === "droit"){
      const P = concurrents(o, S.ord).units;
      sp.title = T(`<b>Le code tel qu'il deviendrait</b> avec chaque amendement sur l'alinéa ${o}`);
      sp.pile = P.map(u => { const w = who(u.lead); return codeSheet("code:a:" + u.lead.id, verOfAmendment(u.lead), `${w.name} · ${u.lead.num}`, w.color); });
      sp.focus = S.e.other; sp.onMove = i => { S.e.other = i; };
    } else {
      const C = concurrents(o, S.ord), art = sc === "article";
      const items = [];
      C.units.forEach(u => items.push({u}));
      if (C.redac.length) items.push({redac: C.redac});
      if (C.ecartes.length) items.push({div: C.ecartes.length});
      C.ecartes.forEach(u => items.push({u, ec: true}));
      const n = items.length;
      const ordSel = on("D3") ? ` · ordre : ${["texte", "depot", "appel"].map(x => `<button type="button" class="ordb${S.ord === x ? " on" : ""}" data-ord="${x}">${x === "depot" ? "dépôt" : x}</button>`).join(" ")}` : "";
      sp.title = T(`${D.article.num}, alinéa ${o} · <b>${C.units.length}</b> ${plural(C.units.length, "rédaction concurrente", "rédactions concurrentes")} (${C.total} amendements)${art ? " · à l'échelle de l'article" : ""}${ordSel}`);
      sp.pile = items.map((it, i) => it.u ? amendmentSheet(it.u, o, i, n, {article: art})
        : it.redac ? sheet({sid: "redac:" + o, cls: "divider", head: `<span>Rédactionnels et coordinations</span><span>${it.redac.length}</span>`, body: `<p>${it.redac.map(a => `<button type="button" class="lnk" data-goto="a:${a.id}">${a.num}</button> ${esc(objetOf(a))}`).join("<br>")}</p>`, foot: `<span>Rangés à part, comptés, non empilés (L4).</span>`})
        : sheet({sid: "div:" + o, cls: "divider", head: `<span>Les écartés</span><span>${it.div}</span>`, body: `<p>Irrecevables (article 40, article 45, doublons…) et amendements retirés avant l'examen : ils sortent de la pile avec leur motif. Leur texte, effacé par l'open data officiel, est récupéré dans l'historique quand il existe.</p>`, foot: `<span>Défiler pour les voir</span>`}));
      const focusSid = S.e.otherSid;
      let f = focusSid ? items.findIndex(it => it.u && it.u.members.some(x => "a:" + x.id === focusSid)) : -1;
      if (f >= 0 && items[f].u.lead.id !== focusSid.slice(2)) items[f].u.lead = AM[focusSid.slice(2)];
      if (f >= 0) sp.pile[f] = amendmentSheet(items[f].u, o, f, n, {article: art});
      sp.focus = f >= 0 ? f : clamp(S.e.other, 0, n - 1);
      sp.onMove = i => { S.e.other = i; const it = items[i]; S.e.otherSid = it && it.u ? "a:" + it.u.lead.id : null; };
      sp.above = () => showRef() && !art ? refAbove(o) : "";
      sp.rail = items.map(it => it.u ? `${who(it.u.lead).name}, ${it.u.lead.num}` : it.redac ? "Rédactionnels" : "Les écartés");
    }
  } else {
    const V = articleVersions(); S.e.art = clamp(S.e.art, 0, V.length - 1);
    if (sc === "article"){
      const A = V[S.e.art];
      sp.title = T(`${D.article.num} · <b>${esc(A.label)}</b> face à : ${esc(refShort())} · ${S.e.art + 1} / ${V.length}`);
      sp.html = `<div class="burst-scroll">${columnsHTML([A], null)}</div>`;
    } else if (sc === "droit"){
      sp.title = T(`<b>Le code tel qu'il deviendrait</b>, version par version`);
      sp.pile = V.map(A => codeSheet("code:art:" + A.id, A.ver, A.label, A.color)); sp.focus = S.e.art; sp.onMove = i => { S.e.art = i; };
    } else {
      sp.title = T(`${D.article.num} en entier · <b>${V.length}</b> versions : la vôtre, celle de la commission, celle de chaque groupe et de chaque rapporteur`);
      sp.pile = V.map((A, i) => articleSheet(A, i, V.length)); sp.focus = S.e.art; sp.onMove = i => { S.e.art = i; };
      sp.rail = V.map(A => A.label); sp.nested = true;
    }
  }
  const nOt = concurrents(o, S.ord).units.length;
  sp.left = vol === 1 ? (sc === "unite" ? "<b>Ma</b> rédaction" : "<b>Mon</b> amendement") : vol === 0 ? "<b>Les</b> articles" : null;
  sp.right = vol === -1 ? "<b>Mon</b> amendement" : vol === 0 ? (sc === "unite" ? `<b>Les</b> propositions` : `<b>${nOt}</b> ${plural(nOt, "concurrent", "concurrents")}`) : null;
  sp.hint = vol === 0 ? (sc === "unite" ? "<b>Haut / bas</b> : les passages · <b>droite</b> : toutes les propositions · <b>écarter</b> : l'alinéa"
      : sc === "article" ? "<b>Défiler</b> : l'article · <b>clic sur une modification</b> : la comparer · <b>écarter</b> : le code · <b>pincer</b> : l'alinéa"
      : sc === "droit" ? "<b>Défiler</b> : le code · <b>pincer</b> : l'article"
      : "<b>Haut / bas</b> : vos brouillons · <b>double-clic</b> : modifier · <b>clic sur un filet doré</b> : le passage · <b>gauche</b> : les concurrents · <b>droite</b> : les articles")
    : vol === 1 ? "<b>Haut / bas</b> : les concurrents · <b>clic sur une modification</b> : la comparer · <b>⊕</b> : au coffre · <b>↺</b> : le verso"
    : "<b>Haut / bas</b> : les versions de l'article · <b>clic sur un alinéa</b> : y aller · <b>écarter</b> : face à la référence";
  sp.sidAt = i => { const f = CUR.drum && CUR.drum.faces[i]; return f ? f.dataset.sid : null; };
  return sp;
}

/* ================= R2 · LE DÉROULEUR ================= */
function places(){
  const P = D.episodes.slice();
  const never = ALL.filter(a => !a.ordreAppel && a.mode !== "hors-texte");
  P.push({id: "never", place: P.length + 1, titre: "Jamais appelés en réunion", ams: never.map(a => a.id), paroles: [], decisions: [], mots: 0, never: true});
  return P;
}
function placeSheet(p, i, n){
  const ams = p.ams.map(id => AM[id]).filter(Boolean);
  const tomb = ALL.filter(a => a.chuteDans === p.id && !p.ams.includes(a.id));
  const row = (a, k, extra) => { const w = who(a); return `<tr class="${sortClass(a)}" data-goto="a:${a.id}" title="Voir cet amendement"><td class="n">${k}</td><td>${badge(w)}</td><td><b>${a.num}</b>${a.dc && on("D3") ? ` <small>DC ${DC_NUM.get(a.dc)}</small>` : ""}${a.ident ? ` <small>ident.</small>` : ""}</td><td class="obj">${esc(short(modeLead(a, a.cible.al) + " " + objetOf(a), 110))}</td><td class="av">${on("D2") ? avisSym(a.avis) : ""}</td><td class="so">${esc(sortWord(a))}${extra || ""}</td></tr>`; };
  const rows = ams.map((a, k) => row(a, k + 1)).join("") + tomb.map(a => row(a, "↳", " <small>(en conséquence)</small>")).join("");
  const nOr = new Set(p.paroles.map(x => x.nom)).size;
  return sheet({sid: "ep:" + p.id, cls: "placef" + (p.never ? " never" : ""), label: p.titre,
    head: `<span>${p.never ? "Hors de l'appel" : `Place ${p.place} sur ${n - 1}`} · réunion du 21 septembre 2026</span><span>${p.never ? `${ams.length} amendements` : `${p.mots} mots · ${nOr} ${plural(nOr, "orateur")}`}</span>`,
    lead: esc(p.titre),
    body: `<table class="vote"><thead><tr><th></th><th>auteur</th><th>n°</th><th>objet</th><th title="avis de la rapporteure">avis</th><th>sort</th></tr></thead><tbody>${rows}</tbody></table>`,
    foot: `<span>${p.decisions.map(d => esc(d.txt)).join(" · ") || (p.never ? "Irrecevables, retirés, non appelés : ils n'ont pas de place dans la réunion." : "")}</span><span class="count">${i + 1} / ${n}</span>`});
}
function verbatimSheet(p, i, n){
  const body = p.paroles.length ? p.paroles.map(x => `<p class="parole"><b>${esc(x.nom)}</b> <small>${esc(x.role || (GR[x.groupe] || {}).name || "")} · ${x.mots} mots</small><br>${esc(x.txt)}${x.txt.length > 380 ? " …" : ""}</p>`).join("") + p.decisions.map(d => `<p class="decision">${esc(d.txt)}</p>`).join("")
    : `<p class="none">Aucune parole : ces amendements n'ont pas été appelés.</p>`;
  return sheet({sid: "epv:" + p.id, cls: "verbf", label: p.titre,
    head: `<span>Compte rendu · place ${p.place}</span><span>${p.mots} mots</span>`, lead: esc(p.titre), body,
    foot: `<span>Noms fictifs · texte réel du compte rendu (extraits)</span><span class="count">${i + 1} / ${n}</span>`});
}
function buildDerouleur(){
  const sc = curScale(), P = places(), sp = {};
  S.d.place = clamp(S.d.place, 0, P.length - 1);
  if (sc === "partition"){
    const max = Math.max(...P.map(p => p.mots));
    const seg = P.map((p, i) => {
      const ams = p.ams.map(id => AM[id]).filter(Boolean), ad = ams.some(a => a.sort === "Adopté");
      return `<button type="button" class="seg${ad ? " ad" : ""}${p.never ? " nv" : ""}${i === S.d.place ? " on" : ""}" data-place="${i}" style="--w:${Math.max(4, Math.round(100 * Math.sqrt(p.mots / max)))}" title="${esc(p.titre)}"><b>${p.never ? "∅" : p.place}</b><small>${p.never ? ams.length + " non appelés" : p.mots + " mots"}</small></button>`;
    }).join("");
    sp.title = T(`Article 4 en commission · <b>la réunion</b> du lundi 21 septembre 2026, 21 h 30 · une case par place, largeur selon les mots prononcés`);
    sp.html = `<section class="sheet paper bande"><div class="head"><span>Partition de la réunion</span><span>${P.length - 1} places · ${P.reduce((s, p) => s + p.mots, 0)} mots</span></div><div class="segs">${seg}</div><p class="legend">Case dorée : au moins un amendement adopté. Le compte rendu ne donne pas l'heure de chaque prise de parole ; la largeur compte les mots (un seul chiffre, pas un indice).</p></section>`;
  } else {
    const fn = sc === "verbatim" ? verbatimSheet : placeSheet;
    sp.title = T(sc === "verbatim" ? `Article 4 · <b>les paroles</b>, place par place` : `Article 4 en commission · <b>le dérouleur</b> : les places dans l'ordre d'appel`);
    sp.pile = P.map((p, i) => fn(p, i, P.length)); sp.focus = S.d.place; sp.onMove = i => { S.d.place = i; };
    sp.rail = P.map(p => p.never ? "Jamais appelés" : "Place " + p.place);
  }
  sp.hint = sc === "partition" ? "<b>Clic sur une case</b> : la place · <b>pincer</b> : revenir au dérouleur" : sc === "verbatim" ? "<b>Haut / bas</b> : les places · <b>défiler</b> : les paroles · <b>pincer</b> : la liste de vote" : "<b>Haut / bas</b> : les places · <b>clic sur une ligne</b> : l'amendement · <b>écarter</b> : la partition · <b>pincer</b> : les paroles";
  return sp;
}

/* ================= R3 · L'HISTOIRE ================= */
const HIST_ET = () => D.etapes.map(e => e.id);
function stamp(et, x){
  if (!on("D7") || x == null) return "";
  if (et === "transmis"){ const p = D.provSenat[x]; if (!p) return ""; const nm = p.amendements.map(a => "n° " + a.num).join(", "); return `<span class="tampon" title="provenance (Sénat)">${esc(p.etape)}${nm ? " · " + esc(nm) : ""}</span>`; }
  if (et === "AN-com"){ const p = D.provAN[x]; if (!p) return ""; const nm = p.amendements.map(a => a.num).join(", "); return `<span class="tampon" title="provenance (reconstruite)">${esc(p.etape)}${nm ? " · " + esc(nm) : ""}</span>`; }
  return "";
}
function histAlSheet(li, et, k, n){
  const ln = LINES[li], ids = HIST_ET(), x = ln[et], E = ET[et];
  let prevT = null, prevLab = null;
  for (let j = ids.indexOf(et) - 1; j >= 0; j--){ const y = ln[ids[j]]; prevLab = ET[ids[j]].court; if (y != null){ prevT = ET[ids[j]].alineas[y]; break; } }
  const t = x == null ? null : E.alineas[x];
  const meta = {label: E.court, color: "#6b6457", refLabel: prevLab || "étape précédente", where: E.court};
  const body = t == null ? `<p class="none">${prevT != null ? "Supprimé à cette étape." : "N'existe pas encore à cette étape."}</p>${prevT != null ? `<p class="vline one"><span class="ln">${inlineDiff(prevT, "", meta)}</span></p>` : ""}`
    : prevT == null && ids.indexOf(et) > 0 ? `<p class="vline one insl"><span class="ln">${inlineDiff("", t, meta)}</span></p><p class="none">Nouveau à cette étape.</p>`
    : `<p class="vline one"><span class="ln">${prevT == null ? esc(t) : inlineDiff(prevT, t, meta)}</span></p>`;
  return sheet({sid: "e:" + et + ":" + (ln.transmis != null ? ln.transmis + 1 : "x" + li), cls: "histf" + (t == null ? " absent" : ""), label: E.label,
    head: `<span class="etb">${esc(E.chambre)}</span><span class="hr">${stamp(et, x)}<span>${esc(E.court)}${x != null ? " · alinéa " + (x + 1) : ""}</span><span class="facea static">face à : <b>${esc(prevLab || "—")}</b></span></span>`,
    lead: esc(E.label) + (E.note ? ` <small>(${esc(E.note)})</small>` : ""), body,
    foot: `<span>Haut / bas : les étapes · gauche / droite : l'alinéa voisin</span><span class="count">${k + 1} / ${n}</span>`, coffre: ln.transmis != null});
}
function histArtSheet(et, k, n){
  const ids = HIST_ET(), j = ids.indexOf(et), E = ET[et], prev = j > 0 ? ids[j - 1] : null;
  const rows = LINES.map((ln, li) => {
    const x = ln[et], y = prev ? ln[prev] : null;
    if (x == null && y == null) return "";
    const t = x == null ? null : E.alineas[x], p = y == null ? null : ET[prev].alineas[y];
    const meta = {label: E.court, color: "#6b6457", refLabel: prev ? ET[prev].court : "", where: E.court};
    const h = t == null ? `${inlineDiff(p || "", "", meta)} <span class="none">(supprimé)</span>` : !prev ? esc(t) : inlineDiff(p || "", t, meta);
    return `<li class="${t != null && p != null && sameText(t, p) ? "" : "mod"}" data-line="${li}"><span class="n">${x != null ? x + 1 : "–"}</span><div>${h}${stamp(et, x)}</div></li>`;
  }).join("");
  return sheet({sid: "e:" + et, cls: "artf", label: E.label,
    head: `<span class="etb">${esc(E.chambre)}</span><span class="hr"><span>${esc(E.label)}</span><span class="facea static">face à : <b>${esc(prev ? ET[prev].court : "rien (premier texte)")}</b></span></span>`,
    body: `<ol class="art-ol">${rows}</ol>`, foot: `<span>${E.alineas.length} alinéas${E.note ? " · " + esc(E.note) : ""}</span><span class="count">${k + 1} / ${n}</span>`, coffre: et !== "S-depot" && et !== "S-com"});
}
function buildHistoire(){
  const sc = curScale(), ids = HIST_ET(), sp = {};
  S.h.line = clamp(S.h.line == null ? 0 : S.h.line, 0, LINES.length - 1);
  if (sc === "grille"){
    const head = `<tr><th>ligne</th>${ids.map(id => `<th>${esc(ET[id].court)}</th>`).join("")}</tr>`;
    const body = LINES.map((ln, li) => `<tr class="${li === S.h.line ? "on" : ""}">` + `<td class="n">${li + 1}</td>` + ids.map((id, j) => {
      const x = ln[id]; if (x == null) return `<td class="ab">—</td>`;
      let py = null; for (let q = j - 1; q >= 0; q--) if (ln[ids[q]] != null){ py = ET[ids[q]].alineas[ln[ids[q]]]; break; }
      const t = ET[id].alineas[x], sym = j === 0 ? "" : py == null ? "nouveau" : sameText(py, t) ? "=" : "modifié";
      return `<td data-line="${li}" data-et="${id}" class="${sym === "=" ? "eq" : sym ? "chg" : ""}" title="${esc(short(t, 200))}"><b>${x + 1}</b> ${esc(short(t, 38))}${sym && sym !== "=" ? ` <small>${sym}</small>` : ""}</td>`;
    }).join("") + `</tr>`).join("");
    sp.title = T(`Article 4 · <b>la grille</b> : chaque ligne suit un alinéa d'étape en étape (alignement par le texte, reconstruit)`);
    sp.html = `<div class="burst-scroll"><section class="sheet paper grille"><table>${head}${body}</table></section></div>`;
  } else if (sc === "article"){
    sp.title = T(`Article 4 · <b>l'article à chaque étape</b>, face à l'étape précédente`);
    sp.pile = ids.map((id, k) => histArtSheet(id, k, ids.length)); sp.focus = clamp(S.h.et, 0, ids.length - 1); sp.onMove = i => { S.h.et = i; }; sp.nested = true;
    sp.rail = ids.map(id => ET[id].court);
  } else {
    const ln = LINES[S.h.line];
    const lab = ln.transmis != null ? `l'alinéa ${ln.transmis + 1} du texte transmis` : ln["AN-com"] != null ? `l'alinéa ${ln["AN-com"] + 1} du texte de la commission` : `un alinéa du Sénat`;
    sp.title = T(`<b>${cap(lab)}</b>, d'étape en étape · ligne ${S.h.line + 1} sur ${LINES.length}`);
    sp.pile = ids.map((id, k) => histAlSheet(S.h.line, id, k, ids.length)); sp.focus = clamp(S.h.et, 0, ids.length - 1); sp.onMove = i => { S.h.et = i; };
    sp.rail = ids.map(id => ET[id].court);
    sp.left = S.h.line > 0 ? "<b>Ligne</b> précédente" : null; sp.right = S.h.line < LINES.length - 1 ? "<b>Ligne</b> suivante" : null;
  }
  sp.hint = sc === "grille" ? "<b>Clic sur une case</b> : cet alinéa à cette étape · <b>pincer</b> : l'article" : sc === "article" ? "<b>Haut / bas</b> : les étapes · <b>clic sur un alinéa</b> : son histoire · <b>écarter</b> : la grille" : "<b>Haut / bas</b> : les étapes · <b>gauche / droite</b> : l'alinéa voisin · <b>écarter</b> : l'article";
  return sp;
}

/* ================= R4 · LES THÈMES ================= */
function synthSheet(th){
  const ams = th.amendements.map(id => AM[id]).filter(Boolean), main = ams.filter(a => !isEcarte(a));
  const kw = th.label.toLowerCase().split(/\s+/).filter(w => w.length > 4).map(w => w.slice(0, 6));
  const strate1 = D.commentaire.position.filter(t => th.amendements.some(id => t.includes(id)) || kw.some(k => t.toLowerCase().includes(k)));
  const eps = [...new Set(main.map(a => a.episode).filter(Boolean))].map(id => EP[id]);
  const byG = new Map();
  for (const e of eps) for (const p of e.paroles){ const g = p.role ? p.role : p.groupe ? GR[p.groupe].name : null; if (!g) continue; if (!byG.has(g)) byG.set(g, []); if (byG.get(g).length < 1) byG.get(g).push(p.txt); }
  const sorts = {}; main.forEach(a => { const s = a.sort || "non examiné"; sorts[s] = (sorts[s] || 0) + 1; });
  const myTouch = MINE.filter(m => themeAls(th).includes(m.al));
  const s3 = myTouch.length ? myTouch.map(m => `<li>${esc(draftNum(m))} (alinéa ${m.al}) : ${m.mode === "supprimer" ? "supprime l'alinéa" : sameText(m.texte, TRANSMIS[m.al - 1]) ? "reprend le texte transmis" : esc(genDispositif(m).parts[0] || "")}</li>`).join("") : `<li class="none">Aucun de vos brouillons ne touche ce thème.</li>`;
  return sheet({sid: "syn:" + th.id, cls: "synf", label: "Synthèse",
    head: `<span>Synthèse · ${esc(th.label)}</span><span>thème ${th.src === "déclaré" ? "déclaré" : "calculé"}</span>`,
    lead: `<small>${esc(th.doc)}</small>`,
    body: vsec("1. Ce que dit le rapport", strate1.length ? `<ul>${strate1.map(t => `<li>${esc(t.replace(/^-\s*/, ""))}</li>`).join("")}</ul>` : `<p class="none">Le commentaire d'article ne s'y arrête pas.</p>`)
      + vsec("2. Les positions en réunion", byG.size ? [...byG].map(([g, l]) => `<p class="parole"><b>${esc(g)}</b> ${esc(short(l[0], 240))}</p>`).join("") : `<p class="none">Pas de débat relevé sur ces amendements.</p>`)
      + vsec("3. Ce que fait votre texte", `<ul>${s3}</ul>`),
    foot: `<span>${main.length} amendements examinés : ${Object.entries(sorts).map(([k, v]) => `${v} ${k.toLowerCase()}`).join(", ")} · pas de note, pas de score</span>`});
}
function themePassageSheet(th, o, k, n){
  const m = MINE.find(x => x.al === o), text = m ? (m.mode === "supprimer" ? null : m.texte) : TRANSMIS[o - 1];
  const meta = {label: m ? "Vous" : "Texte transmis", color: GR[ME].color, refLabel: refLabel(), where: alLabel(o)};
  const ids = new Set(th.amendements);
  const nA = ALL.filter(a => ids.has(a.id) && touchesAl(a, o)).length;
  const body = showRef() ? (text == null ? inlineDiff(refAl(o), "", meta) : inlineDiff(refAl(o), text, meta)) : text == null ? `<span class="none">Vous supprimez cet alinéa.</span>` : unitMarks(o, text);
  return sheet({sid: m ? "m:" + m.id : "e:transmis:" + o, cls: "al", label: "Alinéa " + o,
    head: `${badge(myWho())}<span class="hr"><span>${esc(th.label)} · alinéa ${o}${m ? " · " + esc(draftNum(m)) : " · pas de brouillon"}</span>${faceCtl()}</span>`,
    body: `<p class="vline"><span class="n">${o}</span><span class="ln">${body}</span></p>`,
    foot: `<span>${nA} ${plural(nA, "amendement du thème touche", "amendements du thème touchent")} cet alinéa</span><span class="count">${k + 1} / ${n}</span>`, coffre: true});
}
function buildThemes(){
  const sc = curScale(), sp = {}, th = THEMES[clamp(S.t.theme, 0, THEMES.length - 1)];
  if (sc === "matrice"){
    const gs = [...Object.keys(INS).map(k => ({k, inst: true, name: INS[k].name})), ...Object.keys(GR).filter(g => ALL.some(a => a.groupe === g && !a.inst)).map(g => ({k: g, name: GR[g].name}))];
    const head = `<tr><th>thème</th>${gs.map(g => `<th>${esc(g.name)}</th>`).join("")}</tr>`;
    const body = THEMES.map((t, ti) => `<tr><th><button type="button" class="lnk" data-theme="${ti}">${esc(t.label)}</button></th>` + gs.map(g => {
      const L = t.amendements.map(id => AM[id]).filter(a => a && (g.inst ? a.inst === g.k : a.groupe === g.k && !a.inst));
      return `<td>${L.map(a => `<button type="button" class="lnk ${sortClass(a)}" data-goto="a:${a.id}" title="${esc(sortWord(a))}">${a.num.replace(/^C[EF]/, "")}${a.sort === "Adopté" ? "✓" : isEcarte(a) ? "∅" : ""}</button>`).join(" ")}</td>`;
    }).join("") + `</tr>`).join("");
    sp.title = T(`<b>Thèmes × groupes</b> : qui porte quoi, en texte court (✓ adopté · ∅ écarté) · aucun chiffre composé`);
    sp.html = `<div class="burst-scroll"><section class="sheet paper grille matrice"><table>${head}${body}</table></section></div>`;
  } else if (S.t.volet === -1){
    sp.title = T(`${esc(th.label)} · <b>la synthèse</b>`); sp.pile = [synthSheet(th)];
  } else if (S.t.volet === 1){
    const L = pileUnits(th.amendements.map(id => AM[id]).filter(a => a && !isEcarte(a)), S.ord);
    sp.title = T(`${esc(th.label)} · <b>${L.length}</b> ${plural(L.length, "rédaction", "rédactions")} des autres sur ce thème, à travers l'article`);
    sp.pile = L.map((u, i) => amendmentSheet(u, u.lead.cible.al || (u.lead.spans[0] || {}).al || 1, i, L.length, {article: true})); sp.focus = S.t.other; sp.onMove = i => { S.t.other = i; };
    sp.rail = L.map(u => who(u.lead).name + ", " + u.lead.num);
  } else {
    const als = themeAls(th);
    sp.title = T(`${esc(th.label)} · <b>votre texte</b> sur ce thème, alinéa par alinéa (${als.length})`);
    sp.pile = als.map((o, k) => themePassageSheet(th, o, k, als.length)); sp.focus = S.t.pos; sp.onMove = i => { S.t.pos = i; };
    sp.rail = als.map(o => "Alinéa " + o);
  }
  sp.side = sc === "matrice" ? null : "themes";
  sp.left = sc === "matrice" ? null : S.t.volet === 0 ? "<b>La</b> synthèse" : S.t.volet === 1 ? "<b>Mon</b> texte" : null;
  sp.right = sc === "matrice" ? null : S.t.volet === -1 ? "<b>Mon</b> texte" : S.t.volet === 0 ? "<b>Les</b> autres" : null;
  sp.hint = sc === "matrice" ? "<b>Clic sur un numéro</b> : l'amendement · <b>clic sur un thème</b> : y aller · <b>pincer</b> : revenir" : "<b>Haut / bas</b> : les alinéas du thème · <b>gauche</b> : la synthèse · <b>droite</b> : les autres · <b>écarter</b> : thèmes × groupes";
  return sp;
}

/* ================= R0 · LE PLAN ================= */
function buildPlan(){
  const rows = D.plan.map(p => {
    const n = p.n, ad = (p.amendements["Adopté"] || 0), live = p.num === "4";
    const strokes = `<span class="strokes" aria-hidden="true">${"<i></i>".repeat(Math.min(n, 140))}</span>`;
    const mine = live ? MINE.length : 0;
    return `<li class="${live ? "live" : "dim"}"${live ? ' data-open="4" tabindex="0" title="Ouvrir l\'article 4"' : ""}><span class="n">Art. ${esc(p.num)}</span><div><b>${esc(short(p.intitule, 140))}</b><span class="meta">${esc(p.statut)}${p.cible ? " · " + esc(short(p.cible, 80)) : ""}</span><span class="meta">${n} ${plural(n, "amendement")} en commission${ad ? ` · ${ad} ${plural(ad, "adopté")}` : ""}${live ? ` · <b class="me">● ${mine} ${plural(mine, "brouillon")} à vous</b> · ouvrir` : " · non chargé dans la maquette"}</span></div>${strokes}</li>`;
  }).join("");
  const sp = {};
  sp.title = T(`<b>Le plan</b> · ${esc(D.dossier.titre)}`);
  sp.html = `<div class="burst-scroll"><section class="sheet paper planf"><div class="head"><span>${esc(D.dossier.lecture)}</span><span>${esc(D.dossier.uid)}</span></div>`
    + `<div class="bandeau"><span>✔ ${esc(D.dossier.commission)}</span><span>◷ ${esc(D.dossier.seance)}</span><span>⚑ ${esc(D.dossier.delai)}</span><span class="none">Direct : non activé (décision du 8 novembre)</span></div>`
    + `<ol class="plan-ol">${rows}</ol><p class="legend">Un trait de marge par amendement déposé en commission (épaisseur de marge, pas une couleur de carte).</p></section></div>`;
  sp.hint = "<b>Clic sur l'article 4</b> : l'ouvrir dans « écrire » · <b>poignée du bas</b> : changer de rangement";
  return sp;
}
const BUILD = {ecrire: buildEcrire, derouleur: buildDerouleur, histoire: buildHistoire, themes: buildThemes, plan: buildPlan};
