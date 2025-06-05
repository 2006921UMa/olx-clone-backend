// models/rating.postgres.js

module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    "rating",
    {
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
        comment: "Classificação de 1 a 5 estrelas",
      },
    },
    {
      tableName: "ratings",
      timestamps: true,
    }
  );

  Rating.associate = (models) => {
    Rating.belongsTo(models.user, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    });

    Rating.belongsTo(models.ad, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return Rating;
};
