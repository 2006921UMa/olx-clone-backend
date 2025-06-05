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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      ad_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ads",
          key: "id",
        },
      },
    },
    {
      tableName: "ratings",
      timestamps: true,
    }
  );

  Rating.associate = (models) => {
    Rating.belongsTo(models.user, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
    Rating.belongsTo(models.ad, {
      foreignKey: "ad_id",
      onDelete: "CASCADE",
    });
  };

  return Rating;
};
