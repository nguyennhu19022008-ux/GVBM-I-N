const fs = require('fs');
const path = require('path');

const rootPath = path.resolve(__dirname, '..');
const publicPath = path.join(rootPath, 'public');
const distPath = path.join(rootPath, 'dist');
const CACHE_VERSION = '20261115';

console.log('--- ĐANG BẮT ĐẦU ĐÓNG GÓI & KIỂM ĐỊNH BẢN BUILD PRODUCTION (BUILD_DIST) ---');

// 1. Kiểm tra thư mục dist tồn tại sau vite build
if (!fs.existsSync(distPath)) {
  console.error('❌ ERROR: Thư mục dist/ không tồn tại sau khi chạy vite build!');
  process.exit(1);
}

// 2. Sao chép tất định (deterministic copy) toàn bộ tài nguyên từ public/ sang dist/
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

if (fs.existsSync(publicPath)) {
  copyRecursiveSync(publicPath, distPath);
  console.log('✓ Đã đồng bộ tất định toàn bộ tài nguyên từ public/ sang dist/.');
}

// 3. Xử lý Cache-Busting cho dist/index.html
const htmlPath = path.join(distPath, 'index.html');
if (!fs.existsSync(htmlPath) || fs.statSync(htmlPath).size === 0) {
  console.error('❌ ERROR: dist/index.html không tồn tại hoặc bị rỗng!');
  process.exit(1);
}

let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Thêm ?v=YYYYMMDD vào thẻ <script src="..."> và <link href="...">
htmlContent = htmlContent.replace(/src="([^"]+\.js)(?:\?[^"]*)?"/g, (match, p1) => {
  return `src="${p1}?v=${CACHE_VERSION}"`;
});

htmlContent = htmlContent.replace(/href="([^"]+\.css)(?:\?[^"]*)?"/g, (match, p1) => {
  return `href="${p1}?v=${CACHE_VERSION}"`;
});

htmlContent = htmlContent.replace(/href="([^"]+\.svg)(?:\?[^"]*)?"/g, (match, p1) => {
  return `href="${p1}?v=${CACHE_VERSION}"`;
});

fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log(`✓ Đã gắn cờ phiên bản cache-busting (?v=${CACHE_VERSION}) vào dist/index.html thành công.`);

// 4. Kiểm định toàn diện các tệp bắt buộc
const assetsDir = path.join(distPath, 'assets');
if (!fs.existsSync(assetsDir)) {
  console.error('❌ ERROR: Thư mục dist/assets không tồn tại!');
  process.exit(1);
}

const assetFiles = fs.readdirSync(assetsDir);
const jsFiles = assetFiles.filter((f) => f.endsWith('.js'));
const cssFiles = assetFiles.filter((f) => f.endsWith('.css'));

if (jsFiles.length === 0) {
  console.error('❌ ERROR: Không tìm thấy tệp JavaScript chính trong dist/assets!');
  process.exit(1);
}

if (cssFiles.length === 0) {
  console.error('❌ ERROR: Không tìm thấy tệp CSS chính trong dist/assets!');
  process.exit(1);
}

const imagesDir = path.join(distPath, 'images');
if (!fs.existsSync(imagesDir)) {
  console.error('❌ ERROR: Thư mục dist/images không tồn tại!');
  process.exit(1);
}

const imageFiles = fs.readdirSync(imagesDir);
if (imageFiles.length < 19) {
  console.error(`❌ ERROR: Thư mục dist/images chỉ có ${imageFiles.length}/19 tệp ảnh tư liệu!`);
  process.exit(1);
}

console.log('✅ ĐÓNG GÓI & NGHIỆM THU DIST THÀNH CÔNG:');
console.log(`- HTML: dist/index.html (${fs.statSync(htmlPath).size} bytes, đã cache-bust ?v=${CACHE_VERSION})`);
console.log(`- JS Chunks (${jsFiles.length}): ${jsFiles.join(', ')}`);
console.log(`- CSS Chunks (${cssFiles.length}): ${cssFiles.join(', ')}`);
console.log(`- Images (${imageFiles.length}/19): Đã bảo toàn toàn vẹn hình ảnh tư liệu lịch sử.`);
console.log('✨ Dự án ĐAM MÊ LỊCH SỬ đã sẵn sàng để triển khai Production mượt mà, chống ngộ độc cache!');
