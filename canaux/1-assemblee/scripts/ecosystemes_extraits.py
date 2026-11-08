"""Extraits comparatifs (canal 1, front « écosystèmes »).

Usage : python3 -I ecosystemes_extraits.py <raw-ecosystemes> <extraits-bruts>

Lit les fichiers déjà téléchargés dans <raw-ecosystemes> (voir la note
explorations/ecosystemes.md pour les URL) et écrit quatre petits JSON :
- ecosystemes-lfdl-matrice.json : articles x étapes (Fabrique de la Loi, ppl19-285)
- ecosystemes-pe-liste-de-vote.json : liste de vote PE (21 oct. 2025), par point
- ecosystemes-uk-navette.json : Renters' Rights Bill, étapes, sorts, ping-pong
- ecosystemes-us-arbre.json : H.R. 1 (119e), arbre des amendements du Sénat
Les champs « groupe » / « auteur » restent bruts (à rendre fictifs ensuite).
"""
import collections
import json
import os
import sys
import xml.etree.ElementTree as ET

RAW, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)


def load(*p):
    with open(os.path.join(RAW, *p), encoding="utf-8") as f:
        return json.load(f)


def dump(name, obj):
    path = os.path.join(OUT, name)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)
    print(path, os.path.getsize(path))


# 1. Fabrique de la Loi : matrice articles x étapes
proc = load("ppl19-285", "procedure.json")
arts = load("ppl19-285", "articles_etapes.json")["articles"]
steps = [s["directory"] for s in proc["steps"] if s.get("directory")]
mat = []
for a in sorted(arts.values(), key=lambda a: a["order"]):
    cells = {s["id_step"]: {"diff": s.get("diff"), "n_diff": round(s.get("n_diff") or 0, 3),
                            "statut": s.get("status"), "longueur": s.get("length"),
                            "nouveau_numero": s.get("newnum")} for s in a["steps"]}
    mat.append({"article": a["titre"], "section": a.get("section"), "etapes": cells})
dump("ecosystemes-lfdl-matrice.json", {
    "source": "https://www.lafabriquedelaloi.fr/api/ppl19-285/viz/articles_etapes.json",
    "etapes": [{"id": s["directory"], "lecture": s.get("stage"), "lieu": s.get("institution"),
                "moment": s.get("step"), "date": s.get("date"), "nb_amendements": s.get("nb_amendements")}
               for s in proc["steps"] if s.get("directory")],
    "table_concordance": proc.get("table_concordance"), "articles": mat})

# 2. PE : liste de vote
dec = load("ep", "dec.json")["data"]


def fr(v):
    return v.get("fr") if isinstance(v, dict) else v


points = collections.defaultdict(list)
for x in dec:
    inv = x.get("inverse_consists_of") or []
    inv = inv if isinstance(inv, list) else [inv]
    ids = [i["id"] if isinstance(i, dict) else i for i in inv]
    parent = next((i for i in ids if "VOT-ITM" in i), "?")
    doc = (x.get("decided_on_a_realization_of") or [x.get("decided_on_a_part_of_a_realization_of")])[0]
    points[parent].append({
        "ordre": float(x["activity_order"]), "rubrique": fr(x.get("headingLabel")),
        "position": fr(x.get("referenceText")), "numero_vote": x.get("decisionAboutId"),
        "groupe": fr(x.get("responsible_organization_label")),
        "methode": (x.get("decision_method") or "").split("/")[-1],
        "sort": (x.get("decision_outcome") or "").split("/")[-1],
        "pour": x.get("number_of_votes_favor"), "contre": x.get("number_of_votes_against"),
        "abstention": x.get("number_of_votes_abstention"), "document": doc,
        "corrections_de_vote": sum(len(x.get(k, [])) for k in
                                   ("had_voter_intended_favor", "had_voter_intended_against",
                                    "had_voter_intended_abstention"))})
dump("ecosystemes-pe-liste-de-vote.json", {
    "source": "https://data.europarl.europa.eu/api/v2/meetings/MTG-PL-2025-10-21/decisions",
    "points": {k: sorted(v, key=lambda r: r["ordre"]) for k, v in points.items()}})

# 3. Westminster : Renters' Rights Bill
st = load("uk", "stages.json")["items"]
out = {"source": "https://bills-api.parliament.uk/api/v1/Bills/3764", "etapes": []}
for s in st:
    e = {"id": s["id"], "chambre": s["house"], "etape": s["description"],
         "seances": [x["date"][:10] for x in s.get("stageSittings", [])]}
    p = os.path.join(RAW, "uk", f"am_{s['id']}.json")
    if os.path.exists(p):
        items = load("uk", f"am_{s['id']}.json")["items"]
        e["amendements"] = [{"num": a.get("marshalledListText"), "type": a.get("amendmentType"),
                             "clause": a.get("clause"), "page": a.get("pageNumber"), "ligne": a.get("lineNumber"),
                             "sort": a.get("decision"),
                             "auteur": [sp["name"] for sp in a.get("sponsors", [])],
                             "groupe": [sp["party"] for sp in a.get("sponsors", [])][:1],
                             "resume": " ".join(a.get("summaryText") or [])[:300]} for a in items]
    out["etapes"].append(e)
pp = []
for f in ("pp1.json", "pp2.json"):
    for x in load("uk", f)["items"]:
        m = x["motion"]
        pp.append({"fichier": f, "objet": m["summary"], "sort": m["decision"],
                   "auteur": m["sponsors"][0]["name"] if m["sponsors"] else None,
                   "groupe": m["sponsors"][0]["party"] if m["sponsors"] else None})
out["ping_pong"] = pp
dump("ecosystemes-uk-navette.json", out)

# 4. Congrès US : arbre des amendements (H.R. 1, 119e)
root = ET.parse(os.path.join(RAW, "us", "status.xml")).getroot()
nodes = []
for a in root.find("bill").find("amendments").findall("amendment"):
    acts = [i.findtext("text") or "" for i in a.iter("item") if i.findtext("actionDate")]
    sp = a.find("sponsors")
    it = sp.find("item") if sp is not None else None
    par = a.find("amendedAmendment")
    nodes.append({"num": a.findtext("type") + " " + a.findtext("number"),
                  "chambre": a.findtext("chambre") or a.findtext("chamber"),
                  "parent": (par.findtext("type") + " " + par.findtext("number")) if par is not None else None,
                  "objet": (a.findtext("purpose") or a.findtext("description") or "")[:200],
                  "auteur": it.findtext("fullName") if it is not None else None,
                  "groupe": it.findtext("party") if it is not None else None,
                  "actions": [t for t in acts if t][:4],
                  "votes_nominaux": len(list(a.iter("recordedVote")))})
dump("ecosystemes-us-arbre.json", {
    "source": "https://www.govinfo.gov/bulkdata/BILLSTATUS/119/hr/BILLSTATUS-119hr1.xml",
    "amendements": nodes})
