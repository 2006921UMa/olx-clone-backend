// scripts/download_picsum.js

// Faça o download de 21 imagens do https://picsum.photos/300/200?... 
// Guarda na pasta /uploads como: ad_0001.jpg, ad_0002.jpg, ..., ad_0021.jpg

// Executar com: node scripts/download_picsum.js

// scripts/download_picsum.js

const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");
const { URL } = require("url");

const outputDir = path.join(__dirname, "../uploads");
const totalImages = 21;

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function followRedirects(url, cb) {
  const protocol = url.startsWith("https") ? https : http;

  protocol.get(url, (res) => {
    if (res.statusCode === 302 && res.headers.location) {
      // Recursivamente seguir redirecionamento
      followRedirects(res.headers.location, cb);
    } else {
      cb(res);
    }
  }).on("error", (err) => {
    console.error(` Erro ao seguir redirecionamento:`, err.message);
    cb(null);
  });
}

function downloadImage(url, filename, callback) {
  const filePath = path.join(outputDir, filename);
  const file = fs.createWriteStream(filePath);

  followRedirects(url, (response) => {
    if (!response || response.statusCode !== 200) {
      console.error(`Erro ao descarregar ${filename}`);
      file.close();
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      return callback();
    }

    response.pipe(file);
    file.on("finish", () => {
      file.close(() => {
        console.log(`Guardado: ${filename}`);
        callback();
      });
    });
  });
}

// Descarregar sequencialmente
let current = 1;

function next() {
  if (current > totalImages) {
    console.log("Todas as imagens foram descarregadas com sucesso!");
    process.exit(0); // <- força saída limpa do processo
    return;
  }

  const suffix = current === 21 ? "" : `?${current}`;
  const url = `https://picsum.photos/300/200${suffix}`;
  const filename = `ad_${String(current).padStart(4, "0")}.jpg`;

  downloadImage(url, filename, () => {
    current++;
    next();
  });
}


next();
