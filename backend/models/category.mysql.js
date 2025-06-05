// models/category_id.mysql.js

module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'categories',
    timestamps: true,
  });

  category.associate = (models) => {
    category.hasMany(models.ad, { foreignKey: 'category_id' });
  };

  return category;
};

