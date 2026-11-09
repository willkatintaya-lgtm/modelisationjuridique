/* Micro-maquettes · aides communes. S'appuie sur le socle (maquettes/commun/ : data.js, base.js, modele.js, noyau.js), sans le modifier. */
"use strict";
const MM = {};
/* La suite des textes : lieu et étape en une seule variable. Les quatre premiers ont un texte (données réelles) ; la suite est à venir. */
MM.STAGES = [
  {id:"S-depot",  lieu:"Sénat",      etape:"dépôt",               titre:"Projet de loi déposé au Sénat"},
  {id:"S-com",    lieu:"Sénat",      etape:"commission",          titre:"Texte de la commission du Sénat"},
  {id:"transmis", lieu:"Sénat",      etape:"séance · texte transmis", titre:"Texte adopté par le Sénat, transmis à l'Assemblée", examine:true},
  {id:"AN-com",   lieu:"Assemblée",  etape:"commission",          titre:"Texte de la commission de l'Assemblée", date:"adopté le 22 sept. 2026"},
  {id:"AN-seance",lieu:"Assemblée",  etape:"séance",              titre:"Texte adopté par l'Assemblée", avenir:"séance du 16 au 20 nov. 2026"},
  {id:"CMP",      lieu:"Commission mixte paritaire", etape:"",    titre:"Texte de la commission mixte paritaire", avenir:"si désaccord"},
  {id:"definitif",lieu:"Parlement",  etape:"lecture définitive",  titre:"Texte définitif", avenir:"à venir"},
];
MM.ST = Object.fromEntries(MM.STAGES.map(s => [s.id, s]));
MM.hasText = id => !!ET[id];
MM.stageLabel = id => { const s = MM.ST[id]; return s.lieu + (s.etape ? " · " + s.etape : ""); };
/* Les articles du projet de loi à une étape. Seul l'article 4 a son texte dans le socle ; la présence des autres est déduite de leur statut et de leur numéro (dit comme tel). */
MM.artName = p => p.num === "1er" ? "Article 1er" : "Article " + p.num;
MM.artNom = p => `Article <span class="num">${p.num === "1er" ? "1<sup>er</sup>" : esc(p.num)}</span>`;   // en HTML
MM.apercu = p => p.intitule && p.cible ? "Vise : " + short(p.cible, 120) : "";
MM.artTitle = p => p.intitule || cap(short(p.cible || "", 110)) || "(sans intitulé)";
MM.presence = (p, id) => {
  const intro = /Introduit par la commission/i.test(p.statut), supp = /Supprimé par la commission/i.test(p.statut), bis = /\b(bis|ter|quater)\b/.test(p.num);
  if (id === "AN-com") return supp ? "supprime" : "present";
  if (intro) return "absent";
  if (bis && id === "S-depot") return "absent";
  return "present";
};
MM.plan = id => D.plan.map(p => ({...p, nom: MM.artName(p), titre: MM.artTitle(p), presence: MM.presence(p, id), texte: p.num === "4"}));
MM.art4 = id => ET[id] ? ET[id].alineas : null;
/* Le même alinéa dans un autre texte (suivi d'étape en étape par le socle). k : rang (1..n) dans le texte « from ».
   → {k, exact} : exact = false quand l'alinéa n'existe pas dans « to » (on donne le plus proche qui précède). */
