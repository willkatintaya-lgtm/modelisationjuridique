"""Épisodes de séance sur toute la législature, à partir de cr_all.jsonl (an-seance_aplatir_cr.py).
Un épisode = ce qui se passe entre deux décisions de la présidence (sort d'amendement, de sous-amendement, d'article,
de motion). Durée réelle via l'attribut stime (secondes dans la vidéo de séance, horloge murale, suspensions comprises).
Usage : python3 -I an-seance_episodes.py <cr_all.jsonl> <episodes.jsonl>"""
import json, sys, re, collections as C
DECIS = re.compile(r'^(ADOP_ADTS?|REJET_ADT|AM8ENDSORT_REJET_IDENTIQUES|RETRAIT_ADTS?|ADT_SORTS_DIRECT_1_(20|40)|SCRUT_(PUB_ADT|ADTS|SOUS_AMEND|ART_PUB)_1_(5|9)|SCRUPUB_SSADTS_1_(5|9)|SCyRUT_ADT_ANN_1_5|SORT_SS_ADT_.*|SORT_ARTICLE_1_.*|ART_SORT_DIRECT_2_.*|REJET_MOTION_.*|SCR_MRJ_1_(5|9)|VOTE_ENS_.*_2_(40|50))$')
DEC_TXT = re.compile(r"\((?:L[’']|Les? |La )(?:amendements?|sous-amendements?|article|articles|motion)[^)]*?(?:n[’']est pas adoptée?s?|ne sont pas adoptés?|est adoptée?|sont adoptés?|sont successivement adoptés|est retirée?|sont retirés|tombent?)[^)]*\)", re.I)
AVIS = re.compile(r'^(Même avis|Avis (?:très |plutôt )?(?:défavorable|favorable)|Avis de sagesse|Sagesse|Défavorable|Favorable|Demande de retrait|Je m[’\']en remets à la sagesse|Retrait,? sinon avis défavorable|Avis défavorable|Je demande le retrait)', re.I)
SCR = re.compile(r'(?:saisie?|saisis) par (?:le |la )?(.+?) d[’\']une (?:demande|des demandes) de scrutin public|(?:saisie?|saisis) par (?:le |la )?(.+?) de (?:demandes|deux demandes|plusieurs demandes) de scrutin public', re.I)
def secs(p): return float(p['stime']) if p['stime'] else None
out = open(sys.argv[2], 'w'); n = 0
def flush(ep, nxt_t):
    global n
    if not ep: return
    dec = ep[-1]; ts = [secs(p) for p in ep if secs(p) is not None]
    t0 = ts[0] if ts else None
    parl = [p for p in ep if p['tag'] == 'paragraphe' and p['code'] != 'INTERRUPTION_1_10' and p['role'] != 'president' and p['orateur']]
    avis = []
    for i, p in enumerate(ep[:-1]):
        if re.search(r'Quel est l[’\']avis', p['texte']) or (avis and len(avis) < 4):
            q = ep[i + 1]
            if q['orateur'] and q['role'] != 'president' and AVIS.match(q['texte']): avis.append((q['qualite'] or q['orateur'] or '')[:40] + ' : ' + AVIS.match(q['texte']).group(0))
    sc = [m.group(1) or m.group(2) for p in ep for m in SCR.finditer(p['texte'])]
    txt = ' '.join(p['texte'] for p in ep)
    adts = sorted({p['adt'] for p in ep if p['adt']}, key=lambda x: (len(x), x))
    rec = dict(n=n, cr=ep[0]['cr'], seance=ep[0]['seance'], date=ep[0]['date'][:8], texte=next((p['p1'] for p in ep if p['p1']), None), phase=ep[0].get('phase'), art=next((p['art'] for p in ep if p['art']), ''),
        bibard=next((p['bibard'] for p in ep if p['bibard']), ''), adts=adts[:30], decision_code=dec['code'], decision=dec['texte'][:300],
        t0=t0, duree=(nxt_t - t0) if (t0 is not None and nxt_t is not None and nxt_t >= t0) else None,
        paragraphes=len(ep), prises=len(parl), mots=sum(len(p['texte'].split()) for p in ep),
        mots_parl=sum(len(p['texte'].split()) for p in parl), interruptions=sum(p['code'] == 'INTERRUPTION_1_10' for p in ep),
        orateurs=C.Counter(p['orateur'] for p in parl).most_common(), qualites=sorted({p['qualite'] for p in parl if p['qualite']}),
        avis=avis, scrutin_demande=sc, scrutin=any(re.match(r'^(SCRUT|SCRUPUB|SCyRUT)', p['code']) for p in ep),
        rappels=sum(p['code'] == 'RAP_REGLEMENT_2_1' for p in ep), suspensions=sum(p['code'] in ('SUSP_SEANCE_2_2', 'SUSP_SEAN_PRES_3', 'SUSP_BREVE_1_1') for p in ep),
        suspension_txt=[p['texte'][:160] for p in ep if p['code'] in ('SUSP_SEANCE_2_1', 'SUSP_SEAN_PRES_2')],
        retire=bool(re.search(r'\b(?:est|sont) retirée?s?\b', dec['texte'])), demande_retrait=bool(re.search(r'demande (?:de |le )?retrait|demander (?:son|le) retrait|vous invite à (?:le )?retirer|retirer votre amendement', txt, re.I)),
        rectifie=bool(re.search(r'rectifi', txt)), rectif_seance=bool(re.search(r'(?:je |nous )?(?:le |l’)?rectifie|rectification orale|modifier (?:mon|notre|votre) amendement|accepte(?:z)?(?:-vous)? (?:de |la )?rectifi|sous réserve (?:de la |d’une )?rectification', txt, re.I)),
        sous_amdt_oral=bool(re.search(r'sous-amendement oral', txt, re.I)), sous_amdt=bool(re.search(r'sous-amendement', txt)),
        sagesse=bool(re.search(r'sagesse', ' '.join(a for a in avis))), identiques='identiques' in txt, discussion_commune='discussion commune' in txt,
        tombent='tombe' in dec['texte'], faits_perso=sum(p['code'].startswith('FAIT_PERSONNEL') for p in ep), quorum=any(p['code'].startswith('VERIF_QUORUM') for p in ep),
        codes=C.Counter(p['code'] for p in ep if p['code'] not in ('PAROLE_GENERIQUE', 'INTERRUPTION_1_10')).most_common())
    out.write(json.dumps(rec, ensure_ascii=False) + '\n'); n += 1
