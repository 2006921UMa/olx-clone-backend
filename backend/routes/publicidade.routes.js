// routes/publicidade.routes.js


router.get("/api/publicidade", async (req, res) => {
  try {
    // Procurar banners ativos da BD (ou array de exemplo)
    const publicidades = await db.Publicidade.findAll({ where: { ativo: true } });
    res.json(publicidades);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter publicidades", error: error.message });
  }
});
