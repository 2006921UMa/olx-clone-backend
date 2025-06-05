// models/category_id.postgres.js

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    }
  }, {
    tableName: 'categories',
    timestamps: false,
  });

  Category.associate = (models) => {
    Category.hasMany(models.ad, { foreignKey: 'category_id' });
  };

  return Category;
};


