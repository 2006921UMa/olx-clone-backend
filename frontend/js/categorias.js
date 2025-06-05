// js/categorias.js

// const categorias = [
//   {"id": 1, "nome": "Cadeira", "ficheiro": "categ_cadeira_0008.png"},
//   {"id": 2, "nome": "Crianca", "ficheiro": "categ_crianca_0010.png"},
//   {"id": 3, "nome": "Fotografica", "ficheiro": "categ_fotografica_0006.png"},
//   {"id": 4, "nome": "Galinha", "ficheiro": "categ_galinha_0001.png"},
//   {"id": 5, "nome": "Imovel", "ficheiro": "categ_imovel_0013.png"},
//   {"id": 6, "nome": "Livro", "ficheiro": "categ_livro_0003.png"},
//   {"id": 7, "nome": "Lojamento", "ficheiro": "categ_lojamento_0012.png"},
//   {"id": 8, "nome": "Mota", "ficheiro": "categ_mota_0002.png"},
//   {"id": 9, "nome": "Pasta", "ficheiro": "categ_pasta_0009.png"},
//   {"id": 10, "nome": "Roupa", "ficheiro": "categ_roupa_0007.png"},
//   {"id": 11, "nome": "Telemovel", "ficheiro": "categ_telemovel_0011.png"},
//   {"id": 12, "nome": "Trator", "ficheiro": "categ_trator_0004.png"},
//   {"id": 13, "nome": "Veiculo", "ficheiro": "categ_veiculo_0015.png"}
// ];

//   const container = document.getElementById('categorias-container');

//   categorias.forEach(cat => {
//     const col = document.createElement('div');
//     col.className = 'col';

//     col.innerHTML = `
//       <img src="./img/categorias/${cat.ficheiro}" class="img-fluid rounded categoria-click" data-categoria="${cat.id}" alt="${cat.nome}">
//       <p>${cat.nome}</p>
//     `;

//     container.appendChild(col);
//   });

document.addEventListener("DOMContentLoaded", () => {
  const hostname = window.location.hostname;
  const API_BASE =
    hostname === "localhost" || hostname === "127.0.0.1"
      ? "http://localhost:3000"
      : "";

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
