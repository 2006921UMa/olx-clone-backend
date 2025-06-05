// js/novo-anuncio.js

const hostname = window.location.hostname;

const API_URL =
  hostname === "localhost" || hostname === "127.0.0.1"
    ? "http://localhost:3000/api"
    : "https://olx-clone-backend-v2.onrender.com/api";

const form = document.getElementById("form-anuncio");
const selectCategoria = document.getElementById("select-categoria");

// ==================== Carrega categorias ====================
fetch(`${API_URL}/categories`)
  .then((res) => res.json())
  .then((categorias) => {
    if (!Array.isArray(categorias)) throw new Error("Resposta inválida do servidor.");

    categorias.forEach((cat) => {
      const opt = document.createElement("option");
      opt.value = cat.id;
      opt.textContent = cat.name;
      selectCategoria.appendChild(opt);
    });
  })
  .catch((err) => {
    console.error("Erro ao carregar categorias:", err);
    alert("Erro ao carregar categorias. Tenta novamente mais tarde.");
  });

// ==================== Submete o formulário ====================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  
  // const token = localStorage.getItem("token");

  const token = localStorage.getItem("userToken");

  if (!token) {
    alert("É necessário estar autenticado para criar um anúncio.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/ads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}` 
      },
      body: formData
    });

    const result = await response.json();

    if (response.ok) {
      alert("Anúncio criado com sucesso!");
      window.location.href = "../html/dashboard_user.html";
    } else {
      console.error("Erro no servidor:", result);
      alert("Erro: " + (result.message || "Erro desconhecido."));
    }
  } catch (err) {
    console.error("Erro na submissão:", err);
    alert("Erro ao criar anúncio. Verifica a ligação ou tenta mais tarde.");
  }
});
