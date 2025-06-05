// js/login.js

// js/login.js

// window.addEventListener('DOMContentLoaded', () => {
//   const msg = localStorage.getItem('mensagemLogin');
//   if (msg) {
//     document.getElementById('mensagem').textContent = msg;
//     localStorage.removeItem('mensagemLogin');
//   } else {
//     // Limpa qualquer mensagem que por acaso tenha ficado "presa"
//     document.getElementById('mensagem').textContent = "";
//     localStorage.removeItem('mensagemLogin');
//   }
// });

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const hostname = window.location.hostname;
  const API_BASE =
    hostname === "localhost" || hostname === "127.0.0.1"
      ? "http://localhost:3000"
      : "https://olx-clone-backend-v2.onrender.com";

  try {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem("userToken", data.token); // <- para chat, perfil, etc.
      localStorage.setItem("nome", data.nome); // é opcional, se precisares do nome no frontend
      console.log("Login bem-sucedido. Token:", data.token);

      // ---- CORREÇÃO PARA RETORNAR À PÁGINA ORIGINAL (chat, anúncio, etc.) ----
      const destino = localStorage.getItem("afterLogin");
      if (destino) {
        localStorage.removeItem("afterLogin");
        window.location.href = destino;
      } else {
        window.location.href = "../html/dashboard_user.html";
      }

      // -----------------------------------------------------------------------
    } else {
      alert(data.message || "Credenciais inválidas.");
    }
  } catch (err) {
    console.error("Erro ao tentar fazer login:", err);
    alert("Erro ao tentar fazer login.");
  }
});
