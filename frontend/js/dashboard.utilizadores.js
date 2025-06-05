// js/dashboard.utilizadores.js

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("adminToken");
  const tabela = document.getElementById("tabela-utilizadores");

  fetch(`${API_BASE}/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((users) => {
      if (!Array.isArray(users)) {
        tabela.innerHTML = "Erro ao carregar utilizadores.";
        return;
      }
      const html = `
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Nível</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${users
              .map(
                (u) => `
              <tr>
                <td>${u.id}</td>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.isAdmin}</td>
                <td>${u.telefone || ""}</td>
                <td>
                  <button class="btn btn-sm btn-warning">Editar</button>
                  <button class="btn btn-sm btn-danger">Apagar</button>
                </td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
        <button class="btn btn-success mt-2">Criar Novo Utilizador</button>
      `;

      tabela.innerHTML = html;

      document.querySelectorAll(".btn-warning").forEach((btn, i) => {
        btn.addEventListener("click", () => abrirModal(users[i]));
      });

      document.querySelectorAll(".btn-danger").forEach((btn, i) => {
        btn.addEventListener("click", () => apagarUtilizador(users[i].id));
      });

      document
        .querySelector(".btn-success")
        .addEventListener("click", () => abrirModal());
    })
    .catch((err) => {
      console.error("Erro ao carregar utilizadores:", err);
      tabela.innerHTML = "Erro ao carregar utilizadores.";
    });

  const modal = new bootstrap.Modal(document.getElementById("modalUtilizador"));

  function abrirModal(user = null) {
    document.getElementById("utilizador-id").value = user?.id || "";
    document.getElementById("utilizador-nome").value = user?.name || "";
    document.getElementById("utilizador-email").value = user?.email || "";
    document.getElementById("utilizador-nivel").value = user?.isAdmin || "0";
    document.getElementById("utilizador-telefone").value = user?.telefone || "";
    document.getElementById("utilizador-telemovel").value = user?.telemovel || "";
    document.getElementById("utilizador-password").value = "";
    document.getElementById("utilizador-genero").value = user?.genero || "O";
    document.getElementById("utilizador-foto").value = user?.foto_perfil || "";

    modal.show();
  }

  document
    .getElementById("form-utilizador")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = document.getElementById("utilizador-id").value;
      const user = {
        name: document.getElementById("utilizador-nome").value,
        email: document.getElementById("utilizador-email").value,
        password: "123456",
        telefone: document.getElementById("utilizador-telefone").value,
        telemovel: document.getElementById("utilizador-telemovel").value,
        genero: document.getElementById("utilizador-genero").value,
        isAdmin: parseInt(document.getElementById("utilizador-nivel").value),
        foto_perfil: document.getElementById("utilizador-foto").value || "default.png",
      };

      const url = id ? `${API_BASE}/api/users/${id}` : `${API_BASE}/api/users`;
      const method = id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        modal.hide();
        location.reload();
      } else {
        alert("Erro ao guardar utilizador.");
      }
    });

  async function apagarUtilizador(id) {
    if (!confirm("Tem a certeza que deseja apagar este utilizador?")) return;

    const res = await fetch(`${API_BASE}/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      location.reload();
    } else {
      alert("Erro ao apagar utilizador.");
    }
  }
});
