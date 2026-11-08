"""Sonde bon marché d'une archive zip distante : lit seulement le répertoire central (fin du fichier)
par requêtes HTTP Range, et liste les entrées (date DOS, CRC32, nom) sans télécharger l'archive.
Deux sondes successives comparées donnent les amendements nouveaux / modifiés / disparus.
Usage : python3 -I logement-direct_sonde_zip.py <url ou file://chemin> [motif] > noms.tsv
Piège : le CDN de data.assemblee-nationale.fr sert simultanément plusieurs versions (nœuds différents,
cache 4 h) ; deux requêtes Range peuvent tomber sur deux versions. On vérifie la signature et on retente."""
import re, struct, subprocess, sys, time

url = sys.argv[1]
motif = sys.argv[2] if len(sys.argv) > 2 else ''

def get(rangespec):
    if url.startswith('file://'):
        with open(url[7:], 'rb') as fh:
            fh.seek(0, 2); size = fh.tell()
            a, b = rangespec.split('-')
            a, b = (size - int(b), size - 1) if a == '' else (int(a), int(b))
            fh.seek(a); return fh.read(b - a + 1), {'content-range': f'bytes {a}-{b}/{size}'}
    for k in range(5):                         # coupures HTTP/2 (code 92) : retenter
        p = subprocess.run(['curl', '-sS', '-D', '-', '--max-time', '120', '-r', rangespec, url],
                           capture_output=True)
        if p.returncode == 0: break
        time.sleep(2)
    r = p.stdout
    h, _, body = r.partition(b'\r\n\r\n')
    while body.startswith(b'HTTP/'):          # en-têtes du proxy (CONNECT) puis de l'origine
        h, _, body = body.partition(b'\r\n\r\n')
    hd = dict((k.strip().lower(), v.strip()) for k, _, v in
              (l.partition(':') for l in h.decode('latin1').splitlines()[1:]))
    return body, hd

for essai in range(6):
    tail, hd = get('-70000')
    total = int(hd['content-range'].split('/')[-1]) if 'content-range' in hd else None
    i = tail.rfind(b'PK\x05\x06')
    n, cd_size, cd_off = struct.unpack('<HII', tail[i + 10:i + 20])
    if cd_off == 0xFFFFFFFF or n == 0xFFFF:
        j = tail.rfind(b'PK\x06\x06')
        n, cd_size, cd_off = struct.unpack('<QQQ', tail[j + 32:j + 56])
    cd, hd2 = get(f'{cd_off}-{cd_off + cd_size - 1}')
    total2 = int(hd2['content-range'].split('/')[-1]) if 'content-range' in hd2 else None
    if cd[:4] == b'PK\x01\x02' and total == total2:
        break
    sys.stderr.write(f'versions mélangées par le CDN ({total} / {total2}), nouvel essai\n'); time.sleep(2)
else:
    sys.exit('échec : versions incohérentes')
sys.stderr.write(f"taille={total} last-modified={hd.get('last-modified')} entrees={n}\n")
p = 0
while p < len(cd) and cd[p:p + 4] == b'PK\x01\x02':
    t, d, crc = struct.unpack('<HHI', cd[p + 12:p + 20])
    ln, le, lc = struct.unpack('<HHH', cd[p + 28:p + 34])
    name = cd[p + 46:p + 46 + ln].decode('utf-8', 'replace')
    p += 46 + ln + le + lc
    if motif in name:
        date = f'{1980 + (d >> 9)}-{(d >> 5) & 15:02d}-{d & 31:02d} {t >> 11:02d}:{(t >> 5) & 63:02d}'
        print(f'{date}\t{crc:08x}\t{name}')
