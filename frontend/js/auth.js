// js/auth.js (login)

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userToken");
  localStorage.removeItem("nome");
   window.location.href = "../index.html";
}

// document.addEventListener("DOMContentLoaded", () => {
//   const token = localStorage.getItem("token");
//   const nome = localStorage.getItem("nome");

//   if (!token || !nome) {
//     alert("Sessão expirada. Por favor, faz login novamente.");
//     window.location.href = "../html/login.html";
//   } else {
//     document.getElementById("nome-utilizador").textContent = nome;
//   }
// });

// Sair da Conta - Apagar token activo utilizador
// function logout() {
//   localStorage.removeItem("token");
//   localStorage.removeItem("userToken");
//   localStorage.removeItem("nome");
//   // Adiciona aqui qualquer outro item que tenhas guardado

//   window.location.href = "../index.html"; // redireciona para página pública
// }