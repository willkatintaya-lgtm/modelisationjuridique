"""Aplatit les amendements JSON de l'open data AN (un fichier par amendement) en JSONL.
Usage : python3 -I aplatir_amendements.py <dossier_racine_json> <sortie.jsonl>
Ne garde que les champs utiles à l'exploration ; le HTML du dispositif est conservé brut."""
import json, sys, glob, os, html, re

def nil(v):
    return None if (isinstance(v, dict) and v.get('@xsi:nil') == 'true') else v

def g(d, *path):
    for p in path:
        if not isinstance(d, dict): return None
        d = nil(d.get(p))
    return d

def txt(h):
    if not h: return None
    h = re.sub(r'<br\s*/?>|</p>', '\n', h)
    return html.unescape(re.sub(r'<[^>]+>', '', h)).strip()

out = open(sys.argv[2], 'w')
for f in glob.glob(os.path.join(sys.argv[1], '**', '*.json'), recursive=True):
    a = json.load(open(f))['amendement']
    s = a['signataires']; cos = g(s, 'cosignataires', 'acteurRef')
    if isinstance(cos, str): cos = [cos]
    div = g(a, 'pointeurFragmentTexte', 'division') or {}
    cv = a['cycleDeVie']
    ca = g(a, 'corps', 'contenuAuteur') or {}
    r = dict(
        uid=a['uid'], dossier=f.split(os.sep)[-3], texte=a.get('texteLegislatifRef'),
        num=g(a, 'identification', 'numeroLong'), ordre=g(a, 'identification', 'numeroOrdreDepot'),
        organe_examen=g(a, 'identification', 'prefixeOrganeExamen'), rect=g(a, 'identification', 'numeroRect'),
        examen=a.get('examenRef'), tri=a.get('triAmendement'), parent=nil(a.get('amendementParentRef')),
        multiples=a.get('cardinaliteAmdtMultiples'),
        type_auteur=g(s, 'auteur', 'typeAuteur'), auteur=g(s, 'auteur', 'acteurRef'), groupe=g(s, 'auteur', 'groupePolitiqueRef'),
        gouv=g(s, 'auteur', 'gouvernementRef'), rapporteur_organe=g(s, 'auteur', 'auteurRapporteurOrganeRef'),
        cosignataires=cos or [], libelle_signataires=html.unescape(s.get('libelle') or ''),
        div_titre=div.get('titre'), div_court=div.get('articleDesignationCourte'), div_type=div.get('type'),
        avant_apres=nil(div.get('avant_A_Apres')), art_add=div.get('articleAdditionnel'), chap_add=div.get('chapitreAdditionnel'),
        alinea=g(a, 'pointeurFragmentTexte', 'amendementStandard', 'alinea'),
        dispositif_html=ca.get('dispositif'), dispositif=txt(ca.get('dispositif')), expose=txt(ca.get('exposeSommaire')),
        cartouche=g(a, 'corps', 'cartoucheInformatif'),
        date_depot=cv.get('dateDepot'), date_pub=cv.get('datePublication'), date_sort=nil(cv.get('dateSort')),
        art40=cv.get('soumisArticle40'),
        etat=g(cv, 'etatDesTraitements', 'etat', 'libelle'), sous_etat=g(cv, 'etatDesTraitements', 'sousEtat', 'libelle'),
        sort=nil(cv.get('sort')), seance=nil(a.get('seanceDiscussionRef')),
        loi_ref=nil(a.get('loiReference')), disc_commune=nil(a.get('discussionCommune')), disc_identique=nil(a.get('discussionIdentique')),
        art99=a.get('article99'), hors_delai=a.get('accordGouvernementDepotHorsDelai'),
    )
    out.write(json.dumps(r, ensure_ascii=False) + '\n')
