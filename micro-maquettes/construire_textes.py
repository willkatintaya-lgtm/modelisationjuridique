#!/usr/bin/env python3
"""Le projet de loi logement en entier, pour les micro-maquettes : les seize articles aux quatre étapes, et les 790 amendements
de commission (Assemblée) sur tous les articles. Écrit micro-maquettes/commun/textes.js (généré : ne pas éditer à la main).

Usage : python3 -I micro-maquettes/construire_textes.py <cache>
<cache> reçoit (ou contient déjà) les sources publiques :
  - Sénat, Akoma Ntoso : pjl25-801 (dépôt), pjl25-835 (commission), https://www.senat.fr/akomantoso/<signet>.akn.xml
  - Assemblée, open data : PRJLANR5L17B3058 (texte transmis), PRJLANR5L17BTC3188 (texte de la commission),
    https://www.assemblee-nationale.fr/dyn/opendata/<uid>.html
  - Assemblée, amendements : json/DLR5L17N54608/** extrait de
    https://data.assemblee-nationale.fr/static/openData/repository/17/loi/amendements_div_legis/Amendements.json.zip
Règles du projet : groupes et personnes fictifs (ceux de l'extrait fictionnalisé du canal 1, croisés par uid) ;
textes, sorts et dates réels ; les noms réels restés dans les exposés sont remplacés ou la phrase est écartée."""
import sys, os, re, json, glob, html, urllib.request, collections
import xml.etree.ElementTree as ET

ICI = os.path.dirname(os.path.abspath(__file__))
RACINE = os.path.dirname(ICI)
C = sys.argv[1].rstrip('/') if len(sys.argv) > 1 else os.path.join(ICI, 'sources')
os.makedirs(C, exist_ok=True)


def prendre(url, dest):
    if not os.path.exists(dest):
        print('télécharge', url)
        urllib.request.urlretrieve(url, dest)
    return dest


# ------------------------------------------------------------------ textes
A = '{http://docs.oasis-open.org/legaldocml/ns/akn/3.0}'
D = '{http://data.parlement.fr/v1}'
esp = lambda s: re.sub(r'\s+', ' ', s or '').strip()


def num_art(t):
    """« Article 4 bis (nouveau) » → ("4 bis", "(nouveau)") ; « Article PREMIER » → "1er"."""
    t = esp(t)
    m = re.match(r'Article\s+(premier|PREMIER|1er|\d+)(\s+(?:bis|ter|quater|quinquies))?\s*(\(.*\))?', t)
    if not m:
        return None, None
    n = m.group(1)
    n = '1er' if n.lower() in ('premier', '1er') else n
    return n + (m.group(2) or ''), m.group(3)


def sans_double(t):
    """« I. – I. – Le 1° … » → « I. – Le 1° … » (le Sénat répète la pastille)."""
    t = t.strip()
    m = re.match(r"^((?:[IVX]+|\d+°(?: bis| ter| quater)?|[a-z]{1,2}(?: bis| ter)?)[.)]?)\s*(?:–\s*)?", t)
    if m:
        core = m.group(1).rstrip('.)')
        rest = t[m.end():]
        if rest.startswith(core):
            return rest
    return t


def senat(signet):
    f = prendre(f'https://www.senat.fr/akomantoso/{signet}.akn.xml', os.path.join(C, signet + '.akn.xml'))
    out, divs = [], []
    def marche(e):
        for x in e:
            tag = x.tag.replace(A, '')
            if tag in ('title', 'chapter', 'section'):
                n, h = x.find(A + 'num'), x.find(A + 'heading')
                divs.append(dict(niv='titre' if tag == 'title' else 'chapitre' if tag == 'chapter' else 'section',
                                 num=esp(''.join(n.itertext())) if n is not None else '', intit=esp(''.join(h.itertext())) if h is not None else ''))
                marche(x)
            elif tag == 'article':
                n = x.find(A + 'num')
                num, mention = num_art(''.join(n.itertext())) if n is not None else (None, None)
                if not num:
                    continue
                als = []
                for al in x.iter(A + 'alinea'):
                    parts = [''.join(c.itertext()) for c in al if c.tag in (A + 'num', A + 'content')]
                    t = sans_double(esp(' '.join(parts)))
                    if t:
                        als.append(t)
                out.append(dict(num=num, mention=mention or x.get(D + 'mention'), divisions=divs[:], alineas=als))
                divs.clear()
            else:
                marche(x)
    marche(ET.parse(f).getroot())
    return out


