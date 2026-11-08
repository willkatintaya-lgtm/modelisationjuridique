"""Traçabilité naïve : pour chaque amendement adopté, les passages entre guillemets qu'il insère
se retrouvent-ils dans les textes suivants de la navette ? (sans alignement, recherche de sous-chaîne normalisée)
Usage : python3 -I survie.py <am.jsonl> <dossier> <texte1.json> [<texte2.json> ...]"""
import json, sys, re, collections as C
A = [json.loads(l) for l in open(sys.argv[1]) if json.loads(l)['dossier'] == sys.argv[2]]
norm = lambda s: re.sub(r'[^0-9a-zàâçéèêëîïôûùüÿœ]+', ' ', s.lower()).strip()
T = [(f.split('/')[-1][:-5], norm(' '.join(l for a in json.load(open(f)) for l in a['alineas']))) for f in sys.argv[3:]]
def citations(d):  # passages insérés : guillemets après « insérer / rédigé / remplacé par / substituer »
    q = re.findall(r'«\s*([^«»]{25,}?)\s*»', d or '')
    return [norm(x) for x in q if len(norm(x).split()) >= 5]
res = C.Counter(); ex = []
for a in A:
    if a['sous_etat'] != 'Adopté': continue
    cs = citations(a['dispositif'])
    if not cs: res[(a['texte'], 'sans citation longue')] += 1; continue
    c = max(cs, key=len)[:120]
    trace = tuple(int(c in t) for _, t in T)
    res[(a['texte'], trace)] += 1
    if len(ex) < 400: ex.append((a['num'], a['texte'], trace, c[:80]))
print('textes :', [n for n, _ in T])
for k, v in sorted(res.items(), key=str): print(k, v)
json.dump(ex, open('/dev/stdout', 'w'), ensure_ascii=False) if '--ex' in sys.argv else None
