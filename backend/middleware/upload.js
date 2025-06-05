// middleware/upload.js
// Guarda imagens em uploads/ com nomes crescentes: ad_0001.jpg, ad_0002.png, etc.
//
// “ad” = anúncio, ou seja, fica claro o contexto do ficheiro.
// Permite, no futuro, ter outros tipos de ficheiros na mesma pasta /uploads, como:
// user_0001.jpg (foto de perfil)
// banner_0001.png (imagem de destaque)
// doc_0001.pdf (documento anexado)
// Facilita organização e limpeza se precisares apagar ficheiros por tipo.

const fs = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    try {
      const files = fs.readdirSync('uploads');
      const onlyImages = files.filter(name => /\.(jpg|jpeg|png|gif)$/i.test(name));
      const nextNumber = String(onlyImages.length + 1).padStart(4, '0');
      const ext = path.extname(file.originalname).toLowerCase();
      const finalName = `ad_${nextNumber}${ext}`;
      // console.log('A guardar imagem com o nome:', finalName); //teste
      cb(null, finalName);
    } catch (error) {
      console.error('Erro ao gerar nome do ficheiro:', error);
      cb(error);
    }
  }
});

const upload = multer({ storage });
module.exports = upload;