MM.alMap = (from, k, to) => {
  if (from === to) return {k, exact: true};
  const i = LINES.findIndex(ln => ln[from] === k - 1);
  if (i < 0) return {k: 1, exact: false};
  if (LINES[i][to] != null) return {k: LINES[i][to] + 1, exact: true};
  for (let j = i - 1; j >= 0; j--) if (LINES[j][to] != null) return {k: LINES[j][to] + 1, exact: false};
  return {k: 1, exact: false};
};
/* La structure d'un article : I / 1° / a) / – ; un alinéa cité (« …) appartient à la division qui le précède. */
MM.niveau = t => /^[IVX]+\b[^«]{0,30}–/.test(t) ? 1 : /^\d+°/.test(t) ? 2 : /^[a-z]{1,2}( bis| ter| et [a-z])?\)/.test(t) ? 3 : /^–/.test(t) ? 4 : 0;
MM.structure = alineas => {
  const root = {kids: [], niv: 0}, pile = [root];
  alineas.forEach((t, i) => {
    let n = MM.niveau(t);
    const node = {i, t, kids: [], niv: n};
    if (!n){ pile[pile.length - 1].kids.push(node); return; }   // texte cité : enfant de la division courante
    while (pile.length > 1 && pile[pile.length - 1].niv >= n) pile.pop();
    pile[pile.length - 1].kids.push(node); pile.push(node);
  });
  return root.kids;
};
MM.alHTML = (t, k, extra) => `<p class="al"${extra || ""}><span class="n">${k}</span>${esc(t)}</p>`;
MM.page = (gauche, droite, corps, cls) => `<article class="page${cls ? " " + cls : ""}"><div class="runhead"><span>${gauche}</span><span>${droite}</span></div>${corps}</article>`;
MM.entete = () => `<h1>${esc(D.dossier.titre)}</h1>`;
/* Cartouche et variantes (mémorisées ; window.MMvariante(i) pour les tests) */
MM.cartouche = ({id, question, fondement, variantes, onChange}) => {
  const key = "mm:" + id + ":v";
  let v = 0; try{ v = +localStorage.getItem(key) || 0; }catch(_){}
  if (!variantes || v >= variantes.length) v = 0;
  const el = document.createElement("header"); el.className = "cartouche";
  const draw = () => {
    el.innerHTML = `<span class="id">${esc(id)}</span><span class="q">${question}${fondement ? `<small>${esc(fondement)}</small>` : ""}</span>` +
      (variantes && variantes.length > 1 ? `<nav class="variantes">${variantes.map((x, i) => `<button class="${i === v ? "on" : ""}" data-v="${i}">${String.fromCharCode(65 + i)} · ${esc(x)}</button>`).join("")}</nav>` : "");
  };
  draw(); document.body.prepend(el);
  const set = i => { v = i; try{ localStorage.setItem(key, i); }catch(_){} draw(); onChange && onChange(i); };
  el.addEventListener("click", e => { const b = e.target.closest("[data-v]"); if (b) set(+b.dataset.v); });
  window.MMvariante = set;
  return {get: () => v, set};
};
/* Un feuillet (menu imprimé) ouvert sous un élément */
MM.feuillet = (anchor, items, onPick, titre) => {
  MM.fermer();
  const f = document.createElement("div"); f.className = "feuillet"; f.id = "mm-feuillet";
  f.innerHTML = (titre ? `<div class="tt">${esc(titre)}</div>` : "") + items.map((it, i) => `<button class="it${it.on ? " on" : ""}${it.off ? " off" : ""}" data-i="${i}"${it.off && !it.pickable ? " disabled" : ""}><span>${it.html || esc(it.label)}</span>${it.small ? `<small>${esc(it.small)}</small>` : ""}</button>`).join("");
  document.body.appendChild(f);
  const r = anchor.getBoundingClientRect(), w = f.offsetWidth;
  f.style.left = Math.max(16, Math.min(r.left + scrollX, innerWidth - w - 16 + scrollX)) + "px";
  f.style.top = (r.bottom + scrollY + 6) + "px";
  f.addEventListener("click", e => { const b = e.target.closest("[data-i]"); if (!b || b.disabled) return; MM.fermer(); onPick(items[+b.dataset.i], +b.dataset.i); });
  setTimeout(() => document.addEventListener("click", MM._dehors, {once: true}), 0);
};
MM._dehors = e => { if (!e.target.closest("#mm-feuillet")) MM.fermer(); else document.addEventListener("click", MM._dehors, {once: true}); };
MM.fermer = () => { const f = document.getElementById("mm-feuillet"); if (f) f.remove(); };
addEventListener("keydown", e => { if (e.key === "Escape") MM.fermer(); });
/* Une trace brève en bas d'écran (ce que le geste a conservé) */
MM.trace = msg => {
  let t = document.getElementById("mm-trace"); if (!t){ t = document.createElement("div"); t.id = "mm-trace"; t.className = "trace"; document.body.appendChild(t); }
  t.innerHTML = msg; t.classList.add("vu"); clearTimeout(MM._tt); MM._tt = setTimeout(() => t.classList.remove("vu"), 2600);
};
