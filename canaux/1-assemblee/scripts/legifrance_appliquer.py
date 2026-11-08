"""Applique mécaniquement les instructions de modification d'un article de loi
(« après le mot X, sont insérés les mots Y », « le premier alinéa est remplacé par… »)
au texte consolidé d'un article de code (Markdown Tricoteuses, git.tricoteuses.fr/codes/...).

Usage : python3 -I legifrance_appliquer.py <article_code.md> <texte_decoupe.json> "<Article N>" <sortie.json> [convention]
  convention : "origine" (numéros d'alinéas lus dans le texte avant modification, défaut)
               ou "successive" (chaque instruction voit le texte déjà modifié par les précédentes)
Sortie : JSON {instructions:[{n, texte, forme, statut, detail}], avant:{lettre:[alinéas]}, apres:{...}}
Portée : article 31 CGI, subdivisions « lettre) » du 1° du I. Prototype, pas un moteur général.
"""
import json, re, sys

ORD = {'premier': 1, 'première': 1, 'deuxième': 2, 'second': 2, 'seconde': 2, 'troisième': 3, 'quatrième': 4,
       'cinquième': 5, 'sixième': 6, 'septième': 7, 'huitième': 8, 'neuvième': 9, 'dixième': 10,
       'onzième': 11, 'douzième': 12, 'treizième': 13, 'quatorzième': 14, 'quinzième': 15, 'dernier': -1, 'dernière': -1}
NB = {'un': 1, 'deux': 2, 'trois': 3, 'quatre': 4, 'cinq': 5}


def norm(s):
    return (s.replace('’', "'").replace('‑', '-').replace(' ', ' ').replace(' ', ' ')
            .replace('« ', '«').replace(' »', '»').strip())


def lire_article(path):
    t = open(path, encoding='utf-8').read().split('---', 2)[2]
    paras = [norm(p.replace('<br />', '')) for p in t.split('\n\n') if p.strip()]
    paras = [p for p in paras if not p.startswith('# ')]
    subs, cur = {}, None
    for p in paras:
        m = re.match(r'^([a-z](?: bis| ter| quater)?)\) ', p)
        if m:
            cur = m.group(1); subs[cur] = []
        elif re.match(r'^(\d+°|[IVX]+\.) ', p):
            cur = None
        if cur:
            subs[cur].append(p)
    return subs


def phrases(al):
    # découpe en phrases sans couper « n° », « L. 111-1 », « art. »
    out, buf = [], ''
    for tok in re.split(r'(?<=[.;])\s+(?=[A-ZÀÉÈ«])', al):
        if buf and re.search(r'(\bL|\bR|\bD|\bart|\bn°|\bp)\.$', buf):
            buf += ' ' + tok
        else:
            if buf: out.append(buf)
            buf = tok
    if buf: out.append(buf)
    return out


def lire_instructions(alineas):
    """Rend [(texte, cible_lettre, [alinéas cités suivants])]."""
    res, cur, i, ctx_al = [], None, 0, None
    A = [norm(a) for a in alineas]
    while i < len(A):
        a = A[i]
        m = re.search(r'(?:Le|le) ([a-z](?: bis)?) est ainsi modifié', a)
        if m:
            cur = m.group(1)
        mal = re.search(r"^(?:[a-z](?: bis| ter)?\) )?Le ([a-zéè]+) alinéa est ainsi modifié", a)
        if mal:
            ctx_al = mal.group(1); i += 1; continue
        if a.startswith('–') and ctx_al:
            a = a + ' [' + ctx_al + ' alinéa]'
        elif not a.startswith('–'):
            ctx_al = None
        m2 = re.search(r'\bdu ([a-z])(?=[ ,]|$)', a)
        cible = m2.group(1) if m2 and not m else cur
        cites = []
        if 'ainsi rédigé' in a:
            j = i + 1
            while j < len(A) and A[j].startswith('«'):
                cites.append(A[j]); j += 1
                if re.search(r'»\s*[;.]?\s*$', A[j - 1]): break
            i = j - 1
        if re.search(r'(inséré|remplacé|complété|supprimé)', a) and not m:
            res.append((a, cible, cites))
        i += 1
    return res


def enlever_guillemets(c):
    c = re.sub(r'^«\s*', '', c)
    c = re.sub(r'\s*»\s*[;.]?\s*$', '', c)
    return c


