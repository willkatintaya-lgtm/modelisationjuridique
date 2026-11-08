"""Découpe un compte rendu aplati (lire_cr.py) en « épisodes » : tout ce qui se passe entre deux décisions
annoncées par la présidence (« (L'amendement no X n'est pas adopté.) », « (L'article 3 est adopté.) », etc.).
Usage : python3 -I episodes_cr.py <cr.jsonl> <sortie.jsonl>"""
import json, sys, re, collections as C
P = [json.loads(l) for l in open(sys.argv[1])]
DEC = re.compile(r"\((?:L[’']|Les )(amendements?|sous-amendements?|article|articles|motion|proposition|ensemble)[^)]*?(n[’']est pas adoptée?s?|ne sont pas adoptés?|est adoptée?|sont adoptés?|est retirée?|sont retirés|tombent?|n[’']a plus d[’']objet|est réservé)[^)]*\)", re.I)
NUM = re.compile(r'n(?:o|os)\s*((?:\d+(?:\s*(?:,|et)\s*)?)+)')
AVIS = re.compile(r'^(?:Même avis|Avis (?:très )?(?:défavorable|favorable|de sagesse)|Sagesse|Défavorable|Favorable|Demande de retrait)', re.I)
out = open(sys.argv[2], 'w'); ep = []; n = 0
def flush(dec_p, dec_txt):
    global ep, n
    if not ep: return
    nums = sorted({int(x) for p in ep + [dec_p] for m in NUM.findall(p['texte']) for x in re.findall(r'\d+', m)})
    spk = [p['orateur'] for p in ep if p['orateur'] and p['role'] != 'president' and p['code'] != 'INTERRUPTION_1_10']
    avis = [(p['orateur'], AVIS.match(p['texte']).group(0)) for p in ep if p['orateur'] and AVIS.match(p['texte'])]
    scr = [re.search(r'saisie? par (.+?) d[’\']une demande de scrutin public', p['texte']) for p in ep]
    rec = dict(n=n, cr=ep[0]['cr'], date=ep[0]['date'], point=ep[-1]['point'], decision=dec_txt, nums=nums[:40],
               paragraphes=len(ep), mots=sum(len(p['texte'].split()) for p in ep),
               interruptions=sum(p['code'] == 'INTERRUPTION_1_10' for p in ep),
               orateurs=C.Counter(spk).most_common(), avis=avis,
               scrutin_public=[m.group(1) for m in scr if m],
               rappels_reglement=sum('rappel au règlement' in p['texte'] for p in ep),
               suspension=any((p['code'] or '').startswith('SUSP') for p in ep),
               discussion_commune=any('discussion commune' in p['texte'] for p in ep),
               identiques=any('identiques' in p['texte'] for p in ep),
               sous_amendement=any('sous-amendement' in p['texte'] for p in ep),
               retrait=any(re.search(r'je (?:le |les )?retire|retire (?:mon|notre|l’)amendement', p['texte'], re.I) for p in ep),
               codes=[p['code'] for p in ep if p['code'] not in ('PAROLE_GENERIQUE', 'INTERRUPTION_1_10')])
    out.write(json.dumps(rec, ensure_ascii=False) + '\n'); n += 1; ep = []
for p in P:
    ep.append(p)
    for m in DEC.finditer(p['texte']):
        flush(p, m.group(0))
flush(P[-1], '(fin)')
