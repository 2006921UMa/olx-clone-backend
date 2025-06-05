// js/categorias.js

document.addEventListener("DOMContentLoaded", () => {
  const hostname = window.location.hostname;
  const API_BASE =
    hostname === "localhost" || hostname === "127.0.0.1"
      ? "http://localhost:3000"
      : "https://olx-clone-backend-v2.onrender.com";

  const grid = document.getElementById("categorias-grid");
  if (!grid) return; 

  fetch(`${API_BASE}/api/categories`)
    .then((res) => res.json())
    .then((categorias) => {
      if (!Array.isArray(categorias)) throw new Error("Resposta inválida da API");

      categorias.forEach((c) => {
        const col = document.createElement("div");
        col.className = "col";

        col.innerHTML = `
           <img src="./img/categorias/${c.image}" class="img-fluid rounded categoria-click" data-categoria="${c.id}" alt="${c.name}">
           <p>${c.name}</p>
        `;

        grid.appendChild(col);
      });

      // Evento de clique nas imagens de categoria
      document.querySelectorAll(".categoria-click").forEach((img) => {
        img.addEventListener("click", () => {
          const catId = img.dataset.categoria;

          const select = document.getElementById("filtro-categoria");
          if (select) select.value = catId;

          const btn = document.getElementById("btn-pesquisar");
          if (btn) btn.click();
        });
      });
    })
    .catch((err) => {
      console.error("Erro ao carregar categorias:", err);
      if (grid) {
        grid.innerHTML = "<p>Erro ao carregar categorias.</p>";
      }
    });
});
