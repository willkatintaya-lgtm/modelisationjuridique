"""Prépare les données réelles de l'article 4 du projet de loi logement pour la maquette.

Entrées : les extraits du canal 1 (canaux/1-assemblee/extraits/), groupes et personnes déjà fictifs.
Sortie  : data/logement-art4.js  (window.DATA = {...})

Ce que fait le script :
- nettoie les textes des étapes (Sénat : dépôt, commission, séance = texte transmis ; Assemblée : commission) ;
- aligne les alinéas d'une étape à l'autre (même alinéa suivi dans la navette) ;
- applique mécaniquement chaque amendement de commission au texte transmis (le texte qu'il vise),
  opération par opération, avec un statut (appliqué, échec, non mécanisé) ;
- relève, pour chaque opération, la zone du texte qu'elle touche (base des unités de sens nées du débat) ;
- relie les amendements aux épisodes du compte rendu de commission (ordre d'appel, paroles, décisions, chutes) ;
- range les amendements par thèmes (déclarés par le rapport, ou calculés par mots-clés : dit comme tel) ;
- remplace les rares noms réels restés dans les exposés (nom de groupe réel, surnom du dispositif).

Usage : python3 -I outils/construire_donnees.py
"""
import json, re, os, difflib, collections as C

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EX = os.path.join(ROOT, 'canaux', '1-assemblee', 'extraits')
OUT = os.path.join(ROOT, 'data', 'logement-art4.js')


def load(name):
    with open(os.path.join(EX, name), encoding='utf-8') as f:
        return json.load(f)


# ---------------------------------------------------------------- nettoyage
REAL_GROUPS = [r"[ÉE]cologiste et [Ss]ocial", r"[ÉE]cologiste", r"La France insoumise", r"insoumis\w*", r"Rassemblement national",
               r"Socialistes et apparentés", r"Ensemble pour la République", r"Droite [Rr]épublicaine", r"Les Démocrates",
               r"Horizons(?: et indépendants)?", r"LIOT", r"Gauche démocrate et républicaine", r"Union des droites pour la République",
               r"REPUBLICAINS", r"Les Républicains"]
RG = re.compile(r"(?:du |le |au )?groupe (?:" + "|".join(REAL_GROUPS) + r")|(?:" + "|".join(REAL_GROUPS) + r")")


def scrub(s, gname=None):
    """Retire les noms réels : le surnom du dispositif, les noms de groupes réels."""
    if not s:
        return s
    s = re.sub(r"«\s*dispositif Jeanbrun\s*»", "« dispositif Relance logement »", s)
    s = re.sub(r"«\s*Jeanbrun\s*»|“Jeanbrun”|\"Jeanbrun\"", "« Relance logement »", s)
    s = re.sub(r"Jeanbrun", "Relance logement", s)
    def rep(m):
        t = m.group(0)
        g = gname or "auteur"
        if t.startswith(("du groupe", "le groupe", "au groupe")):
            return t.split(" ")[0] + " groupe " + g
        return g
    s = RG.sub(rep, s)
    return s


def clean_marker(t):
    """« I. – I. – Le 1° … » → « I. – Le 1° … » (le Sénat répète la pastille)."""
    t = t.strip()
    m = re.match(r"^((?:[IVX]+|\d+°(?: bis| ter)?|[a-z](?: bis| ter)?)[.)]?)\s*(?:–\s*)?", t)
    if m:
        core = m.group(1).rstrip('.)')
        rest = t[m.end():]
        if rest.startswith(core):
            return rest
    return t


def nrm(s):
    return re.sub(r"\s+", " ", (s or '').replace('’', "'").replace('‑', '-').replace(' ', ' ').replace(' ', ' ')).strip().lower()


def body(s):
    """le texte sans sa pastille de tête, pour l'alignement"""
    return re.sub(r"^(?:[IVX]+(?: \(nouveau\))?\.?\s*–\s*|\d+°(?: bis| ter)?\s*(?:\(nouveau\))?\s*|[a-z]{1,2}(?: bis| ter)?\)\s*(?:\(nouveau\))?\s*|–\s*)", "", nrm(s))


def flex(needle):
    """regex tolérante : apostrophes, tirets, espaces insécables"""
    out = []
    for ch in needle.strip():
        if ch in "'’":
            out.append("['’]")
        elif ch in "-‑":
            out.append("[-‑]")
        elif ch.isspace() or ch in '  ':
            out.append(r"[\s  ]+")
        else:
            out.append(re.escape(ch))
    s = "".join(out)
    s = re.sub(r"(\[\\s\\u00a0\\u202f\]\+)+", r"[\\s\\u00a0\\u202f]+", s)
    return s


