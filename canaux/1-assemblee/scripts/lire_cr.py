"""Lit les comptes rendus de séance Syceron (XML) d'un texte et les aplatit en paragraphes JSONL.
Usage : python3 -I lire_cr.py <dossier_xml_compteRendu> <motif_titre_odj> <sortie.jsonl>
Chaque paragraphe : séance, date, rang, code_grammaire, rôle, orateur, qualité, texte, amendements cités."""
import sys, re, glob, json
from xml.etree import ElementTree as ET
ns = '{http://schemas.assemblee-nationale.fr/referentiel}'
motif = re.compile(sys.argv[2], re.I)
out = open(sys.argv[3], 'w')
for f in sorted(glob.glob(sys.argv[1] + '/*.xml')):
    raw = open(f, encoding='utf-8').read()
    if not motif.search(raw): continue
    r = ET.fromstring(raw)
    md = r.find(ns + 'metadonnees'); date = md.findtext(ns + 'dateSeance')
    seance = r.findtext(ns + 'seanceRef'); point = None
    for i, el in enumerate(r.find(ns + 'contenu').iter()):
        tag = el.tag.replace(ns, '')
        if tag == 'point':
            ti = el.find(ns + 'texte'); point = re.sub(r'\s+', ' ', ''.join(ti.itertext())).strip() if ti is not None else point
            continue
        if tag != 'paragraphe': continue
        o = el.find(f'{ns}orateurs/{ns}orateur')
        tx = el.find(ns + 'texte'); t = re.sub(r'\s+', ' ', ''.join(tx.itertext())).strip() if tx is not None else ''
        out.write(json.dumps(dict(seance=seance, date=date, cr=f.split('/')[-1][:-4], rang=i, point=point,
            code=el.get('code_grammaire'), role=el.get('roledebat'), style=el.get('code_style'),
            orateur=o.findtext(ns + 'nom') if o is not None else None, acteur=o.findtext(ns + 'id') if o is not None else None,
            qualite=o.findtext(ns + 'qualite') if o is not None else None, texte=t,
            amdts=re.findall(r'n(?:o|os)\s*([\d ,et]+)', t)[:3]), ensure_ascii=False) + '\n')
