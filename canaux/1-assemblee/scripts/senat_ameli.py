"""Extrait d'un dump PostgreSQL Ameli (data.senat.fr/data/ameli/ameli.zip -> ameli.sql)
les amendements des dossiers voulus (signets Sénat), avec auteurs, groupes, sorts, avis,
identiques/discussion commune, subdivision, alinéa visé. Sortie : un JSON par amendement.
Usage : python3 -I senat_ameli.py ameli.sql sortie.jsonl ppl23-735 pjl25-801 ..."""
import sys, json
def unesc(v):
    if v == r'\N': return None
    return v.replace('\\t', '\t').replace('\\n', '\n').replace('\\r', '').replace('\\\\', '\\')
def tables(path, keep):
    T = {}; cur = None
    with open(path, encoding='cp1252', errors='replace') as f:
        for line in f:
            if cur is None:
                if line.startswith('COPY '):
                    name = line.split()[1]
                    if name in keep:
                        cols = line[line.index('(')+1:line.index(')')].replace('"', '').split(', ')
                        cur = (name, cols); T[name] = []
                continue
            if line.startswith('\\.'):
                cur = None; continue
            vals = [unesc(v) for v in line.rstrip('\n').split('\t')]
            filt = keep[cur[0]]
            row = dict(zip(cur[1], vals))
            if filt is None or filt(row): T[cur[0]].append(row)
    return T
if __name__ == '__main__':
    sql, out, signets = sys.argv[1], sys.argv[2], set(sys.argv[3:])
    small = {k: None for k in ['avicom', 'avigvt', 'sor', 'grppol_ameli', 'com_ameli', 'nat', 'lec_ameli',
                               'mot', 'irr', 'typsub', 'ses', 'gvt', 'sen_ameli', 'cab', 'etatxt', 'sea', 'orarol']}
    T1 = tables(sql, {'txt_ameli': lambda r: r['doslegsignet'] in signets, **small})
    txt = {r['id']: r for r in T1['txt_ameli']}
    ids = set(txt)
    T2 = tables(sql, {'amd': lambda r: r['txtid'] in ids, 'sub': lambda r: r['txtid'] in ids,
                      'intora': lambda r: r['txtid'] in ids})
    amd = {r['id']: r for r in T2['amd']}
    T3 = tables(sql, {'amdsen': lambda r: r['amdid'] in amd})
    lk = lambda t, k='id': {r[k]: r for r in T1[t]}
    sor, avc, avg, grp, com, sub = lk('sor'), lk('avicom'), lk('avigvt'), lk('grppol_ameli', 'entid'), lk('com_ameli', 'entid'), {r['id']: r for r in T2['sub']}
    gvt, irr, ses = lk('gvt', 'entid'), lk('irr'), lk('ses')
    sig = {}
    for r in sorted(T3['amdsen'], key=lambda r: int(r['rng'] or 0)): sig.setdefault(r['amdid'], []).append(r)
    with open(out, 'w') as f:
        for a in amd.values():
            t = txt[a['txtid']]; s = sub.get(a['subid']) or {}
            auteurs = [{'auteur': (x['prenomuse'] or '') + ' ' + (x['nomuse'] or ''), 'qualite': x['qua'],
                        'groupe': (grp.get(x['grpid']) or {}).get('libcou'), 'groupe_code': (grp.get(x['grpid']) or {}).get('cod')}
                       for x in sig.get(a['id'], [])]
            ne = a['nomentid']
            f.write(json.dumps({
                'id': a['id'], 'num': a['num'], 'typ': a['typ'], 'pere': a['amdperid'], 'rev': a['rev'],
                'texte_num': t['num'], 'texte_session': (ses.get(t['sesdepid']) or {}).get('lil'), 'texte_type': t['txttyp'],
                'signet': t['doslegsignet'], 'lecture': t['lecid'],
                'subdivision': s.get('lib'), 'sub_pos': s.get('pos'), 'alinea': a['alinea'],
                'auteur_entite': ne, 'auteur_commission': (com.get(ne) or {}).get('lib'),
                'auteur_gouvernement': bool(gvt.get(ne)), 'libgrp': a['libgrp'], 'auteurs': auteurs,
                'sort': (sor.get(a['sorid']) or {}).get('lib'), 'avis_commission': (avc.get(a['avcid']) or {}).get('lib'),
                'avis_gouvernement': (avg.get(a['avgid']) or {}).get('lib'), 'irrecevabilite': (irr.get(a['irrid']) or {}).get('lib'),
                'identique_de': a['ideid'], 'discussion_commune': a['discomid'], 'ordre': a['ord'],
                'date_depot': a['datdep'], 'accord_gouv': a['accgou'], 'dispositif': a['dis'], 'objet': a['obj']},
                ensure_ascii=False) + '\n')
    json.dump({'textes': list(txt.values()), 'sor': T1['sor'], 'avicom': T1['avicom'], 'avigvt': T1['avigvt'],
               'grppol': T1['grppol_ameli'], 'irr': T1['irr'], 'intora': T2['intora'], 'sub': T2['sub'],
               'orarol': T1['orarol']},
              open(out + '.ref.json', 'w'), ensure_ascii=False)
    print(len(amd), 'amendements ;', len(txt), 'textes', file=sys.stderr)
