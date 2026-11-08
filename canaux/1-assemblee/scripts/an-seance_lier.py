"""Relie scrutins publics <-> résultats dans le compte rendu <-> uid d'amendement. Partie 1 : appariement par séance (seanceRef) + pour/contre + numéro cité dans « Je mets aux voix ». Partie 2 : (numéro du texte cité dans bibard, numéro d'amendement du titre) -> uid dans all.jsonl, repli sur (date du sort, numéro).
Entrées (chemins relatifs au scratchpad) : raw-an-seance/scr.jsonl, raw-an-seance/cr_all.jsonl, raw-an-global/all.jsonl. Sorties : raw-an-seance/scr_cr.json, scr_cr_am.json, amlinks.json.
Lancer depuis le scratchpad : python3 -I an-seance_lier.py"""
# ---- partie 1
import json, collections as C, re
S=[json.loads(l) for l in open('raw-an-seance/scr.jsonl')]
byse=C.defaultdict(list)
for s in S: byse[s['seance']].append(s)
R=C.defaultdict(list); prev=None; ctx={}; curcr=None
for l in open('raw-an-seance/cr_all.jsonl'):
    p=json.loads(l)
    if p['cr']!=curcr: ctx={}; curcr=p['cr']
    for k in ('bibard','art','adt'):
        if p[k]: ctx[k]=p[k]
    if p['texte'].startswith('Voici le résultat du scrutin') or ('Voici le résultat du scrutin' in p['texte'] and p['tag']=='paragraphe'):
        m=re.search(r'Pour l.adoption\s*(\d+)\s*Contre\s*(\d+)', p['texte']); v=re.search(r'votants\s*(\d+)',p['texte'])
        R[p['seance']].append(dict(code=p['code'],adt=ctx.get('adt'),ssadt=p['ssadt'],bibard=ctx.get('bibard'),art=ctx.get('art'),p1=p['p1'],cr=p['cr'],ordre=int(p['ordre'] or 0),
            pour=int(m.group(1)) if m else None, contre=int(m.group(2)) if m else None, votants=int(v.group(1)) if v else None, mav=prev))
    if p['texte'].startswith('Je mets aux voix') or p['texte'].startswith('Je vais maintenant mettre aux voix'): prev=p['texte'][:200]
ok=bad=0; nse=0; out=[]
for se,L in byse.items():
    L.sort(key=lambda s:s['num']); r=R.get(se,[])
    # greedy match on pour/contre in order
    j=0
    for s in L:
        k=j
        ns=[str(x) for x in s['nums']]
        def good(x):
            if not (x['pour']==s['pour'] and x['contre']==s['contre']): return False
            if ns and x['mav']: return any(re.search(r'\b'+n+r'\b', x['mav']) for n in ns)
            return True
        while k<len(r) and not good(r[k]): k+=1
        if k>=len(r):
            k=j
            while k<len(r) and not (r[k]['pour']==s['pour'] and r[k]['contre']==s['contre']): k+=1
        if k<len(r): s['cr']=r[k]; j=k+1; ok+=1
        else: s['cr']=None; bad+=1
    out+=L
print('match',ok,'non',bad, 'seances scr',len(byse),'seances avec resultats',len(R), 'resultats cr', sum(len(v) for v in R.values()))
print(C.Counter(s['objet'] for s in out if s['cr'] is None))
json.dump(out, open('raw-an-seance/scr_cr.json','w'), ensure_ascii=False)
# ---- partie 2

A=C.defaultdict(list); D=C.defaultdict(list)
for l in open('raw-an-global/all.jsonl'):
    a=json.loads(l)
    if not a['texte']: continue
    td=re.sub(r'^\D*?(\d+)$', r'\1', re.sub(r'^PRJL|^PION|ANR5L17|B|TC|TA|P','',a['texte']))
    m=re.match(r'.*?(\d+)$', a['texte']); td=str(int(m.group(1))) if m else None
    A[(td, a['num'].split(' ')[0])].append(a)
    if a['dsort']: D[(a['dsort'][:10], re.sub(r'^I+-','',a['num'].split(' ')[0]))].append(a)
S=json.load(open('raw-an-seance/scr_cr.json'))
st=C.Counter(); amlinks=[]
for s in S:
    if s['objet'] not in ('amendement','sous-amendement') or not s['cr']: s['am']=None; continue
    r=s['cr']; bib=[str(int(x)) for x in re.findall(r'\d+', r['bibard'] or '')]
    num=str(s['nums'][0]) if s['nums'] else (r['ssadt'] if s['objet']=='sous-amendement' and r['ssadt'] else r['adt']) or (str(s['nums'][0]) if s['nums'] else '')
    num=num.split(',')[0].strip()
    cand=[]
    for td in bib:
        for pre in ('', 'I-', 'II-'):
            cand+=A.get((td, pre+num), [])
    if not cand and s['nums']:
        cand+=[a for a in D.get((s['date'], str(s['nums'][0])),[]) if not a['num'][:1].isalpha() or a['num'][:2] in ('I-','II')]
    if False:
        for td in bib:
            for pre in ('', 'I-', 'II-'): cand+=A.get((td, pre+str(s['nums'][0])), [])
    # dedupe by uid, prefer non-commission
    u={a['uid']:a for a in cand}
    if len(u)>1:
        dd=[a for a in u.values() if a['dsort'] and a['dsort'][:10]==s['date']]
        if dd: u={a['uid']:a for a in dd}
    st[len(u) if len(u)<3 else '3+']+=1
    s['am']=list(u)[0] if len(u)==1 else None
    if len(u)==1:
        a=list(u.values())[0]; amlinks.append((s['uid'], a['uid'], a['groupe'], a['auteur'], a['sort'], a['dos'], a['texte']))
print(st)
json.dump(S, open('raw-an-seance/scr_cr_am.json','w'), ensure_ascii=False)
json.dump(amlinks, open('raw-an-seance/amlinks.json','w'))
