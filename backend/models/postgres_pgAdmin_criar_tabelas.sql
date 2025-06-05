CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  genero VARCHAR(1) CHECK (genero IN ('M','F','O')),
  morada VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  telemovel VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  isAdmin INTEGER DEFAULT 0,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL,
  telefone VARCHAR(255),
  foto_perfil VARCHAR(255)
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  image VARCHAR(255)
);

CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    nif VARCHAR(30),
    email VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE ads (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(255),
  category_id INTEGER REFERENCES categories(id),
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  location VARCHAR(255),
  has_video BOOLEAN DEFAULT FALSE,
  views INTEGER NOT NULL DEFAULT 0,
  image_url VARCHAR(255),
  company_id INTEGER REFERENCES companies(id)
);

CREATE TABLE followed_ad (
  id SERIAL PRIMARY KEY,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL,
  ad_id INTEGER REFERENCES ads(id) ON DELETE CASCADE ON UPDATE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL,
  ad_id INTEGER REFERENCES ads(id) ON DELETE CASCADE ON UPDATE CASCADE,
  sender_id INTEGER REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  receiver_id INTEGER REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  ad_id INTEGER REFERENCES ads(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  stars INTEGER NOT NULL CHECK (stars >= 1 AND stars <= 5),
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sequelizemeta (
  name VARCHAR(255) PRIMARY KEY
);

ALTER TABLE categories ADD COLUMN image VARCHAR(255);

INSERT INTO categories (id, name, "createdAt", "updatedAt", slug, image) VALUES
(1, 'Carros',         '2025-05-27 23:55:01', '2025-05-27 23:55:01', 'carros', 'categ_veiculo_0015.png'),
(2, 'Tecnologia',     '2025-05-27 23:55:01', '2025-05-27 23:55:01', 'tecnologia', 'categ_telemovel_0011.png'),
(3, 'Casa',           '2025-05-27 23:55:01', '2025-05-27 23:55:01', 'casa', 'categ_imovel_0013.png'),
(4, 'Emprego',        '2025-05-27 23:55:01', '2025-05-27 23:55:01', 'emprego', 'categ_crianca_0010.png'),
(5, 'Cadeira',        '2025-05-28 12:40:10', '2025-05-28 12:40:10', 'cadeira', 'categ_cadeira_0008.png'),
(6, 'Crianca',        '2025-05-28 12:40:10', '2025-05-28 12:40:10', 'crianca', 'categ_crianca_0010.png'),
(7, 'Fotografica',    '2025-05-28 12:40:10', '2025-05-28 12:40:10', 'fotografica', 'categ_fotografica_0006.png'),
(8, 'Galinha',        '2025-05-28 12:40:10', '2025-05-28 12:40:10', 'galinha', 'categ_galinha_0001.png'),
(9, 'Imovel',         '2025-05-28 12:40:10', '2025-05-28 12:40:10', 'imovel', 'categ_imovel_0013.png'),
(10, 'Livro',         '2025-05-28 12:40:10', '2025-05-28 12:40:10', 'livro', 'categ_livro_0003.png'),
(11, 'Lojamento',     '2025-05-28 12:40:10', '2025-05-28 12:40:10', 'lojamento', 'categ_lojamento_0012.png'),
(12, 'Mota',          '2025-05-28 12:40:10', '2025-05-28 12:40:10', 'mota', 'categ_mota_0002.png'),
(13, 'Pasta',         '2025-05-28 12:40:10', '2025-05-28 12:40:10', 'pasta', 'categ_pasta_0009.png'),
(14, 'Roupa',         '2025-05-28 12:40:10', '2025-05-28 12:40:10', 'roupa', 'categ_roupa_0007.png'),
(15, 'Telemovel',     '2025-05-28 12:40:10', '2025-05-28 12:40:10', 'telemovel', 'categ_telemovel_0011.png'),
(16, 'Trator',        '2025-05-28 12:40:10', '2025-05-28 12:40:10', 'trator', 'categ_trator_0004.png');

INSERT INTO users (id, name, genero, morada, email, telemovel, password, "isAdmin", "createdAt", "updatedAt", telefone, foto_perfil) VALUES
(0, 'utilizador', 'M', 'Ribeira Brava', 'utilizador@madeira.pt', '965615031', '$2b$10$Q8GuvwareR8mMGzPVv1jxuMREuRY/hNBRjiN4anvX1n15kcFJ/yeK', 0, '2025-05-25 23:50:15', '2025-06-05 19:56:30', '999999999', 'default.png'),
(1, 'admin', 'F', 'Rua do til', 'admin@madeira.pt', NULL, '$2b$10$7Gojr4xVGDDF4doUwdnAvOH/MDOox2enP1eGZkzScfXIYFs55Bq9y', 1, '2025-05-23 15:45:34', '2025-06-05 01:07:26', '12345', 'default.png'),
(2, 'operador', 'O', 'Machico', 'operador@madeira.pt', '9876452314', '$2b$10$FMbvFMpRT05ElnNYn2M8juEkCntPAznJU/FYxPCwiRJlOXFvua3ti', 2, '2025-05-23 15:45:34', '2025-06-03 22:56:23', '2979843', 'default.jng'),
(3, 'gestor', 'F', 'Ponta do Sol', 'gestor@madeira.pt', '98654329', '$2b$10$FUesCRq0a.ZarAsRnlSC3uzf84ZMcL4qE8r9lMhHo8t8hlvXcqyEa', 3, '2025-06-03 22:22:38', '2025-06-03 22:22:38', '291893456', 'default.png'),
(4, 'supervisor', 'M', 'Sao Joao', 'supervisor@madeira.pt', '965615045', '$2b$10$FUesCRq0a.ZarAsRnlSC3uzf84ZMcL4qE8r9lMhHo8t8hlvXcqyEa', 4, '2025-06-03 22:22:38', '2025-06-03 22:22:38', '291227945', 'default.png');

ALTER TABLE ads
ADD COLUMN has_video BOOLEAN;
ADD COLUMN video_url VARCHAR(255);

DELETE FROM ads;

INSERT INTO ads 
(id, title, description, image_url, user_id, "createdAt", "updatedAt", category_id, price, location, has_video, views, company_id, video_url)
VALUES
(1,  'Anuncio 1',  'Descricao do anuncio numero 1.', 'ad_0001.jpg', 1, '2025-05-28 10:21:18', '2025-05-28 10:21:18', 1, 10.00, 'Funchal', FALSE, 0, NULL, NULL),
(2,  'Anuncio 2',  'Descricao do anuncio numero 2.', 'ad_0002.jpg', 2, '2025-05-28 10:21:18', '2025-05-28 10:21:18', 2, 20.00, 'Ribeira Brava', FALSE, 0, NULL, NULL),
(3,  'Anuncio 3',  'Descricao do anuncio numero 3.', 'ad_0003.jpg', 3, '2025-05-28 10:21:18', '2025-05-28 10:21:18', 3, 30.00, 'Machico', FALSE, 0, NULL, NULL),
(4,  'Anuncio 4',  'Descricao do anuncio numero 4.', 'ad_0004.jpg', 4, '2025-05-28 10:21:18', '2025-05-28 10:21:18', 4, 40.00, 'Câmara de Lobos', FALSE, 0, NULL, NULL),
(5,  'Anuncio 5',  'Descricao do anuncio numero 5.', 'ad_0005.jpg', 1, '2025-05-28 10:21:18', '2025-05-28 10:21:18', 5, 50.00, 'Santa Cruz', FALSE, 0, NULL, NULL),
(6,  'Anuncio 6',  'Descricao do anuncio numero 6.', 'ad_0006.jpg', 2, '2025-05-28 10:21:18', '2025-05-28 10:21:18', 6, 60.00, 'Porto Moniz', FALSE, 0, NULL, NULL),
(7,  'Anuncio 7',  'Descricao do anuncio numero 7.', 'ad_0007.jpg', 3, '2025-05-28 10:21:18', '2025-05-28 10:21:18', 7, 70.00, 'Santana', FALSE, 0, NULL, NULL),
(11,  'Anuncio 8',  'Descricao do anuncio numero 8.', 'ad_0008.jpg', 4, '2025-05-28 10:21:18', '2025-05-28 10:21:18', 8, 80.00, 'São Vicente', FALSE, 0, NULL, NULL),
(12,  'Anuncio 9',  'Descricao do anuncio numero 9.', 'ad_0009.jpg', 1, '2025-05-28 10:21:18', '2025-05-28 10:21:18', 9, 90.00, 'Calheta', FALSE, 0, NULL, NULL),
(13, 'Anuncio 10', 'Descricao do anuncio numero 10.', 'ad_0010.jpg', 2, '2025-05-28 10:21:18', '2025-05-28 10:21:18', 10, 100.00, 'Ponta do Sol', FALSE, 0, NULL, NULL);


(21, 'Anuncio 21', 'Descricao do anuncio numero 21.', 'ad_0021.jpg', 2, '2025-05-28 10:21:18', '2025-05-28 10:21:18', 1, 210.00, 'Funchal', FALSE, 0, NULL, NULL);

ALTER TABLE companies
ADD COLUMN is_active BOOLEAN DEFAULT true;

INSERT INTO companies (id, name, nif, email, "createdAt", "updatedAt", user_id) VALUES
(1, 'Tech Madeira Lda', '510123456', 'contacto@techmadeira.pt', '2025-05-29 14:50:00', '2025-05-29 14:50:00', 1),
(2, 'AutoZoom',         '512987654', 'vendas@autozoom.pt',     '2025-05-29 14:50:00', '2025-05-29 14:50:00', 1),
(3, 'Livros do Atlantico', '513456789', 'info@livrosatl.pt',     '2025-05-29 14:50:00', '2025-05-29 14:50:00', 1),
(4, 'Moda Jovem',       '514111222', 'moda@jovem.pt',          '2025-05-29 14:50:00', '2025-05-29 14:50:00', 1),
(5, 'Casa & Jardim',    '515999888', 'geral@casaejardim.pt',   '2025-05-29 14:50:00', '2025-05-29 14:50:00', 1);

DELETE FROM ratings;

INSERT INTO ratings (id, ad_id, user_id, stars, "createdAt", "updatedAt") VALUES
(7, 2, 1, 4, '2025-05-29 14:51:49', '2025-05-29 14:51:49'),
(8, 3, 1, 3, '2025-05-29 14:51:49', '2025-05-29 14:51:49');

ALTER TABLE messages
ADD COLUMN "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

INSERT INTO messages (id, content, "createdAt", "updatedAt", ad_id, sender_id, receiver_id) VALUES
(1, 'Ola, este carro ainda esta disponivel?',    '2025-06-04 16:37:07', '2025-06-04 16:37:07', 3, 2, 0),
(2, 'Sim, ainda esta a venda!',                 '2025-06-04 16:37:07', '2025-06-04 16:37:07', 3, 0, 2),
(3, 'Qual o preco final?',                      '2025-06-04 16:37:07', '2025-06-04 16:37:07', 3, 2, 0),
(4, 'Admin com utilizador : admin',            '2025-06-05 01:12:55', '2025-06-05 01:12:55', 4, 1, 1);

INSERT INTO followed_ad (user_id, ad_id) VALUES
(1, 2),
(2, 3),
(3, 4),
(1, 4);



// apagar todos os dados
DELETE FROM ratings;
DELETE FROM followed_ad;
DELETE FROM messages;
DELETE FROM ads;
DELETE FROM categories;
DELETE FROM companies;
DELETE FROM users;

Primeiro insere:
categories - ok
companies - ok 
users - ok

Depois insere:
ads (usa category_id, user_id, company_id) - ok 
followed_ad - ok
messages -ok
ratings -ok


CREATE TABLE followed_ad (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  ad_id INTEGER REFERENCES ads(id)
);


