import re
import json
import urllib.parse
from pathlib import Path

fetch = Path(r'C:\Users\Administrator\.accio\accounts\1719480643\agents\MID-37480643U1789016-50F50E-7017-0ACFB5\agent-core\tool-results\CID-18480643U1789700-50F50E-9291-456DFF\web_fetch_call_5QOuJjlwVzvwUlFSI5w2ThYp.txt')
text = fetch.read_text(encoding='utf-8', errors='ignore')
parts = re.split(r'\nURL: ', text)
patch = {}

for part in parts:
    m = re.search(r'_(\d+)\.html', part[:300])
    if not m:
        continue
    pid = m.group(1)
    candidates = []
    for im in re.finditer(r'imagePath=([^&\)\s]+)', part):
        u = urllib.parse.unquote(im.group(1))
        u = re.sub(r'_\d+x\d+\.jpg$', '.jpg', u)
        candidates.append(u)
    seen = []
    for u in candidates:
        if u.startswith('http') and u not in seen and '/kf/' in u:
            seen.append(u)
    if seen:
        patch[pid] = seen[0]

print('patch count', len(patch))
print(json.dumps(patch, indent=2))

catalog_path = Path('src/productCatalog.js')
s = catalog_path.read_text(encoding='utf-8')
js = s.split('export const productCatalog = ', 1)[1].strip().rstrip(';')
cat = json.loads(js)

for group in cat:
    if group['group'] == 'Kids Modular Sofa/Floor Couch':
        for product in group['products']:
            if product['id'] in patch:
                product['image'] = patch[product['id']]
        from collections import Counter
        counter = Counter(product['image'] for product in group['products'])
        duplicates = [(count, image) for image, count in counter.items() if count > 1]
        print('after products', len(group['products']), 'unique', len(counter), 'duplicates', duplicates)

catalog_path.write_text(
    '// Auto-generated from public Alibaba.com product group pages.\n'
    '// Product links are retained as source metadata only; the website UI opens in-site inquiry modals.\n'
    'export const productCatalog = ' + json.dumps(cat, ensure_ascii=False, indent=2) + ';\n',
    encoding='utf-8'
)
