import sys
from PIL import Image
n=sys.argv[1]; d='captures/'
s=Image.new('RGB',(1280+400,1600),'white')
for i,e in enumerate(['dossier','atelier','enjeux','reunion']):
    s.paste(Image.open(f'{d}{n}-{e}-d.png').resize((640,400)),((i%2)*640,(i//2)*400))
    s.paste(Image.open(f'{d}{n}-{e}-m.png').resize((200,400)),(1280+(i%2)*200,(i//2)*400))
s=s.crop((0,0,1680,800)); s.save(f'../planche-{n}.png')
