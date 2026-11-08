/* Boussole — l'état, les espaces et les feuilles. Une feuille est un objet (data-sid) : elle passe d'un espace à l'autre.
   Quatre espaces, dans l'ordre de la procédure : le dossier · l'atelier · les enjeux · la réunion.
   Un espace = un objet de travail, un moment, un état commun et son cadre propre ; ses interfaces sont ses volets et ses échelles. */
"use strict";

/* ---------- état ---------- */
const S = {
  r: (v => ["dossier", "atelier", "enjeux", "reunion"].includes(v) ? v : "atelier")(store.get("espace", "atelier")),
  showRef: store.get("showRef", false),
  ord: "texte",
  e: {volet: 0, scale: "alinea", mine: 0, unit: 0, other: 0, art: 0},
  d: {scale: "place", place: 0},
  h: {scale: "plan", line: LINE_OF_T[12], et: 2},
  t: {volet: 0, scale: "theme", theme: 3, pos: 0, other: 0},
  coffre: [], edit: null, flipped: new Set(), showRedac: false,
};
// les espaces : leur objet, leur moment, leur question
const ESPACES = () => [
  (on("D12") || on("D7")) && {id: "dossier", label: "Le dossier", objet: "le projet de loi, d'étape en étape", q: "Où en est le texte, d'où vient-il ?"},
  {id: "atelier", label: "L'atelier", objet: "mon amendement, avant le délai", q: "Que dit mon texte face aux autres ?"},
  on("D10") && {id: "enjeux", label: "Les enjeux", objet: "un enjeu, à travers l'article", q: "Sur un enjeu, qui porte quoi ?"},
  on("D5") && {id: "reunion", label: "La réunion", objet: "l'examen de l'article, place par place", q: "Comment cela s'est-il décidé ?"},
].filter(Boolean);
const SCALES = {
  atelier: () => ["unite", "alinea", ...(on("L2") ? [] : ["face"]), "article", ...(on("D4") ? ["droit"] : [])],
  reunion: () => ["verbatim", "place"],
  dossier: () => [...(on("D7") ? ["alinea", "article", "grille"] : []), ...(on("D12") ? ["plan"] : [])],
  enjeux: () => ["theme", "matrice"],
};
const SCALE_NAME = {unite: "unité de sens", alinea: "alinéa", face: "face à la référence", article: "article", droit: "le code", verbatim: "les paroles", place: "la place", partition: "la réunion", grille: "la grille des étapes", theme: "le thème", matrice: "thèmes × groupes", plan: "le projet de loi"};
const showRef = () => on("L2") ? S.showRef : S.e.scale === "face";
const curDraft = () => MINE[clamp(S.e.mine, 0, MINE.length - 1)];
// l'alinéa courant : celui du brouillon au centre, sauf quand on arrive dans le volet des autres depuis un amendement
const curAlE = () => S.e.al != null ? S.e.al : (curDraft() || {al: 12}).al;

/* ---------- briques de feuille ---------- */
function faceCtl(prefix){
  const lab = `${prefix || "face à"} : <b>${esc(refShort())}</b>`;
  if (!on("L2")) return `<span class="facea static">${lab}${on("D1") ? `<button type="button" class="refpick" data-refpick aria-label="Choisir la référence">▾</button>` : ""}</span>`;
  return `<span class="facea"><button type="button" data-face title="${S.showRef ? "Masquer" : "Afficher"} la référence au-dessus de la feuille">${S.showRef ? "◉" : "○"} ${lab}</button>${on("D1") ? `<button type="button" class="refpick" data-refpick aria-label="Choisir la référence" title="Choisir la référence">▾</button>` : ""}</span>`;
}
function sheet(o){
  const flipped = S.flipped.has(o.sid) && on("L3") && o.verso;
  return `<section class="sheet paper face ${o.cls || ""}${flipped ? " flipped" : ""}" data-sid="${esc(o.sid)}"${o.label ? ` aria-label="${esc(o.label)}"` : ""}>`
    + `<div class="recto"${flipped ? " hidden" : ""}>${o.stamp || ""}<div class="head">${o.head}</div>${o.lead ? `<p class="lead">${o.lead}</p>` : ""}<div class="body">${o.body}</div><div class="foot">${o.foot || ""}</div></div>`
    + (on("L3") && o.verso ? `<div class="verso"${flipped ? "" : " hidden"}>${o.verso}</div><button type="button" class="fold" data-flip title="Retourner la feuille (R)" aria-label="Retourner la feuille">↺</button>` : "")
    + (on("L1") && o.coffre ? `<button type="button" class="corner" data-coffre="${esc(o.sid)}" title="${S.r === "atelier" ? "Déposer dans le coffre" : "Emporter dans le coffre de l'atelier"}" aria-label="Déposer dans le coffre">${S.coffre.includes(o.sid) ? "✓" : "⊕"}</button>` : "")
    + `</section>`;
}
const vsec = (t, html) => html ? `<section class="vs"><h4>${esc(t)}</h4>${html}</section>` : "";
const stampOf = a => on("D2") && (a.sort === "Adopté") ? `<span class="stamp">Adopté</span>` : on("D2") && a.sort === "Tombé" ? `<span class="stamp tombe">Tombé</span>` : "";
function avisRow(a){
  if (!on("D2")) return "";
  const issue = isEcarte(a) ? "écarté" : (a.sort || "—").toLowerCase();
  return `<span class="avis" title="Avis de la commission (rapporteure) · avis du Gouvernement · issue"><i title="commission">${avisSym(a.avis)}</i><i title="Gouvernement (absent en commission)">—</i><b>${esc(issue)}</b></span>`;
}