def assemblee(uid):
    f = prendre(f'https://www.assemblee-nationale.fr/dyn/opendata/{uid}.html', os.path.join(C, uid + '.html'))
    h = open(f, encoding='utf-8').read()
    paras = re.findall(r'<p[^>]*class="(assnat[^"]*)"[^>]*>(.*?)</p>', h, re.S)
    clean = lambda s: esp(html.unescape(re.sub(r'<[^>]+>', '', s)))
    out, art, divs = [], None, []
    for cls, body in paras:
        t = clean(body)
        if not t:
            continue
        if 'ArticleNum' in cls:
            num, mention = num_art(t)
            art = dict(num=num, mention=mention, divisions=divs[:], alineas=[]) if num else None
            divs.clear()
            if art:
                out.append(art)
        elif t.startswith('«') and art is not None:          # un intitulé cité appartient à l'article
            art['alineas'].append(t)
        elif re.search(r'TitreNum|ChapitreNum', cls):
            divs.append(dict(niv='titre' if 'Titre' in cls else 'chapitre', num=t, intit=''))
            art = None
        elif re.search(r'TitreIntit|ChapitreIntit', cls) and divs:
            divs[-1]['intit'] = t
        elif art is not None and 'Mention' in cls:
            art['mention'] = ((art['mention'] or '') + ' ' + t).strip()
        elif art is not None and 'LoiTexte' in cls:
            if re.fullmatch(r'\((Supprimé|Non modifié|nouveau)\)', t):
                art['mention'] = ((art['mention'] or '') + ' ' + t).strip()
            else:
                art['alineas'].append(t)
    return out


def nom_reel(s):
    s = re.sub(r"«\s*dispositif Jeanbrun\s*»", "« dispositif Relance logement »", s)
    return re.sub(r"Jeanbrun", "Relance logement", s)


ETAPES = {'S-depot': senat('pjl25-801'), 'S-com': senat('pjl25-835'),
          'transmis': assemblee('PRJLANR5L17B3058'), 'AN-com': assemblee('PRJLANR5L17BTC3188')}
for k, arts in ETAPES.items():
    for a in arts:
        a['alineas'] = [nom_reel(x) for x in a['alineas']]
    print(k, len(arts), 'articles', sum(len(a['alineas']) for a in arts), 'alinéas')

# ------------------------------------------------------------------ amendements
FIC = json.load(open(os.path.join(RACINE, 'canaux/1-assemblee/extraits/an-commission-logement-amendements-rapport.json')))
PAR_UID = {x['uid']: x for x in FIC['donnees']}
fichiers = sorted(glob.glob(os.path.join(C, 'json/DLR5L17N54608/PRJLANR5L17B3058/*.json')))
if not fichiers:
    sys.exit("Amendements absents : extraire json/DLR5L17N54608/* de Amendements.json.zip dans " + C)
Z = [json.load(open(f))['amendement'] for f in fichiers]

nul = lambda v: None if isinstance(v, dict) and v.get('@xsi:nil') else v
# correspondances réel → fictif, apprises sur les amendements que l'extrait fictionnalisé connaît
PO, ACT = {}, {}
for z in Z:
    x = PAR_UID.get(z['uid']); au = z['signataires']['auteur']
    if x and x['groupe'] and nul(au.get('groupePolitiqueRef')):
        PO[au['groupePolitiqueRef']] = x['groupe']
    if x and x['auteur'] and nul(au.get('acteurRef')):
        ACT[au['acteurRef']] = x['auteur']
