// controller/user.controller.js

const db = require("../models/init.models");
const bcrypt = require("bcryptjs");
const User = db.user;

// Criar novo utilizador
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, telefone, genero, isAdmin, foto_perfil } =
      req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Campos obrigatórios em falta." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.User.create({
      name,
      email,
      password: hashedPassword,
      telefone: telefone || null,
      genero: genero || null,
      isAdmin: isAdmin || 0,
      foto_perfil: foto_perfil || "default.png", // frontend/img/utilizador
    });

    res
      .status(201)
      .json({ message: "Utilizador criado com sucesso.", user: newUser });
  } catch (err) {
    console.error("Erro ao criar utilizador:", err);
    res.status(500).json({ message: "Erro ao criar utilizador." });
  }
};

// Mostrar perfil do utilizador autenticado
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "Utilizador não encontrado." });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao obter utilizador.", error: error.message });
  }
};

// Atualizar o próprio perfil
exports.updateOwnProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await db.user.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Utilizador não encontrado." });
    }

    const { telefone, morada, genero } = req.body;

    if (telefone !== undefined) user.telefone = telefone;
    if (morada !== undefined) user.morada = morada;

    if (genero !== undefined) {
      if (!["M", "F", "O"].includes(genero)) {
        return res
          .status(400)
          .json({ message: "Género inválido. Use M, F ou O." });
      }
      user.genero = genero;
    }

    await user.save();
    res.status(200).json({ message: "Perfil atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    res.status(500).json({ message: "Erro ao atualizar perfil." });
  }
};

// Listar todos os utilizadores (admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar utilizadores." });
  }
};

// Obter utilizador por ID
exports.getUserById = async (req, res) => {
  try {
    let id = req.params.id;
    if (id === "me") id = req.user.id;

    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user)
      return res.status(404).json({ message: "Utilizador não encontrado." });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter utilizador." });
  }
};

// Atualizar utilizador (próprio ou admin)
exports.updateUser = async (req, res) => {
  try {
    // const id = req.params.id;

    let id = req.params.id;
    // Se o id for "me", usa o id do utilizador autenticado
    if (id === "me") id = req.user.id;

    const user = await User.findByPk(id);
    if (!user)
      return res.status(404).json({ message: "Utilizador não encontrado." });

    const isAdmin = req.user?.isAdmin;
    const isOwner = req.user?.id === user.id;

    if (!isOwner && !isAdmin) {
      return res
        .status(403)
        .json({ message: "Sem permissão para atualizar este utilizador." });
    }

    const {
      name,
      email,
      password,
      telefone,
      genero,
      isAdmin: novoNivel,
      foto_perfil,
    } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (telefone !== undefined) user.telefone = telefone;
    if (genero !== undefined) user.genero = genero;
    if (foto_perfil !== undefined) user.foto_perfil = foto_perfil;
    if (typeof novoNivel !== "undefined" && isAdmin) {
      // Apenas admins podem alterar o nível
      user.isAdmin = novoNivel;
    }
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json({ message: "Utilizador atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar utilizador:", error);
    res.status(500).json({ message: "Erro ao atualizar utilizador." });
  }
};

// Apagar utilizador (admin)
exports.deleteUser = async (req, res) => {
  try {
    let id = req.params.id;
    if (id === "me") id = req.user.id;

    const user = await User.findByPk(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Utilizador não encontrado." });

    await user.destroy();
    res.json({ message: "Utilizador apagado com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao apagar utilizador." });
  }
};
