"""Aplatit TOUS les comptes rendus Syceron (XML) en un JSONL d'éléments étiquetés.
Usage : python3 -I an-seance_aplatir_cr.py <dossier_compteRendu> <sortie.jsonl>
Chaque élément porteur de code_grammaire (point, paragraphe, ouvertureSeance, finSeance...) :
cr, seance, date, tag, niv (nivpoint), code, style, role, ordre (ordre_absolu_seance), art, adt, ssadt, bibard,
orateur, acteur (id_acteur de l'interExtraction / paragraphe), qualite, stime (secondes depuis début d'enregistrement), texte."""
import sys, re, glob, json
from xml.etree import ElementTree as ET
ns = '{http://schemas.assemblee-nationale.fr/referentiel}'
out = open(sys.argv[2], 'w')
cl = lambda s: re.sub(r'\s+', ' ', s or '').strip()
for f in sorted(glob.glob(sys.argv[1] + '/*.xml')):
    r = ET.parse(f).getroot()
    md = r.find(ns + 'metadonnees'); date = md.findtext(ns + 'dateSeance'); seance = r.findtext(ns + 'seanceRef')
    cr = f.split('/')[-1][:-4]; pts = {}
    for el in r.find(ns + 'contenu').iter():
        code = el.get('code_grammaire')
        if code is None: continue
        tag = el.tag.replace(ns, '')
        tx = el.find(ns + 'texte'); t = cl(''.join(tx.itertext())) if tx is not None else ''
        o = el.find(f'{ns}orateurs/{ns}orateur')
        niv = el.get('nivpoint')
        if tag == 'point' and niv: pts[int(niv)] = t; [pts.pop(k) for k in list(pts) if k > int(niv)]
        out.write(json.dumps(dict(cr=cr, seance=seance, date=date, tag=tag, niv=niv, code=code, style=el.get('code_style'),
            role=el.get('roledebat'), ordre=el.get('ordre_absolu_seance'), art=cl(el.get('art')), adt=cl(el.get('adt')),
            ssadt=cl(el.get('ssadt')), bibard=cl(el.get('bibard')).replace('[[o]]', 'o').replace('[[os]]', 'os'),
            orateur=o.findtext(ns + 'nom') if o is not None else None, acteur=el.get('id_acteur'),
            qualite=cl(o.findtext(ns + 'qualite')) if o is not None else None,
            stime=tx.get('stime') if tx is not None else None, p1=pts.get(1), texte=t), ensure_ascii=False) + '\n')