# ---------------------------------------------------------------- étapes
com = load('logement-art4-commission.json')
sen = load('senat-logement-article4.json')
TRANSMIS = [a.strip() for a in com['texte_depose']['alineas']]
ANCOM = [a.strip() for a in com['texte_commission']['alineas']]
S801 = [clean_marker(x['texte']) for x in sen['etats']['pjl25-801']]
S835 = [clean_marker(x['texte']) for x in sen['etats']['pjl25-835']]
ETAPES = [
    dict(id='S-depot', label='Projet de loi déposé au Sénat', court='Sénat · dépôt', chambre='Sénat', alineas=S801),
    dict(id='S-com', label='Texte de la commission du Sénat', court='Sénat · commission', chambre='Sénat', alineas=S835),
    dict(id='transmis', label='Texte transmis par le Sénat', court='Texte transmis', chambre='Sénat → Assemblée', alineas=TRANSMIS,
         note="adopté par le Sénat ; c'est le texte que la commission de l'Assemblée examine et que ses amendements visent"),
    dict(id='AN-com', label="Texte de la commission de l'Assemblée", court='Commission (AN)', chambre='Assemblée', alineas=ANCOM,
         note='adopté le 22 septembre 2026 ; servira de base à la séance (16–20 novembre)'),
]


def sim(a, b):
    a, b = body(a), body(b)
    if not a or not b:
        return 0.0
    return difflib.SequenceMatcher(None, a, b, autojunk=False).ratio()


def align(A, B, th=0.42):
    """alignement monotone qui maximise la somme des similarités au-dessus du seuil"""
    n, m = len(A), len(B)
    S = [[sim(A[i], B[j]) for j in range(m)] for i in range(n)]
    D = [[0.0] * (m + 1) for _ in range(n + 1)]
    P = [[None] * (m + 1) for _ in range(n + 1)]
    for i in range(n - 1, -1, -1):
        for j in range(m - 1, -1, -1):
            best, mv = D[i + 1][j], 'a'
            if D[i][j + 1] > best:
                best, mv = D[i][j + 1], 'b'
            if S[i][j] >= th and S[i][j] + D[i + 1][j + 1] > best:
                best, mv = S[i][j] + D[i + 1][j + 1], 'm'
            D[i][j], P[i][j] = best, mv
    i = j = 0
    pairs = {}
    while i < n and j < m:
        mv = P[i][j]
        if mv == 'm':
            pairs[j] = i; i += 1; j += 1
        elif mv == 'a':
            i += 1
        else:
            j += 1
    return pairs  # index dans B -> index dans A


# lignes : un alinéa suivi d'étape en étape ; chaque ligne = {etape: index}
lines = [{ETAPES[0]['id']: i} for i in range(len(S801))]
for k in range(1, len(ETAPES)):
    prev, cur = ETAPES[k - 1], ETAPES[k]
    pairs = align(prev['alineas'], cur['alineas'])
    where = {ln.get(prev['id']): li for li, ln in enumerate(lines) if prev['id'] in ln}
    new_lines = list(lines)
    insert_after = {}
    last_line = -1
    for j in range(len(cur['alineas'])):
        if j in pairs and pairs[j] in where:
            li = where[pairs[j]]
            lines[li][cur['id']] = j
            last_line = li
        else:
            insert_after.setdefault(last_line, []).append(j)
    rebuilt = []
    for li, ln in enumerate([None] + lines):
        if li > 0:
            rebuilt.append(ln)
        for j in insert_after.get(li - 1, []):
            rebuilt.append({cur['id']: j})
    lines = rebuilt

# ---------------------------------------------------------------- provenance
prov_sen = []
for p in sen['provenance_tas25_157']:
    prov_sen.append(dict(etape=p['etape'], amendements=[dict(num=a['num'], groupe=a['groupe'], sort=a['sort']) for a in p['amendements']]))

# ---------------------------------------------------------------- amendements : lecture
irr = {z['num']: z for z in load('tricoteuses-irrecevables-textes-perdus.json')['donnees']}
vers = {z['num']: z for z in load('tricoteuses-cycle-de-vie-amendements.json')['donnees'] if z['texte'] == 'PRJLANR5L17B3058'}
rap = {z['num']: z for z in load('an-commission-logement-amendements-rapport.json')['donnees']}
cm = load('an-commission-logement-art4-commission.json')

INST = {
    'Ollivier-Hamadi': dict(inst='rapporteure', label="La rapporteure", sub="commission des affaires économiques"),
    'Guérin-Marchal': dict(inst='rapporteur-avis', label="Le rapporteur pour avis", sub="commission des finances"),
}

QUOTE_OPEN, QUOTE_CLOSE = '«', '»'


def quoted(s, start=0):
    """renvoie (contenu, fin) du premier « … » équilibré à partir de start"""
    i = s.find(QUOTE_OPEN, start)
    if i < 0:
        return None, -1
    depth, j = 0, i
    while j < len(s):
        if s[j] == QUOTE_OPEN:
            depth += 1
        elif s[j] == QUOTE_CLOSE:
            depth -= 1
            if depth == 0:
                return s[i + 1:j].strip(), j + 1
        j += 1
    return s[i + 1:].strip(), len(s)


def all_quoted(s):
    out, p = [], 0
    while True:
        q, p2 = quoted(s, p)
        if q is None:
            return out
        out.append(q)
        p = p2


