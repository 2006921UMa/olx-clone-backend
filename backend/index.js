// index.js

require("dotenv").config();

const express = require("express");
const db = require("./models/init.models");
const path = require("path");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

// ===========/INICIO-CORS/============
const cors = require("cors");

// Ativar CORS para permitir pedidos do Netlify
// app.use(cors({
// // Para desenvolvimento => * (Nota cuidado: fica em inseguro no API), ..
// // .. tornar seguro -> produção => 'https://olx-clone-frontend-anuncio.netlify.app'
//   origin: "*",  // Cuidado "*"
// }));

const isDev = process.env.NODE_ENV !== "production";

// Múltiplos domínios - local, vercel e antigo netlify
const allowedOrigins = isDev
  ? [
      "http://localhost:3000", // server local .env - Mysql
      "http://localhost:10000", // Port server render
      "http://localhost:5500", // live Server (VS code) Se porta 3000 estiver ocupada passa para 5500 (usa para CROS)
      "http://localhost:3001", // go live -> live server - Deve pôr comentario por causa verificação do render - dá erro
       "http://127.0.0.1:3001", // para receber dados API
      "https://olx-clone-frontend-anuncio.netlify.app", // netlify - deixou usar
      "https://olx-clone-backend-iljpovmd0-2006921s-projects.vercel.app", // vercel - site em produção
      "https://olx-clone-backend-git-main-2006921s-projects.vercel.app" // temporario git(vercel)
    ]
  : [
      "https://olx-clone-backend-git-main-2006921s-projects.vercel.app",  // temporario git(vercel)
      "https://olx-clone-backend-iljpovmd0-2006921s-projects.vercel.app", // vercel - site em produção V1
      "https://olx-clone-backend-hi5v0ou3y-2006921s-projects.vercel.app"  // vercel - site em produção V2
      // usar origin.endsWith('.vercel.app) resolve o problema
    ];

// CORS = Cross-Origin Resource Sharing (Partilha de Recursos entre Origens Diferentes)
app.use(
  cors({
    // Define dinamicamente que origens (domínios) são permitidas aceder à API
    origin: function (origin, callback) {
      // Se não existir origins (ex: requisição local, tipo Postman), ou se estiver na lista de permitidos:
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app') || origin.startsWith('http://127.0.0.1:')) {
        // Aceita a requisição
        callback(null, true);
      } else {
        console.warn("Pedido bloqueado por CORS de:", origin);
        // Rejeita a requisição com um erro de CORS
        callback(new Error("Não autorizado por CORS"));
      }
    },
  })
);

// ===========/FIM-CORS/============

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota raiz - é o principal principio (teste)
// app.get("/", (req, res) => {
//   res.send(" OLX Clone API online! Tenta /api/users ou /api/ads");
// });

const caminhoIndex = path.join(__dirname, '..', 'frontend', 'index.html');
// console.log('Caminho para o index.html:', caminhoIndex);


// Rota raiz envia o index.html da pasta frontend
app.get('/', (req, res) => {
  res.sendFile(caminhoIndex, (err) => {
    if (err) {
      console.error('Erro a servir index.html:', err);
      res.status(500).send('Erro ao carregar a página inicial');
    }
  });
});

// Serve ficheiros estáticos da pasta frontend
app.use(express.static(path.join(__dirname, '..', 'frontend')));


// Rotas
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/categories", require("./routes/category.routes"));
app.use("/api/ads", require("./routes/ad.routes"));
app.use("/api/messages", require("./routes/message.routes"));
app.use("/api/favorites", require("./routes/favorite.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/admin/nivel", require("./routes/admin_nivel.routes"));

// Uploads (imagens)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Swagger docs
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Iniciar servidor (Render exige 0.0.0.0 e PORT do ambiente), 10000 é padrão port render, 3000 é padrão local
const PORT = process.env.PORT || 3000;


// =========================== via .env =============================
// const forceSync = process.env.DB_SYNC_FORCE === 'true';
// const alterSync = process.env.DB_SYNC_ALTER === 'true';

// sequelize.sync({ force: forceSync, alter: alterSync })
//   .then(() => console.log("Base de dados sincronizada com sucesso"))
//   .catch(err => console.error("Erro ao sincronizar BD:", err));
/*
Resumo rápido:
  Opção	O que faz	Dados existentes
      force: true	Apaga e cria tudo do zero	Apagados
      alter: true	Tenta alterar sem apagar	Mantidos (mas pode falhar)
      nenhum deles	Não altera estrutura	Mantidos
*/ 
//=========================== =============================


db.sequelize.sync({ alter: false }) // true ou false Nota: true é uma vez
//  db.sequelize.sync({ force: true }) // Cuidado: apaga dos dados!
  .then(() => {    
    console.log("Base de dados sincronizada com sucesso.");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor a correr na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao sincronizar a base de dados:", err);
  });