/* ---------- rendu d'une version sur un alinéa ---------- */
// texte d'une ligne de version, avec ou sans corrections apparentes face à la référence vierge
function lineHTML(l, meta, withRef){
  const ref = l.o != null ? refAl(l.o) : "";
  if (withRef){
    if (l.text == null) return `<span class="ln">${inlineDiff(ref, "", meta)} <span class="none">(supprimé)</span></span>`;
    return `<span class="ln">${inlineDiff(ref, l.text, meta)}</span>`;
  }
  if (l.text == null) return `<span class="none">L'alinéa ${l.o} serait supprimé.</span>`;
  if (l.o == null) return `<span class="ln newal">${esc(l.text)}</span>`;
  return `<span class="ln">${unitMarks(l.o, l.text)}</span>`;
}
function versionBody(ver, only, meta, withRef, opts){
  opts = opts || {};
  const L = verLines(ver, only).filter(l => opts.all || l.kind !== "same" || only);
  if (!L.length) return `<p class="none">Aucun changement.</p>`;
  return L.map(l => `<p class="vline${l.o == null ? " insl" : ""}${l.kind === "same" ? " same" : ""}"><span class="n">${l.o != null ? l.o : "+"}</span>${lineHTML(l, meta, withRef)}</p>`).join("");
}

