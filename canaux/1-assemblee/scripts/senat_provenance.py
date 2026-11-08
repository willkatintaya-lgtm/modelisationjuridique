"""Provenance des alinéas d'un texte adopté par le Sénat, en remontant la chaîne
dépôt -> texte de commission -> texte adopté par les GUID Akoma Ntoso et l'attribut data:amdts.
Usage : python3 -I senat_provenance.py akn_dir ameli.jsonl depot commission adopte num_txt_com num_txt_seance sortie.json
ex. : ... ppl23-735 ppl24-254 tas24-045 '735 rect.' 254 prov_narco.json"""
import sys, json, re, collections
import xml.etree.ElementTree as ET
def own(al, A='{http://docs.oasis-open.org/legaldocml/ns/akn/3.0}'):
    """Texte propre d'un alinéa (num + content), sans les alinéas imbriqués."""
    parts = [''.join(c.itertext()) for c in al if c.tag in (A + 'num', A + 'content')]
    return re.sub(r'\s+', ' ', ' '.join(parts)).strip()
A = '{http://docs.oasis-open.org/legaldocml/ns/akn/3.0}'; D = '{http://data.parlement.fr/v1}'
def load(d, f):
    out = collections.OrderedDict()
    for art in ET.parse(f'{d}/{f}.akn.xml').getroot().iter(A + 'article'):
        n = art.find(A + 'num'); an = re.sub(r'\s+', ' ', ''.join(n.itertext())).strip() if n is not None else art.get('eId')
        for al in art.iter(A + 'alinea'):
            out[al.get('GUID')] = dict(article=an, pastille=al.get(D + 'pastille'), amdts=al.get(D + 'amdts'),
                                       mention=al.get(D + 'mention'), texte=own(al), conteneur=al.find(A + 'alinea') is not None)
    return out
def nums(s):
    if not s: return []
    s = re.sub(r'n°\s*', '', s)
    return [(m.group(1), 's/amdt' in p) for p in re.split(r'\s*,\s*', s) for m in [re.match(r'\s*((?:COM-)?\d+)', p)] if m]
def qui(a):
    if a is None: return '?'
    if a['auteur_entite'] == '5': return 'Gouvernement'
    if a['auteur_commission']: return 'Commission ' + a['auteur_commission']
    return a['auteurs'][0]['groupe_code'] if a['auteurs'] else '?'
if __name__ == '__main__':
    d, aml, dep, com, ado, ncom, nsea, out = sys.argv[1:9]
    AM = [json.loads(l) for l in open(aml)]
    idx = {(a['texte_num'], a['num']): a for a in AM}
    V0, V1, V2 = load(d, dep), load(d, com), load(d, ado)
    rows = []; C = collections.Counter(); G = collections.Counter(); GC = collections.Counter(); amd_used = collections.Counter()
    for g, al in V2.items():
        if al['mention'] and 'Supprimé' in al['mention'] and not al['texte'].replace('(Supprimé)', '').strip():
            continue  # alinéa vide « (Supprimé) »
        if al['amdts']:
            st, src = 'séance', [idx.get((nsea, n)) for n, s in nums(al['amdts'])]
        elif g in V1 and V1[g]['amdts']:
            st, src = 'commission', [idx.get((ncom, n)) for n, s in nums(V1[g]['amdts'])]
        elif g in V0 and V0[g]['texte'] == al['texte']:
            st, src = 'dépôt, inchangé', []
        elif g in V0 or g in V1:
            st, src = 'dépôt, retouché sans amendement nommé', []
        else:
            st, src = 'nouveau sans amendement nommé', []
        C[st] += 1
        for a in src:
            w = 1 / len(src)
            (G if st == 'séance' else GC)[qui(a)] += w
            if a: amd_used[(a['texte_num'], a['num'])] += 1
        rows.append(dict(guid=g, article=al['article'], pastille=al['pastille'], etape=st,
                         amendements=[dict(num=a['num'], texte=a['texte_num'], groupe=qui(a),
                                           auteur=(a['auteurs'][0]['auteur'] if a and a['auteurs'] else None), sort=a and a['sort'])
                                      if a else None for a in src],
                         texte=al['texte'][:400]))
    res = dict(total=len(rows), etapes=C, seance_par_groupe=G, commission_par_auteur=GC,
               amendements_distincts=len(amd_used), alineas=rows)
    json.dump(res, open(out, 'w'), ensure_ascii=False, indent=0)
    print(json.dumps({k: v for k, v in res.items() if k != 'alineas'}, ensure_ascii=False, indent=1))
