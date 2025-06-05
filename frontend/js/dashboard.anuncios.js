// dashboard.anuncios.js

// Usa diretamente o token se já existir
const tabelaAnuncios = document.getElementById("tabela-anuncios");

function carregarAnuncios() {
  fetch(`${API_BASE}/api/admin/anuncios`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .then((anuncios) => {
      if (!Array.isArray(anuncios)) return;
      tabelaAnuncios.innerHTML = "";

      anuncios.forEach((a) => {
        const div = document.createElement("div");
        div.classList.add("border", "p-2", "mb-2");

        const imagemHTML = a.image
          ? `<img src="${
              a.image.startsWith("http") ? a.image : "/uploads/" + a.image
            }" alt="imagem do anúncio" style="width: 100px;"><br>`
          : "";

        div.innerHTML = `
    <strong>${a.titulo}</strong><br>
    ${imagemHTML}
    Preço: ${a.preco} €<br>
    Utilizador ID: ${a.user_id}<br>
    <button class="btn btn-sm btn-danger mt-1" onclick="apagarAnuncio(${a.id})">Apagar</button>
  `;

        tabelaAnuncios.appendChild(div);
      });
    });
}

function apagarAnuncio(id) {
  if (!confirm("Tem a certeza que quer apagar este anúncio?")) return;

  fetch(`${API_BASE}/api/admin/anuncios/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (res.ok) {
      alert("Anúncio apagado.");
      carregarAnuncios();
    } else {
      alert("Erro ao apagar anúncio.");
    }
  });
}

carregarAnuncios();