VERB = re.compile(r"^(?:En conséquence, )?(?:[ÀàAa]|[Aa]u|[Aa]ux|[Aa]près|[Aa]vant|[Cc]ompléter|[Ss]upprimer|[Rr]édiger|[Ss]ubstituer|[Ii]nsérer|Le |La perte|Les pertes|La charge|Procéder)")


def split_ops(d):
    """coupe le dispositif en opérations (I. –, II. –, …) ; un morceau qui ne commence pas
    par un verbe d'opération est recollé au précédent (c'était une division citée entre guillemets)"""
    d = d.replace('\r', '')
    parts = re.split(r"(?:^|(?<=[\s.;:»]))([IVX]+)\s*\.\s*[–-]\s+", d)
    ops = []
    k = 0
    if parts and not re.match(r"^[IVX]+$", parts[0] or ''):
        if parts[0].strip(): ops.append(parts[0])
        k = 1
    while k < len(parts):
        if k + 1 < len(parts) and re.match(r"^[IVX]+$", parts[k]):
            piece = parts[k + 1]
            if ops and not VERB.match(piece.strip()):
                ops[-1] += ' ' + parts[k] + '. – ' + piece
            else:
                ops.append(piece)
            k += 2
        else:
            if parts[k].strip(): ops.append(parts[k])
            k += 1
    return [re.sub(r"\s+", " ", o).strip() for o in ops if o.strip()]


NUMW = {'un': 1, 'une': 1, 'deux': 2, 'trois': 3, 'quatre': 4, 'cinq': 5, 'six': 6}


def find_span(text, needle, occ=1):
    """retrouve « needle » dans text : d'abord à la casse exacte (une lettre « D » n'est pas le « d » de « d'un »)"""
    if not needle:
        return None
    pat = (r"(?<![\w])" + flex(needle) + r"(?![\w])") if re.match(r"^\w", needle) and re.search(r"\w$", needle) else flex(needle)
    for flags in ((0,) if len(needle.strip()) <= 2 else (0, re.I)):
        ms = list(re.finditer(pat, text, flags))
        if len(ms) >= occ:
            m = ms[occ - 1]
            return (m.start(), m.end(), len(ms))
    return None


def sentence_bounds(text, which):
    # phrases : on coupe sur « . » suivi d'une majuscule ou d'un guillemet
    cuts = [0] + [m.end() for m in re.finditer(r"(?<=[.;])\s+(?=[A-ZÀÉÈ«])", text)] + [len(text)]
    spans = [(cuts[k], cuts[k + 1]) for k in range(len(cuts) - 1)]
    if not spans:
        return (0, len(text))
    k = {'première': 0, 'deuxième': 1, 'seconde': 1, 'troisième': 2, 'dernière': len(spans) - 1}.get(which, 0)
    k = min(k, len(spans) - 1)
    return spans[k]


