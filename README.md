# OLX Clone - Projeto Final

Este é um projeto de clone do OLX.pt desenvolvido para a unidade curricular de Desenvolvimento Web - Back-End (2024/2025). A aplicação está dividida em duas partes principais: uma API RESTful em Node.js (backend) e um front-end simples em HTML/CSS/JS.

---

## Ferramenta - Tecnologias Utilizadas

### Backend (Node.js + Express)
- Node.js + Express
- Sequelize ORM
- Base de dados PostgreSQL (Render)
- Autenticação com JWT
- Upload de imagem com Multer
- API documentada com Swagger

Hospedado no **Render**  
https://olx-clone-backend-v2.onrender.com

---

### Frontend (HTML/CSS/JS)
- HTML5, CSS3, Bootstrap 5
- JavaScript puro (`fetch()` com JWT)
- Estrutura semelhante ao OLX real
- Menu de navegação + categorias + login

Hospedado no **Vercel**  
https://olx-clone-frontend.vercel.app

---

## Produção/Desenvolvimento - Deploy

- **Frontend-antigo**: [Netlify-Link aqui](https://olx-clone-frontend-anuncio.netlify.app/)
- **Login-netlify-antigo**: [link login](https://olx-clone-frontend-anuncio.netlify.app/login.html) ## Ver token F12

- **Frontend-novo**: [Vercel-Link aqui](https://olx-clone-backend-weld.vercel.app/)
- **Backend**: [Render - Link aqui](https://olx-clone-backend-v1.onrender.com/)

## Estrutura do projecto

```
olx-clone/          # Pasta de Raiz
├── backend/        # API em Node.js
├── frontend/       # HTML/CSS/JS para Netlify
├── .gitignore      # Não exportar - Razões segurança
└── README.md       # Leitura sobre Autor e outros
```

---

##  As funcionalidades: 

- Registo e Login com JWT
- CRUD de anúncios com imagem
- Publicação de anúncios com imagem
- Chat entre utilizadores (por anúncio)
- Marcar anúncios como favoritos
- Pesquisa e filtros
- Backoffice (administração de utilizadores e anúncios)
- Design responsivo com categorias visuais
- Integração completa entre Front-End e API

---

## Como executar localmente

1. Clonar o repositório:
git clone https://github.com/2006921UMa/olx-clone-backend.git

2. Instalar dependências do backend:
cd olx-clone-backend/backend
npm install

3. Criar `.env` com variáveis de base de dados e JWT

4. Iniciar o backend:
npm start

5. Abrir `frontend/index.html` no browser

---
## Configuração CORS (Cross-Origin Resource Sharing)

Como a aplicação utiliza front-end e back-end hospedados em domínios diferentes (Vercel e Render), foi necessário configurar o middleware CORS no Express.

Para evitar a necessidade de adicionar manualmente cada novo subdomínio Vercel (gerado a cada deploy), foi implementada uma verificação dinâmica:

```js
origin: function (origin, callback) {
  if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
    callback(null, true); // Permitir a origem
  } else {
    console.warn("CORS bloqueado para:", origin);
    callback(new Error("Não autorizado por CORS"));
  }
}
```
### Esta solução permite:
- Testes locais com `localhost`
- Ambientes definidos no ficheiro `.env`
- Todos os domínios de deploy da Vercel (`*.vercel.app`)

Com esta configuração, a comunicação entre o front-end e a API é segura, escalável e compatível com a política de segurança dos browsers modernos.

---
## Autor

Aluno: **2006921UMa**  
Curso: Técnico Superior Profissional de Programação e Redes  
Universidade da Madeira - 2024/2025

---

## Notas Técnicas:
Durante o desenvolvimento do frontend, a aplicação foi inicialmente publicada no Netlify. No entanto, a plataforma apresentou algumas limitações práticas:

- Cache agressiva (dificuldade em atualizar ficheiros corrigidos)
- Deploy manual pouco fiável
- Botão “Trigger Deploy” nem sempre disponível

Por estes motivos, foi tomada a decisão técnica de migrar o frontend para o Vercel, que permitiu:

- Deploy automático com GitHub
- Integração mais limpa
- Menor frustração técnica e foco total na funcionalidade da aplicação

A versão Netlify foi mantida apenas como referência ou ambiente de teste.