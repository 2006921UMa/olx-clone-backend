const nome = localStorage.getItem("adminNome") || "Admin";
document.getElementById("admin-nome").textContent = nome;

const hostname = window.location.hostname;
const API_BASE = hostname === "localhost" || hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "https://olx-clone-backend-v2.onrender.com";

// Procurar utilizadores
async function carregarUtilizadores() {
  try {
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`${API_BASE}/api/users`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!res.ok) throw new Error("Erro ao procurar utilizadores");

    const utilizadores = await res.json();
    const tabela = document.getElementById("tabela-utilizadores");
    tabela.innerHTML = '<ul class="list-group"></ul>';
    const ul = tabela.querySelector("ul");

    utilizadores.forEach((user) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.innerHTML = `<strong>${user.nome}</strong> - ${user.email} (Admin: ${user.isAdmin})`;
      ul.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    document.getElementById("tabela-utilizadores").innerHTML =
      "<p>Erro ao carregar utilizadores.</p>";
  }
}

// Buscar anúncios (simulação)
document.getElementById("tabela-anuncios").innerHTML =
  "<p>[placeholder de anúncios]</p>";

carregarUtilizadores();

function logout() {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminNome");
  window.location.href = "../html/login-admin.html";
}