def apply_amendment(disp, base, pos_al):
    """applique les opérations d'un dispositif aux alinéas du texte transmis (numérotation d'origine)"""
    n = len(base)
    st = [dict(text=t, deleted=False, after=[]) for t in base]
    end_ins = []
    log, spans = [], []
    last = pos_al
    gage = False
    for op in split_ops(disp):
        e = dict(texte=op, forme=None, statut='non mécanisé', detail='')
        log.append(e)
        o = op
        if re.search(r"perte de recettes|compensée,? à due concurrence|charge pour l['’]État", o):
            gage = True
            if re.match(r"(?:La|Les) (?:perte|pertes|charge)", o):
                end_ins.append(o)
                e.update(forme='gage', statut='appliqué', detail='clause de compensation, ajoutée à la fin de l’article'); continue
        mN = re.findall(r"alin[ée]as?\s+(\d+)", o)
        nums = [int(x) for x in mN]
        if re.search(r"(?:au |à ce )?même alinéa|aux mêmes alinéas", o) and not nums and last:
            nums = [last]
        if re.search(r"cet alinéa", o) and not nums and pos_al:
            nums = [pos_al]
        # --- article entier
        if re.match(r"Supprimer cet article", o):
            for s in st: s['deleted'] = True
            e.update(forme='supprimer l’article', statut='appliqué'); continue
        if re.match(r"Rédiger ainsi cet article", o):
            for s in st: s['deleted'] = True
            new = all_quoted(o)
            end_ins.extend([q for q in new[:1]])
            e.update(forme='réécrire l’article', statut='appliqué'); continue
        if re.match(r"Compléter (?:cet|ce même|le présent) article", o):
            new = [q for q in all_quoted(o)]
            new = [q for q in new if len(q) > 25] or new
            end_ins.extend(new[:2] if 'deux' in o[:60] else new[:1])
            e.update(forme='compléter l’article', statut='appliqué', detail='gage' if gage else ''); continue
        # --- suppression d'alinéas
        m = re.match(r"(?:En conséquence, )?[Ss]upprimer (?:les alinéas|l['’]alinéa|cet alinéa)\s*([\d ,età]*)", o)
        if m and not re.search(r"les mots|le mot|la référence|la lettre", o):
            rng = m.group(1)
            ks = []
            r2 = re.search(r"(\d+)\s*à\s*(\d+)", rng)
            if r2:
                ks = list(range(int(r2.group(1)), int(r2.group(2)) + 1))
            else:
                ks = [int(x) for x in re.findall(r"\d+", rng)] or nums[:1]
            okk = [k for k in ks if 1 <= k <= n]
            for k in okk:
                st[k - 1]['deleted'] = True
                spans.append(dict(al=k, a=0, b=len(base[k - 1]), whole=True))
            if okk: last = okk[-1]
            e.update(forme='supprimer alinéa(s)', statut='appliqué' if okk else 'échec', detail=', '.join(map(str, okk)))
            continue
        # --- réécrire un alinéa
        m = re.match(r"(?:En conséquence, )?[Rr]édiger ainsi (?:l['’]alinéa (\d+)|cet alinéa)", o)
        if m:
            k = int(m.group(1)) if m.group(1) else pos_al
            q = all_quoted(o)
            txt = q[0] if q else re.sub(r"^.*?:\s*", "", o, count=1)
            if k and 1 <= k <= n:
                st[k - 1]['text'] = txt
                spans.append(dict(al=k, a=0, b=len(base[k - 1]), whole=True)); last = k
                e.update(forme='réécrire l’alinéa', statut='appliqué', detail=str(k))
            else:
                e.update(forme='réécrire l’alinéa', statut='échec', detail='alinéa introuvable')
            continue
        # --- substituer à des alinéas
        m = re.match(r"(?:En conséquence, )?[Ss]ubstituer aux alinéas (\d+) à (\d+)", o)
        if m:
            a1, a2 = int(m.group(1)), int(m.group(2))
            new = all_quoted(o)
            for k in range(a1, a2 + 1):
                if 1 <= k <= n:
                    st[k - 1]['deleted'] = True
                    spans.append(dict(al=k, a=0, b=len(base[k - 1]), whole=True))
            if 1 <= a2 <= n:
                st[a2 - 1]['after'].extend(new)
            last = a2
            e.update(forme='remplacer des alinéas', statut='appliqué', detail=f'{a1} à {a2} → {len(new)}'); continue
        # --- insérer des alinéas
        m = re.match(r"(?:En conséquence, )?[Aa]près l['’]alinéa (\d+), insérer", o)
        if m:
            k = int(m.group(1))
            new = all_quoted(o)
            if not new:
                tail = re.sub(r"^.*?suivants?\s*(?:ainsi rédigés?)?\s*:\s*", "", o, count=1)
                new = [tail] if tail and tail != o else []
            if 1 <= k <= n and new:
                st[k - 1]['after'].extend(new)
                L = len(base[k - 1])
                spans.append(dict(al=k, a=L, b=L, after=True)); last = k
                e.update(forme='insérer des alinéas', statut='appliqué', detail=f'après {k} : {len(new)}')
            else:
                e.update(forme='insérer des alinéas', statut='échec', detail='texte inséré introuvable')
            continue
        # --- compléter un alinéa
        m = re.match(r"(?:En conséquence, )?[Cc]ompléter (?:l['’]alinéa (\d+)|cet alinéa|ce même alinéa)", o)
        if m:
            k = int(m.group(1)) if m.group(1) else (last or pos_al)
            q = all_quoted(o)
            if k and 1 <= k <= n and q:
                t = st[k - 1]['text'].rstrip()
                add = q[0]
                tail = ''
                mm = re.search(r"\s*[;.]\s*»?\s*$", t)
                if mm and 'phrase' in o:
                    st[k - 1]['text'] = t + ' ' + add
                elif mm:
                    cut = mm.start()
                    st[k - 1]['text'] = t[:cut] + (add if add.startswith(',') else ' ' + add) + t[cut:]
                else:
                    st[k - 1]['text'] = t + ' ' + add
                L = len(base[k - 1])
                spans.append(dict(al=k, a=max(0, L - 1), b=L, end=True)); last = k
                e.update(forme='compléter l’alinéa', statut='appliqué', detail=str(k))
            else:
                e.update(forme='compléter l’alinéa', statut='échec', detail='')
            continue
        # --- opérations sur des mots
        targets = nums or ([last] if last else [])
        ph = re.search(r"(première|deuxième|seconde|dernière) phrase", o)
        mins = re.search(r"après (?:(la (?:première|seconde|deuxième) occurrence d[ue] )?(?:le mot|les mots|la référence|la lettre|mot|l['’]année|le taux))\s*:?\s*", o)
        msub = re.search(r"substituer (?:au mot|aux mots|à la lettre|à la référence|à l['’]année|au taux|au nombre|au chiffre)", o, re.I)
        mdel = re.search(r"supprimer (?:le mot|les mots|la référence)", o, re.I)
        mfin = re.search(r"rédiger ainsi la fin de la (première|seconde|dernière) phrase", o)
        q = all_quoted(o)
        done_any, failed = 0, 0
        for k in targets:
            if not (1 <= k <= n):
                failed += 1; continue
            s = st[k - 1]
            zone_a, zone_b = 0, len(s['text'])
            if ph:
                zone_a, zone_b = sentence_bounds(s['text'], ph.group(1))
            zone = s['text'][zone_a:zone_b]
            if mfin and len(q) >= 2:
                sp = find_span(zone, q[0])
                if sp:
                    cut_a = zone_a + sp[1]
                    seg_end = zone_b
                    endp = re.search(r"[.;]\s*$", s['text'][:seg_end])
                    s['text'] = s['text'][:cut_a] + ' ' + q[1] + s['text'][seg_end - (1 if s['text'][seg_end - 1:seg_end] in '.;' else 0):]
                    spans.append(dict(al=k, a=find_span(base[k - 1], q[0])[1] if find_span(base[k - 1], q[0]) else 0, b=len(base[k - 1])))
                    done_any += 1; e['forme'] = 'réécrire la fin d’une phrase'
                else:
                    failed += 1
                continue
            if mins and len(q) >= 2:
                occ = 2 if (mins.group(1) and re.search(r"seconde|deuxième", mins.group(1))) else 1
                sp = find_span(zone, q[0], occ)
                if sp:
                    ins = q[1]
                    a, b = zone_a + sp[0], zone_a + sp[1]
                    glue = '' if ins.startswith((',', '.', ')')) else ' '
                    s['text'] = s['text'][:b] + glue + ins + s['text'][b:]
                    bsp = find_span(base[k - 1], q[0], occ)
                    if bsp: spans.append(dict(al=k, a=bsp[0], b=bsp[1]))
                    done_any += 1; e['forme'] = 'insérer des mots'
                    if sp[2] > occ: e['detail'] = f'{sp[2]} occurrences, la {"1re" if occ == 1 else "2e"} prise'
                else:
                    failed += 1
                continue
            if msub and len(q) >= 2:
                sp = find_span(zone, q[0])
                if sp:
                    a, b = zone_a + sp[0], zone_a + sp[1]
                    s['text'] = s['text'][:a] + q[1] + s['text'][b:]
                    bsp = find_span(base[k - 1], q[0])
                    if bsp: spans.append(dict(al=k, a=bsp[0], b=bsp[1]))
                    done_any += 1; e['forme'] = 'remplacer des mots'
                else:
                    failed += 1
                continue
            if mdel and q:
                sp = find_span(zone, q[0])
                if sp:
                    a, b = zone_a + sp[0], zone_a + sp[1]
                    s['text'] = re.sub(r"\s{2,}", " ", s['text'][:a] + s['text'][b:])
                    bsp = find_span(base[k - 1], q[0])
                    if bsp: spans.append(dict(al=k, a=bsp[0], b=bsp[1]))
                    done_any += 1; e['forme'] = 'supprimer des mots'
                else:
                    failed += 1
                continue
            failed += 1
        if targets:
            last = targets[-1]
        if done_any and not failed:
            e['statut'] = 'appliqué'
        elif done_any:
            e['statut'] = 'partiel'
        elif targets and (mins or msub or mdel or mfin):
            e['statut'] = 'échec'; e['forme'] = e['forme'] or 'mots'
            e['detail'] = 'mots cités introuvables dans l’alinéa'
        if 'procéder aux mêmes' in o:
            e.update(statut='non mécanisé', detail='« procéder aux mêmes substitutions »')
    rows = []
    for i, s in enumerate(st):
        ref = base[i]
        if s['deleted']:
            rows.append(dict(o=i + 1, t=None))
        else:
            rows.append(dict(o=i + 1, t=None if s['text'] == ref else s['text']))
        for x in s['after']:
            rows.append(dict(o=None, at=i + 1, t=x))
    for x in end_ins:
        rows.append(dict(o=None, at=n, t=x, fin=True))
    # ne garder que ce qui change, avec l'indication de la place
    changed = [r for r in rows if r.get('o') is None or r['t'] is not None or (r.get('o') and st[r['o'] - 1]['deleted'])]
    for r in changed:
        if r.get('o') and st[r['o'] - 1]['deleted']:
            r['del'] = True
    ok = sum(1 for x in log if x['statut'] == 'appliqué')
    statut = 'appliqué' if log and ok == len(log) else ('partiel' if ok else 'non mécanisé')
    return dict(rows=changed, ops=log, statut=statut, spans=spans, gage=gage)


