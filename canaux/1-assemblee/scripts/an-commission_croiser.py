"""Croise les épisodes de commission (an-commission_examen.py) avec am.jsonl.
Usage : python3 -I an-commission_croiser.py episodes.json am.jsonl ref.json PREFIXE dossier sortie.json"""
import sys, json, re, collections
E = json.load(open(sys.argv[1]))['episodes']; pref = sys.argv[4]; dos = sys.argv[5]
ref = json.load(open(sys.argv[3]))
AM = {}
for l in open(sys.argv[2]):
    r = json.loads(l)
    if r['dossier'] == dos and r['num'].startswith(pref): AM[r['num'].replace(' ', '')] = r
def verbe(t):
    t = t.lower()
    for k, v in [('tomb', 'tombé'), ('retir', 'retiré'), ('rejet', 'rejeté'), ('adopt', 'adopté')]:
        if k in t: return v
def avis_rap(paroles):
    res = None
    for p in paroles:
        if p['role'] and 'rapport' in p['role'] and 'pour avis' not in p['role']:
            t = p['txt'].lower()
            for k, v in [('demande de retrait', 'retrait'), ('retirer', 'retrait'), ('retireriez', 'retrait'),
                         ('défavorable', 'défavorable'), ('favorable', 'favorable'), ('sagesse', 'sagesse')]:
                if k in t: res = v; break
    return res
info = collections.defaultdict(lambda: {'tete': [], 'dec': [], 'verbes': []})
for e in E:
    for n in e['ams']: info[n]['tete'].append(e['id'])
    for d in e['decisions']:
        v = verbe(d['txt'])
        # « Elle adopte l'article » : ignorer pour les amendements
        if re.search(r'adopte l’article|adopte l\'article', d['txt']) and not d['ams']: continue
        targets = d['ams'] or e['ams']
        for n in targets:
            info[n]['dec'].append(e['id']); info[n]['verbes'].append(v)
            if 'Suivant l’avis' in d['txt']: info[n]['suivant'] = True
            if 'Contre l’avis' in d['txt']: info[n]['contre'] = True
rows = []
for n, r in AM.items():
    i = info.get(n)
    ep = E[i['tete'][0]] if i and i['tete'] else None
    rows.append({'num': n, 'uid': r['uid'], 'auteur': r['auteur'], 'groupe': ref['org'].get(r['groupe'] or '', {}).get('abr'),
                 'sort_od': r['sort'], 'etat_od': r['etat'], 'sous_etat': r['sous_etat'],
                 'article': r['div_titre'], 'en_tete': bool(i and i['tete']),
                 'mentionne': bool(i and (i['tete'] or i['dec'])),
                 'verbe_rapport': (i['verbes'][-1] if i and i['verbes'] else None),
                 'suivant_avis': bool(i and i.get('suivant')),
                 'episode': ep['id'] if ep else None,
                 'ep_taille': len(ep['ams']) if ep else None,
                 'ep_mots': sum(p['mots'] for p in ep['paroles']) if ep else None,
                 'ep_orateurs': len({p['nom'] for p in ep['paroles']}) if ep else None,
                 'avis_rapporteur': avis_rap(ep['paroles']) if ep else None})
json.dump(rows, open(sys.argv[6], 'w'), ensure_ascii=False)
C = collections.Counter
print('amendements open data', len(rows))
print('mentionnés dans le rapport', sum(r['mentionne'] for r in rows), 'en tête d\'épisode', sum(r['en_tete'] for r in rows))
print('mentions rapport absentes de l\'open data', sorted(set(info) - set(AM))[:30], len(set(info) - set(AM)))
print('etat open data des non mentionnés', C((r['etat_od'], r['sous_etat'], r['sort_od']) for r in rows if not r['mentionne']).most_common(12))
print('sort OD x verbe rapport (mentionnés)')
for k, v in C((r['sort_od'], r['verbe_rapport']) for r in rows if r['mentionne']).most_common(): print('  ', v, k)
