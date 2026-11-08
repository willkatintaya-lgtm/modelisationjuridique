"""Aplatit un rapport AN (HTML open data /dyn/opendata/<uid>.html) en paragraphes.
Usage : python3 -I an-commission_paragraphes.py rapport.html sortie.jsonl
Chaque ligne : {i, tag, cls, txt}. Classes utiles : assnatAN1PARTIE (parties),
assnatAnx2GdI / Anx3GdA / Anx4Pt1 (titres), assnatEXA7Article (article examiné),
assnatEncaTitre/EncaTexte (encadrés), assnatTOC* (sommaire), assnatTABCase (tableaux)."""
import sys, json, re
from html.parser import HTMLParser
BLOCK = {'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'td', 'th', 'li'}
class P(HTMLParser):
    def __init__(s):
        super().__init__(); s.out = []; s.cur = None; s.skip = 0
    def handle_starttag(s, t, a):
        if t in ('script', 'style'): s.skip += 1
        if t in BLOCK:
            s.flush(); s.cur = {'tag': t, 'cls': dict(a).get('class', ''), 'buf': []}
        if t == 'br' and s.cur: s.cur['buf'].append(' ')
    def handle_endtag(s, t):
        if t in ('script', 'style'): s.skip -= 1
        if t in BLOCK: s.flush()
    def handle_data(s, d):
        if s.skip: return
        if s.cur is None: s.cur = {'tag': '', 'cls': '', 'buf': []}
        s.cur['buf'].append(d)
    def flush(s):
        if s.cur:
            txt = re.sub(r'\s+', ' ', ''.join(s.cur['buf'])).strip()
            if txt: s.out.append({'tag': s.cur['tag'], 'cls': s.cur['cls'], 'txt': txt})
        s.cur = None
p = P(); p.feed(open(sys.argv[1], encoding='utf-8').read()); p.flush()
with open(sys.argv[2], 'w') as f:
    for i, r in enumerate(p.out):
        r['i'] = i; f.write(json.dumps(r, ensure_ascii=False) + '\n')
print(len(p.out), 'paragraphes', sum(len(r['txt'].split()) for r in p.out), 'mots')
