// js/signup.js

document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const telemovel = document.getElementById('telemovel').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const genero = document.getElementById('genero').value;

  try {
    const res = await fetch(`${API_BASE}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, telemovel, telefone, genero })
    });

    const data = await res.json();
    console.log("Resposta do servidor:", data);

    if (res.ok) {
      alert('Conta criada com sucesso! Podes agora fazer login.');
      window.location.href = 'login.html';
    } else {
      alert(data.message || 'Erro ao criar conta.');
    }

  } catch (err) {
    console.error('Erro na requisição:', err);
    alert('Erro na ligação com o servidor.');
  }
});
