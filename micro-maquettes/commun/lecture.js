/* Micro-maquettes · rendu partagé d'un texte à trois niveaux (texte · article · alinéa), pour M01-2 et M01-3.
   État : {texte: id d'étape, art: numéro d'article, al: rang d'alinéa dans ce texte, niv: "texte"|"article"|"alinea"}. */
"use strict";
const LEC = {};
LEC.TEXTES = MM.STAGES.filter(s => MM.hasText(s.id));
LEC.planDe = texte => MM.plan(texte);
LEC.art = (texte, num) => LEC.planDe(texte).find(p => p.num === num);
// changer de texte en gardant l'article et l'alinéa ; renvoie un message de trace
LEC.changerTexte = (st, texte) => {
  const avant = st.texte; if (avant === texte) return "";
  let msg = `${esc(MM.ST[texte].titre)} : `;
  if (st.art === "4"){
    const m = MM.alMap(avant, st.al, texte);
    msg += m.exact ? (m.k === st.al ? `article 4, alinéa ${m.k} conservés.` : `article 4 conservé ; l'alinéa ${st.al} y devient l'alinéa <b>${m.k}</b>.`)
      : `article 4 conservé ; l'alinéa ${st.al} n'existe pas dans ce texte : alinéa le plus proche, <b>${m.k}</b>.`;
    st.al = m.k;
  } else msg += `article ${esc(st.art)} conservé.`;
  st.texte = texte; return msg;
};
LEC.nomArt = num => num === "1er" ? "1<sup>er</sup>" : esc(num);
// le corps de la page selon le niveau
LEC.corps = st => {
  const plan = LEC.planDe(st.texte), A = MM.art4(st.texte);
  if (st.niv === "texte"){
    return `<p class="sous">${plan.filter(p => p.presence !== "absent").length} articles · ${esc(MM.ST[st.texte].titre)}</p>` +
      plan.map(p => {
        const absent = p.presence === "absent", supp = p.presence === "supprime";
        return `<section class="lec-art${p.num === st.art ? " cur" : ""}${absent ? " absent" : ""}" data-go-art="${esc(p.num)}">
          <h3><span class="nom">Article <span class="num">${LEC.nomArt(p.num)}</span></span><span class="tit">${esc(p.titre)}</span>${p.n ? `<span class="compte">${p.n} am.</span>` : ""}</h3>
          ${absent ? `<p class="nontexte">N'existe pas dans ce texte.</p>` : supp ? `<p class="al" style="font-style:italic">(Supprimé)</p>` :
            p.texte ? A.slice(0, 2).map((t, i) => MM.alHTML(t, i + 1)).join("") + `<p class="nontexte">… ${A.length - 2} autres alinéas : ouvrir l'article</p>` : `<p class="nontexte">Texte non chargé dans le prototype.</p>`}
        </section>`;
      }).join("");
  }
  const p = LEC.art(st.texte, st.art);
  const tete = `<h2 class="lec-h">Article <span class="num">${LEC.nomArt(p.num)}</span></h2><p class="lec-tit">${esc(p.titre)}</p>`;
  if (p.presence === "absent") return tete + `<p class="nontexte">L'article ${esc(p.num)} n'existe pas encore dans ce texte (${esc(MM.ST[st.texte].titre.toLowerCase())}).</p>`;
  if (p.presence === "supprime") return tete + `<p class="al" style="font-style:italic">(Supprimé)</p>`;
  if (!p.texte) return tete + `<p class="nontexte">Texte non chargé dans le prototype (seul l'article 4 l'est). ${p.n ? p.n + " amendements en commission à l'Assemblée." : ""}</p>`;
  return tete + `<div class="lec-als${st.niv === "alinea" ? " focus" : ""}">${A.map((t, i) => `<p class="al${st.niv === "alinea" && st.al === i + 1 ? " cur" : ""}" data-go-al="${i + 1}"><span class="n">${i + 1}</span>${esc(t)}</p>`).join("")}</div>`;
};
LEC.css = `
.lec-art{padding:14px 0 6px;border-top:1px solid var(--rule);cursor:pointer}
.lec-art:hover h3 .tit{text-decoration:underline dotted var(--rule);text-underline-offset:4px}
.lec-art h3{margin:0 0 6px;display:flex;gap:4px 12px;align-items:baseline;flex-wrap:wrap}
.lec-art h3 .nom{font:600 10.5px/1.2 var(--ui);letter-spacing:.14em;text-transform:uppercase;color:var(--ink2)}
.lec-art h3 .tit{font:600 16px/1.35 var(--serif);flex:1 1 280px}
.lec-art.cur{box-shadow:inset 3px 0 0 var(--gold);padding-left:12px;margin-left:-15px}
.lec-art.absent{opacity:.5;cursor:default}
.lec-h{font:600 11px/1 var(--ui);letter-spacing:.16em;text-transform:uppercase;color:var(--ink2);margin:22px 0 4px}
.lec-tit{font:600 20px/1.3 var(--serif);margin:0 0 16px;max-width:40ch}
.lec-als .al{cursor:pointer;border-radius:1px;transition:opacity .2s,background .2s;padding:1px 6px;margin-left:-6px}
.lec-als .al:hover{background:rgba(217,181,106,.12)}
.lec-als.focus .al{opacity:.32}
.lec-als.focus .al.cur{opacity:1;background:rgba(217,181,106,.16);box-shadow:inset 3px 0 0 var(--gold)}
`;