def mode_of(disp, pos, applied):
    if not disp:
        return 'inconnu'
    d = disp.strip()
    if re.match(r"Supprimer cet article", d): return 'supprimer-article'
    if re.match(r"Rédiger ainsi cet article", d): return 'rediger-article'
    if pos is None and not re.search(r"alinéa", d[:80]): return 'hors-texte'
    if re.match(r"(?:I\. – )?Supprimer (?:les alinéas|l['’]alinéa|cet alinéa)", d): return 'supprimer'
    if re.match(r"(?:I\. – )?Après l['’]alinéa", d): return 'inserer'
    if re.match(r"(?:I\. – )?Compléter l['’]alinéa", d): return 'completer'
    return 'rediger'


def al_of(position):
    a = position.get('alinea') if position else None
    if not a: return None, None
    m = re.search(r"(\d+)", a)
    return (int(m.group(1)) if m else None), ('apres' if a.lower().startswith('après') else 'sur')


GNAME = {k: v for k, v in com['groupes_fictifs'].items()}

amds = []
for a in com['amendements']:
    num = a['num']
    disp = a['dispositif']
    recup = False
    if not disp and num in irr:
        disp = irr[num]['dispositif_avant_irrecevabilite']
        recup = True
    al, rel = al_of(a['position'])
    inst = INST.get(a['auteur']) if a['groupe'] == 'Rapporteur' else None
    g = a['groupe'] if a['groupe'] != 'Rapporteur' else None
    gname = GNAME.get(g) if g else None
    ap = apply_amendment(disp, TRANSMIS, al) if disp else dict(rows=[], ops=[], statut='non mécanisé', spans=[], gage=False)
    md = mode_of(disp, al, ap)
    if md == 'hors-texte':
        ap = dict(rows=[], ops=[], statut='hors texte', spans=[], gage=bool(disp and re.search('perte de recettes', disp)))
    r = rap.get(num, {})
    v = vers.get(num)
    exp = scrub(a['expose'] or (irr.get(num, {}).get('expose_avant')), gname)
    redac = bool(exp and re.search(r"rédactionnel|de coordination|de précision", exp, re.I) and inst)
    amds.append(dict(
        id=num, num=num, org=num[:2], groupe=g, inst=inst['inst'] if inst else None,
        auteur=a['auteur'], cosign=a['nb_cosignataires'] or 0,
        cible=dict(label=a['position']['alinea'] or ('Article 4' if md in ('supprimer-article', 'rediger-article') else 'Article 4 (hors du texte)'), al=al, rel=rel),
        mode=md, dispositif=scrub(disp, gname), recupere=recup, expose=exp, cartouche=a['cartouche'],
        etat=a['etat'], sousEtat=a['sous_etat'], sort=a['sort'], depot=a['date_depot'], dateSort=a['date_sort'],
        dc=a['discussion_commune'], dcPos=a['position_dans_dc'], ident=a['identiques'], sousDe=None,
        rect=a['rectification'], tri=a['tri'],
        avis=r.get('avis_rapporteur'), suivantAvis=r.get('suivant_avis'),
        versions=[dict(date=x[0], etat=x[1], sort=x[2], rect=x[3], champs=x[4]) for x in (v['versions'] if v else [])],
        applique=dict(statut=ap['statut'], ops=ap['ops'], rows=ap['rows']), spans=ap['spans'], gage=ap['gage'], redactionnel=redac,
        sa=a['sous_amendement_de']))
