#!/usr/bin/env python3
"""Construit une maquette « avant » (forme de l'inspiration) : python3 maquettes-avant/construire_avant.py <nom>
→ maquettes-avant/avant-<nom>.html. Même socle que les « après » (maquettes/commun/), qui n'a pas changé depuis le commit 61cf649."""
import sys, os
here = os.path.dirname(os.path.abspath(__file__)); commun = os.path.join(here, '..', 'maquettes', 'commun')
nom = sys.argv[1]
src = open(os.path.join(here, nom, 'source.html'), encoding='utf-8').read()
noyau = ''.join('<script>\n' + open(os.path.join(commun, f), encoding='utf-8').read() + '\n</script>\n' for f in ['data.js', 'base.js', 'modele.js', 'noyau.js'])
src = src.replace('<!--APP-->', '<script>\n' + open(os.path.join(here, nom, 'app.js'), encoding='utf-8').read() + '\n</script>')
dest = os.path.join(here, 'avant-' + nom + '.html'); open(dest, 'w', encoding='utf-8').write(src.replace('<!--NOYAU-->', noyau)); print(dest)
