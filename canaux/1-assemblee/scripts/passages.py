"""Reconstruit les « passages disputés » d'un article : chaque opération d'un dispositif est réduite à
(alinéa, ancre) où l'ancre est le mot ou la locution cités (« après le mot : « X » », « les mots : « X » sont remplacés »).
Les passages qui concentrent plusieurs amendements sont les candidats « unités de sens » réelles.
Usage : python3 -I passages.py <extrait.json> [--json sortie.json]"""
import json, sys, re, collections as C
x = json.load(open(sys.argv[1]))
al = x['texte_depose']['alineas']
OPS = re.compile(r'(?:^|\n)\s*(?:[IVX]+\.\s*[–-]\s*)?(?P<op>.*?)(?=\n\s*[IVX]+\.\s*[–-]|\Z)', re.S)
def operations(d):
    return [m.group('op').strip() for m in OPS.finditer(d or '') if m.group('op').strip()]
def cible(op):
    a = re.search(r'alin[ée]as?\s+(\d+)', op); n = int(a.group(1)) if a else None
    if re.match(r'(Supprimer|Rédiger ainsi|Rétablir) cet article', op): return ('article', '∗')
    m = re.search(r'(?:après|avant) (?:le mot|les mots|la référence|la première occurrence du mot|la seconde occurrence du mot|la lettre)\s*:\s*«\s*([^»]{1,60}?)\s*»', op)
    if not m: m = re.search(r'(?:substituer (?:au mot|aux mots|à la lettre|à la référence|à l’année|au taux|au nombre)|supprimer (?:le mot|les mots))\s*:\s*«\s*([^»]{1,60}?)\s*»', op)
    if m: return (n, m.group(1).strip().lower())
    if re.search(r'Supprimer (?:les alinéas|l’alinéa|cet alinéa)', op): return (n, '— suppression d’alinéa')
    if re.search(r'Rédiger ainsi', op): return (n, '— réécriture d’alinéa')
    if re.search(r'insérer (?:l’alinéa|les \w+ alinéas|un alinéa)', op): return (n, '— alinéa inséré après')
    if re.match(r'Compléter', op): return (n, '— complément')
    return (n, '— autre')
P = C.defaultdict(list)
for a in x['amendements']:
    for op in operations(a['dispositif']):
        if re.search(r'perte de recettes|compensée', op): continue  # gage
        P[cible(op)].append(a)
rows = sorted(P.items(), key=lambda kv: -len({a['num'] for a in kv[1]}))
out = []
for (n, anc), v in rows:
    nums = sorted({a['num'] for a in v}); grp = sorted({a['groupe'] for a in v})
    sorts = C.Counter(a['sous_etat'] for a in {a['num']: a for a in v}.values())
    out.append(dict(alinea=n, ancre=anc, nb_amendements=len(nums), groupes=grp, sorts=dict(sorts), amendements=nums,
                    extrait_alinea=(al[n - 1][:160] if isinstance(n, int) and 0 < n <= len(al) else None)))
for r in out[:25]:
    print(f"al.{r['alinea']!s:>7} | {r['ancre'][:40]:40} | {r['nb_amendements']:3} amdts | {len(r['groupes'])} groupes | {r['sorts']}")
print(len(out), 'passages ;', sum(1 for r in out if r['nb_amendements'] >= 3), 'disputés (≥ 3 amendements)')
if '--json' in sys.argv: json.dump(out, open(sys.argv[sys.argv.index('--json') + 1], 'w'), ensure_ascii=False, indent=1)