uid2num = {a['uid']: a['num'] for a in com['amendements']}
for x, a in zip(amds, com['amendements']):
    if a['sous_amendement_de']:
        x['sousDe'] = uid2num.get(a['sous_amendement_de'])
    x.pop('sa', None)

# ordres : dépôt (numéro), texte (clé de tri de la liasse)
for k, x in enumerate(sorted(amds, key=lambda z: (z['org'] != 'CE', int(re.sub(r"\D", "", z['num']) or 0)))):
    x['ordreDepot'] = k + 1
for k, x in enumerate(sorted(amds, key=lambda z: z['tri'] or 'zz')):
    x['ordreTexte'] = k + 1

# ---------------------------------------------------------------- épisodes de commission
EPIS = []
byid = {x['num']: x for x in amds}
for k, e in enumerate(cm['episodes']):
    tombes = []
    decs = []
    for d in e['decisions']:
        txt = scrub(d['txt'])
        decs.append(dict(txt=txt, ams=d['ams']))
    paroles = [dict(nom=p['nom'], groupe=p['groupe'], role=p['role'], mots=p['mots'],
                    txt=scrub(p['txt'], GNAME.get(p['groupe']) if p['groupe'] else None)) for p in e['paroles']]
    EPIS.append(dict(id=f"ep{k+1}", place=k + 1, titre=e['titre'], ams=e['ams'], paroles=paroles, decisions=decs,
                     mots=sum(p['mots'] for p in e['paroles'])))
    for num in e['ams']:
        if num in byid:
            byid[num]['ordreAppel'] = k + 1
            byid[num]['episode'] = f"ep{k+1}"
    # chutes : « En conséquence, les amendements … tombent » → reliés aux adoptés de l'épisode
    adopted = [n for d in e['decisions'] for n in re.findall(r"(C[EF]\d+)", d['txt']) if re.search(r"adopte", d['txt']) and not re.search(r"rejette", d['txt'])]
    adopted = [n for n in adopted if byid.get(n, {}).get('sort') == 'Adopté'] or [n for n in e['ams'] if byid.get(n, {}).get('sort') == 'Adopté']
    for d in e['decisions']:
        if re.search(r"tombe", d['txt']):
            for n in re.findall(r"(C[EF]\d+)", d['txt']):
                if n in byid and byid[n]['sort'] == 'Tombé':
                    byid[n]['tombePar'] = adopted[:3]
                    byid[n]['ordreAppel'] = byid[n].get('ordreAppel', k + 1)
                    byid[n].setdefault('episode', f"ep{k+1}")
                    byid[n]['chuteDans'] = f"ep{k+1}"
    # retraits « au profit de »
    for p in e['paroles']:
        m = re.search(r"[Jj]e retire (?:mon |l['’])amendement (C[EF]\d+) au profit d[ue] (?:l['’]amendement )?(C[EF]\d+)", p['txt'])
        if m and m.group(1) in byid:
            byid[m.group(1)]['retireAuProfit'] = m.group(2)

