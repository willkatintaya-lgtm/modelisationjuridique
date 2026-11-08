"""Instantané « en direct » du dossier logement (DLR5L17N54608) à J-8 de la séance.
Usage : python3 -I logement-direct_instantane.py <scratchpad> <sortie.json>
Lit : am.jsonl, ref.json, raw/ag/json/reunion, raw-logement-direct/{api_*.json, redepots_narco.json, noms_now.tsv}.
Champs « groupe » et « auteur » laissés bruts (à rendre fictifs en aval)."""
import json, os, sys, collections, datetime
S, out = sys.argv[1], sys.argv[2]
D = os.path.join(S, 'raw-logement-direct')
ref = json.load(open(os.path.join(S, 'ref.json')))
ab = lambda g: ref['org'].get(g, {}).get('abr', g)
nom = lambda a: ref['act'].get(a, a)
A = [json.loads(l) for l in open(os.path.join(S, 'am.jsonl'))]
L = [a for a in A if a['texte'] == 'PRJLANR5L17B3058']
srt = lambda a: a.get('sort') or a.get('etat')

# 1. séances prévues (agenda) avec l'historique des points
R = os.path.join(S, 'raw/ag/json/reunion'); seances = []
for f in os.listdir(R):
    r = json.load(open(os.path.join(R, f)))['reunion']
    pts = ((r.get('ODJ') or {}).get('pointsODJ') or {}).get('pointODJ') or []
    if isinstance(pts, dict): pts = [pts]
    if not any((p.get('dossiersLegislatifsRefs') or {}).get('dossierRef') == 'DLR5L17N54608' for p in pts): continue
    if r['timeStampDebut'] < '2026-11': continue
    seances.append(dict(uid=r['uid'], debut=r['timeStampDebut'], organe=r['organeReuniRef'], etat=r['cycleDeVie']['etat'],
                        convocation=((r.get('ODJ') or {}).get('convocationODJ') or {}).get('item'),
                        points=[dict(objet=p.get('objet'), etat=p['cycleDeVie']['etat'], cree=p['cycleDeVie']['chrono']['creation'],
                                     clos=p['cycleDeVie']['chrono']['cloture'],
                                     dossier=(p.get('dossiersLegislatifsRefs') or {}).get('dossierRef')) for p in pts]))
seances.sort(key=lambda x: x['debut'])

# 2. base commission : article x groupe x sort
base = collections.defaultdict(lambda: collections.defaultdict(collections.Counter))
for a in L:
    base[a['div_court']][ab(a['groupe']) if a['groupe'] else a['type_auteur']][srt(a)] += 1
# 3. réservoir de redépôts probables
res = [dict(uid=a['uid'], num=a['num'], article=a['div_court'], alinea=(a.get('alinea') or {}).get('numero'),
            groupe=ab(a['groupe']), auteur=nom(a['auteur']), sort_commission=srt(a), dispositif=(a['dispositif'] or '')[:400])
       for a in L if a['organe_examen'] == 'CION-ECO' and a['type_auteur'] == 'Député'
       and srt(a) in ('Rejeté', 'Non soutenu', 'Retiré', 'Tombé')]
# 4. répétition générale : dérouleur eliasse du texte 1779 (séance du 9 nov.)
der = json.load(open(os.path.join(D, 'api_EXANR5L17PO838901BTC1779P0D1_derouleur.json')))
st = json.load(open(os.path.join(D, 'api_EXANR5L17PO838901BTC1779P0D1_statistiques.json')))
places = [dict(id=p['id'], libelle=p['libelle'], n=len(p.get('amendements') or []),
               identiques=sum(1 for x in p.get('amendements') or [] if x.get('positionDiscussionIdentique')),
               communes=sum(1 for x in p.get('amendements') or [] if x.get('positionDiscussionCommune'))) for p in der['places']]
# 5. narco : redépôts commission -> séance (exemples)
rn = json.load(open(os.path.join(D, 'redepots_narco.json')))
for r in rn: r['groupe'] = ab(r['groupe']); r['auteur'] = nom(r['auteur'])
ex = [r for r in rn if r['classe'] == 'identique'][:25] + [r for r in rn if r['classe'] == 'reformule' and r['ratio'] >= .75][:25]
noms = [l.rstrip('\n').split('\t') for l in open(os.path.join(D, 'noms_now.tsv'))]
json.dump(dict(
    genere=datetime.datetime.now(datetime.timezone.utc).isoformat(timespec='seconds'),
    etat_sources={
        'opendata_amendements': {'last_modified_vus': ['2026-11-08T09:20:30Z', '2026-11-08T13:20:28Z', '2026-11-08T15:20:27Z'],
                                 'entrees': len(noms), 'seance_BTC3188': sum(1 for n in noms if 'BTC3188' in n[2])},
        'site_recherche': {'dossier_DLR5L17N54608': 788, 'examen_seance_BTC3188': 0},
        'eliasse': {'examen_seance_BTC3188': '404 (pas encore ouvert)', 'examens_ouverts': len(json.load(open(os.path.join(D, 'api_examens.json'))))}},
    seances=seances, base_commission={k: {g: dict(c) for g, c in v.items()} for k, v in base.items()},
    reservoir_redepots=res, repetition_1779=dict(statistiques=st, places=places),
    narco_redepots_exemples=ex), open(out, 'w'), ensure_ascii=False, indent=0)
print(out, os.path.getsize(out), 'séances', len(seances), 'réservoir', len(res))
