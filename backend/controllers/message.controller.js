// controllers/message.controller.js

const db = require('../models/init.models');
const Message = db.message;

// Ver todas as mensagens (admin ou debug)
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await db.message.findAll({
      include: [
        { model: db.user, as: 'Sender', attributes: ['id', 'name'] },
        { model: db.user, as: 'Receiver', attributes: ['id', 'name'] },
        { model: db.ad, attributes: ['id', 'title'] }
      ]
    });
    res.json(messages);
  } catch (err) {
    console.error("ERRO getAllMessages:", err);
    res.status(500).json({ message: 'Erro ao listar mensagens.' });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { content, ad_id, receiver_id } = req.body;

    // Verificar apenas os campos necessários no body
    if (!content || !ad_id || !receiver_id) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    // Criar nova mensagem com o sender_id vindo do token
    const newMessage = await db.message.create({
      content,
      ad_id,
      sender_id: req.user_id, // vem do token
      receiver_id
    });

    return res.status(201).json(newMessage);
  } catch (err) {
    console.error("Erro ao enviar mensagem:", err);
    return res.status(500).json({ message: "Erro ao enviar mensagem." });
  }
};


// Ver mensagens por anúncio
exports.getMessagesByAd = async (req, res) => {
  try {
    const ad_id = req.params.ad_id;

    const messages = await db.message.findAll({
      where: { ad_id: ad_id },
      include: [
        { model: db.user, as: 'Sender', attributes: ['id', 'name'] },
        { model: db.user, as: 'Receiver', attributes: ['id', 'name'] }
      ]
    });

    res.json(messages);
  } catch (error) {
    console.error("Erro ao obter mensagens:", error);
    res.status(500).json({ message: "Erro ao obter mensagens." });
  }
};

// Obter uma mensagem específica por ID
exports.getMessageById = async (req, res) => {
  try {
    const message = await db.message.findByPk(req.params.id, {
      include: [
        { model: db.user, as: 'Sender', attributes: ['id', 'name'] },
        { model: db.user, as: 'Receiver', attributes: ['id', 'name'] },
        { model: db.ad, attributes: ['id', 'title'] }
      ]
    });

    if (!message) {
      return res.status(404).json({ message: "Mensagem não encontrada." });
    }

    res.json(message);
  } catch (error) {
    console.error("Erro ao obter a mensagem:", error);
    res.status(500).json({ message: "Erro ao obter a mensagem." });
  }
};


// Ver mensagens de um utilizador (enviadas ou recebidas)
exports.getMessagesByUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const messages = await db.message.findAll({
      where: {
        [db.Sequelize.Op.or]: [
          { sender_id: user_id },
          { receiver_id: user_id }
        ]
      },
      include: [
        { model: db.ad, attributes: ['id', 'title'] },
        { model: db.user, as: 'Sender', attributes: ['id', 'name'] },
        { model: db.user, as: 'Receiver', attributes: ['id', 'name'] }
      ]
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar mensagens do utilizador.' });
  }
};

// Atualizar mensagem
exports.updateMessage = async (req, res) => {
  try {
    const message = await db.message.findByPk(req.params.id);
    if (!message) return res.status(404).json({ message: "Mensagem não encontrada." });

    // Só o autor pode editar
    if (message.sender_id !== req.user_id) {
      return res.status(403).json({ message: "Não tem permissão para editar esta mensagem." });
    }

    message.content = req.body.content || message.content;
    await message.save();

    res.json(message);
  } catch (error) {
    console.error("Erro ao atualizar mensagem:", error);
    res.status(500).json({ message: "Erro ao atualizar mensagem." });
  }
};

// Apagar mensagem
exports.deleteMessage = async (req, res) => {
  try {
    const message = await db.message.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Mensagem não encontrada." });
    }

    if (message.sender_id !== req.user_id) {
      return res.status(403).json({ message: "Não tem permissão para apagar esta mensagem." });
    }

    await message.destroy();
    res.json({ message: "Mensagem apagada com sucesso." });
  } catch (error) {
    console.error("Erro ao apagar mensagem:", error);
    res.status(500).json({ message: "Erro ao apagar mensagem.", error: error.message });
  }
};

