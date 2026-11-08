/* Noyau commun aux maquettes d'inspiration : rien que des données et des textes, aucune mise en forme.
   S'appuie sur base.js et modele.js de la refonte (comparaison mot à mot, versions, concurrents, unités, thèmes). */
"use strict";
const ETAPES = D.etapes.map(e => e.id);               // S-depot, S-com, transmis, AN-com
const ETL = {"S-depot": "Sénat · dépôt", "S-com": "Sénat · commission", "transmis": "Texte transmis", "AN-com": "Commission (AN)"};
const NX = {
  // texte de l'alinéa o dans la rédaction d'un amendement (undefined : ne touche pas ; null : supprime)
  amText(a, o){ const v = verOfAmendment(a); if (v.rows.has(o)) return v.rows.get(o); if (a.mode === "supprimer-article") return null; return undefined; },
  amInserted(a, o){ const v = verOfAmendment(a); return (v.ins.get(o) || []); },
  // corrections apparentes d'un amendement sur l'alinéa o face à la référence
  amDiff(a, o){
    const ref = refAl(o), t = NX.amText(a, o);
    if (t === null) return `<del>${esc(ref)}</del>`;
    const ins = NX.amInserted(a, o);
    if (t === undefined && ins.length) return esc(ref) + ins.map(x => ` <ins>${esc(x)}</ins>`).join("");
    if (t === undefined) return null;
    return inlineDiff(ref, t, {a: a.id, o});
  },
  draftDiff(m){
    const ref = refAl(m.al);
    if (m.mode === "supprimer") return `<del>${esc(ref)}</del>`;
    if (m.mode === "inserer") return `<ins>${esc(m.texte)}</ins>`;
    return inlineDiff(ref, m.texte, {m: m.id, o: m.al});
  },
  // un alinéa d'étape en étape : chaque étape face à la précédente
  hist(o){
    const li = LINE_OF_T[o], ln = LINES[li], out = []; let prev = null;
    for (const id of ETAPES){
      const x = ln[id], t = x == null ? null : ET[id].alineas[x];
      out.push({id, label: ETL[id], text: t, diff: prev == null ? (t == null ? null : esc(t)) : t == null ? `<del>${esc(prev)}</del>` : inlineDiff(prev, t), same: prev != null && t != null && sameText(prev, t), absent: t == null});
      if (t != null) prev = t;
    }
    return out;
  },
  // la grille alinéas × étapes : true = modifié par rapport à l'étape précédente
  grid(){
    return LINES.map((ln, i) => {
      let prev = null; const cells = ETAPES.map(id => { const x = ln[id], t = x == null ? null : ET[id].alineas[x]; const c = t == null ? "absent" : prev == null ? "origine" : sameText(prev, t) ? "same" : "mod"; if (t != null) prev = t; return c; });
      return {i, o: ln.transmis != null ? ln.transmis + 1 : null, cells, n: ln.transmis != null ? ALL.filter(a => !isEcarte(a) && a.mode !== "hors-texte" && touchesAl(a, ln.transmis + 1)).length : 0};
    });
  },
  who, sortWord,
  sortKey(a){ return isEcarte(a) ? "ecarte" : a.sort === "Adopté" ? "adopte" : a.sort === "Rejeté" ? "rejete" : a.sort === "Tombé" ? "tombe" : a.sort === "Retiré" ? "retire" : a.sort === "Non soutenu" ? "ns" : "attente"; },
  // le résumé d'un alinéa (début)
  alShort(o, n){ return short(TRANSMIS[o - 1], n || 90); },
  // les alinéas qui ont au moins un concurrent
  alsDisputes(){ const s = []; for (let o = 1; o <= NAL; o++){ const n = ALL.filter(a => !isEcarte(a) && a.mode !== "hors-texte" && a.mode !== "supprimer-article" && a.mode !== "rediger-article" && touchesAl(a, o)).length; if (n) s.push({o, n}); } return s; },
  // amendements d'un thème
  themeAms(th){ return th.amendements.map(id => AM[id]).filter(Boolean); },
  // matrice thèmes × groupes : nombre d'amendements (une seule chose comptée)
  matrix(){
    const gs = Object.keys(GR).filter(g => ALL.some(a => a.groupe === g && !a.inst));
    return {gs, rows: THEMES.map(th => ({th, cells: gs.map(g => NX.themeAms(th).filter(a => a.groupe === g && !a.inst)), inst: NX.themeAms(th).filter(a => a.inst)}))};
  },
  // ce qui a été dit sur un thème en réunion
  themeParoles(th){
    const set = new Set(th.amendements), out = [];
    for (const e of D.episodes) if (e.ams.some(id => set.has(id))) out.push(e);
    return out;
  },
  epOf(a){ return a.episode ? EP[a.episode] : null; },
  plan: D.plan, code: D.code, dossier: D.dossier, article: D.article, commentaire: D.commentaire, episodes: D.episodes,
  groupName: g => (GR[g] || {name: g}).name, groupColor: g => (GR[g] || {color: "#8c8c8c"}).color,
  speaker(p){ return p.role ? (p.role === "rapporteure" ? "La rapporteure" : cap(p.role)) + " · " + p.nom : p.nom + (p.groupe ? " · " + NX.groupName(p.groupe) : ""); },
  fmtDate(s){ if (!s) return ""; const d = new Date(s); return d.toLocaleDateString("fr-FR", {day: "numeric", month: "short"}); },
};
// superpose les passages disputés (unités de sens) à des corrections apparentes déjà rendues :
// html = rendu <ins>/<del> de la rédaction « texte » ; on parcourt les nœuds texte hors <del> en suivant la position dans « texte ».
NX.unitsOnDiff = function(html, o, texte, cls){
  const U = unitsOf(o); if (!U.length || !texte) return html;
  const ref = TRANSMIS[o - 1], hits = [];
  for (const u of U){
    const seg = (sameText(texte, ref) ? ref.slice(u.a, u.b) : mapRange(ref, texte, u.a, u.b).ver || "").trim();
    if (!seg) continue; const at = texte.indexOf(seg); if (at < 0) continue;
    hits.push({s: at, e: at + seg.length, u});
  }
  if (!hits.length) return html;
  hits.sort((x, y) => x.s - y.s);
  const box = document.createElement("div"); box.innerHTML = html;
  let pos = 0; const walker = document.createTreeWalker(box, NodeFilter.SHOW_TEXT);
  const nodes = []; let n; while ((n = walker.nextNode())) nodes.push(n);
  for (const node of nodes){
    if (node.parentElement.closest("del")) continue;
    const t = node.nodeValue; let start = texte.indexOf(t.trim() ? t.replace(/^\s+/, "").slice(0, 12) : t, Math.max(0, pos - 2));
    if (start < 0) start = pos; else start -= (t.length - t.replace(/^\s+/, "").length);
    const a = Math.max(0, start), b = a + t.length; pos = b;
    const inNode = hits.filter(h => h.s < b && h.e > a);
    if (!inNode.length) continue;
    const frag = document.createDocumentFragment(); let i = 0;
    for (const h of inNode){
      const s = Math.max(0, h.s - a), e = Math.min(t.length, h.e - a); if (s < i) continue;
      if (s > i) frag.appendChild(document.createTextNode(t.slice(i, s)));
      const m = document.createElement("mark"); m.className = (cls || "pt") + " w" + unitWeight(h.u.n); m.dataset.u = h.u.k; m.title = h.u.n + " propositions sur ce passage";
      m.textContent = t.slice(s, e); frag.appendChild(m); i = e;
    }
    if (i < t.length) frag.appendChild(document.createTextNode(t.slice(i)));
    node.parentNode.replaceChild(frag, node);
  }
  return box.innerHTML;
};
