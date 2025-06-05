# Modelos Sequelize (MySQL e PostgreSQL)
# A plataforma **Render.com** não fornece serviço de MySQL, apenas **PostgreSQL**.

Esta pasta contém os modelos utilizados pela aplicação OLX Clone, organizados por SGBD (Sistema de Gestão de Base de Dados).

## Pasta - Estrutura

Cada modelo está dividido em dois ficheiros, conforme o SGBD:

- `*.mysql.js` — Definições específicas para MySQL
- `*.postsql.js` — Definições específicas para PostgreSQL (Render)

Exemplo:
```
user.mysql.js
user.postsql.js
```

## ⚙️ Carregamento automático

O ficheiro [`init.models.js`](./init.models.js) deteta automaticamente o `dialect` configurado (`mysql` ou `postgres`) e carrega apenas os ficheiros correspondentes.

```js
const dialect = sequelize.getDialect(); // 'mysql' ou 'postgres'
```

## Porquê separar os modelos?

Apesar do Sequelize suportar múltiplos SGBDs, existem diferenças:

| Diferença                 | MySQL             | PostgreSQL            |
|---------------------------|-------------------|------------------------|
| Auto increment            | `AUTO_INCREMENT`  | `SERIAL` ou `IDENTITY` |
| Tipos booleanos           | `TINYINT(1)`      | `BOOLEAN`              |
| JSON                      | `TEXT`            | `JSON` ou `JSONB`      |
| Data e hora               | `DATETIME`        | `TIMESTAMP`            |

Separar os ficheiros torna o projeto mais limpo, flexível e fácil de migrar/gerir.

## Notas

- Todos os modelos exportam uma função `(sequelize, DataTypes) => Model`
- As associações (`associate`) são feitas dinamicamente se definidas no modelo
- Apenas os ficheiros `.mysql.js` ou `.postsql.js` são carregados, consoante o ambiente

---

## Observação Final

> No contexto deste projeto OLX Clone, a base de dados **MySQL** é utilizada localmente durante o desenvolvimento.
> A plataforma **Render.com** não fornece serviço de MySQL, apenas **PostgreSQL**.
> Por isso, os modelos foram divididos para garantir compatibilidade entre os dois ambientes (local vs produção).
