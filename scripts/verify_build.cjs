const fs = require('fs');
const path = require('path');

const distPath = path.resolve(__dirname, '..', 'dist');

if (!fs.existsSync(distPath)) {
  console.error('❌ ERROR: Thư mục dist/ không tồn tại!');
  process.exit(1);
}

const htmlFile = path.join(distPath, 'index.html');
if (!fs.existsSync(htmlFile) || fs.statSync(htmlFile).size === 0) {
  console.error('❌ ERROR: dist/index.html không tồn tại hoặc rỗng!');
  process.exit(1);
}

const assetsDir = path.join(distPath, 'assets');
if (!fs.existsSync(assetsDir)) {
  console.error('❌ ERROR: Thư mục dist/assets không tồn tại!');
  process.exit(1);
}

const assetFiles = fs.readdirSync(assetsDir);
const jsFiles = assetFiles.filter(f => f.endsWith('.js'));
const cssFiles = assetFiles.filter(f => f.endsWith('.css'));

if (jsFiles.length === 0) {
  console.error('❌ ERROR: Không tìm thấy file Javascript chính trong dist/assets!');
  process.exit(1);
}

if (cssFiles.length === 0) {
  console.error('❌ ERROR: Không tìm thấy file CSS chính trong dist/assets!');
  process.exit(1);
}

console.log('✅ KIỂM TRA BẢN BUILD THÀNH CÔNG:');
console.log(`- HTML: index.html (${fs.statSync(htmlFile).size} bytes)`);
console.log(`- JS Chunks (${jsFiles.length}): ${jsFiles.join(', ')}`);
console.log(`- CSS Chunks (${cssFiles.length}): ${cssFiles.join(', ')}`);
console.log('✨ Dự án ĐAM MÊ LỊCH SỬ đã sẵn sàng để deploy lên Vercel / Cloudflare Pages / Static Web!');
