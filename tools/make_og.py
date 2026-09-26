#!/usr/bin/env python3
"""Render the social share image (1200x630) to assets/og.jpg.

    python3 tools/make_og.py
"""
import base64
import pathlib

from playwright.sync_api import sync_playwright

SITE = pathlib.Path(__file__).resolve().parent.parent
SHOTS = ['luxury-abaya-hero', 'restaurant-hero', 'apex-cars-hero', 'dubai-realestate-hero', 'perfume-hero',
         'asyl-clothing-hero', 'restaurant--menu', 'apex-cars--fleet', 'perfume--products']


def b64(name):
    return 'data:image/jpeg;base64,' + base64.b64encode((SITE / 'assets' / 'shots' / f'{name}.jpg').read_bytes()).decode()


B = ''.join(f'<rect x="{c*12}" y="{r*12}" width="10" height="10" rx="1.5"/>'
            for r, line in enumerate(["1110", "1001", "1110", "1001", "1110"]) for c, v in enumerate(line) if v == "1")
B += '<rect x="36" y="12" width="10" height="10" rx="1.5"/>'

imgs = [b64(n) for n in SHOTS]
cols = ''.join('<div class="col">' + ''.join(f'<img src="{imgs[(c * 3 + i) % len(imgs)]}">' for i in range(4)) + '</div>' for c in range(3))

HTML = f"""<!DOCTYPE html><html lang="ar" dir="ltr"><head><meta charset="utf-8"><style>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@600;800;900&family=Space+Mono:wght@400;700&display=swap');
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:1200px;height:630px;overflow:hidden;background:#0A0A0A;font-family:'Cairo',sans-serif;color:#F4F4F4}}
.wall{{position:absolute;left:-190px;top:-160px;display:flex;gap:16px;transform:perspective(1200px) rotateY(18deg) rotateZ(-10deg);opacity:.75}}
.col{{display:flex;flex-direction:column;gap:16px;width:250px}}
.col:nth-child(2){{margin-top:-90px}}
.col img{{width:250px;height:156px;object-fit:cover;object-position:top;border-radius:10px;border:1px solid #222}}
.fade{{position:absolute;inset:0;background:linear-gradient(270deg,#0A0A0A 44%,rgba(10,10,10,.6) 70%,rgba(10,10,10,.1))}}
.glow{{position:absolute;right:120px;top:120px;width:520px;height:420px;background:radial-gradient(closest-side,rgba(57,255,136,.16),transparent)}}
.bigB{{position:absolute;right:-40px;top:40px;opacity:.07}}
.txt{{position:absolute;right:70px;top:70px;width:720px;direction:rtl;text-align:right}}
.brand{{display:flex;align-items:center;gap:14px;direction:ltr;justify-content:flex-end}}
.brand b{{font-family:'Courier New',monospace;font-size:40px;letter-spacing:-.5px}}
h1{{font-size:60px;font-weight:900;line-height:1.25;margin-top:40px}}
h1 span{{color:#39FF88}}
p{{font-size:26px;color:#bdbdbd;margin-top:18px;line-height:1.55}}
.chips{{display:flex;gap:10px;margin-top:28px;flex-wrap:wrap;justify-content:flex-start}}
.chips span{{border:1.5px solid #2c2c2c;background:#111;border-radius:999px;padding:6px 16px;font-size:18px;font-weight:600}}
.chips span::before{{content:"■ ";color:#39FF88;font-size:12px;vertical-align:2px}}
.url{{position:absolute;right:70px;bottom:44px;font-family:'Space Mono',monospace;font-size:20px;color:#39FF88;direction:ltr}}
</style></head><body>
<div class="wall">{cols}</div><div class="fade"></div><div class="glow"></div>
<svg class="bigB" width="440" height="555" viewBox="0 0 46 58"><g fill="#39FF88">{B}</g></svg>
<div class="txt">
  <div class="brand"><svg width="40" height="50" viewBox="0 0 46 58"><g fill="#39FF88">{B}</g></svg><b>buildora</b></div>
  <h1>مواقع احترافية<br>تحوّل زوّارك إلى <span>عملاء.</span></h1>
  <p>جرّب موقعك باسم نشاطك قبل ما تطلبه</p>
  <div class="chips"><span>عربي + English</span><span>للجوال أولًا</span><span>واتساب في كل صفحة</span></div>
</div>
<div class="url">buildora.agency</div>
</body></html>"""

with sync_playwright() as p:
    br = p.chromium.launch(channel='chrome', headless=True)
    pg = br.new_page(viewport={'width': 1200, 'height': 630})
    pg.set_content(HTML, wait_until='networkidle')
    pg.evaluate("document.fonts.ready.then(()=>1)")
    pg.wait_for_timeout(400)
    pg.screenshot(path=str(SITE / 'assets' / 'og.jpg'), type='jpeg', quality=88)
    br.close()
print('wrote assets/og.jpg')