def appliquer(subs, instr, convention='origine'):
    orig = {k: list(v) for k, v in subs.items()}
    # map numéro d'origine -> index courant, par lettre
    pos = {k: list(range(len(v))) for k, v in subs.items()}
    log = []
    for n, (txt, lettre, cites) in enumerate(instr, 1):
        e = {'n': n, 'texte': txt, 'cible': lettre, 'forme': None, 'statut': 'non mécanisé', 'detail': ''}
        log.append(e)
        if lettre not in subs:
            e['detail'] = 'subdivision cible introuvable'; continue
        S = subs[lettre]

        def idx(k):
            if convention == 'successive':
                return len(S) - 1 if k == -1 else k - 1
            P = pos[lettre]
            return P[-1] if k == -1 else P[k - 1]
        m = re.search(r"(premier|[a-zéè]+ième|dernier) alinéa est remplacé par (\w+) alinéas? ainsi rédigés?", txt)
        if m:
            e['forme'] = 'remplacer alinéa(s)'
            k = idx(ORD[m.group(1)]); new = [enlever_guillemets(c) for c in cites]
            S[k:k + 1] = new
            P = pos[lettre]; o = P.index(k)
            pos[lettre] = P[:o + 1] + [p + len(new) - 1 for p in P[o + 1:]]
            e['statut'] = 'appliqué'; e['detail'] = f'alinéa {k+1} remplacé par {len(new)}'; continue
        m = re.search(r"Après le ([a-zéè]+) alinéa, sont insérés (\w+) alinéas", txt)
        if m:
            e['forme'] = 'insérer alinéas'
            k = idx(ORD[m.group(1)]); new = [enlever_guillemets(c) for c in cites]
            S[k + 1:k + 1] = new
            P = pos[lettre]; pos[lettre] = [p if p <= k else p + len(new) for p in P]
            e['statut'] = 'appliqué'; e['detail'] = f'{len(new)} alinéas insérés après le {k+1}e'; continue
        # localisation : alinéa, phrase
        ma = re.search(r"(premier|[a-zéè]+ième|dernier) alinéa", txt)
        mp = re.search(r"(première|[a-zéè]+ième|dernière|seconde) phrase", txt)
        if not ma:
            e['detail'] = 'alinéa non localisé'; continue
        k = idx(ORD[ma.group(1)])
        if k >= len(S):
            e['statut'] = 'échec'; e['detail'] = f'alinéa {k+1} inexistant'; continue
        al = S[k]; ph = phrases(al)
        pk = None
        if mp:
            pk = ORD[mp.group(1)]; pk = len(ph) - 1 if pk == -1 else pk - 1
            if pk >= len(ph):
                e['statut'] = 'échec'; e['detail'] = f'phrase {pk+1} inexistante ({len(ph)} phrases)'; continue
        zone = ph[pk] if pk is not None else al
        q = re.findall(r'«([^»]*)»', txt)
        m1 = re.search(r"après (?:le mot|les mots|la référence|la première occurrence du mot) :", txt)
        m2 = re.search(r"(?:le mot|les mots|la référence) :.*sont remplacés|est remplacée?", txt)
        m3 = re.search(r"est complétée? par les mots", txt)
        m4 = re.search(r"sont supprimés|est supprimé", txt)
        if m4 and q and not m2:
            a = q[0]; occ = zone.count(a)
            e['forme'] = 'supprimer mots'
            if occ == 0:
                e['statut'] = 'échec'; e['detail'] = f'« {a} » absent de la zone'; continue
            nz = zone.replace(a, '', 1).replace('  ', ' ')
            e['statut'] = 'appliqué' if occ == 1 else 'ambigu (1re occurrence prise)'
            e['detail'] = f'{occ} occurrence(s)'
            if pk is not None: ph[pk] = nz; S[k] = ' '.join(ph)
            else: S[k] = nz
            e['detail'] += f' ; alinéa {k+1}' + (f', phrase {pk+1}/{len(ph)}' if pk is not None else '')
            continue
        if m1 and len(q) >= 2:
            e['forme'] = 'insérer après'
            a, b = q[0], q[1]
            # règle de ponctuation : les mots insérés commençant par « , » se collent
            ins = b if b.startswith(',') else ' ' + b
            ins = ins.rstrip(',') + (',' if b.endswith(',') else '')
            occ = len(re.findall(r'(?<!\w)' + re.escape(a) + r'(?!\w)', zone))
            if occ == 0:
                e['statut'] = 'échec'; e['detail'] = f'« {a} » absent de la zone'; continue
            nz = re.sub(r'(?<!\w)' + re.escape(a) + r'(?!\w)', lambda m_: m_.group(0) + ins, zone, count=1)
            e['detail'] = f'{occ} occurrence(s) de « {a} » dans la zone'
            e['statut'] = 'appliqué' if occ == 1 else 'ambigu (1re occurrence prise)'
        elif m2 and len(q) >= 2:
            e['forme'] = 'remplacer mots'
            a, b = q[0], q[1]
            occ = zone.count(a)
            if occ == 0:
                e['statut'] = 'échec'; e['detail'] = f'« {a} » absent de la zone'; continue
            nz = zone.replace(a, b, 1)
            e['detail'] = f'{occ} occurrence(s) de « {a} »'
            e['statut'] = 'appliqué' if occ == 1 else 'ambigu (1re occurrence prise)'
        elif m3 and q:
            e['forme'] = 'compléter phrase'
            b = q[0]; nz = re.sub(r'([.;])?$', lambda m_: b + (m_.group(1) or ''), zone.rstrip(), count=1)
            e['statut'] = 'appliqué'
        else:
            e['detail'] = 'forme non reconnue'; continue
        if pk is not None:
            ph[pk] = nz; S[k] = ' '.join(ph)
        else:
            S[k] = nz
        e['detail'] += f' ; alinéa {k+1}' + (f', phrase {pk+1}/{len(ph)}' if pk is not None else '')
    return orig, subs, log


if __name__ == '__main__':
    art, txt, nom, out = sys.argv[1:5]
    conv = sys.argv[5] if len(sys.argv) > 5 else 'origine'
    subs = lire_article(art)
    T = [a for a in json.load(open(txt, encoding='utf-8')) if a['article'] == nom][0]
    instr = lire_instructions(T['alineas'])
    orig, apres, log = appliquer(subs, instr, conv)
    touch = sorted({e['cible'] for e in log if e['cible']})
    json.dump({'convention': conv, 'instructions': log,
               'avant': {k: orig[k] for k in touch if k in orig},
               'apres': {k: apres[k] for k in touch if k in apres}},
              open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    for e in log:
        print(e['n'], e['cible'], e['forme'], '|', e['statut'], '|', e['detail'], '|', e['texte'][:90])
