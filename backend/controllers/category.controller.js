// controller/category.controller.js

const Category = db.category;

exports.listarCategorias = async (req, res) => {
  try {
    const categorias = await Category.findAll();
    res.json(categorias);
  } catch (error) {
    console.error("Erro ao listar categorias:", error);
    res.status(500).json({
      message: "Erro ao listar categorias.",
      error: error.message,
    });
  }
};
