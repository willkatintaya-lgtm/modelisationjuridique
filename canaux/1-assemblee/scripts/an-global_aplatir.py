"""Aplatit TOUT le zip des amendements AN (lecture directe dans le zip) en JSONL compact + traits dérivés.
Usage : python3 -I an-global_aplatir.py amendements.zip dossiers_dir sortie.jsonl"""
import json, sys, zipfile, re, html, os
def nil(v): return None if (isinstance(v, dict) and v.get('@xsi:nil') == 'true') else v
def g(d, *p):
    for k in p:
        if not isinstance(d, dict): return None
        d = nil(d.get(k))
    return d
def txt(h):
    if not h: return ''
    h = re.sub(r'<br\s*/?>|</p>', '\n', h)
    return html.unescape(re.sub(r'<[^>]+>', '', h)).replace('\xa0',' ').strip()
proc = {}; titre = {}
for f in os.listdir(sys.argv[2]):
    try:
        dp = json.load(open(os.path.join(sys.argv[2], f)))['dossierParlementaire']
        proc[dp['uid']] = dp['procedureParlementaire']['libelle']; titre[dp['uid']] = dp['titreDossier']['titre']
    except Exception: pass
OPS = re.compile(r'(?m)^\s*(?:[IVX]+)\.\s*[–-]')
GAGE = re.compile(r"perte de recettes|charge pour l.(?:État|Etat)|compensée.{0,80}(?:accise|taxe additionnelle|majoration)", re.I)
RAPP = re.compile(r"(?:Gouvernement|il est) remet.{0,60}rapport|remet au Parlement.{0,40}rapport|rapport .{0,40}(?:est remis|remis au Parlement)", re.I)
REDAC = re.compile(r"rédactionnel|de coordination|de précision|de cohérence|erreur matérielle|légistique", re.I)
SUPPA = re.compile(r"^\s*Supprimer (?:cet|l.)article", re.I)
SUPPAL = re.compile(r"^\s*Supprimer (?:l.alinéa|les alinéas)", re.I)
ALI = re.compile(r"alinéas? (\d+)(?:\s*(?:à|et)\s*(\d+))?")
CONSEQ = re.compile(r"[Ee]n conséquence")
z = zipfile.ZipFile(sys.argv[1]); out = open(sys.argv[3], 'w')
for n in z.namelist():
    if not n.endswith('.json'): continue
    try: a = json.loads(z.read(n))['amendement']
    except Exception as e: print('ERR', n, e, file=sys.stderr); continue
    parts = n.split('/'); dos = parts[1] if len(parts) > 3 else None
    s = a.get('signataires') or {}; cos = g(s, 'cosignataires', 'acteurRef')
    if isinstance(cos, str): cos = [cos]
    div = g(a, 'pointeurFragmentTexte', 'division') or {}
    cv = a.get('cycleDeVie') or {}; ca = g(a, 'corps', 'contenuAuteur') or {}
    disp = txt(ca.get('dispositif')); exp = txt(ca.get('exposeSommaire'))
    al = g(a, 'pointeurFragmentTexte', 'amendementStandard', 'alinea') or {}
    cited = set()
    for m in ALI.finditer(disp):
        x = int(m.group(1)); y = int(m.group(2)) if m.group(2) else x
        if y - x < 200: cited.update(range(x, y + 1))
    try: decl = int(al.get('numero')) if al.get('numero') else None
    except: decl = None
    r = dict(uid=a['uid'], dos=dos, proc=proc.get(dos), texte=a.get('texteLegislatifRef'),
        num=g(a, 'identification', 'numeroLong'), org_ex=g(a, 'identification', 'prefixeOrganeExamen'),
        rect=g(a, 'identification', 'numeroRect'), examen=a.get('examenRef'),
        parent=nil(a.get('amendementParentRef')), mult=a.get('cardinaliteAmdtMultiples'),
        tauteur=g(s, 'auteur', 'typeAuteur'), auteur=g(s, 'auteur', 'acteurRef'), groupe=g(s, 'auteur', 'groupePolitiqueRef'),
        gouv=g(s, 'auteur', 'gouvernementRef'), ncos=len(cos or []),
        div=div.get('articleDesignationCourte'), div_type=div.get('type'), art_add=div.get('articleAdditionnel'),
        decl=decl, cited=sorted(cited)[:60], ncited=len(cited),
        dl=len(disp), el=len(exp), nops=len(OPS.findall(disp)), conseq=bool(CONSEQ.search(disp)),
        gage=bool(GAGE.search(disp)), rapport=bool(RAPP.search(disp)), redac=bool(REDAC.search(exp[:400])),
        suppart=bool(SUPPA.match(disp)), suppal=bool(SUPPAL.match(disp)),
        d0=disp[:160], e0=exp[:160],
        cart=bool(g(a, 'corps', 'cartoucheInformatif')),
        ddep=cv.get('dateDepot'), dpub=cv.get('datePublication'), dsort=nil(cv.get('dateSort')),
        art40=cv.get('soumisArticle40'),
        etat=g(cv, 'etatDesTraitements', 'etat', 'libelle'), setat=g(cv, 'etatDesTraitements', 'sousEtat', 'libelle'),
        sort=nil(cv.get('sort')), seance=nil(a.get('seanceDiscussionRef')),
        dc=g(a, 'discussionCommune', 'idDiscussion') if isinstance(nil(a.get('discussionCommune')), dict) else nil(a.get('discussionCommune')),
        di=g(a, 'discussionIdentique', 'idDiscussion') if isinstance(nil(a.get('discussionIdentique')), dict) else nil(a.get('discussionIdentique')),
        dcpos=g(a, 'discussionCommune', 'typePosition'), dipos=g(a, 'discussionIdentique', 'typePosition'), loi=g(a,'loiReference','codeLoi'),
        art99=a.get('article99'), hd=a.get('accordGouvernementDepotHorsDelai'))
    out.write(json.dumps(r, ensure_ascii=False) + '\n')
json.dump(titre, open(sys.argv[3] + '.titres.json', 'w'), ensure_ascii=False)
