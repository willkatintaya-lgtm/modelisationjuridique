# Assemble chaque page : remplace <!--BASE--> par la base commune (styles et utilitaires).
import pathlib, sys
d = pathlib.Path(__file__).parent
base = (d / "_base.html").read_text()
names = sys.argv[1:] or [p.name for p in d.glob("*.html") if not p.name.startswith("_")]
for f in names:
    s = (d / f).read_text()
    (d.parent / f).write_text(s.replace("<!--BASE-->", base))
    print("built", f)
