#!/usr/bin/env python3
"""Assemble une maquette en un seul fichier : remplace <!--NOYAU--> par les scripts communs en ligne, et <!--DA--> par direction-artistique/da.css."""
import sys, os, re
here = os.path.dirname(os.path.abspath(__file__))
nom = sys.argv[1]
src = open(os.path.join(here, nom, 'source.html'), encoding='utf-8').read()
noyau = ''.join('<script>\n' + open(os.path.join(here, 'commun', f), encoding='utf-8').read() + '\n</script>\n'
                for f in ['data.js', 'base.js', 'modele.js', 'noyau.js'])
app = os.path.join(here, nom, 'app.js')
if os.path.exists(app):
    src = src.replace('<!--APP-->', '<script>\n' + open(app, encoding='utf-8').read() + '\n</script>')
da = os.path.join(here, '..', 'direction-artistique', 'da.css')
if '<!--DA-->' in src and os.path.exists(da):
    src = src.replace('<!--DA-->', '<style>\n' + open(da, encoding='utf-8').read() + '\n</style>')
out = src.replace('<!--NOYAU-->', noyau)
dest = os.path.join(here, 'boussole-' + nom + '.html')
open(dest, 'w', encoding='utf-8').write(out)
print(dest, os.path.getsize(dest) // 1024, 'Ko')
