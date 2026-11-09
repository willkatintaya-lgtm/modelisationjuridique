#!/usr/bin/env python3
"""Assemble une micro-maquette en un seul fichier autonome (socle, cadre et code en ligne) :
python3 micro-maquettes/construire.py <id> [<id>…]  (sans argument : toutes)  →  micro-maquettes/autonomes/<id>.html (non versionné)."""
import sys, os, re, glob
here = os.path.dirname(os.path.abspath(__file__))
ids = sys.argv[1:] or sorted(os.path.basename(os.path.dirname(p)) for p in glob.glob(os.path.join(here, 'M*', 'index.html')))
os.makedirs(os.path.join(here, 'autonomes'), exist_ok=True)
for id_ in ids:
    d = os.path.join(here, id_)
    src = open(os.path.join(d, 'index.html'), encoding='utf-8').read()
    lire = lambda rel: open(os.path.normpath(os.path.join(d, rel)), encoding='utf-8').read()
    src = re.sub(r'<link rel="stylesheet" href="(\.\./[^"]+\.css)">', lambda m: '<style>\n' + lire(m.group(1)) + '\n</style>', src)
    src = re.sub(r'<script src="(\.\./[^"]+\.js)"></script>', lambda m: '<script>\n' + lire(m.group(1)).replace('</script', '<\\/script') + '\n</script>', src)
    dest = os.path.join(here, 'autonomes', id_ + '.html')
    open(dest, 'w', encoding='utf-8').write(src)
    print(dest, os.path.getsize(dest) // 1024, 'Ko')
