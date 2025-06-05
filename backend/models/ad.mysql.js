// models/ad.mysql.js
// Ad => Advertisement (Anúncio)

module.exports = (sequelize, DataTypes) => {
  const Ad = sequelize.define("ad",
    {
      title: { type: DataTypes.STRING(150), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      image: { type: DataTypes.STRING, allowNull: true },
      image_url: { type: DataTypes.STRING, allowNull: true },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      location: { type: DataTypes.STRING, allowNull: true },
      has_video: { type: DataTypes.BOOLEAN, defaultValue: false },
      views: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "categories", key: "id" },
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "companies", key: "id" },
      },
    },
    {
      tableName: "ads",
      timestamps: true,
    }
  );

  Ad.associate = (models) => {
    Ad.belongsTo(models.user, { foreignKey: "user_id" });
    Ad.belongsTo(models.category, { foreignKey: "category_id" });
    Ad.belongsTo(models.company, { foreignKey: "company_id" });
    
    Ad.hasMany(models.followed_ad, { onDelete: "CASCADE" });
    Ad.hasMany(models.message, { foreignKey: 'ad_id', onDelete: "CASCADE" });
    Ad.hasMany(models.rating, { foreignKey: "ad_id", onDelete: "CASCADE" });
  };

  return Ad;
};
