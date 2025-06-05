# 🛒 OLX Clone - Projeto Final Back-End

Projeto final da UC **Desenvolvimento Web - Back-End (2024/2025)**  
Desenvolvido por **2006921**

## Funcionalidades principais

- Registo e Login com JWT
- CRUD de anúncios (com imagem)
- Chat entre utilizadores (mensagens por anúncio)
- Seguir anúncios (favoritos)
- Backoffice (admin) com gestão de utilizadores e anúncios
- Pesquisa e filtro por título/categoria

## Tecnologias

- Node.js + Express
- Sequelize + MySQL
- Multer (upload de imagens)
- JWT (autenticação)

## Instalação local

```bash
git clone https://github.com/teu-utilizador/olx-clone-backend.git
cd olx-clone-backend
npm install
cp .env.example .env

npm start # or npx nodemon index.js or node index.js
