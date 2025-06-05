select * from categories;

ALTER TABLE categories
ADD COLUMN slug VARCHAR(255) UNIQUE;
ADD COLUMN "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

INSERT INTO categories (name, image, "createdAt", "updatedAt") VALUES
('Tecnologia', 'categ_tecnologia_0001.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Veículos', 'categ_veiculos_0002.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Casa', 'categ_casa_0003.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Moda', 'categ_moda_0004.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Desporto', 'categ_desporto_0005.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


============================ // ==========================================

select * from ads;

SELECT id, title FROM ads WHERE id = 1;


INSERT INTO ads (title, description, price, "user_id", "category_id", "createdAt", "updatedAt")
VALUES
('Anúncio 1', 'Descrição exemplo', 100.00, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


SELECT id, title FROM ads;

INSERT INTO ads (title, description, price, "image_url", "user_id", "category_id", "createdAt", "updatedAt")
VALUES
('Anúncio 1', 'Descrição 1', 10.00, 'ad_0001.jpg', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Anúncio 2', 'Descrição 2', 20.00, 'ad_0002.jpg', 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Anúncio 3', 'Descrição 3', 30.00, 'ad_0003.jpg', 2, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

============================ // =============================================
select * from ratings;

SELECT * FROM ratings ORDER BY "createdAt" DESC;


INSERT INTO ratings ("ad_id", "user_id", stars, "createdAt", "updatedAt")
VALUES (1, 1, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO ratings ("ad_id", "user_id", stars, "createdAt", "updatedAt") VALUES 
(16, 1, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(17, 2, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(18, 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(19, 1, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(16, 2, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

============================ // =============================================

SELECT * FROM users;

ALTER SEQUENCE users_id_seq RESTART WITH 4;   // serve quando comecar 4 e não 0

SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));

INSERT INTO users (id, name, email, password, "isAdmin", "createdAt", "updatedAt") VALUES
(2, 'joao', 'joao@madeira.pt', '$2b$10$D0.dZI.HAD7z1Esix5VFl.teyzuyCkBFoj5YP0KHGq0pBsaQZPz1m', 0, '2025-05-27 11:32:51.336+00', '2025-05-27 11:32:51.336+00'),
(1, 'admin', 'admin@madeira.pt', '$2b$10$IiY37vENsHkAzTtjC4G.k.vyxCQQbklsc8VufbsaFfkmBHut30Yjq', 1, '2025-05-23 22:58:58.809+00', '2025-05-23 22:58:58.810+00'),
(3, 'utilizador', 'utilizador@madeira.pt', '$2b$10$mQQMjmcq4e4d2BeE0w1.beSkg2BMVX1BYYGE08VeEohermRs.Jx/K', 0, '2025-05-27 22:07:53.545+00', '2025-05-27 22:07:53.546+00');


============================ // =============================================

SELECT * FROM followed_ads;

INSERT INTO followed_ads ("user_id", "ad_id") VALUES
(1, 16),
(2, 17),
(3, 18),
(1, 18);


============================ // =============================================


SELECT * FROM messages;

SELECT * FROM messages ORDER BY id;

INSERT INTO messages ("content", "sender_id", "receiver_id", "ad_id", "createdAt") VALUES
('Olá, ainda está disponível?', 1, 2, 16, CURRENT_TIMESTAMP),
('Sim, está disponível!', 2, 1, 16, CURRENT_TIMESTAMP),
('Pode fazer um desconto?', 3, 1, 16, CURRENT_TIMESTAMP),
('Quando posso ver o produto?', 2, 3, 17, CURRENT_TIMESTAMP),
('Estou interessado, envie mais fotos.', 1, 3, 18, CURRENT_TIMESTAMP);

INSERT INTO messages ("content", "sender_id", "receiver_id", "ad_id", "createdAt") VALUES
('Bom dia, ainda está disponível?',      2, 1, 16, CURRENT_TIMESTAMP),
('Sim, ainda tenho o produto.',          1, 2, 16, CURRENT_TIMESTAMP),
('Pode baixar o preço?',                 2, 1, 16, CURRENT_TIMESTAMP),
('Claro, podemos negociar.',             1, 2, 16, CURRENT_TIMESTAMP),
('Olá, está disponível para entrega?',   3, 1, 17, CURRENT_TIMESTAMP),
('Sim, posso entregar amanhã.',          1, 3, 17, CURRENT_TIMESTAMP);

============================ // =============================================

INSERT INTO messages (content, createdAt, updatedAt, ad_id, sender_id, receiver_id)
VALUES 
('Olá, este carro ainda está disponível?', NOW(), NOW(), 3, 2, 5),
('Sim, ainda está à venda!', NOW(), NOW(), 3, 5, 2),
('Qual o preço final?', NOW(), NOW(), 3, 2, 5),
('Podemos negociar sim. Está na Madeira?', NOW(), NOW(), 3, 5, 2),
('Sim, estou no Funchal. Posso ver o carro amanhã?', NOW(), NOW(), 3, 2, 5);
