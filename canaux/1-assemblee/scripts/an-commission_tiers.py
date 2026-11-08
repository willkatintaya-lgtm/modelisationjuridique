"""Organisations auditionnées (liste « personnes entendues » d'un rapport) x mentions dans
les exposés sommaires (am.jsonl) et dans les débats de commission (paragraphes du rapport).
Usage : python3 -I an-commission_tiers.py rapport.jsonl debut_liste fin_liste debut_exam fin_exam am.jsonl dossier sortie.json"""
import sys, json, re, collections, unicodedata
R = [json.loads(l) for l in open(sys.argv[1])]
a, b, ea, eb = map(int, sys.argv[2:6]); dos = sys.argv[7]
def norm(s):
    s = unicodedata.normalize('NFD', s.lower()); s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.sub(r'[’\']', ' ', s)
HON = re.compile(r'^(–\s*)?(M\.|Mme|MM\.|Me\.?|Mlle|Dr|Pr|Colonel|Lieutenant|Capitaine|Commissaire|Général|Contrôleur|Commandant|Lieutenante|Maître|\(par|Table ronde|Audition|\*|Ministère|Organisme|Autorités)', re.I)
orgs = []
for r in R[a:b]:
    t = r['txt'].strip().lstrip('–- ').strip()
    if not t or HON.match(r['txt'].strip()) or len(t) > 220 or t.endswith(';') or t.endswith('.'): continue
    lobby = t.endswith('*'); t = t.rstrip('*').strip()
    m = re.search(r'\(([^)]{2,15})\)', t)
    sig = m.group(1) if m else None
    nom = re.sub(r'\s*\([^)]*\)', '', t).strip()
    orgs.append({'org': t, 'nom': nom, 'sigle': sig, 'hatvp': lobby})
exam = [r['txt'] for r in R[ea:eb]]
am = [json.loads(l) for l in open(sys.argv[6])]
am = [r for r in am if r['dossier'] == dos]
def hits(o, texts):
    pats = [re.escape(norm(o['nom']))]
    if o['sigle'] and len(o['sigle']) >= 3: pats.append(r'\b' + re.escape(norm(o['sigle'])) + r'\b')
    rx = re.compile('|'.join(pats))
    return [k for k, t in enumerate(texts) if rx.search(norm(t))]
ex = [r['expose'] or '' for r in am]
for o in orgs:
    h = hits(o, ex)
    o['n_exposes'] = len(h)
    o['n_exposes_commission'] = sum(1 for k in h if am[k]['organe_examen'] != 'AN')
    o['groupes_exposes'] = dict(collections.Counter(am[k]['groupe'] for k in h))
    o['ex_uid'] = [am[k]['uid'] for k in h][:5]
    o['n_debat'] = len(hits(o, exam))
# sources citées dans les exposés, hors liste
SRC = re.compile(r'(?:travaill[ée]e?s? (?:avec|en lien avec|en collaboration avec)|propos[ée]e?s? par|sugg[ée]r[ée]e?s? par|à la demande de|en lien avec|inspir[ée]e?s? (?:de|par)|recommandations? (?:de|du|des)|issu[es]* (?:de|du|des) (?:travaux|propositions?))\s+(?:l[ae’\'] ?|les |du |des |de la |de l’)?([A-ZÉ][^.,;:()]{3,70})')
srcs = collections.Counter()
for t in ex:
    for m in SRC.finditer(t): srcs[m.group(1).strip()[:60]] += 1
json.dump({'orgs': orgs, 'sources_exposes': srcs.most_common(80)}, open(sys.argv[8], 'w'), ensure_ascii=False, indent=1)
print(len(orgs), 'organisations ;', sum(o['hatvp'] for o in orgs), 'marquées HATVP')
print('citées dans >=1 exposé :', sum(1 for o in orgs if o['n_exposes']), '; dans débat :', sum(1 for o in orgs if o['n_debat']))
for o in sorted(orgs, key=lambda o: -o['n_exposes'])[:25]: print('  ', o['n_exposes'], o['n_exposes_commission'], o['n_debat'], o['hatvp'], o['org'][:70])
print('sources « travaillé avec / proposé par » les plus citées :')
for s, n in srcs.most_common(30): print('  ', n, s)
