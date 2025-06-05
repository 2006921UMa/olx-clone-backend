// js/chat.js
// Chat entre utilizadores (por anúncio)

const token = localStorage.getItem("userToken") || localStorage.getItem("token");
const nome = localStorage.getItem("nome");
const adId = new URLSearchParams(window.location.search).get("ad_id");
const receiverId = new URLSearchParams(window.location.search).get("receiver_id");
const userId = token ? JSON.parse(atob(token.split(".")[1])).id : null;

// Redirecionar para login se não houver token
if (!token) {
  localStorage.setItem('afterLogin', window.location.href);
  window.location.href = "login.html";
}

document.getElementById("nome-utilizador").textContent = nome || "Desconhecido";
document.getElementById("titulo-chat").innerText = `Chat do Anúncio - Olá ${nome}`;

const mensagensDiv = document.getElementById("mensagens");
const form = document.getElementById("form-chat");
const input = document.getElementById("texto");

async function carregarMensagens() {
  try {
    const res = await fetch(`${API_BASE}/api/messages/ad/${adId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const mensagens = await res.json();
    mensagensDiv.innerHTML = "";

    if (!Array.isArray(mensagens)) {
      mensagensDiv.innerHTML = "<div class='text-danger'>Erro: formato inesperado de dados.</div>";
      return;
    }

    mensagens.forEach((msg) => {
      const div = document.createElement("div");
      const classe = msg.sender_id === userId ? "mensagem-enviada" : "mensagem-recebida";
      div.className = classe;
      const data = new Date(msg.createdAt).toLocaleString("pt-PT");
      div.innerHTML = `
        <small><strong>${msg.Sender?.name || "Utilizador"}:</strong> ${data}</small><br>
        ${msg.content}
      `;
      mensagensDiv.appendChild(div);
    });

    mensagensDiv.scrollTop = mensagensDiv.scrollHeight;
  } catch (err) {
    mensagensDiv.innerHTML = "<div class='text-danger'>Erro ao carregar mensagens.</div>";
    console.error(err);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const content = input.value.trim();
  if (!content) return;

  if (!adId || !receiverId) {
    alert("Erro: faltam parâmetros ad_id ou receiver_id na URL.");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content, ad_id: adId, receiver_id: receiverId }),
    });

    if (res.ok) {
      input.value = "";
      carregarMensagens();
    } else {
      const erro = await res.json();
      console.error("Erro ao enviar:", erro);
      alert(erro.message || "Erro ao enviar mensagem.");
    }
  } catch (err) {
    console.error("Erro ao enviar mensagem:", err);
  }
});

// Inicializar
if (adId && receiverId) {
  carregarMensagens();
  setInterval(carregarMensagens, 5000);
} else {
  alert("Erro: faltam parâmetros ad_id ou receiver_id na URL.");
}
