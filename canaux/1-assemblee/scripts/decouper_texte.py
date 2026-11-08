"""Découpe un texte AN (HTML de /dyn/opendata/<uid>.html) en divisions → articles → alinéas.
Usage : python3 -I decouper_texte.py <fichier.html> <sortie.json>
Heuristique : les classes assnat* portent la structure (assnat9ArticleNum = intitulé d'article,
assnatLoiTexte = alinéa). Numérotation des alinéas : 1..n dans chaque article, comme dans les amendements."""
import re, sys, json, html

h = open(sys.argv[1], encoding='utf-8').read()
paras = re.findall(r'<p[^>]*class="(assnat[^"]*)"[^>]*>(.*?)</p>', h, re.S)
clean = lambda s: re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', s))).strip()
out, art, ctx = [], None, []
for cls, body in paras:
    t = clean(body)
    if not t: continue
    if 'ArticleNum' in cls:
        art = {'article': t, 'contexte': ' / '.join(ctx), 'alineas': [], 'mentions': []}
        out.append(art)
    elif re.search(r'Titre|Chapitre|Section', cls):
        lvl = 0 if 'Titre' in cls else 1 if 'Chapitre' in cls else 2
        if 'Num' in cls: ctx = ctx[:lvl] + [t]
        else: ctx[-1:] = [ctx[-1] + ' ' + t] if ctx else [t]
    elif 'Mention' in cls or 'mention' in cls:
        if art: art['mentions'].append(t)
    elif art is not None:
        art['alineas'].append(t)
json.dump(out, open(sys.argv[2], 'w'), ensure_ascii=False, indent=1)
print(len(out), 'articles', sum(len(a['alineas']) for a in out), 'alinéas')
