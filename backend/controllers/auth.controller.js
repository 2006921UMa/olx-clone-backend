// auth.controller.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/init.models");
const User = db.user; // atenção: nome do modelo em minúsculas conforme teu db

const SECRET = process.env.JWT_SECRET || "segredo_super_secreto";

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar se já existe utilizador
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email já está registado." });
    }
    // Encriptar a password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar novo utilizador
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Utilizador registado com sucesso!",
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Erro no registo.", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se o utilizador existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Email não encontrado." });
    }

    // Verificar password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Password incorreta." });
    }

    // Criar token JWT com isAdmin incluído
    // ken = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1d" }); // 1d é 24 horas , 1h -> 1 hora , 43200 -> 12 horas (segundos)
    // Comentado porque variável 'ken' não é usada e duplicava token

    // Criar token JWT com isAdmin incluído
    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, SECRET, { expiresIn: "1d", }); // incluir isAdmin

    // Resposta com nome e isAdmin incluídos
    res.status(200).json({
      message: "Login efetuado com sucesso.",
      token,
      nome: user.name, // opcional, já estás a guardar no localStorage
      isAdmin: user.isAdmin, // ESSENCIAL para saber se pode entrar no backoffice
    });
  } catch (error) {
    res.status(500).json({ message: "Erro no login.", error: error.message });
  }
};
