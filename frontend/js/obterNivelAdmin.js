// js/obterNivelAdmin.js

const token = localStorage.getItem('adminToken');

fetch(`${API_BASE}/api/admin/nivel`, {
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
  .then(res => res.json())
  .then(data => {
    const info = document.getElementById('admin-info');
    if (info) {
      info.innerHTML = `<strong>Olá, ${data.nome}</strong><br>Nível: ${data.nivel}`;
    }
  })
  .catch(err => {
    console.error('Erro ao obter nível admin:', err);
    const info = document.getElementById('admin-info');
    if (info) {
      info.textContent = 'Erro ao carregar informação do utilizador.';
    }
  });
