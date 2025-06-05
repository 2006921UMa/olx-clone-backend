// js/admin-login.js
document
  .getElementById("admin-login-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const hostname = window.location.hostname;
    const API_BASE = hostname === "localhost" || hostname === "127.0.0.1"
        ? "http://localhost:3000" // Convem alterar, quando mudar Porta (breve criar link Porta .env )
        : "https://olx-clone-backend-v2.onrender.com"; // tb cria um único link

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Resposta do login:", data);

      
      // if (data.token && (data.isAdmin === 1 || data.isAdmin === 2)) {
      
      // Só entra se isAdmin for 1 ou mais
      if (data.token && data.isAdmin >= 1) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminNome", data.nome || "Admin");
        window.location.href = "../html/dashboard.html";
      } else {
        alert("Acesso restrito. Apenas administradores podem entrar.");
      }
    } catch (err) {
      console.error("Erro no login:", err);
      alert("Erro ao tentar fazer login.");
    }
  });
