"""Historique git des amendements AN via le dépôt Tricoteuses
assemblee-opendata/Amendements_XVII_opendata (une moisson de l'open data officiel par commit).

Usage : python3 -I tricoteuses_historique.py <liste_chemins.txt> <sortie.jsonl> [workers]
  liste_chemins.txt : une ligne par fichier du dépôt, ex. PRJLANR5L17B3058/AMANR5L17PO419610B3058P0D1N000660.json
Sortie : une ligne par amendement : versions successives (sha, date du commit) et, pour chaque
transition, les champs qui ont changé (état, sous-état, sort, dispositif, exposé, rectification,
cosignataires, cartouche, date de publication...).
"""
import json, subprocess, sys, html, re
from concurrent.futures import ThreadPoolExecutor

BASE = "https://git.tricoteuses.fr/api/v1/repos/assemblee-opendata/Amendements_XVII_opendata"


def get(url, tries=4):
    for _ in range(tries):
        r = subprocess.run(["curl", "-sS", "-m", "60", "--http1.1", url], capture_output=True)
        if r.returncode == 0 and r.stdout:
            try:
                return json.loads(r.stdout)
            except ValueError:
                pass
    return None


def nil(v):
    return isinstance(v, dict) and v.get("@xsi:nil") == "true"


def txt(v):
    if v is None or nil(v):
        return None
    if isinstance(v, str):
        return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", v))).strip()
    return json.dumps(v, ensure_ascii=False)


def resume(a):
    c = a.get("corps", {})
    ca = c.get("contenuAuteur", {}) or {}
    cy = a.get("cycleDeVie", {}) or {}
    ed = cy.get("etatDesTraitements", {}) or {}
    sig = a.get("signataires", {}) or {}
    cos = sig.get("cosignataires") or {}
    cos = cos.get("acteurRef") if isinstance(cos, dict) else None
    if isinstance(cos, str):
        cos = [cos]
    return {
        "rect": a.get("identification", {}).get("numeroRect"),
        "etat": txt((ed.get("etat") or {}).get("libelle")),
        "sous_etat": txt((ed.get("sousEtat") or {}).get("libelle")),
        "sort": txt(cy.get("sort")),
        "date_sort": txt(cy.get("dateSort")),
        "date_pub": txt(cy.get("datePublication")),
        "date_depot": txt(cy.get("dateDepot")),
        "dispositif": txt(ca.get("dispositif")),
        "expose": txt(ca.get("exposeSommaire")),
        "cartouche": txt(c.get("cartoucheInformatif")),
        "n_cosign": len(cos or []),
        "libelle_sign": txt(sig.get("libelle")),
        "seance": txt(a.get("seanceDiscussionRef")),
        "disc_commune": txt(a.get("discussionCommune")),
        "disc_identique": txt(a.get("discussionIdentique")),
        "art99": txt(a.get("article99")),
        "tri": a.get("triAmendement"),
    }


def un(path):
    commits = get(f"{BASE}/commits?path={path}&limit=50&stat=false&files=false&verification=false") or []
    commits = list(reversed(commits))  # du plus ancien au plus récent
    vers = []
    prev = None
    for c in commits:
        a = get(f"{BASE}/raw/{path}?ref={c['sha']}")
        r = resume(a) if isinstance(a, dict) else None
        ch = None
        if r and prev:
            ch = {k: [prev[k], r[k]] for k in r if prev[k] != r[k]}
        vers.append({"sha": c["sha"][:12], "date": c["commit"]["author"]["date"], "changes": ch,
                     "etat": r and r["etat"], "sort": r and r["sort"], "rect": r and r["rect"],
                     "dispositif": r and r["dispositif"], "expose": r and r["expose"]})
        if r:
            prev = r
    return {"path": path, "uid": path.split("/")[-1][:-5], "n_versions": len(vers), "versions": vers,
            "first": None, "last": prev}


def main():
    paths = [l.strip() for l in open(sys.argv[1]) if l.strip()]
    w = int(sys.argv[3]) if len(sys.argv) > 3 else 8
    with open(sys.argv[2], "w") as out, ThreadPoolExecutor(w) as ex:
        for i, r in enumerate(ex.map(un, paths)):
            out.write(json.dumps(r, ensure_ascii=False) + "\n")
            if i % 50 == 0:
                print(i, r["uid"], r["n_versions"], file=sys.stderr, flush=True)


if __name__ == "__main__":
    main()
