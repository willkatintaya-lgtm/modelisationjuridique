"""Approfondissements : crédits PLF, séries (obstruction), vitesse de séance, sources externes, concentration.
Usage : python3 -I an-global_approfondir.py all.jsonl amendements.zip ref.json sortie.json"""
import json, sys, zipfile, re, html, collections as C, datetime as D, statistics as ST
R = [json.loads(l) for l in open(sys.argv[1])]
for r in R:
    for k in ('ddep','dsort','groupe','auteur','parent','di','dc'):
        if isinstance(r.get(k), dict): r[k] = None
z = zipfile.ZipFile(sys.argv[2]); names = {n.split('/')[-1][:-5]: n for n in z.namelist() if n.endswith('.json')}
ref = json.load(open(sys.argv[3])); ORG = ref['org']; ACT = ref['act']
titres = json.load(open(sys.argv[1] + '.titres.json'))
O = {}
def issue(r):
    e, s = r['etat'], r['setat']
    if e in ('Irrecevable', 'Irrecevable 40'): return 'irrecevable'
    if e == 'Retiré': return 'retire'
    if e in ('En traitement', 'A discuter'): return 'en_attente'
    return s
# 1. crédits
cred = []; prog = C.Counter(); progplus = C.Counter(); progmoins = C.Counter()
for r in R:
    if r['div_type'] != 'ANNEXE': continue
    a = json.loads(z.read(names[r['uid']]))['amendement']
    ca = (a.get('corps') or {}).get('contenuAuteur') or {}
    dd = ca.get('dispositifAmdtCreditPLFR') or ca.get('dispositifAmdtCreditPLF')
    if not isinstance(dd, dict): continue
    ps = (dd.get('listeProgrammes') or {}).get('programme') or []
    if isinstance(ps, dict): ps = [ps]
    moves = []
    for p in ps:
        try:
            ae = int(p.get('autorisationEngagementSupplementaire') or 0) + int(p.get('autorisationEngagementAnnule') or 0) + int(p.get('autorisationEngagement') or 0)
            cp = int(p.get('creditPaiementSupplementaire') or 0) + int(p.get('creditPaiementAnnule') or 0) + int(p.get('creditPaiement') or 0)
        except Exception: continue
        if ae or cp: moves.append((p.get('libelle'), ae, cp, p.get('action')))
    tot_plus = sum(m[2] for m in moves if m[2] > 0); net = sum(m[2] for m in moves)
    for m in moves:
        prog[m[0]] += 1
        (progplus if m[2] > 0 else progmoins)[m[0]] += 1
    cred.append(dict(uid=r['uid'], dos=r['dos'], num=r['num'], groupe=r['groupe'], tauteur=r['tauteur'], issue=issue(r), n=len(moves), cp_deplace=tot_plus, net=net,
                     creation=any(m[3] == 'création' or (m[3] or '').startswith('cr') for m in moves), mission=r['div'], moves=moves[:4]))
O['credits'] = dict(n=len(cred), un_programme_seul=sum(c['n']==1 for c in cred), zero_mouvement=sum(c['n']==0 for c in cred), par_groupe_n=C.Counter(ORG.get(c['groupe'] or '',{}).get('abr') or c['tauteur'] for c in cred).most_common(14), adoption_examines=round(100*sum(c['issue']=='Adopté' for c in cred)/max(1,sum(c['issue'] in ('Adopté','Rejeté','Tombé','Non soutenu','Retiré') for c in cred)),1), n_annexe=sum(r['div_type'] == 'ANNEXE' for r in R),
    n_programmes=C.Counter(min(c['n'], 5) for c in cred), net_nul=sum(c['net'] == 0 for c in cred),
    actions=C.Counter(m[3] for c in cred for m in c['moves']).most_common(5),
    cp_deplace_med=ST.median([c['cp_deplace'] for c in cred if c['cp_deplace']] or [0]),
    cp_deplace_p90=sorted(c['cp_deplace'] for c in cred)[int(.9 * len(cred))] if cred else 0,
    un_euro=sum(1 for c in cred if 0 < c['cp_deplace'] <= 1), cp_hist=C.Counter(len(str(c['cp_deplace'])) for c in cred if c['cp_deplace'] > 0), moins_1M=sum(1 for c in cred if 0 < c['cp_deplace'] < 1_000_000), plus_1Md=sum(1 for c in cred if c['cp_deplace'] >= 1_000_000_000),
    issue=C.Counter(c['issue'] for c in cred), programmes_plus_cites=prog.most_common(12),
    programmes_crediteurs=progplus.most_common(8), programmes_debites=progmoins.most_common(8),
    adoptes_plus_gros=sorted([[c['cp_deplace'], c['num'], c['dos'], c['moves'][:2]] for c in cred if c['issue'] == 'Adopté'], key=lambda x: -x[0])[:5])
json.dump([dict(c, moves=[list(m) for m in c['moves']]) for c in cred if c['issue'] == 'Adopté'][:400], open(sys.argv[4].replace('.json', '-credits-adoptes.json'), 'w'), ensure_ascii=False)
# 2. séries : même auteur, même texte, dispositif identique à des nombres/dates/mots entre guillemets près
def norm(s):
    s = re.sub(r'«[^»]{0,80}»', '«Q»', s); s = re.sub(r'\d+', '#', s); return re.sub(r'\s+', ' ', s)[:140]
ser = C.defaultdict(list)
for r in R:
    if r['d0']: ser[(r['texte'], r['auteur'], norm(r['d0']))].append(r)