/* ---------- les feuilles ---------- */
function draftSheet(m, i, n){
  const ref = showRef(), meta = {label: "Vous · " + draftNum(m), color: GR[ME].color, refLabel: refLabel(), where: alLabel(m.al)};
  const v = verOfDraft(m), only = new Set([m.al]);
  const body = m.mode === "supprimer"
    ? (ref ? `<p class="vline"><span class="n">${m.al}</span><span class="ln">${inlineDiff(refAl(m.al), "", meta)}</span></p>` : `<p class="none">L'alinéa ${m.al} serait supprimé : « ${esc(short(refAl(m.al), 160))} »</p>`)
    : `<div class="txt" data-al="${m.al}">${versionBody(v, only, meta, ref)}</div>`;
  const vis = on("D13") ? `<button type="button" class="vis" data-vis="${m.id}" title="Visibilité : cliquer pour changer">${m.vis === "public" ? "◎ public" : m.vis === "partagé" ? "◑ partagé" : "○ privé"}</button>` : "";
  const same = m.mode === "rediger" && sameText(m.texte, TRANSMIS[m.al - 1]);
  const foot = `<span>${same ? "Reprend l'alinéa à l'identique · double-clic pour rédiger" : ref ? "Clic sur une modification : la comparer · ailleurs : modifier" : "Filet doré : un passage disputé · double-clic pour modifier"}</span>`
    + (on("D7") ? `<button type="button" class="pass" data-pass="dossier" title="L'histoire de cet alinéa, dans le dossier">histoire ↗</button>` : "")
    + (m.confirme && on("D10") ? `<button type="button" class="pass" data-pass="enjeux" title="Explorer les enjeux de votre amendement">enjeux ↗</button>` : "")
    + (on("D9") ? `<button type="button" data-repli="${m.id}" title="Dupliquer en repli">+ repli</button><button type="button" class="primary" data-sas="${m.id}">${m.confirme ? "Confirmé ✓" : "Confirmer…"}</button>` : "")
    + `<span class="count">${i + 1} / ${n}</span>`;
  const verso = draftVerso(m);
  return sheet({sid: "m:" + m.id, cls: "mine al" + (m.confirme ? " confirmed" : ""), label: draftNum(m),
    stamp: m.confirme ? `<span class="stamp conf">Confirmé</span>` : "",
    head: `${badge(myWho())}<span class="hr">${vis}<span>${esc(draftNum(m))} · ${D.article.num}, alinéa ${m.al}</span>${faceCtl()}</span>`,
    lead: esc(draftLead(m)), body, foot, verso, coffre: true});
}
function draftVerso(m){
  const disp = genDispositif(m);
  const jr = (m.journal || []).slice(-5).reverse().map(j => `<li><b>${esc(j.date)}</b> ${esc(short(j.texte, 90))}</li>`).join("");
  return `<div class="head"><span>Verso · ${esc(draftNum(m))}</span><span>${esc(m.vis)}</span></div><div class="body">`
    + vsec("Identité", `<p>${esc(GR[ME].name)} · ${D.article.num}, alinéa ${m.al} · ${m.confirme ? "confirmé (simulation de dépôt)" : "brouillon"}</p>`)
    + (on("D9") ? vsec("Dispositif, généré à partir de votre texte", `<p class="disp">${esc(disp.text)}</p>`) : "")
    + vsec("Journal des versions", jr ? `<ul class="jr">${jr}</ul>` : `<p class="none">Aucune modification enregistrée.</p>`)
    + `</div>`;
}
function amendmentSheet(u, o, i, n, opts){
  opts = opts || {};
  const a = u.lead, w = who(a), ref = showRef(), meta = {label: `${w.name} · ${a.num}`, color: w.color, refLabel: refLabel(), where: o ? alLabel(o) : "article"};
  const v = verOfAmendment(a);
  let only = opts.article ? null : new Set([o]);
  if (opts.article){ only = verTouched(v); if (!only.size) only = null; }
  let body;
  if (a.mode === "supprimer-article" && !opts.article) body = `<p class="vline"><span class="n">${o}</span><span class="ln">${ref ? inlineDiff(refAl(o), "", meta) : `<span class="none">Tout l'article serait supprimé, cet alinéa compris.</span>`}</span></p>`;
  else if (a.mode === "hors-texte") body = `<p class="disp">${esc(short(a.dispositif, 600))}</p>`;
  else if (!a.applique.rows.length && a.dispositif) body = `<p class="disp">${esc(short(a.dispositif, 600))}</p><p class="none">Opération non appliquée mécaniquement.</p>`;
  else body = versionBody(v, only, meta, ref);
  const members = u.members.length > 1 ? `<div class="who">${u.members.map(x => { const ww = who(x); return `<button type="button" class="who-i${x.id === a.id ? " on" : ""}" data-pick="${x.id}" style="--g:${ww.color}" title="${esc(ww.name)} · ${x.num}"><i></i>${esc(ww.inst && on("D8") ? ww.name : ww.name)} <small>${x.num}${on("D2") ? " · " + esc(sortWord(x)) : ""}</small></button>`; }).join("")}</div>` : "";
  const serie = u.kind === "serie" ? `<p class="serie">Série de ${u.members.length} amendements du même auteur : une même matrice, une valeur qui varie.</p>` : "";
  const ident = u.kind === "ident" ? `<p class="serie">${u.members.length} amendements identiques, pliés en une feuille.</p>` : "";
  const dcb = on("D3") && a.dc ? `<span class="dcb" title="discussion commune">DC ${DC_NUM.get(a.dc)} · ${esc((a.dcPos || "").toLowerCase())}</span>` : "";
  const gage = a.gage && on("L4") ? `<span class="gage" title="clause de compensation repliée">gage : tabac</span>` : "";
  const fell = on("D3") && a.tombePar && a.tombePar.length ? `<span class="fil">tombé quand ${a.tombePar.map(x => `<button type="button" class="lnk" data-goto="a:${x}">${x}</button>`).join(", ")} ${a.tombePar.length > 1 ? "ont été adoptés" : "a été adopté"}</span>` : "";
  const retire = a.retireAuProfit ? `<span class="fil">retiré au profit de <button type="button" class="lnk" data-goto="a:${a.retireAuProfit}">${a.retireAuProfit}</button></span>` : "";
  const q = NOTES[a.id] && on("D11") ? `<span class="qmark" title="question ou engagement saisi par vous">?</span>` : "";
  const sim = on("D3") && !isEcarte(a) && a.sort !== "Adopté" ? `<button type="button" data-sim="${a.id}" title="Simuler sur calque">Et si celle-ci passait ?</button>` : "";
  const pass = on("D5") && a.ordreAppel && S.r !== "reunion" ? `<button type="button" class="pass" data-pass="reunion" title="Sa place dans la réunion">en réunion ↗</button>` : "";
  const foot = `<span>${esc(objetOf(a) || a.cartouche || "")}</span>${sim}${pass}<span class="count">${i + 1} / ${n}</span>`;
  return sheet({sid: "a:" + a.id, cls: "other " + (a.inst && on("D8") ? "banc " : "") + sortClass(a) + (a.sort === "Tombé" && on("D2") ? " tilt" : ""), label: `${w.name}, ${a.num}`,
    stamp: stampOf(a),
    head: `${badge(w)}<span class="hr">${q}${dcb}${gage}<span>${a.num}${u.members.length > 1 ? ` +${u.members.length - 1}` : ""}</span>${avisRow(a)}${faceCtl()}</span>`,
    lead: esc(modeLead(a, o)) + (fell || retire ? ` ${fell}${retire}` : ""), body: body + serie + ident + members, foot, verso: amendmentVerso(a, u), coffre: true});
}
function amendmentVerso(a, u){
  const w = who(a), ep = a.episode && EP[a.episode];
  const rect = (a.versions || []).map(v => `<li><b>${esc(v.date.replace("T", " "))}</b> ${esc(v.etat)}${v.sort ? " → " + esc(v.sort) : ""}${v.champs && v.champs.length ? ` <small>(${esc(v.champs.join(", "))})</small>` : ""}</li>`).join("");
  const links = [
    a.ident && u && u.members.length > 1 ? `identiques : ${u.members.filter(x => x !== a).map(x => x.num).join(", ")}` : "",
    a.dc ? `discussion commune n° ${DC_NUM.get(a.dc)} (${(a.dcPos || "").toLowerCase()}) : ${ALL.filter(x => x.dc === a.dc && x !== a).map(x => x.num).join(", ")}` : "",
    a.sousDe ? `sous-amendement de ${a.sousDe}` : "",
    ALL.some(x => x.sousDe === a.id) ? `sous-amendé par ${ALL.filter(x => x.sousDe === a.id).map(x => x.num).join(", ")}` : "",
    a.tombePar ? `tombé du fait de ${a.tombePar.join(", ")}` : "",
    a.retireAuProfit ? `retiré au profit de ${a.retireAuProfit}` : "",
  ].filter(Boolean);
  const src = on("D8") ? sourcesOf(a) : [];
  const parl = ep && on("D5") ? ep.paroles.filter(p => new RegExp("\\b" + a.num + "\\b").test(p.txt) || p.nom === a.auteur).slice(0, 3) : [];
  const ops = (a.applique.ops || []).map(x => `<li><b>${esc(x.forme || "opération")}</b> · ${esc(x.statut)}${x.detail ? ` <small>${esc(x.detail)}</small>` : ""}</li>`).join("");
  const survie = a.survie ? `vit dans le texte de la commission : ${plural(a.survie.length, "alinéa", "alinéas")} ${a.survie.join(", ")}` : a.sort === "Adopté" ? "adopté ; sa trace dans le texte de la commission n'a pas été retrouvée mécaniquement" : "";
  const note = NOTES[a.id] || {};
  return `<div class="head"><span>Verso · ${a.num}</span><span>${esc(w.name)}</span></div><div class="body">`
    + vsec("Identité", `<p>${a.num} · ${esc(a.auteur)} (fictif)${a.inst ? ` · ${esc(INS[a.inst].sub)}` : a.groupe ? ` · ${esc(GR[a.groupe].name)}` : ""} · ${a.cosign} ${plural(a.cosign, "cosignataire")} · déposé le ${esc(a.depot || "?")}</p>`)
    + vsec("Statut", `<p>Traitement : ${esc(a.etat || "—")} · recevabilité : ${esc(/^Irrecevable/.test(a.etat || "") ? a.sousEtat : "recevable")} · avis de la rapporteure : ${esc(a.avis || "non relevé")} · sort : ${esc(a.sort || "—")}${a.dateSort ? " le " + esc(a.dateSort) : ""}</p>`)
    + vsec("Dispositif", `<p class="disp">${esc(a.dispositif || "(non publié)")}</p>${a.recupere ? `<p class="none">Texte récupéré dans l'historique (Tricoteuses) : l'open data officiel l'efface.</p>` : ""}${ops ? `<ul class="jr">${ops}</ul>` : ""}`)
    + vsec("Motif (exposé sommaire)", a.expose ? `<p>${esc(short(a.expose, 1400))}</p>` : "")
    + (src.length ? vsec("Sources citées dans l'exposé (repérées par motif)", `<p>${src.map(esc).join(" · ")}</p>`) : "")
    + vsec("Versions", rect ? `<ul class="jr">${rect}</ul>` : "")
    + vsec("Liens", links.length ? `<ul class="jr">${links.map(l => `<li>${esc(l)}</li>`).join("")}</ul>` : "")
    + (parl.length ? vsec("En réunion (compte rendu)", parl.map(p => `<p class="parole"><b>${esc(p.nom)}</b> <small>${esc(p.role || (GR[p.groupe] || {}).name || "")}</small> ${esc(short(p.txt, 260))}</p>`).join("")) : "")
    + (survie ? vsec("Survie", `<p>${esc(survie)}</p>`) : "")
    + (on("D11") ? vsec("Négociation (saisie par vous)", `<textarea class="note" data-note="${a.id}" rows="2" placeholder="Une question à ${esc(w.name)}, un engagement obtenu…">${esc(note.q || "")}</textarea><label class="chk"><input type="checkbox" data-eng="${a.id}"${note.eng ? " checked" : ""}> a obtenu un engagement</label>`) : "")
    + `</div>`;
}
// une version d'article entière (volet des articles)
function articleSheet(A, i, n){
  const touched = verTouched(A.ver), ref = showRef();
  const meta = {label: A.label, color: A.color, refLabel: refLabel(), where: "article"};
  const rows = verLines(A.ver).map(l => {
    const mod = l.kind !== "same";
    const body = ref ? lineHTML(l, meta, true) : l.text == null ? `<span class="none">Alinéa supprimé.</span>` : esc(l.text);
    const prov = on("D7") && l.o != null && A.id === "mine" ? "" : "";
    return `<li class="${mod ? "mod" : ""}" data-o="${l.o != null ? l.o : l.at}"${l.o == null ? ' data-ins="1"' : ""} title="${A.me ? "Aller à votre brouillon sur cet alinéa (ou en créer un)" : "Voir les amendements sur cet alinéa"}"><span class="n">${l.o != null ? l.o : "+"}</span><div>${body}</div>${prov}</li>`;
  }).join("");
  return sheet({sid: "art:" + A.id, cls: "artf", label: A.label,
    head: `${badge({name: A.label, color: A.color, inst: A.inst, sub: A.sub})}<span class="hr"><span>${D.article.num} · ${touched.size} ${plural(touched.size, "alinéa modifié", "alinéas modifiés")}</span>${faceCtl()}</span>`,
    body: `<ol class="art-ol">${rows}</ol>`, foot: `<span>Filet doré : alinéa modifié · cliquer un alinéa pour y aller</span><span class="count">${i + 1} / ${n}</span>`, coffre: true});
}
// face à face, colonnes alignées (sous-grille) : la référence vierge et une ou deux versions
function columnsHTML(items, scope){
  const keys = [];
  const seen = new Set();
  const add = k => { if (!seen.has(k)){ seen.add(k); keys.push(k); } };
  const maxIns = o => Math.max(0, ...items.map(it => (it.ver.ins.get(o) || []).length));
  const maxEnd = Math.max(0, ...items.map(it => it.ver.end.length));
  for (let k = 0; k < maxIns(0); k++) add("i:0:" + k);
  for (let o = 1; o <= NAL; o++){
    if (scope && !scope.has(o)) continue;
    add("o:" + o);
    for (let k = 0; k < maxIns(o); k++) add("i:" + o + ":" + k);
  }
  for (let k = 0; k < maxEnd; k++) add("e:" + k);
  const cellOf = (it, key) => {
    const meta = {label: it.label, color: it.color, refLabel: refLabel(), where: key.startsWith("o:") ? alLabel(+key.slice(2)) : "alinéa ajouté"};
    if (key.startsWith("o:")){ const o = +key.slice(2), t = it.ver.rows.has(o) ? it.ver.rows.get(o) : TRANSMIS[o - 1]; return t == null ? `${inlineDiff(refAl(o), "", meta)} <span class="none">(supprimé)</span>` : inlineDiff(refAl(o), t, meta); }
    if (key.startsWith("i:")){ const [, o, k] = key.split(":"); const t = (it.ver.ins.get(+o) || [])[+k]; return t ? inlineDiff("", t, meta) : ""; }
    const t = it.ver.end[+key.slice(2)]; return t ? inlineDiff("", t, meta) : "";
  };
  const refCell = key => key.startsWith("o:") ? esc(refAl(+key.slice(2))) || `<span class="none">(absent de la référence)</span>` : "";
  const label = key => key.startsWith("o:") ? key.slice(2) : "+";
  const cols = [];
  const col = (c, cells) => `<section class="bcol paper${c.ref ? " ref" : ""}" style="grid-row:1 / span ${keys.length + 1}"><div class="head">${badge({name: c.label, color: c.color, inst: c.inst, sub: c.sub})}<span>${esc(c.subLabel || "")}</span></div>${cells.map((h, r) => `<div class="cell"><span class="n">${label(keys[r])}</span><div>${h}</div></div>`).join("")}</section>`;
  if (items[0]) cols.push(col(items[0], keys.map(k => cellOf(items[0], k))));
  cols.push(col({label: refLabel(), color: "#6b6457", ref: true, subLabel: "référence vierge"}, keys.map(refCell)));
  if (items[1]) cols.push(col(items[1], keys.map(k => cellOf(items[1], k))));
  return `<div class="burst-grid" style="--k:${cols.length}">${cols.join("")}</div>`;
}
// le droit : l'article 31 du CGI en vigueur (vierge) et ce qu'il deviendrait (D4)
function codeHTML(ver, label, color){
  const {apres, log} = applyToCode(verAlineas(ver));
  const cells = Object.keys(D.code.avant).map(k => {
    const A = D.code.avant[k], B = apres[k] || [];
    const meta = {label, color, refLabel: "Code en vigueur", where: `le ${k}) du 1° du I`};
    // les alinéas du code, appariés (plus longue sous-suite commune) ; seuls ceux qui changent sont montrés
    const [ka, kb] = lcsKeep(A.map(x => norm(x)), B.map(x => norm(x)));
    const rows = []; let i = 0, j = 0, same = 0;
    const flushSame = () => { if (same){ rows.push(`<p class="code-same">${same} ${plural(same, "alinéa inchangé", "alinéas inchangés")}</p>`); same = 0; } };
    while (i < A.length || j < B.length){
      if (i < A.length && j < B.length && ka[i] && kb[j]){ same++; i++; j++; continue; }
      flushSame();
      if (i < A.length && !ka[i] && j < B.length && !kb[j]){ rows.push(`<p class="code-p"><span class="n">${i + 1}</span><span>${inlineDiff(A[i], B[j], meta)}</span></p>`); i++; j++; }
      else if (i < A.length && !ka[i]){ rows.push(`<p class="code-p"><span class="n">${i + 1}</span><span>${inlineDiff(A[i], "", meta)}</span></p>`); i++; }
      else if (j < B.length && !kb[j]){ rows.push(`<p class="code-p"><span class="n">+</span><span>${inlineDiff("", B[j], meta)}</span></p>`); j++; }
      else { i++; j++; }
    }
    flushSame();
    const changed = rows.some(r => r.includes("code-p"));
    return `<div class="code-l${changed ? " chg" : ""}"><h5>${k})${changed ? "" : " <small>inchangé</small>"}</h5>${changed ? rows.join("") : ""}</div>`;
  }).join("");
  const st = log.map(e => `<li class="st-${e.statut === "appliqué" ? "ok" : e.statut === "échec" ? "ko" : "na"}"><b>${e.n}.</b> ${esc(short(e.texte, 130))} <small>${esc(e.cible || "?")}) · ${esc(e.forme || "")} · <b>${esc(e.statut)}</b>${e.detail ? " · " + esc(e.detail) : ""}</small></li>`).join("");
  return {cells, st, n: log.length, ok: log.filter(e => e.statut === "appliqué").length, ko: log.filter(e => e.statut === "échec").length};
}
function codeSheet(sid, ver, label, color, extra){
  const c = codeHTML(ver, label, color);
  return sheet({sid, cls: "codef", label: "Le code tel qu'il deviendrait",
    head: `${badge({name: label, color})}<span class="hr"><span>${esc(D.code.article)} · face au code en vigueur</span></span>`,
    lead: `Le code tel qu'il deviendrait : ${c.ok} ${plural(c.ok, "instruction appliquée", "instructions appliquées")} sur ${c.n}${c.ko ? `, <b class="ko">${c.ko} en échec</b>` : ""}.`,
    body: `<div class="code">${c.cells}</div><details class="instr"><summary>Les instructions, une par une</summary><ol>${c.st}</ol></details>`,
    foot: `<span>Application mécanique (prototype) · numéros d'alinéa lus dans le code d'origine${extra ? " · " + extra : ""}</span>`});
}

/* ---------- le dispositif généré à partir de mon texte (D9) ---------- */
const GAGE = "La perte de recettes pour l’État est compensée, à due concurrence, par la création d’une taxe additionnelle à l’accise sur les tabacs prévue au chapitre IV du titre Ier du livre III du code des impositions sur les biens et services.";
function genDispositif(m){
  const N = m.al, ref = TRANSMIS[N - 1];
  let parts = [];
  if (m.mode === "supprimer") parts = [`Supprimer l’alinéa ${N}.`];
  else if (m.mode === "inserer") parts = [`Après l’alinéa ${N}, insérer l’alinéa suivant : « ${m.texte} »`];
  else {
    const ops = diffOps(ref, m.texte), hunks = [];
    for (let k = 0; k < ops.length; k++){
      if (ops[k].type === "eq") continue;
      let e = k; while (e + 1 < ops.length && ops[e + 1].type !== "eq") e++;
      const del = ops.slice(k, e + 1).filter(x => x.type === "del").map(x => x.text).join("").trim();
      const ins = ops.slice(k, e + 1).filter(x => x.type === "ins").map(x => x.text).join("").trim();
      const prev = k > 0 ? ops[k - 1].text.trim().split(/\s+/).slice(-2).join(" ") : "";
      hunks.push({del, ins, prev}); k = e;
    }
    const changed = hunks.reduce((s, h) => s + (h.del + " " + h.ins).split(/\s+/).length, 0), total = ref.split(/\s+/).length;
    if (!hunks.length) parts = [];
    else if (hunks.length > 3 || changed > total * .45) parts = [`Rédiger ainsi l’alinéa ${N} : « ${m.texte.replace(/^«\s*|\s*»\s*[;.]?$/g, "")} »`];
    else parts = hunks.map(h => {
      if (h.del && h.ins) return `À l’alinéa ${N}, substituer aux mots : « ${h.del} » les mots : « ${h.ins} ».`;
      if (h.del) return `À l’alinéa ${N}, supprimer les mots : « ${h.del} ».`;
      const anchor = h.prev || "", occ = anchor ? ref.split(anchor).length - 1 : 0;
      const which = occ > 1 ? `après la première occurrence ${anchor.includes(" ") ? "des mots" : "du mot"}` : `après ${anchor.includes(" ") ? "les mots" : "le mot"}`;
      return anchor ? `À l’alinéa ${N}, ${which} : « ${anchor} », insérer les mots : « ${h.ins} ».` : `Au début de l’alinéa ${N}, insérer les mots : « ${h.ins} ».`;
    });
  }
  if (m.gage) parts.push(`Compléter cet article par l’alinéa suivant : « ${GAGE} »`);
  const text = parts.length > 1 ? parts.map((p, k) => ["I", "II", "III", "IV", "V", "VI"][k] + ". – " + p).join("\n") : (parts[0] || "(aucun changement : votre texte reprend l'alinéa)");
  return {text, parts};
}
