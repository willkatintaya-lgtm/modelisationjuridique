import json, collections as C, re
ref=json.load(open('ref.json')); O=ref['org']
ab=lambda g: (O.get(g) or {}).get('abr', g)
S=json.load(open('raw-an-seance/scr_cr_am.json'))
AM={}
for l in open('raw-an-global/all.jsonl'):
    a=json.loads(l)
    if a['org_ex']=='AN': AM[a['uid']]=a
linked={s['am']:s for s in S if s.get('am')}
# agreement
agree=C.Counter()
for s in S:
    if s.get('am') and s['am'] in AM: agree[(s['sort'], AM[s['am']]['sort'])]+=1
print('accord sort scrutin/amdt', agree.most_common(8))
seance=[a for a in AM.values() if a['sort'] in ('Adopté','Rejeté')]
print('amdts séance avec sort adopté/rejeté', len(seance), 'dont scrutin public', sum(a['uid'] in linked for a in seance))
print('tous amdts séance', len(AM), C.Counter(a['sort'] for a in AM.values()).most_common(8))
# per group of author: share of their discussed amdts that went to scrutin, adoption with/without scrutin
g=C.defaultdict(C.Counter)
for a in seance:
    k=ab(a['groupe']) if a['groupe'] else ('GOUV' if a['gouv'] or a['tauteur']=='Gouvernement' else a['tauteur'])
    sc=a['uid'] in linked; g[k]['n']+=1; g[k]['scr']+=sc; g[k]['ad']+=a['sort']=='Adopté'; g[k]['ad_scr']+=sc and a['sort']=='Adopté'
print('groupe auteur | n votés | au scrutin | adoptés | adoptés au scrutin')
for k,v in sorted(g.items(), key=lambda x:-x[1]['n']): print(f"{k:10s} {v['n']:6d} {v['scr']:5d} ({100*v['scr']/v['n']:.0f}%) {v['ad']:5d} {v['ad_scr']:4d}")
# demandeur vs author group
def dem(s):
    d=s['demandeur'] or ''
    return re.findall(r'groupe "([^"]+)"', d), ('séance' in d), ('Conférence' in d)
same=C.Counter(); dg=C.Counter(); multi=0
for s in S:
    gs,pres,conf=dem(s)
    if len(gs)>1: multi+=1
    for x in gs: dg[x]+=1
    if pres: dg['(président de séance)']+=1
    if conf: dg['(conférence des présidents)']+=1
    if s.get('am') and s['am'] in AM and gs:
        a=AM[s['am']]; lib=(O.get(a['groupe']) or {}).get('lib','')
        same['sur son propre amdt' if any(x==lib for x in gs) else 'sur amdt d\'un autre']+=1
print('demandes multiples', multi); print(dg.most_common(20)); print(same)
