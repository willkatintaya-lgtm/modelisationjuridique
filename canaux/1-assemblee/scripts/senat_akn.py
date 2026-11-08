"""Lit un texte Sénat en Akoma Ntoso (senat.fr/akomantoso/<signet>.akn.xml) et sort
une ligne JSON par alinéa : article, n° d'alinéa (pastille), texte, amendements d'origine
(attribut data:amdts), mention ((nouveau), (Supprimé)...).
Usage : python3 -I senat_akn.py fichier.akn.xml [sortie.jsonl]"""
import sys, json, re
import xml.etree.ElementTree as ET
def own(al, A='{http://docs.oasis-open.org/legaldocml/ns/akn/3.0}'):
    """Texte propre d'un alinéa (num + content), sans les alinéas imbriqués."""
    parts = [''.join(c.itertext()) for c in al if c.tag in (A + 'num', A + 'content')]
    return re.sub(r'\s+', ' ', ' '.join(parts)).strip()
NS = {'a': 'http://docs.oasis-open.org/legaldocml/ns/akn/3.0'}
D = '{http://data.parlement.fr/v1}'
def txt(e):
    return re.sub(r'\s+', ' ', ''.join(e.itertext())).strip()
def lire(path):
    root = ET.parse(path).getroot()
    out = []
    for art in root.iter('{%s}article' % NS['a']):
        num = art.find('a:num', NS)
        artnum = txt(num) if num is not None else art.get('eId')
        for al in art.iter('{%s}alinea' % NS['a']):
            out.append({'article': artnum, 'art_eId': art.get('eId'),
                        'art_amdts': art.get(D + 'amdts'), 'art_mention': art.get(D + 'mention'),
                        'eId': al.get('eId'), 'pastille': al.get(D + 'pastille'),
                        'amdts': al.get(D + 'amdts'), 'mention': al.get(D + 'mention'),
                        'texte': own(al), 'conteneur': al.find('{%s}alinea' % NS['a']) is not None})
    return out
def nums(s):
    """'n° 248, 266(s/amdt)' -> [('248',False),('266',True)] ; 'n° COM-12 rect.' géré."""
    if not s: return []
    s = re.sub(r'^n[°o]s?\s*', '', s.strip())
    r = []
    for p in re.split(r'\s*(?:,|\bet\b)\s*', s):
        m = re.match(r'((?:COM-)?\d+)', p.strip())
        if m: r.append((m.group(1), 's/amdt' in p))
    return r
if __name__ == '__main__':
    rows = lire(sys.argv[1])
    f = open(sys.argv[2], 'w') if len(sys.argv) > 2 else sys.stdout
    for r in rows: f.write(json.dumps(r, ensure_ascii=False) + '\n')
