import fs from 'fs';
import { productCatalog } from './src/productCatalog.js';

const g = productCatalog.find(x => x.group === 'Kids Modular Sofa/Floor Couch');
const target = g.products.find(p => p.id === '1601809635160');
if (target) {
  target.image = 'https://s.alicdn.com/@sc04/kf/H937c93cd6a6644ddbdbd0745958e3baa0.jpg';
}

fs.writeFileSync(
  './src/productCatalog.js',
  '// Auto-generated from public Alibaba.com product group pages.\n' +
  '// Product links are retained as source metadata only; the website UI opens in-site inquiry modals.\n' +
  'export const productCatalog = ' + JSON.stringify(productCatalog, null, 2) + ';\n',
  'utf8'
);
console.log('Updated 1601809635160 image.');