# tombés sans épisode : chute dans la discussion commune quand une rédaction passe
for x in amds:
    if x['sort'] == 'Tombé' and not x.get('tombePar') and x['dc']:
        win = [y['num'] for y in amds if y['dc'] == x['dc'] and y['sort'] == 'Adopté']
        if win:
            x['tombePar'] = win[:3]

# ---------------------------------------------------------------- provenance du texte de la commission (AN)
line_of = {}
for li, ln in enumerate(lines):
    for k, v in ln.items():
        line_of[(k, v)] = li
prov_an = []
adopted = [x for x in amds if x['sort'] == 'Adopté']
for j, t in enumerate(ANCOM):
    li = line_of.get(('AN-com', j))
    ti = lines[li].get('transmis') if li is not None else None
    if ti is not None and nrm(TRANSMIS[ti]) == nrm(t):
        prov_an.append(dict(etape='inchangé', amendements=[]))
        continue
    cands = []
    for x in adopted:
        for r in x['applique']['rows']:
            if r.get('t') and sim(r['t'], t) > 0.8 and ((ti is not None and r.get('o') == ti + 1) or r.get('o') is None):
                cands.append(x['num']); break
    if not cands and ti is not None:
        cands = [x['num'] for x in adopted if any(s['al'] == ti + 1 for s in x['spans'])]
    prov_an.append(dict(etape='commission (AN)' if cands else ('retouché sans amendement nommé' if ti is not None else 'nouveau sans amendement nommé'),
                        amendements=[dict(num=n, groupe=byid[n]['groupe'], inst=byid[n]['inst'], sort='Adopté') for n in dict.fromkeys(cands)]))

# survie : où vit un amendement adopté dans le texte de la commission
for j, p in enumerate(prov_an):
    for a in p['amendements']:
        byid[a['num']].setdefault('survie', []).append(j + 1)

# ---------------------------------------------------------------- thèmes
THEMES = [
    dict(id='famille', label='Louer à sa famille', src='déclaré', doc="rapport, partie C : « la possibilité de louer à un membre de sa famille »",
         rx=r"parent ou (?:un )?allié|membre de sa famille|cercle familial|ascendant"),
    dict(id='scpi', label='Les SCPI', src='déclaré', doc="rapport, partie C : « une clarification du cadre pour les SCPI »",
         rx=r"placement immobilier|SCPI|alinéas? 6 à 9|alinéas? 7 et 8"),
    dict(id='neuf', label='Réhabilité à neuf : du j au i', src='déclaré', doc="rapport, partie VI : « basculer du j) au i) … les logements anciens réhabilités à neuf »",
         rx=r"concourant à la production ou à la livraison|achèvement"),
    dict(id='seuil', label='Le seuil de travaux', src='déclaré', doc="rapport, partie B : « un assouplissement des conditions liées aux travaux »",
         rx=r"\d+\s*%\s*du prix d['’]acquisition|montant des travaux|quotité de travaux"),
    dict(id='dpe', label='La performance énergétique', src='calculé', doc="mots-clés : classe, performance énergétique",
         rx=r"classe [A-G]\b|«\s*[A-G]\s*»|performance énergétique|diagnostic de performance"),
    dict(id='fossile', label='Les chaudières fossiles', src='calculé', doc="mots-clés : chaudière, combustibles fossiles",
         rx=r"chaudière|combustibles fossiles"),
    dict(id='plafond', label='Plafonds, taux et durées', src='calculé', doc="mots-clés : neuf → douze, taux, montant, deux logements par foyer",
         rx=r"«\s*neuf\s*»|le taux\s*:|le montant\s*:|le chiffre\s*:|deux logements par foyer|six ou"),
    dict(id='maisons', label='Maisons et bâtiments collectifs', src='déclaré', doc="rapport, partie A : « l'ouverture aux maisons individuelles »",
         rx=r"bâtiment d['’]habitation collectif|habitations individuelles|ensemble immobilier"),
    dict(id='supprimer', label="Supprimer l'article", src='calculé', doc="mode : suppression ou réécriture de l'article entier",
         rx=None),
]
for th in THEMES:
    ids = []
    for x in amds:
        if th['id'] == 'supprimer':
            if x['mode'] in ('supprimer-article', 'rediger-article'):
                ids.append(x['num'])
            continue
        t = (x['dispositif'] or '')
        t = re.split(r"perte de recettes", t)[0]
        whole = ' '.join(TRANSMIS[s_['al'] - 1] for s_ in x['spans'] if s_.get('whole') and 1 <= s_['al'] <= len(TRANSMIS))
        if re.search(th['rx'], t, re.I) or (whole and re.search(th['rx'], whole, re.I)):
            ids.append(x['num'])
    th['amendements'] = ids
    th.pop('rx', None)

