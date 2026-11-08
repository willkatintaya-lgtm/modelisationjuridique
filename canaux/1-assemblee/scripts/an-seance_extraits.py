"""Produit les extraits an-seance-* (grammaire en familles, épisodes et scrutins d'un texte).
Usage : python3 -I an-seance_extraits.py <raw-an-seance> <ref.json> <all.jsonl amendements> <dossier extraits> <motif titre texte>"""
import json, sys, re, collections as C
R, REF, AMF, OUT, MOTIF = sys.argv[1:6]
ref = json.load(open(REF)); O = ref['org']; ab = lambda g: (O.get(g) or {}).get('abr', g)
FAM = [(r'^OUV_SEAN|^FIN_SEAN|^CHGT_PRES', 'cadre de séance (ouverture, présidence, levée)'), (r'^ODJ|^TITRE_TEXTE|^SOUS_TITRE|^APPEL_PLF|^AUTRE_INTERTITRE|^PRESENTATION|^DEBAT', "ordre du jour, appel d'un texte"),
       (r'^DISC_GENERALE', 'discussion générale'), (r'^MOTION|^REJET_MOTION|^SCR_MRJ|^SCR_MREF|^ANN_SCRUT_MOT', 'motions (rejet préalable, renvoi)'),
       (r'^QG|^QOSD|^QPM', 'questions'), (r'^DISC_ARTICLES_1|^DISC_ARTICLES_2|^PLF_PARTIES|^PLFSS_|^ART_SORT|^SORT_ARTICLE|^SCRUT_ART|^SCR_PART_PLFSS|^SCR_PLF1|^MAV_PART|^PLF_2', 'articles, parties de loi de finances'),
       (r'^DISC_ARTICLES_3|^ADT_SORTS|^ADOP_ADT|^REJET_ADT|^AM8END|^RETRAIT_ADT|^SCRUT_PUB_ADT|^SCRUT_ADTS|^SCyRUT', 'amendements (présentation, avis, sort)'),
       (r'^DISC_ARTICLES_4|^SORT_SS_ADT|^SCRUT_SOUS_AMEND|^SCRUPUB_SSADTS', 'sous-amendements'), (r'^ANN_SCR|^SCR_AUTRE', 'annonce de scrutin public (demandeur)'),
       (r'^VOTE_ENS|^EXPL_VOTE|^ACCORD_CONV', "explications de vote et vote sur l'ensemble"), (r'^RAP_REGLEMENT|^FAIT_PERSONNEL|^VERIF_QUORUM', 'incidents de procédure (rappels au règlement, fait personnel, quorum)'),
       (r'^SUSP', 'suspensions'), (r'^49_3|^VOTE_CENSURE|^VOTE_DECL|^RES_ELECTION|^ELECTION', 'responsabilité du gouvernement (49.3, censure, 50-1), élections'),
       (r'^SCDE_DELIB|^AUTRE_VOTE|^RESERVE_VOTE|^RETRAIT_PPL', 'seconde délibération, réserve, retrait de texte, prolongation'), (r'^INTERRUPTION', 'interruptions (exclamations, applaudissements, apostrophes)'),
       (r'^PAROLE_GENERIQUE', 'parole générique (suite d’une intervention)')]
fam = lambda c: next((f for r, f in FAM if re.search(r, c)), 'autre')
g = []
for line in open(R + '/gram.txt'):
    a, ex = line.split('|', 1); n, ncr, mots, st, code = a.split()
    g.append(dict(code=code, n=int(n), seances=int(ncr), mots=int(mots), horodates=int(st), famille=fam(code), exemple=ex.strip()))
json.dump(g, open(OUT + '/an-seance-grammaire.json', 'w'), ensure_ascii=False, indent=0)
mot = re.compile(MOTIF, re.I)
E = [json.loads(l) for l in open(R + '/ep_all.jsonl')]
E = [e for e in E if e['texte'] and mot.search(e['texte'])]
keep = ['n', 'cr', 'date', 'phase', 'art', 'adts', 'decision_code', 'decision', 't0', 'duree', 'paragraphes', 'prises', 'mots', 'interruptions', 'avis', 'scrutin', 'scrutin_demande', 'rappels', 'suspensions', 'retire', 'demande_retrait', 'rectifie', 'sous_amdt', 'identiques', 'discussion_commune', 'tombent']
json.dump([dict({k: e[k] for k in keep}, orateurs=e['orateurs'][:6]) for e in E], open(OUT + '/an-seance-narco-episodes.json', 'w'), ensure_ascii=False)
S = json.load(open(R + '/scr_cr_am.json')); crs = {e['cr'] for e in E}
AM = {}
for l in open(AMF):
    a = json.loads(l)
    if a['org_ex'] == 'AN': AM[a['uid']] = a
sel = [s for s in S if s.get('cr') and s['cr']['cr'] in crs and mot.search(s['titre'].replace('’', "'")) or (s.get('cr') and s['cr']['cr'] in crs and s.get('am'))]
out = []
for s in sel:
    a = AM.get(s.get('am')) or {}
    out.append(dict(uid=s['uid'], num=s['num'], date=s['date'], objet=s['objet'], titre=s['titre'], sort=s['sort'], demandeur=s['demandeur'],
        pour=s['pour'], contre=s['contre'], abst=s['abst'], votants=s['votants'], amendement=s.get('am'), amendement_num=a.get('num'),
        groupe_auteur=ab(a.get('groupe')) if a.get('groupe') else None, auteur=a.get('auteur'), article=a.get('div'),
        groupes={ab(o): dict(membres=v['membres'], maj=v['maj'], pour=v['pour'], contre=v['contre'], abst=v['abst'],
                 dissidents={k: len(x) for k, x in v['dissidents'].items()}) for o, v in s['groupes'].items()}))
json.dump(out, open(OUT + '/an-seance-narco-scrutins.json', 'w'), ensure_ascii=False)
print(len(g), 'codes ;', len(E), 'épisodes ;', len(out), 'scrutins')
