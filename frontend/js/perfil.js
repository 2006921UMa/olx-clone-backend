// js/perfil.js

document.addEventListener("DOMContentLoaded", () => {
  const API_URL = location.hostname.includes("localhost")
    ? "http://localhost:3000/api"
    : "https://olx-clone-backend-v2.onrender.com";

  const token = localStorage.getItem("userToken");

  if (!token) {
    alert("É necessário estar autenticado.");
    window.location.href = "login.html";
    return;
  }

  const btnGuardar = document.getElementById("btn-editar");
  const btnSair = document.getElementById("btn-sair");

  const campos = {
    nome: document.getElementById("nome"),
    email: document.getElementById("email"),
    telefone: document.getElementById("telefone"),
    morada: document.getElementById("morada"),
    genero: document.getElementById("genero"),
  };

  // Carregar dados do perfil
  fetch(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((user) => {
      if (!user.id) {
        alert("Erro ao carregar perfil.");
        return;
      }

      campos.nome.value = user.name;
      campos.email.value = user.email;
      campos.telefone.value = user.telefone || "";
      campos.morada.value = user.morada || "";
      campos.genero.value = user.genero || "";
    })
    .catch((err) => {
      console.error("Erro ao carregar perfil", err);
      alert("Erro na ligação com o servidor.");
    });

  // Guardar alterações
  btnGuardar.addEventListener("click", async () => {
    const dados = {
      telefone: campos.telefone.value,
      morada: campos.morada.value,
      genero: campos.genero.value,
    };

    const res = await fetch(`${API_URL}/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dados),
    });

    const resposta = await res.json();
    if (res.ok) {
      alert("Perfil atualizado com sucesso.");
    } else {
      alert(
        "Erro ao atualizar perfil: " +
          (resposta.message || JSON.stringify(resposta))
      );
    }
  });

  btnSair.addEventListener("click", () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("nome");
    window.location.href = "login.html";
  });
});
