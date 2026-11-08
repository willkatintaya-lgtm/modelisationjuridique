"""Aplatit les scrutins AN (JSON open data) : un enregistrement par scrutin, avec ventilation par groupe et dissidents.
Usage : python3 -I an-seance_scrutins.py <dossier_scr_json> <sortie.jsonl>
Champs : uid, num, date, seance, type, sort, titre, demandeur, votants, exprimes, pour, contre, abst, nv,
objet (amendement / sous-amendement / article / ensemble / motion / autre), nums (numéros d'amendement du titre),
groupes: {organe: {membres, maj, pour, contre, abst, nv, dissidents:[acteur,...], delegation}}, lieu."""
import sys, re, glob, json
out = open(sys.argv[2], 'w')
L = lambda x: [] if x is None else (x['votant'] if isinstance(x.get('votant'), list) else [x['votant']]) if isinstance(x, dict) else []
for f in glob.glob(sys.argv[1] + '/*.json'):
    s = json.load(open(f))['scrutin']; t = s.get('titre') or ''
    tl = t.lower().replace('’', "'").replace('amendmeent', 'amendement').replace('amenedement', 'amendement').replace('aticle', 'article')
    obj = ('suspension' if 'suspension de séance' in tl else 'prolongation' if 'prolonger la séance' in tl else 'seconde_delib' if 'seconde délibération' in tl
           else 'declaration' if tl.startswith('la déclaration') else 'partie_finances' if re.match(r"^la (première|deuxième|troisième|quatrième) partie", tl)
           else 'resolution' if tl.startswith('la proposition de résolution') else 'sous-amendement' if 'sous-amendement' in tl else 'amendement' if re.match(r"^(l'|les )?amendements?", tl) or 'amendement n' in tl[:40]
           else 'motion' if 'motion' in tl[:40] else 'article' if re.match(r"^(l'article|les articles)", tl)
           else 'ensemble' if "l'ensemble" in tl[:20] else 'autre')
    nums = [int(x) for m in re.findall(r"n°\s*([\d ,et]+)", tl.split(" à l'article")[0].split(" après l'article")[0].split(" avant l'article")[0][:400]) for x in re.findall(r'\d+', m)] if obj in ('amendement', 'sous-amendement') else []
    G = {}
    for g in s['ventilationVotes']['organe']['groupes']['groupe']:
        v = g['vote']; d = v['decompteVoix']; n = v.get('decompteNominatif') or {}; maj = v.get('positionMajoritaire')
        pos = {'pour': L(n.get('pours')), 'contre': L(n.get('contres')), 'abstention': L(n.get('abstentions')), 'nv': L(n.get('nonVotants'))}
        dis = {k: [x['acteurRef'] for x in pos[k]] for k in ('pour', 'contre', 'abstention') if k != maj and pos[k]}
        G[g['organeRef']] = dict(membres=int(g['nombreMembresGroupe']), maj=maj, pour=int(d['pour']), contre=int(d['contre']),
            abst=int(d['abstentions']), nv=int(d.get('nonVotants') or 0), dissidents=dis,
            delegation=sum(x.get('parDelegation') == 'true' for k in pos for x in pos[k]))
    sy = s['syntheseVote']; dc = sy['decompte']
    out.write(json.dumps(dict(uid=s['uid'], num=int(s['numero']), date=s['dateScrutin'], seance=s['seanceRef'],
        type=s['typeVote']['codeTypeVote'], sort=s['sort']['code'], titre=t, demandeur=(s.get('demandeur') or {}).get('texte'),
        votants=int(sy['nombreVotants']), exprimes=int(sy['suffragesExprimes']), pour=int(dc['pour']), contre=int(dc['contre']),
        abst=int(dc['abstentions']), nv=int(dc['nonVotants'] or 0), objet=obj, nums=nums, groupes=G, lieu=s.get('lieuVote'),
        mise_au_point=json.dumps(s.get('miseAuPoint'))[:20] != '{"nonVotants": [nu'), ensure_ascii=False) + '\n')
