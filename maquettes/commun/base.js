/* Boussole — briques communes : utilitaires, écart mot à mot, versions, unités de sens nées du débat,
   application des instructions au code, et la pile (tambour). Aucune dépendance. */
"use strict";
const D = window.DATA;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }
const plural = (n, s, p) => n > 1 ? (p || s + "s") : s;
const cap = s => s ? s[0].toUpperCase() + s.slice(1) : s;
const short = (s, n) => { s = String(s || "").replace(/\s+/g, " ").trim(); return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, "") + " …" : s; };
const store = {
  get(k, d){ try{ const v = localStorage.getItem("boussole:" + (window.MAQ || "") + ":" + k); return v == null ? d : JSON.parse(v); }catch(_){ return d; } },
  set(k, v){ try{ localStorage.setItem("boussole:" + (window.MAQ || "") + ":" + k, JSON.stringify(v)); }catch(_){} }
};

/* ---------- étapes, alinéas, lignes ---------- */
const ET = Object.fromEntries(D.etapes.map(e => [e.id, e]));
const TRANSMIS = ET.transmis.alineas;
const NAL = TRANSMIS.length;
const LINES = D.lignes;                                   // un alinéa suivi d'étape en étape
const LINE_OF_T = {}; LINES.forEach((ln, i) => { if (ln.transmis != null) LINE_OF_T[ln.transmis + 1] = i; });
const AM = Object.fromEntries(D.amendements.map(a => [a.id, a]));
const EP = Object.fromEntries(D.episodes.map(e => [e.id, e]));
const GR = D.groupes, INS = D.institutions;
const ME = "PR";

// le texte d'un alinéa du texte transmis (numérotation d'origine, 1..30) dans une autre étape
function textAt(etape, o){
  if (etape === "transmis") return TRANSMIS[o - 1];
  const li = LINE_OF_T[o]; if (li == null) return "";
  const x = LINES[li][etape]; return x == null ? "" : ET[etape].alineas[x];
}
const alLabel = o => `alinéa ${o}`;

