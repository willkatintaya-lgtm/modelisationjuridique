"""Statistiques globales sur l'aplati an-global_aplatir.py. Usage : python3 -I an-global_stats.py all.jsonl ref.json sortie.json"""
import json, sys, collections as C, datetime as D, statistics as ST, re
R = [json.loads(l) for l in open(sys.argv[1])]
ref = json.load(open(sys.argv[2])); ORG = ref['org']
titres = json.load(open(sys.argv[1] + '.titres.json'))
OUT = {}
def lieu(r): return 'seance' if r['org_ex'] == 'AN' else 'commission'
def issue(r):
    e, s = r['etat'], r['setat']
    if e in ('Irrecevable', 'Irrecevable 40'): return 'irrecevable'
    if e == 'Retiré': return 'retire_avant_discussion'
    if e in ('En traitement', 'A discuter'): return 'en_attente'
    return {'Adopté': 'adopte', 'Rejeté': 'rejete', 'Tombé': 'tombe', 'Non soutenu': 'non_soutenu', 'Retiré': 'retire_en_discussion'}.get(s, str(s))
PROC = {'Proposition de loi ordinaire': 'PPL', "Projet de loi de finances de l'année": 'PLF', 'Projet de loi ordinaire': 'PJL',
        'Projet de loi de financement de la sécurité sociale': 'PLFSS', 'Projet ou proposition de loi constitutionnelle': 'Constit.',
        'Projet ou proposition de loi organique': 'Organique', 'Projet de loi de finances rectificative': 'PLFR', 'Résolution': 'Résolution',
        'Projet de loi relative aux résultats de la gestion et portant approbation des comptes': 'Règlement', None: '?'}
for r in R:
    for k in ('ddep','dpub','dsort','groupe','auteur','parent','di','dc','seance'):
        if isinstance(r.get(k), dict): r[k] = None
for r in R: r['P'] = PROC.get(r['proc'], r['proc']); r['L'] = lieu(r); r['I'] = issue(r)
def tab(key, sub=None):
    t = C.defaultdict(C.Counter)
    for r in R:
        if sub and not sub(r): continue
        t[key(r)][r['I']] += 1
    res = {}
    for k, c in sorted(t.items(), key=lambda x: -sum(x[1].values())):
        n = sum(c.values()); disc = n - c['irrecevable'] - c['en_attente'] - c['retire_avant_discussion']
        res[str(k)] = dict(n=n, **dict(c), pct_irrecevable=round(100 * c['irrecevable'] / n, 1),
                           pct_adopte_sur_depose=round(100 * c['adopte'] / n, 1),
                           pct_adopte_sur_examine=round(100 * c['adopte'] / disc, 1) if disc else None)
    return res
OUT['total'] = len(R)
OUT['par_type_et_lieu'] = tab(lambda r: (r['P'], r['L']))
OUT['par_type'] = tab(lambda r: r['P'])
OUT['par_lieu'] = tab(lambda r: r['L'])
OUT['par_auteur'] = tab(lambda r: (r['tauteur'], r['L']))
OUT['par_organe'] = tab(lambda r: r['org_ex'])
OUT['sous_etats_irrecevabilite'] = C.Counter((r['etat'], r['setat'], r['L']) for r in R if r['I'] == 'irrecevable').most_common()
OUT['sous_etats_irrecevabilite'] = [[list(k), v] for k, v in OUT['sous_etats_irrecevabilite']]
OUT['irrecevable_par_type_lieu_soustype'] = {f'{p}|{l}': dict(C.Counter(r['setat'] for r in R if r['I']=='irrecevable' and r['P']==p and r['L']==l).most_common(8)) for p in ['PLF','PLFSS','PPL','PJL','Constit.'] for l in ['seance','commission']}
# en attente : par dossier
att = C.Counter((r['dos'], r['etat']) for r in R if r['I'] == 'en_attente')
OUT['en_attente_top'] = [[d, e, n, titres.get(d, '')[:90]] for (d, e), n in att.most_common(15)]
# groupes
gr = C.defaultdict(C.Counter)
for r in R:
    if r['tauteur'] == 'Député': gr[ORG.get(r['groupe'] or '', {}).get('abr', r['groupe'])][r['I']] += 1