big = [v for v in ser.values() if len(v) >= 10]
O['series'] = dict(n_series_10plus=len(big), amdts_en_series=sum(len(v) for v in big), part=round(100 * sum(len(v) for v in big) / len(R), 1),
    plus_grandes=[[len(v), titres.get(v[0]['dos'], '')[:60], ACT.get(v[0]['auteur'], v[0]['auteur']) if False else v[0]['tauteur'], ORG.get(v[0]['groupe'] or '', {}).get('abr'), v[0]['d0'][:110], v[1]['d0'][:110], dict(C.Counter(issue(x) for x in v))] for v in sorted(big, key=len, reverse=True)[:12]],
    par_auteur_type=C.Counter(v[0]['tauteur'] for v in big), par_issue=C.Counter(issue(x) for v in big for x in v))
seriesdos = C.Counter(x['dos'] for v in big for x in v); alld = C.Counter(r['dos'] for r in R)
O['series']['dossiers_les_plus_seriels'] = [[d, titres.get(d, '')[:60], n, alld[d], round(100 * n / alld[d])] for d, n in seriesdos.most_common(10)]
# 3. vitesse séance : écarts entre sorts consécutifs d'un même examen (séance publique), le même jour
gaps = []; perday = C.defaultdict(list)
byex = C.defaultdict(list)
for r in R:
    if r['org_ex'] == 'AN' and r['dsort'] and issue(r) in ('Adopté', 'Rejeté', 'Tombé', 'Non soutenu', 'Retiré'):
        byex[r['examen']].append((D.datetime.fromisoformat(r['dsort']), r))
casc = C.Counter(); casc_ex = []
for ex, v in byex.items():
    v.sort(key=lambda x: x[0])
    for (t1, r1), (t2, r2) in zip(v, v[1:]):
        g = (t2 - t1).total_seconds()
        if 0 <= g < 4 * 3600: gaps.append(g)
    sec = C.defaultdict(list)
    for t, r in v: sec[t].append(r)
    for t, rs in sec.items():
        if len(rs) > 1: casc[tuple(sorted(C.Counter(issue(x) for x in rs)))] += 1
    for t, r in v: perday[(ex, t.date())].append(t)
gaps.sort()
rates = []
for k, ts in perday.items():
    if len(ts) >= 20:
        h = (max(ts) - min(ts)).total_seconds() / 3600
        if h > 0.5: rates.append(len(ts) / h)
rates.sort()
O['vitesse_seance'] = dict(n_ecarts=len(gaps), ecart_median_s=gaps[len(gaps)//2], p25=gaps[len(gaps)//4], p75=gaps[3*len(gaps)//4], p90=gaps[int(.9*len(gaps))],
    part_moins_60s=round(100 * sum(g < 60 for g in gaps) / len(gaps), 1), part_zero=round(100 * sum(g == 0 for g in gaps) / len(gaps), 1),
    amdts_par_heure_par_jour_med=round(rates[len(rates)//2], 1), rph_p10=round(rates[len(rates)//10], 1), rph_p90=round(rates[int(.9*len(rates))], 1), n_journees=len(rates),
    cascades_meme_seconde=[[list(k), n] for k, n in casc.most_common(10)])
# vitesse par dossier (séance)
vd = {}
for d in ['DLR5L17N51670', 'DLR5L17N52428', 'DLR5L17N50169', 'DLR5L17N50588', 'DLR5L17N54085', 'DLR5L16N49868']:
    ts = sorted(t for ex, v in byex.items() for t, r in v if r['dos'] == d)
    days = C.Counter(t.date() for t in ts)
    vd[d] = dict(titre=titres.get(d, '')[:50], sorts=len(ts), jours=len(days), max_jour=max(days.values()) if days else 0)
O['vitesse_par_dossier'] = vd
# 4. sources externes citées dans l'exposé (début seulement : e0 = 160 car.) -> relecture complète sur un échantillon
SRC = re.compile(r"(?:travaillé|rédigé|élaboré|proposé|suggéré|inspiré)[^.]{0,30}(?:avec|par|de) (?:l[ae'’] ?|les )?((?:[A-ZÉ][\w'’\-]+[ ]?(?:de |des |du |d’|d'|pour |la |le |et )?){1,7})")
srcs = C.Counter(); nsrc = 0; nseen = 0
for i, r in enumerate(R):
    if r['el'] == 0 or i % 3: continue
    a = json.loads(z.read(names[r['uid']]))['amendement']
    e = html.unescape(re.sub(r'<[^>]+>', ' ', ((a.get('corps') or {}).get('contenuAuteur') or {}).get('exposeSommaire') or '')).replace('\xa0', ' ')
    nseen += 1
    ms = SRC.findall(e)
    if ms: nsrc += 1
    for m in ms: srcs[m.strip()[:60]] += 1
O['sources_externes'] = dict(echantillon=nseen, avec_mention=nsrc, pct=round(100 * nsrc / nseen, 1), top=srcs.most_common(40))
# 5. concentration des auteurs
au = C.Counter(r['auteur'] for r in R if r['tauteur'] == 'Député'); xs = sorted(au.values(), reverse=True)
O['concentration_auteurs'] = dict(n_auteurs=len(xs), top10_part=round(100 * sum(xs[:10]) / sum(xs), 1), top50_part=round(100 * sum(xs[:50]) / sum(xs), 1), max=xs[0], median=xs[len(xs)//2])
# 6. suppression d'article (regex corrigée)
sa = [r for r in R if re.match(r'\s*Supprimer cet article', r['d0'] or '')]
O['suppression_article'] = dict(n=len(sa), issue=C.Counter(issue(r) for r in sa), identiques=sum(1 for r in sa if r['di']))
# 7. gages : variantes
O['gage_variantes'] = C.Counter(('tabac' if 'tabac' in (r['d0'] or '') else 'autre') for r in R if r['gage']).most_common()
json.dump(O, open(sys.argv[4], 'w'), ensure_ascii=False, indent=1, default=str); print('ok')
