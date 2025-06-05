// models/followed_ad.postgres.js

module.exports = (sequelize, DataTypes) => {
  const followed_ad = sequelize.define("followed_ad",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      tableName: "followed_ad",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["user_id", "ad_id"],
        },
      ],
    }
  );

  followed_ad.associate = (models) => {
    followed_ad.belongsTo(models.user, { foreignKey: "user_id" });
    followed_ad.belongsTo(models.ad, { foreignKey: "ad_id" });
  };

  return followed_ad;
};

