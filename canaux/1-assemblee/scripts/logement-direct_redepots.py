"""Redépôts commission -> séance : pour chaque amendement de séance, cherche parmi les amendements
de commission du MÊME auteur (premier signataire) celui dont le dispositif est le plus proche
(même article exigé pour les dispositifs courts ; numéros d'alinéas neutralisés, puisque la numérotation change entre texte déposé et texte de commission).
Usage : python3 -I logement-direct_redepots.py am.jsonl <texte_commission> <texte_seance> [sortie.json]
Classes : identique (>= 0.92), reformule (0.60-0.92), nouveau (< 0.60 ou auteur sans amendement de commission)."""
import json, re, sys, collections, difflib, unicodedata

src, tcom, tsea = sys.argv[1:4]
out = sys.argv[4] if len(sys.argv) > 4 else None

def norm(s):
    s = unicodedata.normalize('NFKC', s or '').lower()
    s = re.sub(r'\b(alin[ée]as?|articles?)\s+[\d\sàaet,]+', r'\1 #', s)   # neutralise les numéros
    s = re.sub(r'\d+', '#', s)
    return re.sub(r'\W+', ' ', s).strip()

com, sea = collections.defaultdict(list), []
for l in open(src):
    a = json.loads(l)
    if a['type_auteur'] != 'Député' or not a.get('dispositif'):
        continue
    a['_n'] = norm(a['dispositif'])
    if a['texte'] == tcom: com[a['auteur']].append(a)
    elif a['texte'] == tsea: sea.append(a)

res, cls, par_sort, par_groupe = [], collections.Counter(), collections.Counter(), collections.defaultdict(collections.Counter)
for a in sea:
    best, r = None, 0.0
    for c in com.get(a['auteur'], []):
        # formules courtes (« Supprimer cet article ») : seulement sur le même article
        if c['div_court'] != a['div_court'] and min(len(a['_n']), len(c['_n'])) < 80: continue
        sm = difflib.SequenceMatcher(None, a['_n'], c['_n'], autojunk=False)
        if sm.real_quick_ratio() < r or sm.quick_ratio() < r: continue
        x = sm.ratio()
        if x > r: best, r = c, x
    k = 'identique' if r >= .92 else 'reformule' if r >= .60 else 'nouveau'
    if not com.get(a['auteur']): k = 'nouveau'
    cls[k] += 1; par_groupe[a['groupe']][k] += 1
    if best and k != 'nouveau':
        par_sort[(k, best.get('sort') or best.get('etat'))] += 1
    res.append(dict(seance=a['num'], uid=a['uid'], auteur=a['auteur'], groupe=a['groupe'], classe=k, ratio=round(r, 3),
                    article_seance=a['div_court'], sort_seance=a.get('sort') or a.get('etat'),
                    commission=best['num'] if best else None, article_commission=best['div_court'] if best else None,
                    sort_commission=(best.get('sort') or best.get('etat')) if best else None,
                    dispositif_seance=a['dispositif'][:600], dispositif_commission=best['dispositif'][:600] if best else None))
print('amendements de séance (députés, dispositif publié) :', len(sea))
print('classes :', dict(cls))
print('sort en commission de l\'original :', sorted(par_sort.items(), key=lambda x: -x[1]))
print('par groupe :', {g: dict(c) for g, c in par_groupe.items()})
if out: json.dump(res, open(out, 'w'), ensure_ascii=False, indent=0)