PH = {'TITRE_TEXTE_DISCUSSION': 'texte', 'DISC_GENERALE_1': 'discussion générale', 'MOTION_RP_1_1': 'motion', 'DISC_ARTICLES_1_1': 'articles',
      'DISC_ARTICLES_1_2': 'explications de vote', 'QG_1_1': 'questions au gouvernement', 'QOSD_1_1': 'questions orales', 'APPEL_PLF_1_20': 'texte',
      'APPEL_PLF_1_40': 'vote solennel', 'PLF_PARTIES_1_10': 'articles', 'PLF_PARTIES_1_20': 'articles', 'PLF_PARTIES_1_30': 'articles', 'PLFSS_1_20': 'articles',
      'PLFSS_1_30': 'articles', 'PLFSS_1_10': 'articles', '49_3_1_10': '49.3', 'VOTE_CENSURE_1_10': 'motion de censure', 'FIN_SEAN_1_2': 'fin', 'OUV_SEAN_1_1': 'ouverture'}
cur = None; ep = []; phase = None
def is_dec(p): return bool(DECIS.match(p['code'])) or (p['tag'] == 'paragraphe' and p['code'] in ('PAROLE_GENERIQUE','DISC_ARTICLES_3_4_1') and DEC_TXT.match(p['texte']) and not p['orateur'])
for l in open(sys.argv[1]):
    p = json.loads(l)
    if p['cr'] != cur:
        flush(ep, max((secs(x) for x in ep if secs(x)), default=None)); ep = []; cur = p['cr']
    if p['code'] in PH and p['tag'] in ('point', 'ouvertureSeance') and not (PH[p['code']] == 'questions au gouvernement' and phase == 'questions au gouvernement'):
        flush(ep, secs(p) or max((secs(x) for x in ep if secs(x)), default=None)); ep = []; phase = PH[p['code']]
    p['phase'] = phase
    ep.append(p)
    if is_dec(p):
        pend = ep; ep = []  # durée = du premier horodatage de l'épisode à celui de la décision (ou au dernier connu)
        flush(pend, secs(p) if secs(p) else max((secs(x) for x in pend if secs(x)), default=None))
flush(ep, None)
