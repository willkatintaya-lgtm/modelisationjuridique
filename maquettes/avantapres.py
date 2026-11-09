import sys
from PIL import Image, ImageDraw
n=sys.argv[1]; out=sys.argv[2] if len(sys.argv)>2 else f'captures/{n}-avant-apres.png'
W=640;H=400
s=Image.new('RGB',(W*2+200*2,H*4),'white')
for i,e in enumerate(['dossier','atelier','enjeux','reunion']):
    a=Image.open(f'captures/avant/{n}-{e}-d.png').resize((W,H)); b=Image.open(f'captures/{n}-{e}-d.png').resize((W,H))
    s.paste(a,(0,i*H)); s.paste(b,(W,i*H))
    am=Image.open(f'captures/avant/{n}-{e}-m.png').resize((200,H)); bm=Image.open(f'captures/{n}-{e}-m.png').resize((200,H))
    s.paste(am,(2*W,i*H)); s.paste(bm,(2*W+200,i*H))
s.save(out)
