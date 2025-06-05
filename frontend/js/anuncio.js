// js/anuncio.js

// Garantir que API_BASE está definido (deve vir de config.js)
const API = typeof API_BASE !== 'undefined' ? API_BASE : 'http://localhost:3000/api';

fetch(`${API}/ads`)
  .then(res => res.json())
  .then(data => {
    const ul = document.getElementById("lista-anuncios");
    if (!ul) return;

    data.forEach(a => {
      const li = document.createElement("li");
      li.textContent = a.title;
      li.classList.add("list-group-item");
      ul.appendChild(li);
    });
  })
  .catch(err => {
    console.error("Erro ao carregar anúncios:", err);
  });
