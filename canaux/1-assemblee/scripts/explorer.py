"""Statistiques exploratoires sur les amendements aplatis (am.jsonl) — sorties texte brutes, pour lecture.
Usage : python3 -I explorer.py <am.jsonl> <ref.json>"""
import json, sys, re, collections as C
A = [json.loads(l) for l in open(sys.argv[1])]
R = json.load(open(sys.argv[2])); ORG, ACT = R['org'], R['act']
gp = lambda u: (ORG.get(u) or {}).get('abr') or u
def P(*x): print(*x)

OPS = [('supprimer_article', r'^Supprimer cet article'), ('rediger_article', r'^Rédiger ainsi cet article'),
       ('supprimer_alineas', r'^(?:I\. – )?Supprimer (?:les|l’)alin[ée]a'), ('rediger_alinea', r'Rédiger ainsi (?:l’|les )alin'),
       ('substituer', r'substituer (?:au|à la|aux|à l’)'), ('inserer_mots', r'insérer (?:les mots|le mot|la phrase|les phrases|la référence)'),
       ('supprimer_mots', r'supprimer (?:les mots|le mot|la phrase|les phrases)'), ('inserer_alinea', r'insérer (?:l’alinéa|les \w+ alinéas|un alinéa)'),
       ('completer', r'^(?:I\. – )?Compléter'), ('article_additionnel', r'^(?:I\. – )?(?:L[ea]s? |Après l’article|À l’article|Au |À la )'),]
def ops(d):
    if not d: return ['∅']
    o = [k for k, r in OPS if re.search(r, d, re.M)]
    return o or ['autre']

for dos in sorted(set(a['dossier'] for a in A)):
    B = [a for a in A if a['dossier'] == dos]
    P('\n' + '#' * 70, '\n#', dos, len(B), 'amendements')
    for ex in sorted(set(a['examen'] for a in B)):
        E = [a for a in B if a['examen'] == ex]
        P('\n== examen', ex, len(E), 'textes:', C.Counter(a['texte'] for a in E).most_common())
        P('  états/sous-états :', C.Counter((a['etat'], a['sous_etat']) for a in E).most_common())
        vote = [a for a in E if a['sous_etat'] in ('Adopté', 'Rejeté')]
        P('  arrivés au vote :', len(vote), f'({100*len(vote)//len(E)} %)', '— adoptés', sum(a['sous_etat'] == 'Adopté' for a in E))
        P('  par type d’auteur (adoptés/total) :', {t: f"{sum(a['sous_etat']=='Adopté' for a in E if a['type_auteur']==t)}/{sum(a['type_auteur']==t for a in E)}" for t in set(a['type_auteur'] for a in E)})
        g = C.defaultdict(lambda: [0, 0, 0])
        for a in E:
            k = gp(a['groupe']) if a['type_auteur'] == 'Député' else a['type_auteur']
            g[k][0] += 1; g[k][1] += a['sous_etat'] == 'Adopté'; g[k][2] += a['sous_etat'] in ('Cavalier (45)', 'Charge', 'Gage', 'Autre irrecevabilité', 'Doublon')
        P('  par groupe [déposés, adoptés, irrecevables] :', dict(sorted(g.items(), key=lambda x: -x[1][0])))
        # identiques
        idg = C.defaultdict(list)
        for a in E:
            if a['disc_identique']: idg[a['disc_identique']['idDiscussion']].append(a)
        sizes = C.Counter(len(v) for v in idg.values())
        multi = [v for v in idg.values() if len(set(gp(x['groupe']) if x['type_auteur'] == 'Député' else x['type_auteur'] for x in v)) > 1]
        P('  identiques : groupes', len(idg), 'tailles', sorted(sizes.items()), '— dont transpartisans', len(multi))
        for v in sorted(multi, key=len, reverse=True)[:4]:
            P('    ×', len(v), sorted(set(gp(x['groupe']) if x['type_auteur'] == 'Député' else x['type_auteur'] for x in v)), C.Counter(x['sous_etat'] for x in v).most_common(), '|', (v[0]['dispositif'] or '')[:90].replace('\n', ' '))
        dc = C.defaultdict(list)
        for a in E:
            if a['disc_commune']: dc[a['disc_commune']['idDiscussion']].append(a)
        P('  discussions communes :', len(dc), 'tailles', sorted(C.Counter(len(v) for v in dc.values()).items()),
          'positions', C.Counter(a['disc_commune']['typePosition'] for a in E if a['disc_commune']))
        # issue d'une discussion commune
        out = C.Counter()
        for v in dc.values():
            s = C.Counter(x['sous_etat'] for x in v); out['avec adopté' if s['Adopté'] else 'sans adopté'] += 1
            if s['Adopté'] and s['Tombé']: out['adopté + tombés'] += 1
        P('  issue des discussions communes :', dict(out))
        tb = [a for a in E if a['sous_etat'] == 'Tombé']
        P('  tombés : dans une discussion commune', sum(1 for a in tb if a['disc_commune']), '/', len(tb))
        P('  opérations (dispositif) :', C.Counter(o for a in E for o in ops(a['dispositif'])).most_common())
        mult = [a for a in E if a['dispositif'] and re.search(r'^II\.\s*[–-]', a['dispositif'], re.M)]
        P('  multi-opérations (I. / II.) :', len(mult), '— dont « en conséquence »', sum('En conséquence' in a['dispositif'] or 'en conséquence' in a['dispositif'] for a in mult),
          '— dont gage', sum(bool(re.search(r'compensée.{0,80}(?:tabac|accise)', a['dispositif'], re.S)) for a in mult))
        P('  sous-amendements :', sum(1 for a in E if a['parent']), '— sorts', C.Counter(a['sous_etat'] for a in E if a['parent']).most_common())
        P('  rectifiés :', C.Counter(a['rect'] for a in E))
        P('  cosignataires : médiane', sorted(len(a['cosignataires']) for a in E)[len(E) // 2], 'max', max(len(a['cosignataires']) for a in E))
        P('  dates de dépôt :', sorted(C.Counter(a['date_depot'] for a in E).items()))
        P('  dates de sort :', sorted(C.Counter(str(a['date_sort']) for a in E).items()))
        P('  articles les plus amendés :', C.Counter(a['div_titre'] for a in E).most_common(8))
