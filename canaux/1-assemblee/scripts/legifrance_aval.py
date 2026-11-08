"""Relie, pour le dossier narcotrafic, texte de CMP (1277) -> texte adopté définitif (TA 0102)
-> décision du Conseil constitutionnel 2025-885 DC -> loi publiée au JO (JORFTEXT000051734851).

Usage : python3 -I legifrance_aval.py <PIONANR5L17BTC1277.json> <PIONANR5L17BTA0102.json> <cc.txt> <loi_2025_532.json> <sortie.json>
cc.txt : texte brut de https://www.conseil-constitutionnel.fr/decision/2025/2025885DC.htm (balises retirées)
loi_2025_532.json : [{id,num,alineas}] tiré de git.tricoteuses.fr/dila/jorf (voir note legifrance.md)
"""
import json, re, sys, difflib


def norm(s):
    s = s.replace('’', "'").replace('‑', '-').replace(' ', ' ').replace(' ', ' ')
    s = re.sub(r'\s+', ' ', s)
    s = re.sub(r'\s*([.,;:–-])\s*', r'\1', s)
    return s.strip().lower()


def num(a):
    m = re.match(r'Article (\d+)', a.replace('1er', '1'))
    return m.group(1) if m else a


cmp_, ta, cct, loi, out = sys.argv[1:6]
CMP = json.load(open(cmp_, encoding='utf-8'))
TA = json.load(open(ta, encoding='utf-8'))
LOI = {o['num']: o for o in json.load(open(loi, encoding='utf-8'))}
cc = re.sub(r'\s+', ' ', open(cct, encoding='utf-8').read())
dec = cc[cc.find('LE CONSEIL CONSTITUTIONNEL DÉCIDE'):]
a1 = dec[:dec.find('Article 2. -')]
a2 = dec[dec.find('Article 2. -'):dec.find('Article 3. -')]
a3 = dec[dec.find('Article 3. -'):dec.find('Article 4')]

def cites(seg):
    return set(re.findall(r"(?:l’article|de l’article|loi déférée|de cet article|même article) (\d+)(?: er)? (?:de la loi déférée)?", seg)) | \
        set(re.findall(r"l’article (\d+)(?: er)? de la loi déférée", seg)) | set(re.findall(r"article (\d+) ;", seg))

cens_tot = set(re.findall(r"- l’article (\d+) ;", a1))
cens_part = set(re.findall(r"de l’article (\d+)", a1)) - cens_tot
reserves = set(re.findall(r"(?:l’article|des articles?) (\d+)(?: er)? de la loi déférée", a2))
conf = set(re.findall(r"(?:l’article|des articles?) (\d+)(?: er)? de la loi déférée", a3)) | set(re.findall(r"l’article (\d+)(?: er)? de la loi déférée", a3))
examines = set(re.findall(r"Sur (?:certaines dispositions de |la place de )?l’article (\d+)", cc))

ta_txt = {num(a['article']): ' '.join(a['alineas']) for a in TA}
rows = []
# appariement global : scores TA x CMP sur le début du texte, affectation par score décroissant
cmp_n = {c['article']: norm(' '.join(c['alineas']))[:800] for c in CMP}
sc = []
for a in TA:
    t = norm(ta_txt[num(a['article'])])[:800]
    for k, v in cmp_n.items():
        sm = difflib.SequenceMatcher(None, t, v)
        if sm.real_quick_ratio() > 0.5 and sm.quick_ratio() > 0.5:
            sc.append((sm.ratio(), a['article'], k))
sc.sort(reverse=True)
pair, used = {}, set()
for r_, ta_a, k in sc:
    if ta_a not in pair and k not in used:
        pair[ta_a] = (k, r_); used.add(k)
for a in TA:
    n = num(a['article'])
    t = norm(ta_txt[n])
    best, bs = pair.get(a['article'], (None, 0))
    L = LOI.get(n)
    lt = ' '.join(L['alineas']) if L else ''
    sim_loi = round(difflib.SequenceMatcher(None, t[:4000], norm(lt)[:4000]).ratio(), 3) if L else None
    verdict = ('censure totale' if n in cens_tot else 'censure partielle' if n in cens_part else
               'réserve' if n in reserves else 'conforme (examiné)' if n in conf or n in examines else 'non examiné')
    rows.append({'ta': a['article'], 'cmp': best, 'sim_cmp': round(bs, 3), 'loi_jo': L['id'] if L else None,
                 'alineas_ta': len(a['alineas']), 'alineas_jo': len(L['alineas']) if L else None,
                 'sim_ta_jo': sim_loi, 'cc': verdict,
                 'jo_mention_cc': bool(re.search(r'non conformes à la Constitution', lt)),
                 'contexte': a.get('contexte', '')[-100:]})
cmp_orphelins = [c['article'] for c in CMP if c['article'] not in used]
json.dump({'rows': rows, 'cmp_sans_correspondant': cmp_orphelins,
           'cc': {'censure_totale': sorted(cens_tot, key=int), 'censure_partielle': sorted(cens_part, key=int),
                  'reserves': sorted(reserves, key=int), 'examines': sorted(examines, key=int)}},
          open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
from collections import Counter
print(Counter(r['cc'] for r in rows))
print('CMP sans correspondant :', cmp_orphelins)
for r in rows:
    if r['cc'] != 'non examiné' or r['sim_cmp'] < 0.9:
        print(r['ta'], '<-', r['cmp'], r['sim_cmp'], '|', r['cc'], '| JO', r['alineas_jo'], 'al., sim', r['sim_ta_jo'], r['jo_mention_cc'])
