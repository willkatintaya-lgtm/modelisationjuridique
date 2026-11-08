"""Parse la partie « examen des articles » d'un rapport de commission AN (sortie de
an-commission_paragraphes.py) en épisodes (un titre « Amendement(s) ... » -> débat -> décision).
Usage : python3 -I an-commission_examen.py rapport.jsonl debut fin PREFIXE sortie.json
PREFIXE = CE, CL...  Sortie : {episodes:[...], mentions:{num:{...}}}"""
import sys, json, re, collections
src, a, b, pref, out = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4], sys.argv[5]
R = [json.loads(l) for l in open(src)][a:b]
NUM = re.compile(r'\b(?:C[A-Z]) ?(\d+)')
def nums(t):
    t2 = re.sub(r'\b(C[A-Z]) ?(\d+) à (?:C[A-Z] ?)?(\d+)',
                lambda m: ' '.join(f'{m.group(1)}{i}' for i in range(int(m.group(2)), int(m.group(3)) + 1)), t)
    # « CE183, 360 et 604 » : numéros nus qui suivent un numéro préfixé
    res = []
    for m in re.finditer(r'\b(C[A-Z]) ?(\d+)((?:\s*(?:,|et)\s*\d+\b)*)', t2):
        p = m.group(1); res.append(p + m.group(2))
        res += [p + x for x in re.findall(r'\d+', m.group(3))]
    return res
SPK = re.compile(r'^(M\.|Mme|MM\.) (le président |la présidente |la rapporteure |le rapporteur )?([^.(,]{2,60}?)(?: \(([^)]+)\)|, ([^.]{3,80}?))?\. (.*)$')
DEC = re.compile(r'(adopte|rejette|retiré|retirée|retirés|tombe|tombent|rejetés|adoptés|n’est pas adopté|est rejeté|est adopté)')
ARTH = re.compile(r'^(Article|Articles|Après l’article|Avant l’article|Après l\'article|Avant l\'article|Chapitre|TITRE|Titre)\b')
AMH = re.compile(r'^(Amendements?|Sous-amendements?)\b.*\b(C[A-Z]) ?\d+')
eps = []; cur = None; art = None; reunion = None; spk = None
def new(kind, txt, i):
    global cur
    cur = {'id': len(eps), 'i': i, 'kind': kind, 'article': art, 'reunion': reunion, 'titre': txt,
           'ams': nums(txt) if kind == 'debat' else [], 'paroles': [], 'decisions': []}
    eps.append(cur)
for r in R:
    t = r['txt']; i = r['i']
    if 'AN4Petit1' in r['cls'] or re.match(r'^(Première |Deuxième |Troisième |Suite de la |\d+\. )?[Rr]éunion du', t):
        reunion = t[:120]; cur = None; continue
    if ARTH.match(t) and len(t) < 400 and not SPK.match(t):
        art = t[:160]; cur = None; continue
    if AMH.match(t) and len(t) < 900:
        new('debat', t, i); spk = None; continue
    m = SPK.match(t)
    if m:
        name = (m.group(2) or '') + m.group(3); grp = m.group(4); role = m.group(5)
        spk = {'nom': name.strip(), 'groupe': grp, 'role': role}
        if cur is None: new('hors', '', i)
        cur['paroles'].append(dict(spk, mots=len(m.group(6).split()), i=i, txt=m.group(6)[:400]))
        continue
    if DEC.search(t) and len(t) < 600 and re.match(r'^(La commission|Elle|Puis|L’amendement|L\'amendement|Les amendements|En conséquence|Suivant|Contre|Successivement|Le sous|Les sous|Après|Malgré|Conformément)', t):
        if cur is None or cur['kind'] == 'article': new('sec', '', i)
        cur['decisions'].append({'i': i, 'txt': t, 'ams': nums(t)})
        continue
    # continuation d'une prise de parole
    if cur is not None and cur['paroles'] and spk:
        cur['paroles'][-1]['mots'] += len(t.split())
json.dump({'episodes': eps}, open(out, 'w'), ensure_ascii=False, indent=0)
print(len(eps), 'épisodes', collections.Counter(e['kind'] for e in eps))