commentaire = cm['commentaire']
COMMENT = dict(intitule=scrub(commentaire['article']), statut=commentaire['statut'], encadre=[scrub(t) for t in commentaire['encadre']],
               plan=[scrub(p[1]).capitalize() for p in commentaire['plan']], position=[scrub(t) for t in commentaire['position_commission']])

# ---------------------------------------------------------------- plan du projet de loi
rows = load('an-commission-logement-amendements-rapport.json')['donnees']
cnt = C.defaultdict(C.Counter)
for r in rows:
    art = (r['article'] or '').replace('Article ', '').replace('PREMIER', '1er').strip()
    cnt[art][r['sous_etat'] or r['etat_od'] or '?'] += 1
PLAN = []
for y in load('an-commission-logement-commentaires.json')['donnees']:
    m = re.match(r"Article (\S+(?: bis| ter)?)\s*(.*)", y['article'])
    num = m.group(1) if m else y['article']
    rest = scrub(m.group(2) if m else '')
    cible = re.match(r"\(([^)]*)\)\s*(.*)", rest) or (re.match(r"\((.*)()$", rest) if rest.startswith("(") else None)
    PLAN.append(dict(num=num, intitule=cible.group(2) if cible else rest, cible=cible.group(1) if cible else '', statut=y['statut'],
                     amendements=dict(cnt.get(num, {})), n=sum(cnt.get(num, {}).values())))

# ---------------------------------------------------------------- code : article 31 du CGI
cgi = load('legifrance-cgi31-art4-applique.json')
CODE = dict(article="Article 31 du code général des impôts, 1° du I", lettres=list(cgi['avant'].keys()),
            avant=cgi['avant'], apresCommission=cgi['apres'], instructionsCommission=cgi['instructions'])

# ---------------------------------------------------------------- groupes
GROUPS = {
    'PR': dict(name='Progrès républicain', color='#c07a00'), 'SOL': dict(name='Solidarité et logement', color='#d13a30'),
    'ECO': dict(name='Écologie urbaine', color='#2a9d63'), 'UT': dict(name='Union des territoires', color='#3b82d6'),
    'LL': dict(name='Libertés locales', color='#e0671d'), 'RC': dict(name='Rassemblement des communes', color='#7c5cd6'),
    'DC': dict(name='Démocratie communale', color='#2bb3b1'), 'AR': dict(name='Avenir rural', color='#8fae3a'),
    'CP': dict(name='Centre et progrès', color='#d8699a'), 'NV': dict(name='Nouvelle voie', color='#a3833f'),
    'RS': dict(name='Renouveau social', color='#b0485f'), 'NI': dict(name='Non-inscrits', color='#8c8c8c'),
}
INSTITUTIONS = {
    'rapporteure': dict(name='La rapporteure', sub='commission des affaires économiques', color='#3d3a33', auteur='Ollivier-Hamadi'),
    'rapporteur-avis': dict(name='Le rapporteur pour avis', sub='commission des finances', color='#5b5446', auteur='Guérin-Marchal'),
}

DATA = dict(
    dossier=dict(titre='Projet de loi relatif à la relance et à la décentralisation du logement', uid='DLR5L17N54608',
                 lecture='1re lecture à l’Assemblée nationale (après le Sénat)',
                 commission='Commission des affaires économiques, 16–22 septembre 2026 (réunion du 21 septembre pour l’article 4)',
                 seance='Séance publique du 16 au 20 novembre 2026', delai='Délai de dépôt en séance : 12 novembre 2026 (estimé, non publié en données)'),
    article=dict(num='Article 4', cible='article 31 du code général des impôts', intitule=COMMENT['intitule']),
    etapes=ETAPES, lignes=lines, provSenat=prov_sen, provAN=prov_an,
    amendements=amds, episodes=EPIS, themes=THEMES, commentaire=COMMENT, plan=PLAN, code=CODE,
    groupes=GROUPS, institutions=INSTITUTIONS,
    sources="Open data de l’Assemblée nationale et du Sénat, Tricoteuses (historique, irrecevables), code consolidé ; extraits du canal 1. Groupes et personnes fictifs ; textes, sorts et dates réels.",
)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, 'w', encoding='utf-8') as f:
    f.write('/* Généré par outils/construire_donnees.py — ne pas éditer à la main. */\n')
    f.write('window.DATA=' + json.dumps(DATA, ensure_ascii=False, separators=(',', ':')) + ';\n')

# ---------------------------------------------------------------- bilan
st = C.Counter(x['applique']['statut'] for x in amds)
print('amendements', len(amds), dict(st))
print('lignes', len(lines), 'étapes', [len(e['alineas']) for e in ETAPES])
print('épisodes', len(EPIS), 'thèmes', [(t['id'], len(t['amendements'])) for t in THEMES])
print('provenance AN', C.Counter(p['etape'] for p in prov_an))
print('taille', os.path.getsize(OUT) // 1024, 'Ko')
