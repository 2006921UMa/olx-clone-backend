// scrips/popularAnuncios.js

const fetch = require('node-fetch');

const API = 'http://localhost:3000/api/ads';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaXNBZG1pbiI6MCwiaWF0IjoxNzQ4MzgzNjg4LCJleHAiOjE3NDg0NzAwODh9.TYUSXpgHN9Z5v4IN-p7zOik_LM5_x5vuglqVINMVgnA';

const anuncios = Array.from({ length: 20 }, (_, i) => ({
  title: `Produto Exemplo ${i + 1}`,
  description: `Descrição do produto exemplo ${i + 1}`,
  price: (Math.random() * 300 + 50).toFixed(2),
  image: `https://picsum.photos/300/200?random=${i + 1}`,
  location: "Funchal",
  has_video: i % 3 === 0,
  category_id: 1
}));

(async () => {
  for (let anuncio of anuncios) {
    const res = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(anuncio)
    });

    const data = await res.json();
    console.log(`Criado: ${data.title || 'Erro'}`);
  }
})();
