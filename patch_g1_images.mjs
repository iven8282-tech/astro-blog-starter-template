import fs from 'fs';
import { productCatalog } from './src/productCatalog.js';

const patch = {
  '1601739437378': 'https://s.alicdn.com/@sc04/kf/H5bdd0d882d134c5bb55fdc00ad04b2659.jpg',
  '1601813078163': 'https://s.alicdn.com/@sc04/kf/Ha341148cec0a474785f269d4dfd1d205l.png',
  '1601748746243': 'https://s.alicdn.com/@sc04/kf/Hc0e76e359f5d4081bade5a8a46fb7ac0x.jpg',
  '1601748663900': 'https://s.alicdn.com/@sc04/kf/H9f5579021213420a8f3e98acc5bc21590.jpg',
  '1601809635160': 'https://sc04.alicdn.com/kf/H1a07a9f9713d47bc9247d25b2699c9fet.jpg',
  '1601902767477': 'https://sc04.alicdn.com/kf/H49e69da433e24a2baa5faf648217ac61Z.jpg',
  '1601936079289': 'https://sc04.alicdn.com/kf/H2425833ae7544f818cf41db93d7abddcU.jpg'
};

for (const group of productCatalog) {
  if (group.group === 'Kids Modular Sofa/Floor Couch') {
    for (const product of group.products) {
      if (patch[product.id]) product.image = patch[product.id];
    }
    const counts = new Map();
    for (const product of group.products) counts.set(product.image, (counts.get(product.image) || 0) + 1);
    const dupes = [...counts.entries()].filter(([, count]) => count > 1);
    console.log(JSON.stringify({ products: group.products.length, uniqueImages: counts.size, duplicateGroups: dupes.length, dupes }, null, 2));
  }
}

fs.writeFileSync(
  './src/productCatalog.js',
  '// Auto-generated from public Alibaba.com product group pages.\n' +
  '// Product links are retained as source metadata only; the website UI opens in-site inquiry modals.\n' +
  'export const productCatalog = ' + JSON.stringify(productCatalog, null, 2) + ';\n',
  'utf8'
);