OUT['groupe_issue'] = {k: dict(n=sum(c.values()), **dict(c)) for k, c in sorted(gr.items(), key=lambda x: -sum(x[1].values()))}
# discussions communes / identiques (clé = examen + id)
def clusters(field):
    cl = C.defaultdict(list)
    for r in R:
        if r[field]: cl[(r['examen'], r[field])].append(r)
    sizes = [len(v) for v in cl.values()]
    multi = []
    for v in cl.values():
        gs = {r['groupe'] for r in v if r['tauteur'] == 'Député'}
        multi.append(len(gs))
    big = sorted(cl.items(), key=lambda x: -len(x[1]))[:8]
    hist = C.Counter(min(s, 50) // 1 if s < 10 else (10 if s < 20 else (20 if s < 50 else 50)) for s in sizes)
    return dict(n_grappes=len(cl), n_amdts=sum(sizes), part_amdts=round(100 * sum(sizes) / len(R), 1),
                taille_mediane=ST.median(sizes), taille_max=max(sizes), hist=dict(sorted(hist.items())),
                pct_transpartisan=round(100 * sum(1 for m in multi if m >= 2) / len(multi), 1),
                groupes_moyen=round(ST.mean(multi), 2),
                plus_grosses=[[len(v), v[0]['dos'], titres.get(v[0]['dos'], '')[:70], v[0]['div'], v[0]['d0'][:90], len({r['groupe'] for r in v})] for k, v in big])
OUT['discussions_communes'] = clusters('dc'); OUT['identiques'] = clusters('di')
# adoption : identiques vs isolés (examinés)
def rate(sub):
    xs = [r for r in R if sub(r) and r['I'] in ('adopte', 'rejete', 'tombe', 'non_soutenu', 'retire_en_discussion')]
    return dict(n=len(xs), pct_adopte=round(100 * sum(r['I'] == 'adopte' for r in xs) / max(1, len(xs)), 1))
OUT['taux_adoption_examines'] = {
    'tous': rate(lambda r: True), 'identique': rate(lambda r: r['di']), 'non_identique': rate(lambda r: not r['di']),
    'disc_commune': rate(lambda r: r['dc']), 'hors_disc_commune': rate(lambda r: not r['dc']),
    'gouvernement': rate(lambda r: r['tauteur'] == 'Gouvernement'), 'rapporteur': rate(lambda r: r['tauteur'] == 'Rapporteur'),
    'depute': rate(lambda r: r['tauteur'] == 'Député'),
    'sous_amendement': rate(lambda r: r['parent']), 'rectifie': rate(lambda r: r['rect'] != '0'),
    'gage': rate(lambda r: r['gage']), 'demande_rapport': rate(lambda r: r['rapport']), 'redactionnel': rate(lambda r: r['redac']),
    'suppression_article': rate(lambda r: r['suppart']), 'suppression_alinea': rate(lambda r: r['suppal']),
    'multi_operations': rate(lambda r: r['nops'] >= 2), 'article_additionnel': rate(lambda r: r['art_add'] == 'true'),
    '0_cosignataire': rate(lambda r: r['tauteur']=='Député' and r['ncos'] == 0), '1-9_cosign': rate(lambda r: r['tauteur']=='Député' and 1 <= r['ncos'] < 10),
    '10-49_cosign': rate(lambda r: r['tauteur']=='Député' and 10 <= r['ncos'] < 50), '50+_cosign': rate(lambda r: r['tauteur']=='Député' and r['ncos'] >= 50),
}
OUT['taux_adoption_par_type_lieu_auteur'] = {f'{p}|{l}|{a}': rate(lambda r, p=p, l=l, a=a: r['P'] == p and r['L'] == l and r['tauteur'] == a)
    for p in ['PLF', 'PLFSS', 'PPL', 'PJL', 'Constit.'] for l in ['seance', 'commission'] for a in ['Député', 'Rapporteur', 'Gouvernement']}
# sous-amendements
sa = [r for r in R if r['parent']]
OUT['sous_amendements'] = dict(n=len(sa), pct=round(100 * len(sa) / len(R), 2), auteur=dict(C.Counter(r['tauteur'] for r in sa)),
                               issue=dict(C.Counter(r['I'] for r in sa)), lieu=dict(C.Counter(r['L'] for r in sa)))
par = C.Counter(r['parent'] for r in sa)
OUT['sous_amendements']['parents_distincts'] = len(par); OUT['sous_amendements']['max_sur_un_parent'] = par.most_common(3)
OUT['rectifications'] = dict(C.Counter(r['rect'] for r in R)); OUT['rect_par_auteur'] = {a: round(100*sum(r['rect']!='0' for r in R if r['tauteur']==a)/sum(r['tauteur']==a for r in R),1) for a in ['Député','Rapporteur','Gouvernement']}
# traits textuels
def part(f, sub=lambda r: True):
    xs = [r for r in R if sub(r)]; return round(100 * sum(1 for r in xs if f(r)) / max(1, len(xs)), 1)
OUT['traits'] = {k: {'tous': part(f), **{p: part(f, lambda r, p=p: r['P'] == p) for p in ['PLF', 'PLFSS', 'PPL', 'PJL', 'Constit.']}} for k, f in
    dict(multi_operations=lambda r: r['nops'] >= 2, en_consequence=lambda r: r['conseq'], gage=lambda r: r['gage'], demande_rapport=lambda r: r['rapport'],
         redactionnel=lambda r: r['redac'], suppression_article=lambda r: r['suppart'], suppression_alinea=lambda r: r['suppal'],
         article_additionnel=lambda r: r['art_add'] == 'true', soumis_art40=lambda r: r['art40'] == 'true', cartouche=lambda r: r['cart'],
         sous_amendement=lambda r: bool(r['parent']), rectifie=lambda r: r['rect'] != '0', identique=lambda r: bool(r['di']), disc_commune=lambda r: bool(r['dc'])).items()}
OUT['redactionnel_par_auteur'] = {a: part(lambda r: r['redac'], lambda r, a=a: r['tauteur'] == a) for a in ['Député', 'Rapporteur', 'Gouvernement']}
OUT['nops_hist'] = dict(sorted(C.Counter(min(r['nops'], 10) for r in R).items()))
OUT['cosign_hist'] = dict(sorted(C.Counter(0 if r['ncos']==0 else 1 if r['ncos']<5 else 5 if r['ncos']<10 else 10 if r['ncos']<30 else 30 if r['ncos']<60 else 60 for r in R if r['tauteur']=='Député').items()))
# déclaré vs portée
dv = [r for r in R if r['decl'] and r['cited']]
OUT['decl_vs_portee'] = dict(n=len(dv), seul_declare=sum(1 for r in dv if r['cited'] == [r['decl']]),
                             declare_plus_autres=sum(1 for r in dv if r['decl'] in r['cited'] and len(r['cited']) > 1),
                             declare_absent=sum(1 for r in dv if r['decl'] not in r['cited']),
                             sans_alinea_declare=sum(1 for r in R if not r['decl']))
OUT['div_type'] = dict(C.Counter(r['div_type'] for r in R))
# longueurs
for k in ['dl', 'el']:
    xs = sorted(r[k] for r in R); OUT['longueur_' + k] = dict(med=xs[len(xs)//2], p90=xs[int(.9*len(xs))], p99=xs[int(.99*len(xs))], max=xs[-1], zero=sum(1 for x in xs if x == 0))
# top dossiers
dc = C.Counter(r['dos'] for r in R)
OUT['top_dossiers'] = []
for d, n in dc.most_common(25):
    xs = [r for r in R if r['dos'] == d]; ci = C.Counter(r['I'] for r in xs)
    OUT['top_dossiers'].append(dict(dos=d, titre=titres.get(d, '')[:100], P=xs[0]['P'], n=n, seance=sum(r['L'] == 'seance' for r in xs),
        textes=len({r['texte'] for r in xs}), **{k: ci[k] for k in ['adopte', 'rejete', 'tombe', 'non_soutenu', 'irrecevable', 'en_attente']}))
OUT['n_dossiers'] = len(dc); 
sz = sorted(dc.values()); OUT['dossiers_taille'] = dict(med=sz[len(sz)//2], p90=sz[int(.9*len(sz))], n_sup_1000=sum(1 for x in sz if x>1000), n_inf_10=sum(1 for x in sz if x<10), part_top10=round(100*sum(sz[-10:])/len(R),1))
# temporalité : mois de dépôt
OUT['depots_par_mois'] = dict(sorted(C.Counter((r['ddep'] or '')[:7] for r in R).items()))
# délai dépôt -> premier sort de l'examen (proxy du délai limite)
first = {}
for r in R:
    if r['dsort']: first[r['examen']] = min(first.get(r['examen'], r['dsort'][:10]), r['dsort'][:10])
dd = C.Counter()
for r in R:
    if r['ddep'] and r['examen'] in first:
        k = (D.date.fromisoformat(first[r['examen']]) - D.date.fromisoformat(r['ddep'])).days
        dd[max(-5, min(k, 30))] += 1
OUT['jours_entre_depot_et_premier_sort_de_l_examen'] = dict(sorted(dd.items()))
OUT['jours_depot_seance_vs_commission'] = {}
for l in ['seance', 'commission']:
    c = C.Counter()
    for r in R:
        if r['L'] == l and r['ddep'] and r['examen'] in first:
            c[max(-5, min((D.date.fromisoformat(first[r['examen']]) - D.date.fromisoformat(r['ddep'])).days, 30))] += 1
    OUT['jours_depot_seance_vs_commission'][l] = dict(sorted(c.items()))
# vitesse : sorts horodatés en séance
ts = C.defaultdict(list)
for r in R:
    if r['dsort'] and r['I'] in ('adopte', 'rejete', 'tombe', 'non_soutenu', 'retire_en_discussion'):
        ts[r['L']].append(D.datetime.fromisoformat(r['dsort']))
vit = {}
for l, v in ts.items():
    h = C.Counter(t.replace(minute=0, second=0) for t in v)
    xs = sorted(h.values()); vit[l] = dict(heures_actives=len(xs), med_par_heure=xs[len(xs)//2], p90=xs[int(.9*len(xs))], max=xs[-1],
        heure_max=str(max(h, key=h.get)), heure_du_jour=dict(sorted(C.Counter(t.hour for t in v).items())),
        meme_seconde=sum(c - 1 for c in C.Counter(v).values() if c > 1), jours_semaine=dict(sorted(C.Counter(t.strftime('%a') for t in v).items())))
OUT['vitesse_sorts'] = vit
# même seconde : tombés en cascade ?
sec = C.Counter((r['examen'], r['dsort']) for r in R if r['dsort'])
OUT['grappes_meme_seconde'] = dict(n=sum(1 for c in sec.values() if c > 1), plus_grosse=sec.most_common(1)[0][1])
# hors délai, art99
OUT['art99'] = dict(n=sum(r['art99'] == 'true' for r in R), issue=dict(C.Counter(r['I'] for r in R if r['art99'] == 'true')), auteur=dict(C.Counter(r['tauteur'] for r in R if r['art99'] == 'true')))
OUT['hors_delai_accord'] = sum(r['hd'] == 'Accord' for r in R)
OUT['codes_vises_top'] = C.Counter(r['loi'] for r in R if r['loi']).most_common(20)
OUT['part_code_vise'] = part(lambda r: bool(r['loi']))
json.dump(OUT, open(sys.argv[3], 'w'), ensure_ascii=False, indent=1, default=str)
print('ok')
