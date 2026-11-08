"""Réunions de l'agenda AN (ag/json/reunion) liées à des dossiers : durée, ODJ, présences.
Usage : python3 -I an-commission_agenda.py dossier_reunion ref.json sortie.json DOSSIER [DOSSIER...]"""
import sys, json, os, collections, datetime as dt
d, ref, out = sys.argv[1], json.load(open(sys.argv[2])), sys.argv[3]; doss = sys.argv[4:]
rows = []
for root, _, fs in os.walk(d):
    for f in fs:
        s = open(os.path.join(root, f), encoding='utf-8').read()
        hit = [x for x in doss if x in s]
        if not hit: continue
        r = json.loads(s)['reunion']
        t0, t1 = r.get('timeStampDebut'), r.get('timeStampFin')
        dur = None
        if t0 and t1:
            dur = (dt.datetime.fromisoformat(t1[:19]) - dt.datetime.fromisoformat(t0[:19])).total_seconds() / 60
        pi = ((r.get('participants') or {}).get('participantsInternes') or {}).get('participantInterne') or []
        if isinstance(pi, dict): pi = [pi]
        pres = collections.Counter(p.get('presence') for p in pi)
        odj = r.get('ODJ') or {}
        items = (odj.get('pointsODJ') or {}).get('pointODJ') or []
        if isinstance(items, dict): items = [items]
        resume = (odj.get('resumeODJ') or {}).get('item')
        org = r.get('organeReuniRef')
        rows.append({'uid': r['uid'], 'dossier': hit, 'type': r.get('@xsi:type'), 'organe': org,
                     'organe_abr': ref['org'].get(org, {}).get('abr') if org else None,
                     'debut': t0, 'fin': t1, 'duree_min': dur, 'etat': (r.get('cycleDeVie') or {}).get('etat'),
                     'presences': dict(pres), 'presents': [p['acteurRef'] for p in pi if p.get('presence') == 'présent'],
                     'resume_odj': resume if isinstance(resume, (str, type(None))) else resume,
                     'points': [{'objet': (p.get('objet') or '')[:200], 'type': p.get('typePointODJ'),
                                 'dossiers': p.get('dossiersLegislatifsRefs'), 'cr': p.get('comiteSecret')} for p in items],
                     'compteRenduRef': r.get('compteRenduRef'), 'captationVideo': r.get('captationVideo'),
                     'formatReunion': r.get('formatReunion'), 'ouverturePresse': r.get('ouverturePresse')})
rows.sort(key=lambda x: x['debut'] or '')
json.dump(rows, open(out, 'w'), ensure_ascii=False, indent=1)
for x in rows:
    print(x['debut'][:16] if x['debut'] else None, x['organe_abr'], x['type'][:22], x['etat'], 'durée', x['duree_min'], x['presences'], '|', (x['points'][0]['objet'] if x['points'] else str(x['resume_odj']))[:110], '| CR', x['compteRenduRef'])
