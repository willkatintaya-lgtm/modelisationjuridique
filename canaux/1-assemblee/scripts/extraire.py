"""Fabrique des extraits réels, petits et autoportants, pour la refonte (un article = texte avant/après + amendements + débat).
Usage : python3 -I extraire.py <scratchpad> <sortie_dir>"""
import json, sys, re, os, collections as C
S, O = sys.argv[1].rstrip('/') + '/', sys.argv[2]
A = [json.loads(l) for l in open(S + 'am.jsonl')]
R = json.load(open(S + 'ref.json')); ORG, ACT = R['org'], R['act']
gp = lambda u: (ORG.get(u) or {}).get('abr') or u
art = lambda f, n: next(a for a in json.load(open(S + f + '.json')) if a['article'].startswith(n) and a['article'][len(n):len(n)+1] in ('', ' '))
def am(a):
    return dict(num=a['num'], tri=a['tri'], auteur=ACT.get(a['auteur'], a['libelle_signataires'].split(',')[0]), type_auteur=a['type_auteur'],
        groupe=gp(a['groupe']) if a['type_auteur'] == 'Député' else a['type_auteur'], nb_cosignataires=len(a['cosignataires']),
        position=dict(article=a['div_titre'], alinea=(a['alinea'] or {}).get('alineaDesignation'), avant_apres=a['avant_apres'], article_additionnel=a['art_add'] == 'true'),
        dispositif=a['dispositif'], expose=a['expose'], cartouche=a['cartouche'],
        etat=a['etat'], sous_etat=a['sous_etat'], sort=a['sort'], date_depot=a['date_depot'], date_sort=a['date_sort'],
        discussion_commune=(a['disc_commune'] or {}).get('idDiscussion'), position_dans_dc=(a['disc_commune'] or {}).get('typePosition'),
        identiques=(a['disc_identique'] or {}).get('idDiscussion'), sous_amendement_de=a['parent'], rectification=a['rect'], uid=a['uid'])
def lot(dossier, texte, titres):
    L = [a for a in A if a['dossier'] == dossier and a['texte'] == texte and a['div_titre'] in titres]
    return [am(a) for a in sorted(L, key=lambda a: a['tri'])]

# 1. Logement, article 4, commission des affaires économiques (+ avis finances), septembre 2026
x = dict(source="Open data AN, législature 17 — dossier DLR5L17N54608 « relance et décentralisation du logement » (projet de loi adopté par le Sénat)",
    etape="1re lecture AN, commission des affaires économiques (au fond) et des finances (avis), 16-22 sept. 2026",
    texte_depose=dict(uid='PRJLANR5L17B3058', **art('PRJLANR5L17B3058', 'Article 4')),
    texte_commission=dict(uid='PRJLANR5L17BTC3188', **art('PRJLANR5L17BTC3188', 'Article 4')),
    amendements=lot('DLR5L17N54608', 'PRJLANR5L17B3058', {'Article 4'}),
    nota=["Les alinéas sont numérotés 1..n dans chaque article ; les amendements visent la numérotation du texte déposé.",
          "Les irrecevables (art. 40, art. 45) n'ont pas de dispositif publié.", "Groupes réels : données publiques, à ne pas confondre avec la maquette fictive."])
json.dump(x, open(os.path.join(O, 'logement-art4-commission.json'), 'w'), ensure_ascii=False, indent=1)

# 2. Narcotrafic, article 2 (parquet national anti-criminalité organisée), séance publique, mars 2025
P = [json.loads(l) for l in open(S + 'cr_narco_f.jsonl')]
deb = [dict(seance=p['cr'], rang=p['rang'], code=p['code'], orateur=p['orateur'], texte=p['texte'])
       for p in P if p['point'] and re.match(r'Article 2\b', p['point'])]
E = [json.loads(l) for l in open(S + 'ep_narco.jsonl')]
ep = [{k: e[k] for k in ('n', 'cr', 'decision', 'nums', 'paragraphes', 'mots', 'interruptions', 'orateurs', 'avis', 'scrutin_public', 'retrait', 'sous_amendement')}
      for e in E if e['point'] and re.match(r'Article 2\b', e['point'])]
y = dict(source="Open data AN, législature 17 — dossier DLR5L17N50169 « sortir la France du piège du narcotrafic » (PPL sénatoriale)",
    etape="1re lecture AN, séance publique, 18 mars 2025 (texte de la commission n° 1043)",
    texte_senat_transmis=dict(uid='PIONANR5L17B0907', **art('PIONANR5L17B0907', 'Article 2')),
    texte_commission=dict(uid='PIONANR5L17BTC1043', **art('PIONANR5L17BTC1043', 'Article 2')),
    texte_adopte_AN=dict(uid='PIONANR5L17BTA0083', **art('PIONANR5L17BTA0083', 'Article 2')),
    texte_CMP=dict(uid='PIONANR5L17BTC1277', **art('PIONANR5L17BTC1277', 'Article 2')),
    amendements_commission=lot('DLR5L17N50169', 'PIONANR5L17B0907', {'Article 2'}),
    amendements_seance=lot('DLR5L17N50169', 'PIONANR5L17BTC1043', {'Article 2'}),
    episodes=ep, compte_rendu=deb)
json.dump(y, open(os.path.join(O, 'narcotrafic-art2-seance.json'), 'w'), ensure_ascii=False, indent=1)
print(len(x['amendements']), len(y['amendements_commission']), len(y['amendements_seance']), len(ep), len(deb))