/* ---------- écart mot à mot (repris de la maquette) ---------- */
const isWs = t => /^\s+$/.test(t), isQuote = t => t === "«" || t === "»";
const norm = t => t.replace(/[’']/g, "'").replace(/‑/g, "-").toLowerCase();
function tokenize(s){ return String(s || "").match(/\s+|[\p{L}\p{N}'’%‑-]+|[^\s\p{L}\p{N}'’%‑-]/gu) || []; }
function lcsKeep(a, b){
  const n = a.length, m = b.length, ka = new Array(n).fill(false), kb = new Array(m).fill(false);
  if (n * m > 4e6) return [ka, kb];
  let lo = 0; while (lo < n && lo < m && a[lo] === b[lo]){ ka[lo] = kb[lo] = true; lo++; }
  let hi = 0; while (hi < n - lo && hi < m - lo && a[n - 1 - hi] === b[m - 1 - hi]){ ka[n - 1 - hi] = kb[m - 1 - hi] = true; hi++; }
  const A = a.slice(lo, n - hi), B = b.slice(lo, m - hi), N = A.length, M = B.length;
  const L = Array.from({length: N + 1}, () => new Uint16Array(M + 1));
  for (let i = N - 1; i >= 0; i--) for (let j = M - 1; j >= 0; j--) L[i][j] = A[i] === B[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  let i = 0, j = 0;
  while (i < N && j < M){ if (A[i] === B[j]){ ka[lo + i] = kb[lo + j] = true; i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) i++; else j++; }
  return [ka, kb];
}
const HUNKS = new Map(); let hunkSeq = 0;
function ctxWords(op, dir){
  if (!op || op.type !== "eq") return "";
  const parts = op.text.split(/(\s+)/);
  if (dir < 0){ let t = parts.slice(-11).join(""); const m = t.match(/[\s\S]*[.;:]\s+/); if (m) return t.slice(m[0].length); return (parts.length > 11 ? "… " : "") + t; }
  let t = parts.slice(0, 11).join(""); const m = t.match(/^[\s\S]*?[.;:]/); if (m) return m[0]; return t + (parts.length > 11 ? " …" : "");
}
function diffOps(ref, mine){
  const units = s => { const u = []; for (const t of tokenize(s)){ if (isWs(t)){ if (u.length) u[u.length - 1].ws += t; } else u.push({w: t, ws: ""}); } return u; };
  const A = units(ref), B = units(mine);
  const [ka, kb] = lcsKeep(A.map(x => norm(x.w)), B.map(x => norm(x.w)));
  const ops = []; const push = (type, text) => { const l = ops[ops.length - 1]; if (l && l.type === type) l.text += text; else ops.push({type, text}); };
  let i = 0, j = 0;
  while (i < A.length || j < B.length){
    if (i < A.length && !ka[i]){ push("del", A[i].w + (A[i].ws ? " " : "")); i++; }
    else if (j < B.length && !kb[j]){ push("ins", B[j].w + B[j].ws); j++; }
    else if (i < A.length && j < B.length){ push("eq", B[j].w + B[j].ws); i++; j++; }
    else break;
  }
  return ops;
}
// corrections apparentes portées sur la rédaction comparée : la référence reste vierge
function inlineDiff(ref, mine, meta){
  const ops = diffOps(ref, mine), hid = [];
  if (meta) for (let k = 0; k < ops.length;){
    if (ops[k].type === "eq"){ k++; continue; }
    let e = k; while (e + 1 < ops.length && ops[e + 1].type !== "eq") e++;
    const id = ++hunkSeq; HUNKS.set(id, {meta, before: ctxWords(ops[k - 1], -1), after: ctxWords(ops[e + 1], 1), seg: ops.slice(k, e + 1)});
    if (HUNKS.size > 3000) HUNKS.delete(HUNKS.keys().next().value);
    for (let x = k; x <= e; x++) hid[x] = id; k = e + 1;
  }
  return renderOps(ops, hid);
}
function renderOps(ops, hid){
  return ops.map((o, k) => {
    if (o.type === "eq") return esc(o.text);
    const m = o.text.match(/^([\s\S]*?)(\s*)$/), glue = o.type === "del" && !m[2] && ops[k + 1] && ops[k + 1].type === "ins" ? " " : "";
    return `<${o.type}${hid && hid[k] ? ` data-h="${hid[k]}" title="Comparer avec la référence"` : ""}>${esc(m[1])}</${o.type}>${m[2]}${glue}`;
  }).join("");
}
const sameText = (a, b) => norm(String(a || "")).replace(/\s+/g, " ").trim() === norm(String(b || "")).replace(/\s+/g, " ").trim();
// pendant la frappe : ajouts soulignés seulement, suppressions en repère fin (le calque ne peut pas insérer de texte)
function liveHTML(ref, mine){
  const A = tokenize(ref).filter(t => !isWs(t)), tb = tokenize(mine), ib = [];
  tb.forEach((t, k) => { if (!isWs(t)) ib.push(k); });
  const [ka, kb] = lcsKeep(A.map(norm), ib.map(k => norm(tb[k]))), keepB = {}; ib.forEach((k, x) => keepB[k] = kb[x]);
  let i = 0, out = "";
  const flush = () => { const d = []; while (i < A.length && !ka[i]){ d.push(A[i]); i++; } return d.length ? `<span class="delpt" title="supprimé : ${esc(d.join(" "))}"></span>` : ""; };
  tb.forEach((t, k) => { if (keepB[k] === undefined){ out += esc(t); return; } out += flush(); if (keepB[k]){ i++; out += esc(t); } else out += `<ins>${esc(t)}</ins>`; });
  return out + flush();
}

/* ---------- versions d'un article, toujours exprimées sur le texte transmis ---------- */
// rows : o -> texte (null = supprimé) ; ins : o -> [alinéas insérés après o] ; end : alinéas ajoutés en fin d'article
const emptyVer = () => ({rows: new Map(), ins: new Map(), end: []});
function verOfAmendment(a){
  const v = emptyVer();
  for (const r of a.applique.rows){
    if (r.o != null) v.rows.set(r.o, r.del ? null : r.t);
    else if (r.fin) v.end.push(r.t);
    else { if (!v.ins.has(r.at)) v.ins.set(r.at, []); v.ins.get(r.at).push(r.t); }
  }
  return v;
}
function verOfDraft(m, v){
  v = v || emptyVer();
  if (m.mode === "supprimer") v.rows.set(m.al, null);
  else if (m.mode === "inserer"){ if (!v.ins.has(m.al)) v.ins.set(m.al, []); v.ins.get(m.al).push(m.texte); }
  else v.rows.set(m.al, m.texte);
  return v;
}
function merge(into, v){
  for (const [o, t] of v.rows) into.rows.set(o, t);
  for (const [o, l] of v.ins){ if (!into.ins.has(o)) into.ins.set(o, []); into.ins.get(o).push(...l); }
  into.end.push(...v.end);
  return into;
}
function verOfEtape(id){
  const v = emptyVer(); let lastT = 0;
  for (const ln of LINES){
    const t = ln.transmis, x = ln[id];
    if (t != null){
      lastT = t + 1;
      const txt = x == null ? null : ET[id].alineas[x];
      if (txt == null || !sameText(txt, TRANSMIS[t])) v.rows.set(t + 1, txt);
    } else if (x != null){
      if (!v.ins.has(lastT)) v.ins.set(lastT, []);
      v.ins.get(lastT).push(ET[id].alineas[x]);
    }
  }
  return v;
}
// les lignes d'une version, dans l'ordre : {o, at, text, kind}
function verLines(v, only){
  const out = [];
  const pushIns = o => (v.ins.get(o) || []).forEach((t, k) => out.push({o: null, at: o, k, text: t, kind: "ins"}));
  if (!only || only.has(0)) pushIns(0);
  for (let o = 1; o <= NAL; o++){
    if (only && !only.has(o)) continue;
    if (v.rows.has(o)){ const t = v.rows.get(o); out.push({o, text: t, kind: t == null ? "del" : "mod"}); }
    else out.push({o, text: TRANSMIS[o - 1], kind: "same"});
    pushIns(o);
  }
  if (!only || only.has(NAL)) v.end.forEach((t, k) => out.push({o: null, at: NAL, k, text: t, kind: "end"}));
  return out;
}
const verTouched = v => { const s = new Set([...v.rows.keys(), ...[...v.ins.keys()].filter(o => o > 0)]); if (v.end.length) s.add(NAL); return s; };
// le texte suivi de l'article (pour l'appliquer au code)
const verAlineas = v => verLines(v).filter(l => l.text != null).map(l => l.text);

/* ---------- un passage d'une rédaction, retrouvé à partir de la référence (alignement mot à mot) ---------- */
function wordsPos(s){
  const out = []; const re = /[\p{L}\p{N}'’%‑-]+|[^\s\p{L}\p{N}'’%‑-]/gu; let m;
  while ((m = re.exec(s))) if (!isQuote(m[0])) out.push({w: norm(m[0]), s: m.index, e: m.index + m[0].length});
  return out;
}
function mapRange(ref, ver, a, b){
  if (ver == null) return {ref: ref.slice(a, b), ver: null};
  const R = wordsPos(ref), V = wordsPos(ver);
  const [kr, kv] = lcsKeep(R.map(x => x.w), V.map(x => x.w));
  const map = new Array(R.length).fill(-1); let j = 0;
  for (let i = 0; i < R.length; i++){ if (!kr[i]) continue; while (j < V.length && !kv[j]) j++; map[i] = j; j++; }
  let i0 = R.findIndex(t => t.e > a && t.s < Math.max(b, a + 1)); if (i0 < 0) i0 = R.length - 1;
  let i1 = i0; for (let i = i0; i < R.length; i++) if (R[i].s < Math.max(b, a + 1)) i1 = i;
  const prevKept = i => { for (let x = i; x >= 0; x--) if (map[x] >= 0) return map[x]; return -1; };
  const nextKept = i => { for (let x = i; x < R.length; x++) if (map[x] >= 0) return map[x]; return V.length; };
  let j0 = map[i0] >= 0 ? map[i0] : prevKept(i0 - 1) + 1;
  let j1 = map[i1] >= 0 ? map[i1] : nextKept(i1 + 1) - 1;
  const nk = nextKept(i1 + 1); while (j1 + 1 < nk) j1++;     // les mots insérés juste après le passage en font partie
  const refSeg = ref.slice(R[i0].s, R[i1].e);
  const verSeg = j0 <= j1 && V[j0] && V[j1] ? ver.slice(V[j0].s, V[j1].e) : "";
  return {ref: refSeg, ver: verSeg};
}

/* ---------- application des instructions de l'article au code (port de legifrance_appliquer.py) ---------- */
const ORD = {premier:1,"première":1,"deuxième":2,second:2,seconde:2,"troisième":3,"quatrième":4,"cinquième":5,"sixième":6,"septième":7,"huitième":8,"neuvième":9,"dixième":10,"onzième":11,"douzième":12,"treizième":13,"quatorzième":14,"quinzième":15,dernier:-1,"dernière":-1};
const cnorm = s => String(s || "").replace(/’/g, "'").replace(/‑/g, "-").replace(/[  ]/g, " ").replace(/« /g, "«").replace(/ »/g, "»").trim();
function cPhrases(al){
  const out = []; let buf = "";
  for (const tok of al.split(/(?<=[.;])\s+(?=[A-ZÀÉÈ«])/)){
    if (buf && /(\bL|\bR|\bD|\bart|\bn°|\bp)\.$/.test(buf)) buf += " " + tok;
    else { if (buf) out.push(buf); buf = tok; }
  }
  if (buf) out.push(buf);
  return out;
}
function readInstructions(alineas){
  const res = [], A = alineas.map(cnorm); let cur = null, i = 0, ctxAl = null;
  while (i < A.length){
    let a = A[i];
    const m = /(?:Le|le) ([a-z](?: bis)?) est ainsi modifié/.exec(a); if (m) cur = m[1];
    const mal = /^(?:[a-z](?: bis| ter)?\) )?Le ([a-zéè]+) alinéa est ainsi modifié/.exec(a);
    if (mal){ ctxAl = mal[1]; i++; continue; }
    if (a.startsWith("–") && ctxAl) a = a + " [" + ctxAl + " alinéa]"; else if (!a.startsWith("–")) ctxAl = null;
    const m2 = /\bdu ([a-z])(?=[ ,]|$)/.exec(a);
    const cible = m2 && !m ? m2[1] : cur;
    const cites = [];
    if (a.includes("ainsi rédigé")){
      let j = i + 1;
      while (j < A.length && A[j].startsWith("«")){ cites.push(A[j]); j++; if (/»\s*[;.]?\s*$/.test(A[j - 1])) break; }
      i = j - 1;
    }
    if (/(inséré|remplacé|complété|supprimé)/.test(a) && !m) res.push([a, cible, cites]);
    i++;
  }
  return res;
}
const unq = c => c.replace(/^«\s*/, "").replace(/\s*»\s*[;.]?\s*$/, "");
const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function applyToCode(alineas){
  const subs = {}; for (const [k, v] of Object.entries(D.code.avant)) subs[k] = v.slice();
  const pos = {}; for (const k in subs) pos[k] = subs[k].map((_, i) => i);
  const log = [];
  readInstructions(alineas).forEach(([txt, lettre, cites], n) => {
    const e = {n: n + 1, texte: txt, cible: lettre, forme: null, statut: "non mécanisé", detail: ""}; log.push(e);
    if (!(lettre in subs)){ e.detail = "subdivision visée hors de l'extrait du code"; return; }
    const S = subs[lettre];
    const idx = k => { const P = pos[lettre]; return k === -1 ? P[P.length - 1] : P[k - 1]; };
    let m = /(premier|[a-zéè]+ième|dernier) alinéa est remplacé par (\w+) alinéas? ainsi rédigés?/.exec(txt);
    if (m){
      e.forme = "remplacer alinéa(s)"; const k = idx(ORD[m[1]]), nw = cites.map(unq);
      if (k == null){ e.statut = "échec"; e.detail = "alinéa inexistant"; return; }
      S.splice(k, 1, ...nw); const P = pos[lettre], o = P.indexOf(k);
      pos[lettre] = [...P.slice(0, o + 1), ...P.slice(o + 1).map(p => p + nw.length - 1)];
      e.statut = "appliqué"; e.detail = `alinéa ${k + 1} remplacé par ${nw.length}`; return;
    }
    m = /Après le ([a-zéè]+) alinéa, (?:sont|est) insérés? (\w+) alinéas?/.exec(txt);
    if (m){
      e.forme = "insérer alinéas"; const k = idx(ORD[m[1]]), nw = cites.map(unq);
      if (k == null){ e.statut = "échec"; e.detail = "alinéa inexistant"; return; }
      S.splice(k + 1, 0, ...nw); pos[lettre] = pos[lettre].map(p => p <= k ? p : p + nw.length);
      e.statut = "appliqué"; e.detail = `${nw.length} alinéa(s) inséré(s) après le ${k + 1}e`; return;
    }
    const ma = /(premier|[a-zéè]+ième|dernier) alinéa/.exec(txt), mp = /(première|[a-zéè]+ième|dernière|seconde) phrase/.exec(txt);
    if (!ma){ e.detail = "alinéa non localisé"; return; }
    const k = idx(ORD[ma[1]]);
    if (k == null || k >= S.length){ e.statut = "échec"; e.detail = `alinéa ${ORD[ma[1]]} inexistant`; return; }
    const al = S[k], ph = cPhrases(al); let pk = null;
    if (mp){ pk = ORD[mp[1]]; pk = pk === -1 ? ph.length - 1 : pk - 1; if (pk >= ph.length){ e.statut = "échec"; e.detail = `phrase ${pk + 1} inexistante`; return; } }
    const zone = pk != null ? ph[pk] : al, q = [...txt.matchAll(/«([^»]*)»/g)].map(x => x[1]);
    const m1 = /après (?:le mot|les mots|la référence|la première occurrence du mot) :/.test(txt);
    const m2 = /(?:le mot|les mots|la référence) :.*sont remplacés|est remplacée?/.test(txt);
    const m3 = /est complétée? par les mots/.test(txt), m4 = /sont supprimés|est supprimé/.test(txt);
    let nz = null;
    if (m4 && q.length && !m2){
      e.forme = "supprimer mots"; const a = q[0], occ = zone.split(a).length - 1;
      if (!occ){ e.statut = "échec"; e.detail = `« ${a} » absent`; return; }
      nz = zone.replace(a, "").replace(/ {2}/g, " "); e.statut = occ === 1 ? "appliqué" : "ambigu"; e.detail = `${occ} occurrence(s)`;
    } else if (m1 && q.length >= 2){
      e.forme = "insérer après"; const a = q[0], b = q[1];
      let ins = b.startsWith(",") ? b : " " + b; ins = ins.replace(/,$/, "") + (b.endsWith(",") ? "," : "");
      const rx = new RegExp("(?<![\\p{L}\\p{N}])" + reEsc(a) + "(?![\\p{L}\\p{N}])", "gu"), occ = (zone.match(rx) || []).length;
      if (!occ){ e.statut = "échec"; e.detail = `« ${a} » absent`; return; }
      nz = zone.replace(new RegExp("(?<![\\p{L}\\p{N}])" + reEsc(a) + "(?![\\p{L}\\p{N}])", "u"), x => x + ins);
      e.statut = occ === 1 ? "appliqué" : "ambigu"; e.detail = `${occ} occurrence(s) de « ${a} »`;
    } else if (m2 && q.length >= 2){
      e.forme = "remplacer mots"; const occ = zone.split(q[0]).length - 1;
      if (!occ){ e.statut = "échec"; e.detail = `« ${q[0]} » absent`; return; }
      nz = zone.replace(q[0], q[1]); e.statut = occ === 1 ? "appliqué" : "ambigu"; e.detail = `${occ} occurrence(s)`;
    } else if (m3 && q.length){
      e.forme = "compléter phrase"; nz = zone.trimEnd().replace(/([.;])?$/, (_, p) => q[0] + (p || "")); e.statut = "appliqué";
    } else { e.detail = "forme non reconnue"; return; }
    if (pk != null){ ph[pk] = nz; S[k] = ph.join(" "); } else S[k] = nz;
    e.detail += ` · alinéa ${k + 1}` + (pk != null ? `, phrase ${pk + 1}` : "");
  });
  return {apres: subs, log};
}

/* ---------- la pile : un tambour de feuilles (repris de la maquette) ---------- */
const GAP = 24, TILT = 62;
class Drum {
  constructor(el, onMove){ this.el = el; this.faces = []; this.pos = 0; this.raw = 0; this.raf = 0; this.fraf = 0; this.dim = 1; this.last = -1; this.onMove = onMove || (() => {}); this.ro = new ResizeObserver(() => this.layout()); }
  get n(){ return this.faces.length; }
  get cur(){ return clamp(Math.round(this.pos), 0, Math.max(0, this.n - 1)); }
  set(html, idx){
    cancelAnimationFrame(this.raf);
    this.el.innerHTML = html.join(""); this.faces = [...this.el.children]; this.faces.forEach((f, i) => f.dataset.i = i);
    this.pos = this.raw = clamp(idx || 0, 0, Math.max(0, this.n - 1)); this.last = -1;
    this.ro.disconnect(); this.faces.forEach(f => this.ro.observe(f));
    this.layout();
  }
  step(){ const f = this.faces[this.cur]; return (f ? f.offsetHeight : 300) + GAP; }
  layout(){
    if (!this.n){ this.el.style.height = "0px"; return; }
    const c = this.cur, H = this.faces[c].offsetHeight;
    this.el.style.height = H + "px";
    this.faces.forEach((f, i) => {
      const d = i - this.pos, ad = Math.abs(d);
      if (ad > 3.2){ f.style.visibility = "hidden"; f.style.opacity = "0"; f.classList.remove("cur"); f.setAttribute("aria-hidden", "true"); return; }
      f.style.transformOrigin = d < 0 ? "50% 100%" : "50% 0%";
      f.style.transform = `translateY(${(d * (H + GAP)).toFixed(1)}px) rotateX(${(-clamp(d, -1, 1) * TILT).toFixed(2)}deg)`;
      let op = ad <= 1 ? 1 - .55 * ad : Math.max(0, .45 * (2 - ad));
      op *= this.dim + (1 - this.dim) * clamp(1 - ad, 0, 1);
      f.style.opacity = op.toFixed(3);
      f.style.visibility = op < .02 ? "hidden" : "";
      f.style.zIndex = String(100 - Math.round(ad * 10));
      f.classList.toggle("cur", i === c); f.setAttribute("aria-hidden", String(i !== c));
    });
    if (c !== this.last){ this.last = c; this.onMove(c); }
  }
  to(t){
    t = clamp(t, 0, Math.max(0, this.n - 1)); cancelAnimationFrame(this.raf); this.raw = t;
    if (reduced){ this.pos = t; this.layout(); return; }
    const tick = () => { this.pos += (t - this.pos) * .2; if (Math.abs(t - this.pos) < .002){ this.pos = t; this.layout(); return; } this.layout(); this.raf = requestAnimationFrame(tick); };
    this.raf = requestAnimationFrame(tick);
  }
  fade(t){
    cancelAnimationFrame(this.fraf);
    if (reduced || this.dim === t){ this.dim = t; this.layout(); return; }
    const tick = () => { this.dim += (t - this.dim) * .22; if (Math.abs(t - this.dim) < .01){ this.dim = t; this.layout(); return; } this.layout(); this.fraf = requestAnimationFrame(tick); };
    this.fraf = requestAnimationFrame(tick);
  }
  jump(t){ cancelAnimationFrame(this.raf); this.pos = this.raw = clamp(t, 0, Math.max(0, this.n - 1)); this.layout(); }
  begin(){ cancelAnimationFrame(this.raf); this.raw = this.pos; return this.cur; }
  rubber(v){ const m = this.n - 1; return v < 0 ? v * .3 : v > m ? m + (v - m) * .3 : v; }
  move(px){ this.raw += px / this.step(); this.pos = this.rubber(this.raw); this.layout(); }
  dragTo(from, px){ this.raw = from + px / this.step(); this.pos = this.rubber(this.raw); this.layout(); }
  snap(start, v){
    v = v || 0; const moved = this.pos - start; let t = start;
    if (Math.abs(moved) > .12 || Math.abs(v) > 1.2){ const proj = Math.round(this.pos + v * .12); t = moved + v * .1 > 0 ? Math.max(start + 1, proj) : Math.min(start - 1, proj); }
    this.to(t);
  }
}