# les noms réels (signataires) qu'il ne faut pas laisser passer dans un exposé
REELS = set()
for z in Z:
    lib = html.unescape(z['signataires'].get('libelle') or '')
    for m in re.finditer(r"(?:M\.|Mme|MM\.)\s+((?:[A-ZÉÈ][\w'’-]+\s+)?(?:de\s+|d[’']|du\s+|Le\s+|La\s+)?[A-ZÉÈ][\w'’-]+)", lib):
        nom = m.group(1).split()[-1]
        if len(nom) > 3:
            REELS.add(nom)
GROUPES_REELS = [r"[ÉE]cologiste (?:et|&) [Ss]ocial", r"[ÉE]cologistes?", r"La France [Ii]nsoumise(?: ?[-–] ?Nouveau Front [Pp]opulaire)?", r"France [Ii]nsoumise",
                 r"[Ii]nsoumis\w*", r"Rassemblement [Nn]ational", r"[Ss]ocialistes?(?: et [Aa]pparentés)?", r"Ensemble pour la République", r"Droite [Rr]épubli\w*",
                 r"Les Démocrates", r"Horizons(?: et [Ii]ndépendants)?", r"Libertés,? [Ii]ndépendants,? [Oo]utre-mer et [Tt]erritoires", r"Gauche [Dd]émocrate et [Rr]épublicaine",
                 r"Union des droites(?: pour la République)?", r"Nouveau Front [Pp]opulaire", r"Renaissance", r"MoDem", r"Modem", r"Les Républicains",
                 r"LFI(?: ?[-–] ?NFP)?", r"LIOT", r"GDR", r"UDR"]
SIGLES = [r"NFP", r"RN", r"EPR", r"SOC", r"DR", r"EcoS", r"Dem", r"HOR"]   # trop courts : seulement après « groupe »
_G = "(?:" + "|".join(GROUPES_REELS) + r")(?: et [Aa]pparentés)?"
RG = re.compile(r"\b(?:(?:du|le|au|notre|par le) )?groupe (?:parlementaire )?(?:de )?(?:la |l’|l')?(?:" + "|".join(GROUPES_REELS + SIGLES) + r")(?: et [Aa]pparentés)?\b|(?:\b[Ll]a )?\b" + _G + r"\b")
NOMS_FIC = FIC['groupes_fictifs']


def scrub(s, g):
    """Un nom de groupe réel devient le nom fictif du groupe de l'auteur (ou « l'auteur »)."""
    nom = NOMS_FIC.get(g) if g else None
    def rep(m):
        t = m.group(0)
        if ' groupe ' in ' ' + t:
            return t.split('groupe')[0] + 'groupe ' + (nom or 'de l’auteur')
        return nom or 'l’auteur'
    return RG.sub(rep, nom_reel(s or ''))


for nom in ('Valérie', 'Lecornu', 'Macron', 'Bayrou', 'Barnier', 'Attal', 'Borne'):
    REELS.add(nom)
MOTIF = re.compile(r'\b(' + '|'.join(sorted(map(re.escape, REELS), key=len, reverse=True)) + r')\b')


def texte_html(s):
    s = html.unescape(html.unescape(s or ''))
    s = html.unescape(re.sub(r'<br\s*/?>|</p>', ' \n', s or ''))
    return esp(re.sub(r'<[^>]+>', '', s))


def objet(expose, g):
    """Les premières phrases de l'exposé, groupes réels remplacés ; la phrase qui garde un nom de personne réel est écartée."""
    phr = [p for p in re.split(r'(?<=[.!?])\s+', scrub(expose, g)) if p]
    garde = [p for p in phr if not MOTIF.search(p)]
    out = ''
    for p in garde:
        if len(out) > 220:
            break
        out = (out + ' ' + p).strip()
    return out, len(garde) < len(phr)


