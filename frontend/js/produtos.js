// js/produtos.js

const hostname = window.location.hostname;

const API_URL =
  hostname === "localhost" || hostname === "127.0.0.1"
    ? "http://localhost:3000/api"
    : "https://olx-clone-backend-v2.onrender.com/api";


const listaProdutos = document.getElementById("lista-produtos");
const selectCategoria = document.getElementById("filtro-categoria");
const inputTitulo = document.getElementById("pesquisa-titulo");

// Carrega categorias no dropdown
function carregarCategorias() {
  fetch(`${API_URL}/categories`)
    .then((res) => res.json())
    .then((categorias) => {
      categorias.forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat.id;
        option.textContent = cat.name;
        selectCategoria.appendChild(option);
      });
    })
    .catch((err) => console.error("Erro ao carregar categorias:", err));
}

// document.getElementById('btn-pesquisar').addEventListener('click', () => {
//   const categoria = document.getElementById('filtro-categoria').value;
//   const ordenacao = document.getElementById('ordenar-anuncios').value;

//   let url = `http://localhost:3000/api/ads?`;

//   if(categoria) url += `category_id=${categoria}&`;
//   if(ordenacao) url += `order=${ordenacao}`;

//   fetch(url)
//     .then(res => res.json())
//     .then(anuncios => {
//       // Aqui atualiza o DOM com os anúncios
//     });
// });

document.getElementById("btn-pesquisar").addEventListener("click", pesquisar);

// Mostra anúncios com base nos filtros
function pesquisar() {
  const titulo = inputTitulo.value.trim();
  const categoria_id = selectCategoria.value;
  const ordenacao = document.getElementById("ordenar-anuncios").value;

  const params = new URLSearchParams();
  if (titulo) params.append("title", titulo);
  if (categoria_id) params.append("category_id", categoria_id);
  if (ordenacao) params.append("order", ordenacao);

  fetch(`${API_URL}/ads?${params.toString()}`)
    .then((res) => res.json())
    .then((anuncios) => {
      listaProdutos.innerHTML = "";

      if (anuncios.length === 0) {
        listaProdutos.innerHTML =
          "<p class='text-center'>Nenhum anúncio encontrado.</p>";
        return;
      }

      anuncios.forEach((anuncio) => {
        const col = document.createElement("div");
        col.className = "col-md-3 mb-4";

        const image_url = anuncio.image
          ? (anuncio.image.startsWith("http")
              ? anuncio.image
              : `/uploads/${anuncio.image}`)
          : `https://picsum.photos/300/200?random=${anuncio.id}`;

        col.innerHTML = `
          <a href="../html/anuncio.html?id=${anuncio.id}" style="text-decoration: none; color: inherit;">
            <div class="card shadow-sm h-100">
              <img src="${image_url}" class="card-img-top" style="height:180px; object-fit:cover;" alt="${anuncio.title}">
                            <div class="card-body p-2">
                <h5 class="card-title text-success fw-bold">€${anuncio.price}</h5>
                <p class="card-text text-truncate" title="${anuncio.title}">${anuncio.title}</p>
                <small class="text-muted">${anuncio.location || "Localização desconhecida"}</small><br>
                <small class="text-muted">${tempoPassado(anuncio.createdAt)}</small>
                <a href="html/chat.html?ad_id=${anuncio.id}&receiver_id=${anuncio.user_id}" class="btn btn-sm btn-outline-primary mt-2">💬 Chat</a>
              </div>
            </div>
          </a>
        `;

        listaProdutos.appendChild(col);
      });
    })
    .catch((err) => {
      console.error("Erro ao carregar anúncios:", err);
    });
}

// Função para mostrar tempo passado
function tempoPassado(data) {
  const segundos = Math.floor((new Date() - new Date(data)) / 1000);
  const dias = Math.floor(segundos / 86400);
  return dias === 0 ? "Hoje" : `Há ${dias} dia${dias > 1 ? "s" : ""}`;
}

// Eventos
document.getElementById("btn-pesquisar").addEventListener("click", pesquisar);

// Inicializar
carregarCategorias();
pesquisar();
