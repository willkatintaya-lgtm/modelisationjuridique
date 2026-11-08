"""Découpe un compte rendu intégral du Sénat (senat.fr/seances/sAAAAMM/sAAAAMMJJ/sAAAAMMJJ_mono.html)
en interventions (commentaires <!--cri:intervenant mat nom qua type-->), avec les ancres
d'amendements (<a name="amd_<session>_<texte>_<num>">) et les mentions entre parenthèses.
Sortie : un JSON par intervention. Usage : python3 -I senat_cr.py cr.html [...] > sortie.jsonl"""
import sys, re, json, html
def clean(s):
    s = re.sub(r'(?s)<!--.*?-->', '', s)
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', s))).strip()
for path in sys.argv[1:]:
    t = open(path, encoding='utf8', errors='replace').read()
    seance = re.search(r's(\d{8})', path).group(1)
    blocs = re.split(r'(?=<div id="intv_par_\d+" class="intervenant">)', t)
    for i, b in enumerate(blocs[1:]):
        m = re.search(r'<!--cri:intervenant mat="([^"]*)" nom="([^"]*)" qua="([^"]*)" type="([^"]*)"', b)
        b = b.split('<!--/cri:intervenant -->')[0]
        amd = re.findall(r'name="amd_(\d+)_(\d+)_(\d+)"', b)
        paren = [clean(x) for x in re.findall(r'(?s)<span class="info_entre_parentheses">(.*?)</span>', b)]
        qual = clean(' '.join(re.findall(r'(?s)<span class="orateur_qualite">(.*?)</span>', b)))
        txt = clean(re.sub(r'(?s)<span class="orateur_nom">.*?</span>\s*(?=[^<])', '', b, count=0))
        art = re.findall(r'name="(?:zz)?Niv\d_art_([^"]+)"', b)
        print(json.dumps(dict(seance=seance, i=i, mat=m and m.group(1), nom=m and m.group(2), type=m and m.group(4),
                              qualite=qual, amendements=[n for _, _, n in amd], texte_amdt=[f'{s}_{x}' for s, x, _ in amd][:1],
                              articles=art, parentheses=paren, mots=len(txt.split()), texte=txt[:3000]), ensure_ascii=False))