SORTS = {'Adopté', 'Rejeté', 'Tombé', 'Retiré', 'Non soutenu'}
ams, ecartees = [], 0
for z in Z:
    x = PAR_UID.get(z['uid']); au = z['signataires']['auteur']
    div = z['pointeurFragmentTexte'].get('division')
    if not div:   # deux amendements effacés (CE723, CE724), sans article visé ni texte
        continue
    num, _ = num_art(div.get('titre') or '')
    cy = z['cycleDeVie']; etat = cy['etatDesTraitements']['etat']['libelle']
    sous = nul(cy['etatDesTraitements'].get('sousEtat')); sous = sous['libelle'] if sous else None
    sort = nul(cy.get('sort')); sort = (sort.get('sortEnSeance') if isinstance(sort, dict) else sort) or (sous if sous in SORTS else None)
    inst = None
    if au['typeAuteur'] == 'Rapporteur':
        inst = 'rapporteure' if 'PO419610' in (nul(au.get('auteurRapporteurOrganeRef')) or 'PO419610') else 'rapporteur-avis'
    groupe = (x or {}).get('groupe') or PO.get(nul(au.get('groupePolitiqueRef')) or '', None)
    auteur = (x or {}).get('auteur') or ACT.get(nul(au.get('acteurRef')) or '', None)
    corps = nul(z['corps'].get('contenuAuteur')) or {}
    disp = texte_html(nul(corps.get('dispositif')) if corps else '')
    expo, ecarte = objet(texte_html(nul(corps.get('exposeSommaire')) if corps else ''), None if inst else groupe)
    ecartees += ecarte
    al = nul(z['pointeurFragmentTexte'].get('amendementStandard') or {})
    al = nul((al or {}).get('alinea')) if al else None
    ams.append(dict(num=z['identification']['numeroLong'], ordre=int(z['identification']['numeroOrdreDepot']),
                    art=num, place=(div.get('avant_A_Apres') or '').lower() if div.get('articleAdditionnel') == 'true' else '',
                    vise=esp(div.get('articleDesignation') or ''), alinea=(al or {}).get('alineaDesignation') if isinstance(al, dict) else None,
                    groupe=None if inst else groupe, inst=inst, auteur=auteur, cosign=len(z['signataires'].get('cosignataires', {}).get('acteurRef') or []) if isinstance(z['signataires'].get('cosignataires'), dict) else 0,
                    etat=etat, sousEtat=sous, sort=sort, depot=cy.get('dateDepot'), dateSort=nul(cy.get('dateSort')),
                    objet=expo, dispositif=scrub(disp, None if inst else groupe)))
ams.sort(key=lambda a: a['ordre'])
# contrôle : aucun nom réel connu ne doit rester
fuites = [(a['num'], m.group(0)) for a in ams for k in ('objet', 'dispositif') for m in [MOTIF.search(a[k] or '') or RG.search(a[k] or '')] if m]
print(len(ams), 'amendements ;', ecartees, 'exposés dont une phrase portant un nom réel a été écartée ;',
      sum(1 for a in ams if not a['auteur']), 'sans auteur fictif ;', len(fuites), 'noms dans les dispositifs', fuites[:8])
for a in ams:   # un nom réel dans un dispositif (rare : un intitulé de loi) : on le masque
    a['dispositif'] = MOTIF.sub('…', a['dispositif'] or '')
    if not a['auteur']:
        a['auteur'] = 'député du groupe' if a['groupe'] else 'député'

out = dict(source="Sénat (Akoma Ntoso pjl25-801, pjl25-835) et Assemblée (open data PRJLANR5L17B3058, PRJLANR5L17BTC3188, amendements du dossier DLR5L17N54608).",
           nota="Groupes et personnes fictifs ; textes, sorts et dates réels.", etapes=ETAPES, amendements=ams)
dest = os.path.join(ICI, 'commun', 'textes.js')
open(dest, 'w', encoding='utf-8').write('/* Généré par micro-maquettes/construire_textes.py — ne pas éditer à la main. */\nwindow.TXT=' +
                                        json.dumps(out, ensure_ascii=False, separators=(',', ':')) + ';\n')
print(dest, os.path.getsize(dest) // 1024, 'Ko')
