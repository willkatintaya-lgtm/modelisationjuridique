"""Historique de l'ordre du jour de la séance (points confirmés / supprimés) sur une période.
Usage : python3 -I logement-direct_agenda.py <dossier ag/json/reunion> <date_debut> <date_fin> [organe=PO838901]
Imprime, séance par séance, chaque point avec son état et ses dates de création / clôture."""
import json, os, sys
rep, d0, d1 = sys.argv[1], sys.argv[2], sys.argv[3]
org = sys.argv[4] if len(sys.argv) > 4 else 'PO838901'
rows = []
for f in os.listdir(rep):
    r = json.load(open(os.path.join(rep, f)))['reunion']
    t = r.get('timeStampDebut', '')
    if r.get('organeReuniRef') != org or not (d0 <= t[:10] <= d1):
        continue
    pts = ((r.get('ODJ') or {}).get('pointsODJ') or {}).get('pointODJ') or []
    if isinstance(pts, dict): pts = [pts]
    rows.append((t, r['uid'], r['cycleDeVie']['etat'], pts, r.get('compteRenduRef')))
for t, uid, etat, pts, cr in sorted(rows):
    print(f'== {t[:16]} {uid} [{etat}] CR={cr}')
    for p in pts:
        c = p['cycleDeVie']
        print(f"   {c['etat']:9} cree={(c['chrono']['creation'] or '')[:10]} clos={(c['chrono']['cloture'] or '')[:10]} "
              f"{(p.get('dossiersLegislatifsRefs') or {}).get('dossierRef','')} | {p.get('objet','')[:110]}")
