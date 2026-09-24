import fs from 'fs';
import { productCatalog } from './src/productCatalog.js';

console.log('Total groups in productCatalog.js:', productCatalog.length);
const group1 = productCatalog[0];
console.log('Group 1 name:', group1.group);
console.log('Group 1 products count:', group1.products.length);

const images = group1.products.map(p => p.image);
const uniqueImages = new Set(images);
console.log('Group 1 unique image URLs:', uniqueImages.size);

const imageCounts = {};
for (const img of images) {
  imageCounts[img] = (imageCounts[img] || 0) + 1;
}

console.log('Top image frequencies:');
Object.entries(imageCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .forEach(([img, count]) => {
    console.log(`  Count ${count}: ${img}`);
  });
