// middleware/verifyToken.js

const jwt = require("jsonwebtoken");
const db = require("../models/init.models");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(403)
        .json({ message: "Token não fornecido ou formato inválido." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res
        .status(401)
        .json({ message: "Token inválido: sem ID de utilizador." });
    }

    const user = await db.user.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Utilizador não encontrado." });
    }

    // Estes dois campos são essenciais:
    req.user_id = user.id; // usado por ex. no sender_id
    req.user = {
      id: user.id,
      nome: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    next();
  } catch (err) {
    console.error("Erro ao verificar token:", err.message);
    return res
      .status(401)
      .json({ message: "Token inválido ou expirado." });
  }
};

module.exports = verifyToken;