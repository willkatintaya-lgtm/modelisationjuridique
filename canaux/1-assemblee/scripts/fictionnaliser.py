"""Rend fictifs les groupes politiques et les personnes d'un extrait JSON réel (règle CLAUDE.md : groupes fictifs).
Usage : python3 -I fictionnaliser.py <table.json> <entree.json|.md|.txt> <sortie>
<table.json> (hors dépôt, fabriquée par --table) : {"groupes": {réel: clé fictive}, "variantes": {...}, "personnes": {nom réel: pseudonyme}}
  python3 -I fictionnaliser.py --table <ref.json> <table.json> [extraits...]   → fabrique la table
Structure, textes juridiques, sorts, dates et organisations non partisanes sont conservés tels quels ;
seuls changent : codes et noms de groupes (champs et texte libre), noms des députés et membres du Gouvernement."""
import json, sys, re, hashlib

FICTIFS = {  # clés compatibles avec la maquette (GROUPS dans index.html), complétées
  'PR': 'Progrès républicain', 'SOL': 'Solidarité et logement', 'ECO': 'Écologie urbaine', 'UT': 'Union des territoires',
  'LL': 'Libertés locales', 'RC': 'Rassemblement des communes', 'DC': 'Démocratie communale', 'AR': 'Avenir rural',
  'CP': 'Centre et progrès', 'NV': 'Nouvelle voie', 'RS': 'Renouveau social', 'NI': 'Non-inscrits'}
PRENOMS = [  # inutilisé (pseudonymes sans prénom, pour éviter les accords faux)
 'Claire', 'Julien', 'Sophie', 'Marc', 'Élise', 'Thomas', 'Nadia', 'Paul', 'Inès', 'Hugo', 'Léa', 'Samuel', 'Anne', 'Yves', 'Lucie', 'Karim']
NOMS = ['Arnaud', 'Bellec', 'Carvalho', 'Delorme', 'Esnault', 'Fournel', 'Guérin', 'Hamadi', 'Isnard', 'Jouve', 'Kervella', 'Lagarde',
        'Marchal', 'Navarro', 'Ollivier', 'Peyrol', 'Quintin', 'Rouvier', 'Sabatier', 'Tessier', 'Vallat', 'Willem', 'Zeller', 'Aubrac']

EXTRA = ['Bruno Retailleau', 'François Bayrou', 'Emmanuel Macron', 'Michel Barnier', 'Sébastien Lecornu', 'Gabriel Attal', 'Élisabeth Borne', 'Gérald Darmanin']  # membres du Gouvernement cités

def pseudo(nom):
    h = int(hashlib.sha1(nom.encode()).hexdigest(), 16)
    return f"{NOMS[(h // 97) % len(NOMS)]}-{NOMS[(h // 9973) % len(NOMS)]}"

def table(ref, out, extraits):
    R = json.load(open(ref)); gps = sorted({v['abr'] for v in R['org'].values() if v['type'] == 'GP'} - {'NI'})
    keys = [k for k in FICTIFS if k != 'NI']
    h = lambda s: hashlib.sha1(('canal1' + s).encode()).hexdigest()
    groupes = dict(zip(sorted(gps, key=h), keys)); groupes['NI'] = 'NI'
    variantes = {}
    for v in R['org'].values():
        if v['type'] == 'GP' and v['abr'] in groupes:
            variantes[v['lib']] = [groupes[v['abr']], 'nom']
            for s in {v.get('abrev') or '', v['abr']}:
                if s: variantes[s] = [groupes[v['abr']], 'sigle']
    if 'LFI-NFP' in groupes: variantes['LFI'] = [groupes['LFI-NFP'], 'sigle']
    if 'UDR' in groupes: variantes['PO847173'] = [groupes['UDR'], 'sigle']  # ancien uid du groupe UDR, absent d'AMO10
    personnes = {n: pseudo(n) for n in R['act'].values()}
    for n in EXTRA: personnes.setdefault(n, pseudo(n))
    for f in extraits:  # orateurs non députés (ministres…)
        for m in re.finditer(r'"orateur": "([^"]+)"', open(f).read()):
            n = re.sub(r'^(M\.|Mme)\s+', '', m.group(1))
            if not n.startswith(('le ', 'la ')) and n not in personnes: personnes[n] = pseudo(n)
    json.dump(dict(groupes=groupes, variantes=variantes, personnes=personnes), open(out, 'w'), ensure_ascii=False, indent=0)
    print(len(groupes), 'groupes', len(variantes), 'variantes', len(personnes), 'personnes')

def appliquer(tab, src, dst):
    T = json.load(open(tab)); G = T['groupes']
    subs = []
    for real, (k, sorte) in sorted(T['variantes'].items(), key=lambda x: -len(x[0])):
        subs.append((re.compile(r'(?<![\w-])' + re.escape(real) + r'(?![\w-])', re.I if sorte == 'nom' else 0), FICTIFS[k] if sorte == 'nom' else k))
    P = T['personnes']; noms = {n.split(' ', 1)[-1]: p for n, p in P.items() if len(n.split(' ', 1)[-1]) >= 4}
    full = re.compile(r'\b(' + '|'.join(re.escape(n) for n in sorted(P, key=len, reverse=True)) + r')\b')
    titre = re.compile(r'\b((?:M\.|Mme|[Mm]onsieur|[Mm]adame|MM\.)\s+)(' + '|'.join(re.escape(n) for n in sorted(noms, key=len, reverse=True)) + r')\b')
    rares = [n for n in noms if len(n) >= 6 and n[0].isupper() and ' ' not in n]
    seul = re.compile(r'\b(' + '|'.join(re.escape(n) for n in sorted(rares, key=len, reverse=True)) + r')\b')
    inv = {v: k for k, v in G.items()}
    for mot, reel in [(r'(?:La France )?[Ii]nsoumis\w*', 'LFI-NFP'), (r'\b[Ss]ocialistes?\b', 'SOC'), (r'\b[Éé]cologistes\b', 'ECOS'), (r'\b[Ll]epénistes?\b|\bRN\b', 'RN'), (r'\b[Mm]acronistes?\b|\b[Ll]a macronie\b', 'EPR')]:
        if reel in G: subs.append((re.compile(mot), FICTIFS[G[reel]]))
    def txt(s):
        for r, v in subs: s = r.sub(v, s)
        s = full.sub(lambda m: P[m.group(1)], s)
        s = titre.sub(lambda m: m.group(1) + noms[m.group(2)], s)
        return seul.sub(lambda m: noms[m.group(1)], s)
    def walk(o, k=None):
        if isinstance(o, dict): return {kk: walk(v, kk) for kk, v in o.items()}
        if isinstance(o, list): return [walk(v, k) for v in o]
        if isinstance(o, str):
            if k == 'groupe': return G.get(o, 'UDR' in G and o == 'PO847173' and G['UDR'] or o)
            return txt(o)
        return o
    if not src.endswith('.json'):  # texte libre (notes .md, sorties .txt)
        open(dst, 'w').write(txt(open(src).read())); return
    x = walk(json.load(open(src)))
    x['groupes_fictifs'] = {k: FICTIFS[k] for k in sorted(set(G.values()))}
    x.setdefault('nota', []).append('Groupes et personnes rendus fictifs (scripts/fictionnaliser.py) ; textes, sorts et dates réels.') if isinstance(x.get('nota', []), list) else None
    json.dump(x, open(dst, 'w'), ensure_ascii=False, indent=1)

if sys.argv[1] == '--table': table(sys.argv[2], sys.argv[3], sys.argv[4:])
else: appliquer(*sys.argv[1:4])
